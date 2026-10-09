import { NextResponse } from "next/server";
import { COMPANY_NAME, DIRECTOR_NAME } from "../../../utils/whatsapp";

/**
 * POST /api/notify-whatsapp
 * Dispatches an automated background WhatsApp notification to company command / Director
 */
export async function POST(request) {
  try {
    const isEnabled = process.env.ENABLE_SERVER_WHATSAPP_NOTIFY === "true";

    const body = await request.json();
    const {
      bookingId,
      name,
      phone,
      guardType,
      city,
      address,
      date,
      startTime,
      hours,
      totalPrice,
      specialNotes
    } = body;

    // Format the clean WhatsApp Notification Message
    const formattedMessage =
`🛡️ *NEW WEBSITE ENQUIRY - ${COMPANY_NAME}*
-----------------------------------
📋 *Ref ID:* ${bookingId || "N/A"}
👤 *Client Name:* ${name || "N/A"}
📞 *Client Phone:* ${phone || "N/A"}

📍 *DEPLOYMENT DETAILS:*
• Service / Guard Type: ${guardType || "Security Guard"}
• Location / City: ${city || "Aurangabad / Bihar"}
• Full Address: ${address || "N/A"}
• Date: ${date || "Immediate"}
• Start Time: ${startTime || "08:00 AM"}
• Shift Duration: ${hours || 8} Hours
• Estimated Total: ₹${totalPrice ? Number(totalPrice).toLocaleString("en-IN") : "N/A"}
${specialNotes ? `• Notes: ${specialNotes}\n` : ""}-----------------------------------
🏢 *AAF SECURITY SERVICES* (Estd 2026)
👤 Director: ${DIRECTOR_NAME}
📞 Hotline: 9730218260, 9465857462`;

    // If server notification is toggled OFF (as requested by user), return graceful status
    if (!isEnabled) {
      console.log("[SERVER_WHATSAPP_NOTIFY] Feature flag ENABLE_SERVER_WHATSAPP_NOTIFY is set to OFF. Message prepared but dispatch skipped.");
      return NextResponse.json({
        success: true,
        enabled: false,
        message: "Server notification is toggled OFF. Direct client WhatsApp redirect remains ACTIVE.",
        previewMessage: formattedMessage
      });
    }

    // CallMeBot / Meta Cloud API Dispatch (When feature flag is toggled ON)
    const targetPhone = process.env.WHATSAPP_NOTIFY_PHONE || "919730218260";
    const apiKey = process.env.CALLMEBOT_API_KEY || "";

    if (!apiKey) {
      return NextResponse.json(
        { success: false, error: "CALLMEBOT_API_KEY environment variable is not configured." },
        { status: 400 }
      );
    }

    const callMeBotUrl = `https://api.callmebot.com/whatsapp.php?phone=${targetPhone}&text=${encodeURIComponent(formattedMessage)}&apikey=${apiKey}`;

    const apiRes = await fetch(callMeBotUrl, { method: "GET" });
    const apiText = await apiRes.text();

    return NextResponse.json({
      success: true,
      enabled: true,
      message: "Automated WhatsApp notification dispatched successfully.",
      response: apiText
    });

  } catch (error) {
    console.error("[SERVER_WHATSAPP_NOTIFY] Error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

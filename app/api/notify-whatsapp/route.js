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
      state,
      city,
      address,
      date,
      startTime,
      endTime,
      shiftType,
      hours,
      totalPrice,
      specialNotes
    } = body;

    const timeDisplay = endTime ? `${startTime} to ${endTime}` : (startTime || "08:00 AM");
    const shiftInfo = shiftType ? `${shiftType} (${timeDisplay}, ${hours || 8} hrs)` : `${timeDisplay} (${hours || 8} hrs)`;
    const locationDisplay = [city, state].filter(Boolean).join(", ") || (city || "Aurangabad, Bihar");

    // Format the clean WhatsApp Notification Message
    const formattedMessage =
`🛡️ *NEW SECURITY ENQUIRY*
Ref: *${bookingId || "N/A"}*
──────────────────────
👤 *CLIENT DETAILS:*
• Name: ${name || "N/A"}
• Phone: ${phone || "N/A"}

📍 *DEPLOYMENT REQUIREMENTS:*
• Service: ${guardType || "Security Guard"}
• Location: ${address || locationDisplay}
• Date: ${date || "Immediate"}
• Shift & Time: ${shiftInfo}
${specialNotes ? `• Notes: ${specialNotes}\n` : ""}
📞 *STATUS:* Awaiting company callback for requirement discussion & custom quote.
──────────────────────
*AAF SECURITY SERVICES* (Director: ${DIRECTOR_NAME})
Helpline: +91 94658 57462`;

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
    const targetPhone = process.env.WHATSAPP_NOTIFY_PHONE || "919465857462";
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

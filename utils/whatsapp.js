/**
 * AAF SECURITY SERVICES - Company Credentials & WhatsApp API Link Generator
 */
export const COMPANY_NAME = "AAF SECURITY SERVICES";
export const COMPANY_TAGLINE = "Trusted Security. Complete Protection.";
export const COMPANY_MOTTO = "Your Safety Our Priority";
export const COMPANY_ESTD = "2026";
export const DIRECTOR_NAME = "Bhupendra Kumar (Sonu Singh)";

export const COMPANY_PHONES = [
  "+91 97302 18260",
  "+91 94658 57462",
  "+91 70049 51129"
];

export const COMPANY_PHONE = "+91 97302 18260";
export const COMPANY_WHATSAPP_NUMBER = "919730218260";
export const COMPANY_EMAIL = "singhsonu45000@gmail.com";
export const COMPANY_ADDRESS = "Narbdeshwar Nagar, Rambillash Nagar, Bharthauli Road, Jasoiya, Near Haveli Resort, Dist.- Aurangabad (Bihar) - 824101";

import { formatTime12h } from "./formatDate";

export const createWhatsAppBookingUrl = ({
  bookingId,
  guardName,
  guardType,
  name,
  phone,
  eventType,
  address,
  date,
  startTime,
  endTime,
  shiftType,
  hours,
  totalPrice
}) => {
  const formattedStart = formatTime12h(startTime) || startTime;
  const formattedEnd = endTime ? (formatTime12h(endTime) || endTime) : null;
  const timingText = formattedEnd ? `${formattedStart} to ${formattedEnd}` : formattedStart;
  const shiftLine = shiftType ? `• Shift: ${shiftType}\n` : "";

  const text =
`🛡️ *NEW SECURITY ENQUIRY - AAF SECURITY SERVICES*
-----------------------------------
📋 *Booking Ref:* ${bookingId}
👤 *Guard Requested:* ${guardName} (${guardType})

👤 *CLIENT INFO:*
• Name: ${name}
• Phone: ${phone}

📍 *DEPLOYMENT DETAILS:*
• Event / Service: ${eventType}
• Venue Address: ${address}
• Date: ${date}
${shiftLine}• Timing (From - To): ${timingText} (${hours} hours)
• Shift Duration: ${hours} hours
💰 *Estimated Total:* ₹${totalPrice}
-----------------------------------
🏢 *AAF SECURITY SERVICES* (Estd 2026)
👤 Director: ${DIRECTOR_NAME}
📞 Contact: 9730218260, 9465857462, 7004951129
📍 Aurangabad (Bihar) - 824101

Please confirm operative availability & dispatch protocol!`;

  return `https://api.whatsapp.com/send?phone=${COMPANY_WHATSAPP_NUMBER}&text=${encodeURIComponent(text)}`;
};

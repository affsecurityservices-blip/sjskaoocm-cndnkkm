/**
 * AAF SECURITY SERVICES - Company Credentials & WhatsApp API Link Generator
 */
export const COMPANY_NAME = "AAF SECURITY SERVICES";
export const COMPANY_TAGLINE = "Trusted Security. Complete Protection.";
export const COMPANY_MOTTO = "Your Safety Our Priority";
export const COMPANY_ESTD = "2026";
export const DIRECTOR_NAME = "Bhupendra Kumar Singh (Sonu Singh) & Manjeet Singh";
export const DIRECTORS = [
  {
    name: "Bhupendra Kumar Singh (Sonu Singh)",
    nameHi: "भूपेंद्र कुमार सिंह (सोनू सिंह)",
    role: "Managing Director (Ex-Indian Army)",
    roleHi: "प्रबंध निदेशक (भारतीय सेना पूर्व सैनिक)",
    tag: "Ex-Indian Army Veteran",
    tagHi: "पूर्व सैनिक (Ex-Army)",
    image: "/images/directors/bhupendra-kumar-singh.png"
  },
  {
    name: "Manjeet Singh",
    nameHi: "मंजीत सिंह",
    role: "Director (Operations & Deployment)",
    roleHi: "निदेशक (फील्ड ऑपरेशन्स एवं सुरक्षा)",
    tag: "Director - Operations",
    tagHi: "निदेशक - ऑपरेशन्स",
    image: null
  }
];
export const DIRECTOR_NAMES_HI = "भूपेंद्र कुमार सिंह (सोनू सिंह) एवं मंजीत सिंह";

export const COMPANY_PHONES = [
  "+91 94658 57462",
  "+91 97302 18260",
  "+91 70049 51129"
];

export const COMPANY_PHONE = "+91 94658 57462";
export const COMPANY_WHATSAPP_NUMBER = "919465857462";
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
  state,
  city,
  address,
  date,
  startTime,
  endTime,
  shiftType,
  hours,
  specialNotes
}) => {
  const formattedStart = formatTime12h(startTime) || startTime;
  const formattedEnd = endTime ? (formatTime12h(endTime) || endTime) : null;
  const timingText = formattedEnd ? `${formattedStart} to ${formattedEnd}` : formattedStart;
  const shiftInfo = shiftType ? `${shiftType} (${timingText}, ${hours} hrs)` : `${timingText} (${hours} hrs)`;

  const serviceName = guardName || guardType || eventType || "Security Guard Deployment";
  const notesLine = specialNotes?.trim() ? `• Notes: ${specialNotes.trim()}\n` : "";

  const text =
`🛡️ *NEW SECURITY ENQUIRY*
Ref: *${bookingId}*
──────────────────────
👤 *CLIENT DETAILS:*
• Name: ${name}
• Phone: ${phone}

📍 *DEPLOYMENT REQUIREMENTS:*
• Service: ${serviceName}
• Location: ${address}
• Date: ${date}
• Shift & Time: ${shiftInfo}
${notesLine}
📞 *STATUS:* Awaiting company callback for requirement discussion & custom quote.
──────────────────────
*AAF SECURITY SERVICES* (Directors: Bhupendra Kumar Singh & Manjeet Singh)
Helpline: +91 94658 57462`;

  return `https://api.whatsapp.com/send?phone=${COMPANY_WHATSAPP_NUMBER}&text=${encodeURIComponent(text)}`;
};

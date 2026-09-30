/**
 * Generates a pre-formatted WhatsApp API link for direct company booking enquiries.
 */
export const COMPANY_PHONE = "+91 1800-234-478";
export const COMPANY_WHATSAPP_NUMBER = "919876543210"; // International format without +

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
  hours,
  totalPrice
}) => {
  const text =
`🛡️ *NEW GUARD ENQUIRY - AEGISGUARD*
-----------------------------------
📋 *Booking Ref:* ${bookingId}
👤 *Guard Requested:* ${guardName} (${guardType})

👤 *CLIENT INFO:*
• Name: ${name}
• Phone: ${phone}

📍 *DEPLOYMENT DETAILS:*
• Event Type: ${eventType}
• Venue Address: ${address}
• Date: ${date}
• Start Time: ${startTime}
• Shift Duration: ${hours} hours
💰 *Estimated Total:* ₹${totalPrice}
-----------------------------------
Please confirm guard availability and dispatch protocol!`;

  return `https://api.whatsapp.com/send?phone=${COMPANY_WHATSAPP_NUMBER}&text=${encodeURIComponent(text)}`;
};

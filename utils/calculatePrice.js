export const calculatePrice = ({ pricePerHour = 500, pricePerDay = 3500, hours = 1, startTime = "12:00" }) => {
  const numHours = Math.max(1, Number(hours) || 1);
  let basePrice = 0;
  let appliedRate = "hourly";

  if (numHours >= 8) {
    appliedRate = "daily";
    const fullDays = Math.floor(numHours / 8);
    const remainingHours = numHours % 8;
    basePrice = (fullDays * pricePerDay) + (remainingHours * pricePerHour);
  } else {
    appliedRate = "hourly";
    basePrice = numHours * pricePerHour;
  }

  // Check night slot: 22:00 (10 PM) to 06:00 (6 AM)
  let startHour = 12;
  if (startTime) {
    const parts = startTime.split(":");
    startHour = parseInt(parts[0], 10);
    if (isNaN(startHour)) startHour = 12;
  }

  let isNightSlot = false;
  if (startHour >= 22 || startHour < 6) {
    isNightSlot = true;
  } else {
    const endHour = (startHour + numHours) % 24;
    if (endHour >= 22 || endHour < 6 || (startHour + numHours >= 22)) {
      isNightSlot = true;
    }
  }

  const nightSurchargePercent = isNightSlot ? 20 : 0;
  const nightSurchargeAmount = isNightSlot ? Math.round(basePrice * 0.20) : 0;
  const totalPrice = basePrice + nightSurchargeAmount;

  return {
    hours: numHours,
    basePrice,
    appliedRate,
    isNightSlot,
    nightSurchargePercent,
    nightSurchargeAmount,
    totalPrice
  };
};

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount || 0);
};

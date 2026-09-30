export const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;

  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
};

export const formatTime12h = (time24h) => {
  if (!time24h) return "";
  const parts = time24h.split(":");
  if (parts.length < 2) return time24h;

  let hour = parseInt(parts[0], 10);
  const minute = parts[1];
  const ampm = hour >= 12 ? 'PM' : 'AM';

  hour = hour % 12;
  hour = hour ? hour : 12; // 0 becomes 12

  return `${hour}:${minute} ${ampm}`;
};

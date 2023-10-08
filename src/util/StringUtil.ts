export const numberWithCommas = (number: number | string) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const isISODateString = (dateString: string) => {
  try {
    const date = new Date(dateString);
    const isoString = date.toISOString();
    return dateString === isoString;
  } catch (error) {
    return false; // Invalid date string
  }
};

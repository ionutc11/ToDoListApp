export const getFormattedDate = (date: Date | undefined): string => {
  const placeholder = "XX-XX-XXXX";

  if (!date) return placeholder;

  try {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  } catch (err) {
    return placeholder;
  }
};

export const fromFirestoreTimestampToDate = (date: {
  seconds: number;
  nanoseconds: number;
}): Date => {
  return new Date(date.seconds * 1000);
};

export const currencyFromater = (
  value: number | bigint,
  format: "short" | "full"
) => {
  switch (format) {
    case "short":
      return Intl.NumberFormat("ru-RU", {
        minimumFractionDigits: 2,
      }).format(value);
    case "full":
      return Intl.NumberFormat("ru-RU", {
        style: "currency",
        currency: "RUB",
      }).format(value);
    default:
      return Intl.NumberFormat("ru-RU").format(value);
  }
};

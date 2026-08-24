export const formatCurrency = (value) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

// DD/MM/AAAA
export const formatDate = (dateString) => {
  return new Intl.DateTimeFormat("pt-BR").format(new Date(dateString));
};
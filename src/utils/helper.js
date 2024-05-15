// ? CALCULATE LAST YEAR
export const getLastYear = () => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
  return lastYear;
};

// ? CALCULATE LAST MONTH
export const getLastMonth = () => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  return lastMonth;
};

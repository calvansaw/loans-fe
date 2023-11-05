import moment from "moment";

export const convertDecimal = (input: number) => parseFloat(input.toFixed(2));

export const convertStringUnixDate = (str: string) =>
  moment(new Date(parseInt(str, 10))).format("DD/MM/YYYY");

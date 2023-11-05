import moment from "moment";
import { LoanInterface } from "../@types/loan";
import { REQUEST_APPROVAL } from "../constants/requests";
import { LOAN_TYPES } from "../constants/loans";

export const convertDecimal = (input: number) => parseFloat(input.toFixed(2));

export const convertStringUnixDate = (str: string) =>
  moment(new Date(parseInt(str, 10))).format("DD/MM/YYYY");

export const calculateTotal = (loans: LoanInterface[]) => {
  let homeLoanSGD = 0;
  let homeLoanUSD = 0;
  let carLoanSGD = 0;
  let carLoanUSD = 0;
  let studyLoanSGD = 0;
  let studyLoanUSD = 0;

  loans.forEach((l) => {
    if (l.loanApproval === REQUEST_APPROVAL.APPROVED) {
      if (l.loanType === LOAN_TYPES.HOME_LOAN) {
        if (l.currency === "SGD") {
          homeLoanSGD += l.outstandingAmount;
        } else if (l.currency === "USD") {
          homeLoanUSD += l.outstandingAmount;
        }
      } else if (l.loanType === LOAN_TYPES.CAR_LOAN) {
        if (l.currency === "SGD") {
          carLoanSGD += l.outstandingAmount;
        } else if (l.currency === "USD") {
          carLoanUSD += l.outstandingAmount;
        }
      } else if (l.loanType === LOAN_TYPES.STUDY_LOAN) {
        if (l.currency === "SGD") {
          studyLoanSGD += l.outstandingAmount;
        } else if (l.currency === "USD") {
          studyLoanUSD += l.outstandingAmount;
        }
      }
    }
  });

  return {
    homeLoanSGD: homeLoanSGD.toFixed(2),
    homeLoanUSD: homeLoanUSD.toFixed(2),
    carLoanSGD: carLoanSGD.toFixed(2),
    carLoanUSD: carLoanUSD.toFixed(2),
    studyLoanSGD: studyLoanSGD.toFixed(2),
    studyLoanUSD: studyLoanUSD.toFixed(2),
  };
};

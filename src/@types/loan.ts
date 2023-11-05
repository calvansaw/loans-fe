export interface LoanInterface {
  loanId: string;
  loanTitle: string;
  loanType: string;
  principalAmount: number;
  outstandingAmount: number;
  currency: string;
  interestRate: number;
  startDate: string;
  endDate: string;
  redeemed: boolean;
  loanApproval: string;
}

export interface UpdateLoanInterface {
  index: number;
  paymentAmount: number;
  loan: LoanInterface;
}

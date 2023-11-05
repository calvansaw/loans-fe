export interface PaymentInterface {
  paymentId: string;
  amount: number;
  currency: string;
  paymentDate: string;
  loanId: string;
  loanTitle: string;
  loanType: string;
}

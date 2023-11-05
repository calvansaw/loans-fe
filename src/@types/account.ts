import { LoanInterface } from "./loan";
import { PaymentInterface } from "./payment";

export interface AccountInterface {
  sub: string;
  name: string;
  email: string;
  loans: LoanInterface[];
  payments: PaymentInterface[];
}

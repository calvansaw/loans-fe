import { LoanInterface } from "./loan";

export interface AccountRequestData {
  name: string;
  email: string;
}

export interface LoanRequestData
  extends Omit<LoanInterface, "redeemed" | "loanApproval" | "loanId"> {}

export interface RequestInterface {
  sub: string;
  requestId: string;
  requestType: string;
  requestData: LoanRequestData | AccountRequestData;
}

export interface UpdateRequestInterface extends RequestInterface {
  requestApproval: string;
}

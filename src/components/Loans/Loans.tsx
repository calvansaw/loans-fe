import Box from "@mui/material/Box";
import {
  DataGrid,
  GridColDef,
  GridRowParams,
  GridRowsProp,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import moment from "moment";
import { LOAN_TYPES } from "../../constants/loans";
import PaymentDialog from "../PaymentDialog/PaymentDialog";
import { useState } from "react";
import { LoanInterface } from "../../@types/loans";

interface LoansProps {
  rows: GridRowsProp;
}

const columns: GridColDef[] = [
  {
    field: "loanTitle",
    headerName: "Loan title",
    type: "string",
    width: 170,
    disableColumnMenu: true,
  },
  {
    field: "loanType",
    headerName: "Loan type",
    type: "string",
    width: 120,
    disableColumnMenu: true,
    valueGetter: (params: GridValueGetterParams) => {
      let title = "";
      switch (params.value) {
        case LOAN_TYPES.HOME_LOAN:
          title = "Home loan";
          break;
        case LOAN_TYPES.CAR_LOAN:
          title = "Car loan";
          break;
        case LOAN_TYPES.STUDY_LOAN:
          title = "Study loan";
          break;

        default:
          break;
      }

      return title;
    },
  },
  {
    field: "principalAmount",
    headerName: "P. amount",
    type: "number",
    width: 100,
    disableColumnMenu: true,
  },
  {
    field: "outstandingAmount",
    headerName: "O. amount",
    type: "number",
    width: 100,
    disableColumnMenu: true,
  },
  {
    field: "currency",
    headerName: "CCY",
    type: "string",
    width: 70,
    disableColumnMenu: true,
  },
  {
    field: "interestRate",
    headerName: "Interest",
    type: "number",
    width: 70,
    disableColumnMenu: true,
  },
  {
    field: "redeemed",
    headerName: "Redeemed",
    type: "boolean",
    width: 120,
    disableColumnMenu: true,
  },
  {
    field: "startDate",
    headerName: "Start date",
    type: "string",
    width: 120,
    sortable: false,
    disableColumnMenu: true,
    valueGetter: (params: GridValueGetterParams) =>
      moment(params.value).format("DD/MM/YYYY"),
  },
  {
    field: "endDate",
    headerName: "End date",
    type: "string",
    width: 120,
    sortable: false,
    disableColumnMenu: true,
    valueGetter: (params: GridValueGetterParams) =>
      moment(params.value).format("DD/MM/YYYY"),
  },
  {
    field: "loanApproval",
    headerName: "Approval",
    type: "string",
    width: 100,
    disableColumnMenu: true,
  },
];

const Loans = ({ rows = [] }: LoansProps) => {
  const [data, setData] = useState<LoanInterface | null>(null);
  const [index, setIndex] = useState(-1);

  const handleOpen = (params: GridRowParams) => {
    const rowIndex = rows.findIndex((r) => r.loanId === params.row.loanId);
    setData(params.row);
    setIndex(rowIndex);
  };

  const handleClose = () => {
    setData(null);
  };

  return (
    <>
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          getRowId={(r) => r.loanId}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          onRowClick={handleOpen}
        />
      </Box>
      {data && (
        <PaymentDialog
          open={!!data}
          handleClose={handleClose}
          data={data}
          index={index}
        />
      )}
    </>
  );
};

export default Loans;

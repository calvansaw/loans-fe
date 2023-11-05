import Box from "@mui/material/Box";
import {
  DataGrid,
  GridColDef,
  GridRowsProp,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import moment from "moment";
import { LOAN_TYPES } from "../../constants/loans";

interface PaymentsProps {
  rows?: GridRowsProp;
}

const columns: GridColDef[] = [
  {
    field: "loanTitle",
    headerName: "Loan title",
    type: "string",
    width: 150,
    disableColumnMenu: true,
  },
  {
    field: "loanType",
    headerName: "Loan type",
    type: "string",
    width: 100,
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
    field: "amount",
    headerName: "Amount",
    type: "number",
    width: 100,
    disableColumnMenu: true,
    valueGetter: (params: GridValueGetterParams) => params.value.toFixed(2),
  },
  {
    field: "currency",
    headerName: "CCY",
    type: "string",
    width: 70,
    disableColumnMenu: true,
  },
  {
    field: "paymentDate",
    headerName: "Payment date",
    type: "string",
    width: 120,
    sortable: false,
    disableColumnMenu: true,
    valueGetter: (params: GridValueGetterParams) =>
      moment(params.value).format("DD/MM/YYYY"),
  },
  {
    field: "paymentId",
    headerName: "Payment ID",
    type: "string",
    width: 170,
    disableColumnMenu: true,
  },
];

const Payments = ({ rows = [] }: PaymentsProps) => {
  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(r) => r.paymentId}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 2,
            },
          },
        }}
      />
    </Box>
  );
};

export default Payments;

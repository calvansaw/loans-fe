import Box from "@mui/material/Box";
import {
  DataGrid,
  GridColDef,
  GridRowParams,
  GridRowsProp,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import moment from "moment";
import { REQUEST_TYPES } from "../../constants/requests";
import { LOAN_TYPES } from "../../constants/loans";
import { useState } from "react";
import { RequestInterface } from "../../@types/request";
import UpdateRequestDialog from "../Dialogs/UpdateRequestDialog";
import { convertStringUnixDate } from "../../helpers/utils";

interface RequestsTableProps {
  rows?: GridRowsProp;
  requestType: string;
  isAdmin: boolean;
}

const RequestsTable = ({
  rows = [],
  requestType,
  isAdmin,
}: RequestsTableProps) => {
  const [data, setData] = useState<RequestInterface | null>(null);

  const handleOpen = (params: GridRowParams) => {
    setData(params.row);
  };

  const handleClose = () => {
    setData(null);
  };

  const columns: GridColDef[] = [
    {
      field: "sub",
      headerName: "Account ID",
      type: "string",
      width: 300,
      disableColumnMenu: true,
    },
    {
      field: "requestType",
      headerName: "Request type",
      type: "string",
      width: 150,
      disableColumnMenu: true,
      valueGetter: (params: GridValueGetterParams) => {
        let title = "";
        switch (params.value) {
          case REQUEST_TYPES.CREATE_ACCOUNT:
            title = "Create account";
            break;
          case REQUEST_TYPES.CREATE_LOAN:
            title = "Create loan";
            break;

          default:
            break;
        }

        return title;
      },
    },
    {
      field: "requestDate",
      headerName: "Request date",
      type: "string",
      width: 150,
      sortable: false,
      disableColumnMenu: true,
      valueGetter: (params: GridValueGetterParams) =>
        convertStringUnixDate(params.row.requestId),
    },
    {
      field: "requestId",
      headerName: "Request ID",
      type: "string",
      width: 170,
      disableColumnMenu: true,
    },
  ];

  if (requestType === REQUEST_TYPES.CREATE_LOAN) {
    columns.splice(
      3,
      0,
      ...[
        {
          field: "loanType",
          headerName: "Loan type",
          type: "string",
          width: 120,
          disableColumnMenu: true,
          valueGetter: (params: GridValueGetterParams) => {
            let title = "";
            switch (params.row.requestData.loanType) {
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
          valueGetter: (params: GridValueGetterParams) =>
            params.row.requestData.principalAmount.toFixed(2),
        },
        {
          field: "currency",
          headerName: "CCY",
          type: "string",
          width: 70,
          disableColumnMenu: true,
          valueGetter: (params: GridValueGetterParams) =>
            params.row.requestData.currency,
        },
        {
          field: "interestRate",
          headerName: "Interest",
          type: "number",
          width: 70,
          disableColumnMenu: true,
          valueGetter: (params: GridValueGetterParams) =>
            params.row.requestData.interestRate.toFixed(2),
        },
        {
          field: "startDate",
          headerName: "Start date",
          type: "string",
          width: 120,
          sortable: false,
          disableColumnMenu: true,
          valueGetter: (params: GridValueGetterParams) =>
            moment(params.row.requestData.startDate).format("DD/MM/YYYY"),
        },
        {
          field: "endDate",
          headerName: "End date",
          type: "string",
          width: 120,
          sortable: false,
          disableColumnMenu: true,
          valueGetter: (params: GridValueGetterParams) =>
            moment(params.row.requestData.endDate).format("DD/MM/YYYY"),
        },
      ]
    );
  } else if (requestType === REQUEST_TYPES.CREATE_ACCOUNT) {
    columns.splice(
      3,
      0,
      ...[
        {
          field: "name",
          headerName: "Name",
          type: "string",
          width: 120,
          disableColumnMenu: true,
          valueGetter: (params: GridValueGetterParams) =>
            params.row.requestData.name,
        },
        {
          field: "email",
          headerName: "Email",
          type: "string",
          width: 220,
          disableColumnMenu: true,
          valueGetter: (params: GridValueGetterParams) =>
            params.row.requestData.email,
        },
      ]
    );
  }

  return (
    <>
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          getRowId={(r) => r.requestId}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: requestType === REQUEST_TYPES.CREATE_LOAN ? 5 : 2,
              },
            },
          }}
          onRowClick={isAdmin ? handleOpen : undefined}
        />
      </Box>
      {data && (
        <UpdateRequestDialog
          open={!!data}
          handleClose={handleClose}
          data={data}
        />
      )}
    </>
  );
};

export default RequestsTable;

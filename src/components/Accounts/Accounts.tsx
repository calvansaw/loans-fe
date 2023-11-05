import Box from "@mui/material/Box";
import {
  DataGrid,
  GridColDef,
  GridRowParams,
  GridRowsProp,
} from "@mui/x-data-grid";
import { AccountInterface } from "../../@types/account";

interface AccountsProps {
  rows?: GridRowsProp;
  setAccount: (acc: AccountInterface) => void;
}

const columns: GridColDef[] = [
  {
    field: "sub",
    headerName: "Account ID",
    type: "string",
    width: 300,
    disableColumnMenu: true,
  },
  {
    field: "name",
    headerName: "Name",
    type: "string",
    width: 150,
    disableColumnMenu: true,
  },
  {
    field: "email",
    headerName: "Email",
    type: "string",
    width: 200,
    disableColumnMenu: true,
  },
];

const Accounts = ({ rows = [], setAccount }: AccountsProps) => {
  const handleRowClick = (params: GridRowParams) => {
    setAccount(params.row);
  };

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(r) => r.sub}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 2,
            },
          },
        }}
        onRowClick={handleRowClick}
      />
    </Box>
  );
};

export default Accounts;

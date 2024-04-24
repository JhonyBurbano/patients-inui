import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  styled,
  tableCellClasses,
} from "@mui/material";
import Chip from "@mui/material/Chip";
import { STATUS } from "../constanst";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#0e4c81",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export const GlobalTable = ({ data, columns, handleId }) => {
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              {columns?.map(({ label, key }) => (
                <StyledTableCell key={key}>{label}</StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((obj, i) => (
              <StyledTableRow key={i}>
                {columns.map((column, i) => (
                  <StyledTableCell component="th" scope="row" key={i}>
                    {column?.course ? (
                      <a
                        onClick={() => handleId(obj)}
                        style={{ cursor: "pointer", color: "green" }}
                      >
                        {obj?.[column?.key]}
                      </a>
                    ) : (
                      obj?.[column?.key]
                    )}
                    {/* <Chip
                      label="Chip Filled"
                      style={{ backgroundColor: "red" }}
                    /> */}
                  </StyledTableCell>
                ))}
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

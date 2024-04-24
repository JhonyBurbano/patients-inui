import { React } from "react";

const PatientItem = ({ obj, columns }) => {
  return (
    <StyledTableRow key={i}>
      {columns.map((column, i) => (
        <StyledTableCell
          component="th"
          scope="row"
          key={i}
          onClick={() => handleId(obj)}
          style={{
            cursor: handleId ? "pointer" : "",
          }}
        >
          {obj?.[column?.key]}
        </StyledTableCell>
      ))}
      <StyledTableCell>
        <IconButton onClick={() => {}}>
          <EditIcon />
        </IconButton>
        <IconButton onClick={() => {}}>
          <DeleteIcon />
        </IconButton>
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default PatientItem;

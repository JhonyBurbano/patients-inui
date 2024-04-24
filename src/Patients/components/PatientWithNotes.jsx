import React from "react";

// Material Components
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { IconButton } from "@mui/material";
import Delete from "@mui/icons-material/Delete";
import { red } from "@mui/material/colors";

const PatientWithNotes = ({ notes }) => {
  return (
    <>
      {notes?.length > 0 ? (
        <Box sx={{ width: "100%", marginBottom: "20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <p
                className="medic-name"
                style={{ marginBottom: 0, color: "#0e4c81", fontWeight: 700 }}
              >
                Dr Camila Zalazar
              </p>
              <p className="medic-job" style={{ marginTop: 0 }}>
                Medico general
              </p>
            </div>
            <IconButton style={{ color: "red" }} disableRipple>
              <Delete />
            </IconButton>
          </div>
          <Stack spacing={2}>
            {notes?.map((note) => (
              <Box key={note.id}>{note.description}</Box>
            ))}
          </Stack>
        </Box>
      ) : (
        <></>
      )}
    </>
  );
};

export default PatientWithNotes;

import React from "react";

// Material Components
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { IconButton } from "@mui/material";
import Delete from "@mui/icons-material/Delete";

// Sweetalert2
import Swal from "sweetalert2";

// Server
import * as NoteServer from "../../Notes/services/index";

// Style
import "./styleGlobal.css";

const PatientWithNotes = ({ notes }) => {
  const handleDeleteNote = async (noteId) => {
    const result = await Swal.fire({
      container: "my-swal",
      title: "Are you sure delete record?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await NoteServer.deleteNote(noteId);
        } catch (error) {
          console.log("erro notes", error);
        }
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };

  return (
    <>
      {notes?.length > 0 ? (
        notes?.map((note) => (
          <Box key={note.id} sx={{ width: "100%", marginBottom: "20px" }}>
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
                <Delete
                  onClick={() => {
                    handleDeleteNote(note.id);
                  }}
                />
              </IconButton>
            </div>
            <Stack key={note.id} spacing={2}>
              <Box key={note.id}>{note.description}</Box>
            </Stack>
          </Box>
        ))
      ) : (
        <></>
      )}
    </>
  );
};

export default PatientWithNotes;

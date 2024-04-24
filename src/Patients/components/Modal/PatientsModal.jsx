import React, { useEffect, useState } from "react";

//Server
import * as PatientServer from "../../services/index";

// styles
import "./style.css";

// Material Components
import { Button, Modal, Paper, TextField } from "@mui/material";
import IconButton from "@mui/material/IconButton";

// Material icons
import CloseIcon from "@mui/icons-material/Close";
import PatientWithNotes from "../PatientWithNotes";

export const PatientsModal = ({ open, onClose, dataPatient }) => {
  const [fieldNote, setFieldNote] = useState({
    observation: "",
  });
  const [notes, setNotes] = useState([]);

  const handleChange = (key, value) => {
    setFieldNote((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleNotesPatient = async () => {
    try {
      if (dataPatient?.id) {
        const dataNotes = await PatientServer.notesOfPatient(dataPatient?.id);
        console.log("Api ==== ", dataNotes);
        const data = dataNotes.length <= 0 ? [] : dataNotes;
        setNotes(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const note = {
        patientId: dataPatient?.id,
        description: fieldNote.observation,
      };
      const res = await PatientServer.createNote(note);
      if (res.status === "OK") {
        setFieldNote({ observation: "" });
        setNotes(res.data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    handleNotesPatient();
  }, [open]);

  return (
    <>
      <Modal className="modal" open={open} onClose={onClose}>
        <Paper className="paper-principal">
          <div
            style={{
              margin: "0px 30px",
              position: "relative",
            }}
          >
            <div className="container-button-close">
              <IconButton
                aria-label="Cerrar modal"
                className="close-icon"
                onClick={onClose}
                disableRipple
              >
                <CloseIcon />
              </IconButton>
            </div>
            <h2 className="title-principal">Información paciente</h2>
            <p className="title-name">Paciente</p>
            <p className="patient-data">{dataPatient?.full_name}</p>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div>
                <p className="title-name">Fecha de nacimiento</p>
                <p className="patient-data">
                  {dataPatient?.birthday || "No hay fecha"}
                </p>
                <p className="title-name">Tipo de identificación</p>
                <p className="patient-data">{dataPatient?.type_doc}</p>
                <p className="title-name">Celular</p>
                <p className="patient-data">{dataPatient?.phone}</p>
                <p className="title-name">Dirección</p>
                <p className="patient-data">{dataPatient?.address}</p>
              </div>
              <div>
                <p className="title-name">Edad</p>
                <p className="patient-data">{43}</p>
                <p className="title-name">N de identificación</p>
                <p className="patient-data">{dataPatient?.document}</p>
                <p className="title-name">Teléfono</p>
                <p className="patient-data">{dataPatient?.landline}</p>
                <p className="title-name">Ocupación</p>
                <p className="patient-data">{dataPatient?.occupation}</p>
              </div>
            </div>
            <form onSubmit={handleSubmit}>
              <p className="title-name">Agregar Observacion</p>
              <TextField
                multiline
                maxRows={2}
                fullWidth
                name="observation"
                required
                value={fieldNote.observation}
                onChange={(e) => handleChange("observation", e.target.value)}
              />
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "right",
                  margin: "10px 0px",
                }}
              >
                <Button type="submit">Guardar</Button>
              </div>
            </form>
            <PatientWithNotes notes={notes} />
          </div>
        </Paper>
      </Modal>
    </>
  );
};

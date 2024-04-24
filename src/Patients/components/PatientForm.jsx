import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
// Server
import * as PatientServer from "../services/index";

// Material components
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// Router
import { useNavigate, useParams } from "react-router-dom";
// Constans
import {
  TYPE_DOC,
  TYPE_ATTENTION,
  ENTITYS,
  STATUS,
} from "../../utils/constanst";
import dayjs from "dayjs";

const typeDoc = TYPE_DOC;

const PatientForm = () => {
  const navigate = useNavigate();
  const params = useParams();
  const dataInitial = {
    firt_name: "",
    last_name: "",
    type_doc: "",
    document: "",
    birthday: dayjs("2024-01-25"),
    phone: "",
    landline: "",
    occupation: "",
    address: "",
    entity: "",
    type_attention: "",
    status: "",
  };
  const [formData, setFormData] = useState(dataInitial);

  const handleChangeInput = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newFomratData = {
      ...formData,
      birthday: formData.birthday.format("DD/MM/YYYY"),
    };

    try {
      if (!params.id) {
        const res = await PatientServer.registerPatient(newFomratData);
        console.log("respuesta - ", res);
        const data = res;
        console.log("respuesta data - ", data);
        if (data.status === "OK") {
          setFormData(dataInitial);
        }
      } else {
        await PatientServer.updatePatient(params.id, newFomratData);
      }

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Paciente salvado con exito",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.data.error,
      });
    }
  };

  const getPatient = async (patientId) => {
    try {
      const response = await PatientServer.getPatient(patientId);
      setFormData({ ...response, birthday: dayjs(response.birthday) });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (params.id) {
      getPatient(params.id);
    }
  }, []);

  return (
    <>
      <Box
        sx={{
          "& .MuiTextField-root": { m: 2, width: "50ch" },
        }}
      >
        <div style={{ with: "calc(100vw - 500px)", margin: "20px 50px" }}>
          <h2>Formulario Paciente</h2>
          <form onSubmit={handleSubmit}>
            <TextField
              id="outlined-basic"
              label="Nombres"
              variant="outlined"
              fullWidth
              name="firt_name"
              required
              value={formData.firt_name}
              onChange={(e) => handleChangeInput("firt_name", e.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="Apellidos"
              variant="outlined"
              fullWidth
              name="last_name"
              required
              value={formData.last_name}
              onChange={(e) => handleChangeInput("last_name", e.target.value)}
            />
            <TextField
              id="outlined-select-currency"
              select
              label="Tipo de documento"
              defaultValue="CC"
              helperText="Por favor seleccione un tipo de documento"
              fullWidth
              name="type_doc"
              value={formData.type_doc}
              onChange={(e) => handleChangeInput("type_doc", e.target.value)}
            >
              {typeDoc.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              id="outlined-basic"
              label="Documento"
              variant="outlined"
              fullWidth
              name="document"
              required
              value={formData.document}
              onChange={(e) => handleChangeInput("document", e.target.value)}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                name="birthday"
                value={formData.birthday}
                onChange={(e) => handleChangeInput("birthday", e)}
              />
            </LocalizationProvider>
            <TextField
              id="outlined-basic"
              label="Celular"
              variant="outlined"
              fullWidth
              name="phone"
              required
              value={formData.phone}
              onChange={(e) => handleChangeInput("phone", e.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="Telefono"
              variant="outlined"
              fullWidth
              name="landline"
              required
              value={formData.landline}
              onChange={(e) => handleChangeInput("landline", e.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="Dirección"
              variant="outlined"
              fullWidth
              required
              value={formData.address}
              onChange={(e) => handleChangeInput("address", e.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="Ocupación"
              variant="outlined"
              fullWidth
              required
              value={formData.occupation}
              onChange={(e) => handleChangeInput("occupation", e.target.value)}
            />
            <TextField
              id="outlined-select-currency"
              select
              label="Entidad"
              helperText="Por favor seleccione la entidad"
              fullWidth
              name="type_doc"
              value={formData.entity}
              onChange={(e) => handleChangeInput("entity", e.target.value)}
            >
              {ENTITYS.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="outlined-select-currency"
              select
              label="Tipo de Atención"
              helperText="Por favor seleccione el tipo de atencion"
              fullWidth
              name="type_attention"
              value={formData.type_attention}
              onChange={(e) =>
                handleChangeInput("type_attention", e.target.value)
              }
            >
              {TYPE_ATTENTION.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="outlined-select-currency"
              select
              label="Estado del paciente"
              helperText="Por favor seleccione el estado del paciente"
              fullWidth
              name="status"
              value={formData.status}
              onChange={(e) => handleChangeInput("status", e.target.value)}
            >
              {STATUS.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
            <br />
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </form>
        </div>
      </Box>
    </>
  );
};

export default PatientForm;

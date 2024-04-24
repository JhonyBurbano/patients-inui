import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

// Server
import * as PatientServer from "../services/index";

// Material components
import { GlobalTable } from "../../utils/Table/GlobalTable";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { PatientsModal } from "./Modal/PatientsModal";
import { IconButton } from "@mui/material";
import Box from "@mui/material/Box";

const PatientList = () => {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);

  const [openDetailPatient, setOpenDetailPatient] = useState(false);

  const [actionsState, setActionsState] = useState({
    editPatient: false,
    deletePatient: false,
  });
  const [rowInformation, setRowInformation] = useState();

  const handleOpenDetailPatient = (data) => {
    setRowInformation(data);
    setOpenDetailPatient(!openDetailPatient);
  };

  const handleDelete = async (idPatient) => {
    const result = await Swal.fire({
      title: "Are you sure delete record?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await PatientServer.deletePatient(idPatient);
        listPatients();
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };

  const status = [];

  const listPatients = async () => {
    try {
      const color = {
        backgroundColor: {
          Estable: "#deefc9",
          Moderado: "#FFF4DE",
          Critico: "#F7C6CC",
        },
        textColor: {
          Estable: "#6BA539",
          Moderado: "#FCA912",
          Critico: "#F74242",
        },
      };
      const res = await PatientServer.listPatients();
      const data = await res.data;

      setPatients(
        data.map((obj) => ({
          ...obj,
          id: obj.id,
          id_slice: obj.id.slice(0, 8),
          type_doc: obj.type_doc,
          full_name: `${obj?.firt_name} ${obj?.last_name}`,
          full_document: `${obj?.type_doc} - ${obj?.document}`,
          status: (
            <>
              <Box
                style={{
                  backgroundColor: color.backgroundColor[obj.status],
                  borderRadius: "0.25rem",
                  color: color.textColor[obj.status],
                  minWidth: 80,
                  textAlign: "center",
                  p: "0.25rem",
                }}
              >
                {obj.status}
              </Box>
            </>
          ),
          actions: (
            <>
              <IconButton onClick={() => navigate(`/updatePatient/${obj.id}`)}>
                <EditIcon />
              </IconButton>
              <IconButton
                onClick={() => {
                  handleDelete(obj.id);
                }}
              >
                <DeleteIcon />
              </IconButton>
            </>
          ),
        }))
      );
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    {
      label: "Id",
      key: "id_slice",
    },
    {
      label: "Paciente",
      key: "full_name",
      course: true,
    },
    {
      label: "Identificación",
      key: "full_document",
    },
    {
      label: "Celular",
      key: "phone",
    },
    {
      label: "Entidad",
      key: "entity",
    },
    {
      label: "Ultima Atención",
      key: "last_attention",
    },
    {
      label: "Tipo Atención",
      key: "type_attention",
    },
    {
      label: "Estado",
      key: "status",
    },
    {
      label: "Acciones",
      key: "actions",
    },
  ];

  useEffect(() => {
    listPatients();
  }, []);

  return (
    <>
      <div
        style={{
          margin: "20px 50px",
        }}
      >
        <h3 style={{ color: "#0e4c81" }}>Directorio de pacientes</h3>
        <GlobalTable
          columns={columns}
          data={patients}
          handleId={handleOpenDetailPatient}
        />
      </div>

      <PatientsModal
        open={openDetailPatient}
        onClose={handleOpenDetailPatient}
        dataPatient={rowInformation}
      />
    </>
  );
};

export default PatientList;

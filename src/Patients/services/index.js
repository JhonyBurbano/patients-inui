import axios from "axios";
const PATH_BASE_URL = import.meta.env.VITE_BACKEND_URL

export const getPatient = async (patientId) => {
  try {
    const response = await axios.get(`${PATH_BASE_URL}patients/${patientId}`)
    if (response.data.status === "OK") {
      return response.data.data;
    }
  } catch (error) {
    console.log(error);
  }
}

export const listPatients = async () => {
  try {
    const response = await axios.get(`${PATH_BASE_URL}patients`);
    return response.data
  } catch (error) {
    console.log(error);
  }
}

export const deletePatient = async (patientId) => {
  try {
    await axios.delete(`${PATH_BASE_URL}patients/${patientId}`)
  } catch (error) {
    console.log(error);
  }
}

export const registerPatient = async (data) => {
  
    const response = await axios({
      method: 'POST',
      url: `${PATH_BASE_URL}patients`,
      headers: {
        "Content-Type": "application/json"
      },
      data: data,
    });
    return response.data
  
}

export const updatePatient = async (patientId, data) => {
  try {
    const response = await axios({
      method: 'PUT',
      url: `${PATH_BASE_URL}patients/${patientId}`,
      headers: {
        "Content-Type": "application/json"
      },
      data: JSON.stringify(data),
    });
    console.log('data params ', patientId ,data)
    console.log("update response", response)
    return response.data
  } catch (error) {
    console.log('Error update - ', error);
  }
}

export const notesOfPatient = async (patientId) => {
  try {
    const response = await axios.get(`${PATH_BASE_URL}patients/${patientId}/notes`);
    return response.data.data
  } catch (error) {
    throw new Error(error)
  }
}

export const createNote = async (note) => {
  try {
    const response = await axios({
      method: 'post',
      url: `${PATH_BASE_URL}notes`,
      headers: {
        "Content-Type": "application/json"
      },
      data: JSON.stringify(note),
    });
    return response.data
    console.log(response)
  } catch (error) {
    console.log(error);
  }
}
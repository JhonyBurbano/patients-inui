import axios from "axios";
const PATH_BASE_URL = import.meta.env.VITE_BACKEND_URL

export const deleteNote = async (noteId) => {
  try {
    console.log('llego id al server - ', noteId)
    await axios.delete(`${PATH_BASE_URL}notes/${noteId}`)
  } catch (error) {
    console.log(error);
  }
}
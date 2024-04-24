import Dashboard from "./Dashboard/Dashboard";
import PatientList from "./Patients/components/PatientList";
import PatientForm from "./Patients/components/PatientForm";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Dashboard />
      <Routes>
        <Route path="/" element={<Navigate to="/patients" />} />
        <Route path="/patients" element={<PatientList />} />
        <Route path="/createPatient" element={<PatientForm />} />
        <Route path="/updatePatient/:id" element={<PatientForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

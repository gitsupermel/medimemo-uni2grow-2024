import {
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/login/Login";
import { Therapy } from "./pages/therapy/Therapy";
import { Medications } from "./pages/medications/Medications";
import { Contacts } from "./pages/contacts/Contacts";
import { AppNavigation } from "./components/appNavigation/AppNavigation";


function App() {
  const location = useLocation();
  return (
    <>
      {location.pathname !== "/" && location.pathname !== "/login" && (
        <AppNavigation />
      )}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/therapie" element={<Therapy />} />
        <Route path="/contact" element={<Contacts />} />
        <Route path="/medication" element={<Medications />} />
        <Route path="/appNavigation" element={<AppNavigation />} />
      </Routes>
    </>
  );
}

export default App;

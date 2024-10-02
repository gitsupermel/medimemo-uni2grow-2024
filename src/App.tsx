import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import { Layout } from "./components/layout/Layout.tsx";
import Contacts from "./pages/contacts/Contacts.tsx";
import Login from "./pages/login/Login";
import { Medications } from "./pages/medications/Medications.tsx";
import { Therapies } from "./pages/therapies/Therapies.tsx";
//to add a new therapy
import { MedicationDetails } from "./pages/medicationDetails/MedicationDetails.tsx";
import { AddEditTherapie } from "./pages/addEditTherapie/AddEditTherapie.tsx";
import { TherapieDetails } from "./pages/therapieDetails/TherapieDetails.tsx";
import { DoctorDetails } from "./pages/doctorDetails/DoctorDetails.tsx";
import { AddEditContact } from "./pages/addEditContact/AddEditContact.tsx";
import { Profil } from "./pages/profil/Profil.tsx";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    loader: () => redirect("/login"),
  },

  {
    element: <Layout />,
    children: [
      {
        path: "/medications",
        children: [
          {
            path: "",
            element: <Medications />,
          },
          {
            path: "medicationdetails",
            element: <MedicationDetails />,
          },
        ],
      },
      {
        path: "profil",
        element: <Profil />,
      },
      {
        path: "/contacts",

        children: [
          {
            path: "",
            element: <Contacts />,
          },
          {
            path: "doctordetails",
            element: <DoctorDetails />,
          },
          {
            path: "addcontact",
            element: <AddEditContact />,
          },
          {
            path: "editcontact",
            element: <AddEditContact />,
          },
        ],
      },
      {
        path: "/Therapies",

        children: [
          {
            path: "",
            element: <Therapies />,
          },
          {
            path: "add", // Child route for adding a new therapy
            element: <AddEditTherapie />,
          },
          {
            path: "therapiedetails",
            element: <TherapieDetails />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;

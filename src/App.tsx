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
import { AddTherapie } from "./pages/addTherapie/AddTherapie.tsx";

const router = createBrowserRouter([
  {
    path: "/addtherapie",
    element: <AddTherapie />,
  },
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
        element: <Medications />,
      },
      {
        path: "/contacts",
        element: <Contacts />,
      },
      {
        path: "/Therapies",
        element: <Therapies />,
      },
      {
        path: "/addtherapie",
        element: <AddTherapie />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;

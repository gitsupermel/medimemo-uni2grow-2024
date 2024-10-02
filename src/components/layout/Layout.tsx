import "./Layout.css";
import { Outlet, useLocation } from "react-router-dom";
import { AppNavigation } from "../appNavigation/AppNavigation";

export function Layout() {

  const location = useLocation();
  const noNavigation = ["/medications/details", "/profil"];
  const showNavigation = !noNavigation.includes(location.pathname);

  return (
    <div className="container">
      <div className="panel">
        <Outlet />
      </div>
      {showNavigation && <AppNavigation />}
    </div>
  );
}

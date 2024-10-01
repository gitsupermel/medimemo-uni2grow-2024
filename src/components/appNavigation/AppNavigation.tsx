import "./AppNavigation.css";
import { IconButton, Typography, Box } from "@mui/material";
// Icons
import prescription from "../../assets/images/appNavigation/prescriptions.svg";
import prescriptionBlack from "../../assets/images/appNavigation/prescriptionsBlack.svg";
import home from "../../assets/images/appNavigation/home_health.svg";
import homRed from "../../assets/images/appNavigation/home_health-red.svg";
import contact from "../../assets/images/appNavigation/contacts.svg";
import contactRed from "../../assets/images/appNavigation/contacts-red.svg";
//
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export function AppNavigation() {
  const location = useLocation(); // Get the current route
  const [page, setPage] = useState<string>(location.pathname);
  const navigate = useNavigate();

  const handleClick = (path: string) => {
    setPage(path);
    navigate(path);
  };

  return (
    <div className="footer-therapie">
      <div className="end">
        <Box className="nav">
          <div className={page === "/medication" ? "over" : "button-nav"}>
            <IconButton onClick={() => handleClick("/medication")}>
              <img
                width={24}
                height={24}
                alt=""
                src={page === "/medication" ? homRed : home}
              />
            </IconButton>
          </div>
          <Typography
            className={
              page === "/medication" ? "typography-over" : "typography-nav"
            }
          >
            Medications
          </Typography>
        </Box>
        <Box className="nav">
          <div className={page === "/therapie" ? "over" : "button-nav"}>
            <IconButton onClick={() => handleClick("/therapie")}>
              <img
                width={24}
                height={24}
                alt=""
                src={page === "/therapie" ? prescription : prescriptionBlack}
              />
            </IconButton>
          </div>
          <Typography
            className={
              page === "/therapie" ? "typography-over" : "typography-nav"
            }
          >
            Therapies
          </Typography>
        </Box>
        <Box className="nav">
          <div className={page === "/contact" ? "over" : "button-nav"}>
            <IconButton onClick={() => handleClick("/contact")}>
              <img
                width={24}
                height={24}
                alt=""
                src={page === "/contact" ? contactRed : contact}
              />
            </IconButton>
          </div>
          <Typography
            className={
              page === "/contact" ? "typography-over" : "typography-nav"
            }
          >
            Contacts
          </Typography>
        </Box>
      </div>
    </div>
  );
}

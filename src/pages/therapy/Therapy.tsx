import { useState, useEffect } from "react";
import "./Therapy.css";
import { Typography, Button, Box, IconButton } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import search from "../../assets/images/appNavigation/Icon.svg";

interface Therapies {
  id: number;
  name: string;
  userId: number;
  contact: number;
  notes: string;
}

export function Therapy() {
  const [therapies, setTherapies] = useState([]);

  // useEffect to fetch therapies data from db.json
  useEffect(() => {
    fetch("http://localhost:3000/therapies") // let's know that json-server is already running on localhost:3000
      .then((response) => response.json())
      .then((data) => {
        setTherapies(data);
        console.log("Fetched therapies:", data); // Debugging log to inspect the data
      })
      .catch((error) => {
        console.error("Error fetching therapy data:", error);
      });
  }, []);

  return (
    <div className="container">
      <div className="container-therapie">
        <div className="header">
          <Box className="typography-header">My Therapies</Box>
        </div>
        <div className="panel">
          <div className="search">
            <div className="search1">
              <div className="search-div">
                <Typography className="search-textfield">
                  Search therapy
                </Typography>
              </div>
              <Button className="search-button">
                <img width={30} height={30} alt="recherche" src={search} />
              </Button>
            </div>
          </div>

          <div>
            <Box className="box">
              {therapies.length > 0 ? (
                therapies.map((therapy: Therapies) => (
                  <div className="element" key={therapy.id}>
                    <Box sx={{ width: 240 }}>{therapy.name}</Box>
                    <IconButton>
                      <ArrowForwardIosIcon />
                    </IconButton>
                  </div>
                ))
              ) : (
                <Typography>No therapies available</Typography>
              )}
            </Box>
          </div>
        </div>

        <div className="footer-therapie">
          <div className="add-button">
            <IconButton>
              <AddCircleIcon sx={{ color: "#F00", fontSize: 50 }} />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
}

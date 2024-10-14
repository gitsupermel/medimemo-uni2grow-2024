import { Typography, Divider, IconButton, Paper } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/header/Header";
import Stethos from "../../assets/images/therapie/doc.png";

import "./TherapyDetails.css";

interface Therapy {
  id: number;
  name: string;
  medicines: string[];
  contact: string;
  notes: string;
}

export function TherapyDetails() {
  const { id } = useParams<{ id?: string }>(); // Ensure id is optional
  const [therapy, setTherapy] = useState<Therapy | null>(null);

  // back Button click
  const navigate = useNavigate();
  const goBack = () => {
    navigate("/therapies");
  };

  // Fetch therapy details from the server
  useEffect(() => {
    if (id) {
      fetch(`http://localhost:3000/therapies/${id}`)
        .then((response) => response.json())
        .then((data) => setTherapy(data))
        .catch((error) => console.error("Error fetching therapy:", error));
    }
  }, [id]);

  if (!therapy) {
    return <Typography>Loading therapy details...</Typography>;
  }

  // Navigate to MedicineDetail page
  const handleMedicineClick = (medicine: string) => {
    navigate(`/medicines/${encodeURIComponent(medicine)}`);
  };

  // Navigate to DoctorDetail page
  const handleDoctorClick = (doctor: string) => {
    navigate(`/doctors/${encodeURIComponent(doctor)}`);
  };

  return (
    <>
      <Header
        title={therapy.name}
        showBackButton
        onBackButtonClick={goBack}
        showRightButton
      />
      <div className="content">
        <div className="infos">
          <Typography sx={{ width: "100%", fontWeight: 400 }}>
            Medicines
          </Typography>

          {therapy.medicines.map((medicine, index) => (
            <Paper
              key={index}
              component="form"
              sx={{
                p: "2px 4px",
                display: "flex",
                justifyContent: "space-between",
                backgroundColor: "#F4F4F4",
                paddingTop: 1.5,
                paddingBottom: 1.5,
                marginBottom: 1,
                marginRight: 5,
              }}
            >
              <div className="medicine-item">
                <Typography sx={{ fontSize: 17, fontWeight: 700 }}>
                  {medicine}
                </Typography>
              </div>

              <IconButton
                type="button"
                sx={{ p: "10px" }}
                aria-label="view-medicine"
                onClick={() => handleMedicineClick(medicine)} // Handle medicine click
              >
                <ArrowForwardIosIcon />
              </IconButton>
            </Paper>
          ))}

          <br />
          <Divider
            sx={{
              marginRight: 5,
              marginTop: 2,
              marginBottom: 2,
              height: 3,
              backgroundColor: "#F4F4F4",
            }}
          />
          <br />

          <Typography sx={{ width: "100%", fontWeight: 400 }}>
            Doctor
          </Typography>
          <Paper
            key={therapy.id}
            component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              justifyContent: "space-between",
              backgroundColor: "#F4F4F4",
              paddingTop: 1.5,
              paddingBottom: 1.5,
              marginRight: 5,
            }}
          >
            <div className="medicines">
              <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
                <img src={Stethos} alt="search icon" />
              </IconButton>
              <Typography
                sx={{ fontSize: 17, fontWeight: 700 }}
                className="typography1"
              >
                {therapy.contact}
              </Typography>
            </div>

            <IconButton
              type="button"
              sx={{ p: "10px" }}
              aria-label="arrowBack"
              onClick={() => handleDoctorClick(therapy.contact)} // Handle doctor click
            >
              <ArrowForwardIosIcon />
            </IconButton>
          </Paper>
          <br />

          <Typography sx={{ width: "100%", fontWeight: 400 }}>Notes</Typography>
          <Paper
            key={therapy.id}
            component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              justifyContent: "space-between",
              backgroundColor: "#F4F4F4",
              paddingTop: 1.5,
              paddingBottom: 1.5,
              marginRight: 5,
            }}
          >
            <div className="medicines">
              <Typography
                sx={{ fontSize: 17, fontWeight: 700 }}
                className="typography1"
              >
                {therapy.notes}
              </Typography>
            </div>
          </Paper>
        </div>
      </div>
    </>
  );
}

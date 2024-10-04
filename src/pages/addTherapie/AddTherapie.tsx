import "./AddTherapie.css";
import {
  // Button,
  Checkbox,
  FormControl,
  IconButton,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";
import { useEffect, useState } from "react";
import { IMedecines } from "../../models/Medecines";
import { SelectChangeEvent } from "@mui/material";
import { useNavigate } from "react-router-dom";
// import saveIcon from "../../assets/images/therapies/save.png";
import LoadingButton from "@mui/lab/LoadingButton";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export function AddTherapie() {
  const [medecines, setMedecines] = useState<IMedecines[]>([]);
  const [selectedMedecines, setSelectedMedecines] = useState<string[]>([]);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  //////////
  const [loading, setLoading] = useState(false);
  function handleClick1() {
    // for the save button
    setLoading(true);
  }
  ////////////////////////////

  const handleClick = () => {
    // for the Arrow back
    navigate("/therapies");
  };

  // Fetch medicines from db.json using fetch
  useEffect(() => {
    fetch("http://localhost:3000/medicines") // Adjust the URL as needed
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error fetching medicines");
        }
        return response.json();
      })
      .then((data) => {
        setMedecines(data);
      })
      .catch((error) => {
        setError("Error fetching medicines");
        console.error(error);
      });
  }, []);

  const handleChange = (event: SelectChangeEvent<typeof selectedMedecines>) => {
    const {
      target: { value },
    } = event;
    setSelectedMedecines(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <>
      <div className="panel">
        <div className="body">
          <div className="header">
            <IconButton onClick={handleClick}>
              <ArrowBackIcon />
            </IconButton>
          </div>
          <div className="content">
            <div className="newTherapie">
              <Typography sx={{ fontWeight: 700 }}>New therapy</Typography>
              <TextField
                id="outlined-basic"
                label="Therapy name"
                variant="outlined"
                sx={{ width: "310px" }}
              />
            </div>
            <div className="selectZone">
              <Typography sx={{ fontWeight: 700 }}>
                Select one or more medecines
              </Typography>
              <FormControl sx={{ m: 1, width: 310 }}>
                <InputLabel id="medecines-multiple-checkbox-label">
                  Medecines
                </InputLabel>
                <Select
                  labelId="medecines-multiple-checkbox-label"
                  id="medecines-multiple-checkbox"
                  multiple
                  value={selectedMedecines}
                  onChange={handleChange}
                  input={<OutlinedInput label="Medecines" />}
                  renderValue={(selected) => selected.join(", ")}
                  MenuProps={MenuProps}
                >
                  {medecines.map((medecine) => (
                    <MenuItem key={medecine.id} value={medecine.name}>
                      {/* <Checkbox
                        checked={selectedMedecines.includes(medecine.name)}
                      /> */}
                      <ListItemText primary={medecine.name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </div>
          {error && <Typography color="error">{error}</Typography>}
          <div className="saveButton">
            <div className="button">
              <LoadingButton
                size="small"
                color="error"
                onClick={handleClick1}
                loading={loading}
                loadingPosition="center"
                startIcon={<SaveIcon />}
                variant="contained"
                sx={{
                  width: "100%",
                  justifyContent: "center",
                  paddingTop: "25px",
                  borderRadius: "10px",
                }}
              >
                Save
              </LoadingButton>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
///////////////////////////////////////////////////

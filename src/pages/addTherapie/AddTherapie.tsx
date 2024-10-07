import "./AddTherapie.css";
import {
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
import { IContact } from "../../models/Contact"; // Newly created interface
import { SelectChangeEvent } from "@mui/material";
import { useNavigate } from "react-router-dom";
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
  const [contacts, setContacts] = useState<IContact[]>([]);
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]); // For doctors
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Handle back button click
  const handleClick = () => {
    navigate("/therapies");
  };

  // Fetch medicines and contacts from db.json
  useEffect(() => {
    fetch("http://localhost:3000/medicines")
      .then((response) => {
        if (!response.ok) throw new Error("Error fetching medicines");
        return response.json();
      })
      .then((data) => setMedecines(data))
      .catch((error) => {
        setError("Error fetching medicines");
        console.error(error);
      });

    fetch("http://localhost:3000/contacts")
      .then((response) => {
        if (!response.ok) throw new Error("Error fetching contacts");
        return response.json();
      })
      .then((data) => setContacts(data))
      .catch((error) => {
        setError("Error fetching contacts");
        console.error(error);
      });
  }, []);

  // Handle change for multiple select of medicines
  const handleMedicineChange = (event: SelectChangeEvent<typeof selectedMedecines>) => {
    const {
      target: { value },
    } = event;
    setSelectedMedecines(typeof value === "string" ? value.split(",") : value);
  };

  // Handle change for multiple select of contacts (doctors)
  const handleContactChange = (event: SelectChangeEvent<typeof selectedContacts>) => {
    const {
      target: { value },
    } = event;
    setSelectedContacts(typeof value === "string" ? value.split(",") : value);
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

            {/* Select Medications */}
            <div className="selectZone">
              <Typography sx={{ fontWeight: 700 }}>
                Select one or more medicines
              </Typography>
              <FormControl sx={{ m: 1, width: 310 }}>
                <InputLabel id="medecines-multiple-checkbox-label">Medecines</InputLabel>
                <Select
                  labelId="medecines-multiple-checkbox-label"
                  id="medecines-multiple-checkbox"
                  multiple
                  value={selectedMedecines}
                  onChange={handleMedicineChange}
                  input={<OutlinedInput label="Medecines" />}
                  renderValue={(selected) => selected.join(", ")}
                  MenuProps={MenuProps}
                >
                  {medecines.map((medecine) => (
                    <MenuItem key={medecine.id} value={medecine.name}>
                      <Checkbox checked={selectedMedecines.includes(medecine.name)} />
                      <ListItemText primary={medecine.name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>

            {/* Add Another Medication */}
            <div className="selectZone">
              <Typography sx={{ fontWeight: 700 }}>Add another medication</Typography>
              <FormControl sx={{ m: 1, width: 310 }}>
                <InputLabel id="add-medicine-label">Medecines</InputLabel>
                <Select
                  labelId="add-medicine-label"
                  multiple
                  value={selectedMedecines}
                  onChange={handleMedicineChange}
                  input={<OutlinedInput label="Medecines" />}
                  renderValue={(selected) => selected.join(", ")}
                  MenuProps={MenuProps}
                >
                  {medecines.map((medecine) => (
                    <MenuItem key={medecine.id} value={medecine.name}>
                      <Checkbox checked={selectedMedecines.includes(medecine.name)} />
                      <ListItemText primary={medecine.name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>

            {/* Select a Doctor */}
            <div className="selectZone">
              <Typography sx={{ fontWeight: 700 }}>Select a doctor</Typography>
              <FormControl sx={{ m: 1, width: 310 }}>
                <InputLabel id="contacts-multiple-checkbox-label">Doctors</InputLabel>
                <Select
                  labelId="contacts-multiple-checkbox-label"
                  id="contacts-multiple-checkbox"
                  multiple
                  value={selectedContacts}
                  onChange={handleContactChange}
                  input={<OutlinedInput label="Doctors" />}
                  renderValue={(selected) => selected.join(", ")}
                  MenuProps={MenuProps}
                >
                  {contacts.map((contact) => (
                    <MenuItem key={contact.id} value={contact.name}>
                      <Checkbox checked={selectedContacts.includes(contact.name)} />
                      <ListItemText primary={contact.name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>

            {/* Notes */}
            <TextField
              id="outlined-multiline-static"
              label="Notes"
              multiline
              rows={4}
              sx={{ width: "310px" }}
            />

          </div>
          {error && <Typography color="error">{error}</Typography>}
          <div className="saveButton">
            <div className="buttn">
              <LoadingButton
                size="small"
                color="error"
                onClick={() => setLoading(true)}
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

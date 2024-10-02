
import { useNavigate } from 'react-router-dom';
import { IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export function AddEditTherapie() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/therapies');  // Navigate back to Therapie page
  };

  return (
    <div>
        <h1>Here is the page to Edit a therapy</h1>
      {/* Back button to return to Therapie page */}
      <IconButton onClick={handleBack}>
        <ArrowBackIcon />
      </IconButton>
    </div>
  );
};

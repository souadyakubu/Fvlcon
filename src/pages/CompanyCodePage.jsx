import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Logo from './Logo'; 
import axios from 'axios';

const CompanyCodePage = () => {
  const [showLogo, setShowLogo] = useState(true);
  const [fadeOutText, setFadeOutText] = useState(false);
  const [companyCode, setCompanyCode] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fadeOutTextTimer = setTimeout(() => {
      setFadeOutText(true);
    }, 2000);

    const showFormTimer = setTimeout(() => {
      setShowLogo(false);
    }, 4000);

    return () => {
      clearTimeout(fadeOutTextTimer);
      clearTimeout(showFormTimer);
    };
  }, []);

  const handleCodeSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:3001/verify-code', { code: companyCode });
      if (response.data.valid) {
        navigate('/login'); // Correct the case sensitivity if your route is defined as '/login'
      } else {
        alert('Invalid company code.');
      }
    } catch (error) {
      console.error('Error verifying code:', error);
      alert('There was a problem verifying the company code.');
    }
  };

  if (showLogo) {
    return <Logo fadeOutText={fadeOutText} />;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: 'black'
      }}
    >
      <TextField
        label="Company Code"
        variant="outlined"
        value={companyCode}
        onChange={(e) => setCompanyCode(e.target.value)}
        sx={{
          mb: 2,
          input: { color: 'white' },
          label: { color: 'white' },
          '& .MuiOutlinedInput-root': {
            '& fieldset': { borderColor: 'white' },
            '&:hover fieldset': { borderColor: 'white' },
            '&.Mui-focused fieldset': { borderColor: 'white' },
          }
        }}
      />
      <Button
        variant="contained"
        endIcon={<ArrowForwardIcon />}
        onClick={handleCodeSubmit}
        sx={{
          color: 'white',
          backgroundColor: 'grey',
          '&:hover': {
            backgroundColor: 'darkgrey',
          },
        }}
      >
        Submit
      </Button>
    </Box>
  );
};

export default CompanyCodePage;

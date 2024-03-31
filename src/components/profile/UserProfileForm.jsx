import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebaseconfig';
import Cookies from 'js-cookie';
import languagesData from '../main/data/languages.json';
import {
    TextField,
    Button,
    Box,
    Container,
    Paper,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    OutlinedInput,
    Typography,
    Slide
} from '@mui/material';

const UserProfileForm = ({ onSave }) => {
    const [formData, setFormData] = useState({
        username: '',
        name: '',
        age: '',
        nativeLanguage: '',
        learningLanguages: [],
        additionalInfo: ''
    });
    const [activeStep, setActiveStep] = useState(0);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleNext = () => {
        if (activeStep < formFields.length - 1) {
            setActiveStep(prevActiveStep => prevActiveStep + 1);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userId = Cookies.get("user_id");
        const profileDocRef = doc(db, 'profiles', userId);

        try {
            await setDoc(profileDocRef, formData);
            onSave(formData);  // Assuming onSave updates the parent state or context
            navigate('/learn');  // Navigate after successful profile update
        } catch (error) {
            console.error("Error saving profile:", error);
        }
    };

    const formFields = [
        { label: 'Username', name: 'username', type: 'text' },
        { label: 'Name', name: 'name', type: 'text' },
        { label: 'Age', name: 'age', type: 'number' },
        { label: 'Native Language', name: 'nativeLanguage', type: 'select', options: languagesData },
        { label: 'Languages You Want to Learn', name: 'learningLanguages', type: 'select', options: languagesData, multiple: true },
        { label: 'Additional Information About You', name: 'additionalInfo', type: 'textarea' }
    ];

    const currentField = formFields[activeStep];

    return (
        <Container component="main" maxWidth="sm" sx={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center' }}>
            <Paper elevation={3} sx={{ p: 4, width: '100%', maxWidth: '500px' }}>
                <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold', color: 'primary.main' }}>
                    {`Step ${activeStep + 1} of ${formFields.length}: ${currentField.label}`}
                </Typography>
                <Slide direction="left" in={true} mountOnEnter unmountOnExit>
                    <Box>
                        <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
                            {currentField.type === 'select' ? (
                                <>
                                    <InputLabel>{currentField.label}</InputLabel>
                                    <Select
                                        multiple={currentField.multiple}
                                        name={currentField.name}
                                        value={formData[currentField.name]}
                                        onChange={handleChange}
                                        label={currentField.label}
                                    >
                                        {Object.keys(currentField.options).map(option => (
                                            <MenuItem key={option} value={option}>
                                                {option}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </>
                            ) : currentField.type === 'textarea' ? (
                                <TextField
                                    label={currentField.label}
                                    name={currentField.name}
                                    value={formData[currentField.name]}
                                    onChange={handleChange}
                                    variant="outlined"
                                    fullWidth
                                    multiline
                                    rows={4}
                                />
                            ) : (
                                <TextField
                                    label={currentField.label}
                                    name={currentField.name}
                                    type={currentField.type}
                                    value={formData[currentField.name]}
                                    onChange={handleChange}
                                    variant="outlined"
                                    fullWidth
                                />
                            )}
                        </FormControl>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            {activeStep < formFields.length - 1 ? (
                                <Button variant="contained" color="primary" onClick={handleNext}>
                                    Next
                                </Button>
                            ) : (
                                <Button variant="contained" color="primary" onClick={handleSubmit}>
                                    Save Profile
                                </Button>
                            )}
                        </Box>
                    </Box>
                </Slide>
            </Paper>
        </Container>
    );
};

export default UserProfileForm;

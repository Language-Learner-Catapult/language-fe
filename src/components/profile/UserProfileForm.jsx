import React, { useState } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebaseconfig';
import Cookies from 'js-cookie';
import languagesData from '../main/data/languages.json'; // Adjust the path as necessary
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleNext = () => {
        if (activeStep < Object.keys(formData).length - 1) {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userId = Cookies.get("user_id");
        const profileDocRef = doc(db, 'profiles', userId);

        try {
            await setDoc(profileDocRef, formData);
            onSave(formData);
        } catch (error) {
            console.error("Error saving profile:", error);
        }
    };

    const formFields = [
        { label: 'Username', name: 'username', type: 'text' },
        { label: 'Name', name: 'name', type: 'text' },
        { label: 'Age', name: 'age', type: 'number' },
        { label: 'Native Language', name: 'nativeLanguage', type: 'select', options: languagesData },
        { label: 'Learning Languages', name: 'learningLanguages', type: 'select', options: languagesData, multiple: true },
        { label: 'Additional Information', name: 'additionalInfo', type: 'textarea' }
    ];

    const currentField = formFields[activeStep];

    return (
        <Container component="main" maxWidth="sm" sx={{ display: 'flex', height: '100vh' }}>
            <Paper elevation={3} sx={{ margin: 'auto', p: 4, width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Slide direction="left" in={true} mountOnEnter unmountOnExit>
                    <Box sx={{ marginBottom: 2 }}>
                        {currentField.type === 'select' ? (
                            <FormControl fullWidth variant="outlined">
                                <InputLabel>{currentField.label}</InputLabel>
                                <Select
                                    multiple={currentField.multiple}
                                    name={currentField.name}
                                    value={formData[currentField.name]}
                                    onChange={handleChange}
                                    label={currentField.label}
                                >
                                    {Object.keys(currentField.options).map((option) => (
                                        <MenuItem key={option} value={option}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
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
                    </Box>
                </Slide>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    {activeStep < formFields.length - 1 ? (
                        <Button variant="contained" onClick={handleNext}>
                            Next
                        </Button>
                    ) : (
                        <Button variant="contained" onClick={handleSubmit}>
                            Save Profile
                        </Button>
                    )}
                </Box>
            </Paper>
        </Container>
    );
};

export default UserProfileForm;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Box, Container, Paper, FormControl, InputLabel, Select, MenuItem, OutlinedInput } from '@mui/material';
import languagesData from '../main/data/languages.json'; // Adjust the path as necessary

const ProfileDisplay = ({ profile, onSave }) => {
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState(profile);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
        setEditMode(false);
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            <Paper elevation={3} sx={{ p: 4, position: 'relative' }}>
                {editMode ? (
                    <Box component="form" onSubmit={handleSubmit} sx={{ '& .MuiTextField-root': { mb: 2, width: '100%' } }}>
                        <TextField
                            label="Username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            variant="outlined"
                        />
                        <TextField
                            label="Name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            variant="outlined"
                        />
                        <TextField
                            label="Age"
                            name="age"
                            type="number"
                            value={formData.age}
                            onChange={handleChange}
                            variant="outlined"
                        />
                        <FormControl fullWidth sx={{ mb: 2 }}>
                            <InputLabel>Native Language</InputLabel>
                            <Select
                                name="nativeLanguage"
                                value={formData.nativeLanguage}
                                onChange={handleChange}
                                input={<OutlinedInput label="Native Language" />}
                            >
                                {Object.keys(languagesData).map((language) => (
                                    <MenuItem key={language} value={language}>{language}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth sx={{ mb: 2 }}>
                            <InputLabel>Learning Languages</InputLabel>
                            <Select
                                multiple
                                name="learningLanguages"
                                value={formData.learningLanguages}
                                onChange={handleChange}
                                input={<OutlinedInput label="Learning Languages" />}
                                renderValue={(selected) => selected.join(', ')}
                            >
                                {Object.keys(languagesData).map((language) => (
                                    <MenuItem key={language} value={language}>{language}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <TextField
                            label="Additional Information"
                            name="additionalInfo"
                            value={formData.additionalInfo}
                            onChange={handleChange}
                            variant="outlined"
                            fullWidth
                            multiline
                            rows={4}
                        />
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                            <Button variant="outlined" color="primary" onClick={() => navigate('/learn')}>
                                Go Back
                            </Button>
                            <Button type="submit" variant="contained" color="primary">
                                Save Changes
                            </Button>
                        </Box>
                    </Box>
                ) : (
                    <Box>
                        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
                            Profile Information
                        </Typography>
                        <Typography variant="subtitle1" sx={{ mb: 0.5 }}>Username: {profile.username}</Typography>
                        <Typography variant="subtitle1" sx={{ mb: 0.5 }}>Name: {profile.name}</Typography>
                        <Typography variant="subtitle1" sx={{ mb: 0.5 }}>Age: {profile.age}</Typography>
                        <Typography variant="subtitle1" sx={{ mb: 0.5 }}>Native Language: {profile.nativeLanguage}</Typography>
                        <Typography variant="subtitle1" sx={{ mb: 0.5 }}>
                            Learning Languages: {profile.learningLanguages.join(', ')}
                        </Typography>
                        <Typography variant="subtitle1" sx={{ mb: 0.5 }}>
                            Additional Information: {profile.additionalInfo}
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                            <Button variant="outlined" color="primary" onClick={() => navigate('/learn')}>
                                Go Back
                            </Button>
                            <Button onClick={() => setEditMode(true)} variant="outlined" color="primary">
                                Edit Profile
                            </Button>
                        </Box>
                    </Box>
                )}
            </Paper>
        </Container>
    );
};

export default ProfileDisplay;

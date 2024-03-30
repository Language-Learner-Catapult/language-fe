import React, { useContext } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { LanguageContext } from '../language-context/LanguageContext';
import languagesData from '../data/languages.json';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
const LanguageSelector = () => {
    const { currentLanguage, setCurrentLanguage } = useContext(LanguageContext);

    const handleChange = (event) => {
        setCurrentLanguage(event.target.value);
    };

    return (
        <Select
            value={currentLanguage}
            onChange={handleChange}
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
            IconComponent={ArrowDropDownIcon} // Adding dropdown icon
            sx={{ color: 'white', '& .MuiSvgIcon-root': { color: 'white' } }}
        >
            {Object.keys(languagesData).map((language) => (
                <MenuItem key={language} value={language}>{language}</MenuItem>
            ))}
        </Select>
    );
};

export default LanguageSelector;

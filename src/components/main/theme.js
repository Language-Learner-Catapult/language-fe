import { createTheme } from '@mui/material/styles';

// Define your color palette here
const palette = {
    primary: {
        main: '#556cd6', // Replace with your primary color
        light: '#7986cb', // Replace with a lighter shade
        dark: '#303f9f', // Replace with a darker shade
        contrastText: '#ffffff', // Text color for contrast
    },
    secondary: {
        main: '#19857b', // Replace with your secondary color
        light: '#33ab9f', // Replace with a lighter shade
        dark: '#005f56', // Replace with a darker shade
        contrastText: '#000000', // Text color for contrast
    },
    background: {
        default: '#f4f6f8', // Replace with your default background color
        paper: '#ffffff', // Background for paper-based components
    },
    text: {
        primary: '#2d3436', // Main text color
        secondary: '#636e72', // Secondary text color
    },
    // You can also add other colors like error, warning, info, success, etc.
};

// Define your typography here
const typography = {
    fontFamily: [
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
    ].join(','), // Replace with your font stack
    h1: {
        fontSize: '2.5rem', // Customize size for h1
    },
    // Continue with other variants like h2, h3, subtitle1, body1, etc.
};

// Override component styles
const components = {
    MuiButton: { // Example for Button component
        styleOverrides: {
            root: {
                textTransform: 'none', // Buttons don't have uppercase text by default
                // Add more style overrides here
            },
        },
    },
    // You can override other components in a similar way
};

// Customize breakpoints for responsive design if necessary
const breakpoints = {
    values: {
        xs: 0,
        sm: 600,
        md: 960,
        lg: 1280,
        xl: 1920,
    },
};

const theme = createTheme({
    palette,
    typography,
    components,
    breakpoints,
    // You can also add custom properties or functions that you might want to use across your components
});

export default theme;

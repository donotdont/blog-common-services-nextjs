'use client';
import { Roboto } from 'next/font/google';
import { createTheme } from '@mui/material/styles';
import { red, deepOrange } from '@mui/material/colors';

const roboto = Roboto({
    weight: ['300', '400', '500', '700'],
    subsets: ['latin'],
    display: 'swap',
});

const theme = createTheme({
    palette: {
        primary: deepOrange,
        secondary: red
    },
    typography: {
        fontFamily: roboto.style.fontFamily,
    },
    /*typography: {
        fontFamily: [
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif'
        ].join(','),
    },*/
});

export default theme;
import React from 'react';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './Header';
import Footer from './Footer';

const Layout = () => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <ToastContainer position="top-right" autoClose={2500} theme="colored" />
            <Header />
            <Box component="main" sx={{ flexGrow: 1, py: 3, pt: 10 }}>
                <Outlet />
            </Box>
            <Footer />
        </Box>
    );
};

export default Layout;
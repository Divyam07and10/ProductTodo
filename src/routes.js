
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import App from './App';
import ProductsModule from './modules/products';
import { Box, Button } from '@mui/material';

import Layout from './modules/shared/Layout';

// Navigation Wrapper to easy switching
const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<App />} />
            <Route element={<Layout />}>
                <Route path="/products" element={<ProductsModule />} />
            </Route>
            {/* Add new routes here easily */}
        </Routes>
    );
};

export default AppRoutes;

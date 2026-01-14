import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProductsModule from './modules/products';
import App from './App';
import Layout from './shared/components/Layout';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<App />} />
            <Route element={<Layout />}>
                <Route path="/products" element={<ProductsModule />} />
            </Route>
        </Routes>
    );
};

export default AppRoutes;

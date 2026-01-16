import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProductsModule from './modules/products';
import CategoryModule from './modules/category';
import App from './App';
import Layout from './shared/components/Layout';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<App />} />
            <Route element={<Layout />}>
                <Route path="/products" element={<ProductsModule />} />
                <Route path="/category" element={<CategoryModule />} />
                <Route path="/category/:id" element={<CategoryModule />} />
            </Route>
        </Routes>
    );
};

export default AppRoutes;

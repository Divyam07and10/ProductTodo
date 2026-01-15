import React from 'react';
import { ProductProvider } from '../../context/ProductContext';
import ProductView from './view';

const ProductsModule = () => {
    return (
        <ProductProvider>
            <ProductView />
        </ProductProvider>
    );
};

export default ProductsModule;

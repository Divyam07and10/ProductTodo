import React from 'react';
import { CategoryProvider } from '../../../context/CategoryContext';
import { ProductProvider } from '../../../context/ProductContext';
import CategoryDetailView from './view';

const CategoryDetailModule = () => {
    return (
        <CategoryProvider>
            <ProductProvider>
                <CategoryDetailView />
            </ProductProvider>
        </CategoryProvider>
    );
};

export default CategoryDetailModule;

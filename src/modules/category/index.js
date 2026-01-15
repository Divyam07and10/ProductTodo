import React from 'react';
import { CategoryProvider } from '../../context/CategoryContext';
import CategoryView from './view';

const CategoryModule = () => {
    return (
        <CategoryProvider>
            <CategoryView />
        </CategoryProvider>
    );
};

export default CategoryModule;

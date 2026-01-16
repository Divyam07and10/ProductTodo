import React from 'react';
import { useParams } from 'react-router-dom';
import { CategoryProvider } from '../../context/CategoryContext';
import CategoryView from './view';
import CategoryDetailModule from './details';

const CategoryModule = () => {
    const { id } = useParams();

    if (id) {
        return <CategoryDetailModule />;
    }

    return (
        <CategoryProvider>
            <CategoryView />
        </CategoryProvider>
    );
};

export default CategoryModule;

import { CATEGORIES } from '../../lib/constants';

let categories = [...CATEGORIES];

export const getCategories = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([...categories]);
        }, 500);
    });
};

export const addCategory = (category) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const newCategory = {
                ...category,
                id: categories.length > 0 ? Math.max(...categories.map((c) => c.id)) + 1 : 1,
            };
            categories = [...categories, newCategory];
            resolve([...categories]);
        }, 500);
    });
};

export const updateCategory = (updatedCategory) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            categories = categories.map((c) =>
                c.id === updatedCategory.id ? updatedCategory : c
            );
            resolve([...categories]);
        }, 500);
    });
};

export const deleteCategory = (id) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            categories = categories.filter((c) => (c.id !== id && c.value !== id));
            resolve([...categories]);
        }, 500);
    });
};
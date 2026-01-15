import { CATEGORIES } from '../../lib/constants';

export const getCategories = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([...CATEGORIES]);
        }, 500);
    });
};

export const addCategory = (category) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const newCategory = {
                ...category,
                id: CATEGORIES.length > 0 ? Math.max(...CATEGORIES.map((c) => c.id)) + 1 : 1,
            };
            CATEGORIES = [...CATEGORIES, newCategory];
            resolve([...CATEGORIES]);
        }, 500);
    });
};

export const updateCategory = (updatedCategory) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            CATEGORIES = CATEGORIES.map((c) =>
                (c.value === updatedCategory.value || c.id === updatedCategory.id) ? updatedCategory : c
            );
            resolve([...CATEGORIES]);
        }, 500);
    });
};

export const deleteCategory = (value) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            CATEGORIES = CATEGORIES.filter((c) => c.value !== value);
            resolve([...CATEGORIES]);
        }, 500);
    });
};
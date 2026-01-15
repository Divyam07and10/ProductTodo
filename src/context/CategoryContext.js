import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { toast } from 'react-toastify';
import * as service from '../modules/category/service';
import { getProducts } from '../modules/products/service';

const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
    const [categories, setCategories] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [currentCategory, setCurrentCategory] = useState(null);
    const [categoryIdToDelete, setCategoryIdToDelete] = useState(null);

    useEffect(() => {
        service.getCategories()
            .then(setCategories)
            .catch(() => toast.error('Failed to load categories'));
    }, []);

    const displayedCategories = useMemo(() => {
        return categories
            .filter(c => {
                const matchesSearch = !searchQuery || c.value.toLowerCase().includes(searchQuery.toLowerCase()) || c.label.toLowerCase().includes(searchQuery.toLowerCase());
                return matchesSearch;
            })
    }, [categories, searchQuery]);

    const handleSave = async (e) => {
        e.preventDefault();

        const categoryName = currentCategory.name?.trim();
        const categoryColor = currentCategory.color;

        if (!categoryName) {
            toast.error('Category name is required');
            return;
        }

        const isEdit = !!currentCategory?.id;

        const duplicateName = categories.find(c =>
            c.value?.toLowerCase() === categoryName.toLowerCase() && (!isEdit || c.id !== currentCategory.id)
        );
        const duplicateColor = categories.find(c =>
            c.color === categoryColor && (!isEdit || c.id !== currentCategory.id)
        );

        if (duplicateName) {
            toast.error('A category with this name already exists');
            return;
        }
        if (duplicateColor) {
            toast.error('A category with this color already exists');
            return;
        }

        try {
            const categoryToSave = {
                ...currentCategory,
                value: categoryName,
                label: isEdit ? currentCategory.label : categoryName.toLowerCase(),
                color: categoryColor || '#000000' // Ensure color is present
            };

            const data = await (isEdit ? service.updateCategory(categoryToSave) : service.addCategory(categoryToSave));
            setCategories(data);
            toast.success(`Category ${isEdit ? 'updated' : 'added'} successfully`);
            setIsDialogOpen(false);
        } catch (err) {
            toast.error('Save failed');
        }
    };

    const handleDelete = async () => {
        try {
            const category = categoryIdToDelete;
            const products = await getProducts();
            const isUsed = products.some(p => p.category === category.label || p.category === category.value);

            if (isUsed) {
                toast.error(`Cannot delete "${category.value}" because it is linked to products`);
                setCategoryIdToDelete(null);
                return;
            }

            const data = await service.deleteCategory(category.id || category.value);
            setCategories(data);
            toast.success('Category deleted successfully');
            setCategoryIdToDelete(null);
        } catch (err) {
            toast.error('Category Deletion failed');
        }
    };

    const value = {
        categories: displayedCategories,
        searchQuery, setSearchQuery,
        isDialogOpen, setIsDialogOpen,
        currentCategory, setCurrentCategory,
        categoryIdToDelete, setCategoryIdToDelete,
        onSave: handleSave,
        onDeleteConfirm: handleDelete,
        onClear: () => {
            setSearchQuery('');
            toast.success('Filters Reset Successfully');
        },
        onAdd: () => { setCurrentCategory({ name: '', color: '#000000' }); setIsDialogOpen(true); },
        onEdit: (c) => { setCurrentCategory({ ...c, name: c.value }); setIsDialogOpen(true); },
        onDeleteClick: (c) => setCategoryIdToDelete(c),
        onDeleteCancel: () => setCategoryIdToDelete(null),
        onClose: () => setIsDialogOpen(false),
        onInputChange: (k, v) => setCurrentCategory(prev => ({ ...prev, [k]: v }))
    };

    return (
        <CategoryContext.Provider value={value}>
            {children}
        </CategoryContext.Provider>
    );
};

export const useCategoryContext = () => {
    return useContext(CategoryContext);
};

export default CategoryContext;
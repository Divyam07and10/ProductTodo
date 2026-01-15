import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { toast } from 'react-toastify';
import * as service from '../modules/category/service';

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
        try {
            const isEdit = !!currentCategory?.id;
            const data = await (isEdit ? service.updateCategory(currentCategory) : service.addCategory(currentCategory));
            setCategories(data);
            toast.success(`Category ${isEdit ? 'updated' : 'added'} successfully`);
            setIsDialogOpen(false);
        } catch (err) {
            toast.error('Save failed');
        }
    };

    const handleDelete = async () => {
        try {
            const data = await service.deleteCategory(categoryIdToDelete);
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
        onAdd: () => { setCurrentCategory({}); setIsDialogOpen(true); },
        onEdit: (c) => { setCurrentCategory({ ...c }); setIsDialogOpen(true); },
        onDeleteClick: (id) => setCategoryIdToDelete(id),
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
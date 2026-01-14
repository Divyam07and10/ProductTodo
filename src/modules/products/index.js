
import React, { useState, useEffect, useMemo } from 'react';
import { toast } from 'react-toastify';
import ProductContext from '../../context/ProductContext';
import ProductView from './view';
import * as service from './service';

const ProductsModule = () => {
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterCategory, setFilterCategory] = useState('all');
    const [sortBy, setSortBy] = useState('default');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null);
    const [productIdToDelete, setProductIdToDelete] = useState(null);
    const [formErrors, setFormErrors] = useState({});

    useEffect(() => {
        service.getProducts()
            .then(setProducts)
            .catch(() => toast.error('Failed to load products'));
    }, []);

    const displayedProducts = useMemo(() => {
        let result = [...products];
        if (searchQuery) result = result.filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()));
        if (filterCategory !== 'all') result = result.filter(p => p.category === filterCategory);
        return result.sort((a, b) => {
            if (sortBy === 'price_asc') return a.price - b.price;
            if (sortBy === 'price_desc') return b.price - a.price;
            return a.id - b.id;
        });
    }, [products, searchQuery, filterCategory, sortBy]);

    const validate = () => {
        const errors = {};
        const { title, category, price, stock, rating } = currentProduct || {};

        if (!title) errors.title = 'Title is required';
        if (!category) errors.category = 'Category is required';

        const p = parseFloat(price);
        if (isNaN(p) || p < 1) errors.price = 'Price must be at least 1';

        const s = parseInt(stock);
        if (isNaN(s) || s < 1) errors.stock = 'Stock must be at least 1';

        const r = parseFloat(rating);
        if (isNaN(r) || r < 0 || r > 5) errors.rating = 'Rating must be 0-5';

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const saveProduct = async () => {
        if (!validate()) return;

        try {
            const isEdit = !!currentProduct.id;
            const saved = await (isEdit ? service.updateProduct(currentProduct) : service.addProduct(currentProduct));
            setProducts(prev => isEdit ? prev.map(p => p.id === saved.id ? saved : p) : [...prev, saved]);
            toast.success(`Product ${isEdit ? 'updated' : 'added'} successfully`);
            setIsDialogOpen(false);
            setFormErrors({});
        } catch (err) {
            toast.error('Save failed');
        }
    };

    const confirmDelete = async () => {
        try {
            await service.deleteProduct(productIdToDelete);
            setProducts(prev => prev.filter(p => p.id !== productIdToDelete));
            toast.success('Product deleted successfully');
            setProductIdToDelete(null);
        } catch (err) {
            toast.error('Product Deletion failed');
        }
    };

    return (
        <ProductContext.Provider value={displayedProducts}>
            <ProductView
                ui={{ searchQuery, filterCategory, sortBy, isDialogOpen, currentProduct, productIdToDelete, formErrors }}
                actions={{
                    setSearchQuery,
                    setFilterCategory,
                    setSortBy,
                    onClear: () => {
                        setSearchQuery(''); setFilterCategory('all'); setSortBy('default');
                        toast.success('Filters Reseted Successfully');
                    },
                    onAdd: () => { setCurrentProduct({}); setIsDialogOpen(true); setFormErrors({}); },
                    onEdit: (p) => { setCurrentProduct({ ...p }); setIsDialogOpen(true); setFormErrors({}); },
                    onDeleteClick: (id) => setProductIdToDelete(id),
                    onDeleteConfirm: confirmDelete,
                    onDeleteCancel: () => setProductIdToDelete(null),
                    onClose: () => { setIsDialogOpen(false); setFormErrors({}); },
                    onSave: saveProduct,
                    onInputChange: (k, v) => {
                        setCurrentProduct(prev => ({ ...prev, [k]: v }));
                        if (formErrors[k]) setFormErrors(prev => ({ ...prev, [k]: null }));
                    }
                }}
            />
        </ProductContext.Provider>
    );
};

export default ProductsModule;

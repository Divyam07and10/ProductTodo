
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

    useEffect(() => {
        service.getProducts()
            .then(setProducts)
            .catch(() => toast.error('Failed to load products'));
    }, []);

    const displayedProducts = useMemo(() => {
        let result = [...products];

        if (searchQuery) {
            result = result.filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()));
        }

        if (filterCategory !== 'all') {
            result = result.filter(p => p.category === filterCategory);
        }

        return result.sort((a, b) => {
            if (sortBy === 'price_asc') return a.price - b.price;
            if (sortBy === 'price_desc') return b.price - a.price;
            return a.id - b.id;
        });
    }, [products, searchQuery, filterCategory, sortBy]);

    const saveProduct = async () => {
        if (!currentProduct.title || !currentProduct.price) {
            return toast.warn('Title and Price are required');
        }

        try {
            const isEdit = !!currentProduct.id;
            const saved = await (isEdit ? service.updateProduct(currentProduct) : service.addProduct(currentProduct));

            setProducts(prev => isEdit
                ? prev.map(p => p.id === saved.id ? saved : p)
                : [...prev, saved]
            );

            toast.success(`Product ${isEdit ? 'updated' : 'added'}`);
            setIsDialogOpen(false);
        } catch (err) {
            toast.error('Save operation failed');
        }
    };

    const deleteProduct = async (id) => {
        if (!window.confirm('Are you sure you want to delete this product?')) return;
        try {
            await service.deleteProduct(id);
            setProducts(prev => prev.filter(p => p.id !== id));
            toast.success('Product deleted');
        } catch (err) {
            toast.error('Delete operation failed');
        }
    };

    return (
        <ProductContext.Provider value={displayedProducts}>
            <ProductView
                ui={{ searchQuery, filterCategory, sortBy, isDialogOpen, currentProduct }}
                actions={{
                    setSearchQuery,
                    setFilterCategory,
                    setSortBy,
                    onClear: () => { setSearchQuery(''); setFilterCategory('all'); setSortBy('default'); },
                    onAdd: () => { setCurrentProduct({}); setIsDialogOpen(true); },
                    onEdit: (p) => { setCurrentProduct({ ...p }); setIsDialogOpen(true); },
                    onDelete: deleteProduct,
                    onClose: () => setIsDialogOpen(false),
                    onSave: saveProduct,
                    onInputChange: (k, v) => setCurrentProduct(prev => ({ ...prev, [k]: v }))
                }}
            />
        </ProductContext.Provider>
    );
};

export default ProductsModule;

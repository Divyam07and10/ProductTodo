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

    useEffect(() => {
        service.getProducts().then(setProducts).catch(() => toast.error('Failed to load products'));
    }, []);

    const displayedProducts = useMemo(() => {
        return products
            .filter(p => {
                const matchesSearch = !searchQuery || p.title.toLowerCase().includes(searchQuery.toLowerCase());
                const matchesCategory = filterCategory === 'all' || p.category === filterCategory;
                return matchesSearch && matchesCategory;
            })
            .sort((a, b) => {
                if (sortBy === 'price_asc') return a.price - b.price;
                if (sortBy === 'price_desc') return b.price - a.price;
                return a.id - b.id;
            });
    }, [products, searchQuery, filterCategory, sortBy]);

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            const isEdit = !!currentProduct.id;
            const data = await (isEdit ? service.updateProduct(currentProduct) : service.addProduct(currentProduct));
            setProducts(data);
            toast.success(`Product ${isEdit ? 'updated' : 'added'} successfully`);
            setIsDialogOpen(false);
        } catch (err) {
            toast.error('Save failed');
        }
    };

    const handleDelete = async () => {
        try {
            const data = await service.deleteProduct(productIdToDelete);
            setProducts(data);
            toast.success('Product deleted successfully');
            setProductIdToDelete(null);
        } catch (err) {
            toast.error('Product Deletion failed');
        }
    };

    const contextValue = {
        products: displayedProducts,
        searchQuery, setSearchQuery,
        filterCategory, setFilterCategory,
        sortBy, setSortBy,
        isDialogOpen, setIsDialogOpen,
        currentProduct, setCurrentProduct,
        productIdToDelete, setProductIdToDelete,
        onSave: handleSave,
        onDeleteConfirm: handleDelete,
        onClear: () => { setSearchQuery(''); setFilterCategory('all'); setSortBy('default'); toast.success('Filters Reseted Successfully'); },
        onAdd: () => { setCurrentProduct({}); setIsDialogOpen(true); },
        onEdit: (p) => { setCurrentProduct({ ...p }); setIsDialogOpen(true); },
        onDeleteClick: (id) => setProductIdToDelete(id),
        onDeleteCancel: () => setProductIdToDelete(null),
        onClose: () => setIsDialogOpen(false),
        onInputChange: (k, v) => setCurrentProduct(prev => ({ ...prev, [k]: v }))
    };

    return (
        <ProductContext.Provider value={contextValue}>
            <ProductView />
        </ProductContext.Provider>
    );
};

export default ProductsModule;


import React, { useState, useEffect, useMemo } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProductView from './view';
import { getProducts, addProduct, updateProduct, deleteProduct } from './service';

const ProductsModule = () => {
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterCategory, setFilterCategory] = useState('all');
    const [sortBy, setSortBy] = useState('default');

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null);

    // Fetch products on mount
    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const data = await getProducts();
            setProducts(data);
        } catch (error) {
            toast.error('Failed to fetch products');
        }
    };

    // Advanced Filtering and Sorting Logic
    const processedProducts = useMemo(() => {
        let result = [...products];

        // 1. Filter by Search
        if (searchQuery) {
            const lowerQuery = searchQuery.toLowerCase();
            result = result.filter(p =>
                p.title.toLowerCase().includes(lowerQuery)
            );
        }

        // 2. Filter by Category
        if (filterCategory !== 'all') {
            result = result.filter(p => p.category === filterCategory);
        }

        // 3. Sorting
        switch (sortBy) {
            case 'price_asc':
                result.sort((a, b) => a.price - b.price);
                break;
            case 'price_desc':
                result.sort((a, b) => b.price - a.price);
                break;
            default:
                // Default sort by ID Ascending (1, 2, 3...)
                result.sort((a, b) => a.id - b.id);
                break;
        }

        return result;
    }, [products, searchQuery, filterCategory, sortBy]);


    const handleSearchChange = (e) => setSearchQuery(e.target.value);
    const handleFilterChange = (e) => setFilterCategory(e.target.value);
    const handleSortChange = (e) => setSortBy(e.target.value);

    const handleClearFilters = () => {
        setSearchQuery('');
        setFilterCategory('all');
        setSortBy('default');
    };

    const handleAddClick = () => {
        setCurrentProduct({});
        setIsDialogOpen(true);
    };

    const handleEditClick = (product) => {
        setCurrentProduct({ ...product });
        setIsDialogOpen(true);
    };

    const handleDeleteClick = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await deleteProduct(id);
                setProducts(products.filter((p) => p.id !== id));
                toast.success('Product deleted successfully');
            } catch (error) {
                toast.error('Failed to delete product');
            }
        }
    };

    const handleDialogClose = () => {
        setIsDialogOpen(false);
        setCurrentProduct(null);
    };

    const handleDialogSave = async () => {
        if (!currentProduct.title || !currentProduct.price) {
            toast.warn('Please fill in required fields (Title, Price)');
            return;
        }

        try {
            if (currentProduct.id) {
                // Update
                const updated = await updateProduct(currentProduct);
                setProducts(products.map((p) => (p.id === updated.id ? updated : p)));
                toast.success('Product updated successfully');
            } else {
                // Add
                const added = await addProduct(currentProduct);
                setProducts([...products, added]); // Add to end to maintain ID order somewhat naturally, or re-sort will handle it
                toast.success('Product added successfully');
            }
            handleDialogClose();
        } catch (error) {
            toast.error('Failed to save product');
        }
    };

    const handleInputChange = (field, value) => {
        setCurrentProduct((prev) => ({ ...prev, [field]: value }));
    };

    return (
        <>
            <ToastContainer position="bottom-right" autoClose={3000} theme="colored" />
            <ProductView
                products={processedProducts}
                searchQuery={searchQuery}
                onSearchChange={handleSearchChange}
                filterCategory={filterCategory}
                onFilterChange={handleFilterChange}
                sortBy={sortBy}
                onSortChange={handleSortChange}
                onClearFilters={handleClearFilters}
                onAddClick={handleAddClick}
                onEditClick={handleEditClick}
                onDeleteClick={handleDeleteClick}
                isDialogOpen={isDialogOpen}
                handleDialogClose={handleDialogClose}
                handleDialogSave={handleDialogSave}
                currentProduct={currentProduct}
                handleInputChange={handleInputChange}
            />
        </>
    );
};

export default ProductsModule;

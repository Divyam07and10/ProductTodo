import React from 'react';
import {
    Box, Button, TextField, Paper, Select, MenuItem,
    InputLabel, FormControl, Typography
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';

import { useProductContext } from '../../context/ProductContext';
import { useCategoryContext } from '../../context/CategoryContext';
import ProductTable from '../../shared/components/ProductTable';
import ProductDialog from '../../shared/components/ProductDialog';
import DeleteDialog from '../../shared/components/DeleteDialog';

const ProductView = () => {
    const {
        products,
        searchQuery, setSearchQuery, filterCategory, setFilterCategory, sortBy, setSortBy,
        isDialogOpen, currentProduct, productIdToDelete,
        onAdd, onEdit, onDeleteClick, onDeleteConfirm, onDeleteCancel, onClose, onSave, onClear, onInputChange
    } = useProductContext();

    const { categories } = useCategoryContext();

    return (
        <Box sx={{ p: 4, maxWidth: 1400, mx: 'auto' }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 4 }}>Product Catalog</Typography>

            <Paper elevation={0} sx={{ p: 2, mb: 4, borderRadius: 4, display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap', border: '1px solid #e0e0e0' }}>
                <TextField placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} sx={{ flexGrow: 1, minWidth: 250 }} InputProps={{ startAdornment: <SearchIcon color="action" sx={{ mr: 1 }} /> }} />
                <FormControl sx={{ minWidth: 200 }}>
                    <InputLabel>Category</InputLabel>
                    <Select value={filterCategory} label="Category" onChange={(e) => setFilterCategory(e.target.value)}>
                        <MenuItem value="all">All Categories</MenuItem>
                        {categories.map(cat => (
                            <MenuItem key={cat.value} value={cat.value}>
                                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                                    <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: cat.color || '#e0e0e0' }} />
                                    {cat.value}
                                </Box>
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl sx={{ minWidth: 200 }}>
                    <InputLabel>Sort By</InputLabel>
                    <Select value={sortBy} label="Sort By" onChange={(e) => setSortBy(e.target.value)}>
                        <MenuItem value="default">Default (ID)</MenuItem>
                        <MenuItem value="price_asc">Price: Low to High</MenuItem>
                        <MenuItem value="price_desc">Price: High to Low</MenuItem>
                    </Select>
                </FormControl>
                <Button variant="outlined" size="large" onClick={onClear} startIcon={<RefreshIcon />} sx={{ height: 56 }}>Reset</Button>
                <Button variant="contained" size="large" onClick={onAdd} startIcon={<AddIcon />} sx={{ height: 56, ml: 'auto' }}>Add Product</Button>
            </Paper>

            <ProductTable products={products} onEdit={onEdit} onDeleteClick={onDeleteClick} />

            <ProductDialog
                open={isDialogOpen}
                currentProduct={currentProduct}
                onClose={onClose}
                onSave={onSave}
                onInputChange={onInputChange}
                categories={categories}
            />

            <DeleteDialog
                open={Boolean(productIdToDelete)}
                onCancel={onDeleteCancel}
                onConfirm={onDeleteConfirm}
                title="Delete Product"
                content="Are you sure you want to delete this product? This action cannot be undone."
            />
        </Box>
    );
};

export default ProductView;

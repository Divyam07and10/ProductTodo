
import React from 'react';
import {
    Box, Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Paper, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, Select, MenuItem,
    InputLabel, FormControl, Typography, Stack, Chip, Rating
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';

import { useProductContext } from '../../context/ProductContext';
import { CATEGORIES } from '../../lib/constants';

const ProductView = () => {
    const {
        products,
        searchQuery, setSearchQuery, filterCategory, setFilterCategory, sortBy, setSortBy,
        isDialogOpen, currentProduct, productIdToDelete,
        onAdd, onEdit, onDeleteClick, onDeleteConfirm, onDeleteCancel, onClose, onSave, onClear, onInputChange
    } = useProductContext();

    return (
        <Box sx={{ p: 4, maxWidth: 1400, mx: 'auto' }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 4 }}>Product Catalog</Typography>

            <Paper elevation={0} sx={{ p: 2, mb: 4, borderRadius: 4, display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap', border: '1px solid #e0e0e0' }}>
                <TextField placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} sx={{ flexGrow: 1, minWidth: 250 }} InputProps={{ startAdornment: <SearchIcon color="action" sx={{ mr: 1 }} /> }} />
                <FormControl sx={{ minWidth: 200 }}>
                    <InputLabel>Category</InputLabel>
                    <Select value={filterCategory} label="Category" onChange={(e) => setFilterCategory(e.target.value)}>
                        <MenuItem value="all">All Categories</MenuItem>
                        {CATEGORIES.map(cat => (
                            <MenuItem key={cat.value} value={cat.value}>
                                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>{cat.icon}{cat.label}</Box>
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

            <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 4, border: '1px solid #e0e0e0' }}>
                <Table sx={{ tableLayout: 'fixed' }}>
                    <TableHead sx={{ bgcolor: '#f8f9fa' }}>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold', width: '60px' }}>ID</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', width: '30%' }}>Title</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', width: '15%' }}>Category</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', width: '15%' }}>Rating</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', width: '12%' }}>Price</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', width: '10%' }}>Stock</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', width: '10%' }} align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.length === 0 ? (
                            <TableRow><TableCell colSpan={7} align="center" sx={{ py: 8 }}><Typography variant="h6" color="textSecondary">No products found</Typography></TableCell></TableRow>
                        ) : (
                            products.map(p => {
                                const cat = CATEGORIES.find(c => c.value === p.category) || { label: p.category };
                                return (
                                    <TableRow key={p.id} hover>
                                        <TableCell>{p.id}</TableCell>
                                        <TableCell sx={{ fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.title}</TableCell>
                                        <TableCell><Chip icon={cat.icon} label={cat.label} size="small" sx={{ bgcolor: '#e3f2fd', color: '#1565c0' }} /></TableCell>
                                        <TableCell><Box display="flex" alignItems="center"><Rating value={parseFloat(p.rating) || 0} readOnly size="small" precision={0.5} /><Typography variant="caption" sx={{ ml: 0.5 }}>({p.rating})</Typography></Box></TableCell>
                                        <TableCell sx={{ fontWeight: 'bold' }}>${p.price}</TableCell>
                                        <TableCell sx={{ color: p.stock < 10 ? 'red' : 'inherit' }}>{p.stock}</TableCell>
                                        <TableCell align="right">
                                            <IconButton onClick={() => onEdit(p)} size="small" color="primary" sx={{ mr: 1 }}><EditIcon fontSize="small" /></IconButton>
                                            <IconButton onClick={() => onDeleteClick(p.id)} size="small" color="error"><DeleteIcon fontSize="small" /></IconButton>
                                        </TableCell>
                                    </TableRow>
                                );
                            })
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={isDialogOpen} onClose={onClose} fullWidth maxWidth="sm">
                <form onSubmit={onSave}>
                    <DialogTitle>
                        {currentProduct?.id ? 'Edit Product' : 'Add Product'}
                        <IconButton onClick={onClose} sx={{ position: 'absolute', right: 8, top: 8, color: 'grey.500' }}><CloseIcon /></IconButton>
                    </DialogTitle>
                    <DialogContent dividers>
                        <Stack spacing={3} sx={{ mt: 1 }}>
                            <TextField required label="Title" fullWidth value={currentProduct?.title || ''} onChange={(e) => onInputChange('title', e.target.value)} />
                            <FormControl fullWidth required>
                                <InputLabel id="category-label">Category</InputLabel>
                                <Select labelId="category-label" value={currentProduct?.category || ''} label="Category" required onChange={(e) => onInputChange('category', e.target.value)}>
                                    {CATEGORIES.map(cat => (
                                        <MenuItem key={cat.value} value={cat.value}><Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>{cat.icon}{cat.label}</Box></MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <TextField required label="Rating" type="number" fullWidth value={currentProduct?.rating || ''} onChange={(e) => onInputChange('rating', e.target.value)} inputProps={{ min: 0, max: 5, step: 0.1 }} />
                            <Stack direction="row" spacing={2}>
                                <TextField required label="Price" type="number" fullWidth value={currentProduct?.price || ''} onChange={(e) => onInputChange('price', e.target.value)} inputProps={{ min: 1, step: 0.01 }} />
                                <TextField required label="Stock" type="number" fullWidth value={currentProduct?.stock || ''} onChange={(e) => onInputChange('stock', e.target.value)} inputProps={{ min: 1 }} />
                            </Stack>
                        </Stack>
                    </DialogContent>
                    <DialogActions sx={{ p: 2 }}>
                        <Button onClick={onClose}>Cancel</Button>
                        <Button type="submit" variant="contained">Save</Button>
                    </DialogActions>
                </form>
            </Dialog>

            <Dialog open={Boolean(productIdToDelete)} onClose={onDeleteCancel}>
                <DialogTitle>
                    Confirm Deletion
                    <IconButton onClick={onDeleteCancel} sx={{ position: 'absolute', right: 8, top: 8, color: 'grey.500' }}><CloseIcon /></IconButton>
                </DialogTitle>
                <DialogContent dividers sx={{ borderBottom: 'none' }}>
                    <Typography>Are you sure you want to delete this product? This action cannot be undone.</Typography>
                </DialogContent>
                <DialogActions sx={{ p: 2 }}>
                    <Button onClick={onDeleteCancel}>Cancel</Button>
                    <Button onClick={onDeleteConfirm} variant="contained" color="error">Delete</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default ProductView;

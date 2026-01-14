
import React from 'react';
import {
    Box, Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Paper, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, Select, MenuItem,
    InputLabel, FormControl, Typography, Stack, Chip, Rating, Tooltip
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import BrushIcon from '@mui/icons-material/Brush';
import DevicesIcon from '@mui/icons-material/Devices';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import HomeIcon from '@mui/icons-material/Home';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import RestaurantIcon from '@mui/icons-material/Restaurant';

import { useProductContext } from '../../context/ProductContext';

// NECESSARY CONSTANT
const CATEGORIES = [
    { value: 'beauty', label: 'Beauty', icon: <BrushIcon fontSize="small" /> },
    { value: 'electronics', label: 'Electronics', icon: <DevicesIcon fontSize="small" /> },
    { value: 'fashion', label: 'Fashion', icon: <CheckroomIcon fontSize="small" /> },
    { value: 'home', label: 'Home', icon: <HomeIcon fontSize="small" /> },
    { value: 'sports', label: 'Sports', icon: <SportsSoccerIcon fontSize="small" /> },
    { value: 'kids', label: 'Kids', icon: <ChildCareIcon fontSize="small" /> },
    { value: 'food', label: 'Food', icon: <RestaurantIcon fontSize="small" /> },
];

const ProductView = ({ ui, actions }) => {
    // UI state from props
    const { searchQuery, filterCategory, sortBy, isDialogOpen, currentProduct } = ui;
    // Shared data from context
    const products = useProductContext();

    return (
        <Box sx={{ p: 4, maxWidth: 1400, mx: 'auto' }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 4 }}>Product Catalog</Typography>

            {/* Toolbar */}
            <Paper elevation={0} sx={{ p: 2, mb: 4, borderRadius: 4, display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap', border: '1px solid #e0e0e0' }}>
                <TextField
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => actions.setSearchQuery(e.target.value)}
                    sx={{ flexGrow: 1, minWidth: 250 }}
                    InputProps={{ startAdornment: <SearchIcon color="action" sx={{ mr: 1 }} /> }}
                />

                <FormControl sx={{ minWidth: 200 }}>
                    <InputLabel>Category</InputLabel>
                    <Select value={filterCategory} label="Category" onChange={(e) => actions.setFilterCategory(e.target.value)}>
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
                    <Select value={sortBy} label="Sort By" onChange={(e) => actions.setSortBy(e.target.value)}>
                        <MenuItem value="default">Default (ID)</MenuItem>
                        <MenuItem value="price_asc">Price: Low to High</MenuItem>
                        <MenuItem value="price_desc">Price: High to Low</MenuItem>
                    </Select>
                </FormControl>

                <Button variant="outlined" size="large" onClick={actions.onClear} startIcon={<RefreshIcon />} sx={{ height: 56 }}>Reset</Button>
                <Button variant="contained" size="large" onClick={actions.onAdd} startIcon={<AddIcon />} sx={{ height: 56, ml: 'auto' }}>Add Product</Button>
            </Paper>

            {/* Table */}
            <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 4, border: '1px solid #e0e0e0' }}>
                <Table>
                    <TableHead sx={{ bgcolor: '#f8f9fa' }}>
                        <TableRow>
                            {['ID', 'Title', 'Category', 'Rating', 'Price', 'Stock', 'Actions'].map(h => (
                                <TableCell key={h} sx={{ fontWeight: 'bold' }} align={h === 'Actions' ? 'right' : 'left'}>{h}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map(p => {
                            const cat = CATEGORIES.find(c => c.value === p.category) || { label: p.category };
                            return (
                                <TableRow key={p.id} hover>
                                    <TableCell>#{p.id}</TableCell>
                                    <TableCell sx={{ fontWeight: 500 }}>{p.title}</TableCell>
                                    <TableCell>
                                        <Chip icon={cat.icon} label={cat.label} size="small" sx={{ bgcolor: '#e3f2fd', color: '#1565c0' }} />
                                    </TableCell>
                                    <TableCell>
                                        <Box display="flex" alignItems="center">
                                            {/* Rating component displays stars based on the 'value' prop */}
                                            <Rating value={p.rating || 0} readOnly size="small" precision={0.5} />
                                            <Typography variant="caption" sx={{ ml: 0.5 }}>({p.rating})</Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>${p.price}</TableCell>
                                    <TableCell sx={{ color: p.stock < 10 ? 'red' : 'inherit' }}>{p.stock}</TableCell>
                                    <TableCell align="right">
                                        <Tooltip title="Edit"><IconButton onClick={() => actions.onEdit(p)} size="small" color="primary" sx={{ mr: 1 }}><EditIcon /></IconButton></Tooltip>
                                        <Tooltip title="Delete"><IconButton onClick={() => actions.onDelete(p.id)} size="small" color="error"><DeleteIcon /></IconButton></Tooltip>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Dialog */}
            <Dialog open={isDialogOpen} onClose={actions.onClose} fullWidth maxWidth="sm">
                <DialogTitle>
                    {currentProduct?.id ? 'Edit Product' : 'Add Product'}
                    <IconButton
                        onClick={actions.onClose}
                        sx={{ position: 'absolute', right: 8, top: 8, color: 'grey.500' }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent dividers>
                    <Stack spacing={3} sx={{ mt: 1 }}>
                        <TextField label="Title" fullWidth value={currentProduct?.title || ''} onChange={(e) => actions.onInputChange('title', e.target.value)} />
                        <FormControl fullWidth>
                            <InputLabel>Category</InputLabel>
                            <Select value={currentProduct?.category || ''} label="Category" onChange={(e) => actions.onInputChange('category', e.target.value)}>
                                {CATEGORIES.map(cat => (
                                    <MenuItem key={cat.value} value={cat.value}>
                                        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                                            {cat.icon}{cat.label}
                                        </Box>
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <TextField label="Rating (0-5)" type="number" fullWidth value={currentProduct?.rating || ''} onChange={(e) => actions.onInputChange('rating', e.target.value)} />
                        <Stack direction="row" spacing={2}>
                            <TextField label="Price" type="number" fullWidth value={currentProduct?.price || ''} onChange={(e) => actions.onInputChange('price', e.target.value)} />
                            <TextField label="Stock" type="number" fullWidth value={currentProduct?.stock || ''} onChange={(e) => actions.onInputChange('stock', e.target.value)} />
                        </Stack>
                    </Stack>
                </DialogContent>
                <DialogActions sx={{ p: 2 }}>
                    <Button onClick={actions.onClose}>Cancel</Button>
                    <Button onClick={actions.onSave} variant="contained">Save</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default ProductView;

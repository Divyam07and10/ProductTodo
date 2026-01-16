import React from 'react';
import {
    Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Stack, FormControl, InputLabel, Select, MenuItem, Box, IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { CATEGORIES } from '../../lib/constants';

const ProductDialog = ({ open, currentProduct, onClose, onSave, onInputChange, categories }) => {
    const categoriesToDisplay = categories || CATEGORIES;

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <form onSubmit={onSave}>
                <DialogTitle>
                    {currentProduct?.id ? 'Edit Product' : 'Add Product'}
                    <IconButton onClick={onClose} sx={{ position: 'absolute', right: 8, top: 8, color: 'grey.500' }}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent dividers>
                    <Stack spacing={3} sx={{ mt: 1 }}>
                        <TextField
                            required
                            label="Title"
                            fullWidth
                            value={currentProduct?.title || ''}
                            onChange={(e) => onInputChange('title', e.target.value)}
                        />
                        <FormControl fullWidth required>
                            <InputLabel id="category-label">Category</InputLabel>
                            <Select
                                labelId="category-label"
                                value={currentProduct?.category || ''}
                                label="Category"
                                required
                                onChange={(e) => onInputChange('category', e.target.value)}
                            >
                                {categoriesToDisplay.map(cat => (
                                    <MenuItem key={cat.value} value={cat.value}>
                                        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                                            {cat.icon || <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: cat.color || '#e0e0e0' }} />}
                                            {cat.label || cat.value}
                                        </Box>
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <TextField
                            required
                            label="Rating"
                            type="number"
                            fullWidth
                            value={currentProduct?.rating || ''}
                            onChange={(e) => onInputChange('rating', e.target.value)}
                            inputProps={{ min: 0, max: 5, step: 0.1 }}
                        />
                        <Stack direction="row" spacing={2}>
                            <TextField
                                required
                                label="Price"
                                type="number"
                                fullWidth
                                value={currentProduct?.price || ''}
                                onChange={(e) => onInputChange('price', e.target.value)}
                                inputProps={{ min: 1, step: 0.01 }}
                            />
                            <TextField
                                required
                                label="Stock"
                                type="number"
                                fullWidth
                                value={currentProduct?.stock || ''}
                                onChange={(e) => onInputChange('stock', e.target.value)}
                                inputProps={{ min: 1 }}
                            />
                        </Stack>
                    </Stack>
                </DialogContent>
                <DialogActions sx={{ p: 2 }}>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button type="submit" variant="contained">Save</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default ProductDialog;

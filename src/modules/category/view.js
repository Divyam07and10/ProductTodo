import React from 'react';
import { useCategoryContext } from '../../context/CategoryContext';

import {
    Box, Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Paper, IconButton, Dialog, DialogActions, DialogContent, DialogTitle,
    Typography, Stack
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';

const CategoryView = () => {
    const {
        categories,
        searchQuery, setSearchQuery,
        isDialogOpen,
        currentCategory,
        categoryIdToDelete,
        onSave, onDeleteConfirm, onClear,
        onAdd, onEdit, onDeleteClick, onDeleteCancel,
        onClose, onInputChange
    } = useCategoryContext();

    return (
        <Box sx={{ p: 4, maxWidth: 1000, mx: 'auto' }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 4 }}>Category Management</Typography>

            <Paper elevation={0} sx={{ p: 2, mb: 4, borderRadius: 4, display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap', border: '1px solid #e0e0e0' }}>
                <TextField
                    placeholder="Search categories..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    sx={{ flexGrow: 1, minWidth: 250 }}
                    InputProps={{ startAdornment: <SearchIcon color="action" sx={{ mr: 1 }} /> }}
                />
                <Button variant="outlined" size="large" onClick={onClear} startIcon={<RefreshIcon />} sx={{ height: 56 }}>Reset</Button>
                <Button variant="contained" size="large" onClick={onAdd} startIcon={<AddIcon />} sx={{ height: 56, ml: 'auto' }}>Add Category</Button>
            </Paper>

            <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 4, border: '1px solid #e0e0e0' }}>
                <Table>
                    <TableHead sx={{ bgcolor: '#f8f9fa' }}>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold', width: '80px' }}>ID</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Color</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', width: '120px' }} align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {categories.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} align="center" sx={{ py: 8 }}>
                                    <Typography variant="h6" color="textSecondary">No categories found</Typography>
                                </TableCell>
                            </TableRow>
                        ) : (
                            categories.map((c, index) => (
                                <TableRow key={c.value + index} hover>
                                    <TableCell>{c.id || '-'}</TableCell>
                                    <TableCell sx={{ fontWeight: 500 }}>{c.value || '-'}</TableCell>
                                    <TableCell>
                                        <Box sx={{ width: 24, height: 24, borderRadius: '50%', bgcolor: c.color, border: '1px solid #e0e0e0' }} />
                                    </TableCell>
                                    <TableCell align="right">
                                        <IconButton onClick={() => onEdit(c)} size="small" color="primary" sx={{ mr: 1 }}>
                                            <EditIcon fontSize="small" />
                                        </IconButton>
                                        <IconButton onClick={() => onDeleteClick(c)} size="small" color="error">
                                            <DeleteIcon fontSize="small" />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>

                </Table>
            </TableContainer>

            <Dialog open={isDialogOpen} onClose={onClose} fullWidth maxWidth="sm">
                <form onSubmit={onSave}>
                    <DialogTitle>
                        {currentCategory?.id ? 'Edit Category' : 'Add Category'}
                        <IconButton onClick={onClose} sx={{ position: 'absolute', right: 8, top: 8, color: 'grey.500' }}>
                            <CloseIcon />
                        </IconButton>
                    </DialogTitle>
                    <DialogContent dividers>
                        <Stack spacing={3} sx={{ mt: 1 }}>
                            <TextField
                                required
                                label="Category Name"
                                fullWidth
                                value={currentCategory?.name || ''}
                                onChange={(e) => onInputChange('name', e.target.value)}
                                placeholder="e.g. Electronics"
                            />
                            <Box>
                                <Typography variant="subtitle2" sx={{ mb: 1 }}>Category Color (Must be unique)</Typography>
                                <Stack direction="row" spacing={2} alignItems="center">
                                    <input
                                        type="color"
                                        style={{ width: 50, height: 50, padding: 0, border: 'none', borderRadius: 4, cursor: 'pointer' }}
                                        value={currentCategory?.color || '#000000'}
                                        onChange={(e) => onInputChange('color', e.target.value)}
                                    />
                                </Stack>
                            </Box>
                        </Stack>
                    </DialogContent>

                    <DialogActions sx={{ p: 2 }}>
                        <Button onClick={onClose}>Cancel</Button>
                        <Button type="submit" variant="contained">Save</Button>
                    </DialogActions>
                </form>
            </Dialog>

            <Dialog open={Boolean(categoryIdToDelete)} onClose={onDeleteCancel}>
                <DialogTitle>
                    Confirm Deletion
                    <IconButton onClick={onDeleteCancel} sx={{ position: 'absolute', right: 8, top: 8, color: 'grey.500' }}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent dividers sx={{ borderBottom: 'none' }}>
                    <Typography>
                        Are you sure you want to delete the category <strong>"{categoryIdToDelete?.value}"</strong>?
                        This action cannot be undone and will fail if products are linked to it.
                    </Typography>
                </DialogContent>

                <DialogActions sx={{ p: 2 }}>
                    <Button onClick={onDeleteCancel}>Cancel</Button>
                    <Button onClick={onDeleteConfirm} variant="contained" color="error">Delete</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default CategoryView;

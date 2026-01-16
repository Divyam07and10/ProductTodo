import React from 'react';
import {
    Box, Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Paper, IconButton, Typography, Stack, Chip
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useCategoryContext } from '../../context/CategoryContext';
import CategoryDialog from '../../shared/components/CategoryDialog';
import DeleteDialog from '../../shared/components/DeleteDialog';

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
        <Box sx={{ p: 4, maxWidth: 1200, mx: 'auto' }}>
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
                            <TableCell sx={{ fontWeight: 'bold' }}>Children</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Color</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', width: '120px' }} align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {categories.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} align="center" sx={{ py: 8 }}>
                                    <Typography variant="h6" color="textSecondary">No categories found</Typography>
                                </TableCell>
                            </TableRow>
                        ) : (
                            categories.map((c, index) => (
                                <TableRow key={c.value + index} hover>
                                    <TableCell>{c.id || '-'}</TableCell>
                                    <TableCell>
                                        {c.value || '-'}
                                    </TableCell>
                                    <TableCell>
                                        <Stack direction="row" gap={0.5} flexWrap="wrap">
                                            {c.children && c.children.length > 0 ? (
                                                c.children.map((childId) => {
                                                    const child = categories.find(cat => cat.id === childId || cat.value === childId);
                                                    return <Chip key={childId} label={child ? child.value : childId} size="small" />;
                                                })
                                            ) : (
                                                <Typography variant="caption" color="textSecondary">-</Typography>
                                            )}
                                        </Stack>
                                    </TableCell>
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

            <CategoryDialog
                open={isDialogOpen}
                currentCategory={currentCategory}
                onClose={onClose}
                onSave={onSave}
                onInputChange={onInputChange}
                categories={categories}
            />

            <DeleteDialog
                open={Boolean(categoryIdToDelete)}
                onCancel={onDeleteCancel}
                onConfirm={onDeleteConfirm}
                title="Delete Category"
                content={`Are you sure you want to delete the category "${categoryIdToDelete?.value}"? This action cannot be undone and will fail if products are linked to it.`}
            />
        </Box>
    );
};

export default CategoryView;

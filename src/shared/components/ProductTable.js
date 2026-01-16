import React from 'react';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Paper, IconButton, Box, Typography, Chip, Rating
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { CATEGORIES } from '../../lib/constants';

const ProductTable = ({ products, onEdit, onDeleteClick }) => {
    return (
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
                        <TableRow>
                            <TableCell colSpan={7} align="center" sx={{ py: 8 }}>
                                <Typography variant="h6" color="textSecondary">No products found</Typography>
                            </TableCell>
                        </TableRow>
                    ) : (
                        products.map(p => {
                            const cat = CATEGORIES.find(c => c.value === p.category) || { label: p.category };
                            return (
                                <TableRow key={p.id} hover>
                                    <TableCell>{p.id}</TableCell>
                                    <TableCell sx={{ fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.title}</TableCell>
                                    <TableCell>
                                        <Chip
                                            icon={cat.icon}
                                            label={cat.label}
                                            size="small"
                                            sx={{ bgcolor: '#e3f2fd', color: '#1565c0' }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Box display="flex" alignItems="center">
                                            <Rating value={parseFloat(p.rating) || 0} readOnly size="small" precision={0.5} />
                                            <Typography variant="caption" sx={{ ml: 0.5 }}>({p.rating})</Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>${p.price}</TableCell>
                                    <TableCell sx={{ color: p.stock < 10 ? 'red' : 'inherit' }}>{p.stock}</TableCell>
                                    <TableCell align="right">
                                        <IconButton onClick={() => onEdit(p)} size="small" color="primary" sx={{ mr: 1 }}>
                                            <EditIcon fontSize="small" />
                                        </IconButton>
                                        <IconButton onClick={() => onDeleteClick(p.id)} size="small" color="error">
                                            <DeleteIcon fontSize="small" />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            );
                        })
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default ProductTable;

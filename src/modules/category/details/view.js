import React, { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Box, Typography, Paper, Grid, Stack, Button, Avatar, Chip
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { useCategoryContext } from '../../../context/CategoryContext';
import { useProductContext } from '../../../context/ProductContext';
import ProductTable from '../../../shared/components/ProductTable';
import ProductDialog from '../../../shared/components/ProductDialog';
import CategoryDialog from '../../../shared/components/CategoryDialog';
import DeleteDialog from '../../../shared/components/DeleteDialog';

const CategoryDetailView = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const {
        getCategoryById,
        categories,
        onEdit: onEditCategory,
        isDialogOpen: isCategoryDialogOpen,
        onClose: onCategoryClose,
        onSave: onCategorySave,
        onInputChange: onCategoryInputChange,
        currentCategory
    } = useCategoryContext();

    const {
        products,
        onEdit: onEditProduct,
        onDeleteClick: onDeleteProductClick,
        isDialogOpen: isProductDialogOpen,
        currentProduct,
        onClose: onProductClose,
        onSave: onProductSave,
        onInputChange: onProductInputChange,
        productIdToDelete,
        onDeleteConfirm: onProductDeleteConfirm,
        onDeleteCancel: onProductDeleteCancel,
        setCurrentProduct,
        setIsDialogOpen
    } = useProductContext();

    const category = useMemo(() => getCategoryById(id), [getCategoryById, id]);

    const filteredProducts = useMemo(() => {
        if (!category) return [];
        return products.filter(p => p.category === category.value);
    }, [products, category]);

    const handleAddProduct = () => {
        setCurrentProduct({ category: category.value });
        setIsDialogOpen(true);
    };

    if (!category) {
        return (
            <Box sx={{ p: 4, textAlign: 'center' }}>
                <Typography variant="h5" color="error">Category not found</Typography>
            </Box>
        );
    }

    const childrenNames = category.children ? category.children.map(childId => {
        const child = categories.find(c => c.id === childId);
        return {
            id: child ? child.id : childId,
            name: child ? child.value : childId
        };
    }) : [];

    return (
        <Box sx={{ p: 4, maxWidth: 1400, mx: 'auto' }}>
            <Box sx={{ flexGrow: 1, mb: 4 }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>{category.value}</Typography>
            </Box>

            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12}>
                    <Paper elevation={0} sx={{ p: 3, borderRadius: 4, border: '1px solid #e0e0e0', display: 'flex', gap: 4, alignItems: 'center' }}>
                        <Avatar
                            sx={{
                                width: 80,
                                height: 80,
                                bgcolor: category.color,
                                fontSize: '2rem'
                            }}
                        >
                            {category.value.charAt(0).toUpperCase()}
                        </Avatar>

                        <Box sx={{ flexGrow: 1 }}>
                            <Typography variant="h5" fontWeight="bold">{category.value}</Typography>
                            <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>ID: {category.id}</Typography>

                            <Box sx={{ mt: 1 }}>
                                <Typography variant="caption" color="textSecondary" display="block" gutterBottom>Children:</Typography>
                                {childrenNames.length > 0 ? (
                                    <Stack direction="row" gap={1} flexWrap="wrap">
                                        {childrenNames.map((child, index) => (
                                            <Chip
                                                key={index}
                                                label={child.name}
                                                size="small"
                                                onClick={() => navigate(`/category/${child.id}`)}
                                                clickable
                                            />
                                        ))}
                                    </Stack>
                                ) : (
                                    <Typography variant="body2" color="textSecondary">-</Typography>
                                )}
                            </Box>
                        </Box>

                        <Stack direction="row" spacing={2}>
                            <Button
                                variant="outlined"
                                startIcon={<EditIcon />}
                                onClick={() => onEditCategory(category)}
                                sx={{ height: 48 }}
                            >
                                Edit Category
                            </Button>
                            <Button
                                variant="contained"
                                startIcon={<AddIcon />}
                                onClick={handleAddProduct}
                                sx={{ height: 48 }}
                            >
                                Add Product
                            </Button>
                        </Stack>
                    </Paper>
                </Grid>
            </Grid>

            <ProductTable
                products={filteredProducts}
                onEdit={onEditProduct}
                onDeleteClick={onDeleteProductClick}
            />

            <ProductDialog
                open={isProductDialogOpen}
                currentProduct={currentProduct}
                onClose={onProductClose}
                onSave={onProductSave}
                onInputChange={onProductInputChange}
                categories={categories}
            />

            <CategoryDialog
                open={isCategoryDialogOpen}
                currentCategory={currentCategory}
                onClose={onCategoryClose}
                onSave={onCategorySave}
                onInputChange={onCategoryInputChange}
                categories={categories}
            />

            <DeleteDialog
                open={Boolean(productIdToDelete)}
                onCancel={onProductDeleteCancel}
                onConfirm={onProductDeleteConfirm}
                title="Delete Product"
                content="Are you sure you want to delete this product? This action cannot be undone."
            />
        </Box >
    );
};

export default CategoryDetailView;

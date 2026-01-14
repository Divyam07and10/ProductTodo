
import React from 'react';
import {
    Box,
    Button,
    TextField,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Tooltip,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Typography,
    Stack,
    InputAdornment,
    Chip,
    Rating,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';

// Category Icons
import BrushIcon from '@mui/icons-material/Brush';
import DevicesIcon from '@mui/icons-material/Devices';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import HomeIcon from '@mui/icons-material/Home';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import RestaurantIcon from '@mui/icons-material/Restaurant';

const CATEGORIES = [
    { value: 'beauty', label: 'Beauty', icon: <BrushIcon fontSize="small" /> },
    { value: 'electronics', label: 'Electronics', icon: <DevicesIcon fontSize="small" /> },
    { value: 'fashion', label: 'Fashion', icon: <CheckroomIcon fontSize="small" /> },
    { value: 'home', label: 'Home', icon: <HomeIcon fontSize="small" /> },
    { value: 'sports', label: 'Sports', icon: <SportsSoccerIcon fontSize="small" /> },
    { value: 'kids', label: 'Kids', icon: <ChildCareIcon fontSize="small" /> },
    { value: 'food', label: 'Food', icon: <RestaurantIcon fontSize="small" /> },
];

const ProductView = ({
    products,
    searchQuery,
    onSearchChange,
    filterCategory,
    onFilterChange,
    sortBy,
    onSortChange,
    onClearFilters,
    onAddClick,
    onEditClick,
    onDeleteClick,
    isDialogOpen,
    handleDialogClose,
    handleDialogSave,
    currentProduct,
    handleInputChange,
}) => {

    return (
        <Box sx={{ padding: 4, maxWidth: '1400px', margin: '0 auto' }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: 4, color: '#2c3e50' }}>
                Product Catalog
            </Typography>

            {/* Toolbar */}
            <Paper elevation={0} sx={{
                padding: 2,
                marginBottom: 4,
                borderRadius: 4,
                display: 'flex',
                gap: 2,
                alignItems: 'center',
                flexWrap: 'wrap',
                backgroundColor: '#ffffff',
                border: '1px solid #e0e0e0'
            }}>
                <TextField
                    placeholder="Search products..."
                    variant="outlined"
                    size="medium"
                    value={searchQuery}
                    onChange={onSearchChange}
                    sx={{
                        flexGrow: 1,
                        minWidth: '250px',
                        '& .MuiOutlinedInput-root': {
                            borderRadius: '12px',
                            backgroundColor: '#f8f9fa',
                            '& fieldset': { borderColor: '#e0e0e0' },
                            '&:hover fieldset': { borderColor: '#bdbdbd' },
                        }
                    }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon color="action" />
                            </InputAdornment>
                        ),
                    }}
                />

                <FormControl size="medium" sx={{ minWidth: 200 }}>
                    <InputLabel>Category</InputLabel>
                    <Select
                        value={filterCategory}
                        label="Category"
                        onChange={onFilterChange}
                        sx={{ borderRadius: '12px' }}
                        renderValue={(selected) => {
                            if (selected === 'all') return 'All Categories';
                            const cat = CATEGORIES.find(c => c.value === selected);
                            return (
                                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                                    {cat?.icon}
                                    {cat?.label}
                                </Box>
                            );
                        }}
                    >
                        <MenuItem value="all">All Categories</MenuItem>
                        {CATEGORIES.map(cat => (
                            <MenuItem key={cat.value} value={cat.value}>
                                <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
                                    {cat.icon}
                                    {cat.label}
                                </Box>
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl size="medium" sx={{ minWidth: 200 }}>
                    <InputLabel>Sort By</InputLabel>
                    <Select
                        value={sortBy}
                        label="Sort By"
                        onChange={onSortChange}
                        sx={{ borderRadius: '12px' }}
                    >
                        <MenuItem value="default">Default (ID)</MenuItem>
                        <MenuItem value="price_asc">Price: Low to High</MenuItem>
                        <MenuItem value="price_desc">Price: High to Low</MenuItem>
                    </Select>
                </FormControl>

                <Button
                    variant="outlined"
                    size="large"
                    startIcon={<RefreshIcon />}
                    onClick={onClearFilters}
                    sx={{
                        borderRadius: '12px',
                        height: '56px',
                        textTransform: 'none',
                        fontWeight: 600,
                        color: '#5f6368',
                        borderColor: '#e0e0e0',
                        '&:hover': { borderColor: '#bdbdbd', backgroundColor: '#f5f5f5' }
                    }}
                >
                    Clear
                </Button>


                <Button
                    variant="contained"
                    size="large"
                    startIcon={<AddIcon />}
                    onClick={onAddClick}
                    sx={{
                        borderRadius: '12px',
                        paddingX: 3,
                        height: '56px',
                        textTransform: 'none',
                        fontWeight: 600,
                        boxShadow: 'none',
                        backgroundColor: '#1976d2',
                        '&:hover': { backgroundColor: '#1565c0', boxShadow: '0 4px 12px rgba(25, 118, 210, 0.2)' },
                        ml: 'auto'
                    }}
                >
                    Add Product
                </Button>
            </Paper>

            {/* Product Table */}
            <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 4, border: '1px solid #e0e0e0', overflow: 'hidden' }}>
                <Table sx={{ minWidth: 650 }}>
                    <TableHead sx={{ backgroundColor: '#f8f9fa' }}>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold', color: '#5f6368' }}>ID</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', color: '#5f6368' }}>Title</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', color: '#5f6368' }}>Category</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', color: '#5f6368' }}>Rating</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', color: '#5f6368' }}>Price</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', color: '#5f6368' }}>Stock</TableCell>
                            <TableCell align="right" sx={{ fontWeight: 'bold', color: '#5f6368' }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.length > 0 ? (
                            products.map((row) => (
                                <TableRow
                                    key={row.id}
                                    hover
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell sx={{ color: '#5f6368', fontWeight: 500 }}>
                                        #{row.id}
                                    </TableCell>
                                    <TableCell sx={{ fontWeight: 500, fontSize: '1rem' }}>{row.title}</TableCell>
                                    <TableCell>
                                        <Chip
                                            icon={CATEGORIES.find(c => c.value === row.category)?.icon}
                                            label={row.category}
                                            size="small"
                                            sx={{ textTransform: 'capitalize', backgroundColor: '#e3f2fd', color: '#1565c0', fontWeight: 500 }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Box display="flex" alignItems="center">
                                            <Rating value={row.rating || 0} readOnly size="small" precision={0.5} />
                                            <Typography variant="caption" sx={{ ml: 0.5, color: 'text.secondary' }}>({row.rating})</Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>${row.price}</TableCell>
                                    <TableCell>
                                        <span style={{ color: row.stock < 10 ? '#d32f2f' : 'inherit', fontWeight: row.stock < 10 ? 'bold' : 'normal' }}>
                                            {row.stock}
                                        </span>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Tooltip title="Edit">
                                            <IconButton onClick={() => onEditClick(row)} size="small" sx={{ color: '#1976d2', backgroundColor: '#e3f2fd', mr: 1, '&:hover': { backgroundColor: '#bbdefb' } }}>
                                                <EditIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Delete">
                                            <IconButton onClick={() => onDeleteClick(row.id)} size="small" sx={{ color: '#d32f2f', backgroundColor: '#ffebee', '&:hover': { backgroundColor: '#ffcdd2' } }}>
                                                <DeleteIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={7} align="center" sx={{ py: 8 }}>
                                    <Typography variant="h6" color="textSecondary" gutterBottom>
                                        No products found
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Add/Edit Dialog */}
            <Dialog
                open={isDialogOpen}
                onClose={handleDialogClose}
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle sx={{ m: 0, p: 2, pr: 6 }}>
                    {currentProduct?.id ? 'Edit Product' : 'Add New Product'}
                    <IconButton
                        aria-label="close"
                        onClick={handleDialogClose}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <Stack spacing={3} sx={{ mt: 1 }}>
                        <TextField
                            autoFocus
                            label="Product Title"
                            fullWidth
                            variant="outlined"
                            value={currentProduct?.title || ''}
                            onChange={(e) => handleInputChange('title', e.target.value)}
                        />

                        <FormControl fullWidth>
                            <InputLabel>Category</InputLabel>
                            <Select
                                value={currentProduct?.category || ''}
                                label="Category"
                                onChange={(e) => handleInputChange('category', e.target.value)}
                            >
                                {CATEGORIES.map((cat) => (
                                    <MenuItem key={cat.value} value={cat.value}>
                                        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                                            {cat.icon}
                                            {cat.label}
                                        </Box>
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <TextField
                            label="Rating (0-5)"
                            type="number"
                            fullWidth
                            variant="outlined"
                            value={currentProduct?.rating || ''}
                            onChange={(e) => handleInputChange('rating', e.target.value)}
                            InputProps={{ inputProps: { min: 0, max: 5, step: 0.1 } }}
                        />

                        <Stack direction="row" spacing={2}>
                            <TextField
                                label="Price ($)"
                                type="number"
                                fullWidth
                                variant="outlined"
                                value={currentProduct?.price || ''}
                                onChange={(e) => handleInputChange('price', e.target.value)}
                                InputProps={{ inputProps: { min: 0 } }}
                            />
                            <TextField
                                label="Stock"
                                type="number"
                                fullWidth
                                variant="outlined"
                                value={currentProduct?.stock || ''}
                                onChange={(e) => handleInputChange('stock', e.target.value)}
                                InputProps={{ inputProps: { min: 0 } }}
                            />
                        </Stack>
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose}>Cancel</Button>
                    <Button onClick={handleDialogSave} variant="contained">
                        Save Product
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default ProductView;

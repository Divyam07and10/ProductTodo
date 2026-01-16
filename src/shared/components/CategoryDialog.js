import React from 'react';
import {
    Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Stack, Box, Typography, IconButton,
    FormControl, InputLabel, Select, MenuItem, OutlinedInput, Chip
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const CategoryDialog = ({ open, currentCategory, onClose, onSave, onInputChange, categories = [] }) => {
    const availableCategories = categories.filter(c => c.id !== currentCategory?.id);

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
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

                        <FormControl fullWidth>
                            <InputLabel>Children Categories</InputLabel>
                            <Select
                                multiple
                                value={currentCategory?.children || []}
                                onChange={(e) => onInputChange('children', typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value)}
                                input={<OutlinedInput label="Children Categories" />}
                                renderValue={(selected) => (
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                        {selected.map((value) => {
                                            const category = categories.find(c => c.id === value || c.value === value);
                                            return <Chip key={value} label={category ? category.value : value} />;
                                        })}
                                    </Box>
                                )}
                            >
                                {availableCategories.map((c) => (
                                    <MenuItem key={c.id || c.value} value={c.id || c.value}>
                                        {c.value}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <Box>
                            <Typography variant="subtitle2" sx={{ mb: 1 }}>Category Color</Typography>
                            <input
                                type="color"
                                style={{ width: 50, height: 50, padding: 0, border: 'none', borderRadius: 4, cursor: 'pointer' }}
                                value={currentCategory?.color || '#000000'}
                                onChange={(e) => onInputChange('color', e.target.value)}
                            />
                        </Box>
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

export default CategoryDialog;

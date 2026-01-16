import React from 'react';
import {
    Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography, IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const DeleteDialog = ({ open, title, content, onCancel, onConfirm }) => {
    return (
        <Dialog open={open} onClose={onCancel}>
            <DialogTitle>
                {title || 'Confirm Deletion'}
                <IconButton onClick={onCancel} sx={{ position: 'absolute', right: 8, top: 8, color: 'grey.500' }}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers sx={{ borderBottom: 'none' }}>
                <Typography>{content || 'Are you sure you want to delete this item? This action cannot be undone.'}</Typography>
            </DialogContent>
            <DialogActions sx={{ p: 2 }}>
                <Button onClick={onCancel}>Cancel</Button>
                <Button onClick={onConfirm} variant="contained" color="error">Delete</Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteDialog;

import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
    return (
        <Box sx={{ p: 2, mt: 'auto', backgroundColor: '#f5f5f5', textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
                © 2026 ProductTodo Inc. All rights reserved.
            </Typography>
        </Box>
    );
};

export default Footer;

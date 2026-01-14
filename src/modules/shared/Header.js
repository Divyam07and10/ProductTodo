
import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <AppBar position="static" color="default" elevation={1} sx={{ backgroundColor: 'white' }}>
            <Toolbar>
                <Typography variant="h6" component={Link} to="/" sx={{ textDecoration: 'none', color: 'inherit', fontWeight: 'bold' }}>
                    ProductTodo
                </Typography>
                <Box sx={{ flexGrow: 1 }} />
                <Button color="inherit" component={Link} to="/">Home</Button>
                <Button color="inherit" component={Link} to="/products">Products</Button>
            </Toolbar>
        </AppBar>
    );
};

export default Header;

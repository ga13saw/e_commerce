import React from 'react';
import {AppBar,Toolbar,IconButton,Badge,MenuItem,Menu,Typography} from '@material-ui/core';
import {ShoppingCart} from '@material-ui/icons';
import logo from '../assests/logo.png';
import makeStyles from './styles';
import {Link,useLocation} from 'react-router-dom';

const  Navbar=({totalItem})=> {
    const classes = makeStyles();
    const location = useLocation();
    return (
        <div>
            <AppBar position='fixed' className={classes.appBar} color='inherit'>
                <Toolbar>
                    <Typography component={Link} to='/' variant='h6' className={classes.title} color='inherit'>
                        <img src={logo} alt='Commerce.js' height='25px' className={classes.image}/>
                        ElectroShop
                    </Typography>
                    <div className={classes.grow}/>
                    {location.pathname==='/' &&(
                    <div className={classes.button}>
                        <IconButton component={Link} to='/cart' aria-label='Show car items' color='inherit'>
                            <Badge badgeContent={totalItem} color='secondary'>
                                <ShoppingCart/>
                            </Badge>
                        </IconButton>
                    </div>)}
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Navbar

import React from 'react'
import {Container, Typography, Button, Grid} from '@material-ui/core';
import makeStyles from './styles';
import CartItem from './CartItem/CartItem';
import {Link} from 'react-router-dom';


const Cart=({cart, updateCart, removeCart, emptyCart})=> {
    const classes = makeStyles();
   
    const EmptyCart =()=>(
        <Typography variant='subtitle1'>You have no item in your shopping cart,
            <Link to='/' className={classes.link}>start adding some</Link> !

        </Typography>
    );
    const FilledCart=()=>(
        <div>
            <Grid container spacing={3} >
                {cart.line_items.map((item)=>(
                    <Grid item xs={12} sm={4} key={item.id}>
                      <CartItem item={item} updateCart={updateCart} removeCart={removeCart}/>
                    </Grid>
                ))}
            </Grid>
            <div className={classes.cardDetails}>
                    <Typography variant='h4'>Subtotal: {cart.subtotal.formatted_with_symbol}</Typography>
                    <div>
                        <Button className={classes.emptyButton} size='large' type='button' variant='contained' color='secondary' onClick={emptyCart}>Empty Cart</Button>
                        <Button component={Link} to='/checkout' className={classes.checkoutButton} size='large' type='button' variant='contained' color='primary'>CheckOut</Button>
                    </div>
            </div>
        </div>
    );

    if(!cart.line_items) return 'Loading..';
    return (
        <Container>
            <div className={classes.toolbar} />
            <Typography className={classes.title} variant='h3' gutterBottom>Your Shopping Cart</Typography>
            {
                !cart.line_items.length ? <EmptyCart/> : <FilledCart/>
            }

        </Container>
    )


}

export default Cart

import React from 'react'
import {Typography, Card, CardActions, CardContent, Button, CardMedia} from '@material-ui/core';
import makeStyles from './styles';
const CartItem=({item, updateCart, removeCart})=> {
    const classes = makeStyles();
    return (
      
            <Card>
                <CardMedia image={item.media.source} alt={item.name} className={classes.media}/>
                <CardContent className={classes.cardContent}>
                    <Typography variant='h4'>{item.name}</Typography>
                    <Typography variant='h5'>{item.line_total.formatted_with_symbol}</Typography>
                </CardContent>
                <CardActions className={classes.cartActions}>
                    <div className={classes.buttons}>
                        <Button type='button' size='small' onClick={()=>{updateCart(item.id,item.quantity-1)}}>-</Button>
                        <Typography>{item.quantity}</Typography>
                        <Button type='button' size='small' onClick={()=>{updateCart(item.id,item.quantity+1)}}>+</Button>
                    </div>
                    <Button variant='contained' type='button' color='secondary' onClick={()=>{removeCart(item.id)}}>Remove</Button>
                </CardActions>
                
            </Card>
     
    )
}

export default CartItem

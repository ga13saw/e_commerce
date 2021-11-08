import React from 'react';
import { Grid } from '@material-ui/core';
import Product from './Product/Product';
import useStyles from './styles'
// const products = [
//     {
//         id:1,
//         name:'Nike shoes',
//         description:'this is nikes new collection'
//     },
//     {
//         id:2,
//         name:'Addidas shoes',
//         description:'this is Addidas new collection'
//     },
//     {
//         id:3,
//         name:'DC shoes',
//         description:'this is DC new collection'
//     }
// ]
const Productstoshow=({products,AddToCart})=>{
    const classes = useStyles();
    return(
    <main classes={classes.content}>
        <div className={classes.toolbar}/>
        <Grid container justify="center" spacing={4}>
            {products.map((product)=>(
                <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                    <Product product={product} AddToCart={AddToCart}/>
                </Grid>
            ))}
        </Grid>

    </main>
)}


export default Productstoshow;
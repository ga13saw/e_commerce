import React from 'react'
import {Typography, List, ListItem,ListItemText} from '@material-ui/core';

const Review=({checkoutToken})=> {
    return (
        <div>
            <Typography variant='h6' gutterBottom>Order Summary</Typography>
            <List disablePadding>
                {checkoutToken.live.line_items.map((product)=>(
                    <ListItem style={{padding:'10 0'}} key={product.name}>
                        <ListItemText primary={product.name} secondary={`Quantity:${product.quantity}`}/>
                    </ListItem>
                ) )}
                <ListItem style={{padding:'10 0'}}>
                    <ListItemText primary='Total'/>
                    <Typography variant='subtitle1' style={{fontWeight:700}}>
                        {checkoutToken.live.subtotal.formatted_with_symbol}
                    </Typography>
                </ListItem>
            </List>
        </div>
    )
}

 export default Review

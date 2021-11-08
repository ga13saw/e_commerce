import React,{useState,useEffect} from 'react';
import {commerce} from './lib/commerce';
import {Productstoshow,Navbar,Cart,Checkout} from './components';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {
    
    const [products,setProducts] =useState([]);
    const [cart,setCart] = useState({});
    const [order, setOrder] = useState({});
    const [errorMessage, setErrorMessage] = useState('');
    const fetchProdcuts = async()=>{
        const {data} = await commerce.products.list();
        setProducts(data);
    }
    const fetchCart = async()=>{
        setCart(await commerce.cart.retrieve())
    }
    const AddToCartHandler=async(productId, quantity)=>{
        const {cart} = await commerce.cart.add(productId,quantity);
        setCart(cart);
    }
    const UpdateCartHandler=async(productId, quantity)=>{
        const {cart} = await commerce.cart.update(productId,{quantity});
        setCart(cart);
    }
    const RemoveCartHandler=async(productId)=>{
        const {cart} = await commerce.cart.remove(productId);
        setCart(cart);
    }
    const EmptyCartHandler=async()=>{
        const {cart} = await commerce.cart.empty();
        setCart(cart);
    }

    const refreshCart=async()=>{
        console.log('inside refreshCart..');
        const newCart = await commerce.cart.refresh();
        setCart(newCart);
        console.log('printing cart'+cart);
    }
    const handleCaptureCheckout=async(checkoutTokenId,newOrder)=>{
        try {
            // console.log('inside handleCaptureCheckout.....'+checkoutTokenId);
            // console.log(newOrder);
            // console.log('before setting new order');
            //const comingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);
            //console.log('after setting new order');
           // setOrder(comingOrder);
           setOrder(newOrder);
           //console.log('new order');
           // console.log(order);
            refreshCart();
           // console.log('after resfrr');
        } catch (error) {
            
           
            setErrorMessage(error.data.error.message);
            console.log('inside error of handleCaptureCheckout in aap'+ errorMessage);
           
        }
    }

    useEffect(()=>{
        fetchProdcuts();
        fetchCart();

    },[]);
    console.log(cart);
    return (
        <Router>
        <div>
            <Navbar totalItem={cart.total_items} />
            <Switch>
                <Route exact path='/'>
                <Productstoshow products={products} AddToCart={AddToCartHandler}/> 
                </Route>
                <Route exact path='/cart'>
                <Cart cart={cart} updateCart={UpdateCartHandler} removeCart={RemoveCartHandler} emptyCart={EmptyCartHandler} />
                </Route>
                <Route exact path='/checkout'>
                <Checkout cart={cart} order={order} onCaptureCheckout={handleCaptureCheckout} error={errorMessage}/>
                </Route>
           
           
           </Switch>
        </div>
        </Router>
    )
}

export default App

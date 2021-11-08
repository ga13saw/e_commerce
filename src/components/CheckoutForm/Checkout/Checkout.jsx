import React,{useState,useEffect} from 'react'
import{Paper,Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button,CssBaseline} from '@material-ui/core';
import makeStyles from './styles';
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';
import {commerce} from '../../../lib/commerce';
import {Link, useHistory} from 'react-router-dom';

const steps = ['Shipping Address','Payment Option'];

const Checkout=({cart,order,onCaptureCheckout,error})=> {
    const classes = makeStyles();
    const [activeStep, setActiveStep] = useState(0);
    const [checkoutToken, setCheckoutToken]=useState(null);
    const [shippingData, setShippingData] = useState({});
    const history = useHistory();
    const [isFinished,setIsFinished]=useState(false);

    const timeout=()=>{
        setTimeout(()=>{
            setIsFinished(true)
        },3000);
    }
   
    
    let Confirmation=()=>order.customer ? (
        <div>
            <div>
            { console.log('from confirmation')}{ console.log(order)}
                <Typography variant='h5'>Thank you for your purchase, {order.customer.firstname} {order.customer.lastname}</Typography>
                <Divider className={classes.divider} />
                <Typography variant='subtitle2'> Order ref: {order.payment.stripe.payment_method_id}{order.customer_reference}</Typography>
            </div>  
            <br/>
            <Button component={Link} to='/' variant='outlined' type='button'>Back to Home</Button>
        </div>
        )
     : isFinished ?(
        <div>
        <div>
            
            <Typography variant='h5'>Thank you for your purchase</Typography>
            <Divider className={classes.divider} />
            
        </div>
        <br/>
        <Button component={Link} to='/' variant='outlined' type='button'>Back to Home</Button>
    </div>
     ) :(
         <div className={classes.spinner}>
             <CircularProgress/>
         </div>
     );
     if(error){
         <div>
             <Typography variant='h5'>Error:{error}</Typography>
             <br/>
             <Button component={Link} to='/' variant='outlined' type='button'>Back to Home</Button>
         </div>
     }

    useEffect(() => {
        const generateToken=async()=>{
            try{
                const token = await commerce.checkout.generateToken(cart.id, {type:'cart'});
                setCheckoutToken(token);
            }catch(error){
                    history.push('/');
            }
        }
        generateToken();
        
    }, [cart])

    const nextStep = ()=> setActiveStep((preActiveStep)=>preActiveStep+1);
    const backStep = ()=> setActiveStep((preActiveStep)=>preActiveStep-1);
    const next=(data)=>{
        console.log('from next method...2')
        console.log(data);
        setShippingData(data);
        console.log(shippingData);
        nextStep();
    }
   

    const Form=()=> activeStep===0 ? <AddressForm checkoutToken={checkoutToken} next={next}/>
     : <PaymentForm shippingData={shippingData} checkoutToken={checkoutToken} backStep={backStep}
      onCaptureCheckout={onCaptureCheckout} nextStep={nextStep} timeout={timeout}/>

    return (
        <div>
            <CssBaseline/>
            <div className={classes.toolbar}/>
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography variant='h4' align='center'>Checkout</Typography>
                    <Stepper activeStep={activeStep} className={classes.stepper}>
                        {
                            steps.map((step)=>(
                                <Step key={step}>
                                    <StepLabel>{step}</StepLabel>
                                </Step>
                            ))
                        }
                    </Stepper>
                    {activeStep ===steps.length ? <Confirmation/> : checkoutToken && <Form/>}
                </Paper>
            </main>
        </div>
    )
}

export default Checkout

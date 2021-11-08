import React from 'react';
import {TextField, Grid} from '@material-ui/core';
import {useFormContext, Controller } from 'react-hook-form';

const FormInput=({name, label,ref})=> {
    const { control } = useFormContext();
    return (
        <Grid item xs={12} sm={6}>
           <Controller 
           as={TextField}
        name={name}
        control={control}
        label={label}
        fullWidth
        render={({ field }) => {
    // return <input {...field} {...register('test')} />; ❌ double up the registration  
    return <input placeholder={label} {...field} />; // ✅  
  }} 
           
           
           /> 
           
        </Grid>
       
    );
}

export default FormInput

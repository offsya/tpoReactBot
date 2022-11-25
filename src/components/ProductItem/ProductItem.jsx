import './ProductItem.css';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {useState} from "react";
const photo = require('./w4.jpeg')



const ProductItem = ({product, className, onAdd}) => {
    const [but, setBut] = useState(true);
    const [total, setTotal] = useState(0);

    const onAddHandler = () => {
        onAdd(product);
    }
    const butHandler = () => {
        if(total <= 1){
            setBut(true)
            setTotal(0)
        }else{
            setBut(false)
        }
    }
    const totalPlusHandler = () => {
        setTotal(total + 1)
    }
    const totalMinusHandler = () => {
        setTotal(total - 1)
    }
    return (
        <Card style={{padding: '0px'}} className='product' sx={{ maxWidth: 140, maxHeight: 310}}>
            <CardMedia
                component="img"
                alt="green lol"
                height="100"
                image={photo}
            />
            <CardContent style={{padding: '5px'}}>
                <Typography style={{display: "flex", justifyContent: "center"}} gutterBottom variant="h6" component="div">
                    {product.title}
                </Typography>
                <Typography gutterBottom variant="h7" style={{display: "flex", justifyContent: "space-around"}} component="div">
                    <div>{product.price}$</div>
                </Typography>
                {/*<Typography style={{display: "flex", justifyContent: "center"}} gutterBottom component="div">*/}
                {/*   Count: {total}*/}
                {/*</Typography>*/}
            </CardContent>
                {but ?
                        <CardActions style={{paddingTop: '0px', justifyContent: "space-around"}}>
                            <Button className='btn' onClick={() => {setBut(false); setTotal(1)}} size="small">Add</Button>
                        </CardActions>
                        :
                            <CardActions style={{paddingTop: '0px', justifyContent: "space-around"}}>
                                <Button className='btn' onClick={() => {totalPlusHandler()}} size="small">+</Button>
                                <div style={{paddingLeft: '8px'}} className='btn'>{total}</div>
                                <Button className='btn' onClick={() => {totalMinusHandler(); butHandler()}} size="small">-</Button>
                            </CardActions>
                        }
        </Card>
    );
};

export default ProductItem;

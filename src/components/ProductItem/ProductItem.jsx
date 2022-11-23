import './ProductItem.css';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
const photo = require('./w7.jpeg')



const ProductItem = ({product, className, onAdd}) => {
    const onAddHandler = () => {
        onAdd(product);
    }

    return (
        <Card className='product' sx={{ maxWidth: 250 }}>
            <CardMedia
                component="img"
                alt="green lol"
                height="100"
                image={photo}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    Lizard
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Lizards are a widespread group of squamate reptiles, with over 6,000
                    species, ranging across all continents except Antarctica
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
            </CardActions>
        </Card>
    );
};

export default ProductItem;

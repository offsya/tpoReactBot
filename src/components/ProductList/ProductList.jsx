import React, {useState} from 'react';
import './ProductList.css';
import ProductItem from "../ProductItem/ProductItem";
import {useTelegram} from "../../hooks/useTelegram";
import {useCallback, useEffect, useMemo} from "react";
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
const searchImg = require('./search.svg')
const closeImg = require('./close.svg')
import './search.svg'
import Button from "../Button/Button";
import MyInput from "../input/MyInput";




const ProductList = () => {
    const [addedItems, setAddedItems] = useState([]);
    const {tg, queryId} = useTelegram();

    const [products, setProducts] = useState([
        {id: '1', title: 'Джинсы', price: 5000, description: 'Синего цвета, прямые'},
        {id: '2', title: 'Куртка', price: 12000, description: 'Зеленого цвета, теплая'},
        {id: '3', title: 'Джинсы 2', price: 5000, description: 'Синего цвета, прямые'},
        {id: '4', title: 'Куртка 8', price: 122, description: 'Зеленого цвета, теплая'},
        {id: '5', title: 'Джинсы 3', price: 5000, description: 'Синего цвета, прямые'},
        {id: '6', title: 'Куртка 7', price: 600, description: 'Зеленого цвета, теплая'},
        {id: '7', title: 'Джинсы 4', price: 5500, description: 'Синего цвета, прямые'},
        {id: '8', title: 'Куртка 5', price: 12000, description: 'Зеленого цвета, теплая'},
    ])

    const getTotalPrice = (items = []) => {
        return items.reduce((acc, item) => {
            return acc += item.price
        }, 0)
    }



    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    }));

    const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }));

    const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        '& .MuiInputBase-input': {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                width: '12ch',
                '&:focus': {
                    width: '20ch',
                },
            },
        },
    }));





    const onSendData = useCallback(() => {
        const data = {
            products: addedItems,
            totalPrice: getTotalPrice(addedItems),
            queryId,
        }
        fetch('http://85.119.146.179:8000/web-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
    }, [addedItems])

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)
        return () => {
            tg.offEvent('mainButtonClicked', onSendData)
        }
    }, [onSendData])

    const onAdd = (product, total) => {
        // product.total = total;
        // const alreadyAdded = addedItems.find(item => item.id === product.id);
        //
        // let newItems = [];
        //
        // if(alreadyAdded) {
        //     newItems = addedItems.filter(item => item.id !== product.id);
        // } else {
        //     newItems = [...addedItems, product];
        // }
        //
        //
        //
        // setAddedItems(newItems)
        // let check = false;
        // newItems.forEach(e => {
        //     if(e.total > 0){
        //         check = true;
        //     }
        // })

        tg.MainButton.show();
        tg.MainButton.setParams({
            text: `Buy`
        })

        // if(!check) {
        //     tg.MainButton.hide();
        // } else {
        //     tg.MainButton.show();
        //     tg.MainButton.setParams({
        //         text: `Buy`
        //     })
        // }
    }
    const [searchQuery, setSearchQuery] = useState('')
    const searchPosts = useMemo(() => {
        return products.filter(posts => posts.title.toLowerCase().includes(searchQuery.toLowerCase()))
    }, [searchQuery, products])


    return (
        <div className={'list'} style={{paddingTop: '100px'}}>
                <AppBar position="fixed">
                    <Toolbar className='searchBar'>
                            <MyInput
                                value={searchQuery}
                                onChange={(e) => {
                                    setSearchQuery(e.target.value)
                                }}
                                placeholder="Search…"
                            />
                    </Toolbar>
                </AppBar>
            {searchPosts.map(item => (
                <ProductItem
                    product={item}
                    onAdd={onAdd}
                    className={'item'}
                />
            ))}
        </div>
    );
};

export default ProductList;

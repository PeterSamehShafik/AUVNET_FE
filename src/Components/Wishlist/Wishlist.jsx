import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, IconButton } from '@mui/material';
import { MdDelete } from 'react-icons/md';
import { toast } from 'react-toastify';
import LoadingScreen from '../../common/Loading.jsx';
import axios from '../../API/axios.js';
import ErrorText from '../../common/Error.jsx';

const WishlistPage = () => {
    const [wishlist, setWishlist] = useState('loading');

    const fetchWishlist = async () => {
        try {
            const response = await axios.get('/wishlist');
            console.log(typeof (response.data.data.wishlist))
            setWishlist(response.data.data.wishlist);
        } catch (error) {
            console.log(error)
            toast.error('Failed to fetch wishlist. Please try again later.');
            setWishlist('error')
        } finally {
            setWishlist(false)
        }
    };
    useEffect(() => {
        fetchWishlist();
    }, []);

    const removeFromWishlist = async (id) => {
        try {
            await axios.delete(`/wishlist/${id}`);
            setWishlist((prev) => prev.filter((item) => item._id !== id));
            toast.success('Item removed from wishlist.');
        } catch (error) {
            toast.error('Failed to remove item. Please try again later.');
        }
    };



    return <>
        {wishlist === 'loading' ? <LoadingScreen /> :
            wishlist === 'error' ? <ErrorText handleRefresh={fetchWishlist} /> :
                !wishlist?.length ? <ErrorText handleRefresh={fetchWishlist} text='No items in your wishlist.' /> :
                    <Box className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg mx-auto mt-12 w-full max-w-lg">
                        <Typography variant="h6" className="text-gray-900 dark:text-gray-200 mb-4">
                            Your Wishlist
                        </Typography>
                        {wishlist?.map((item) =>
                            <Box
                                key={item.product._id}
                                className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-4 shadow-md"
                            >
                                <Typography variant="h6" className="text-gray-900 dark:text-gray-200">
                                    {item.product.name}
                                </Typography>
                                <Typography variant="body2" className="text-gray-600 dark:text-gray-400">
                                    {item.product.description}
                                </Typography>
                                <Typography variant="body2" className="text-gray-500 dark:text-gray-500">
                                    Category: {item.product.category}
                                </Typography>
                                <IconButton
                                    onClick={() => removeFromWishlist(item.product._id)}
                                    className="text-red-500 hover:text-red-600"
                                >
                                    <MdDelete />
                                </IconButton>
                            </Box>)}
                    </Box>
        }
    </>
};

export default WishlistPage;

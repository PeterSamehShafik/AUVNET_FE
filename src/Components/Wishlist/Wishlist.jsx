import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, IconButton } from '@mui/material';
import { MdDelete } from 'react-icons/md';
import { toast } from 'react-toastify';
import LoadingScreen from '../../common/Loading.jsx';
import axios from '../../API/axios.js';
import ErrorText from '../../common/Error.jsx';
import useChangeTitle from './../../hooks/useChangeTitle';

const WishlistPage = () => {
    useChangeTitle("Wishlist")
    const [wishlist, setWishlist] = useState('loading');
    const [loading, setLoading] = useState(false);

    const fetchWishlist = async () => {
        try {
            const response = await axios.get('/wishlist');
            setWishlist(response.data.data.wishlist);
        } catch (error) {
            console.log(error)
            toast.error(error.response?.data?.message || 'Failed to fetch wishlist. Please try again later.');
            setWishlist('error')
        }
    };
    useEffect(() => {
        fetchWishlist();
    }, []);

    const removeFromWishlist = async (id) => {
        try {
            setLoading(true)
            await axios.delete('/wishlist', {
                data: {
                    product: id
                }
            });
            await fetchWishlist()
            toast.success('Item removed from wishlist.');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to remove item. Please try again later.');
        } finally {
            setLoading(false)
        }
    };



    return <>
        {loading && <LoadingScreen fullScreen={true} />}
        {wishlist === 'loading' ? <LoadingScreen /> :
            wishlist === 'error' ? <ErrorText handleRefresh={fetchWishlist} /> :
                !wishlist?.length ? <ErrorText handleRefresh={fetchWishlist} text='No items in your wishlist.' /> :
                    <Box className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg mx-auto mt-12 w-full max-w-lg">
                        <Typography variant="h6" className="text-gray-900 dark:text-gray-200 mb-4">
                            Your Wishlist
                        </Typography>
                        {wishlist?.map((item) =>
                            <Box key={item._id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-4 shadow-md hover:shadow-lg transition-shadow duration-300">
                                <Typography variant="h6" className="text-gray-900 dark:text-gray-200">
                                    {item.name}
                                </Typography>
                                <Typography variant="body2" className="text-gray-600 dark:text-gray-400">
                                    {item.description}
                                </Typography>
                                <Typography variant="body2" className="text-gray-500 dark:text-gray-500">
                                    Category: {item.category?.name}
                                </Typography>
                                <div
                                    onClick={() => removeFromWishlist(item._id)}
                                    className="inline-flex items-center mt-4 px-4 py-2 cursor-pointer bg-gray-200 dark:bg-slate-600 dark:hover:bg-red-600 hover:bg-red-600 text-red-500 dark:text-red-400 hover:text-red-100 dark:hover:text-red-100 rounded-lg transition-colors duration-300"

                                >
                                    <MdDelete size={24} />
                                    <Typography variant="body2" className="ml-2">
                                        Delete from Wishlist
                                    </Typography>
                                </div>
                            </Box>
                        )}
                    </Box>
        }
    </>
};

export default WishlistPage;

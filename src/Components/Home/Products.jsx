import React, { useContext, useEffect, useState } from 'react';
import { Card, CardContent, Typography, Button, Pagination } from '@mui/material';
import { toast } from 'react-toastify';
import axios from '../../API/axios.js';
import LoadingScreen from '../../common/Loading.jsx';
import ErrorText from '../../common/Error.jsx';
import { AuthContext } from '../../context/AuthProvider.jsx';
import { allRoles } from './../../Routes/ProtectedRoute';
import { CategoryContext } from '../../context/CategoryProvider.jsx';

const Products = () => {
  const [products, setProducts] = useState('loading');
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { auth } = useContext(AuthContext)
  const { cat } = useContext(CategoryContext)


  const fetchProducts = async () => {
    try {
      const catFilter = cat?.slug ? `&category=${cat.slug}` : ''
      const response = await axios.get(`/products?page=${page}&size=9${catFilter}`);
      setProducts(response.data.data.products);
      setTotalPages(response.data.data.totalPages);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
      setProducts('error');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page, cat])

  const handleChange = (event, value) => {
    setPage(value);
  };

  const handleAddToWishlist = async (productId) => {
    try {
      setLoading(true)
      await axios.post('/wishlist', { product: productId });
      toast.success('Product added to wishlist');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add product to wishlist');
    } finally {
      setLoading(false)
    }
  };

  return (
    <>
      {loading && <LoadingScreen fullScreen={true} />}
      {products === 'loading' ? <LoadingScreen /> :
        products === 'error' ? <ErrorText handleRefresh={fetchProducts} /> :
          !products?.length ? <ErrorText handleRefresh={fetchProducts} text='No Products found' /> :
            <div className="flex-1 p-4 bg-gray-200 dark:bg-slate-900 rounded-lg">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {products?.map((product) => (
                  <Card key={product._id} className="bg-white dark:bg-gray-800 shadow-md rounded-lg hover:shadow-lg">
                    <CardContent>
                      <Typography variant="h6" component="div" className="font-semibold text-gray-900 dark:text-gray-200">
                        {product.name}
                      </Typography>
                      <Typography variant="body2" color="textSecondary" className="dark:text-gray-400">
                        {product.category.name}
                      </Typography>
                      <Typography variant="body1" color="textPrimary" className="font-semibold text-gray-700 dark:text-gray-300 mt-2">
                        ${product.price.toFixed(2)}
                      </Typography>
                      <Typography variant="body2" color="textSecondary" className="dark:text-gray-400 mt-2">
                        {product.description}
                      </Typography>
                      {auth && auth?.role === allRoles.U &&
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleAddToWishlist(product._id)}
                          className="!mt-5 !transition-transform transform hover:scale-105 hover:bg-blue-700"
                        >
                          Add to Wishlist
                        </Button>
                      }
                    </CardContent>
                  </Card>

                ))}
              </div>
              {totalPages > 1 && <div className="mt-4 flex justify-center">
                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={handleChange}
                  color="primary"
                  className="dark:text-gray-200"
                />
              </div>}
            </div>}
    </>
  );
};

export default Products;

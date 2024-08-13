import React, { useState, useEffect, useContext } from 'react';
import { Collapse, FormControlLabel, Radio, RadioGroup, List, ListItem, ListItemText, Pagination, Typography } from '@mui/material';
import { MdExpandMore, MdExpandLess } from "react-icons/md";
import { toast } from 'react-toastify';
import LoadingScreen from '../../common/Loading.jsx';
import ErrorText from '../../common/Error.jsx';
import axios from '../../API/axios.js';
import { CategoryContext } from './../../context/CategoryProvider';

export default function Categories() {
    const [categories, setCategories] = useState('loading');
    const [openCategories, setOpenCategories] = useState({}); // Track open/closed state by _id
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const { cat, setCat } = useContext(CategoryContext);

    const fetchCategories = async () => {
        try {
            const response = await axios.get(`/categories?page=${page}&size=5&format=true`);
            setCategories(response.data.data.categories);
            setTotalPages(response.data.data.totalPages);
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
            setCategories('error');
        }
    };

    useEffect(() => {
        fetchCategories();
    }, [page]);

    const handleToggle = (id) => {
        setOpenCategories(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const handleChangePage = (event, value) => {
        setPage(value);
    };

    const handleRadioChange = (event, slug, _id) => {
        setCat({ _id, slug }); // Only one category can be selected at a time
    };

    const renderSubCategories = (subCategories, level = 1) => (
        <List component="div" disablePadding>
            {subCategories.map((subcat) => (
                <div key={subcat._id}>
                    <ListItem
                        style={{ marginLeft: `${level * 20}px` }} // Indentation to the right
                        className="flex justify-between"
                    >
                        <FormControlLabel
                            control={
                                <Radio
                                    className='text-slate-900 dark:text-white'
                                    checked={cat._id === (subcat._id)}
                                    onChange={(e) => handleRadioChange(e, subcat.slug, subcat._id)}
                                />
                            }
                            label={<span className='text-xs md:text-lg'>{subcat.name}</span>}
                        />
                        {subcat.subCategories.length > 0 && (
                            <span onClick={() => handleToggle(subcat._id)}>
                                {openCategories[subcat._id] ? <MdExpandLess /> : <MdExpandMore />}
                            </span>
                        )}
                    </ListItem>
                    {openCategories[subcat._id] && renderSubCategories(subcat.subCategories, level + 1)}
                </div>
            ))}
        </List>
    );

    return <>
        {categories === 'loading' ? <LoadingScreen /> :
            categories === 'error' ? <ErrorText handleRefresh={fetchCategories} /> :
                !categories?.length ? <ErrorText handleRefresh={fetchCategories} text='No categories found' /> :
                    <>
                        <List>

                            <ListItem className="flex justify-between text-gray-900 dark:text-gray-200">
                                <FormControlLabel
                                    className='text-xs'
                                    control={
                                        <Radio
                                            className='text-slate-900 dark:text-white'
                                            checked={cat._id === 'all'}
                                            onChange={(e) => setCat({ slug: null, _id: 'all' })}
                                        />
                                    }
                                    label={<span className='text-md md:text-lg'>All</span>}
                                />
                            </ListItem>
                            {categories.map((category) => (
                                <div key={category._id}>
                                    <ListItem
                                        onClick={() => handleToggle(category._id)}
                                        className="flex justify-between text-gray-900 dark:text-gray-200"
                                    >
                                        <FormControlLabel
                                            className='text-xs'
                                            control={
                                                <Radio
                                                    className='text-slate-900 dark:text-white'
                                                    checked={cat._id === (category._id)}
                                                    onChange={(e) => handleRadioChange(e, category.slug, category._id)}
                                                />
                                            }
                                            label={<span className='text-md md:text-lg'>{category.name}</span>}
                                        />
                                        {category.subCategories.length > 0 && (
                                            <span>
                                                {openCategories[category._id] ? <MdExpandLess /> : <MdExpandMore />}
                                            </span>
                                        )}
                                    </ListItem>
                                    {openCategories[category._id] && renderSubCategories(category.subCategories)}
                                </div>
                            ))}
                        </List>
                        {totalPages > 1 && <div className="mt-4 flex justify-center">
                            <Pagination
                                count={totalPages}
                                page={page}
                                onChange={handleChangePage}
                                color="primary"
                                size="small"
                            />
                        </div>}
                    </>
        }
    </>
}

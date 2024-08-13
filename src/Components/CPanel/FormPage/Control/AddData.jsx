import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { toast } from 'react-toastify'; // Assuming you're using react-toastify for notifications
import { addProductSchema, addCategorySchema, addUserSchema } from './../../schemas';
import axios from './../../../../API/axios';
import LoadingScreen from './../../../../common/Loading';
import FormData from '../FormData.jsx';

export default function AddData() {

    const location = useLocation();
    const navigate = useNavigate();
    const currentPath = location.pathname;
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);


    const determineType = () => {
        if (currentPath.includes('products')) return 'products';
        if (currentPath.includes('categories')) return 'categories';
        if (currentPath.includes('users')) return 'admins';
        return '';
    };
    const type = determineType(); // Get the type
    const title = type.charAt(0).toUpperCase() + type.slice(1); // Capitalize the type for the title

    // Define the form data based on the type
    const data = {
        products: {
            inputs: ['name', 'description', 'price'],
            dropSelect: { selectName: 'category', selections: categories || [] },
            schema: addProductSchema
        },
        categories: {
            inputs: ['name'],
            dropSelect: { selectName: 'parentCategory', selections: categories || [] },
            schema: addCategorySchema

        },
        admins: {
            inputs: ['userName', 'email', 'password'],
            // dropSelect: { selectName: 'role', selections: ['Admin', 'User'] },
            dropSelect: null,
            schema: addUserSchema
        }
    }[type] || {}; // Use the data for the current type


    const fetchCategories = async () => {
        try {
            setLoading(true)
            const response = await axios.get(`/categories?page=1&size=100`);
            setCategories(response.data.data.categories);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to fetch categories. Please try again later.');
            setCategories([]); // Set an empty array if there's an error            
        } finally {
            setLoading(false)
        }
    };
    useEffect(() => {
        if (type === 'products' || type === 'categories') {
            fetchCategories();
        } else {
            setLoading(false)
        }
    }, []);

    const onAdd = async (values) => {
        try {
            setLoading(true)
            let response = await axios.post(`/${type}`, values);
            console.log(response)
            if (response.status === 201) {
                toast.success(`${title} Added Successfully`)
            }
            navigate(`/cpanel/${type === 'admins' ? 'users' : type}`)
        } catch (error) {
            console.log(error)
            toast.error(error.response?.data?.message || `Failed to Add ${title} Please try again later.`); // Show error toast            
        } finally {
            setLoading(false)
        }
    };

    const addFormik = useFormik({
        initialValues: data.inputs.reduce((acc, field) => {
            acc[field] = '';
            return acc;
        }, {}),
        validationSchema: data.schema,
        onSubmit: values => onAdd(values)
    });




    return <>
        {loading ? <LoadingScreen fullScreen={true} /> :
            <FormData
                operation='Add'
                title={title}
                data={data}
                type={type}
                formik={addFormik}

            />
        }
    </>
}

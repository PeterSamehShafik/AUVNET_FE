import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import { toast } from 'react-toastify'; // Assuming you're using react-toastify for notifications
import { editProductSchema, editCategorySchema, editUserSchema } from './../../schemas';
import axios from './../../../../API/axios';
import LoadingScreen from './../../../../common/Loading';
import FormData from '../FormData.jsx';

export default function EditData() {

    const { id } = useParams(); // Extract the id from the URL params
    const location = useLocation();
    const navigate = useNavigate();
    const currentPath = location.pathname;
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);


    const determineType = () => {
        if (currentPath.includes('products')) return 'products';
        if (currentPath.includes('categories')) return 'categories';
        if (currentPath.includes('users')) return 'users';
        return '';
    };
    const type = determineType(); // Get the type
    const title = type.charAt(0).toUpperCase() + type.slice(1); // Capitalize the type for the title

    // Define the form data based on the type
    const data = {
        products: {
            inputs: ['name', 'description', 'price'],
            dropSelect: { selectName: 'category', selections: categories || [] },
            schema: editProductSchema
        },
        categories: {
            inputs: ['name'],
            dropSelect: null,
            schema: editCategorySchema

        },
        users: {
            inputs: [],
            disabled: ['userName'],
            dropSelect: { selectName: 'role', selections: [{ _id: 'Admin', name: 'Admin' }, { _id: 'User', name: 'User' }] },
            // dropSelect: null,
            schema: editUserSchema
        }
    }[type] || {}; // Use the data for the current type


    const fetchCategories = async () => {
        try {
            setLoading(true)
            const response = await axios.get(`/categories?page=1&size=100`);
            console.log(response.data.data.categories)
            setCategories(response.data.data.categories);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to fetch categories. Please try again later.');
            setCategories([]); // Set an empty array if there's an error            
        } finally {
            setLoading(false)
        }
    };



    const fetchDataById = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`/${type}/${id}`);
            const firstKey = Object.keys(response.data.data)[0];
            const fetchedData = response.data.data[firstKey];
            editFormik.setValues(fetchedData);
        } catch (error) {
            console.log(error)
            toast.error(error.response?.data?.message || `Failed to fetch ${title}. Please try again later.`);
            navigate(`/cpanel/${type}`)
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDataById()
        if (type === 'products' || type === 'categories') {
            fetchCategories();
        }
    }, [id]);

    const onEdit = async (values) => {
        try {
            setLoading(true)
            console.log({ url: `/${type}/${id}`, values })
            let response = await axios.patch(`/${type === 'users' ? 'admins' : type}/${id}`, values);
            if (response.status === 200) {
                toast.success(`${title} Edited Successfully`)
            }
            navigate(`/cpanel/${type}`)
        } catch (error) {
            console.log(error)
            toast.error(error.response?.data?.message || `Failed to edit ${title} Please try again later.`); // Show error toast            
        } finally {
            setLoading(false)
        }
    };

    const editFormik = useFormik({
        initialValues: {},
        validationSchema: data.schema,
        onSubmit: async (values) => {
            const filteredData = await data.schema.validate(values, {
                stripUnknown: true,
            });
            return onEdit(filteredData)
        }
    });






    return <>
        {loading ? <LoadingScreen fullScreen={true} /> :
            <FormData
                operation='Edit'
                title={title}
                data={data}
                type={type}
                formik={editFormik}

            />
        }

    </>
}

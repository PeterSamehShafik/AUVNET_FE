import React from 'react'
import { Box, Button, Typography, IconButton } from '@mui/material';
import { MdArrowBack } from 'react-icons/md';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import InputField from './../../../common/Fields/InputField';
import SelectField from './../../../common/Fields/SelectField';

export default function FormData({ operation, title, data, type, formik }) {
    return <>
        <Box className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg mx-auto mt-12 w-full max-w-lg">
            <div className="flex justify-between items-center mb-4">
                <Link to={`/cpanel/${type === 'admins' ? 'users' : type}`}>
                    <MdArrowBack className='text-slate-900 dark:text-slate-50' />
                </Link>
                <Typography variant="h6" className="text-gray-900 dark:text-gray-200">
                    {operation === 'add' ? `${operation} New ${title}` : `${operation}  ${title}`}
                </Typography>
            </div>

            <form className='space-y-4 md:space-y-6' onSubmit={formik.handleSubmit}>
                {data.inputs && data.inputs.map((field) => (
                    <div key={field}>
                        <InputField
                            key={field}
                            type={field === 'price' ? 'number' : field === 'password' ? 'password' : 'text'}
                            field={field}
                            formik={formik}
                            labelName={field.charAt(0).toUpperCase() + field.slice(1)}
                        />
                    </div>
                ))}
                {data.disabled && data.disabled.map((field) => (
                    <div key={field}>
                        <InputField
                            key={field}
                            isDisabled={true}
                            type={field === 'price' ? 'number' : 'text'}
                            field={field}
                            formik={formik}
                            labelName={field.charAt(0).toUpperCase() + field.slice(1)}
                        />
                    </div>
                ))}
                {data.dropSelect && (
                    <SelectField
                        field={data.dropSelect.selectName}
                        labelName={data.dropSelect.selectName}
                        formik={formik}
                        selections={data.dropSelect.selections}
                    />
                )}
                <div className="flex justify-end mt-6 space-x-2">
                    <Link to={`/cpanel/${type === 'admins' ? 'users' : type}`}>
                        <Button
                            variant="contained"
                            className="bg-gray-500 hover:bg-gray-600 text-white rounded-lg"
                        >
                            Cancel
                        </Button>
                    </Link>
                    <Button
                        type="submit"
                        variant="contained"
                        color="success"
                        className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
                    >
                        {operation} {title}
                    </Button>
                </div>
            </form>
        </Box>
    </>
}

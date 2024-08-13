import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material';

export default function SelectField({ field, labelName, formik, selections }) {
    return <>
        <FormControl fullWidth variant="outlined" error={formik.touched[field] && Boolean(formik.errors[field])}>
            <InputLabel className='text-gray-900 dark:text-white'>{labelName}</InputLabel>
            <Select
                id={field}
                name={field}
                defaultValue=''
                label={labelName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values[field]}
                error={formik.touched[field] && Boolean(formik.errors[field])}
                helperText={formik.touched[field] && formik.errors[field]}
                className='bg-gray-50 text-gray-900 dark:bg-gray-700 dark:text-white dark:border dark:border-gray-50' // Tailwind CSS classes for dark mode                
            >
                {selections?.map((selection, idx) => (
                    <MenuItem key={idx} value={selection._id}>
                        {selection.name}
                    </MenuItem>
                ))}
            </Select>
            {formik.touched[field] && formik.errors[field] && (
                <FormHelperText>{formik.errors[field]}</FormHelperText>
            )}
        </FormControl >
    </>
}

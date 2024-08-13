import React from 'react';
import Products from './Products';
import Categories from './Categories';
import useChangeTitle from '../../hooks/useChangeTitle.jsx';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import { MdExpandMore } from 'react-icons/md';

const HomePage = () => {
  useChangeTitle('Home Page');

  return (
    <div className="flex flex-col p-6 md:flex-row">
      <div className="hidden md:block">
        <div className="w-40 md:w-64 bg-gray-200 dark:bg-gray-800 md:p-4 p-1 rounded-lg shadow-md ">
          <h2 className="text-lg md:text-xl font-semibold mb-4 text-gray-900 dark:text-gray-200 p-2">Categories</h2>
          <Categories />
        </div>
      </div>
      <div className="flex-1 ml-4">
        <div className="block md:hidden mb-4">
          <Accordion className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700"        >
            <AccordionSummary
              expandIcon={<MdExpandMore className="text-gray-900 dark:text-white" />}
              aria-controls="categories-content"
              id="categories-header"
            >
              <Typography className="text-gray-900 dark:text-white">Categories</Typography>
            </AccordionSummary>
            <AccordionDetails className="bg-gray-50 dark:bg-slate-700">
              <Categories />
            </AccordionDetails>
          </Accordion>
        </div>
        <Products />
      </div>
    </div>
  );
};

export default HomePage;

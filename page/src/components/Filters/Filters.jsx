import React, { useState, useCallback, useContext, useEffect } from 'react';
import {useSearchParams} from "react-router-dom";

import { Filter, FilterX } from 'lucide-react';

import {useCountries} from 'app.hooks';

import 'styles/Filters.css';
import { FilterContext } from 'contexts/FilterContext';

const Filters = () => {
  const context = useContext(FilterContext);
  console.log(context)
  const [searchParams, setSearchParams] = useSearchParams(context.searchParams);
  const [open, setOpen] = useState(context.open);

  useEffect(() => {
    context.searchParams = searchParams;
    context.open = open;
  }, [searchParams, open]);

  const onChange = useCallback((key, value) => {
      setSearchParams({...Object.fromEntries(searchParams), [key]: value})
  }, [searchParams, setSearchParams]);

  const countries = useCountries()

  const search = Object.fromEntries(searchParams)

  return (
    <div className={"filters " + (open ? 'open' : 'closed')}>
      <div
          className='filters-header'
          title={open ? 'Close filters' : 'Open filters'}
          onClick={() => {
              if (open) {
                  // setSearchParams({});
                  setOpen(false);
                  return;
              }
              setOpen(true);
          }}
      >
          <div className='filters-icon'>{open ? <FilterX/> : <Filter/>}</div>
          <span className='filters-title'>Filters</span>
      </div>

      <div className='filtersItem'>
        <label htmlFor='filter-query'>Search:</label>
        <input id='filter-query' type='text' value={search.query} onChange={(e) => onChange('query', e.target.value)}/>
      </div>

      <div className='filtersItem'>
        <label htmlFor='filter-call-for-papers'>Call For Papers Open:</label>
        <input checked={search.callForPapers == 'true'} type='checkbox' id='filter-call-for-papers' onChange={(e) => onChange('callForPapers', e.target.checked)}/>
      </div>

      <div className='filtersItem'>
        <label htmlFor='filter-closed-captions'>Closed Captions:</label>
        <input checked={search.closedCaptions == 'true'} type='checkbox' id='filter-closed-captions' onChange={(e) => onChange('closedCaptions', e.target.checked)}/>
      </div>

      <div className='filtersItem'>
        <label htmlFor='filter-scholarship'>Scholarship:</label>
        <input checked={search.scholarship == 'true'} type='checkbox' id='filter-scholarship' onChange={(e) => onChange('scholarship', e.target.checked)}/>
      </div>

      <div className='filtersItem'>
        <label htmlFor='filter-online'>Online:</label>
        <input checked={search.online == 'true'} type='checkbox' id='filter-online' onChange={(e) => onChange('online', e.target.checked)}/>
      </div>

      <div className='filtersItem'>
        <label htmlFor='filter-country'>Country:</label>
        <select value={search.country} id='filter-country' onChange={(e) => onChange('country', e.target.value)}>
          <option value=''>All</option>
          {countries.map((c) => (<option value={c} key={c}>{c}</option>))}
        </select>
      </div>
    </div>
  );
};

export default Filters;

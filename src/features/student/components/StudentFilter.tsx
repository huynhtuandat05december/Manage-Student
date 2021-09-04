import { Box, Button, FormControl, Grid, InputLabel, MenuItem, OutlinedInput, Select } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { City, ListParams } from 'models';
import  React, { ChangeEvent, ReactNode, useRef } from 'react';

export interface StudentFilterProps {
    filter:ListParams;
    cityList:City[];
    onSearchChange:(newFilter:ListParams)=>void;
    onChange:(newFilter:ListParams)=>void
}

export default function StudentFilter ({filter,cityList,onSearchChange,onChange}: StudentFilterProps) {
  const searchRef = useRef<HTMLInputElement>();
  const handleSearchChange=(e:ChangeEvent<HTMLInputElement>)=>{

    const newFilter={
        ...filter,
        name_like:e.target.value
    }
    onSearchChange(newFilter)


  }
  const handleCityChange=(e:ChangeEvent<{name?:string,value:unknown}>)=>{
    const newFilter={
        ...filter,
        city:e.target.value||undefined,
        _page:1
    }
    onChange(newFilter)

  }
  const handleSortChange=(e:ChangeEvent<{name?:string,value:unknown}>)=>{
    const [_sort, _order] = (e.target.value as string).split('.');
    const newFilter={
        ...filter,
        _sort:_sort || undefined,
        _order: (_order as 'asc' | 'desc') || undefined,
    }
    onChange(newFilter)

  }
  const handleClearFilter=()=>{
      const newFilter={
          ...filter,
          _sort:undefined,
          _order:undefined,
          city:undefined,
          name_like:undefined,
          _page:1,
      }
      onChange(newFilter)
      if (searchRef.current) {
        searchRef.current.value = '';
      }

  }
  
    return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth variant="outlined" size="small">
            <InputLabel htmlFor="searchByName">Search by name</InputLabel>
            <OutlinedInput
              id="searchByName"
              label="Search by name"
              endAdornment={<Search />}
              onChange={handleSearchChange}
              inputRef={searchRef}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <FormControl variant="outlined" size="small" fullWidth>
            <InputLabel id="filterByCity">Filter by city</InputLabel>
            <Select
              labelId="filterByCity"
              value={filter.city || ''}
              onChange={handleCityChange}
              label="Filter by city"
            >
              <MenuItem value="">
                <em>All</em>
              </MenuItem>

              {cityList.map((city) => (
                <MenuItem key={city.code} value={city.code}>
                  {city.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} lg={2}>
          <FormControl variant="outlined" size="small" fullWidth>
            <InputLabel id="sortBy">Sort</InputLabel>
            <Select
              labelId="sortBy"
              value={filter._sort ? `${filter._sort}.${filter._order}` : ''}
              onChange={handleSortChange}
              label="Sort"
            >
              <MenuItem value="">
                <em>No sort</em>
              </MenuItem>

              <MenuItem value="name.asc">Name ASC</MenuItem>
              <MenuItem value="name.desc">Name DESC</MenuItem>
              <MenuItem value="mark.asc">Mark ASC</MenuItem>
              <MenuItem value="mark.desc">Mark DESC</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} lg={1}>
          <Button variant="outlined" color="primary" fullWidth onClick={handleClearFilter}>
            Clear
          </Button>
        </Grid>
        </Grid>
    </Box>
  );
}

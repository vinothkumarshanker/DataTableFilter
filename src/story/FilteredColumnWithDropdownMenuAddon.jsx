/* eslint-disable max-lines */
import React, { useCallback, useMemo, useState } from 'react';

import {
  DataTable,
  FILTER_TYPES,
  applyOutOfTheBoxFilters,
  FilterBarDropdownMenu,
} from '@elliemae/ds-data-table';
import { logger } from '@elliemae/ds-utilities';

const columns = [
  {
    Header: 'id',
    accessor: 'id',
  },
  {
    Header: 'Name',
    accessor: 'name',
  },
  {
    Header: 'Position',
    accessor: 'position',
  },
  {
    Header: 'Country',
    accessor: 'country',
  },
  {
    Header: 'Salary',
    accessor: 'salary',
  },
  {
    Header: 'Single date',
    accessor: 'singleDate',
  },
  {
    Header: 'Date range',
    accessor: 'dateRange',
  },
  {
    Header: 'Number range',
    accessor: 'numberRange',
  },
  { Header: 'Date Switcher', accessor: 'dateSwitcher' },
];

const makeDate = (val) => {
  const today = new Date('2021/11/01');
  today.setDate(today.getDate() + val);
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const yyyy = today.getFullYear();
  return `${mm}/${dd}/${yyyy}`;
};

const mockPositions = [
  'React dev',
  'Fullstack dev',
  'Svelte dev',
  'Angular dev',
  'VueJs dev',
];

const positions = [
  {
    dsId: '1',
    type: 'option',
    value: 'React dev',
    label: 'React dev',
  },
  {
    dsId: '2',
    type: 'option',
    value: 'Fullstack dev',
    label: 'Fullstack dev',
  },
  {
    dsId: '3',
    type: 'option',
    value: 'Svelte dev',
    label: 'Svelte dev',
  },
  {
    dsId: '4',
    type: 'option',
    value: 'Angular dev',
    label: 'Angular dev',
  },
  {
    dsId: '5',
    type: 'option',
    value: 'VueJS dev',
    label: 'VueJS dev',
  },
  {
    dsId: '6',
    type: 'option',
    value: 'Java developer',
    label: 'Java developer',
  },
  {
    dsId: '7',
    type: 'option',
    value: 'Python developer',
    label: 'Python developer',
  },
];
const generateRecord = (id) => ({
  id: id + 1,
  name: (id + 1) % 2 ? `John` : 'Francisco',
  position: mockPositions[id % mockPositions.length],
  // position: (id + 1) % 2 ? `Developer` : `Designer`,
  country: (id + 1) % 2 ? 'US' : 'ARG',
  salary: `$${123123 + (id % 30) * 10000}`,
  singleDate: makeDate((id % 20) - 10),
  dateRange: makeDate((id % 20) - 10),
  numberRange: (id % 11) + 6,
  dateSwitcher: makeDate((id % 20) - 10),
});

const genRows = (n) => new Array(n).fill({}).map((_, id) => generateRecord(id));

export const FilteredColumnWithDropdownMenuAddon = () => {
  const originalData = useMemo(() => genRows(1000), []);

  const mockColumns = React.useMemo(() => {
    const cols = columns;
    cols[0].filter = FILTER_TYPES.SELECT;
    cols[1].filter = FILTER_TYPES.SELECT;
    cols[2].filter = FILTER_TYPES.MULTI_SELECT;
    cols[2].filterOptions = positions;
    cols[4].filter = FILTER_TYPES.CURRENCY_RANGE;
    cols[5].filter = FILTER_TYPES.SINGLE_DATE;
    cols[6].filter = FILTER_TYPES.DATE_RANGE;
    cols[7].filter = FILTER_TYPES.NUMBER_RANGE;
    cols[8].filter = FILTER_TYPES.DATE_SWITCHER;
    return cols;
  }, []);

  const [filteredData, setFilteredData] = useState(originalData);
  const [filters, setFilters] = useState([]);

  // MUST BE MEMOIZED
  const onFiltersChange = useCallback(
    (newFilters) => {
      setFilters(newFilters);
      setFilteredData(applyOutOfTheBoxFilters(originalData, newFilters));
      // If you define your own custom filters, they won't be applied,
      // you will need to handle them here
      logger(newFilters, 'onFiltersChange');
    },
    [originalData]
  );

  const FilterBarDropdownMenuWithProps = useCallback(
    (props) => (
      <FilterBarDropdownMenu
        {...props}
        options={[
          {
            dsId: 'test',
            type: 'action',
            label: 'This is a test',
            onClick: () => logger('Test is working'),
          },
        ]}
      />
    ),
    []
  );

  return (
    <DataTable
      columns={mockColumns}
      data={filteredData}
      height={500}
      width={1000}
      colsLayoutStyle="auto"
      withFilterBar
      filters={filters}
      filterBarProps={{
        // render prop to create a custom filter bar menu handler
        filterBarAddonRenderer: FilterBarDropdownMenuWithProps,
      }}
      onFiltersChange={onFiltersChange}
    />
  );
};

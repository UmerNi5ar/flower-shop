import React, { useEffect, useState } from 'react';
import MaterialTable from 'material-table';
import tableIcons from './tableIcons';
import { ThemeProvider, createTheme } from '@mui/material';
import Loading from './Loading/Loading';
import axios from 'axios';
import { alert } from '../utils/alert';
const MonthlyAnalysis = (props) => {
  const [options, setOptions] = useState({
    sorting: true,
    search: true,
    searchFieldAlignment: 'right',
    searchAutoFocus: true,
    searchFieldVariant: 'standard',
    filtering: false,
    paging: true,
    pageSizeOptions: [5, 10, 20, 25, 50, 100],
    pageSize: 10,
    paginationType: 'stepped',
    showFirstLastPageButtons: false,
    exportButton: true,
    exportAllData: true,
    exportFileName: 'TableData',
    addRowPosition: 'first',
    showTextRowsSelected: false,
    toolbar: true,

    grouping: true,
    columnsButton: true,

    headerStyle: {
      background: '#f44336',
      color: '#fff',
      fontSize: '1.2rem',
    },
  });

  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const fetchData = async () => {
    await axios('/api/v1/bloomex/fetchMonthlyShipments')
      .then((response) => {
        setTableData(response.data.tableData);
      })
      .catch((error) => {
        setError('Something went wrong. Please try again later');
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    {
      title: 'Company',
      field: 'company',
      sorting: true,
      filtering: true,
      // cellStyle: { background: '#009688' },
      headerStyle: { color: '#fff' },
    },
    {
      title: 'Last Week Boxes',
      field: 'LastWeekBoxes',
      sorting: true,
      filtering: true,
      // cellStyle: { background: '#009688' },
      headerStyle: { color: '#fff' },
    },
    {
      title: 'Last Week Pellets',
      field: 'LastWeekPellets',
      sorting: true,
      filtering: true,
      // cellStyle: { background: '#009688' },
      headerStyle: { color: '#fff' },
    },
    {
      title: 'Last 15 Days Boxes',
      field: 'FifteenDaysBoxes',
      sorting: true,
      filtering: true,
      // cellStyle: { background: '#009688' },
      headerStyle: { color: '#fff' },
    },
    {
      title: 'Last 15 Days Pellets',
      field: 'FifteenDaysPellets',
      sorting: true,
      filtering: true,
      // cellStyle: { background: '#009688' },
      headerStyle: { color: '#fff' },
    },
    {
      title: 'Past Month Boxes',
      field: 'MonthlyBoxes',
      sorting: true,
      filtering: true,
      // cellStyle: { background: '#009688' },
      headerStyle: { color: '#fff' },
    },
    {
      title: 'Past Month Pellets',
      field: 'MonthlyPellets',
      sorting: true,
      filtering: true,
      // cellStyle: { background: '#009688' },
      headerStyle: { color: '#fff' },
    },
    {
      title: 'Past Month Hard Goods Deliveries',
      field: 'hardGoods',
      sorting: true,
      filtering: true,
      // cellStyle: { background: '#009688' },
      headerStyle: { color: '#fff' },
    },
    {
      title: 'Past Month Flowers Deliveries',
      field: 'flowers',
      sorting: true,
      filtering: true,
      // cellStyle: { background: '#009688' },
      headerStyle: { color: '#fff' },
    },
  ];
  const defaultMaterialTheme = createTheme();

  if (error)
    return alert({
      message: 'Something went wrong. Please try again later',
      type: 'error',
    });
  if (loading) {
    return <Loading />;
  } else {
    return (
      <div className="App">
        <ThemeProvider theme={defaultMaterialTheme}>
          <MaterialTable
            columns={columns}
            icons={tableIcons}
            data={Object.values(tableData)}
            options={options}
            title={
              <div style={{ height: '2rem', fontSize: '2rem' }}>
                Monthly Logistics Report
              </div>
            }
          />
        </ThemeProvider>
      </div>
    );
  }
};

export default MonthlyAnalysis;

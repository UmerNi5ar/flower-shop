import React, { useEffect, useState } from 'react';
import MaterialTable from 'material-table';
import tableIcons from './tableIcons';
import { ThemeProvider, createTheme } from '@mui/material';
import Loading from './Loading/Loading';
import axios from 'axios';
import { alert } from '../utils/alert';
import { TablePagination, Grid, Typography, Divider } from '@material-ui/core';

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
  const [tableHardGoods, setTableHardGoods] = useState();
  const fetchData = async () => {
    const response = await axios('/api/v1/bloomex/fetchMonthlyShipments')
      .then((response) => {
        setTableData(response.data.tableData);
      })
      .catch((error) => {
        console.log(error);
        setError('Something went wrong. Please try again later');
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  const columnsFlowers = [
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
  ];

  const columnsHardGoods = [
    {
      title: 'Last Week Boxes',
      field: 'LastWeekBoxes',
      sorting: true,
      filtering: true,
      // cellStyle: { background: '#009688' },
      headerStyle: { color: '#fff' },
    },
    {
      title: 'Last Week Ribbons',
      field: 'LastWeekRibbons',
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
      title: 'Last 15 Days Ribbons',
      field: 'FifteenDaysRibbons',
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
      title: 'Past Month Ribbons',
      field: 'MonthlyRibbons',
      sorting: true,
      filtering: true,
      // cellStyle: { background: '#009688' },
      headerStyle: { color: '#fff' },
    },
  ];
  const defaultMaterialTheme = createTheme();

  if (error) <div>{error}</div>;
  // return alert({
  //   message: 'Something went wrong. Please try again later',
  //   type: 'error',
  // });
  if (loading) {
    return <Loading />;
  } else {
    console.log(tableData);
    return (
      <React.Fragment>
        <div class="button__body">
          <div className="monthly__title">Monthly Logistics Report</div>

          <div className="button__contain">
            <div class="check-box">
              <input
                type="checkbox"
                id="tableC"
                onClick={(e) => {
                  console.log(tableHardGoods);
                  console.log();
                  setTableHardGoods(e.target.checked);
                }}
              />
              <label class="switch-button-label" for="tableC"></label>
            </div>
          </div>
          {/* <div class="switch-button">
            <input
              class="switch-button-checkbox"
              value={tableHardGoods}
              type="checkbox"
              onClick={(e) => {
                console.log(tableHardGoods);
                console.log();
                setTableHardGoods(e.target.checked);
              }}
            ></input>
            <label class="switch-button-label" for="">
              <span class="switch-button-label-span">Flowers</span>
            </label>
          </div> */}
        </div>
        <div className="App">
          {!tableHardGoods ? (
            <ThemeProvider theme={defaultMaterialTheme}>
              <MaterialTable
                columns={columnsFlowers}
                icons={tableIcons}
                data={Object.values(tableData.flowers)}
                options={options}
                components={{
                  Pagination: (props) => (
                    <>
                      <Grid container style={{ padding: 15 }}>
                        <Grid sm={6} item>
                          <Typography variant="subtitle2">Total</Typography>
                        </Grid>
                        <Grid sm={6} item align="center">
                          <Typography variant="subtitle2">
                            Total Number Of Flowers Shipments :{' '}
                            {tableData.totalFlowers}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Divider />
                      <TablePagination {...props} />
                    </>
                  ),
                }}
                title={
                  <div style={{ height: '2rem', fontSize: '2rem' }}>
                    Flowers
                  </div>
                }
              />
            </ThemeProvider>
          ) : (
            <ThemeProvider theme={defaultMaterialTheme}>
              <MaterialTable
                columns={columnsHardGoods}
                icons={tableIcons}
                data={Object.values(tableData.hardGoods)}
                components={{
                  Pagination: (props) => (
                    <>
                      <Grid container style={{ padding: 15 }}>
                        <Grid sm={6} item>
                          <Typography variant="subtitle2">Total</Typography>
                        </Grid>
                        <Grid sm={6} item align="center">
                          <Typography variant="subtitle2">
                            Total Number Of Hard Goods Shipments :{' '}
                            {tableData.totalHardGoods}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Divider />
                      <TablePagination {...props} />
                    </>
                  ),
                }}
                options={options}
                title={
                  <div style={{ height: '2rem', fontSize: '2rem' }}>
                    Hard Goods
                  </div>
                }
              />
            </ThemeProvider>
          )}
        </div>
      </React.Fragment>
    );
  }
};

export default MonthlyAnalysis;

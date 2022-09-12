import React, { useEffect, useState } from 'react';
import MaterialTable from 'material-table';
import tableIcons from './tableIcons';
import { ThemeProvider, createTheme } from '@mui/material';
import Loading from './Loading/Loading';
import axios from 'axios';
import { alert } from '../utils/alert';
import { TablePagination, Grid, Typography, Divider } from '@material-ui/core';
import { MTableToolbar } from 'material-table';

const MonthlyAnalysis = (props) => {
  const [hardGoodsData, setHardGoodsData] = useState();
  const [adleaideShipments, setAdleaideShipments] = useState();
  const [current, setCurrent] = useState(1);
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
    emptyRowsWhenPaging: false,

    grouping: true,
    columnsButton: true,

    headerStyle: {
      background: '#171717',
      color: '#fff',
      fontSize: '1.2rem',
    },
  });

  const [tableData, setTableData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [tableHardGoods, setTableHardGoods] = useState();
  const fetchData = async () => {
    const response = await axios('/api/v1/bloomex/fetchMonthlyShipments')
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
  const defaultMaterialTheme = createTheme();

  /////////////////////////////////////////////////////////////----------------------------------------------

  const columnsHardGoods = [
    {
      title: 'Created At',
      field: `createdAt`,

      sorting: true,
      filtering: true,
      // cellStyle: { background: '#009688' },
      headerStyle: { color: '#fff' },
      render: (row) => {
        return <div>{row.createdAt}</div>;
      },
    },
  ];
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  // return alert({
  //   message: 'Something went wrong. Please try again later',
  //   type: 'error',
  // });
  if (loading) {
    return <Loading />;
  } else {
    if (!hardGoodsData) {
      let dat = [];
      Object.values(tableData.hardGoods).forEach((el) => {
        dat.push(el.extraInputs);
      });
      setHardGoodsData(dat);
    }

    let columnArr = [];

    tableData.hardGoods.forEach((elmnt) => {
      columnArr = columnArr.concat(Object.keys(elmnt.extraInputs));
    });

    columnArr = [...new Set(columnArr)];
    columnArr.forEach((el) => {
      if (el.endsWith('value')) {
        columnsHardGoods.push({
          title: capitalizeFirstLetter(el.replace('value', '')),
          field: el,
          sorting: true,
          filtering: true,
          // cellStyle: { background: '#009688' },
          headerStyle: { color: '#fff' },
        });
      }
    });
  }

  /////////////////////////////////////////////////////////////----------------------------------------------

  const columnsAdelaideShipments = [
    {
      title: 'Created At',
      field: `createdAt`,

      sorting: true,
      filtering: true,
      // cellStyle: { background: '#009688' },
      headerStyle: { color: '#fff' },
      render: (row) => {
        return <div>{row.createdAt}</div>;
      },
    },
  ];

  // return alert({
  //   message: 'Something went wrong. Please try again later',
  //   type: 'error',
  // });
  if (loading) {
    return <Loading />;
  } else {
    if (!adleaideShipments) {
      let dat = [];
      tableData.adelaideShipments.forEach((el) => {
        dat.push(el);
      });

      setAdleaideShipments(dat);
    }

    let columnArr = [];

    tableData.adelaideShipments.forEach((elmnt) => {
      if (elmnt) columnArr = columnArr.concat(Object.keys(elmnt));
    });

    columnArr = [...new Set(columnArr)];
    columnArr.forEach((el) => {
      if (el.endsWith('value')) {
        columnsAdelaideShipments.push({
          title: capitalizeFirstLetter(el.replace('value', '')),
          field: el,
          sorting: true,
          filtering: true,
          // cellStyle: { background: '#009688' },
          headerStyle: { color: '#fff' },
        });
      }
    });
  }

  /////////////////////////////////////////////////////////////----------------------------------------------

  const ChangeFlowerTables = () => {
    return (
      <div
        className="monthly__buttons"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          height: '5rem',
        }}
      >
        <div
          className="monthly__buttons--1"
          style={{
            width: '50%',
            borderLeft: '1px solid white',
            borderRight: '1px solid white',
          }}
        >
          <button
            className="monthly--button"
            onClick={() => {
              setCurrent(1);
            }}
            style={{ width: '100%', height: '100%' }}
          >
            Other Flower Shipments
          </button>
        </div>

        <div
          className="monthly__buttons--2"
          style={{
            width: '50%',
            borderLeft: '1px solid white',
            borderRight: '2px solid white',
          }}
        >
          <button
            className="monthly--button"
            onClick={() => {
              setCurrent(2);
            }}
            style={{ width: '100%', height: '100%' }}
          >
            Adelaide Shipments
          </button>
        </div>
      </div>
    );
  };
  return (
    <React.Fragment>
      <div class="button__body">
        <div className="monthly__title">Monthly Logistics Report</div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h5 style={{ fontSize: '1.4rem', marginRight: '3rem' }}>
            Change Good Type
          </h5>

          <div className="button__contain">
            <div class="check-box">
              <input
                type="checkbox"
                id="tableC"
                onClick={(e) => {
                  setTableHardGoods(e.target.checked);
                }}
              />
              <label class="switch-button-label" for="tableC"></label>
            </div>
          </div>
        </div>
      </div>
      <div className="App">
        {!tableHardGoods ? (
          <ThemeProvider theme={defaultMaterialTheme}>
            {current === 1 ? (
              <MaterialTable
                columns={columnsFlowers}
                icons={tableIcons}
                data={tableData.flowers}
                // () => {
                //   if (tableData)
                //     return tableData.flowers
                //       ? Object.values(tableData.flowers)
                //       : [];
                //   return [];
                // }
                options={options}
                components={{
                  Toolbar: (props) => (
                    <div
                      className="container"
                      style={{
                        fontize: '2rem',
                      }}
                    >
                      <MTableToolbar {...props} />
                      <ChangeFlowerTables />
                    </div>
                  ),
                  Pagination: (props) => (
                    <>
                      <Grid
                        container
                        style={{ padding: 15, background: '#f7f7f7' }}
                      >
                        <Grid sm={6} item>
                          <Typography variant="h6">
                            Total Number Of Flowers Shipments :
                          </Typography>
                        </Grid>
                        <Grid sm={6} item align="center">
                          <Typography variant="h6">
                            {tableData.totalFlowers}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Divider />
                    </>
                  ),
                }}
                title={
                  <div style={{ height: '2rem', fontSize: '2rem' }}>
                    Flowers
                  </div>
                }
              />
            ) : (
              <MaterialTable
                columns={columnsAdelaideShipments}
                icons={tableIcons}
                data={Object.values(adleaideShipments)}
                // () => {
                //   if (tableData)
                //     return tableData.flowers
                //       ? Object.values(tableData.flowers)
                //       : [];
                //   return [];
                // }
                options={options}
                components={{
                  Toolbar: (props) => (
                    <div
                      className="container"
                      style={{
                        fontize: '2rem',
                      }}
                    >
                      <MTableToolbar {...props} />
                      <ChangeFlowerTables />
                    </div>
                  ),
                }}
                title={
                  <div style={{ height: '2rem', fontSize: '2rem' }}>
                    Flowers
                  </div>
                }
              />
            )}
          </ThemeProvider>
        ) : (
          <ThemeProvider theme={defaultMaterialTheme}>
            <MaterialTable
              columns={columnsHardGoods}
              icons={tableIcons}
              data={hardGoodsData}
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
};
export default MonthlyAnalysis;

// const columnsHardGoods = [
//   {
//     title: 'Last Week Boxes',
//     field: 'LastWeekBoxes',
//     sorting: true,
//     filtering: true,
//     // cellStyle: { background: '#009688' },
//     headerStyle: { color: '#fff' },
//   },
//   {
//     title: 'Last Week Ribbons',
//     field: 'LastWeekRibbons',
//     sorting: true,
//     filtering: true,
//     // cellStyle: { background: '#009688' },
//     headerStyle: { color: '#fff' },
//   },
//   {
//     title: 'Last 15 Days Boxes',
//     field: 'FifteenDaysBoxes',
//     sorting: true,
//     filtering: true,
//     // cellStyle: { background: '#009688' },
//     headerStyle: { color: '#fff' },
//   },
//   {
//     title: 'Last 15 Days Ribbons',
//     field: 'FifteenDaysRibbons',
//     sorting: true,
//     filtering: true,
//     // cellStyle: { background: '#009688' },
//     headerStyle: { color: '#fff' },
//   },
//   {
//     title: 'Past Month Boxes',
//     field: 'MonthlyBoxes',
//     sorting: true,
//     filtering: true,
//     // cellStyle: { background: '#009688' },
//     headerStyle: { color: '#fff' },
//   },
//   {
//     title: 'Past Month Ribbons',
//     field: 'MonthlyRibbons',
//     sorting: true,
//     filtering: true,
//     // cellStyle: { background: '#009688' },
//     headerStyle: { color: '#fff' },
//   },
// ];

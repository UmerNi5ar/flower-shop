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
  const [perthShipments, setPerthShipments] = useState();
  const [sydneyShipments, setSydneyShipments] = useState();
  const [melbourneShipments, setMelbourneShipments] = useState();
  const [adleaideShipments, setAdleaideShipments] = useState();
  const [brisbaneShipments, setBrisbaneShipments] = useState();
  const [current, setCurrent] = useState('pellets');
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

    grouping: false,
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
    // {
    //   title: 'Last Week Boxes',
    //   field: 'LastWeekBoxes',
    //   sorting: true,
    //   filtering: true,
    //   // cellStyle: { background: '#009688' },
    //   headerStyle: { color: '#fff' },
    // },
    {
      title: 'Last Week Pellets',
      field: 'LastWeekPellets',
      sorting: true,
      filtering: true,
      // cellStyle: { background: '#009688' },
      headerStyle: { color: '#fff' },
    },
    // {
    //   title: 'Last 15 Days Boxes',
    //   field: 'FifteenDaysBoxes',
    //   sorting: true,
    //   filtering: true,
    //   // cellStyle: { background: '#009688' },
    //   headerStyle: { color: '#fff' },
    // },
    {
      title: 'Last 15 Days Pellets',
      field: 'FifteenDaysPellets',
      sorting: true,
      filtering: true,
      // cellStyle: { background: '#009688' },
      headerStyle: { color: '#fff' },
    },
    // {
    //   title: 'Past Month Boxes',
    //   field: 'MonthlyBoxes',
    //   sorting: true,
    //   filtering: true,
    //   // cellStyle: { background: '#009688' },
    //   headerStyle: { color: '#fff' },
    // },
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
        return <div>{new Date(row.createdAt).toISOString().split('T')[0]}</div>;
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
        return (
          <div>
            {row.createdAt
              ? new Date(row.createdAt).toISOString().split('T')[0]
              : ''}
          </div>
        );
      },
    },
    {
      title: 'Arrival Date',
      field: `arrivalDate`,

      sorting: true,
      filtering: true,
      // cellStyle: { background: '#009688' },
      headerStyle: { color: '#fff' },
      render: (row) => {
        return <div>{row.arrivalDate ? row.arrivalDate : ''}</div>;
      },
    },
  ];
  const columnsMelbourneShipments = [
    {
      title: 'Created At',
      field: `createdAt`,

      sorting: true,
      filtering: true,
      // cellStyle: { background: '#009688' },
      headerStyle: { color: '#fff' },
      render: (row) => {
        return (
          <div>
            {row.createdAt
              ? new Date(row.createdAt).toISOString().split('T')[0]
              : ''}
          </div>
        );
      },
    },

    {
      title: 'Arrival Date',
      field: `arrivalDate`,

      sorting: true,
      filtering: true,
      // cellStyle: { background: '#009688' },
      headerStyle: { color: '#fff' },
      render: (row) => {
        return <div>{row.arrivalDate ? row.arrivalDate : ''}</div>;
      },
    },
  ];
  const columnsSydneyShipments = [
    {
      title: 'Created At',
      field: `createdAt`,

      sorting: true,
      filtering: true,
      // cellStyle: { background: '#009688' },
      headerStyle: { color: '#fff' },
      render: (row) => {
        return (
          <div>
            {row.createdAt
              ? new Date(row.createdAt).toISOString().split('T')[0]
              : ''}
          </div>
        );
      },
    },
    {
      title: 'Arrival Date',
      field: `arrivalDate`,

      sorting: true,
      filtering: true,
      // cellStyle: { background: '#009688' },
      headerStyle: { color: '#fff' },
      render: (row) => {
        return <div>{row.arrivalDate ? row.arrivalDate : ''}</div>;
      },
    },
  ];
  const columnsPerthShipments = [
    {
      title: 'Created At',
      field: `createdAt`,

      sorting: true,
      filtering: true,
      // cellStyle: { background: '#009688' },
      headerStyle: { color: '#fff' },
      render: (row) => {
        return (
          <div>
            {row.createdAt
              ? new Date(row.createdAt).toISOString().split('T')[0]
              : ''}
          </div>
        );
      },
    },
    {
      title: 'Arrival Date',
      field: `arrivalDate`,

      sorting: true,
      filtering: true,
      // cellStyle: { background: '#009688' },
      headerStyle: { color: '#fff' },
      render: (row) => {
        return <div>{row.arrivalDate ? row.arrivalDate : ''}</div>;
      },
    },
  ];
  const columnsBrisbaneShipments = [
    {
      title: 'Created At',
      field: `createdAt`,

      sorting: true,
      filtering: true,
      // cellStyle: { background: '#009688' },
      headerStyle: { color: '#fff' },
      render: (row) => {
        return (
          <div>
            {row.createdAt
              ? new Date(row.createdAt).toISOString().split('T')[0]
              : ''}
          </div>
        );
      },
    },
    {
      title: 'Arrival Date',
      field: `arrivalDate`,

      sorting: true,
      filtering: true,
      // cellStyle: { background: '#009688' },
      headerStyle: { color: '#fff' },
      render: (row) => {
        return <div>{row.arrivalDate ? row.arrivalDate : ''}</div>;
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
    if (!perthShipments) {
      let dat = [];
      tableData.perthShipments.forEach((el) => {
        dat.push(el);
      });

      setPerthShipments(dat);
    }
    if (!sydneyShipments) {
      let dat = [];
      tableData.sydneyShipments.forEach((el) => {
        dat.push(el);
      });

      setSydneyShipments(dat);
    }
    if (!brisbaneShipments) {
      let dat = [];
      tableData.brisbaneShipments.forEach((el) => {
        dat.push(el);
      });

      setBrisbaneShipments(dat);
    }
    if (!melbourneShipments) {
      let dat = [];
      tableData.melbourneShipments.forEach((el) => {
        dat.push(el);
      });

      setMelbourneShipments(dat);
    }
    let adelaideColumnArr = [];
    let brisbaneColumnArr = [];
    let perthColumnArr = [];
    let sydneyColumnArr = [];
    let melbourneColumnArr = [];

    tableData.sydneyShipments.forEach((elmnt) => {
      if (elmnt) sydneyColumnArr = sydneyColumnArr.concat(Object.keys(elmnt));
    });
    tableData.melbourneShipments.forEach((elmnt) => {
      if (elmnt)
        melbourneColumnArr = melbourneColumnArr.concat(Object.keys(elmnt));
    });
    tableData.brisbaneShipments.forEach((elmnt) => {
      if (elmnt)
        brisbaneColumnArr = brisbaneColumnArr.concat(Object.keys(elmnt));
    });
    tableData.perthShipments.forEach((elmnt) => {
      if (elmnt) perthColumnArr = perthColumnArr.concat(Object.keys(elmnt));
    });
    tableData.adelaideShipments.forEach((elmnt) => {
      if (elmnt)
        adelaideColumnArr = adelaideColumnArr.concat(Object.keys(elmnt));
    });
    adelaideColumnArr = [...new Set(adelaideColumnArr)];
    brisbaneColumnArr = [...new Set(brisbaneColumnArr)];
    perthColumnArr = [...new Set(perthColumnArr)];
    sydneyColumnArr = [...new Set(sydneyColumnArr)];
    melbourneColumnArr = [...new Set(melbourneColumnArr)];

    // columnArr = [...new Set(columnArr)];
    adelaideColumnArr.forEach((el) => {
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
    brisbaneColumnArr.forEach((el) => {
      if (el.endsWith('value')) {
        columnsBrisbaneShipments.push({
          title: capitalizeFirstLetter(el.replace('value', '')),
          field: el,
          sorting: true,
          filtering: true,
          // cellStyle: { background: '#009688' },
          headerStyle: { color: '#fff' },
        });
      }
    });
    perthColumnArr.forEach((el) => {
      if (el.endsWith('value')) {
        columnsPerthShipments.push({
          title: capitalizeFirstLetter(el.replace('value', '')),
          field: el,
          sorting: true,
          filtering: true,
          // cellStyle: { background: '#009688' },
          headerStyle: { color: '#fff' },
        });
      }
    });
    sydneyColumnArr.forEach((el) => {
      if (el.endsWith('value')) {
        columnsSydneyShipments.push({
          title: capitalizeFirstLetter(el.replace('value', '')),
          field: el,
          sorting: true,
          filtering: true,
          // cellStyle: { background: '#009688' },
          headerStyle: { color: '#fff' },
        });
      }
    });
    melbourneColumnArr.forEach((el) => {
      if (el.endsWith('value')) {
        columnsMelbourneShipments.push({
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
  /////////////////////////////////////////////////////////////----------------------------------------------
  /////////////////////////////////////////////////////////////----------------------------------------------
  /////////////////////////////////////////////////////////////----------------------------------------------
  /////////////////////////////////////////////////////////////----------------------------------------------
  /////////////////////////////////////////////////////////////----------------------------------------------
  /////////////////////////////////////////////////////////////----------------------------------------------
  /////////////////////////////////////////////////////////////----------------------------------------------
  const renderData = () => {
    if (!tableHardGoods) {
      if (current === 'pellets') {
        return (
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
              <div style={{ height: '2rem', fontSize: '2rem' }}>Flowers</div>
            }
          />
        );
      }
      if (current === 'adelaide') {
        return (
          <MaterialTable
            columns={columnsAdelaideShipments}
            icons={tableIcons}
            data={(() => {
              return adleaideShipments;
            })()}
            // Object.values(adleaideShipments)
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
              <div style={{ height: '2rem', fontSize: '2rem' }}>Flowers</div>
            }
          />
        );
      }

      if (current === 'perth') {
        return (
          <MaterialTable
            columns={columnsPerthShipments}
            icons={tableIcons}
            data={(() => {
              return perthShipments;
            })()}
            // Object.values(adleaideShipments)
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
              <div style={{ height: '2rem', fontSize: '2rem' }}>Flowers</div>
            }
          />
        );
      }

      if (current === 'sydney') {
        return (
          <MaterialTable
            columns={columnsSydneyShipments}
            icons={tableIcons}
            data={(() => {
              return sydneyShipments;
            })()}
            // Object.values(adleaideShipments)
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
              <div style={{ height: '2rem', fontSize: '2rem' }}>Flowers</div>
            }
          />
        );
      }

      if (current === 'melbourne') {
        return (
          <MaterialTable
            columns={columnsMelbourneShipments}
            icons={tableIcons}
            data={(() => {
              return melbourneShipments;
            })()}
            // Object.values(adleaideShipments)
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
              <div style={{ height: '2rem', fontSize: '2rem' }}>Flowers</div>
            }
          />
        );
      }

      if (current === 'brisbane') {
        return (
          <MaterialTable
            columns={columnsBrisbaneShipments}
            icons={tableIcons}
            data={(() => {
              return brisbaneShipments;
            })()}
            // Object.values(adleaideShipments)
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
              <div style={{ height: '2rem', fontSize: '2rem' }}>Flowers</div>
            }
          />
        );
      }

      ////////////////////////////////////////////////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////////////////////////////////////////////
    } else
      return (
        <ThemeProvider theme={defaultMaterialTheme}>
          <MaterialTable
            columns={columnsHardGoods}
            icons={tableIcons}
            data={hardGoodsData}
            options={options}
            title={
              <div style={{ height: '2rem', fontSize: '2rem' }}>Hard Goods</div>
            }
          />
        </ThemeProvider>
      );
  };

  const ChangeFlowerTables = () => {
    return (
      <div
        className="monthly__buttons"
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '.5rem',
          justifyContent: 'space-between',
          minHeight: '5rem',
          maxHeight: '30rem',
          margin: '.25rem',
        }}
      >
        <div
          className="monthly__buttons--1"
          style={{
            borderLeft: '1px solid white',
            borderRight: '1px solid white',
          }}
        >
          <button
            className="monthly--button"
            onClick={() => {
              setCurrent('pellets');
            }}
            style={{ width: '100%', height: '100%' }}
          >
            Pellets
          </button>
        </div>
        {/* ////// */}
        <div
          className="monthly__buttons--2"
          style={{
            borderLeft: '1px solid white',
            borderRight: '2px solid white',
          }}
        >
          <button
            className="monthly--button"
            onClick={() => {
              setCurrent('adelaide');
            }}
            style={{ width: '100%', height: '100%' }}
          >
            Adelaide Boxes
          </button>
        </div>
        {/* //// */}
        <div
          className="monthly__buttons--2"
          style={{
            borderLeft: '1px solid white',
            borderRight: '2px solid white',
          }}
        >
          <button
            className="monthly--button"
            onClick={() => {
              setCurrent('perth');
            }}
            style={{ width: '100%', height: '100%' }}
          >
            Perth Boxes
          </button>
        </div>
        {/* /// */}
        <div
          className="monthly__buttons--2"
          style={{
            borderLeft: '1px solid white',
            borderRight: '2px solid white',
          }}
        >
          <button
            className="monthly--button"
            onClick={() => {
              setCurrent('sydney');
            }}
            style={{ width: '100%', height: '100%' }}
          >
            Sydney Boxes
          </button>
        </div>
        {/* /////// */}
        <div
          className="monthly__buttons--2"
          style={{
            borderLeft: '1px solid white',
            borderRight: '2px solid white',
          }}
        >
          <button
            className="monthly--button"
            onClick={() => {
              setCurrent('melbourne');
            }}
            style={{ width: '100%', height: '100%' }}
          >
            Melbourne Boxes
          </button>
        </div>
        {/* /////// */}
        <div
          className="monthly__buttons--2"
          style={{
            borderLeft: '1px solid white',
            borderRight: '2px solid white',
          }}
        >
          <button
            className="monthly--button"
            onClick={() => {
              setCurrent('brisbane');
            }}
            style={{ width: '100%', height: '100%' }}
          >
            Brisbane Boxes
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
        <ThemeProvider theme={defaultMaterialTheme}>
          {renderData()}
        </ThemeProvider>
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

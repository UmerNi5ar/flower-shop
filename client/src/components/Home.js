import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import tableIcons from './tableIcons';
import createBrowserHistory from '../history';
import { ThemeProvider, createTheme } from '@mui/material';
import { connect } from 'react-redux';
import { deleteEntry } from '../actions';
import { MTableToolbar } from 'material-table';
// import { columns } from './HomeColumns';
import { alert } from '../utils/alert';
import AttachFileIcon from '@material-ui/icons/AttachFile';

const Home = (props) => {
  const getFiles = (items) => {
    return items.map((el) => (
      <div>
        {el.endsWith('.pdf') ? (
          <a
            href={`/files/${el}`}
            target="_blank"
            className="material_doc"
            rel="noreferrer"
            border="3"
            height="50"
            width="50"
          >
            Doc <AttachFileIcon />
          </a>
        ) : (
          <a
            target="_blank"
            href={`/files/${el}`}
            alt=""
            rel="noreferrer"
            border="3"
            height="50"
            width="50"
          >
            Image
          </a>
        )}
      </div>
    ));
  };
  const hardColumns = [
    {
      title: 'Goods Type',
      field: 'Goods Type',
      type: 'string',
      sorting: true,
      filtering: false,
      // cellStyle: { background: '#009688' },
      headerStyle: { color: '#fff' },
      render: (rowData) => (
        <div
          style={{
            background:
              rowData.goodsType === 'flowers' ? '#008000aa' : '#f90000aa',
            borderRadius: '4px',
            padding: 10,
          }}
        >
          {rowData.goodsType}
        </div>
      ),
    },

    ///////////////

    ///////////////

    ////////////

    ////

    {
      title: 'Adelaide Pallets',
      emptyValue: () => <em>Not Specified</em>,
      field: 'adelaidePallets',
      sorting: false,

      // cellStyle: { background: '#009688' },
      headerStyle: { color: '#fff' },
    },
    {
      title: 'Perth Pallets',
      emptyValue: () => <em>Not Specified</em>,
      field: 'perthPallets',
      sorting: false,

      // cellStyle: { background: '#009688' },
      headerStyle: { color: '#fff' },
    },
    {
      emptyValue: () => <em>Not Specified</em>,
      title: 'Sydney Pallets',
      field: 'sydneyPallets',
      sorting: false,

      // cellStyle: { background: '#009688' },
      headerStyle: { color: '#fff' },
    },
    {
      title: 'Melbourne Pallets',
      emptyValue: () => <em>Not Specified</em>,
      field: 'melbournePallets',
      sorting: false,

      // cellStyle: { background: '#009688' },
      headerStyle: { color: '#fff' },
    },
    {
      title: 'Brisbane Pallets',
      emptyValue: () => <em>Not Specified</em>,
      field: 'brisbonPallets',
      sorting: false,

      // cellStyle: { background: '#009688' },
      headerStyle: { color: '#fff' },
    },
    {
      title: 'Date Of Arrival',
      emptyValue: () => <em>Not Specified</em>,
      field: 'dateofArrival',
      filtering: true,
      render: (item) => {
        return (
          <div>
            {new Date(item.dateofArrival).toShortFormat().split('-').join(' ')}
          </div>
        );
      },
    },
    //////////////////////
  ];

  const [dateStart, setDateStart] = useState();
  const [additionalColumns, setAdditionalColumns] = useState([]);
  const [dateEnd, setDateEnd] = useState();
  const [tableData, setTableData] = useState([]);
  const [dateFiltering, setDateFiltering] = useState(false);

  useEffect(() => {
    let myArr = [];
    if (dateStart && dateEnd) {
      Object.values(props.state.shipments.data).map((item) =>
        item.dateofArrival >= dateStart && item.dateofArrival <= dateEnd
          ? myArr?.push(item)
          : null
      );
    } else {
      myArr = Object.values(
        props.state.shipments.data
      ); /* YourData is the array you want to display and filter */
    }
    //////////////////////////////////////////
    let entireTableData = [];
    if (myArr.length > 0) {
      let allColumns = [];

      for (const key of Object.keys(myArr)) {
        const adelaideBoxes = myArr[key].adelaideBoxes
          ? myArr[key].adelaideBoxes
          : [];
        const adelaide = myArr[key].adelaide ? myArr[key].adelaide : [];
        const perth = myArr[key].perth ? myArr[key].perth : [];
        const melbourne = myArr[key].melbourne ? myArr[key].melbourne : [];
        const sydney = myArr[key].sydney ? myArr[key].sydney : [];
        const brisbane = myArr[key].brisbane ? myArr[key].brisbane : [];
        let columnsForCurrentObject = [
          ...adelaideBoxes,
          ...brisbane,
          ...adelaide,
          ...perth,
          ...melbourne,
          ...sydney,
        ];
        allColumns = allColumns.concat(...columnsForCurrentObject);

        let nestedValues = {};
        columnsForCurrentObject.forEach((current) => {
          Object.values(current).forEach((el) => {
            if (typeof el === 'object') current = { ...current, ...el };
          });

          nestedValues = { ...nestedValues, ...current };
        });
        let finalRowObject = {
          ...myArr[key],
          ...nestedValues,
        };

        if (finalRowObject.goodsType === 'hardgoods') {
          Object.values(finalRowObject).forEach((el) => {
            if (el && typeof el === 'object') {
              Object.values(el).forEach((elmnt) => {
                finalRowObject = { ...finalRowObject, ...elmnt };
              });
            }
          });
        }
        entireTableData.push(finalRowObject);
      }

      let additionalColums = [];
      let moreColumns = [];
      allColumns.forEach((column) => {
        Object.values(column).forEach((el) => {
          if (typeof el === 'object') column = { ...el };
          moreColumns = moreColumns.concat(Object.keys(column));
        });
        // additionalColums = additionalColums.concat(Object.keys(column));
      });
      moreColumns = [...new Set(moreColumns)];
      let finalColumns = [];
      let isOneColumn = moreColumns.includes('value');
      moreColumns.forEach((el) => {
        if (el.endsWith('value') && el !== 'value') {
          // finalColumns.push({
          //   title:
          //     capitalizeFirstLetter(el.replace('value', '')) === '' ? ' ' : '',
          //   field: el,
          //   sorting: true,
          //   filtering: true,
          //   // cellStyle: { background: '#009688' },
          //   headerStyle: { color: '#fff' },
          // });
        }
      });
      setAdditionalColumns(finalColumns);
    }
    setTableData(entireTableData);
  }, [dateEnd, dateStart, props.state.shipments.data]);

  // useEffect(() => {
  //   if (tableData.length > 0) {
  //     let allColumns = [];
  //     tableData.forEach((tableRow) => {
  //       const adelaideBoxes = tableRow.adelaideBoxes
  //         ? tableRow.adelaideBoxes
  //         : [];
  //       const extraInputs = tableRow.extraInputs ? tableRow.extraInputs : [];
  //       const adelaide = tableRow.adelaide ? tableRow.adelaide : [];
  //       const perth = tableRow.perth ? tableRow.perth : [];
  //       const melbourne = tableRow.melbourne ? tableRow.melbourne : [];
  //       const sydney = tableRow.sydney ? tableRow.sydney : [];
  //       const brisbane = tableRow.brisbane ? tableRow.brisbane : [];
  //       allColumns = allColumns.concat(
  //         ...[
  //           ...adelaideBoxes,
  //           ...extraInputs,
  //           ...adelaideBoxes,
  //           ...brisbane,
  //           ...adelaide,
  //           ...perth,
  //           ...melbourne,
  //           ...sydney,
  //         ]
  //       );
  //     });
  //     let additionalColums = [];
  //     allColumns.forEach((column) => {
  //       Object.values(column).forEach((el) => {
  //         if (typeof el === 'object') column = { ...el };
  //         additionalColums = additionalColums.concat(Object.keys(column));
  //       });
  //       additionalColums = additionalColums.concat(Object.keys(column));
  //     });

  //     additionalColums = [...new Set(additionalColums)];

  //     let finalColumns = [];

  //     additionalColums.forEach((el) => {
  //       if (el.endsWith('value')) {
  //         finalColumns.push({
  //           title: capitalizeFirstLetter(el.replace('value', '')),
  //           field: el,
  //           sorting: true,
  //           filtering: true,
  //           // cellStyle: { background: '#009688' },
  //           headerStyle: { color: '#fff' },
  //         });
  //       }
  //     });

  //     setAdditionalColumns(finalColumns);
  //   }
  // }, [tableData]);

  // eslint-disable-next-line no-extend-native
  Date.prototype.toShortFormat = function () {
    let monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];

    let day = this.getDate();

    let monthIndex = this.getMonth();
    let monthName = monthNames[monthIndex];

    let year = this.getFullYear();

    return `${day}-${monthName}-${year}`;
  };

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
    actionsColumnIndex: 0,
    showTextRowsSelected: false,
    toolbar: true,
    emptyRowsWhenPaging: false,
    searchFieldStyle: {},
    // selectionProps: (rowData) => ({
    //   disabled: rowData.age == null,

    //   // color: 'primary',
    // }),

    rowStyle: (data, index) => {
      let goodsType = data.goodsType;
      if (goodsType === 'flowers') {
        return { backgroundColor: '#f5f5f5' };
      }
    },
    grouping: false,
    columnsButton: true,

    headerStyle: {
      background: '#171717',
      color: '#fff',
      fontSize: '1.2rem',
    },
  });

  const FilterByDateRange = () => {
    /* function for adding 2 textfields for date range */
    return (
      <div className="filter__container">
        <span style={{ fontWeight: 'bolder', whiteSpace: 'nowrap' }}>
          Filter :
        </span>
        <input
          value={dateStart}
          onChange={(e) => setDateStart(e.target.value)}
          type="date"
          id="date"
          label="Start Date"
          InputLabelProps={{
            shrink: true,
          }}
          style={{ margin: '10px' }}
        />
        <input
          value={dateEnd}
          label="End Date"
          onChange={(e) => setDateEnd(e.target.value)}
          type="date"
          id="date"
          InputLabelProps={{
            shrink: true,
          }}
          style={{ margin: '10px' }}
        />
        <div>
          <button
            style={{
              backgroundColor: '#dee2e6',
              border: '1px dotted green',
              padding: '.4rem',
              borderRadius: '4px',
            }}
            onClick={() => {
              setDateStart('');
              setDateEnd('');
            }}
            variant="contained"
            color="primary"
          >
            Clear
          </button>
        </div>
      </div>
    );
  };

  const allowAction = () => {
    if (props.state.auth.user.role !== 'admin') {
      alert({
        message: 'You are not authorized to perform this action!',
        type: 'info',
      });
      return false;
    }
    return true;
  };

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const defaultMaterialTheme = createTheme();
  const handleEdit = async (e, row) => {
    e.preventDefault();
    createBrowserHistory.push({
      pathname: '/newItem',
      state: { detail: { ...row, formType: 'edit', _id: row._id } },
    });
  };
  const handleView = async (e, row) => {
    e.preventDefault();
    createBrowserHistory.push({
      pathname: '/view',
      state: { detail: { ...row, formType: 'view', _id: row._id } },
    });
  };
  const handleDelete = async (e, row) => {
    e.preventDefault();

    props.deleteEntry(row);
  };
  return (
    <div className="App">
      <ThemeProvider theme={defaultMaterialTheme}>
        <MaterialTable
          actions={[
            {
              icon: tableIcons.Delete,
              tooltip: 'Delete',
              isFreeAction: false,
              onClick: (event, row) => {
                let check = allowAction();
                if (check) handleDelete(event, row);
              },
            },

            {
              icon: tableIcons.Edit,
              tooltip: 'Edit',
              isFreeAction: false,
              onClick: (event, row) => {
                let check = allowAction();

                if (check) handleEdit(event, row);
              },
            },
            {
              icon: tableIcons.Visibility,
              tooltip: 'View',
              isFreeAction: false,
              onClick: (event, row) => {
                handleView(event, row);
              },
            },

            {
              icon: tableIcons.Add,
              tooltip: 'Add',
              async: true,
              isFreeAction: true,
              onClick: () => {
                let check = allowAction();
                if (check) createBrowserHistory.push('/newItem');
              },
            },

            {
              icon: tableIcons.Group,
              tooltip: 'Group',
              isFreeAction: true,
              onClick: () => {
                setOptions({ ...options, grouping: !options.grouping });
              },
            },
            {
              icon: tableIcons.Filter,
              tooltip: 'Filter',
              async: true,
              isFreeAction: true,
              onClick: () => {
                setOptions({ ...options, filtering: !options.filtering });
              },
            },
            {
              icon: tableIcons.DateRangeIcon,
              tooltip: 'Date Range',
              async: true,
              isFreeAction: true,
              onClick: () => {
                setDateFiltering(!dateFiltering);
              },
            },
          ]}
          columns={[...hardColumns, ...additionalColumns]}
          components={{
            Toolbar: (props) => (
              <div
                className="container"
                style={{
                  fontize: '2rem',
                }}
              >
                <MTableToolbar {...props} />
                {dateFiltering ? <FilterByDateRange /> : ''}
              </div>
            ),
          }}
          icons={tableIcons}
          data={(() => {
            return tableData;
          })()}
          options={options}
          title={
            <div
              style={{
                height: '2.5rem',
                fontSize: '2.5rem',
              }}
            >
              Shipments
            </div>
          }
        />
      </ThemeProvider>
    </div>
  );
};
const mapStateToProps = (state) => {
  return { state: state };
};
export default connect(mapStateToProps, { deleteEntry })(Home);

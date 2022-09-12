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
    {
      title: 'Customs Broker',
      emptyValue: () => <em>Not Specified</em>,
      field: 'selesby',
      filtering: false,
      render: (item) => (
        <div>
          {item.selesby.endsWith('.pdf') ? (
            <a
              href={`/files/${item.selesby}`}
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
            <img
              src={`/files/${item.selesby}`}
              alt=""
              border="3"
              height="50"
              width="50"
            />
          )}
        </div>
      ),
    },
    {
      title: 'Clearance & Enhangding',
      emptyValue: () => <em>Not Specified</em>,
      field: 'goat',
      filtering: false,
      render: (item) => (
        <div>
          {item.goat.endsWith('.pdf') ? (
            <a
              href={`/files/${item.goat}`}
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
            <img
              src={`/files/${item.goat}`}
              alt=""
              border="3"
              height="50"
              width="50"
            />
          )}
        </div>
      ),
    },
    {
      title: 'Clearance & Enhangding',
      emptyValue: () => <em>Not Specified</em>,
      field: 'polarCool',
      filtering: false,
      render: (item) => (
        <div>
          {item.polarCool.endsWith('.pdf') ? (
            <a
              href={`/files/${item.polarCool}`}
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
            <img
              src={`/files/${item.polarCool}`}
              alt=""
              border="3"
              height="50"
              width="50"
            />
          )}
        </div>
      ),
    },
    {
      emptyValue: () => <em>Not Specified</em>,
      title: 'Polar Cool Invoice Fee Check',
      filtering: false,
      field: 'polarCoolInvoiceFeeCheck',
      type: 'boolean',
    },
    {
      title: 'Polar Cool Invoice',
      emptyValue: () => <em>Not Specified</em>,
      field: 'polarCoolInvoice',
      filtering: false,
      render: (item) => (
        <div>
          {item.polarCoolInvoice.endsWith('.pdf') ? (
            <a
              href={`/files/${item.polarCoolInvoice}`}
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
            <img
              src={`/files/${item.polarCoolInvoice}`}
              alt=""
              border="3"
              height="50"
              width="50"
            />
          )}
        </div>
      ),
    },
    {
      emptyValue: () => <em>Not Specified</em>,
      title: 'truckItDetails',
      field: 'truckItDetails',
      sorting: false,
      filtering: false,
      type: 'string',
      // cellStyle: { background: '#009688' },
      headerStyle: { color: '#fff' },
    },
    {
      title: 'Truck It Docs',
      emptyValue: () => <em>Not Specified</em>,
      field: 'truckItDocs',
      filtering: false,
      render: (item) => (
        <div>
          {item.truckItDocs.endsWith('.pdf') ? (
            <a
              href={`/files/${item.truckItDocs}`}
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
            <img
              src={`/files/${item.truckItDocs}`}
              alt=""
              border="3"
              height="50"
              width="50"
            />
          )}
        </div>
      ),
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
    {
      emptyValue: () => <em>Not Specified</em>,
      filtering: true,
      title: 'Warehouse Arrival Date',
      field: 'warehouseArrivalDate',
      render: (item) => {
        return (
          <div>
            {new Date(item.warehouseArrivalDate)
              .toShortFormat()
              .split('-')
              .join(' ')}
          </div>
        );
      },
    },
    {
      emptyValue: () => <em>Not Specified</em>,
      filtering: true,
      title: 'Date From Courier',
      field: 'dateFromCourier',
      render: (item) => {
        return (
          <div>
            {new Date(item.dateFromCourier)
              .toShortFormat()
              .split('-')
              .join(' ')}
          </div>
        );
      },
    },
    {
      title: 'Packing List',
      emptyValue: () => <em>Not Specified</em>,
      field: 'packingList',
      filtering: false,
      render: (item) => (
        <div>
          {item.packingList.endsWith('.pdf') ? (
            <a
              href={`/files/${item.packingList}`}
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
            <img
              src={`/files/${item.packingList}`}
              alt=""
              border="3"
              height="50"
              width="50"
            />
          )}
        </div>
      ),
    },
    {
      title: 'Airway Bill',
      emptyValue: () => <em>Not Specified</em>,
      field: 'airwayBill',
      filtering: false,
      render: (item) => (
        <div>
          {item.airwayBill.endsWith('.pdf') ? (
            <a
              href={`/files/${item.airwayBill}`}
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
            <img
              src={`/files/${item.airwayBill}`}
              alt=""
              border="3"
              height="50"
              width="50"
            />
          )}
        </div>
      ),
    },
    {
      emptyValue: () => <em>Not Specified</em>,
      title: 'Airway Bill Number',
      field: 'airwayBillNumber',
      type: 'numeric',
    },
    {
      title: 'Tracking Email',
      field: 'trackingEmail',
      emptyValue: () => <em>Not Specified</em>,

      filterPlaceholder: 'filter',
    },
    {
      title: 'Estimated Time Of Arrival Start',
      emptyValue: () => <em>Not Specified</em>,
      field: 'estimatedTimeOfArrivalStart',

      render: (item) => {
        return (
          <div>
            {new Date(item.estimatedTimeOfArrivalStart)
              .toShortFormat()
              .split('-')
              .join(' ')}
          </div>
        );
      },
    },
    {
      emptyValue: () => <em>Not Specified</em>,
      title: 'Estimated Time Of Arrival End',
      field: 'estimatedTimeOfArrivalEnd',
      filtering: true,
      render: (item) => {
        return (
          <div>
            {new Date(item.estimatedTimeOfArrivalEnd)
              .toShortFormat()
              .split('-')
              .join(' ')}
          </div>
        );
      },
    },
    {
      emptyValue: () => <em>Not Specified</em>,
      title: 'Selsey Invoice Fee Check',
      field: 'selebyInvoiceFeeCheck',
      filtering: true,
      type: 'boolean',
    },
    {
      emptyValue: () => <em>Not Specified</em>,
      title: 'Selsey Related DocumentCheck',
      field: 'SELESBYrelatedDocumentCheck',
      filtering: true,
      type: 'boolean',
    },
    {
      title: 'Selsey Invoice',
      field: 'selesbyInvoice',
      filtering: false,
      emptyValue: () => <em>Not Specified</em>,
      render: (item) => (
        <div>
          {item.selesbyInvoice.endsWith('.pdf') ? (
            <a
              href={`/files/${item.selesbyInvoice}`}
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
            <img
              src={`/files/${item.selesbyInvoice}`}
              alt=""
              border="3"
              height="50"
              width="50"
            />
          )}
        </div>
      ),
    },

    {
      emptyValue: () => <em>Not Specified</em>,
      title: 'Clearance Date',
      field: 'clearanceDate',
      render: (item) => {
        return (
          <div>
            {new Date(item.clearanceDate).toShortFormat().split('-').join(' ')}
          </div>
        );
      },
    },

    {
      emptyValue: () => <em>Not Specified</em>,
      title: 'GOATInvoiceFeeCheck',
      field: 'GOATInvoiceFeeCheck',
      type: 'boolean',
    },
    {
      title: 'Polar Cool Booking Template',
      emptyValue: () => <em>Not Specified</em>,
      field: 'polarCoolBookingTemplate',
      filtering: false,
      render: (item) => (
        <div>
          {item.polarCoolBookingTemplate.endsWith('.pdf') ? (
            <a
              href={`/files/${item.polarCoolBookingTemplate}`}
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
            <img
              src={`/files/${item.polarCoolBookingTemplate}`}
              alt=""
              border="3"
              height="50"
              width="50"
            />
          )}
        </div>
      ),
    },
    {
      title: 'Polar Cool Labels ',
      emptyValue: () => <em>Not Specified</em>,
      field: 'polarCoolLabels',
      filtering: false,
      render: (item) => (
        <div>
          {item.polarCoolLabels.endsWith('.pdf') ? (
            <a
              href={`/files/${item.polarCoolLabels}`}
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
            <img
              src={`/files/${item.polarCoolLabels}`}
              alt=""
              border="3"
              height="50"
              width="50"
            />
          )}
        </div>
      ),
    },
    {
      emptyValue: () => <em>Not Specified</em>,
      title: 'Polar Cool Invoice Fee Check',
      field: 'polarCoolInvoiceFeeCheck',
      filtering: true,
      type: 'boolean',
    },
    {
      emptyValue: () => <em>Not Specified</em>,
      title: 'G.O.A.T Related Document Check',
      field: 'GOATrelatedDocumentCheck',
      type: 'boolean',
    },

    {
      title: 'G.O.A.T Invoice',
      emptyValue: () => <em>Not Specified</em>,
      field: 'goatInvoice',
      filtering: false,
      render: (item) => (
        <div>
          {item.goatInvoice.endsWith('.pdf') ? (
            <a
              href={`/files/${item.goatInvoice}`}
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
            <img
              src={`/files/${item.goatInvoice}`}
              alt=""
              border="3"
              height="50"
              width="50"
            />
          )}
        </div>
      ),
    },
    /////////////////////////////////
    ///////////////////
    ////////

    {
      title: 'Adelide And Perth Freight Forwarder',
      emptyValue: () => <em>Not Specified</em>,
      field: 'adelideAndPerthFreightForwarder',
      filtering: false,
      render: (item) => (
        <div>
          {item.adelideAndPerthFreightForwarder.endsWith('.pdf') ? (
            <a
              href={`/files/${item.adelideAndPerthFreightForwarder}`}
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
            <img
              src={`/files/${item.adelideAndPerthFreightForwarder}`}
              alt=""
              border="3"
              height="50"
              width="50"
            />
          )}
        </div>
      ),
    },
    ///////////////

    ///////////////

    ////////////

    ////

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
      title: 'Mydney Pallets',
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
      title: 'Brisbon Pallets',
      emptyValue: () => <em>Not Specified</em>,
      field: 'brisbonPallets',
      sorting: false,

      // cellStyle: { background: '#009688' },
      headerStyle: { color: '#fff' },
    },
    //////////////////////
    // {
    //   title: 'Adelaide Boxes',
    //   emptyValue: () => <em>Not Specified</em>,
    //   field: 'adelaideBoxes',
    //   sorting: false,

    //   // cellStyle: { background: '#009688' },
    //   headerStyle: { color: '#fff' },
    // },
    {
      title: 'Perth Boxes',
      emptyValue: () => <em>Not Specified</em>,
      field: 'perthBoxes',
      sorting: false,

      // cellStyle: { background: '#009688' },
      headerStyle: { color: '#fff' },
    },
    {
      emptyValue: () => <em>Not Specified</em>,
      title: 'Sydney Boxes',
      field: 'sydneyBoxes',
      sorting: false,

      // cellStyle: { background: '#009688' },
      headerStyle: { color: '#fff' },
    },
    {
      title: 'Melbourne Boxes',
      emptyValue: () => <em>Not Specified</em>,
      field: 'melbourneBoxes',
      sorting: false,

      // cellStyle: { background: '#009688' },
      headerStyle: { color: '#fff' },
    },
    {
      emptyValue: () => <em>Not Specified</em>,
      title: 'Sydney Boxes',
      field: 'sydneyBoxes',
      sorting: false,

      // cellStyle: { background: '#009688' },
      headerStyle: { color: '#fff' },
    },
    {
      title: 'Brisbon Boxes',
      emptyValue: () => <em>Not Specified</em>,
      field: 'brisbonBoxes',
      sorting: false,

      // cellStyle: { background: '#009688' },
      headerStyle: { color: '#fff' },
    },
    {
      title: 'Adelaide Pallets',
      emptyValue: () => <em>Not Specified</em>,
      field: 'adelaidePallets',
      sorting: false,

      // cellStyle: { background: '#009688' },
      headerStyle: { color: '#fff' },
    },
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
        item.dateofArrival >= dateStart && item.dateofArrival <= dateEnd /////////////////////////////
          ? myArr?.push(item)
          : null
      );
    } else {
      myArr = Object.values(
        props.state.shipments.data
      ); /* YourData is the array you want to display and filter */
    }
    let entireTableData = [];

    if (myArr.length > 0) {
      let allColumns = [];

      for (const key of Object.keys(myArr)) {
        const adelaide = myArr[key].adelaideBoxes
          ? myArr[key].adelaideBoxes
          : [];
        const extraInputs = myArr[key].extraInputs
          ? myArr[key].extraInputs
          : [];
        let columnsForCurrentObject = [...adelaide, ...extraInputs];
        allColumns = allColumns.concat(...columnsForCurrentObject);

        let nestedValues = {};
        columnsForCurrentObject.forEach((current) => {
          nestedValues = { ...nestedValues, ...current };
        });

        let finalRowObject = {
          ...myArr[key],
          ...nestedValues,
        };

        entireTableData.push(finalRowObject);
      }

      let additionalColums = [];
      allColumns.forEach((column) => {
        additionalColums = additionalColums.concat(Object.keys(column));
      });

      additionalColums = [...new Set(additionalColums)];

      let finalColumns = [];

      additionalColums.forEach((el) => {
        if (el.endsWith('value')) {
          finalColumns.push({
            title: capitalizeFirstLetter(el.replace('value', '')),
            field: el,
            sorting: true,
            filtering: true,
            // cellStyle: { background: '#009688' },
            headerStyle: { color: '#fff' },
          });
        }
      });

      setAdditionalColumns(finalColumns);
    }
    setTableData(entireTableData);
  }, [dateEnd, dateStart, props.state.shipments.data]);

  useEffect(() => {
    if (tableData.length > 0) {
      let allColumns = [];
      tableData.forEach((tableRow) => {
        const adelaide = tableRow.adelaideBoxes ? tableRow.adelaideBoxes : [];
        const extraInputs = tableRow.extraInputs ? tableRow.extraInputs : [];
        allColumns = allColumns.concat(...[...adelaide, ...extraInputs]);
      });
      let additionalColums = [];
      allColumns.forEach((column) => {
        additionalColums = additionalColums.concat(Object.keys(column));
      });

      additionalColums = [...new Set(additionalColums)];

      let finalColumns = [];

      additionalColums.forEach((el) => {
        if (el.endsWith('value')) {
          finalColumns.push({
            title: capitalizeFirstLetter(el.replace('value', '')),
            field: el,
            sorting: true,
            filtering: true,
            // cellStyle: { background: '#009688' },
            headerStyle: { color: '#fff' },
          });
        }
      });

      setAdditionalColumns(finalColumns);
    }
  }, [tableData]);

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
          data={tableData}
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

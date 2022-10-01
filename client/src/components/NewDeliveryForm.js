import React, { useEffect, useState } from 'react';
import { createEntry } from '../actions';
import { connect } from 'react-redux';
import FormOne from './FormOne';
import FormTwo from './FormTwo';
const NewDeliveryForm = (props) => {
  const [phase, setPhase] = useState(1);
  const [files, setFiles] = useState([]);
  const [changeFiles, setChangeFiles] = useState([]);
  const [formType, setFormType] = useState(() => {
    return props.location.state ? props.location.state.detail.formType : 'new';
  });
  const [id, setId] = useState(() => {
    return props.location.state ? props.location.state.detail._id : undefined;
  });
  const [monthlyAccount, setMonthlyAccount] = useState(() => {
    let monthlyAccount = props.location.state
      ? props.location.state.detail.monthlyAccount
      : undefined;

    return monthlyAccount;
  });

  useEffect(() => {
    if (formType === 'edit' && props.location.state.detail) {
      let prop = props.location.state.detail;

      let truckItDocs = prop.truckItDocs ? prop.truckItDocs : '';
      let adelideAndPerthFreightForwarder = prop.adelideAndPerthFreightForwarder
        ? prop.adelideAndPerthFreightForwarder
        : '';
      let goat = prop.goat ? prop.goat : '';

      let polarCoolLabels = prop.polarCoolLabels ? prop.polarCoolLabels : '';
      let polarCoolInvoice = prop.polarCoolInvoice ? prop.polarCoolInvoice : '';
      let polarCoolBookingTemplate = prop.polarCoolBookingTemplate
        ? prop.polarCoolBookingTemplate
        : '';

      let airwayBill = prop.airwayBill ? prop.airwayBill : '';
      let adelaideAirwayBill = prop.adelaideAirwayBill
        ? prop.adelaideAirwayBill
        : '';
      let perthAirwayBill = prop.perthAirwayBill ? prop.perthAirwayBill : '';
      let packingList = prop.packingList ? prop.packingList : '';
      let selesby = prop.selesby ? prop.selesby : '';

      let selesbyInvoice = prop.selesbyInvoice ? prop.selesbyInvoice : '';
      let goatInvoice = prop.goatInvoice ? prop.goatInvoice : '';
      let polarCool = prop.polarCool ? prop.polarCool : '';
      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      setChangeFiles([
        adelideAndPerthFreightForwarder,
        polarCoolLabels,
        polarCoolInvoice,

        polarCoolBookingTemplate,
        airwayBill,
        perthAirwayBill,
        adelaideAirwayBill,
        packingList,

        selesby,
        selesbyInvoice,
        goatInvoice,

        truckItDocs,
        polarCool,
        goat,
      ]);
    }
  }, [formType, props.location.state]);
  const stateSetter = (value, preDefined, type) => {
    if (!value) return preDefined;
    if (type === 'date')
      return value
        .split('/')
        .map((word) => (word.length % 2 ? `0${word}` : word))
        .reverse()
        .join('-');
    if (type === 'string') {
      return value;
    }
    if (type === 'boolean') {
      return value;
    }
  };
  ///////// type Date

  const [dateState, setDateState] = useState(() => {
    if (!props.location.state || !props.location.state.detail)
      return {
        warehouseArrivalDate: undefined,
        dateofArrival: undefined,
        clearanceDate: undefined,
        estimatedTimeOfArrivalStart: undefined,
        estimatedTimeOfArrivalEnd: undefined,
      };

    let prop = props.location.state.detail;
    return {
      warehouseArrivalDate: stateSetter(
        prop.warehouseArrivalDate,
        undefined,
        'date'
      ),
      dateofArrival: stateSetter(prop.dateofArrival, undefined, 'date'),
      clearanceDate: stateSetter(prop.clearanceDate, undefined, 'date'),
      dateOfArrivalAdelaide: stateSetter(
        prop.dateOfArrivalAdelaide,
        undefined,
        'date'
      ),
      dateOfArrivalSydney: stateSetter(
        prop.dateOfArrivalSydney,
        undefined,
        'date'
      ),
      dateOfArrivalPerth: stateSetter(
        prop.dateOfArrivalPerth,
        undefined,
        'date'
      ),
      dateOfArrivalBrisbane: stateSetter(
        prop.dateOfArrivalBrisbane,
        undefined,
        'date'
      ),
      dateOfArrivalMelbourne: stateSetter(
        prop.dateOfArrivalMelbourne,
        undefined,
        'date'
      ),
      estimatedTimeOfArrivalStart: stateSetter(
        prop.estimatedTimeOfArrivalStart,
        undefined,
        'date'
      ),
      estimatedTimeOfArrivalEnd: stateSetter(
        prop.estimatedTimeOfArrivalEnd,
        undefined,
        'date'
      ),
    };
  });
  ///////// type String
  const [stringState, setStringState] = useState(() => {
    if (!props.location.state || !props.location.state.detail) {
      return {
        adelaidePallets: undefined,
        perthPallets: undefined,
        melbournePallets: undefined,
        sydneyPallets: undefined,
        brisbonPallets: undefined,
        adelaideBoxes: undefined,
        perthBoxes: undefined,
        melbourneBoxes: undefined,
        sydneyBoxes: undefined,
        brisbonBoxes: undefined,
        airwayBillNumber: '',
        adelaideAirwayBillNumber: '',
        perthAirwayBillNumber: '',
        trackingEmail: '',
        truckItDetails: '',
        goodsType: 'hardgoods',
      };
    }
    let prop = props.location.state.detail;

    return {
      extraInputs: prop.extraInputs,

      sydney: prop.sydney,
      adelaide: prop.adelaide,
      perth: prop.perth,
      brisbane: prop.brisbane,
      melbourne: prop.melbourne,

      adelaidePallets: stateSetter(prop.adelaidePallets, undefined, 'string'),
      perthPallets: stateSetter(prop.perthPallets, undefined, 'string'),
      melbournePallets: stateSetter(prop.melbournePallets, undefined, 'string'),
      sydneyPallets: stateSetter(prop.sydneyPallets, undefined, 'string'),
      brisbonPallets: stateSetter(prop.brisbonPallets, undefined, 'string'),
      perthBoxes: stateSetter(prop.perthBoxes, undefined, 'string'),

      melbourneBoxes: stateSetter(prop.melbourneBoxes, undefined, 'string'),

      sydneyBoxes: stateSetter(prop.sydneyBoxes, undefined, 'string'),

      brisbonBoxes: stateSetter(prop.brisbonBoxes, undefined, 'string'),
      boxes: stateSetter(prop.ribbons, undefined, 'string'),
      ribbons: stateSetter(prop.boxes, undefined, 'string'),

      airwayBillNumber: stateSetter(prop.airwayBillNumber, '', 'string'),
      adelaideAirwayBillNumber: stateSetter(
        prop.adelaideAirwayBillNumber,
        '',
        'string'
      ),
      perthAirwayBillNumber: stateSetter(
        prop.perthAirwayBillNumber,
        '',
        'string'
      ),
      trackingEmail: stateSetter(prop.trackingEmail, '', 'string'),
      truckItDetails: stateSetter(prop.truckItDetails, '', 'string'),
      goodsType: stateSetter(prop.goodsType, '', 'string'),
      hardGoodsCompany: stateSetter(prop.hardGoodsCompany, '', 'string'),
    };
  });

  const [booleanState, setBooleanState] = useState(() => {
    if (!props.location.state || !props.location.state.detail) {
      return {
        polarCoolInvoiceFeeCheck: false,
        GOATrelatedDocumentCheck: false,
        SELESBYrelatedDocumentCheck: false,
        GOATInvoiceFeeCheck: false,
        selebyInvoiceFeeCheck: false,
      };
    }
    let prop = props.location.state.detail;

    return {
      polarCoolInvoiceFeeCheck: stateSetter(
        prop.polarCoolInvoiceFeeCheck,
        false,
        'boolean'
      ),
      GOATrelatedDocumentCheck: stateSetter(
        prop.GOATrelatedDocumentCheck,
        false,
        'boolean'
      ),
      SELESBYrelatedDocumentCheck: stateSetter(
        prop.SELESBYrelatedDocumentCheck,
        false,
        'boolean'
      ),
      GOATInvoiceFeeCheck: stateSetter(
        prop.GOATInvoiceFeeCheck,
        false,
        'boolean'
      ),
      selebyInvoiceFeeCheck: stateSetter(
        prop.selebyInvoiceFeeCheck,
        false,
        'boolean'
      ),
    };
  });
  let detail = props.location.state;

  if (stringState.goodsType === 'hardgoods') {
    return phase === 1 ? (
      <FormOne
        props={{
          id,
          detail,
          formType,
          phase,
          setPhase,
          booleanState,
          setBooleanState,
          stringState,
          changeFiles,
          setStringState,
          dateState,
          setDateState,
          files,
          setFiles,
        }}
      />
    ) : (
      <FormTwo
        props={{
          id,
          monthlyAccount,
          detail,
          changeFiles,
          formType,
          phase,
          setPhase,
          booleanState,
          setBooleanState,
          stringState,
          setStringState,
          dateState,
          setDateState,
          files,
          setFiles,
        }}
      />
    );
  }

  if (stringState.goodsType === 'flowers') {
    return (
      <React.Fragment>
        <FormTwo
          props={{
            id,
            monthlyAccount,
            detail,
            changeFiles,
            formType,
            phase,
            setPhase,
            booleanState,
            setBooleanState,
            stringState,
            setStringState,
            dateState,
            setDateState,
            files,
            setFiles,
          }}
        />
      </React.Fragment>
    );
  } else return <div>Loading</div>;
};
const mapStateToProps = (state) => {
  return { state: state.shipments };
};
export default connect(mapStateToProps, { createEntry })(NewDeliveryForm);

import React, { useState } from 'react';
import ImageUpload from '../utils/ImageUpload';
import { editEntry } from '../actions';
import { createEntry } from '../actions';
import { connect } from 'react-redux';

const FormOne = (props) => {
  ///////////

  const {
    detail,
    changeFiles,
    formType,
    id,
    monthlyAccount,
    setPhase,
    booleanState,
    setBooleanState,
    stringState,
    setStringState,
    dateState,
    setDateState,
    files,
    setFiles,
  } = props.props;
  let optionsGoods = ['flowers', 'hardgoods'];
  let optionsCompanies = [
    'Select',
    'Brisbane',
    'Perth',
    'Melbourne',
    'Sydney',
    'Adelaide',
  ];
  const [disabled, setDisabled] = useState(false);
  ////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////
  const [inputArr, setInputArr] = useState(() => {
    let inputs = [];

    if (stringState.extraInputs) {
      stringState.extraInputs.forEach((element) => {
        Object.entries(element).forEach((el) => {
          if (
            el[0] &&
            el[0].endsWith('value') &&
            el[0].replace('value', '') !== ''
          ) {
            console.log(
              el,
              'elllllllllllllllllllllllll2222222222222222222222222'
            );
            inputs.push({ name: el[0].replace('value', ''), value: el[1] });
          }
        });
      });
    }
    let proppedArray =
      inputs.length > 0
        ? inputs
        : [
            {
              type: 'text',
              value: '',
            },
          ];
    return proppedArray;
  });

  const addInput = (e) => {
    e.preventDefault();

    setInputArr((s) => {
      return [
        ...s,
        {
          type: 'text',
          value: '',
        },
      ];
    });
  };
  const handleChangeName = (e) => {
    e.preventDefault();

    const index = e.target.id;

    setInputArr((s) => {
      const newArr = s.slice();
      newArr[index].name = `${e.target.value}`;
      newArr[index].secondName = `${e.target.value}`;
      return newArr;
    });
  };
  const handleChangeValue = (e) => {
    e.preventDefault();
    const index = e.target.id;
    setInputArr((s) => {
      const newArr = s.slice();
      let name = e.target.name;
      // newArr[index].val = e.target.value;
      newArr[index] = {
        [`${newArr[index].secondName}value`]: e.target.value,
        name: newArr[index].name,
        secondName: newArr[index].secondName,
      };
      return newArr;
    });
  };

  ////////////////
  return (
    <div className="form__container">
      <form action="#" id="newShipment" className="form">
        <div className="u-margin-bottom-medium arrow__container">
          <h2 className="heading-secondary">
            {formType === 'new' ? 'Create new Entry' : 'Edit Current Entry'}
          </h2>
        </div>
        <div className="form__group">
          <label htmlFor="goods">Shipment</label>

          <select
            id="goods"
            name="goods"
            defaultValue={stringState.goodsType}
            onChange={(e) => {
              //
              setStringState({ ...stringState, goodsType: e.target.value });
            }}
          >
            {optionsGoods.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="form__group">
          <p>Customs Broker</p>
          {formType !== 'view' ? (
            <ImageUpload
              key={'selesby'}
              givenName={detail ? detail.detail.selesby : undefined}
              name={'selesby'}
              files={files}
              setFiles={setFiles}
            />
          ) : (
            <div>
              {detail.detail.selesby.map((i) => {
                return (
                  <img
                    className="view__image"
                    src={`/files/${i}`}
                    alt="Not Specified"
                  ></img>
                );
              })}
            </div>
          )}
        </div>

        {stringState.goodsType === 'flowers' ? (
          <React.Fragment>
            {' '}
            <div className="form__group">
              <p>Clearance</p>
              {formType !== 'view' ? (
                <ImageUpload
                  givenName={detail ? detail.detail.goat : undefined}
                  key={'goat'}
                  name={'goat'}
                  files={files}
                  setFiles={setFiles}
                />
              ) : (
                <div>
                  {detail.detail.goat.map((i) => {
                    return (
                      <img
                        className="view__image"
                        src={`/files/${i}`}
                        alt="Not Specified"
                      ></img>
                    );
                  })}
                </div>
              )}
            </div>
            <div className="form__group">
              <p>Trucking Company</p>
              {formType !== 'view' ? (
                <ImageUpload
                  givenName={detail ? detail.detail.polarCool : undefined}
                  key={'polarCool'}
                  name={'polarCool'}
                  files={files}
                  setFiles={setFiles}
                />
              ) : (
                <div>
                  {detail.detail.polarCool.map((i) => {
                    return (
                      <img
                        className="view__image"
                        src={`/files/${i}`}
                        alt="Not Specified"
                      ></img>
                    );
                  })}
                </div>
              )}
            </div>
          </React.Fragment>
        ) : (
          <React.Fragment>
            {' '}
            <div className="form__group">
              <label htmlFor="TruckItDetails" className="form__label">
                Trucking details
              </label>
              <input
                type="text"
                value={stringState.truckItDetails}
                autoComplete="off"
                onChange={(e) => {
                  setStringState({
                    ...stringState,
                    truckItDetails: e.target.value,
                  });
                }}
                className="form__input"
                id="TruckItDetails"
              ></input>
            </div>
            <div className="form__group">
              <p>Trucking Docs</p>
              {formType !== 'view' ? (
                <ImageUpload
                  givenName={detail ? detail.detail.truckItDocs : undefined}
                  key={'truckItDocs'}
                  name={'truckItDocs'}
                  files={files}
                  setFiles={setFiles}
                />
              ) : (
                <div>
                  {detail.detail.truckItDocs.map((i) => {
                    return (
                      <img
                        className="view__image"
                        src={`/files/${i}`}
                        alt="Not Specified"
                      ></img>
                    );
                  })}
                </div>
              )}
            </div>
          </React.Fragment>
        )}
        <div className="form__group">
          <label htmlFor="dateofArrival">Date of Arrival</label>
          <input
            type="date"
            className="form__input--date"
            id="dateofArrival"
            name="dateofArrival"
            value={dateState.dateofArrival}
            onChange={(e) => {
              setDateState({ ...dateState, dateofArrival: e.target.value });
            }}
          />
        </div>
        <div className="form__group">
          <label htmlFor="warehouseArrivalDate">Warehouse Arrival Date</label>
          <input
            className="form__input--date"
            type="date"
            id="warehouseArrivalDate"
            name="warehouseArrivalDate"
            value={dateState.warehouseArrivalDate}
            onChange={(e) => {
              setDateState({
                ...dateState,
                warehouseArrivalDate: e.target.value,
              });
            }}
          />
        </div>
        <div className="form__group">
          <label htmlFor="goods">Company : </label>
          <select
            id="goods"
            name="goods"
            defaultValue={stringState.hardGoodsCompany}
            onChange={(e) => {
              //
              setStringState({
                ...stringState,
                hardGoodsCompany: e.target.value,
              });
            }}
          >
            {optionsCompanies.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        {stringState.goodsType === 'hardgoods' ? (
          <React.Fragment>
            <div className="form__group form__group--double">
              <span style={{ fontSize: '1.5rem' }}>Relevant Data:</span>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: 'max-content',
                }}
              >
                <button
                  style={{
                    fontSize: '1.5rem',
                    alignSelf: 'end',
                    color: 'black',
                    padding: '1rem',
                  }}
                  onClick={(e) => addInput(e)}
                >
                  <b>+</b> Add Field
                </button>
                {inputArr.map((item, i) => {
                  return (
                    <div className="form__group--adelaide">
                      <label>Field</label>
                      <input
                        type="text"
                        className="form__input"
                        onChange={handleChangeName}
                        value={item.name}
                        id={i}
                        size="40"
                      />
                      <label>Value</label>
                      &nbsp; &nbsp;
                      <b>{` : `}</b>
                      <input
                        type="number"
                        className="form__input"
                        onChange={handleChangeValue}
                        value={item.value}
                        id={i}
                        size="40"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
            {formType !== 'view' ? (
              <div className="panel bw">
                <button
                  className="btn"
                  disabled={disabled}
                  style={{ fontSize: '1.5rem' }}
                  onClick={async (e) => {
                    e.preventDefault();
                    /////////////////// Date
                    let inputAr = inputArr;
                    inputAr = inputAr.map((el) => {
                      if (!el.value) return el;
                      let name = el.name;
                      let value = el.value;
                      return (el = { ...el, [`${name}value`]: value });
                    });

                    let estimatedTimeOfArrivalStart =
                      dateState.estimatedTimeOfArrivalStart;
                    let estimatedTimeOfArrivalEnd =
                      dateState.estimatedTimeOfArrivalEnd;
                    let warehouseArrivalDate = dateState.warehouseArrivalDate;
                    let clearanceDate = dateState.warehouseArrivalDate;
                    let dateofArrival = dateState.dateofArrival;
                    let dateFromCourier = dateState.dateFromCourier;
                    ///////////////// String Type
                    let goodsType = stringState.goodsType;
                    let hardGoodsCompany = stringState.hardGoodsCompany;
                    let adelaidePallets = stringState.adelaidePallets * 1;
                    let perthPallets = stringState.perthPallets * 1;
                    let melbournePallets = stringState.melbournePallets * 1;
                    let sydneyPallets = stringState.sydneyPallets * 1;
                    let brisbonPellets = stringState.brisbonPellets * 1;
                    let adelaideBoxes = stringState.adelaideBoxes * 1;
                    let perthBoxes = stringState.perthBoxes * 1;
                    let melbourneBoxes = stringState.melbourneBoxes * 1;
                    let sydneyBoxes = stringState.sydneyBoxes * 1;
                    let brisbonBoxes = stringState.brisbonBoxes * 1;
                    let boxes = stringState.boxes * 1;
                    let ribbons = stringState.ribbons * 1;
                    let airwayBillNumber = stringState.airwayBillNumber;
                    let trackingEmail = stringState.trackingEmail;
                    let truckItDetails = stringState.truckItDetails;
                    ////////////////// Boolean Type
                    let polarCoolInvoiceFeeCheck =
                      booleanState.polarCoolInvoiceFeeCheck;
                    let GOATInvoiceFeeCheck = booleanState.GOATInvoiceFeeCheck;
                    let selebyInvoiceFeeCheck =
                      booleanState.selebyInvoiceFeeCheck;
                    let SELESBYrelatedDocumentCheck =
                      booleanState.SELESBYrelatedDocumentCheck;
                    let GOATrelatedDocumentCheck =
                      booleanState.GOATrelatedDocumentCheck;
                    let extraInputs = inputAr;

                    let data = {
                      hardGoodsCompany,
                      boxes,
                      ribbons,
                      goodsType,
                      adelaidePallets,
                      perthPallets,
                      melbournePallets,
                      sydneyPallets,
                      adelaideBoxes,
                      perthBoxes,
                      melbourneBoxes,
                      sydneyBoxes,
                      GOATInvoiceFeeCheck,
                      clearanceDate,
                      selebyInvoiceFeeCheck,
                      dateofArrival,
                      dateFromCourier,
                      estimatedTimeOfArrivalStart,
                      trackingEmail,
                      airwayBillNumber,
                      estimatedTimeOfArrivalEnd,
                      warehouseArrivalDate,
                      truckItDetails,
                      polarCoolInvoiceFeeCheck,
                      files,
                      changeFiles,
                      GOATrelatedDocumentCheck,
                      SELESBYrelatedDocumentCheck,
                      brisbonBoxes,
                      brisbonPellets,
                      extraInputs,
                    };
                    if (formType === 'new') {
                      await props.createEntry(data);
                    }
                    if (formType === 'edit') {
                      data = { ...data, id, monthlyAccount };
                      await props.editEntry(data);
                    }
                  }}
                >
                  Submit
                </button>
              </div>
            ) : (
              ''
            )}
          </React.Fragment>
        ) : (
          <div>
            <div className="panel bw">
              <button
                className="btn"
                style={{ fontSize: '1.5rem' }}
                onClick={(e) => {
                  e.preventDefault();
                  setPhase(2);
                }}
              >
                Next &rarr;
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};
export default connect(null, { editEntry, createEntry })(FormOne);

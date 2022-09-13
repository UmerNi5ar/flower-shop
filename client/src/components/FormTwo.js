import React, { useState } from 'react';
import ImageUpload from '../utils/ImageUpload';
import { editEntry } from '../actions';
import { connect } from 'react-redux';
import { createEntry } from '../actions';
import { alert } from '../utils/alert/index';

const FormTwo = (props) => {
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
  const [disabled, setDisabled] = useState(false);

  const [inputArr, setInputArr] = useState(() => {
    let inputs = [];

    if (stringState.adelaideBoxes) {
      stringState.adelaideBoxes.forEach((element) => {
        Object.entries(element).forEach((el) => {
          if (el[0] && el[0].endsWith('value')) {
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
      let proppedArray = stringState.extraInputs
        ? stringState.extraInputs
        : [
            {
              type: 'text',
              value: '',
            },
          ];
      return [...s, ...proppedArray];
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

  return (
    <div className="form__container">
      <form action="" id="newShipment" className="form">
        <div
          className="u-margin-bottom-medium arrow__container"
          onClick={(e) => {
            e.preventDefault();
            setPhase(1);
          }}
        >
          <div className="arrowed">
            <div className="arrow-2"></div>
          </div>

          <h2 className="heading-secondary">
            {formType === 'new' ? 'Create new Entry' : 'Edit Current Entry'}
          </h2>
        </div>
        <div className="form__group">
          <label htmlFor="dateFromCourier">
            Date Of Flower Shipment Arrival:
          </label>
          <input
            className="form__input--date"
            type="date"
            id="dateFromCourier"
            name="dateFromCourier"
            value={dateState.dateFromCourier}
            onChange={(e) => {
              setDateState({ ...dateState, dateFromCourier: e.target.value });
            }}
          />
        </div>
        <div className="form__group">
          <p>Packing List</p>
          <ImageUpload
            givenName={detail ? detail.detail.packingList : undefined}
            key={'packingList'}
            name="packingList"
            files={files}
            setFiles={setFiles}
          />
        </div>
        <div className="form__group">
          <p>Airway Bill</p>
          <ImageUpload
            givenName={detail ? detail.detail.airwayBill : undefined}
            key={'airwayBill'}
            name="airwayBill"
            files={files}
            setFiles={setFiles}
          />
        </div>

        <div className="form__group">
          <label htmlFor="airwayBillNumber" className="form__label">
            Airway Bill Number
          </label>
          <input
            required
            type="number"
            value={stringState.airwayBillNumber}
            onChange={(e) => {
              setStringState({
                ...stringState,
                airwayBillNumber: e.target.value,
              });
            }}
            autoComplete="off"
            className="form__input"
            id="airwayBillNumber"
          ></input>
        </div>

        <div className="form__group form__group--double">
          <h3>Estimated Time Of Arrival: </h3>
          <div>
            <label htmlFor="estimatedTimeOfArrivalStart">Start</label>

            <input
              type="date"
              className="form__input--date"
              id="estimatedTimeOfArrivalStart"
              name="estimatedTimeOfArrivalStart"
              value={dateState.estimatedTimeOfArrivalStart}
              onChange={(e) => {
                setDateState({
                  ...dateState,
                  estimatedTimeOfArrivalStart: e.target.value,
                });
              }}
            />
            <label htmlFor="estimatedTimeOfArrivalEnd">End</label>

            <input
              type="date"
              className="form__input--date"
              id="estimatedTimeOfArrivalEnd"
              name="estimatedTimeOfArrivalEnd"
              value={dateState.estimatedTimeOfArrivalEnd}
              onChange={(e) => {
                setDateState({
                  ...dateState,
                  estimatedTimeOfArrivalEnd: e.target.value,
                });
              }}
            />
          </div>
        </div>
        <div className="form__group">
          <p>Clearance Company </p>
          <ImageUpload
            givenName={detail ? detail.detail.selesbyInvoice : undefined}
            key={'selesbyInvoice'}
            name="selesbyInvoice"
            files={files}
            setFiles={setFiles}
          />
        </div>
        <div className="form__group">
          <label htmlFor="selebyInvoiceFeeCheck">Doc check</label>
          <input
            className="form__input--checkbox"
            type="checkbox"
            key={'selebyInvoiceFeeCheck'}
            id="selebyInvoiceFeeCheck"
            name="selebyInvoiceFeeCheck"
            checked={booleanState.selebyInvoiceFeeCheck}
            onChange={(e) => {
              setBooleanState({
                ...booleanState,
                selebyInvoiceFeeCheck: !booleanState.selebyInvoiceFeeCheck,
              });
            }}
          />
        </div>
        {booleanState.selebyInvoiceFeeCheck ? (
          <React.Fragment>
            <div className="form__group">
              <label htmlFor="SELESBYrelatedDocumentCheck">
                Related Documents Check
              </label>
              <input
                className="form__input--checkbox"
                type="checkbox"
                key={'SELESBYrelatedDocumentCheck'}
                id="SELESBYrelatedDocumentCheck"
                name="SELESBYrelatedDocumentCheck"
                checked={booleanState.SELESBYrelatedDocumentCheck}
                onChange={(e) => {
                  setBooleanState({
                    ...booleanState,
                    SELESBYrelatedDocumentCheck:
                      !booleanState.SELESBYrelatedDocumentCheck,
                  });
                }}
              />
            </div>
          </React.Fragment>
        ) : (
          <React.Fragment></React.Fragment>
        )}
        <div className="form__group">
          <label htmlFor="clearanceDate">Clearance Date</label>
          <input
            type="date"
            className="form__input--date"
            id="clearanceDate"
            name="clearanceDate"
            value={dateState.clearanceDate}
            onChange={(e) => {
              setDateState({ ...dateState, clearanceDate: e.target.value });
            }}
          />
        </div>
        <div className="form__group">
          <p>Trucking Company</p>
          <ImageUpload
            givenName={detail ? detail.detail.goatInvoice : undefined}
            key={'goatInvoice'}
            name="goatInvoice"
            files={files}
            setFiles={setFiles}
          />
        </div>
        <div className="form__group">
          <label htmlFor="GOATInvoiceFeeCheck">Doc check</label>
          <br></br>
          <input
            className="form__input--checkbox"
            type="checkbox"
            key={'GOATInvoiceFeeCheck'}
            id="GOATInvoiceFeeCheck"
            name="GOATInvoiceFeeCheck"
            checked={booleanState.GOATInvoiceFeeCheck}
            onChange={(e) => {
              setBooleanState({
                ...booleanState,
                GOATInvoiceFeeCheck: !booleanState.GOATInvoiceFeeCheck,
              });
            }}
          />
        </div>
        {booleanState.GOATInvoiceFeeCheck ? (
          <React.Fragment>
            <div className="form__group">
              <label htmlFor="GOATrelatedDocumentCheck">
                Related Documents Check
              </label>
              <input
                className="form__input--checkbox"
                type="checkbox"
                key={'GOATrelatedDocumentCheck'}
                id="GOATrelatedDocumentCheck"
                name="GOATrelatedDocumentCheck"
                checked={booleanState.GOATrelatedDocumentCheck}
                onChange={(e) => {
                  setBooleanState({
                    ...booleanState,
                    GOATrelatedDocumentCheck:
                      !booleanState.GOATrelatedDocumentCheck,
                  });
                }}
              />
            </div>
          </React.Fragment>
        ) : (
          <React.Fragment></React.Fragment>
        )}

        <div className="form__group">
          <p>Polar Cool Booking Template</p>
          <ImageUpload
            givenName={
              detail ? detail.detail.polarCoolBookingTemplate : undefined
            }
            key={'polarCoolBookingTemplate'}
            name="polarCoolBookingTemplate"
            files={files}
            setFiles={setFiles}
          />
        </div>
        <div className="form__group">
          <p>Polar Cool Labels</p>
          <ImageUpload
            givenName={detail ? detail.detail.polarCoolLabels : undefined}
            key={'polarCoolLabels'}
            name="polarCoolLabels"
            files={files}
            setFiles={setFiles}
          />
        </div>

        <div className="form__group">
          <label htmlFor="polarCoolInvoiceFeeCheck">
            Polar Cool Invoice Fee Check
          </label>
          <input
            className="form__input--checkbox"
            key={'polarCoolInvoiceFeeCheck'}
            type="checkbox"
            id="polarCoolInvoiceFeeCheck"
            name="polarCoolInvoiceFeeCheck"
            checked={booleanState.polarCoolInvoiceFeeCheck}
            onChange={(e) => {
              setBooleanState({
                ...booleanState,
                polarCoolInvoiceFeeCheck:
                  !booleanState.polarCoolInvoiceFeeCheck,
              });
            }}
          />
        </div>
        {booleanState.polarCoolInvoiceFeeCheck ? (
          <React.Fragment>
            <div className="form__group">
              <p>Polar Cool Invoice</p>
              <ImageUpload
                givenName={detail ? detail.detail.polarCoolInvoice : undefined}
                key={'polarCoolInvoice'}
                name="polarCoolInvoice"
                files={files}
                setFiles={setFiles}
              />
            </div>
          </React.Fragment>
        ) : (
          <React.Fragment></React.Fragment>
        )}

        <div className="form__group">
          <p>Adelide And Perth Freight Forwarder</p>
          <ImageUpload
            givenName={
              detail ? detail.detail.adelideAndPerthFreightForwarder : undefined
            }
            key={'adelideAndPerthFreightForwarder'}
            name="adelideAndPerthFreightForwarder"
            files={files}
            setFiles={setFiles}
          />
        </div>
        {/* ///////////////////////////////////////////////////////////////////---------------------------------------------- */}

        <div className="form__group">
          <p>Adelaide FW Doc Upload</p>
          <ImageUpload
            givenName={detail ? detail.detail.adelaideAirwayBill : undefined}
            key={'adelaideAirwayBill'}
            name="adelaideAirwayBill"
            files={files}
            setFiles={setFiles}
          />
        </div>

        <div className="form__group">
          <label htmlFor="adelaideAirwayBillNumber" className="form__label">
            Adelaide Airway bill number:
          </label>
          <input
            required
            type="number"
            value={stringState.adelaideAirwayBillNumber}
            onChange={(e) => {
              setStringState({
                ...stringState,
                adelaideAirwayBillNumber: e.target.value,
              });
            }}
            autoComplete="off"
            className="form__input"
            id="adelaideAirwayBillNumber"
          ></input>
        </div>

        <div className="form__group">
          <p>Perth FW Doc upload</p>
          <ImageUpload
            givenName={detail ? detail.detail.perthAirwayBill : undefined}
            key={'perthAirwayBill'}
            name="perthAirwayBill"
            files={files}
            setFiles={setFiles}
          />
        </div>

        <div className="form__group">
          <label htmlFor="perthAirwayBillNumber" className="form__label">
            Perth Airway bill number:
          </label>
          <input
            required
            type="number"
            value={stringState.perthAirwayBillNumber}
            onChange={(e) => {
              setStringState({
                ...stringState,
                perthAirwayBillNumber: e.target.value,
              });
            }}
            autoComplete="off"
            className="form__input"
            id="perthAirwayBillNumber"
          ></input>
        </div>

        {/* //////////////////////////////////////////////////////////////// */}
        <div className="form__group form__group--double">
          <h3>Adelaide :</h3>
          <div>
            <div className="formTwo__adelaideSpecial">
              <span style={{ fontSize: '1.2rem' }}>Data:</span>

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
                      &nbsp;
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
          </div>
        </div>

        <div className="form__group form__group--double">
          <h3>Perth :</h3>
          <div>
            <label htmlFor="perthPallets">Pellets</label>
            <input
              className="form__input"
              autoComplete="off"
              id="perthPallets"
              type="number"
              name="perthPallets"
              defaultValue={stringState.perthPallets}
              onChange={(e) => {
                //
                setStringState({
                  ...stringState,
                  perthPallets: e.target.value,
                });
              }}
            ></input>

            <label htmlFor="perthBoxes">Boxes</label>
            <input
              className="form__input"
              autoComplete="off"
              id="perthBoxes"
              type="number"
              name="perthBoxes"
              defaultValue={stringState.perthBoxes}
              onChange={(e) => {
                //

                setStringState({ ...stringState, perthBoxes: e.target.value });
              }}
            ></input>
          </div>
        </div>

        <div className="form__group form__group--double">
          <h3>Melbourne :</h3>
          <div>
            <label htmlFor="melbournePallets">Pellets: </label>
            <input
              className="form__input"
              autoComplete="off"
              id="melbournePallets"
              name="melbournePallets"
              type="number"
              defaultValue={stringState.melbournePallets}
              onChange={(e) => {
                setStringState({
                  ...stringState,
                  melbournePallets: e.target.value,
                });
              }}
            ></input>

            <label htmlFor="melbourneBoxes">Boxes: </label>
            <input
              className="form__input"
              autoComplete="off"
              id="melbourneBoxes"
              name="melbourneBoxes"
              type="number"
              defaultValue={stringState.melbourneBoxes}
              onChange={(e) => {
                setStringState({
                  ...stringState,
                  melbourneBoxes: e.target.value,
                });
              }}
            ></input>
          </div>
        </div>

        <div className="form__group form__group--double">
          <h3>Sydney :</h3>
          <div>
            <label htmlFor="sydneyPallets">Pellets: </label>
            <input
              className="form__input"
              autoComplete="off"
              id="sydneyPallets"
              name="sydneyPallets"
              type="number"
              defaultValue={stringState.sydneyPallets}
              onChange={(e) => {
                //
                setStringState({
                  ...stringState,
                  sydneyPallets: e.target.value,
                });
              }}
            ></input>

            <label htmlFor="sydneyBoxes">Boxes: </label>
            <input
              className="form__input"
              autoComplete="off"
              id="sydneyBoxes"
              name="sydneyBoxes"
              type="number"
              defaultValue={stringState.sydneyBoxes}
              onChange={(e) => {
                //
                setStringState({ ...stringState, sydneyBoxes: e.target.value });
              }}
            ></input>
          </div>
        </div>
        <div className="form__group form__group--double">
          <h3>Brisbon :</h3>
          <div>
            <label htmlFor="brisbonPellets">Pellets: </label>
            <input
              className="form__input"
              autoComplete="off"
              id="brisbonPellets"
              name="brisbonPellets"
              type="number"
              defaultValue={stringState.brisbonPallets}
              onChange={(e) => {
                //
                setStringState({
                  ...stringState,
                  brisbonPallets: e.target.value,
                });
              }}
            ></input>

            <label htmlFor="BrisbonBoxes">Boxes: </label>
            <input
              className="form__input"
              type="number"
              autoComplete="off"
              id="BrisbonBoxes"
              name="BrisbonBoxes"
              defaultValue={stringState.brisbonBoxes}
              onChange={(e) => {
                //
                setStringState({
                  ...stringState,
                  brisbonBoxes: e.target.value,
                });
              }}
            ></input>
          </div>
        </div>
        <div className="panel bw">
          <button
            className="btn"
            disabled={disabled}
            autoComplete="off"
            style={{ fontSize: '1.5rem' }}
            onClick={async (e) => {
              e.preventDefault();
              /////////////////// Date
              if (
                !stringState.airwayBillNumber ||
                stringState.airwayBillNumber === ''
              ) {
                alert({
                  message: 'Please Provide Airway Bill Number',
                  type: 'error',
                });
                return;
              }
              setDisabled(true);

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
              let adelaidePallets = stringState.adelaidePallets;
              let perthPallets = stringState.perthPallets;
              let melbournePallets = stringState.melbournePallets;
              let sydneyPallets = stringState.sydneyPallets;
              let brisbonPallets = stringState.brisbonPallets;
              let perthBoxes = stringState.perthBoxes;
              let brisbonBoxes = stringState.brisbonBoxes;
              let melbourneBoxes = stringState.melbourneBoxes;
              let sydneyBoxes = stringState.sydneyBoxes;
              let airwayBillNumber = stringState.airwayBillNumber;
              let perthAirwayBillNumber = stringState.perthAirwayBillNumber;
              let adelaideAirwayBillNumber =
                stringState.adelaideAirwayBillNumber;
              let trackingEmail = stringState.trackingEmail;
              let truckItDetails = stringState.truckItDetails;

              ////////////////// Boolean Type
              let polarCoolInvoiceFeeCheck =
                booleanState.polarCoolInvoiceFeeCheck;
              let GOATInvoiceFeeCheck = booleanState.GOATInvoiceFeeCheck;
              let selebyInvoiceFeeCheck = booleanState.selebyInvoiceFeeCheck;
              let SELESBYrelatedDocumentCheck =
                booleanState.SELESBYrelatedDocumentCheck;
              let GOATrelatedDocumentCheck =
                booleanState.GOATrelatedDocumentCheck;
              let adelaideBoxes = inputArr;

              let data = {
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
                brisbonPallets,
                perthAirwayBillNumber,
                adelaideAirwayBillNumber,
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
      </form>
    </div>
  );
};

export default connect(null, { editEntry, createEntry })(FormTwo);

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

  let optionsAdelaidePallets = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  let optionsPerthPallets = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  let optionsMelbournePallets = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  let optionsSydneyPallets = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

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
          <label htmlFor="dateFromCourier">Date from Courier</label>
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
            value={stringState.airwayBillNumber}
            onChange={(e) => {
              setStringState({
                ...stringState,
                airwayBillNumber: e.target.value,
              });
            }}
            type="text"
            className="form__input"
            id="airwayBillNumber"
          ></input>
        </div>

        <div className="form__group">
          <label htmlFor="trackingEmail" className="form__label">
            Tracking Email
          </label>
          <input
            value={stringState.trackingEmail}
            onChange={(e) => {
              setStringState({ ...stringState, trackingEmail: e.target.value });
            }}
            type="email"
            className="form__input"
            id="trackingEmail"
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
          <label htmlFor="selebyInvoiceFeeCheck">
            Seleby Invoice Fee Check
          </label>
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
            <div className="form__group">
              <p>Selesby Invoice</p>
              <ImageUpload
                givenName={detail ? detail.detail.selesbyInvoice : undefined}
                key={'selesbyInvoice'}
                name="selesbyInvoice"
                files={files}
                setFiles={setFiles}
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
          <label htmlFor="GOATInvoiceFeeCheck">G.O.A.T Invoice Fee Check</label>
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
            <div className="form__group">
              <p>G.O.A.T Invoice</p>
              <ImageUpload
                givenName={detail ? detail.detail.goatInvoice : undefined}
                key={'goatInvoice'}
                name="goatInvoice"
                files={files}
                setFiles={setFiles}
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
        <div className="form__group form__group--double">
          <h3>Adelaide :</h3>
          <div>
            <label htmlFor="AdelaidePallets">Pellets</label>
            <select
              id="AdelaidePallets"
              name="AdelaidePallets"
              defaultValue={stringState.adelaidePallets}
              onChange={(e) => {
                //
                setStringState({
                  ...stringState,
                  adelaidePallets: e.target.value,
                });
              }}
            >
              {' '}
              <option selected>Select</option>
              {optionsAdelaidePallets.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <label htmlFor="AdelaideBoxes"> Boxes</label>
            <select
              id="AdelaideBoxes"
              name="AdelaideBoxes"
              defaultValue={stringState.adelaideBoxes}
              onChange={(e) => {
                //
                setStringState({
                  ...stringState,
                  adelaideBoxes: e.target.value,
                });
              }}
            >
              <option selected>Select</option>
              {optionsAdelaidePallets.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form__group form__group--double">
          <h3>Perth :</h3>
          <div>
            <label htmlFor="perthPallets">Pellets</label>
            <select
              id="perthPallets"
              name="perthPallets"
              defaultValue={stringState.perthPallets}
              onChange={(e) => {
                //
                setStringState({
                  ...stringState,
                  perthPallets: e.target.value,
                });
              }}
            >
              {' '}
              <option selected>Select</option>
              {optionsPerthPallets.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>

            <label htmlFor="perthBoxes">Boxes</label>
            <select
              id="perthBoxes"
              name="perthBoxes"
              defaultValue={stringState.perthBoxes}
              onChange={(e) => {
                //

                setStringState({ ...stringState, perthBoxes: e.target.value });
              }}
            >
              {' '}
              <option selected>Select</option>
              {optionsPerthPallets.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form__group form__group--double">
          <h3>Melbourne :</h3>
          <div>
            <label htmlFor="melbournePallets">Pellets: </label>
            <select
              id="melbournePallets"
              name="melbournePallets"
              defaultValue={stringState.melbournePallets}
              onChange={(e) => {
                setStringState({
                  ...stringState,
                  melbournePallets: e.target.value,
                });
              }}
            >
              {' '}
              <option selected>Select</option>
              {optionsMelbournePallets.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>

            <label htmlFor="melbourneBoxes">Boxes: </label>
            <select
              id="melbourneBoxes"
              name="melbourneBoxes"
              defaultValue={stringState.melbourneBoxes}
              onChange={(e) => {
                setStringState({
                  ...stringState,
                  melbourneBoxes: e.target.value,
                });
              }}
            >
              {' '}
              <option selected>Select</option>
              {optionsMelbournePallets.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form__group form__group--double">
          <h3>Sydney :</h3>
          <div>
            <label htmlFor="sydneyPallets">Pellets: </label>
            <select
              id="sydneyPallets"
              name="sydneyPallets"
              defaultValue={stringState.sydneyPallets}
              onChange={(e) => {
                //
                setStringState({
                  ...stringState,
                  sydneyPallets: e.target.value,
                });
              }}
            >
              <option selected>Select</option>

              {optionsSydneyPallets.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>

            <label htmlFor="sydneyBoxes">Boxes: </label>
            <select
              id="sydneyBoxes"
              name="sydneyBoxes"
              defaultValue={stringState.sydneyBoxes}
              onChange={(e) => {
                //
                setStringState({ ...stringState, sydneyBoxes: e.target.value });
              }}
            >
              <option selected>Select</option>
              {optionsSydneyPallets.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="panel bw">
          <button
            className="btn"
            disabled={disabled}
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
              let adelaideBoxes = stringState.adelaideBoxes;
              let perthBoxes = stringState.perthBoxes;
              let melbourneBoxes = stringState.melbourneBoxes;
              let sydneyBoxes = stringState.sydneyBoxes;
              let airwayBillNumber = stringState.airwayBillNumber;
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

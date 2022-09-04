import React from 'react';
import ImageUpload from '../utils/ImageUpload';

const FormOne = ({
  props: {
    formType,
    detail,
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
  },
}) => {
  let optionsGoods = ['flowers', 'hardgoods'];
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
          <p>Selesby</p>
          <ImageUpload
            key={'selesby'}
            givenName={detail ? detail.detail.selesby : undefined}
            name={'selesby'}
            files={files}
            setFiles={setFiles}
          />
        </div>

        {stringState.goodsType === 'flowers' ? (
          <React.Fragment>
            {' '}
            <div className="form__group">
              <p>G.O.A.T</p>
              <ImageUpload
                givenName={detail ? detail.detail.goat : undefined}
                key={'goat'}
                name={'goat'}
                files={files}
                setFiles={setFiles}
              />
            </div>
            <div className="form__group">
              <p>Polar Cool</p>
              <ImageUpload
                givenName={detail ? detail.detail.polarCool : undefined}
                key={'polarCool'}
                name={'polarCool'}
                files={files}
                setFiles={setFiles}
              />
            </div>
          </React.Fragment>
        ) : (
          <React.Fragment>
            {' '}
            <div className="form__group">
              <label htmlFor="TruckItDetails" className="form__label">
                Truck It Details
              </label>
              <input
                type="text"
                value={stringState.truckItDetails}
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
              <p>Truck It Docs</p>
              <ImageUpload
                givenName={detail ? detail.detail.truckItDocs : undefined}
                key={'truckItDocs'}
                name={'truckItDocs'}
                files={files}
                setFiles={setFiles}
              />
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
      </form>
    </div>
  );
};

export default FormOne;

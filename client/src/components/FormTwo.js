import React, { useState } from 'react';
import ImageUpload from '../utils/ImageUpload';
import { editEntry } from '../actions';
import { connect } from 'react-redux';
import { createEntry } from '../actions';
import { alert } from '../utils/alert/index';
import emailjs from '@emailjs/browser';

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
const [emails , setEmails] = useState({adelaide: '' , perth: '' , melbourne: '' , sydney: '', brisbane: ''})
  const [disabled, setDisabled] = useState(false);
  const [adelaideInput, setAdelaideInput] = useState(() => {
    let inputs = [];
    if (stringState.adelaide) {
      stringState.adelaide.forEach((element) => {
        let name;
       
        Object.entries(element).forEach((el) => {
          
      
          if (el[0] && el[0].endsWith('value')) {
            inputs.push({ name: !element.value ? el[0].replace('value', '') : element.name, value: el[1] });
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
  ///////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////
  const [perthInput, setPerthInput] = useState(() => {
    let inputs = [];

    if (stringState.perth) {
      stringState.perth.forEach((element) => {
        Object.entries(element).forEach((el) => {
          if (el[0] && el[0].endsWith('value')) {
            inputs.push({ name: !element.value ? el[0].replace('value', '') : element.name, value: el[1] });
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

  const [melbourneInput, setMelbourneInput] = useState(() => {
    let inputs = [];

    if (stringState.melbourne) {
      stringState.melbourne.forEach((element) => {
        Object.entries(element).forEach((el) => {
          if (el[0] && el[0].endsWith('value')) {
            inputs.push({ name:  !element.value ? el[0].replace('value', '') : element.name, value: el[1] });
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
  const [sydneyInput, setSydneyInput] = useState(() => {
    let inputs = [];

    if (stringState.sydney) {
      stringState.sydney.forEach((element) => {
        Object.entries(element).forEach((el) => {
          if (el[0] && el[0].endsWith('value')) {
            inputs.push({ name: !element.value ? el[0].replace('value', '') : element.name, value: el[1] });
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
  const [brisbaneInput, setBrisbaneInput] = useState(() => {
    let inputs = [];

    if (stringState.brisbane) {
      stringState.brisbane.forEach((element) => {
        Object.entries(element).forEach((el) => {
          if (el[0] && el[0].endsWith('value')) {
            inputs.push({ name:  !element.value ? el[0].replace('value', '') : element.name, value: el[1] });
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

  ///////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////

  const addInput = (e) => {
    e.preventDefault();
    switch (e.target.className.split(' ')[0]) {
      case 'sydney__button--add':
        setSydneyInput((s) => {
          let proppedArray = stringState.sydney
            ? stringState.sydney
            : [
                {
                  type: 'text',
                  value: '',
                },
              ];
          return [...s, ...proppedArray];
        });
        break;

      case 'brisbane__button--add':
        setBrisbaneInput((s) => {
          let proppedArray = stringState.brisbane
            ? stringState.brisbane
            : [
                {
                  type: 'text',
                  value: '',
                },
              ];
          return [...s, ...proppedArray];
        });
        break;

      case 'melbourne__button--add':
        setMelbourneInput((s) => {
          let proppedArray = stringState.melbourne
            ? stringState.melbourne
            : [
                {
                  type: 'text',
                  value: '',
                },
              ];
          return [...s, ...proppedArray];
        });
        break;

      case 'perth__button--add':
        setPerthInput((s) => {
          let proppedArray = stringState.perth
            ? stringState.perth
            : [
                {
                  type: 'text',
                  value: '',
                },
              ];
          return [...s, ...proppedArray];
        });
        break;

      case 'adelaide__button--add':
        setAdelaideInput((s) => {
          let proppedArray = stringState.adelaide
            ? stringState.adelaide
            : [
                {
                  type: 'text',
                  value: '',
                },
              ];
          return [...s, ...proppedArray];
        });
        break;

      default:
        break;
    }
    // setInputArr((s) => {
    //   let proppedArray = stringState.extraInputs
    //     ? stringState.extraInputs
    //     : [
    //         {
    //           type: 'text',
    //           value: '',
    //         },
    //       ];
    //   return [...s, ...proppedArray];
    // });
  };
  const handleChangeName = (e) => {
 
    e.preventDefault();
    const index = e.target.id;
    switch (e.target.className.split(' ')[1]) {
      case 'dynamic__adelaide--field':
        setAdelaideInput((s) => {
          const newArr = s.slice();
          newArr[index].name = `${e.target.value}`;
          newArr[index].secondName = `${e.target.value}`;
          return newArr;
        });
        break;
      case 'dynamic__perth--field':
        setPerthInput((s) => {
          const newArr = s.slice();
          newArr[index].name = `${e.target.value}`;
          newArr[index].secondName = `${e.target.value}`;
          return newArr;
        });
        break;
      case 'dynamic__melbourne--field':
        setMelbourneInput((s) => {
          const newArr = s.slice();
          newArr[index].name = `${e.target.value}`;
          newArr[index].secondName = `${e.target.value}`;
          return newArr;
        });
        break;
      case 'dynamic__sydney--field':
        setSydneyInput((s) => {
          const newArr = s.slice();
          newArr[index].name = `${e.target.value}`;
          newArr[index].secondName = `${e.target.value}`;
          return newArr;
        });
        break;
      case 'dynamic__brisbane--field':
        setBrisbaneInput((s) => {
          const newArr = s.slice();
          newArr[index].name = `${e.target.value}`;
          newArr[index].secondName = `${e.target.value}`;
          return newArr;
        });
        break;

      default:
        break;
    }
    // e.preventDefault();

    // const index = e.target.id;

    // setInputArr((s) => {
    //   const newArr = s.slice();
    //   newArr[index].name = `${e.target.value}`;
    //   newArr[index].secondName = `${e.target.value}`;
    //   return newArr;
    // });
  };
  const handleChangeValue = (e) => {
    e.preventDefault();
    const index = e.target.id;

    switch (e.target.className.split(' ')[1]) {
      case 'dynamic__adelaide--value':
        setAdelaideInput((s) => {
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
        break;
      case 'dynamic__perth--value':
        setPerthInput((s) => {
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
        break;
      case 'dynamic__melbourne--value':
        setMelbourneInput((s) => {
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
        break;

      case 'dynamic__sydney--value':
        setSydneyInput((s) => {
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
        break;
      case 'dynamic__brisbane--value':
        setBrisbaneInput((s) => {
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
        break;

      default:
        break;
    }

    // setInputArr((s) => {
    //   const newArr = s.slice();
    //   let name = e.target.name;
    //   // newArr[index].val = e.target.value;
    //   newArr[index] = {
    //     [`${newArr[index].secondName}value`]: e.target.value,
    //     name: newArr[index].name,
    //     secondName: newArr[index].secondName,
    //   };
    //   return newArr;
    // });
  };
  let optionsGoods = ['flowers', 'hardgoods'];
  const sendEmail = (sendData, emailTo, type , arrivalDate , pellets) => {
    let data = {};
    let arr = sendData;
    ///////////////////////
    let name;
    let value;
    let dat = [];
    arr.forEach((el) => {
      if (el.value === '') return;
      Object.keys(el).forEach((e) => {
        if (!e.endsWith('value')) return;
        
        name =  !el.value ? e.replace('value', '') : el.name;
        value = el[e];
        //         let check = dat.includes(`<div>
        // <p style="font-size: 1.5rem; font-weight: bold">${name}${' :    '}  <span>${value}</span></p>

        // </div>`);
        let d = `<div>
<p style="font-size: 1.5rem; font-weight: bold">${name}${' :    '}  <span>${value}</span></p>

</div>`;

        dat = [...dat, d];
      });
      
    });
    dat = [`<div>
      <p style="font-size: 1.5rem; font-weight: bold">Warehouse Arrival Date${' :    '}  <span>${arrivalDate}</span></p>
      
      </div>`,`<div>
      <p style="font-size: 1.5rem; font-weight: bold">Pellets${' :    '}  <span>${pellets}</span></p>
      
      </div>`,...dat  ]
   
    data = { [type]: dat.join().replaceAll(',', '<br></br>') };
    ////////////////
    emailjs
      .send(
        'service_6uwt6ol',
        'template_z3ej3qg',
        {
          message: data.[type],
          to: emailTo,
          reply_to: 'cutealak3854@gmail.com',
        },
        'NtI17gIjg_odgiEAy'
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
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
        {stringState.goodsType === 'flowers' ? (
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
        ) : (
          ''
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
          <p>Packing List</p>
          {formType !== 'view' ? <ImageUpload
            givenName={detail ? detail.detail.packingList : undefined}
            key={'packingList'}
            name="packingList"
            files={files}
            setFiles={setFiles}
          /> : 
          <div>
          {detail.detail.packingList.map((i) => {
            return (
              <img
                className="view__image"
                src={`/files/${i}`}
                alt="Not Specified"
              ></img>
            );
          })}
        </div>
                }
        </div>
        <div className="form__group">
          <p>Airway Bill</p>
          {formType !== 'view' ? <ImageUpload
            givenName={detail ? detail.detail.airwayBill : undefined}
            key={'airwayBill'}
            name="airwayBill"
            files={files}
            setFiles={setFiles}
          /> : 
          <div>
          {detail.detail.airwayBill.map((i) => {
            return (
              <img
                className="view__image"
                src={`/files/${i}`}
                alt="Not Specified"
              ></img>
            );
          })}
        </div>}
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
        {formType !== 'view' ?   <ImageUpload
            givenName={detail ? detail.detail.selesbyInvoice : undefined}
            key={'selesbyInvoice'}
            name="selesbyInvoice"
            files={files}
            setFiles={setFiles}
          /> : (
            <div>
          {detail.detail.selesbyInvoice.map((i) => {
            return (
              <img
                className="view__image"
                src={`/files/${i}`}
                alt="Not Specified"
              ></img>
            );
          })}
        </div>
         
                )
                }
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
         {formType !== 'view' ?  <ImageUpload
            givenName={detail ? detail.detail.goatInvoice : undefined}
            key={'goatInvoice'}
            name="goatInvoice"
            files={files}
            setFiles={setFiles}
          /> : <div>
          {detail.detail.goatInvoice.map((i) => {
            return (
              <img
                className="view__image"
                src={`/files/${i}`}
                alt="Not Specified"
              ></img>
            );
          })}
        </div>}
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
        {/* <div className="form__group">
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
        )} */}
        <div className="form__group">
          <p>Adelide And Perth Freight Forwarder</p>
          {formType !== 'view' ? <ImageUpload
            givenName={
              detail ? detail.detail.adelideAndPerthFreightForwarder : undefined
            }
            key={'adelideAndPerthFreightForwarder'}
            name="adelideAndPerthFreightForwarder"
            files={files}
            setFiles={setFiles}
          /> :<div>
          {detail.detail.adelideAndPerthFreightForwarder.map((i) => {
            return (
              <img
                className="view__image"
                src={`/files/${i}`}
                alt="Not Specified"
              ></img>
            );
          })}
        </div>}
        </div>
        {/* ///////////////////////////////////////////////////////////////////---------------------------------------------- */}
        <div className="form__group">
          <p>Adelaide FW Doc Upload</p>
          {formType !== 'view' ? <ImageUpload
            givenName={detail ? detail.detail.adelaideAirwayBill : undefined}
            key={'adelaideAirwayBill'}
            name="adelaideAirwayBill"
            files={files}
            setFiles={setFiles}
          /> : 
          <img
                  className="view__image"
                  src={`/files/${detail.detail.adelaideAirwayBill}`}
                  alt="Not Specified"
                ></img>}
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
         {formType !== 'view' ?  <ImageUpload
            givenName={detail ? detail.detail.perthAirwayBill : undefined}
            key={'perthAirwayBill'}
            name="perthAirwayBill"
            files={files}
            setFiles={setFiles}
          /> : <div>
          {detail.detail.perthAirwayBill.map((i) => {
            return (
              <img
                className="view__image"
                src={`/files/${i}`}
                alt="Not Specified"
              ></img>
            );
          })}
        </div>}
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
            <div className="form__group">
              <label htmlFor="dateofArrivalAdelaide">
                Date Of Flower Arrival:
              </label>
              <input
                className="form__input--date"
                type="date"
                id="dateofArrivalAdelaide"
                name="dateofArrivalAdelaide"
                value={`${dateState.dateOfArrivalAdelaide}`}
                onChange={(e) => {
                  setDateState({
                    ...dateState,
                    dateOfArrivalAdelaide: e.target.value,
                  });
                }}
              />

            </div>
            <label htmlFor="adelaideEmail">{`Company Email: `}</label>
            <input
              className="form__input"
              autoComplete="off"
              id="adelaideEmail"
              type="email"
              name="adelaideEmail"
              defaultValue={emails.adelaide}
              onChange={(e) => {
                //
               setEmails({...emails, adelaide: e.target.value})
              }}
            ></input>
            <label htmlFor="adelaidePallets">Pellets</label>
            <input
              className="form__input"
              autoComplete="off"
              id="adelaidePallets"
              type="number"
              name="adelaidePallets"
              defaultValue={stringState.adelaidePallets}
              onChange={(e) => {
                //
                setStringState({
                  ...stringState,
                  adelaidePallets: e.target.value,
                });
              }}
            ></input>
            <div className="formTwo__adelaideSpecial">
              <span style={{ fontSize: '1.2rem' }}>Boxes :</span>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: 'max-content',
                }}
              >
                <button
                  className="adelaide__button--add"
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
                {adelaideInput.map((item, i) => {
                  return (
                    <div className="form__group--adelaide">
                      <label>Field</label>
                      <input
                        type="text"
                        className="form__input dynamic__adelaide--field"
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
                        className="form__input dynamic__adelaide--value"
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
            <div className="form__group">
              <label htmlFor="dateofArrivalPerth">
                Date Of Flower Arrival:
              </label>
              <input
                className="form__input--date"
                type="date"
                id="dateofArrivalPerth"
                name="dateofArrivalPerth"
                value={`${dateState.dateOfArrivalPerth}`}
                onChange={(e) => {
                  setDateState({
                    ...dateState,
                    dateOfArrivalPerth: e.target.value,
                  });
                }}
              />
            </div>
            <label htmlFor="perthEmail">{`Company Email: `}</label>
            <input
              className="form__input"
              autoComplete="off"
              id="perthEmail"
              type="email"
              name="perthEmail"
              defaultValue={emails.perth}
              onChange={(e) => {
                //
               setEmails({...emails, perth: e.target.value})
              }}
            ></input>
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
            <div className="formTwo__adelaideSpecial">
              <span style={{ fontSize: '1.2rem' }}>Boxes :</span>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: 'max-content',
                }}
              >
                <button
                  className="perth__button--add"
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
                {perthInput.map((item, i) => {
                  return (
                    <div className="form__group--adelaide">
                      <label>Field</label>
                      <input
                        type="text"
                        className="form__input dynamic__perth--field"
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
                        className="form__input dynamic__perth--value"
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
        {/* //////////////////////////////////// */}
        <div className="form__group form__group--double">
          <h3>Melbourne :</h3>
          <div>
            <div className="form__group">
              <label htmlFor="dateofArrivalMelbourne">
                Date Of Flower Arrival:
              </label>
              <input
                className="form__input--date"
                type="date"
                id="dateofArrivalMelbourne"
                name="dateofArrivalMelbourne"
                value= {`${dateState.dateOfArrivalMelbourne}`}
                onChange={(e) => {
                  setDateState({
                    ...dateState,
                    dateOfArrivalMelbourne: e.target.value,
                  });
                }}
              />
            </div>
            <label htmlFor="melbourneEmail">{`Company Email: `}</label>
            <input
              className="form__input"
              autoComplete="off"
              id="melbourneEmail"
              type="email"
              name="melbourneEmail"
              defaultValue={emails.melbourne}
              onChange={(e) => {
                //
               setEmails({...emails, melbourne: e.target.value})
              }}
            ></input>
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

            <div className="formTwo__adelaideSpecial">
              <span style={{ fontSize: '1.2rem' }}>Boxes :</span>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: 'max-content',
                }}
              >
                <button
                  className="melbourne__button--add"
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
                {melbourneInput.map((item, i) => {
                  return (
                    <div className="form__group--adelaide">
                      <label>Field</label>
                      <input
                        type="text"
                        className="form__input dynamic__melbourne--field"
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
                        className="form__input dynamic__melbourne--value"
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
        {/* ////////////////////////////// */}
        <div className="form__group form__group--double">
          <h3>Sydney :</h3>
          <div>
            <div className="form__group">
              <label htmlFor="dateofArrivalSydney">
                Date Of Flower Arrival:
              </label>
              <input
                className="form__input--date"
                type="date"
                id="dateofArrivalSydney"
                name="dateofArrivalSydney"
                value= {`${dateState.dateOfArrivalSydney}`}
                onChange={(e) => {
                  setDateState({
                    ...dateState,
                    dateOfArrivalSydney: e.target.value,
                  });
                }}
              />
            </div>
            <div>
            <label htmlFor="sydneyEmail">{`Company Email: `}</label>
            <input
              className="form__input"
              autoComplete="off"
              id="sydneyEmail"
              type="email"
              name="sydneyEmail"
              defaultValue={emails.sydney}
              onChange={(e) => {
                //
               setEmails({...emails, sydney: e.target.value})
              }}
            ></input>
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
            </div>

            <div className="formTwo__adelaideSpecial">
              <span style={{ fontSize: '1.2rem' }}>Boxes :</span>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: 'max-content',
                }}
              >
                <button
                  className="sydney__button--add"
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
                {sydneyInput.map((item, i) => {
                  return (
                    <div className="form__group--adelaide">
                      <label>Field</label>
                      <input
                        type="text"
                        className="form__input dynamic__sydney--field"
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
                        className="form__input dynamic__sydney--value"
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
        {/* //////////////// */}
        {/* //////////////// */}
        {/* //////////////// */}
        {/* //////////////// */}
        {/* //////////////// */}
        {/* //////////////// */}
        {/* //////////////// */}
        {/* //////////////// */}
        {/* //////////////// */}
        {/* //////////////// */}
        {/* //////////////// */}
        {/* //////////////// */}
        {/* //////////////// */}
        {/* //////////////// */}
        {/* //////////////// */}
        <div className="form__group form__group--double">
          <h3>Brisbane :</h3>

          <div>
            <div className="form__group">
              <label htmlFor="dateofArrivalBrisbane">
                Date Of Flower Arrival:
              </label>
              <input
                className="form__input--date"
                type="date"
                id="dateofArrivalBrisbane"
                name="dateofArrivalBrisbane"
                value={`${dateState.dateOfArrivalBrisbane}`}
                onChange={(e) => {
                  setDateState({
                    ...dateState,
                    dateOfArrivalBrisbane: e.target.value,
                  });
                }}
              />
            </div>
            <label htmlFor="brisbaneEmail">{`Company Email: `}</label>
            <input
              className="form__input"
              autoComplete="off"
              id="brisbaneEmail"
              type="email"
              name="brisbaneEmail"
              defaultValue={emails.brisbane}
              onChange={(e) => {
                //
               setEmails({...emails, brisbane: e.target.value})
              }}
            ></input>
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
            <div className="formTwo__adelaideSpecial">
              <span style={{ fontSize: '1.2rem' }}>Boxes :</span>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: 'max-content',
                }}
              >
                <button
                  className="brisbane__button--add"
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
                {brisbaneInput.map((item, i) => {
                  return (
                    <div className="form__group--adelaide">
                      <label>Field</label>
                      <input
                        type="text"
                        className="form__input dynamic__brisbane--field"
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
                        className="form__input dynamic__brisbane--value"
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
        {/* ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
        {/* <div className="form__group form__group--double">
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
        </div> */}
        {formType !== 'view' ? <div className="panel bw">
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

              // setDisabled(true);

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
              let adelaideBoxes = '';
              let dateOfArrivalAdelaide = dateState.dateOfArrivalAdelaide;
              let dateOfArrivalBrisbane = dateState.dateOfArrivalBrisbane;
              let dateOfArrivalMelbourne = dateState.dateOfArrivalMelbourne;
              let dateOfArrivalPerth = dateState.dateOfArrivalPerth;
              let dateOfArrivalSydney = dateState.dateOfArrivalSydney;

              let adelaide = adelaideInput;
              let sydney = sydneyInput;
              let perth = perthInput;
              let brisbane = brisbaneInput;
              let melbourne = melbourneInput;

              /////////////////// upper one half left adeliade boxes---- cant be this '' ofcourse


              // if(dateOfArrivalAdelaide  && (!stringState.adelaide || !stringState.adelaide.includes('emailSent'))){
              if(emails.adelaide !== ''){

              sendEmail(adelaideInput, emails.adelaide, 'adelaideInput' ,dateOfArrivalAdelaide ,adelaidePallets);
              adelaide = [...adelaide , 'emailSent']
              }
              // if(dateOfArrivalBrisbane && (!stringState.brisbane || !stringState.brisbane.includes('emailSent'))){
              if(emails.brisbane !== ''){

              sendEmail(brisbaneInput, emails.brisbane, 'brisbaneInput', dateOfArrivalBrisbane , brisbonPallets);
              brisbane = [...brisbane , 'emailSent']

}
              // if(dateOfArrivalMelbourne && (!stringState.melbourne || !stringState.melbourne.includes('emailSent'))){
              if(emails.melbourne !== ''){

              sendEmail(melbourneInput, emails.melbourne, 'melbourneInput',dateOfArrivalMelbourne  , melbournePallets);
              melbourne = [...melbourne , 'emailSent']

}

              // if(dateOfArrivalPerth && (!stringState.perth || !stringState.perth.includes('emailSent'))){
              if(emails.perth !== ''){
              sendEmail(perthInput, emails.perth, 'perthInput',dateOfArrivalPerth  , perthPallets);
              perth = [...perth , 'emailSent']

}
              // if(dateOfArrivalSydney && (!stringState.sydney || !stringState.sydney.includes('emailSent'))){
              if(emails.sydney !== ''){
              sendEmail(sydneyInput, emails.sydney, 'sydneyInput', dateOfArrivalSydney , sydneyPallets);
              sydney = [...sydney , 'emailSent']

}
// melbourne@bloomex.com.au
// sydney@bloomex.com.au
// brisbane@bloomex.com.au
// perth@bloomex.com.au
// adelaide@bloomex.com.au

              let data = {
                goodsType,
                dateOfArrivalAdelaide,
                dateOfArrivalBrisbane,
                dateOfArrivalMelbourne,
                dateOfArrivalPerth,
                dateOfArrivalSydney,
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
                adelaide,
                perth,
                melbourne,
                brisbane,
                sydney,
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
        </div> : "" }
        
      </form>
    </div>
  );
};

export default connect(null, { editEntry, createEntry })(FormTwo);

import React from 'react';
import { useRef, useState, useEffect } from 'react';
import { connect } from 'react-redux';

const ImageUpload = (props) => {
  const ref = useRef();
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [buttonDisplay, setButtonDisplay] = useState('none');
  const imageHandler = (e) => {
    if (e.target.files && e.target.files.length === 1) {
      setFile(e.target.files[0]);
    }
  };

  const buttonHandler = (e) => {
    ref.current.click();
    setButtonDisplay('inline-block');
    let fileExists = props.files.some((entry) => {
      let filer = entry[1];

      return filer === props.name;
    });
    let index = props.files.findIndex((entry) => {
      let filer = entry[1];

      return filer === props.name;
    });

    if (file || fileExists) {
      let value = props.files;
      value.splice(index, 1); // 2nd parameter means remove one item only
      props.setFiles(value);
    }
  };
  const saveToDb = async (e) => {
    if (!file) return;

    let contain = props.files;
    contain.push([file, props.name]);

    props.setFiles(contain);
  };
  useEffect(() => {
    if (file && !file.type.startsWith('application')) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setPreviewUrl(fileReader.result);
      };
      fileReader.readAsDataURL(file);
    }
  }, [file]);

  return (
    <div className="imageUpload__container">
      <input
        ref={ref}
        type={'file'}
        accept=".jpg,.png,.jpeg,.pdf"
        style={{ display: 'none' }}
        onChange={imageHandler}
        multiple
      ></input>

      <button className="btn" type="button" onClick={buttonHandler}>
        Upload &#10064;
      </button>
      {file ? (
        <div className="imageUpload__box ">
          <div>
            {file.type.startsWith('application') ? (
              file.name
            ) : (
              <img
                alt="Profile "
                src={previewUrl}
                style={{
                  maxWidth: '4rem',
                  maxHeight: '4rem',
                }}
              ></img>
            )}
          </div>

          <div className="panel bw">
            <button
              className="btn"
              type="button"
              style={{ display: buttonDisplay }}
              onClick={(e) => {
                saveToDb();
                setButtonDisplay('none');
              }}
            >
              Save
            </button>
          </div>
        </div>
      ) : (
        <div>
          {!props.givenName ? (
            props.files.map((entry) => {
              let filer = entry[1];

              if (filer === props.name) {
                return <div>{entry[0].name}</div>;
              }
            })
          ) : (
            <div>{props.givenName}</div>
          )}
        </div>
      )}
    </div>
  );
};

export default connect(null)(ImageUpload);

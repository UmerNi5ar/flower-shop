"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getData = exports.createEntry = exports.editEntry = exports.deleteEntry = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _index = require("../utils/alert/index");

var _history = _interopRequireDefault(require("../history"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var deleteEntry = function deleteEntry(data) {
  return function _callee(dispatch) {
    var response;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return regeneratorRuntime.awrap(_axios["default"]["delete"]("/api/v1/bloomex/deleteShipment", {
              data: data
            }));

          case 3:
            response = _context.sent;
            dispatch({
              type: 'DELETE_ENTRY',
              payload: response.data.shipment
            });
            (0, _index.alert)({
              message: 'Delete Shipment!',
              type: 'success'
            });
            _context.next = 12;
            break;

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](0);
            (0, _index.alert)({
              message: 'Something went wront. Please try again later',
              type: 'error'
            });
            console.log(_context.t0);

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[0, 8]]);
  };
};

exports.deleteEntry = deleteEntry;

var editEntry = function editEntry(data) {
  return function _callee2(dispatch) {
    var removeFiles, responseData, changedFiles, _loop, i, formData, _i, response;

    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            data = _objectSpread({}, data, {
              tableData: undefined
            }); ///////////// Delete Already existing files

            removeFiles = [];
            responseData = {};

            if (data.files.length > 0) {
              /// File Exists
              (0, _index.alert)({
                message: 'Please wait. Your request is being processed',
                info: 'info'
              });
              changedFiles = data.changeFiles;

              _loop = function _loop(i) {
                //   /// Go through all files in changed
                var el = changedFiles[i];

                if (el) {
                  var check = data.files.some(function (file) {
                    var filename = file[1].split(' ')[0];
                    return el.startsWith("".concat(filename, "-"));
                  });

                  if (check) {
                    removeFiles.push(el);
                  }
                }
              };

              for (i = 0; changedFiles.length > i; i++) {
                _loop(i);
              }

              data = _objectSpread({}, data, {
                changeFiles: undefined,
                deleteFiles: removeFiles
              });
            }

            _context2.next = 7;
            return regeneratorRuntime.awrap(_axios["default"].patch("/api/v1/bloomex/updateShipment", data));

          case 7:
            responseData = _context2.sent;

            if (!(data.files.length > 0)) {
              _context2.next = 16;
              break;
            }

            formData = new FormData();
            formData.append('id', data.id);

            for (_i = 0; data.files.length > _i; _i++) {
              formData.append(data.files[_i][1], data.files[_i][0]);
            }

            _context2.next = 14;
            return regeneratorRuntime.awrap(_axios["default"].post("/api/v1/bloomex/postImage", formData));

          case 14:
            response = _context2.sent;
            responseData = _objectSpread({}, responseData.data.updatedShipment, {}, response.data.names);

          case 16:
            if (responseData.data) responseData = responseData.data.updatedShipment;
            dispatch({
              type: 'EDIT_ENTRY',
              payload: responseData
            });
            (0, _index.alert)({
              message: 'Edited Successfully',
              type: 'success'
            });

            _history["default"].push('/');

            _context2.next = 26;
            break;

          case 22:
            _context2.prev = 22;
            _context2.t0 = _context2["catch"](0);
            (0, _index.alert)({
              message: 'Something went wront. Please try again later',
              type: 'error'
            });
            console.log(_context2.t0);

          case 26:
          case "end":
            return _context2.stop();
        }
      }
    }, null, null, [[0, 22]]);
  };
};

exports.editEntry = editEntry;

var createEntry = function createEntry(data) {
  return function _callee3(dispatch) {
    var responseData, id, response, formData, i;
    return regeneratorRuntime.async(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return regeneratorRuntime.awrap(_axios["default"].post("/api/v1/bloomex/createShipment", data));

          case 3:
            responseData = _context3.sent;
            id = responseData.data.shipment._id;

            if (!(data.files.length > 0)) {
              _context3.next = 13;
              break;
            }

            formData = new FormData();
            formData.append('id', id);

            for (i = 0; data.files.length > i; i++) {
              // data.files.map(async (arr) => {
              formData.append(data.files[i][1], data.files[i][0]);
            }

            _context3.next = 11;
            return regeneratorRuntime.awrap(_axios["default"].post("/api/v1/bloomex/postImage", formData));

          case 11:
            response = _context3.sent;
            responseData = _objectSpread({}, responseData.data.shipment, {}, response.data.names);

          case 13:
            if (responseData.data) {
              responseData = _objectSpread({}, responseData.data.shipment);
            }

            dispatch({
              type: 'CREATE_ENTRY',
              payload: responseData
            });
            (0, _index.alert)({
              message: 'Created Successfully',
              type: 'success'
            });

            _history["default"].push('/');

            _context3.next = 23;
            break;

          case 19:
            _context3.prev = 19;
            _context3.t0 = _context3["catch"](0);
            (0, _index.alert)({
              message: 'Something went wront. Please try again later',
              type: 'error'
            });
            console.log(_context3.t0);

          case 23:
          case "end":
            return _context3.stop();
        }
      }
    }, null, null, [[0, 19]]);
  };
};

exports.createEntry = createEntry;

var getData = function getData() {
  return function _callee4(dispatch) {
    var response;
    return regeneratorRuntime.async(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return regeneratorRuntime.awrap(_axios["default"].get("/api/v1/bloomex/fetchShipments"));

          case 3:
            response = _context4.sent;
            dispatch({
              type: 'GET_SHIPMENTS_DATA',
              payload: response.data.shipments
            });
            (0, _index.alert)({
              message: 'Fetched Data',
              type: 'success'
            });
            _context4.next = 12;
            break;

          case 8:
            _context4.prev = 8;
            _context4.t0 = _context4["catch"](0);
            (0, _index.alert)({
              message: 'Something went wrong. Please try again later',
              type: 'error'
            });
            console.log(_context4.t0);

          case 12:
          case "end":
            return _context4.stop();
        }
      }
    }, null, null, [[0, 8]]);
  };
};

exports.getData = getData;
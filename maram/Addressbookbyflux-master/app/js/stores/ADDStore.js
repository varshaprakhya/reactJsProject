
var AppDispatcher = require('../dispatcher/AppDispatcher');
var AddressConst = require('../constants/AddressConst');
var assign = require('object-assign');
var EventEmitter = require('events').EventEmitter;
var customEvent = 'change';

var _contacts = [];
var _editContact = {};

// id for each contact
var currentId = 0;


function create(sampleContact) {
  _contacts[currentId] = {
    id: currentId,
    name: sampleContact.name,
    phone: sampleContact.phone,
    email: sampleContact.email
  };
  currentId+=1;
}

// send edit id to controller
function edit(contact) {
  _editContact = {
    id: contact.id,
    name: contact.name,
    phone: contact.phone,
    email: contact.email
  };
}

// save edit contact
function save(contact) {
  _contacts[contact.id] = {
    id: contact.id,
    name: contact.name,
    phone: contact.phone,
    email: contact.email
  };
}

// remove contact
function remove(removeCon) {
  if (_contacts.hasOwnProperty(removeCon)) {
    delete _contacts[removeCon];
  }
}


var ADDSTORE = assign({}, EventEmitter.prototype, {

  getEditContact: function() {
    return _editContact;
  },
  getAll: function() {
    return _contacts;
  },
  addChangeListener: function(callback) {
    this.on(customEvent, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(customEvent, callback);
  },
  newChange: function() {
    this.emit(customEvent);
  }

});

AppDispatcher.register(function(action) {
  var text;

  switch(action.actionType) {
    case AddressConst.ADDCREATE:
      text = action.name.trim();
      if (text !== '') {
        create(action);
        ADDSTORE.newChange();
      }
      break;

    case AddressConst.ADDEDIT:
      edit(action);
      ADDSTORE.newChange();
      break;

    case AddressConst.ADDSAVE:
      save(action);
      ADDSTORE.newChange();
      break;

    case AddressConst.ADDREMOVE:
      remove(action.id);
      ADDSTORE.newChange();
      break;

    default:
      // no op
  }
});

module.exports = ADDSTORE;
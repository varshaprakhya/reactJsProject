
var AppDispatcher = require('../dispatcher/AppDispatcher');
var AddressConst = require('../constants/AddressConst');

var CMActions = {

  
  create: function(newContact) {
  	// adding avatar randomly!
  	var avatar = 'img/faces/' + Math.floor(Math.random() * (15-1) + 1) + '.jpg';
  	newContact.avatar = avatar;

    AppDispatcher.dispatch({
      actionType: AddressConst.ADDCREATE,
      name: newContact.name,
      phone: newContact.phone,
      email: newContact.email,
      avatar: newContact.avatar
    });
  },
  /**
   * Opening modal to edit contact
   */
  edit: function(contact) {
    AppDispatcher.dispatch({
      actionType: AddressConst.ADDEDIT,
      id: contact.id,
      name: contact.name,
      phone: contact.phone,
      email: contact.email,

    });
  },
  /**
   * Saving edited contact
   */
  save: function(contact) {
    AppDispatcher.dispatch({
      actionType: AddressConst.ADDSAVE,
      id: contact.id,
      name: contact.name,
      phone: contact.phone,
      email: contact.email,
      avatar: contact.avatar
    });
  },

  /**
   * removing contact
   */
  remove: function(removeId) {
    AppDispatcher.dispatch({
      actionType: AddressConst.ADDREMOVE,
      id: removeId
    });
  }

};

module.exports = CMActions;

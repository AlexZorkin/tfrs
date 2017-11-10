import * as ActionTypes from '../constants/actionTypes.jsx';
import * as ReducerTypes from '../constants/reducerTypes.jsx';
import axios from 'axios';
import * as Routes from '../constants/routes.jsx';
import { fuelSuppliers, fuelSupplier } from '../sampleData.jsx';

export const getFuelSuppliers = () => (dispatch, getState) => {
  dispatch(getFuelSuppliersRequest());
  axios.get(Routes.BASE_URL + Routes.FUEL_SUPPLIERS_API)
  .then((response) => {   
    dispatch(getFuelSuppliersSuccess(response.data));
  }).catch((error) => {
    dispatch(getFuelSuppliersError(error.response))
  })
}

const getFuelSuppliersRequest = () => {
  return {
    name: ReducerTypes.GET_FUEL_SUPPLIERS,
    type: ActionTypes.REQUEST,
  }
}

const getFuelSuppliersSuccess = (fuelSuppliers) => {
  return {
    name: ReducerTypes.GET_FUEL_SUPPLIERS,
    type: ActionTypes.SUCCESS,
    data: fuelSuppliers,
  }
}

const getFuelSuppliersError = (error) => {
  return {
    name: ReducerTypes.GET_FUEL_SUPPLIERS,
    type: ActionTypes.ERROR,
    errorMessage: error
  }
}

export const searchFuelSuppliers = (name, city) => (dispatch) => {
}

const searchFuelSuppliersRequest = () => {
  return {
    name: ReducerTypes.GET_FUEL_SUPPLIERS,
    type: ActionTypes.REQUEST,
  }
}

const searchFuelSuppliersSuccess = (fuelSuppliers) => {
  return {
    name: ReducerTypes.SEARCH_FUEL_SUPPLIERS,
    type: ActionTypes.SUCCESS,
    data: fuelSuppliers,
  }
}

const searchFuelSuppliersError = (error) => {
  return {
    name: ReducerTypes.GET_FUEL_SUPPLIERS,
    type: ActionTypes.ERROR,
    errorMessage: error
  }
}

export const searchFuelSuppliersReset = () => {
  return {
    name: ReducerTypes.SEARCH_FUEL_SUPPLIERS,
    type: ActionTypes.RESET,
  }
}

export const addFuelSupplier = (id) => (dispatch) => {
  console.log(id)
  dispatch(addFuelSupplierSuccess());
}

const addFuelSupplierSuccess = () => {
  return {
    name: ReducerTypes.ADD_FUEL_SUPPLIER,
    type: ActionTypes.SUCCESS,
  }
}

export const getFuelSupplier = (id) => (dispatch) => {
  dispatch(getFuelSupplierRequest());
  axios.get(Routes.BASE_URL + Routes.FUEL_SUPPLIERS_API + '/' + id)
  .then((response) => {  
    dispatch(getFuelSupplierSuccess(response.data));
  }).catch((error) => {
    dispatch(getFuelSupplierError(error.response))
  })
}

const getFuelSupplierRequest = () => {
  return {
    name: ReducerTypes.GET_FUEL_SUPPLIER,
    type: ActionTypes.REQUEST,
  }
}

const getFuelSupplierSuccess = (fuelSupplier) => {
  return {
    name: ReducerTypes.GET_FUEL_SUPPLIER,
    type: ActionTypes.SUCCESS,
    data: fuelSupplier,
  }
}

const getFuelSupplierError = (error) => {
  return {
    name: ReducerTypes.GET_FUEL_SUPPLIER,
    type: ActionTypes.ERROR,
    errorMessage: error
  }
}

export const addContact = (data) => (dispatch) => {
  dispatch(addContactRequest());
  axios.post(Routes.BASE_URL + Routes.FUEL_SUPPLIER_CONTACTS, {
    fuelSupplierFK: data.fuelSupplierFK,
    surname: data.contactSurname,
    givenName: data.contactGivenName,
    mobilePhoneNumber: data.contactCellPhone,
    workPhoneNumber: data.contactWorkPhone,
    emailAddress: data.contactEmail,
  })
  .then((response) => {
    dispatch(addContactSuccess());
    dispatch(getFuelSupplierContacts());
  }).catch((error) => {
    dispatch(addContactError(error.response));
  })
}

const addContactRequest = () => {
  return {
    name: ReducerTypes.ADD_CONTACT,
    type: ActionTypes.REQUEST,
  }
}

const addContactSuccess = () => {
  return {
    name: ReducerTypes.ADD_CONTACT,
    type: ActionTypes.SUCCESS,
  }
}

const addContactError = (error) => {
  return {
    name: ReducerTypes.ADD_CONTACT,
    type: ActionTypes.ERROR,
    errorMessage: error
  }
}

export const addContactReset = () => {
  return {
    name: ReducerTypes.ADD_CONTACT,
    type: ActionTypes.RESET,
  }
}

export const deleteContact = (id) => (dispatch) => {
  dispatch(deleteContactRequest());
  axios.post(Routes.BASE_URL + Routes.FUEL_SUPPLIER_CONTACTS + '/' + id + Routes.DELETE)
  .then((response) => {
    dispatch(deleteContactSuccess());
    dispatch(getFuelSupplierContacts());
  }).catch((error) => {
    dispatch(deleteContactError(error.response));
  })
}

const deleteContactRequest = () => {
  return {
    name: ReducerTypes.DELETE_CONTACT,
    type: ActionTypes.REQUEST,
  }
}

const deleteContactSuccess = () => {
  return {
    name: ReducerTypes.DELETE_CONTACT,
    type: ActionTypes.SUCCESS,
  }
}

const deleteContactError = (error) => {
  return {
    name: ReducerTypes.DELETE_CONTACT,
    type: ActionTypes.ERROR,
    errorMessage: error
  }
}

export const deleteContactReset = () => {
  return {
    name: ReducerTypes.DELETE_CONTACT,
    type: ActionTypes.RESET,
  }
}

export const verifyID = (id) => (dispatch) => {
  dispatch(verifyIDReset());
}

const verifyIDSuccess = () => {
  return {
    name: ReducerTypes.VERIFY_ID,
    type: ActionTypes.SUCCESS,
  }
}

const verifyIDError = (error) => {
  return {
    name: ReducerTypes.VERIFY_ID,
    type: ActionTypes.ERROR,
    errorMessage: error,
  }
}

export const verifyIDReset = () => {
  return {
    name: ReducerTypes.VERIFY_ID,
    type: ActionTypes.RESET,
  }
}

export const getFuelSupplierActionTypes = () => (dispatch, getState) => {
  dispatch(getFuelSupplierActionTypesRequest());
  axios.get(Routes.BASE_URL + Routes.FUEL_SUPPLIER_ACTION_TYPES)
  .then((response) => {
    dispatch(getFuelSupplierActionTypesSuccess(response.data));
  }).catch((error) => {
    dispatch(getFuelSupplierActionTypesError(error.response))
  })
}

const getFuelSupplierActionTypesRequest = () => {
  return {
    name: ReducerTypes.FUEL_SUPPLIER_ACTION_TYPES,
    type: ActionTypes.REQUEST,
  }
}

const getFuelSupplierActionTypesSuccess = (fuelSuppliers) => {
  return {
    name: ReducerTypes.FUEL_SUPPLIER_ACTION_TYPES,
    type: ActionTypes.SUCCESS,
    data: fuelSuppliers,
  }
}

const getFuelSupplierActionTypesError = (error) => {
  return {
    name: ReducerTypes.FUEL_SUPPLIER_ACTION_TYPES,
    type: ActionTypes.ERROR,
    errorMessage: error
  }
}

export const getFuelSupplierActionType = (id) => (dispatch) => {
  dispatch(getFuelSupplierActionTypeRequest());
  axios.get(Routes.BASE_URL + Routes.FUEL_SUPPLIER_ACTION_TYPES + id)
  .then((response) => {
    dispatch(getFuelSupplierActionTypeSuccess(response.data));
  }).catch((error) => {
    dispatch(getFuelSupplierActionTypeError(error.response))
  })
}

const getFuelSupplierActionTypeRequest = () => {
  return {
    name: ReducerTypes.FUEL_SUPPLIER_ACTION_TYPE,
    type: ActionTypes.REQUEST,
  }
}

const getFuelSupplierActionTypeSuccess = (fuelSuppliers) => {
  return {
    name: ReducerTypes.FUEL_SUPPLIER_ACTION_TYPE,
    type: ActionTypes.SUCCESS,
    data: fuelSuppliers,
  }
}

const getFuelSupplierActionTypeError = (error) => {
  return {
    name: ReducerTypes.FUEL_SUPPLIER_ACTION_TYPE,
    type: ActionTypes.ERROR,
    errorMessage: error
  }
}

export const getFuelSupplierStatuses = () => (dispatch) => {
  dispatch(getFuelSupplierStatusesRequest());
  axios.get(Routes.BASE_URL + Routes.FUEL_SUPPLIER_STATUSES)
  .then((response) => {
    dispatch(getFuelSupplierStatusesSuccess(response.data));
  }).catch((error) => {
    dispatch(getFuelSupplierStatusesError(error.response))
  })
}

const getFuelSupplierStatusesRequest = () => {
  return {
    name: ReducerTypes.FUEL_SUPPLIER_STATUSES,
    type: ActionTypes.REQUEST,
  }
}

const getFuelSupplierStatusesSuccess = (fuelSuppliers) => {
  return {
    name: ReducerTypes.FUEL_SUPPLIER_STATUSES,
    type: ActionTypes.SUCCESS,
    data: fuelSuppliers,
  }
}

const getFuelSupplierStatusesError = (error) => {
  return {
    name: ReducerTypes.FUEL_SUPPLIER_STATUSES,
    type: ActionTypes.ERROR,
    errorMessage: error
  }
}

export const getFuelSupplierStatus = (id) => (dispatch) => {
  dispatch(getFuelSupplierStatusRequest());
  axios.get(Routes.BASE_URL + Routes.FUEL_SUPPLIER_STATUSES + '/' + id)
  .then((response) => {
    dispatch(getFuelSupplierStatusSuccess(response.data));
  }).catch((error) => {
    dispatch(getFuelSupplierStatusError(error.response))
  })
}

const getFuelSupplierStatusRequest = () => {
  return {
    name: ReducerTypes.FUEL_SUPPLIER_STATUS,
    type: ActionTypes.REQUEST,
  }
}

const getFuelSupplierStatusSuccess = (fuelSuppliers) => {
  return {
    name: ReducerTypes.FUEL_SUPPLIER_STATUS,
    type: ActionTypes.SUCCESS,
    data: fuelSuppliers,
  }
}

const getFuelSupplierStatusError = (error) => {
  return {
    name: ReducerTypes.FUEL_SUPPLIER_STATUS,
    type: ActionTypes.ERROR,
    errorMessage: error
  }
}

export const getFuelSupplierTypes = () => (dispatch) => {
  dispatch(getFuelSupplierTypesRequest());
  axios.get(Routes.BASE_URL + Routes.FUEL_SUPPLIER_TYPES)
  .then((response) => {
    dispatch(getFuelSupplierTypesSuccess(response.data));
  }).catch((error) => {
    dispatch(getFuelSupplierTypesError(error.response))
  })
}

const getFuelSupplierTypesRequest = () => {
  return {
    name: ReducerTypes.FUEL_SUPPLIER_TYPES,
    type: ActionTypes.REQUEST,
  }
}

const getFuelSupplierTypesSuccess = (fuelSuppliers) => {
  return {
    name: ReducerTypes.FUEL_SUPPLIER_TYPES,
    type: ActionTypes.SUCCESS,
    data: fuelSuppliers,
  }
}

const getFuelSupplierTypesError = (error) => {
  return {
    name: ReducerTypes.FUEL_SUPPLIER_TYPES,
    type: ActionTypes.ERROR,
    errorMessage: error
  }
}

export const getFuelSupplierType = (id) => (dispatch) => {
  dispatch(getFuelSupplierTypeRequest());
  axios.get(Routes.BASE_URL + Routes.FUEL_SUPPLIER_TYPES + '/' + id)
  .then((response) => {
    dispatch(getFuelSupplierTypeSuccess(response.data));
  }).catch((error) => {
    dispatch(getFuelSupplierTypeError(error.response))
  })
}

const getFuelSupplierTypeRequest = () => {
  return {
    name: ReducerTypes.FUEL_SUPPLIER_TYPE,
    type: ActionTypes.REQUEST,
  }
}

const getFuelSupplierTypeSuccess = (fuelSuppliers) => {
  return {
    name: ReducerTypes.FUEL_SUPPLIER_TYPE,
    type: ActionTypes.SUCCESS,
    data: fuelSuppliers,
  }
}

const getFuelSupplierTypeError = (error) => {
  return {
    name: ReducerTypes.FUEL_SUPPLIER_TYPE,
    type: ActionTypes.ERROR,
    errorMessage: error
  }
}

export const getFuelSupplierContacts = () => (dispatch) => {
  dispatch(getFuelSupplierContactsRequest());
  axios.get(Routes.BASE_URL + Routes.FUEL_SUPPLIER_CONTACTS)
  .then((response) => {
    dispatch(getFuelSupplierContactsSuccess(response.data));
  }).catch((error) => {
    dispatch(getFuelSupplierContactsError(error.response))
  })
}

const getFuelSupplierContactsRequest = () => {
  return {
    name: ReducerTypes.FUEL_SUPPLIER_CONTACTS,
    type: ActionTypes.REQUEST,
  }
}

const getFuelSupplierContactsSuccess = (contacts) => {
  return {
    name: ReducerTypes.FUEL_SUPPLIER_CONTACTS,
    type: ActionTypes.SUCCESS,
    data: contacts,
  }
}

const getFuelSupplierContactsError = (error) => {
  return {
    name: ReducerTypes.FUEL_SUPPLIER_CONTACTS,
    type: ActionTypes.ERROR,
    errorMessage: error
  }
}

export const getFuelSupplierAttachments = () => (dispatch) => {
  dispatch(getFuelSupplierAttachmentsRequest());
  axios.get(Routes.BASE_URL + Routes.FUEL_SUPPLIER_ATTACHMENTS)
  .then((response) => {
    dispatch(getFuelSupplierAttachmentsSuccess(response.data));
  }).catch((error) => {
    dispatch(getFuelSupplierAttachmentsError(error.response))
  })
}

const getFuelSupplierAttachmentsRequest = () => {
  return {
    name: ReducerTypes.FUEL_SUPPLIER_ATTACHMENTS,
    type: ActionTypes.REQUEST,
  }
}

const getFuelSupplierAttachmentsSuccess = (attachments) => {
  return {
    name: ReducerTypes.FUEL_SUPPLIER_ATTACHMENTS,
    type: ActionTypes.SUCCESS,
    data: attachments,
  }
}

const getFuelSupplierAttachmentsError = (error) => {
  return {
    name: ReducerTypes.FUEL_SUPPLIER_ATTACHMENTS,
    type: ActionTypes.ERROR,
    errorMessage: error
  }
}
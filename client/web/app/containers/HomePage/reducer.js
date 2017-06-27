/*
 *
 * ProductList reducer
 *
 */

import { fromJS } from 'immutable';
import {
  SEARCH_CHANGED,
  SET_FETCHED_PRODUCTS,
  ERROR_FETCHING_PRODUCTS,
  OPEN_ADDRESS_DIALOG,
  CHANGED_ADDRESS_CITY,
  CHANGED_ADDRESS_CODE,
  CHANGED_ADDRESS_STREET,
  ADDRESS_DIALOG_CANCEL,
  ADDRESS_DIALOG_SUBMIT_SUCESSFUL,
} from './constants';

const initialState = fromJS({
  products: false,
  pageCount: Number(0),
  pageNumber: Number(0),
  searchTitle: '',
  error: null,
  createAddress: {
    city: '',
    code: '',
    street: '',
  },
  isCreateDialogOpen: false,
});

function homePageReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGED_ADDRESS_CITY:
      return state.setIn(['createAddress', 'city'], action.city);
    case CHANGED_ADDRESS_CODE:
      return state.setIn(['createAddress', 'code'], action.code);
    case CHANGED_ADDRESS_STREET:
      return state.setIn(['createAddress', 'street'], action.street);
    case ERROR_FETCHING_PRODUCTS:
      return state.set('error', action.error);
    case SET_FETCHED_PRODUCTS:
      return state.set('products', action.products);
    case SEARCH_CHANGED:
      return state.set('searchTitle', action.searchTitle);
    case OPEN_ADDRESS_DIALOG:
      return state.set('isCreateDialogOpen', true);
    case ADDRESS_DIALOG_CANCEL:
      return state.set('isCreateDialogOpen', false);
    case ADDRESS_DIALOG_SUBMIT_SUCESSFUL:
      return state.set('isCreateDialogOpen', false)
        .setIn(['createAddress', 'city'], '')
        .setIn(['createAddress', 'code'], '')
        .setIn(['createAddress', 'street'], '');
    default:
      return state;
  }
}

export default homePageReducer;

import {
  createStore as reduxCreateStore, // 便宜上名前を変えている
  combineReducers,
} from 'redux';

// import { ProductsReducer } from '../products/reducers';
import { UsersReducer } from '../users/reducers';

export default function createStore() {
  return reduxCreateStore(
    combineReducers({
      // products: ProductsReducer,
      users: UsersReducer,
    })
  );
}
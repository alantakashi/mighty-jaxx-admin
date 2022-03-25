import { createStore, compose } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

// Reducers
import { rootReducer } from '@reducers'

const persistConfig = {
  key: 'root',
  storage,
}

// dev tools
let composeEnhancers = compose;
if (process.env.NODE_ENV === 'development') {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

let store = createStore(
  persistedReducer,
  {},
  composeEnhancers(),
);
let persistor = persistStore(store);
export { store, persistor }

import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers/RootReducer';
import thunk from 'redux-thunk';

export default function configureStore() {
    return createStore(
        rootReducer,
        (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__(),
        applyMiddleware(thunk)
    );
}
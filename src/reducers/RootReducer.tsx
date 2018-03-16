import { combineReducers } from 'redux';
import SharkRandomReducer from './SharkRandomReducer';

const rootReducer = combineReducers({
    sharkListState : SharkRandomReducer
});

export default rootReducer; 
import { combineReducers } from 'redux';
import SharkRandomReducer from './SharkRandomReducer';

const rootReducer = combineReducers({
    SharkListState : SharkRandomReducer
});

export default rootReducer; 
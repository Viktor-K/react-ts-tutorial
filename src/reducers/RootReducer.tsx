import { combineReducers } from 'redux';
import SharkRandomReducer from './SharkRandomReducer';
import SocialContentReducer from './SocialReducer';

const rootReducer = combineReducers({
    SharkListState : SharkRandomReducer,
    SocialContentState: SocialContentReducer
});

export default rootReducer; 
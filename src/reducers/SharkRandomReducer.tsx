import { SharkRandomAction, SharkRandomActionType } from '../actions/SharkRandomAction';
import { SharkRandomState } from '../container/SharkRandom/SharkRandomTypes';
import * as _ from 'lodash';
import SharkList from '../files/sharks_list';

const defaultSharkRandomState = {
    sharks_list: SharkList
};

function SharkRandomReducer(state: any = defaultSharkRandomState, action: SharkRandomAction): SharkRandomState | Array<SharkRandomState> {    
    switch (action.type) {
        case SharkRandomActionType.CHANGE_CURRENT_SHARK:            
            return filterSharkList(state, action.sharkName);
        default:
            return state;
    }
}

function filterSharkList(state: any, newSharkName: string) {
    let curSharkList = state.sharks_list;        
    return Object.assign(state.sharks_list, {
        sharkName: (curSharkList.length === 1)
            ? curSharkList[0]
            : newSharkName,

        sharks_list: (curSharkList.length === 1)
            ? curSharkList
            : Object.assign([], _.without(curSharkList, newSharkName))
    });    
}

export default SharkRandomReducer;
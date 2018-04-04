import { SharkRandomAction, SharkRandomActionType } from '../actions/SharkRandomAction';
import { SharkRandomState } from '../container/SharkRandom/SharkRandomTypes';
import * as _ from 'lodash';
import SharkList from '../files/sharks_list';

const defaultSharkRandomState: SharkRandomState = {
    sharksList: SharkList,
    sharkName: undefined
};

function SharkRandomReducer(state: any = defaultSharkRandomState, action: SharkRandomAction): SharkRandomState | Array<SharkRandomState> {
    switch (action.type) {
        case SharkRandomActionType.INIT_SHARKS_LIST:
            return {...defaultSharkRandomState};
        case SharkRandomActionType.CHANGE_CURRENT_SHARK:
            return removeSharkFromList(state, action.sharkName);
        default:
            return state;
    }
}

function removeSharkFromList(state: any, newSharkName: string): SharkRandomState {
    let { sharksList } = state;    

    return Object.assign({}, state, {        
        sharkName: (sharksList.length === 1)
            ? sharksList[0]
            : newSharkName,

        sharksList: (sharksList.length === 1)
            ? sharksList
            : Object.assign([], _.without(sharksList, newSharkName))
    });
}

export default SharkRandomReducer;
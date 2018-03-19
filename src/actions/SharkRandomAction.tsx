import { Action } from 'redux';

enum SharkRandomActionType {
    CHANGE_CURRENT_SHARK = 'CHANGE_CURRENT_SHARK',
    CLEAR_CURRENT_SHARK = 'CLEAR_CURRENT_SHARK',
    INIT_SHARKS_LIST = 'INIT_SHARKS_LIST'
}

interface SharkRandomAction extends Action {
    type: SharkRandomActionType;
    sharkName: string;
}

// ================================================================
//                      Action creators
// ================================================================
const initSharkList = () => ({ type: SharkRandomActionType.INIT_SHARKS_LIST });

const changeCurrentShark = (newSharkName: string) =>
    ({
        type: SharkRandomActionType.CHANGE_CURRENT_SHARK,
        sharkName: newSharkName
    });

export { SharkRandomAction, SharkRandomActionType, changeCurrentShark, initSharkList };
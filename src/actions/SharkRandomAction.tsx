import { Action } from 'redux';

enum SharkRandomActionType {
    CHANGE_CURRENT_SHARK,
    CLEAR_CURRENT_SHARK
}

interface SharkRandomAction extends Action {
    type: SharkRandomActionType;
    sharkName: string;
}

const changeCurrentShark = (newSharkName: string) =>
    ({
        type: SharkRandomActionType.CHANGE_CURRENT_SHARK,
        sharkName: newSharkName
    });

export { SharkRandomAction, SharkRandomActionType, changeCurrentShark };
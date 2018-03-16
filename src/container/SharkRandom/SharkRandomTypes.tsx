type SharkRandomState  = {
    sharks_list: string[],
    sharkName?: string | undefined
};

type SharkRandomProps = {
    changeCurrentShark?: any | undefined,
    sharks_list: string[],
    sharkName?: string | undefined
};

export {SharkRandomState, SharkRandomProps};
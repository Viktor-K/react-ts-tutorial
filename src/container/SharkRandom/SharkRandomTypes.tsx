type SharkRandomState  = {
    sharksList: string[],
    sharkName?: string | undefined
    store?: object | undefined,
    changeCurrentShark?: Function
};

type SharkRandomProps = {
    changeCurrentShark?: any | undefined,
    initSharkList?: any | undefined,
    sharksList: string[],
    sharkName?: string | undefined
};

export {SharkRandomState, SharkRandomProps};
import { SocialAction, SocialActionType } from '../actions/SocialAction';
import { SocialState } from '../container/Social/SocialTypes';

const defaultSocialState: SocialState = {
    isFetching: false,
    socialContent: undefined
};

function SocialReducer(state: any = defaultSocialState, action: SocialAction): SocialState | SocialState[] {
    switch (action.type) {

        case SocialActionType.WAIT_REQUEST:
            return {
                ...state,
                isFetching: !state.isFetching
            };

        case SocialActionType.SHOW_ERROR:
            return Object.assign({}, state, {
                error: action.error,
                socialContent: undefined,                
                isFetching: false
            });
        case SocialActionType.SHOW_SOCIAL_RESULT:
            return Object.assign({}, state, {
                socialContent: action.response,
                error: undefined,                
                isFetching: false
            });

        default: return state;
    }
}

export default SocialReducer;
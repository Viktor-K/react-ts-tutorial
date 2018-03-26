import SocialReducer from '../reducers/SocialReducer';
import { SocialAction, SocialActionType } from '../actions/SocialAction';
import { SocialState } from '../container/Social/SocialTypes';

test('Test action WAIT_REQUEST', () => {    
    const action: SocialAction = { type: SocialActionType.WAIT_REQUEST };

    expect(SocialReducer({}, action)).toEqual({
        error: undefined,
        socialContent: undefined,
        isFetching: true
    });
});

test('Test action SHOW_ERROR', () => {
    const error: Object = {
        statusText: 'Internal Server Error',
        statusCode: '503'
    };

    const previousState: SocialState = {
        isFetching: true
    };

    const action: SocialAction = {
        type: SocialActionType.SHOW_ERROR,
        error: error
    };

    expect(SocialReducer(previousState, action)).toEqual({
        error: error,
        socialContent: undefined,
        isFetching: false
    });
});

test('Test action SHOW_SOCIAL_RESULT', () => {
    const response: Object = {
        content: 'Response Content'
    };

    const previousState: SocialState = {
        isFetching: true
    };

    const action: SocialAction = {
        type: SocialActionType.SHOW_SOCIAL_RESULT,
        response: response
    };

    expect(SocialReducer(previousState, action)).toEqual({
        error: undefined,
        socialContent: response,
        isFetching: false
    });
});

import { Action } from 'redux';
import * as _ from 'lodash';
import axios from 'axios';

const PROXY_SERVERS = ['http://cors-anywhere.herokuapp.com', 'https://crossorigin.me'];

enum SocialActionType {
    SHOW_SOCIAL_RESULT = 'SHOW_SOCIAL_RESULT',
    WAIT_REQUEST = 'WAIT_REQUEST',
    SHOW_ERROR = 'SHOW_ERROR'
}

interface SocialAction extends Action {
    type: SocialActionType;
    response?: object;
    error?: object;
}

const CATEGORY_TO_KEYWORD = {
    'general': 'web',
    'images': 'images',
    'news': 'news',
    'social': 'social'
};

// ================================================================
//                      Action creators
// ================================================================

const fetching = (): SocialAction => ({ type: SocialActionType.WAIT_REQUEST });

const showResult = (res: any): SocialAction => ({ type: SocialActionType.SHOW_SOCIAL_RESULT, response: res });

const showError = (err: any): SocialAction => ({ type: SocialActionType.SHOW_ERROR, error: err });

const fetchSocialContent = () => { // Perform a GET API request 
    return function (dispatch: any) {

        const query = 'instagram%20discoversharks';
        const targetUrl = `https://api.qwant.com/api/search/${CATEGORY_TO_KEYWORD.general}?count=5&offset=0&f=&q=${query}`;
        const requestUrl = `${PROXY_SERVERS[_.random(0, 1)]}/${targetUrl}`;

        dispatch(fetching()); // use to show loader meanwhile wait response

        axios.get(requestUrl)
            .then((res) => {                    
                    dispatch(
                        showResult(
                            _.get(res, 'data.data.result.items[0]', [`no result for ${query}`])
                        )
                    );
                }
            )
            // .then((res) => dispatch(showResult(res)))
            .catch((err) => dispatch(showError(err)));
    };
};

export { SocialAction, SocialActionType, fetchSocialContent };
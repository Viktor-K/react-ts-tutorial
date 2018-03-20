type SocialState = {
    socialContent?: object | undefined,
    error?: object | undefined,
    isFetching: boolean
};

type QwantSocialResponse = {
    title?: string,
    favicon?: string,
    url?: string,
    source?: string,
    desc?: string,
    _id?: string,
    position: number
};

type SocialProps = {
    socialContent?: QwantSocialResponse | undefined,
    error?: object | undefined,
    isFetching: boolean,
    requireSocialContent?: any | undefined,
    loadResult?: any | undefined,
    showError?: any | undefined,    
};

export {SocialProps, SocialState};
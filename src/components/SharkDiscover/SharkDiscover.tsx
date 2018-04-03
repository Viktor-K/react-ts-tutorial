import * as React from 'react';
import * as _ from 'lodash';
import './SharkDiscover.css';
import { SharksProps, SharksState } from './SharkDiscoveryTypes';
import Loader from '../Loader/Loader';
import InitSearch from 'material-ui/svg-icons/file/file-upload';

const axios = require('axios');
const Glyphicon = require('react-bootstrap/lib/Glyphicon');
const DEFAULT_SHARK_IMG = 'https://cdn.onlinewebfonts.com/svg/img_74287.png';
const PROXY_SERVERS = ['http://cors-anywhere.herokuapp.com', 'https://crossorigin.me'];
const ATTENDIBLE_IMG_SITE = 'http://www.arkive.org';

// SharksDiscover is rapresentional component, is not connect to Redux Store,is written as pure react component
class SharksDiscover extends React.Component<SharksProps, SharksState> {

    constructor(props: SharksProps) {
        super(props);
        this.state = { // State inner component
            sharkName: props.sharkName,
            sharkImgUrl: undefined
        };
    }

    setComponentState( // Example of signature type usages
        nextState: SharksState | ((state: SharksState, props: SharksProps | null) => SharksState | null),
        callBack?: Function
    ) {
        this.setState(nextState, () => { if (typeof callBack === 'function') { callBack.bind(this)(); } });
    }

    componentWillReceiveProps(nextProps: SharksProps, nextState: SharksState) {
        if (nextProps.sharkName !== this.props.sharkName) {
            this.setComponentState(
                {
                    sharkName: nextProps.sharkName,
                    sharkImgUrl: undefined
                },
                this.fetchSharkImage
            );
            this.render(); // With this we can see loader 
        }
    }

    fetchSharkImage() {
        let self = this;
        const { sharkName } = self.state;

        if (typeof sharkName === 'string') {
            const targetUrl = `http://api.qwant.com/api/search/images?count=10&offset=1&q=${sharkName}%20arkive.org`;
            const requestUrl = `${PROXY_SERVERS[_.random(0, 1)]}/${targetUrl}`;

            axios.get(`${requestUrl}`)
                .then(function (response: object) {
                    let newSharkImg = DEFAULT_SHARK_IMG;
                    let results: object[] = _.get(response, 'data.data.result.items', []);

                    if (results.length > 0) {
                        let foundByAttendibleImgSite: object | undefined = _.find(results, item => _.get(item, 'url') === ATTENDIBLE_IMG_SITE);
                        newSharkImg = (foundByAttendibleImgSite) ? _.get(foundByAttendibleImgSite, 'media') : _.get(results[0], 'media');
                    }

                    self.setComponentState((prevState, props) => ({ sharkImgUrl: newSharkImg }));
                })
                .catch(function (error: object) {
                    self.setComponentState((prevState, props) => ({ sharkImgUrl: DEFAULT_SHARK_IMG }));
                });
        }
    }

    renderSharkImage(sharkImgUrl: string | undefined) {
        if (typeof sharkImgUrl === 'string') {
            return (
                <div className="img-container">
                    {(sharkImgUrl === DEFAULT_SHARK_IMG)
                        ? (
                            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                <Glyphicon style={{ margin: '1em', color: 'red', fontSize: '2em' }} glyph="eye-close">
                                    <span style={{ marginLeft: '10px' }}>Image not available</span>
                                </Glyphicon>
                                <img style={{ boxShadow: 'none' }} src={sharkImgUrl} />
                            </div>
                        )
                        : <img src={sharkImgUrl} />}
                </div>
            );
        } else {
            return (<Loader />);
        }
    }

    render() {
        let { sharkName, sharkImgUrl } = this.state;
        let linkRef: string = `http://images.google.com/images?q=${sharkName}`;

        if (sharkName) {
            return (
                <div className="discovered-shark-container">
                    <div className="discovered-box">
                        <div className="discovered-msg-container">
                            <div className="discovered-label"> You have discovered : </div>
                            <a target="_blank" href={linkRef} className="discovered-button">
                                <span style={{ fontSize: '3em', textDecoration: 'underline' }}> {sharkName} </span>
                                <i> click to search more photos</i>
                            </a>
                        </div>
                        {this.renderSharkImage(sharkImgUrl)}
                    </div>
                </div>
            );
        } else {
            return (
                <div className="discovered-shark-container">
                    <div className="discovered-box">
                        <div className="discovered-msg-container">
                            <div className="discovered-label"> <i>Click to start</i> <InitSearch style={{ color: 'whitesmoke' }} /> </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default SharksDiscover;
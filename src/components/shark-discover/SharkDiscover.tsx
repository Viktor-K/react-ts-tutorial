import * as React from 'react';
import * as _ from 'lodash';
import './SharkDiscover.css';
let Glyphicon = require('react-bootstrap/lib/Glyphicon');
const axios = require('axios');

// const XCORS_HEADERS = {
//     headers: {
//         'Access-Control-Allow-Origin': '*',
//         'Access-Control-Allow-Methods': 'GET',
//         'Access-Control-Allow-Credentials': true,
//         'Access-Control-Allow-Headers': 'Content-Type'
//     }
// };
const DEFAULT_SHARK_IMG = 'https://cdn.onlinewebfonts.com/svg/img_74287.png';

function printLog(msg: string) {
    console.log(`DEBUG : ${msg}`);
}

type SharksProps = {
    sharkName: string | undefined
};

type SharksState = {
    sharkName: string | undefined,
    sharkImgUrl: string | undefined
};

class SharksDiscover extends React.Component<SharksProps, SharksState> {

    constructor(props: SharksProps) {
        super(props);
        this.state = {
            sharkName: props.sharkName,
            sharkImgUrl: undefined
        };
    }

    componentWillReceiveProps(nextProps: SharksProps, nextState: SharksState) {
        if (nextProps.sharkName !== this.props.sharkName) {
            printLog(`Props updated with props ${JSON.stringify(nextProps)}`);
            this.setState(
                {
                    sharkName: nextProps.sharkName,
                    sharkImgUrl: undefined
                },
                this.fetchSharkImage
            );
            this.render();
        }
    }

    fetchSharkImage() {
        let self = this;
        const { sharkName } = self.state;
        printLog(`Fetch Shark image perform search : ${JSON.stringify(this.state)}`);

        if (typeof sharkName === 'string') {
            let targetUrl = `http://api.qwant.com/api/search/images?count=100&offset=1&q=${sharkName}%arkive.org`;

            // const proxyUrl = `http://cors-anywhere.herokuapp.com/${targetUrl}`;
            const proxyUrl = `https://crossorigin.me/${targetUrl}`;

            printLog(`perform search : ${proxyUrl}`);
            axios.get(`${proxyUrl}`)
                .then(function (response: object) {
                    let results: object[] = _.get(response, 'data.data.result.items', []);
                    if (results.length > 0) {

                        let found: object = _.find(results, (item => {
                            return _.get(item, 'url') === 'http://www.arkive.org';
                        }));

                        if (found) {
                            alert('Found by arkive.org');
                            self.setState((prevState, props) => ({
                                sharkImgUrl: _.get(found, 'media')
                            }));
                        } else {
                            self.setState((prevState, props) => ({
                                sharkImgUrl: _.get(results[0], 'media')
                            }));
                        }
                    } else {
                        self.setState((prevState, props) => ({
                            sharkImgUrl: DEFAULT_SHARK_IMG
                        }));
                    }
                })
                .catch(function (error: object) {
                    self.setState((prevState, props) => ({
                        sharkImgUrl: DEFAULT_SHARK_IMG
                    }));
                    printLog(`ERRORS occurred : ${error}`);
                });
        }
    }

    renderSharkImage(sharkImgUrl: string | undefined) {
        if (typeof sharkImgUrl === 'string') {
            let imgTag = (sharkImgUrl === DEFAULT_SHARK_IMG)
                ? (
                    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                        <Glyphicon style={{margin: '1em', color: 'red', fontSize: '2em'}} glyph="eye-close">                        
                            <span style={{marginLeft: '10px'}}>Image not available</span>
                        </Glyphicon>
                        <img style={{boxShadow: 'none'}} src={sharkImgUrl} />                    
                    </div>)
                :  <img src={sharkImgUrl} />;

            return (
                <div className="img-container">                    
                    {imgTag}
                </div>
            );
        } else {
            return (
                <div id="preloader" className="img-container">
                    <div id="loader" />
                </div>
            );
        }

    }

    render() {
        let { sharkName, sharkImgUrl } = this.state;
        let linkRef: string = `http://images.google.com/images?q=${sharkName}`;

        return (
            <div className="shark-container">
                <div className="discovered-box">
                    <div className="discovered-msg-container">
                        <div className="discovered-label"> You have discovered : </div>
                        <a target="_blank" href={linkRef} className="discovered-button">
                            <span style={{ textDecoration: 'underline' }}>{sharkName}</span>
                            <i> click to search more photos</i>
                        </a>
                    </div>
                    {this.renderSharkImage(sharkImgUrl)}
                </div>
            </div>
        );
    }
}

export default SharksDiscover;
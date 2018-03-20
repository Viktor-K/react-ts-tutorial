import * as React from 'react';
import * as _ from 'lodash';
import { SocialProps, SocialState } from './SocialTypes';
import { connect } from 'react-redux';
import { fetchSocialContent } from '../../actions/SocialAction';
import Loader from '../../components/Loader/Loader';
import './Social.css';
const Parser = require('html-react-parser');
const Glyphicon = require('react-bootstrap/lib/Glyphicon');

class Social extends React.Component<SocialProps, {}> {

    render() {
        const { isFetching, socialContent, error, requireSocialContent } = this.props;
        const title = (Object.assign({ title: '<b>Missing Title</b>' }, socialContent).title);
        const loader = (isFetching) ? <div> <Loader /> </div> : undefined;

        const button = (!isFetching && !error && !socialContent) ? (
            <button onClick={requireSocialContent}>
                <Glyphicon style={{ margin: '1em', color: 'blue', fontSize: '1.5em' }} glyph="globe" />
                <i> Find social profile </i>
            </button>
        ) : undefined;

        const content = (!isFetching && socialContent)
            ? (
                <div className="social-content">
                    <img src={socialContent.favicon} />
                    <div> {Parser(title)} <br /> <a href={socialContent.url}>{Parser(socialContent.source)} </a> </div>
                </div>
            )
            : undefined;

        const errorMsg = (!isFetching && error)
            ? (
                <pre className="error-label" style={{cursor: 'pointer'}} onClick={requireSocialContent}>
                    {`${_.get(error, 'response.status')} : ${_.get(error, 'response.statusText')}`}
                    <Glyphicon style={{ margin: '1em', color: 'blue', fontSize: '1.5em' }} glyph="repeat"> 
                        <span>Retry</span> 
                    </Glyphicon>
                </pre> 
            )
            : undefined;

        return (
            <div className="social-content-component">
                <div className="social-content-container">
                    {button} 
                    {loader}
                    {content}
                    {errorMsg}
                </div >
            </div>
        );
    }
}

function mapStateToProps(store: { SocialContentState: SocialState }) {
    return {
        isFetching: store.SocialContentState.isFetching,
        socialContent: store.SocialContentState.socialContent,
        error: store.SocialContentState.error
    };
}

function mapDispatchToProps(dispatch: any) {
    return {
        requireSocialContent: () => dispatch(fetchSocialContent())
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Social as any);
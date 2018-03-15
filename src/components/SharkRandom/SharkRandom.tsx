import * as React from 'react';
import * as _ from 'lodash';
import './SharkRandom.css';
import SharkDiscovery from '../SharkDiscover/SharkDiscover';
import SharkList from '../../files/sharks_list';
import SharkRandomState from './SharkRandomTypes';
let Glyphicon = require('react-bootstrap/lib/Glyphicon');

class SharkRandom extends React.Component<{}, SharkRandomState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            sharks_list: Object.assign([], SharkList),
            curShark: undefined
        };
    }

    discoverNewShark = (): void => this.setState(this.guessNewShark());

    guessNewShark(): SharkRandomState {
        let { sharks_list } = this.state;
        const newShark = sharks_list[_.random(0, sharks_list.length)];

        return {
            curShark: (sharks_list.length === 1) ? sharks_list[0] : newShark,
            sharks_list: (sharks_list.length === 1) ? sharks_list : Object.assign([], _.without(sharks_list, newShark))
        };
    }
    
    componentDidMount() {
        this.discoverNewShark();
        this.render();
    }

    renderDiscoverbutton() {
        const { sharks_list } = this.state;
        const disabled: boolean = sharks_list.length < 2;
        const btnClasses: string = (disabled) ? 'disabled-btn discover-box' : 'discover-box';
        const label: string = (disabled) ? 'Well Done now you are shark\'s expert!' : 'Discover New Shark click here!';

        return (
            <button disabled={disabled} className={btnClasses} onClick={this.discoverNewShark}>
                <div> Shark to discover
                    <span style={{ padding: '5px', fontSize: '2em', fontWeight: 'bold' }}> {sharks_list.length} / {SharkList.length} </span>
                </div>
                <div className="discover-button">
                    {label} <Glyphicon glyph="search" />
                </div>
            </button>
        );
    }

    render() {
        const { curShark } = this.state;
        return (
            <div className="discover-container">
                {this.renderDiscoverbutton()}
                <SharkDiscovery sharkName={curShark} />
            </div>
        );
    }
}

export default SharkRandom;
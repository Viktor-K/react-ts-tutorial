import * as React from 'react';
import * as _ from 'lodash';
import './SharkRandom.css';
import SharkDiscovery from '../shark-discover/SharkDiscover';
import SharkList from '../../files/sharks_list';

let Glyphicon = require('react-bootstrap/lib/Glyphicon');
let list: string[] = Object.assign([], SharkList);

type SharkRandomState = {
    sharks_list: string[],
    curShark: string | undefined
};

class SharkRandom extends React.Component<{}, SharkRandomState> {
    state: SharkRandomState = {
        sharks_list: list,
        curShark: undefined
    };

    drawsShark(): SharkRandomState {
        if (list.length === 0) {
            return {
                curShark: list[0],
                sharks_list: list
            };
        }

        if (list.length === 1) {
            return {
                curShark: list[0],
                sharks_list: list
            };
        }

        let index = _.random(0, list.length);
        const curShark = list[index];
        list = Object.assign([], _.without(list, curShark));

        return {
            sharks_list: list,
            curShark: curShark
        };
    }

    discoverNewShark = (): void => {
        this.setState(this.drawsShark());
    }

    componentDidMount() {
        this.discoverNewShark();
        this.render();
    }

    renderGrowbutton() {
        const { sharks_list } = this.state;
        const disabled: boolean = sharks_list.length < 2;

        let btnCss: string = (disabled) ? 'disabled-btn discover-box' : 'discover-box';
        let label: string = (disabled) ? 'Well Done now you are shark\'s expert!' : 'Discover New Shark click here!';

        return (
            <button disabled={disabled} className={btnCss} onClick={this.discoverNewShark}>                
                <div> Shark to discover  
                    <span style={{padding: '5px', fontSize: '2em', fontWeight: 'bold'}}>
                        {sharks_list.length} / {SharkList.length}
                    </span>
                </div>
                <div className="discover-button">
                    {label}
                    <div>
                        <Glyphicon glyph="search"/>
                    </div>
                </div>
            </button>
        );
    }

    render() {
        const { curShark } = this.state;

        return (
            <div className="discover-container">
                {this.renderGrowbutton()}
                
                <SharkDiscovery sharkName={curShark} />
            </div>
        );
    }
}

export default SharkRandom;
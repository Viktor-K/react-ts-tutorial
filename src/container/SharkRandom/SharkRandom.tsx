import * as React from 'react';
import * as _ from 'lodash';
import './SharkRandom.css';
import SharkDiscovery from '../../components/SharkDiscover/SharkDiscover';
import SharkList from '../../files/sharks_list';
import { SharkRandomState, SharkRandomProps, } from './SharkRandomTypes';
import { connect } from 'react-redux';
import { changeCurrentShark } from '../../actions/SharkRandomAction';
let Glyphicon = require('react-bootstrap/lib/Glyphicon');

class SharkRandom extends React.Component<SharkRandomProps, SharkRandomState>  {
    // With REDUX construct is NOT necessary state are initialized with redux store. All required data is mapped on props.
    // constructor(props: SharkRandomProps) {
    //     super(props);        
    //     console.log('Constructor');
    //     this.state = {
    //         sharks_list: props.sharks_list, // Object.assign([], SharkList),
    //         sharkName: undefined
    //     };
    // }

    // Without REDUX we must update component state, after state modify react update his presentational component child SharkDiscover
    // discoverNewShark = (): void => this.setState(this.guessNewShark()); 

    discoverNewShark = (): void => {
        let newState: SharkRandomState = this.guessNewShark();
        this.props.changeCurrentShark(newState.sharkName); // With REDUX we can use dispatch for send an action to reducer        
    }

    guessNewShark(): SharkRandomState {
        let { sharks_list } = this.props;
        const newSharkName = sharks_list[_.random(0, sharks_list.length)];

        return {
            sharkName: (sharks_list.length === 1) ? sharks_list[0] : newSharkName,
            // USELESS - Reducer implement this logic
            sharks_list: (sharks_list.length === 1) ? sharks_list : Object.assign([], _.without(sharks_list, newSharkName))
        };
    }

    // Init this container component when mount for first time
    componentDidMount() {
        this.discoverNewShark();
        this.render();
    }

    renderDiscoverbutton() {
        const { sharks_list } = this.props;
        const sharkToBeDescover = sharks_list.length;
        const disabled: boolean = sharkToBeDescover < 2;
        const btnClasses: string = (disabled) ? 'disabled-btn discover-box' : 'discover-box';
        const label: string = (disabled) ? 'Well Done now you are shark\'s expert!' : 'Discover New Shark click here!';

        return (
            <button disabled={disabled} className={btnClasses} onClick={this.discoverNewShark}>
                <div className="discover-remain">
                    Shark to discover
                    <span> {sharkToBeDescover} / {SharkList.length} </span>
                </div>
                <div className="discover-button">
                    <span className="discover-button-label">{label}</span>
                    <Glyphicon className="search-icon" glyph="search" />
                </div>
            </button>
        );
    }

    render() {
        const { sharkName } = this.props;
        return (
            <div className="discover-container">
                {this.renderDiscoverbutton()}
                <SharkDiscovery sharkName={sharkName} />
            </div>
        );
    }
}

function mapStateToProps(store: any) {
    return {
        sharkName: store.sharkListState.sharkName, // SharkRandom needs of sharkListState, a ub property of store
        sharks_list: store.sharkListState.sharks_list
    };
}

function mapDispatchToProps(dispatch: any) {
    return {
        changeCurrentShark: (sharkname: string) => dispatch(changeCurrentShark(sharkname))        
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SharkRandom as any);
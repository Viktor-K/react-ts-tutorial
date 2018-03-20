import * as React from 'react';
import * as _ from 'lodash';
import './SharkRandom.css';
import SharkDiscovery from '../../components/SharkDiscover/SharkDiscover';
import SharkList from '../../files/sharks_list';
import { SharkRandomState, SharkRandomProps, } from './SharkRandomTypes';
import { connect } from 'react-redux';
import { initSharkList, changeCurrentShark } from '../../actions/SharkRandomAction';
let Glyphicon = require('react-bootstrap/lib/Glyphicon');

class SharkRandom extends React.Component<SharkRandomProps, SharkRandomState>  {
    // With REDUX construct is NOT necessary state are initialized with redux store. All required data is mapped on props.
    // constructor(props: SharkRandomProps) {
    //     super(props);        
    //     console.log('Constructor');
    //     this.state = {
    //         sharksList: props.sharksList, // Object.assign([], SharkList),
    //         sharkName: undefined
    //     };
    // }

    // Without REDUX we must update component state, after state modify react update his presentational component child SharkDiscover
    // discoverNewShark = (): void => this.setState(this.guessNewShark()); 

    discoverNewShark = (): void => {
        let newShark: string = this.guessNewShark();
        this.props.changeCurrentShark(newShark); // With REDUX we can use dispatch for send an action to reducer        
    }

    guessNewShark(): string {
        let { sharksList } = this.props;
        const newSharkName = sharksList[_.random(0, sharksList.length)];
        return (sharksList.length === 1) ? sharksList[0] : newSharkName;
    }

    // Init this container component when mount for first time
    componentDidMount() {
        this.props.initSharkList();
        this.discoverNewShark();        
    }

    renderDiscoverbutton() {
        const { sharksList } = this.props;
        const sharkToBeDescover = sharksList.length;
        const discoverIsEnd: boolean = sharkToBeDescover < 2;
        const btnClasses: string = (discoverIsEnd) ? 'disabled-btn discover-box' : 'discover-box';
        const label: string = (discoverIsEnd) ? 'Well Done now you are shark\'s expert!' : 'Discover New Shark click here!';

        return (
            <button disabled={discoverIsEnd} className={btnClasses} onClick={this.discoverNewShark}>
                <div className="discover-remain">
                    <div>Shark to discover</div>
                    <span> {sharkToBeDescover} / {SharkList.length} </span>
                </div>
                <div className="discover-button">
                    <span className="discover-button-label">{label}</span>
                    {(!discoverIsEnd) ? <Glyphicon className="search-icon" glyph="search" /> : ''}
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
    // SharkRandom container component needs of SharkListState(a sub property of store)
    return {        
        sharkName: store.SharkListState.sharkName, 
        sharksList: store.SharkListState.sharksList
    };
}

function mapDispatchToProps(dispatch: any) {
    return {
        changeCurrentShark: (sharkname: string) => dispatch(changeCurrentShark(sharkname)),
        initSharkList: () => dispatch(initSharkList())
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SharkRandom as any);
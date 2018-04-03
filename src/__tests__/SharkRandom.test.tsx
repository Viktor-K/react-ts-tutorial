import * as React from 'react';
import * as _ from 'lodash';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import sinon = require('sinon');
import configureStore from 'redux-mock-store'; // ES6 modules
// const { configureStore } = require('redux-mock-store') // CommonJS version
import SharkRandom from '../container/SharkRandom/SharkRandom';
import SharkDiscovery from '../components/SharkDiscover/SharkDiscover';
import { SharkRandomState } from '../container/SharkRandom/SharkRandomTypes';
import { initSharkList, changeCurrentShark, SharkRandomActionType, SharkRandomAction } from '../actions/SharkRandomAction';
import { MuiThemeProvider } from 'material-ui/styles';
type DiscoverySharkStore = { SharkListState: SharkRandomState };

const sandbox = sinon.createSandbox();
const mockStore = configureStore();
const defaultState: DiscoverySharkStore = {
    SharkListState: {
        sharkName: undefined,
        sharksList: ['Tiger Shark', 'White Shark', 'Mako Shark']
    }
};
let store: any;

afterAll(() => sandbox.restore());
beforeEach(() => {
    store = mockStore(defaultState);
});

describe('SharkRandom container test', () => {

    it('Should init redux store after componentDidMount', () => {
        sinon.spy(SharkRandom.prototype, 'componentDidMount');
        const changeCurrentSharkSpy = sinon.spy(changeCurrentShark);
        const spyStore = sinon.stub(store, 'dispatch');
        spyStore.callsFake((action: SharkRandomAction) => {
            if (action.type === SharkRandomActionType.INIT_SHARKS_LIST) {
                store = mockStore({
                    SharkListState: {
                        sharkName: defaultState.SharkListState.sharksList[0],
                        sharklist: defaultState.SharkListState.sharksList.slice(1, defaultState.SharkListState.sharksList.length)
                    }
                });
            }
            if (action.type === SharkRandomActionType.CHANGE_CURRENT_SHARK) {
                store = mockStore({
                    SharkListState: {
                        sharkName: changeCurrentSharkSpy.args[0],
                        sharklist: _.without(defaultState.SharkListState.sharksList, action.sharkName)
                    }
                });
            }
        });

        // const renderedComponent = shallow(<SharkRandom store={store} />).dive();
        const renderedComponent = mount(<Provider store={store}><MuiThemeProvider> <SharkRandom /></MuiThemeProvider></Provider>);

        expect(renderedComponent.find('.discover-button-label').text()).toBe('Discover New Shark click here!');
        expect(renderedComponent.find('.discover-remain').text()).toBe('Shark to discover 3 / 534 ');

        // TEST child props not initialized
        const childElementProps = renderedComponent.find(SharkDiscovery).props();
        expect(childElementProps).toEqual({});

        // TEST COMPONENT INITIALIZATION
        expect(SharkRandom.prototype.componentDidMount.calledOnce).toBe(true);
        expect(spyStore.called).toBeTruthy();
        expect(spyStore.getCalls().length).toBe(1);
        expect(spyStore.getCall(0)).toBeDefined();
        expect(spyStore.getCall(0).args[0]).toEqual(initSharkList());

        // TEST OMPONEN BEHAVIOUR 
        renderedComponent.find('button').simulate('click');
        expect(spyStore.getCalls().length).toBe(2);

        const actionInitSharkList = spyStore.getCall(0).args[0];
        expect(actionInitSharkList).toEqual({ 'type': SharkRandomActionType.INIT_SHARKS_LIST });

        const actionChangeCurrentShark = spyStore.getCall(1).args[0];
        expect(actionChangeCurrentShark.type).toEqual(SharkRandomActionType.CHANGE_CURRENT_SHARK);
        expect(defaultState.SharkListState.sharksList).toContain(actionChangeCurrentShark.sharkName);
    });

    it('Should render a SharkDiscovery child component', () => {
        const renderedComponent = mount(<Provider store={store}><MuiThemeProvider> <SharkRandom /></MuiThemeProvider></Provider>);
        expect(renderedComponent.length).toEqual(1);
        expect(renderedComponent.find('.discover-button-label').text()).toBe('Discover New Shark click here!');

        expect(renderedComponent.find(SharkDiscovery)).toHaveLength(1);
    });

    it('Should disable button if sharklist length is < 2', () => {
        defaultState.SharkListState.sharksList = ['Mako Shark'];
        store = mockStore(defaultState);

        const renderedComponent = mount(<Provider store={store}><MuiThemeProvider><SharkRandom /></MuiThemeProvider></Provider>);

        expect(renderedComponent.html()).toBeDefined();
        expect(renderedComponent.find('.discover-button-label')).toBeDefined();
        expect(renderedComponent.find('Glyphicon')).toBeDefined();
        expect(renderedComponent.find('.discover-button-label').text()).toBe('Well Done now you are shark\'s expert!');
    });
});
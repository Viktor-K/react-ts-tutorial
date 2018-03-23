import * as React from 'react';
import './MenuBar.css';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import CloseMenuIcon from 'material-ui/svg-icons/navigation/close';
import OpenMenuIcon from 'material-ui/svg-icons/navigation/menu';
import ListMenuIcon from 'material-ui/svg-icons/editor/format-list-bulleted';
import DiscoveryMenuIcon from 'material-ui/svg-icons/action/search';
import Drawer from 'material-ui/Drawer';
import MenuBarState from './MenuBarTypes';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import { Link } from 'react-router-dom';
import { Divider } from 'material-ui';

const logo = (<img src={require('../../../src/img/Discoversharks.png')} className="discover-shark-logo" alt="logo" />);
const iconOpenMenu = (<IconButton> <OpenMenuIcon color="rgb(4, 55, 99)" /> </IconButton>);
const iconCloseMenu = (<IconButton> <CloseMenuIcon color="rgb(4, 55, 99)" /> </IconButton>);

class MenuBar extends React.Component<{}, MenuBarState> {
    constructor(props: any) {
        super(props);
        this.state = { menuIsOpen: false };
    }

    handleToggle = () => this.setState({ menuIsOpen: !this.state.menuIsOpen });
    handleClose = () => this.setState({ menuIsOpen: false });

    render() {
        const menu = (
            <Drawer docked={false} width={200} open={this.state.menuIsOpen} onRequestChange={(menuIsOpen) => this.setState({ menuIsOpen })}>
                <Menu>
                    <MenuItem onClick={this.handleToggle} style={{ fontSize: '0.8em', color: 'rgb(4, 55, 99)' }} leftIcon={<CloseMenuIcon />}/>
                    <Divider/>
                    <Link style={{textDecoration: 'none'}} to="/">
                        <MenuItem onClick={this.handleToggle} style={{ fontSize: '0.8em', color: 'rgb(4, 55, 99)' }} leftIcon={<DiscoveryMenuIcon />} primaryText="Discovery Sharks" />
                    </Link>
                    <Link style={{textDecoration: 'none'}} to="/shark-list">
                        <MenuItem onClick={this.handleToggle} style={{ fontSize: '0.8em', color: 'rgb(4, 55, 99)' }} leftIcon={<ListMenuIcon />} primaryText="Shark List" />
                    </Link>
                </Menu>
            </Drawer>
        );

        return (
            <AppBar onLeftIconButtonClick={this.handleToggle} className="app-menu-bar" iconElementLeft={(this.state.menuIsOpen) ? iconCloseMenu : iconOpenMenu} iconElementRight={logo}>
                {menu}
            </AppBar>
        );
    }
}

export default MenuBar;
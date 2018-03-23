import * as React from 'react';
import './SharkList.css';
import SharkNameList from '../../files/sharks_list';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import ActionGrade from 'material-ui/svg-icons/image/lens';
// import { grey400, darkBlack, lightBlack } from 'material-ui/styles/colors';
import { lightBlack } from 'material-ui/styles/colors';

class SharkList extends React.Component<{}, {}>  {

    render() {
        return (
            <div className="shark-list-component">
                <div className="shark-list-container">
                    <List>
                        {
                            SharkNameList.map((name, index) => (
                                <div>
                                    <ListItem leftIcon={<ActionGrade color={lightBlack}/>} primaryText={index + 1} secondaryText={<p> {name} </p>} />
                                    <Divider />
                                </div>
                            ))
                        }
                    </List>
                </div>
            </div>
        );
    }
}

export default SharkList;
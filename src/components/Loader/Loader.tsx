import * as React from 'react';
import './Loader.css';

class Loader extends React.Component {
    render() {
        return (
            <div id="preloader" className="img-container">            
                <div id="loader" />
            </div>
        );
    }
}

export default Loader;
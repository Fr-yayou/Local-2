import React from 'react';
import ReactDOM from 'react-dom';
import App from "./component/App"
import Routes from "./component/Routes";
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Routes />, document.getElementById('root'));
serviceWorker.unregister();

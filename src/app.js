import './service-worker-registration';
import {app} from 'hyperapp';
import actions from './actions/somActions';
import state from './states/somState';
import view from './views/somView';

const {
	initInfo
} = app (
	state, 
	actions, 
	view, 
	document.body);

setTimeout(() => {
	axios.get('data/som-total.json?' + (new Date()).getTime())
      	.then(function(response) {
          console.log("SOOM:>", response.data); // ex.: { user: 'Your User'}
          initInfo( response.data);
  		})}, 100);
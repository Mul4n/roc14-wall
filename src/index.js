import React from 'react';
import ReactDOM from 'react-dom';
import GoogleData from './GoogleData';
import Voies from './voies';
import Mur from './Mur';

Promise.all([GoogleData.voies(), GoogleData.mur()]).then(([voies, mur]) => {
  ReactDOM.render((<><Mur/><Voies voies={voies}/></>), document.getElementById('root'));
});

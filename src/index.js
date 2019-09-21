import React from 'react';
import ReactDOM from 'react-dom';
import GoogleData from './GoogleData';
import VoiesList from './VoiesList';
import Mur from './Mur';

Promise.all([GoogleData.voies(), GoogleData.mur()]).then(([voies, mur]) => {
  ReactDOM.render((<><Mur/><VoiesList voies={voies}/></>), document.getElementById('root'));
});

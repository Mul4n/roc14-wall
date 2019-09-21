import React from 'react';
import ReactDOM from 'react-dom';
import GoogleData from './GoogleData';
import VoiesList from './VoiesList';

Promise.all([GoogleData.voies(), GoogleData.mur()]).then(([voies, mur]) => {
  ReactDOM.render(<VoiesList voies={voies}/>, document.getElementById('root'));
});

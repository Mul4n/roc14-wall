import React from 'react';
import Voie from './Voie';

export default class VoiesList extends React.Component {
  render() {
    return (
      <table>
        {this.props.voies.filter(({ cotation }) => !!cotation).map(voie => (<Voie voie={voie}/>)) }
      </table>
    );
  }
}
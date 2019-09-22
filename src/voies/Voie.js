import React from 'react';
import COLORS from '../../colors.json';

export default class Voie extends React.Component {
  computeColor(color) {
    return {
      backgroundColor: COLORS[color],
      color: COLORS[color]
    };
  }

  render() {
    return (<tr>
      <td>{this.props.voie.couloir}</td>
      <td>{this.props.voie.cotation}</td>
      <td style={this.computeColor(this.props.voie.couleur)}>{this.props.voie.couleur}</td>
      <td>{this.props.voie.nom}</td>
      <td>{this.props.voie.description}</td>
      <td>{this.props.voie.ouvreur}</td>
      <td>{this.props.voie.date}</td>
    </tr>);
  }
}
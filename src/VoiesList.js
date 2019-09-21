import React from 'react';
import COLORS from '../colors.json';
export default class VoiesList extends React.Component {
  computeColor(color) {
    return {
      backgroundColor: COLORS[color],
      color: COLORS[color]
    };
  }
  structureVoie(voie) {
    return (<tr>
      <td>{voie.couloir}</td>
      <td>{voie.cotation}</td>
      <td style={this.computeColor(voie.couleur)}>{voie.couleur}</td>
      <td>{voie.nom}</td>
      <td>{voie.description}</td>
      <td>{voie.ouvreur}</td>
      <td>{voie.date}</td>
    </tr>);
  }
  render() {
    return (<table>{ this.props.voies.map((voie) => this.structureVoie(voie)) }</table>);
  }
}
import React from 'react';

export default class VoiesList extends React.Component {
  structureVoie(voie) {
    return (<tr>
      <td>{voie.couloir}</td>
      <td>{voie.cotation}</td>
      <td>{voie.couleur}</td>
      <td>{voie.nom}</td>
      <td>{voie.description}</td>
      <td>{voie.ouvreur}</td>
    </tr>);
  }
  render() {
    return (<table>{ this.props.voies.map(this.structureVoie) }</table>);
  }
}
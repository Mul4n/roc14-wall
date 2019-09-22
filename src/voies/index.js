import React from 'react';
import VoiesList from './VoiesList';

export default class Voies extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      voies: props.voies
    };
  }

  onChange(value) {
    this.setState({ voies: this.props.voies.filter(voie => voie.cotation.includes(value)) });
  }
  render() {
    return (
        <>
        <div><p>{`Cotation (${this.state.voies.length})`}</p><input type='text' onChange={e => this.onChange(e.target.value)}/></div>
        <VoiesList voies={this.state.voies}/>
      </>
    );
  }
}
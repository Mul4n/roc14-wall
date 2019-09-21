import React from 'react';
import murImage from '../assets/mur.png';
import { width, height, couloirs } from '../couloirs.json';

export default class Mur extends React.Component {
createCouloirs(couloirs, height) {
  return couloirs
    .reduce((acc, coord, index) => {
      if(!acc[0]) {
        acc.push([,coord]);
        return acc;
      }

      acc.push([ acc[acc.length -1][1], coord, index ]);
      return acc;
    }, []).slice(1) // We remove the initialisation couloir that is not needed on the image
    .map(([left, right, index]) => (
      <div
        id={`couloir-${index}`}
        style={{position: 'absolute', height, left, width: (right - left)}}
      />
    ));
}

  render() {
    return (
      <div style={{background: `url(${murImage})`, width: `${width}px`, height: `${height}px`, backgroundSize: 'cover'}}>
        {this.createCouloirs(couloirs, height)}
      </div>
    )
  }
}
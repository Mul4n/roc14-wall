import {apiKey, voies, mur } from '../config.json';

export default class GoogleData {
  static voies() {
    return new Promise((resolve) => {
      gapi.load('client', async () => {
        await gapi.client.init({ apiKey });
        await gapi.client.load('sheets', 'v4');
        
        gapi.client.sheets.spreadsheets.values.get({
          spreadsheetId: voies.sheetId,
          range: voies.range
        }).then(({ result: { values } }) =>
          resolve(values.reduce((acc, [ couloir, cotation, couleur, nom, description, ouvreur, date ]) => {
          const augmentedVoie = {
            couloir: parseInt(couloir, 10),
            cotation,
            couleur,
            nom,
            description,
            ouvreur,
            date
          };
          
          acc.push(augmentedVoie);
          return acc;
        }, [])
        ))
      });
    });
  }
  static async mur() {
    return new Promise((resolve) => {
      gapi.load('client', async () => {
        await gapi.client.init({ apiKey });
        await gapi.client.load('sheets', 'v4');
        
        gapi.client.sheets.spreadsheets.values.get({
          spreadsheetId: mur.sheetId,
          range: mur.range
        }).then(({ result: { values } }) =>
          resolve(values.reduce((acc, [ couloir, secteur, profil, inclinaison ]) => {
          const augmentedPan = {
            couloir: parseInt(couloir, 10),
            secteur,
            profil,
            inclinaison
          };
          
          // le sheet ne contient que les couloirs où le pan change de type,
          // Il faut donc extrapoler les couloirs entre eux.
          const same = acc.length && acc[0].couloir - augmentedPan.couloir;
          if(!same) {
            acc.push(augmentedPan);
            return acc;
          } 
          const toAdd = [augmentedPan];
          for(let i = 1; i < same; i++) {
            const pan = { ...acc[0], couloir: (augmentedPan.couloir + i) }
            toAdd.push(pan);
          }
          
          acc.unshift(...toAdd);
          return acc;
        }, []))
        );
      });
    });
  }
}
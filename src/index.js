import {apiKey, voiesSheetId, murSheetId } from '../config.json';

gapi.load('client', async () => {
  await gapi.client.init({ apiKey });
  await gapi.client.load('sheets', 'v4');

  const [ voies, mur ] = await Promise.all([gapi.client.sheets.spreadsheets.values.get({
    spreadsheetId: voiesSheetId,
    range: 'A3:G166'
  }).then(({ result: { values } }) =>
    values.reduce((acc, [ couloir, cotation, couleur, nom, description, ouvreur, date ]) => {
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
  ), gapi.client.sheets.spreadsheets.values.get({
    spreadsheetId: murSheetId,
    range: 'A2:D27'
  }).then(({ result: { values } }) =>
    values.reduce((acc, [ couloir, secteur, profil, inclinaison ]) => {
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
    }, [])
  )]);

  console.log('whooo', voies, mur);
});
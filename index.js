import mower from '../mower';


mower.initialisation('5 5', '1 2 N').then(res => {
    mower.lunchSequence('LFLFLFLFF').then(resp => {
      console.log('resp', resp);
    });
  });
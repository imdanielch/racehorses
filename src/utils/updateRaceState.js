export const updateRaceState = currentState => {
  let newState = currentState.map(horse => ({
    ...horse,
    progress: horse.progress + Math.random() * 0.3,
  }));
  const finishers = newState.filter(horse => horse.progress >= 1);
  if (finishers.length > 0) {
    if (finishers.length > 1) {
      let largest = 0;
      for (let i = 0; i < finishers.length; i++) {
        if (newState[i].progress > largest) {
          largest = newState[i].progress;
        }
      }
      newState = newState.map(horse => ({
        ...horse,
        progress: horse.progress / largest,
      }));
    }
  }
  return newState;
};

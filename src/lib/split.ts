export function shuffle<T>(arr: T[]) {
  return [...arr].sort(() => Math.random() - 0.5);
}

export function testTrainSplit<T>(data: T[], testRatio = 0.25) {
  const shuffled = shuffle(data);
  const testSize = Math.floor(data.length * testRatio);
  return {
    test: shuffled.splice(0, testSize),
    train: shuffled.slice(testSize),
  };
}

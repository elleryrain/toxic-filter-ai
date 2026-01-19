import type { BinaryMetrics } from "./types";

export function binaryMetrics(
  yTrue: number[],
  yProb: number[],
  threshold = 0.5
): BinaryMetrics {
  let tp = 0,
    tn = 0,
    fp = 0,
    fn = 0;

  for (let i = 0; i < yTrue.length; i++) {
    const pred = (yProb[i] as number) >= threshold ? 1 : 0;
    const truth = yTrue[i];

    if (pred === 1 && truth === 1) tp++;
    else if (pred === 0 && truth === 0) tn++;
    else if (pred === 1 && truth === 0) fp++;
    else fn++;
  }

  const accuracy = (tp + tn) / (tp + tn + fp + fn);
  const precision = tp / (tp + fp || 1);
  const recall = tp / (tp + fn || 1);
  const f1 = (2 * precision * recall) / (precision + recall || 1);

  return { tp, tn, fp, fn, accuracy, precision, recall, f1 };
}

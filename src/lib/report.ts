import type { TSample } from "./types";

export function explainPredictions(
  test: TSample[],
  probs: number[],
  threshold = 0.6
) {
  let tp = 0,
    tn = 0,
    fp = 0,
    fn = 0;

  console.log("\n=== PREDICTIONS ON TEST ===");
  test.forEach((s, i) => {
    const p = probs[i];
    const pred = (p as number) >= threshold ? 1 : 0;
    const truth = s.label;

    let tag: "TP" | "TN" | "FP" | "FN";
    if (pred === 1 && truth === 1) {
      tag = "TP";
      tp++;
    } else if (pred === 0 && truth === 0) {
      tag = "TN";
      tn++;
    } else if (pred === 1 && truth === 0) {
      tag = "FP";
      fp++;
    } else {
      tag = "FN";
      fn++;
    }

    console.log(
      `[${tag}] true=${truth} pred=${pred} p_toxic=${(p as number).toFixed(
        3
      )} | ${s.text}`
    );
  });

  console.log("\nConfusion matrix counts:");
  console.log({ tp, tn, fp, fn, total: tp + tn + fp + fn });
}

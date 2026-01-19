import * as tf from "@tensorflow/tfjs-node";
import { getEmbedder } from "./lib/embedder";
import { testTrainSplit } from "./lib/split";
import { DATA as RU_DATASET } from "./data/dataset.ru";
import { createModel } from "./lib/model";
import { binaryMetrics } from "./lib/metrics";
import { explainPredictions } from "./lib/report";

async function main() {
  const embedder = await getEmbedder();
  const { train, test } = testTrainSplit(RU_DATASET);

  const xTrain = await embedder.embed(train.map((x) => x.text));
  const yTrain = tf.tensor2d(
    train.map((x) => x.label),
    [train.length, 1]
  );

  console.log("*".repeat(20));
  console.log("xTrain: ", xTrain);
  console.log("-".repeat(10));
  console.log("yTrain: ", yTrain);
  console.log("*".repeat(20));
  console.log("\n");
  const xTest = await embedder.embed(test.map((x) => x.text));
  const yTest = tf.tensor2d(
    test.map((x) => x.label),
    [test.length, 1]
  );
  console.log("*".repeat(20));
  console.log("xTest: ", xTest);
  console.log("-".repeat(10));
  console.log("yTest: ", yTest);
  console.log("*".repeat(20));

  const model = createModel();

  await model.fit(xTrain, yTrain, {
    epochs: 20,
    batchSize: 2,
  });

  const probs = Array.from(await (model.predict(xTest) as tf.Tensor).data());

  console.log(
    binaryMetrics(
      test.map((x) => x.label),
      probs,
      0.6
    )
  );
  explainPredictions(test, probs, 0.6);
  await model.save("file://./model");
}

main().then((err) => {
  console.error(err);
});

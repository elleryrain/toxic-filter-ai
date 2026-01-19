import * as tf from "@tensorflow/tfjs-node";
export function createModel(
  inputDim = 512,
  learningRate = 1e-3
): tf.LayersModel {
  const model = tf.sequential();

  model.add(
    tf.layers.dense({ inputShape: [inputDim], units: 64, activation: "relu" })
  );
  model.add(tf.layers.dropout({ rate: 0.2 }));
  model.add(tf.layers.dense({ units: 1, activation: "sigmoid" }));

  model.compile({
    optimizer: tf.train.adam(learningRate),
    loss: "binaryCrossentropy",
    metrics: ["accuracy"],
  });

  return model;
}

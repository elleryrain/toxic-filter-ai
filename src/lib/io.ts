import * as tf from "@tensorflow/tfjs-node";

export async function loadModel() {
  return tf.loadLayersModel("file://./model/model.json");
}

import * as tf from "@tensorflow/tfjs-node";
import * as fs from "fs";
import * as path from "path";
import { getEmbedder } from "./lib/embedder";
import { loadModel } from "./lib/io";

const THRESHOLD = 0.6;

async function main() {
  const filePath = path.join(process.cwd(), "text.txt");

  if (!fs.existsSync(filePath)) {
    console.error("File not found:", filePath);
    process.exit(1);
  }

  const raw = fs.readFileSync(filePath, "utf-8");
  const texts = raw
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);

  if (texts.length === 0) {
    console.log("File is empty");
    return;
  }

  console.log(`Loaded ${texts.length} texts\n`);

  const embedder = await getEmbedder();
  const model = await loadModel();

  const x = await embedder.embed(texts);

  const probs = Array.from(await (model.predict(x) as tf.Tensor).data());

  texts.forEach((text, i) => {
    const p = probs[i];
    const verdict = (p as number) >= THRESHOLD ? "TOXIC" : "OK";

    console.log(`[${verdict}] p_toxic=${(p as number).toFixed(3)} | ${text}`);
  });

  x.dispose();
  model.dispose();
}

main().catch(console.error);

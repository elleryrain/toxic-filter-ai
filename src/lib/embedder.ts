import * as use from "@tensorflow-models/universal-sentence-encoder";
let cached: use.UniversalSentenceEncoder | null = null;
export async function getEmbedder() {
  if (!cached) {
    cached = await use.load();
  }
  return cached;
}

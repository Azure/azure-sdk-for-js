// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { EnrichedThread } from "./types.ts";

/** A function that computes embeddings for an array of texts. */
export type Embedder = (texts: string[]) => Promise<number[][]>;

/**
 * Creates an embedder using @huggingface/transformers with a local ONNX model.
 * The model is downloaded and cached on first use.
 */
export async function createLocalEmbedder(
  modelName: string = "Xenova/all-MiniLM-L6-v2",
): Promise<Embedder> {
  const { pipeline } = await import("@huggingface/transformers");
  const extractor = await pipeline("feature-extraction", modelName, { dtype: "fp32" });

  return async (texts: string[]): Promise<number[][]> => {
    const results: number[][] = [];
    for (const text of texts) {
      const output = await extractor(text, { pooling: "mean", normalize: true });
      results.push(Array.from(output.data as Float32Array));
    }
    return results;
  };
}

/**
 * Extracts the text representation of a thread for embedding.
 * Uses all comment bodies (reviewer intent) plus a cleaned code context.
 */
export function threadToText(thread: EnrichedThread): string {
  // All comment bodies — the full conversation captures the theme better
  const conversation = thread.comments
    .map((c) => c.body)
    .join("\n")
    // Strip markdown noise: images, HTML tags, long code fences
    .replace(/!\[.*?\]\(.*?\)/g, "")
    .replace(/<[^>]+>/g, "")
    .replace(/```[\s\S]*?```/g, "(code)")
    .trim();

  const code = thread.targetLine?.trim() ?? "";
  // Truncate to stay within model's token window (~128 tokens for MiniLM)
  const truncated = conversation.slice(0, 400);
  return code ? `${truncated}\n\nCode: ${code}` : truncated;
}

/**
 * Computes embeddings for all threads, returning a map from threadUrl to vector.
 */
export async function embedThreads(
  threads: EnrichedThread[],
  embedder: Embedder,
  onProgress?: (done: number, total: number) => void,
): Promise<Map<string, number[]>> {
  const batchSize = 16;
  const result = new Map<string, number[]>();

  for (let i = 0; i < threads.length; i += batchSize) {
    const batch = threads.slice(i, i + batchSize);
    const texts = batch.map(threadToText);
    const vectors = await embedder(texts);

    for (let j = 0; j < batch.length; j++) {
      result.set(batch[j].threadUrl, vectors[j]);
    }

    onProgress?.(Math.min(i + batchSize, threads.length), threads.length);
  }

  return result;
}

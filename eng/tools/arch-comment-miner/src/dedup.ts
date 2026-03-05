// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { cosineDistance } from "./cluster.ts";
import type { EnrichedThread } from "./types.ts";

export interface DedupResult {
  /** Map from threadUrl to the canonical thread URL it duplicates, or null. */
  duplicates: Map<string, string | null>;
}

/**
 * Finds near-duplicate threads within each cluster.
 *
 * For each pair of threads in the same cluster, if their cosine similarity
 * exceeds the threshold, the later thread (by first comment date) is marked
 * as a duplicate of the earlier one.
 *
 * @param threads - All enriched threads.
 * @param embeddings - Map from threadUrl to embedding vector.
 * @param clusterAssignments - Map from threadUrl to cluster ID.
 * @param threshold - Cosine similarity threshold (default 0.92).
 */
export function dedup(
  threads: EnrichedThread[],
  embeddings: Map<string, number[]>,
  clusterAssignments: Map<string, number>,
  threshold: number = 0.92,
): DedupResult {
  const duplicates = new Map<string, string | null>();
  for (const t of threads) {
    duplicates.set(t.threadUrl, null);
  }

  // Group threads by cluster
  const clusters = new Map<number, EnrichedThread[]>();
  for (const thread of threads) {
    const clusterId = clusterAssignments.get(thread.threadUrl) ?? -1;
    if (clusterId === -1) continue; // skip noise
    const arr = clusters.get(clusterId);
    if (arr) {
      arr.push(thread);
    } else {
      clusters.set(clusterId, [thread]);
    }
  }

  // Within each cluster, compare pairs
  for (const members of clusters.values()) {
    // Sort by earliest comment date so the first thread is canonical
    members.sort((a, b) => {
      const aDate = a.comments[0]?.createdAt ?? "";
      const bDate = b.comments[0]?.createdAt ?? "";
      return aDate.localeCompare(bDate);
    });

    for (let i = 0; i < members.length; i++) {
      // Skip if already marked as duplicate
      if (duplicates.get(members[i].threadUrl) !== null) continue;

      const vecA = embeddings.get(members[i].threadUrl);
      if (!vecA) continue;

      for (let j = i + 1; j < members.length; j++) {
        // Skip if already marked as duplicate
        if (duplicates.get(members[j].threadUrl) !== null) continue;

        const vecB = embeddings.get(members[j].threadUrl);
        if (!vecB) continue;

        const similarity = 1 - cosineDistance(vecA, vecB);
        if (similarity >= threshold) {
          duplicates.set(members[j].threadUrl, members[i].threadUrl);
        }
      }
    }
  }

  return { duplicates };
}

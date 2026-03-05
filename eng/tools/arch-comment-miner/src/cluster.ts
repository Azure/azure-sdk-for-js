// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/** Cosine distance between two vectors: 1 - cosine_similarity. */
export function cosineDistance(a: number[], b: number[]): number {
  let dot = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  const denom = Math.sqrt(normA) * Math.sqrt(normB);
  if (denom === 0) return 1;
  return 1 - dot / denom;
}

export interface ClusterResult {
  /** Map from threadUrl to cluster ID (-1 = noise/unclustered). */
  assignments: Map<string, number>;
  /** Number of clusters found (excluding noise). */
  clusterCount: number;
}

/**
 * Builds a symmetric distance matrix from embedding vectors.
 */
function buildDistanceMatrix(vectors: number[][]): number[][] {
  const n = vectors.length;
  const dist: number[][] = Array.from({ length: n }, () => new Array<number>(n).fill(0));
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const d = cosineDistance(vectors[i], vectors[j]);
      dist[i][j] = d;
      dist[j][i] = d;
    }
  }
  return dist;
}

/**
 * Hierarchical agglomerative clustering with average linkage.
 *
 * Merges the two closest clusters at each step until the minimum
 * inter-cluster distance exceeds `maxDistance`.
 *
 * Returns an array of cluster assignments (indices into the original array).
 */
function agglomerativeClustering(
  distMatrix: number[][],
  maxDistance: number,
): number[][] {
  const n = distMatrix.length;
  if (n === 0) return [];

  // Each item starts as its own cluster
  let clusters: number[][] = Array.from({ length: n }, (_, i) => [i]);
  // Track inter-cluster distances (average linkage)
  // Use a mutable copy so we can update it
  const clusterDist: number[][] = distMatrix.map((row) => [...row]);

  while (clusters.length > 1) {
    // Find the two closest clusters
    let minDist = Infinity;
    let mergeA = -1;
    let mergeB = -1;

    for (let i = 0; i < clusters.length; i++) {
      for (let j = i + 1; j < clusters.length; j++) {
        if (clusterDist[i][j] < minDist) {
          minDist = clusterDist[i][j];
          mergeA = i;
          mergeB = j;
        }
      }
    }

    if (minDist > maxDistance || mergeA === -1) break;

    // Merge B into A — update distances with average linkage
    const sizeA = clusters[mergeA].length;
    const sizeB = clusters[mergeB].length;
    const newSize = sizeA + sizeB;

    for (let k = 0; k < clusters.length; k++) {
      if (k === mergeA || k === mergeB) continue;
      // Weighted average of distances to both merged clusters
      const newDist = (clusterDist[mergeA][k] * sizeA + clusterDist[mergeB][k] * sizeB) / newSize;
      clusterDist[mergeA][k] = newDist;
      clusterDist[k][mergeA] = newDist;
    }

    clusters[mergeA] = [...clusters[mergeA], ...clusters[mergeB]];

    // Remove cluster B
    clusters.splice(mergeB, 1);
    clusterDist.splice(mergeB, 1);
    for (const row of clusterDist) {
      row.splice(mergeB, 1);
    }
  }

  return clusters;
}

/**
 * Clusters thread embeddings using hierarchical agglomerative clustering
 * with average linkage, then recovers noise by assigning singletons
 * to the nearest multi-member cluster within a relaxed threshold.
 *
 * @param embeddings - Map from threadUrl to embedding vector.
 * @param maxDistance - Maximum average-linkage distance to merge clusters (default 0.55).
 * @param minClusterSize - Clusters smaller than this are treated as noise candidates (default 2).
 * @param recoveryDistance - Max distance to absorb a noise point into a cluster (default 0.70).
 */
export function clusterThreads(
  embeddings: Map<string, number[]>,
  maxDistance: number = 0.55,
  minClusterSize: number = 2,
  recoveryDistance: number = 0.70,
): ClusterResult {
  const urls = [...embeddings.keys()];
  const vectors = urls.map((url) => embeddings.get(url)!);

  if (vectors.length === 0) {
    return { assignments: new Map(), clusterCount: 0 };
  }

  const distMatrix = buildDistanceMatrix(vectors);
  const rawClusters = agglomerativeClustering(distMatrix, maxDistance);

  // Separate real clusters from noise (singletons / too-small clusters)
  const realClusters: number[][] = [];
  const noiseIndices: number[] = [];

  for (const cluster of rawClusters) {
    if (cluster.length >= minClusterSize) {
      realClusters.push(cluster);
    } else {
      noiseIndices.push(...cluster);
    }
  }

  // Noise recovery: assign noise points to nearest real cluster if close enough
  for (const noiseIdx of noiseIndices) {
    let bestCluster = -1;
    let bestDist = Infinity;

    for (let c = 0; c < realClusters.length; c++) {
      // Average distance to cluster members
      let sum = 0;
      for (const memberIdx of realClusters[c]) {
        sum += distMatrix[noiseIdx][memberIdx];
      }
      const avgDist = sum / realClusters[c].length;

      if (avgDist < bestDist) {
        bestDist = avgDist;
        bestCluster = c;
      }
    }

    if (bestCluster !== -1 && bestDist <= recoveryDistance) {
      realClusters[bestCluster].push(noiseIdx);
    }
  }

  // Build assignments map
  const assignments = new Map<string, number>();
  const assignedIndices = new Set<number>();

  for (let clusterId = 0; clusterId < realClusters.length; clusterId++) {
    for (const idx of realClusters[clusterId]) {
      assignments.set(urls[idx], clusterId);
      assignedIndices.add(idx);
    }
  }

  // Remaining unassigned → noise
  for (let i = 0; i < urls.length; i++) {
    if (!assignedIndices.has(i)) {
      assignments.set(urls[i], -1);
    }
  }

  return { assignments, clusterCount: realClusters.length };
}

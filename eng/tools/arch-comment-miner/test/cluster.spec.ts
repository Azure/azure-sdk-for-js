// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, expect } from "vitest";
import { cosineDistance, clusterThreads } from "../src/cluster.ts";

describe("cosineDistance", () => {
  it("returns 0 for identical vectors", () => {
    expect(cosineDistance([1, 0, 0], [1, 0, 0])).toBeCloseTo(0);
  });

  it("returns 1 for orthogonal vectors", () => {
    expect(cosineDistance([1, 0], [0, 1])).toBeCloseTo(1);
  });

  it("returns ~2 for opposite vectors", () => {
    expect(cosineDistance([1, 0], [-1, 0])).toBeCloseTo(2);
  });

  it("returns small distance for similar vectors", () => {
    const dist = cosineDistance([1, 0.1], [1, 0.2]);
    expect(dist).toBeLessThan(0.01);
  });
});

describe("clusterThreads", () => {
  it("clusters similar vectors together", () => {
    const embeddings = new Map<string, number[]>([
      ["a", [1, 0, 0]],
      ["b", [0.95, 0.05, 0]],
      ["c", [0, 1, 0]],
      ["d", [0.05, 0.95, 0]],
    ]);

    // maxDistance=0.1, minClusterSize=2, recoveryDistance=0
    const result = clusterThreads(embeddings, 0.1, 2, 0);

    expect(result.clusterCount).toBe(2);
    expect(result.assignments.get("a")).toBe(result.assignments.get("b"));
    expect(result.assignments.get("c")).toBe(result.assignments.get("d"));
    expect(result.assignments.get("a")).not.toBe(result.assignments.get("c"));
  });

  it("assigns noise for isolated points with tight threshold", () => {
    const embeddings = new Map<string, number[]>([
      ["a", [1, 0, 0]],
      ["b", [0, 1, 0]],
      ["c", [0, 0, 1]],
    ]);

    // Very tight distance, no recovery
    const result = clusterThreads(embeddings, 0.05, 2, 0);

    for (const val of result.assignments.values()) {
      expect(val).toBe(-1);
    }
    expect(result.clusterCount).toBe(0);
  });

  it("recovers noise points into nearby clusters", () => {
    const embeddings = new Map<string, number[]>([
      ["a", [1, 0, 0]],
      ["b", [0.95, 0.05, 0]],
      ["c", [0.8, 0.2, 0]], // close to a/b cluster but not tight enough for maxDistance=0.05
    ]);

    // Tight merge, but generous recovery
    const result = clusterThreads(embeddings, 0.05, 2, 0.5);

    // a and b form a cluster; c should be recovered into it
    expect(result.assignments.get("a")).toBe(result.assignments.get("b"));
    expect(result.assignments.get("c")).toBe(result.assignments.get("a"));
    expect(result.clusterCount).toBe(1);
  });

  it("handles single-element input", () => {
    const embeddings = new Map([["a", [1, 0, 0]]]);
    const result = clusterThreads(embeddings, 0.3, 2, 0.4);
    expect(result.assignments.get("a")).toBe(-1);
  });

  it("handles empty input", () => {
    const result = clusterThreads(new Map(), 0.3);
    expect(result.clusterCount).toBe(0);
    expect(result.assignments.size).toBe(0);
  });
});

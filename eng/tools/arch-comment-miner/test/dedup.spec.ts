// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, expect } from "vitest";
import { dedup } from "../src/dedup.ts";
import type { EnrichedThread } from "../src/types.ts";

function makeThread(url: string, date: string): EnrichedThread {
  return {
    pr: 42,
    path: "sdk/foo/foo/review/foo.api.md",
    diffHunk: "",
    line: 1,
    originalLine: 1,
    threadUrl: url,
    isResolved: true,
    isOutdated: false,
    comments: [
      {
        author: "reviewer",
        body: "fix naming",
        createdAt: date,
        url,
      },
    ],
    highlightedHunk: "",
    targetLine: "export function getFoo()",
  };
}

describe("dedup", () => {
  it("marks later duplicate as duplicate of earlier", () => {
    const threads = [
      makeThread("url-early", "2024-01-01T00:00:00Z"),
      makeThread("url-late", "2024-06-01T00:00:00Z"),
    ];

    // Identical vectors → cosine similarity = 1.0
    const embeddings = new Map([
      ["url-early", [1, 0, 0]],
      ["url-late", [1, 0, 0]],
    ]);

    const assignments = new Map([
      ["url-early", 0],
      ["url-late", 0],
    ]);

    const result = dedup(threads, embeddings, assignments, 0.9);

    expect(result.duplicates.get("url-early")).toBeNull();
    expect(result.duplicates.get("url-late")).toBe("url-early");
  });

  it("does not mark dissimilar threads as duplicates", () => {
    const threads = [
      makeThread("url-a", "2024-01-01T00:00:00Z"),
      makeThread("url-b", "2024-06-01T00:00:00Z"),
    ];

    // Orthogonal vectors → cosine similarity = 0
    const embeddings = new Map([
      ["url-a", [1, 0]],
      ["url-b", [0, 1]],
    ]);

    const assignments = new Map([
      ["url-a", 0],
      ["url-b", 0],
    ]);

    const result = dedup(threads, embeddings, assignments, 0.9);

    expect(result.duplicates.get("url-a")).toBeNull();
    expect(result.duplicates.get("url-b")).toBeNull();
  });

  it("skips noise threads (cluster -1)", () => {
    const threads = [
      makeThread("url-a", "2024-01-01T00:00:00Z"),
      makeThread("url-b", "2024-06-01T00:00:00Z"),
    ];

    const embeddings = new Map([
      ["url-a", [1, 0, 0]],
      ["url-b", [1, 0, 0]],
    ]);

    // Both in noise
    const assignments = new Map([
      ["url-a", -1],
      ["url-b", -1],
    ]);

    const result = dedup(threads, embeddings, assignments, 0.9);

    expect(result.duplicates.get("url-a")).toBeNull();
    expect(result.duplicates.get("url-b")).toBeNull();
  });

  it("handles empty input", () => {
    const result = dedup([], new Map(), new Map(), 0.9);
    expect(result.duplicates.size).toBe(0);
  });
});

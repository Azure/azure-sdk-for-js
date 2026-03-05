// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, expect } from "vitest";
import { labelClusters, type ChatCompleter } from "../src/label.ts";
import type { EnrichedThread } from "../src/types.ts";

function makeThread(url: string, body: string, targetLine: string): EnrichedThread {
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
      { author: "reviewer", body, createdAt: "2024-06-01T00:00:00Z", url },
    ],
    highlightedHunk: "",
    targetLine,
  };
}

describe("labelClusters", () => {
  it("labels clusters using the completer", async () => {
    const completer: ChatCompleter = async () =>
      JSON.stringify({ label: "Naming Issues" });

    const threads = [
      makeThread("u1", "rename this", "getFoo()"),
      makeThread("u2", "wrong name", "getBar()"),
    ];

    const assignments = new Map([
      ["u1", 0],
      ["u2", 0],
    ]);

    const result = await labelClusters(assignments, threads, 1, completer);

    expect(result.get(0)?.label).toBe("Naming Issues");
    expect(result.get(0)?.size).toBe(2);
  });

  it("falls back to generic label on LLM error", async () => {
    const completer: ChatCompleter = async () => {
      throw new Error("API down");
    };

    const threads = [makeThread("u1", "fix this", "foo()")];
    const assignments = new Map([["u1", 0]]);

    const result = await labelClusters(assignments, threads, 1, completer);

    expect(result.get(0)?.label).toBe("Cluster 0");
  });

  it("includes noise cluster info", async () => {
    const completer: ChatCompleter = async () =>
      JSON.stringify({ label: "Test" });

    const threads = [makeThread("u1", "body", "code")];
    const assignments = new Map([["u1", -1]]);

    const result = await labelClusters(assignments, threads, 0, completer);

    expect(result.get(-1)?.label).toBe("Unclustered");
    expect(result.get(-1)?.size).toBe(1);
  });

  it("reports progress", async () => {
    const completer: ChatCompleter = async () =>
      JSON.stringify({ label: "X" });

    const threads = [
      makeThread("u1", "a", "a"),
      makeThread("u2", "b", "b"),
    ];
    const assignments = new Map([
      ["u1", 0],
      ["u2", 1],
    ]);

    const progress: Array<[number, number]> = [];
    await labelClusters(assignments, threads, 2, completer, (done, total) =>
      progress.push([done, total]),
    );

    expect(progress).toEqual([
      [1, 2],
      [2, 2],
    ]);
  });
});

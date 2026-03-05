// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, expect } from "vitest";
import { threadToText, embedThreads, type Embedder } from "../src/embed.ts";
import type { EnrichedThread } from "../src/types.ts";

function makeThread(overrides?: Partial<EnrichedThread>): EnrichedThread {
  return {
    pr: 42,
    path: "sdk/foo/foo/review/foo.api.md",
    diffHunk: "@@ -1,3 +1,3 @@\n-old\n+new",
    line: 1,
    originalLine: 1,
    threadUrl: "https://github.com/Azure/azure-sdk-for-js/pull/42#discussion_r1",
    isResolved: true,
    isOutdated: false,
    comments: [
      {
        author: "reviewer",
        body: "This naming is wrong",
        createdAt: "2024-06-01T00:00:00Z",
        url: "https://github.com/Azure/azure-sdk-for-js/pull/42#discussion_r1",
      },
    ],
    highlightedHunk: "@@ -1,3 +1,3 @@\n-old\n+new  // <-- reviewed",
    targetLine: "export function getFoo()",
    ...overrides,
  };
}

describe("threadToText", () => {
  it("combines comment body and target line", () => {
    const text = threadToText(makeThread());
    expect(text).toContain("This naming is wrong");
    expect(text).toContain("export function getFoo()");
  });

  it("handles missing comments gracefully", () => {
    const text = threadToText(makeThread({ comments: [] }));
    expect(text).toContain("Code:");
  });
});

describe("embedThreads", () => {
  it("calls embedder with correct texts and returns map", async () => {
    const calls: string[][] = [];
    const fakeEmbedder: Embedder = async (texts) => {
      calls.push(texts);
      return texts.map(() => [0.1, 0.2, 0.3]);
    };

    const threads = [
      makeThread({ threadUrl: "url1" }),
      makeThread({ threadUrl: "url2" }),
    ];

    const result = await embedThreads(threads, fakeEmbedder);

    expect(result.size).toBe(2);
    expect(result.get("url1")).toEqual([0.1, 0.2, 0.3]);
    expect(result.get("url2")).toEqual([0.1, 0.2, 0.3]);
  });

  it("reports progress", async () => {
    const fakeEmbedder: Embedder = async (texts) => texts.map(() => [1, 0, 0]);
    const progress: Array<[number, number]> = [];

    await embedThreads(
      [makeThread({ threadUrl: "u1" }), makeThread({ threadUrl: "u2" })],
      fakeEmbedder,
      (done, total) => progress.push([done, total]),
    );

    expect(progress.length).toBeGreaterThan(0);
    expect(progress[progress.length - 1][0]).toBe(2);
  });
});

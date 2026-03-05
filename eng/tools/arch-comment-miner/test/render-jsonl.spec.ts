// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, expect } from "vitest";
import { renderJsonl } from "../src/render-jsonl.ts";
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
        body: "fix this naming",
        createdAt: "2024-06-01T00:00:00Z",
        url: "https://github.com/Azure/azure-sdk-for-js/pull/42#discussion_r1",
      },
    ],
    highlightedHunk: "@@ -1,3 +1,3 @@\n-old\n+new  // <-- reviewed",
    targetLine: "new",
    ...overrides,
  };
}

describe("renderJsonl", () => {
  it("produces one JSON object per line", () => {
    const threads = [makeThread({ pr: 1 }), makeThread({ pr: 2 })];
    const output = renderJsonl(threads);
    const lines = output.split("\n");

    expect(lines).toHaveLength(2);
    expect(() => JSON.parse(lines[0])).not.toThrow();
    expect(() => JSON.parse(lines[1])).not.toThrow();
  });

  it("includes all required fields", () => {
    const output = renderJsonl([makeThread()]);
    const obj = JSON.parse(output) as Record<string, unknown>;

    expect(obj).toHaveProperty("pr", 42);
    expect(obj).toHaveProperty("path");
    expect(obj).toHaveProperty("targetLine", "new");
    expect(obj).toHaveProperty("diffHunk");
    expect(obj).toHaveProperty("highlightedHunk");
    expect(obj).toHaveProperty("threadUrl");
    expect(obj).toHaveProperty("isResolved", true);
    expect(obj).toHaveProperty("isOutdated", false);
    expect(obj).toHaveProperty("line", 1);
    expect(obj).toHaveProperty("originalLine", 1);
    expect(obj).toHaveProperty("comments");
  });

  it("includes comment details in each thread", () => {
    const output = renderJsonl([makeThread()]);
    const obj = JSON.parse(output) as { comments: Array<Record<string, unknown>> };

    expect(obj.comments).toHaveLength(1);
    expect(obj.comments[0]).toHaveProperty("author", "reviewer");
    expect(obj.comments[0]).toHaveProperty("body", "fix this naming");
    expect(obj.comments[0]).toHaveProperty("createdAt");
    expect(obj.comments[0]).toHaveProperty("url");
  });

  it("returns empty string for no threads", () => {
    expect(renderJsonl([])).toBe("");
  });
});

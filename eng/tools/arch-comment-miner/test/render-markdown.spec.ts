// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, expect } from "vitest";
import { renderMarkdown } from "../src/render-markdown.ts";
import type { EnrichedThread } from "../src/types.ts";

function makeThread(overrides?: Partial<EnrichedThread>): EnrichedThread {
  return {
    pr: 100,
    path: "sdk/foo/foo/review/foo.api.md",
    diffHunk: "@@ -1,3 +1,3 @@\n-old\n+new",
    line: 1,
    originalLine: 1,
    threadUrl: "https://github.com/Azure/azure-sdk-for-js/pull/100#discussion_r1",
    isResolved: true,
    isOutdated: false,
    comments: [
      {
        author: "reviewer",
        body: "This should be renamed",
        createdAt: "2024-06-01T00:00:00Z",
        url: "https://github.com/Azure/azure-sdk-for-js/pull/100#discussion_r1",
      },
      {
        author: "author",
        body: "Done, updated.",
        createdAt: "2024-06-02T00:00:00Z",
        url: "https://github.com/Azure/azure-sdk-for-js/pull/100#discussion_r2",
      },
    ],
    highlightedHunk: "@@ -1,3 +1,3 @@\n-old\n+new  // <-- reviewed",
    targetLine: "new",
    ...overrides,
  };
}

describe("renderMarkdown", () => {
  it("includes header with date range and thread count", () => {
    const md = renderMarkdown([makeThread()], "2024-01-01", "2024-12-31");

    expect(md).toContain("# Architecture Review Feedback Catalog");
    expect(md).toContain("**2024-01-01**");
    expect(md).toContain("**2024-12-31**");
    expect(md).toContain("**1 review threads**");
  });

  it("renders threads in PR order", () => {
    const threads = [
      makeThread({ pr: 200 }),
      makeThread({ pr: 100 }),
    ];
    const md = renderMarkdown(threads, "2024-01-01", "2024-12-31");

    const pr100Idx = md.indexOf("PR #100");
    const pr200Idx = md.indexOf("PR #200");
    expect(pr100Idx).toBeLessThan(pr200Idx);
  });

  it("renders the full thread with all comments", () => {
    const md = renderMarkdown([makeThread()], "2024-01-01", "2024-12-31");

    expect(md).toContain("**reviewer:**");
    expect(md).toContain("This should be renamed");
    expect(md).toContain("**author:**");
    expect(md).toContain("Done, updated.");
  });

  it("includes the highlighted diff hunk", () => {
    const md = renderMarkdown([makeThread()], "2024-01-01", "2024-12-31");

    expect(md).toContain("````diff");
    expect(md).toContain("// <-- reviewed");
    expect(md).toContain("````");
  });

  it("includes resolution status", () => {
    const md = renderMarkdown([makeThread({ isResolved: true })], "2024-01-01", "2024-12-31");
    expect(md).toContain("✅ Resolved");

    const md2 = renderMarkdown([makeThread({ isResolved: false })], "2024-01-01", "2024-12-31");
    expect(md2).toContain("⏳ Unresolved");
  });

  it("includes thread and PR links", () => {
    const md = renderMarkdown([makeThread()], "2024-01-01", "2024-12-31");

    expect(md).toContain(
      "[Thread](https://github.com/Azure/azure-sdk-for-js/pull/100#discussion_r1)",
    );
    expect(md).toContain("[PR #100]");
  });
});

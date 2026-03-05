// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, expect } from "vitest";
import { highlightDiffHunk } from "../src/enrich-context.ts";

describe("highlightDiffHunk", () => {
  const sampleHunk = [
    "@@ -10,6 +10,8 @@ export class FooClient {",
    "     constructor(endpoint: string);",
    "     getToken(): Promise<Token>;",
    "+    listItems(options?: ListItemsOptions): PagedAsyncIterableIterator<Item>;",
    "+    deleteItem(id: string): Promise<void>;",
    "     close(): Promise<void>;",
    " }",
  ].join("\n");

  it("highlights the correct added line by new line number", () => {
    // +listItems is at new line 12 (header says +10, then context 10, 11, added 12, 13, context 14, 15)
    const { highlightedHunk, targetLine } = highlightDiffHunk(sampleHunk, 12, null);

    expect(targetLine).toBe(
      "listItems(options?: ListItemsOptions): PagedAsyncIterableIterator<Item>;",
    );
    expect(highlightedHunk).toContain("// <-- reviewed");
    // Only one line should be highlighted
    const markerCount = (highlightedHunk.match(/\/\/ <-- reviewed/g) || []).length;
    expect(markerCount).toBe(1);
  });

  it("highlights a context line by new line number", () => {
    const { highlightedHunk, targetLine } = highlightDiffHunk(sampleHunk, 10, null);

    expect(targetLine).toBe("constructor(endpoint: string);");
    expect(highlightedHunk).toContain("constructor(endpoint: string);  // <-- reviewed");
  });

  it("falls back to last non-empty line when line numbers do not match", () => {
    const { targetLine } = highlightDiffHunk(sampleHunk, 999, null);

    expect(targetLine).toBe("}");
  });

  it("handles a hunk with removed lines using originalLine", () => {
    const hunk = [
      "@@ -5,4 +5,3 @@ export interface Options {",
      "     timeout: number;",
      "-    retryCount: number;",
      "     maxRetries: number;",
      " }",
    ].join("\n");

    const { highlightedHunk, targetLine } = highlightDiffHunk(hunk, null, 6);

    expect(targetLine).toBe("retryCount: number;");
    expect(highlightedHunk).toContain("-    retryCount: number;  // <-- reviewed");
  });

  it("returns hunk as-is when there is no @@ header", () => {
    const noHeader = "some random text\nanother line";
    const { highlightedHunk, targetLine } = highlightDiffHunk(noHeader, null, null);

    expect(highlightedHunk).toBe(noHeader);
    expect(targetLine).toBe("another line");
  });

  it("handles empty hunk gracefully", () => {
    const { highlightedHunk, targetLine } = highlightDiffHunk("", null, null);

    expect(highlightedHunk).toBe("");
    expect(targetLine).toBe("");
  });
});

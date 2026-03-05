// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ReviewThread, EnrichedThread } from "./types.ts";

const COMMENT_MARKER = "  // <-- reviewed";

/**
 * Parses a diff hunk and highlights the line the comment targets.
 *
 * GitHub diff hunks start with an @@ header showing line numbers, followed by
 * context lines (no prefix), removed lines (-), and added lines (+).
 * The `line` field refers to the new-side line number; `originalLine` refers
 * to the old-side line number (for comments on removed lines).
 */
export function highlightDiffHunk(
  diffHunk: string,
  line: number | null,
  originalLine: number | null,
): { highlightedHunk: string; targetLine: string } {
  const lines = diffHunk.split("\n");
  if (lines.length === 0) {
    return { highlightedHunk: diffHunk, targetLine: "" };
  }

  // Parse the @@ header to get starting line numbers
  const header = lines[0];
  const headerMatch = header.match(/@@ -(\d+)(?:,\d+)? \+(\d+)(?:,\d+)? @@/);

  if (!headerMatch) {
    // No header — return as-is, guess the last line is the target
    const lastMeaningful = lines.filter((l) => l.trim().length > 0).pop() ?? "";
    return { highlightedHunk: diffHunk, targetLine: lastMeaningful };
  }

  let oldLineNum = parseInt(headerMatch[1], 10);
  let newLineNum = parseInt(headerMatch[2], 10);
  const targetNewLine = line;
  const targetOldLine = originalLine;

  let targetLine = "";
  const outputLines: string[] = [header];

  for (let i = 1; i < lines.length; i++) {
    const raw = lines[i];
    const isAdded = raw.startsWith("+");
    const isRemoved = raw.startsWith("-");

    let isTarget = false;

    if (isAdded) {
      if (targetNewLine !== null && newLineNum === targetNewLine) {
        isTarget = true;
      }
      newLineNum++;
    } else if (isRemoved) {
      if (targetOldLine !== null && oldLineNum === targetOldLine) {
        isTarget = true;
      }
      oldLineNum++;
    } else {
      // Context line — both counters advance
      if (targetNewLine !== null && newLineNum === targetNewLine) {
        isTarget = true;
      }
      if (targetOldLine !== null && oldLineNum === targetOldLine) {
        isTarget = true;
      }
      oldLineNum++;
      newLineNum++;
    }

    if (isTarget) {
      outputLines.push(raw + COMMENT_MARKER);
      targetLine = raw.replace(/^[+-]/, "").trim();
    } else {
      outputLines.push(raw);
    }
  }

  // If we didn't find the target line (e.g. line numbers didn't match),
  // default to the last non-empty line in the hunk
  if (!targetLine) {
    const lastContent = lines
      .slice(1)
      .filter((l) => l.trim().length > 0)
      .pop();
    targetLine = lastContent?.replace(/^[+-]/, "").trim() ?? "";
  }

  return { highlightedHunk: outputLines.join("\n"), targetLine };
}

/** Enriches a raw ReviewThread with highlighted context and a category. */
export function enrichThread(thread: ReviewThread): EnrichedThread {
  const { highlightedHunk, targetLine } = highlightDiffHunk(
    thread.diffHunk,
    thread.line,
    thread.originalLine,
  );

  return {
    ...thread,
    highlightedHunk,
    targetLine,
  };
}

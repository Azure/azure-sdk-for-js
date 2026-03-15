// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * annotate-source.ts
 *
 * Inserts inline ⚠️ markers on uncovered branches/statements/functions
 * so the LLM sees gaps in context, not as a separate table.
 *
 * Includes gap merging: consecutive branch arcs that represent the same
 * logical path (e.g., L328→329 and L329→330 for a try/except block)
 * are collapsed into a single gap.
 */

import type { CoverageGap } from "./types.ts";

/**
 * Merge adjacent gaps that represent the same logical uncovered path.
 *
 * Two branch gaps are merged when:
 * - They are in the same file
 * - Their start lines are within `maxDistance` of each other
 * - At least one gap's end line touches the other gap's start line
 *   (i.e., they form a chain: A→B, B→C becomes A→C)
 *
 * This prevents the LLM from writing duplicate tests for what is
 * really a single code path (e.g., entering an `except` block AND
 * executing the statement inside it).
 */
export function mergeAdjacentGaps(gaps: CoverageGap[], maxDistance: number = 2): CoverageGap[] {
  if (gaps.length <= 1) return gaps;

  // Sort by file, then start line
  const sorted = [...gaps].sort(
    (a, b) => a.file.localeCompare(b.file) || a.start.line - b.start.line,
  );

  const merged: CoverageGap[] = [];
  let current = sorted[0];

  for (let i = 1; i < sorted.length; i++) {
    const next = sorted[i];

    // Only merge branch gaps in the same file that are adjacent
    if (
      current.file === next.file &&
      current.type === "branch" &&
      next.type === "branch" &&
      next.start.line - current.start.line <= maxDistance &&
      // Chain check: current's target touches next's source or they overlap
      (current.end.line >= next.start.line - 1 || next.start.line <= current.end.line + 1)
    ) {
      // Merge: keep earliest start, latest end, combine detail
      current = {
        file: current.file,
        type: "branch",
        detail: `${current.detail} + ${next.detail}`,
        start: current.start,
        end: next.end.line > current.end.line ? next.end : current.end,
      };
    } else {
      merged.push(current);
      current = next;
    }
  }
  merged.push(current);

  return merged;
}

/**
 * Annotate source code with inline ⚠️ markers for a batch of coverage gaps.
 *
 * Markers are appended as end-of-line comments (never inserted as new lines)
 * so original line numbers are preserved. Line numbers are shown with a
 * 4-digit padded prefix and pipe separator.
 *
 * @param source  Raw source code string.
 * @param gaps    A batch of gaps to annotate (e.g., 5 uncovered branches).
 * @param comment Comment prefix for the language (e.g., "#" for Python, "//" for TS).
 * @returns Annotated source with line numbers.
 */
export function annotateSource(source: string, gaps: CoverageGap[], comment: string = "#"): string {
  const lines = source.split("\n");

  // Build a map from line number → annotation text.
  // A single line may have multiple gap annotations; we concatenate them.
  const annotations = new Map<number, string[]>();

  for (const gap of gaps) {
    const line = gap.start.line;
    if (!annotations.has(line)) {
      annotations.set(line, []);
    }
    const tag = formatTag(gap, comment);
    annotations.get(line)!.push(tag);
  }

  return lines
    .map((line, i) => {
      const lineNum = String(i + 1).padStart(4);
      const tags = annotations.get(i + 1);
      if (tags) {
        return `${lineNum} | ${line}  ${tags.join("  ")}`;
      }
      return `${lineNum} | ${line}`;
    })
    .join("\n");
}

function formatTag(gap: CoverageGap, comment: string): string {
  switch (gap.type) {
    case "branch": {
      const target = gap.end.line !== gap.start.line ? ` → line ${gap.end.line}` : "";
      return `${comment} ⚠️ UNCOVERED BRANCH${target}`;
    }
    case "function":
      return `${comment} ⚠️ UNCOVERED FUNCTION`;
    case "statement":
      return `${comment} ⚠️ UNCOVERED STATEMENT`;
  }
}

/**
 * Derive the comment prefix from a file extension.
 */
export function commentPrefixFor(ext: string): string {
  const map: Record<string, string> = {
    ".py": "#",
    ".rb": "#",
    ".ts": "//",
    ".js": "//",
    ".java": "//",
    ".go": "//",
    ".cs": "//",
    ".rs": "//",
    ".cpp": "//",
    ".c": "//",
  };
  return map[ext] ?? "#";
}

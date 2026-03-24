// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SendAttachment } from "./llm.ts";
import type { CoverageGap } from "./types.ts";

interface SelectionWindow {
  startLine: number;
  endLine: number;
}

export function buildAnnotatedSourceSelectionAttachment(
  sourceFile: string,
  sourceText: string,
  annotatedText: string,
  gaps: CoverageGap[],
  displayName = `${sourceFile} (annotated excerpt)`,
  paddingLines = 40,
): SendAttachment {
  const window = selectionWindowForGaps(sourceText, gaps, paddingLines);
  const excerpt = annotatedText
    .split("\n")
    .slice(window.startLine - 1, window.endLine)
    .join("\n");
  return {
    type: "selection",
    filePath: sourceFile,
    displayName,
    selection: toSelectionRange(sourceText, window),
    text: excerpt,
  };
}

export function buildFocusedFileAttachment(
  filePath: string,
  fileText: string,
  focusLines: number[],
  displayName = filePath,
  paddingLines = 20,
): SendAttachment {
  if (focusLines.length === 0) {
    return { type: "file", path: filePath, displayName };
  }

  const lines = fileText.split("\n");
  const startLine = clamp(Math.min(...focusLines) - paddingLines, 1, lines.length);
  const endLine = clamp(Math.max(...focusLines) + paddingLines, startLine, lines.length);
  const excerpt = lines.slice(startLine - 1, endLine).join("\n");
  return {
    type: "selection",
    filePath,
    displayName,
    selection: toSelectionRange(fileText, { startLine, endLine }),
    text: excerpt,
  };
}

function selectionWindowForGaps(
  sourceText: string,
  gaps: CoverageGap[],
  paddingLines: number,
): SelectionWindow {
  const lines = sourceText.split("\n");
  const minLine = Math.min(...gaps.map((gap) => gap.start.line));
  const maxLine = Math.max(...gaps.map((gap) => gap.end.line));
  return {
    startLine: clamp(minLine - paddingLines, 1, lines.length),
    endLine: clamp(maxLine + paddingLines, 1, lines.length),
  };
}

function toSelectionRange(
  sourceText: string,
  window: SelectionWindow,
): {
  start: { line: number; character: number };
  end: { line: number; character: number };
} {
  const lines = sourceText.split("\n");
  const endLineText = lines[window.endLine - 1] ?? "";
  return {
    start: { line: window.startLine - 1, character: 0 },
    end: { line: window.endLine - 1, character: endLineText.length },
  };
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

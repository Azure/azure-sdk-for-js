// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EOL } from "node:os";
import type { Node, SourceFile } from "typescript/ast";
import { DiagnosticCategory, formatDiagnosticsWithColorAndContext } from "typescript/sync";
import type { Diagnostic } from "typescript/sync";

/**
 * The type of the emitter function.
 */
export type EmitError = (message: string, node: Node, suggest?: string) => void;

/**
 * Create a diagnostic emitter for a given TypeScript source file.
 * @param sourceFile - the source file where node errors appear
 * @param onError - an optional error callback
 * @returns a function that, when called, will print a TypeScript error to console.error
 */
export function createDiagnosticEmitter(
  sourceFile: SourceFile,
  onError?: (e: string) => void,
): EmitError {
  const diagnosticHost = {
    getNewLine: () => EOL,
    getCanonicalFileName: (name: string) => name,
    getCurrentDirectory: () => process.cwd(),
  };

  return (message: string, node: Node, suggest?: string) => {
    const [start, end] = [node.getStart(sourceFile), node.getEnd()];
    const diagnostic: Diagnostic = {
      category: DiagnosticCategory.Error,
      // I am intentionally lying to the compiler here to bypass the error code. The formatter
      // prints the source followed by the code, which makes this "TS-AZURE".
      source: "TS-AZURE",
      code: "" as never,
      fileName: sourceFile.fileName,
      pos: start,
      end,
      startPosition: sourceFile.getLineAndCharacterOfPosition(start),
      endPosition: sourceFile.getLineAndCharacterOfPosition(end),
      sourceLines: getSourceLines(sourceFile, start, end),
      text: message,
    };

    if (suggest) {
      diagnostic.relatedInformation = [
        {
          category: DiagnosticCategory.Message,
          code: 0,
          pos: 0,
          end: 0,
          text: "Suggestion: " + suggest,
        },
      ];
    }

    const formatted = formatDiagnosticsWithColorAndContext([diagnostic], diagnosticHost);

    console.error(formatted);

    onError?.(formatted);
  };
}

/**
 * Flattens a diagnostic's message and the messages chained to it into one string.
 *
 * @param diagnostic - the diagnostic to flatten
 * @param newLine - what separates the chained messages, each indented one more level than the one before
 */
export function flattenDiagnosticMessage(
  diagnostic: Pick<Diagnostic, "text" | "messageChain">,
  newLine = EOL,
  indentLevel = 0,
): string {
  let result = indentLevel > 0 ? newLine + "  ".repeat(indentLevel) : "";
  result += diagnostic.text;
  for (const child of diagnostic.messageChain ?? []) {
    result += flattenDiagnosticMessage(child, newLine, indentLevel + 1);
  }
  return result;
}

/**
 * Gets the lines a diagnostic is rendered with: all the lines it spans, or the first two and the
 * last two when it spans more than five (the formatter shows an ellipsis between them).
 */
function getSourceLines(
  sourceFile: SourceFile,
  start: number,
  end: number,
): NonNullable<Diagnostic["sourceLines"]> {
  const lineStarts = sourceFile.getLineStarts();
  const firstLine = sourceFile.getLineAndCharacterOfPosition(start).line;
  const lastLine = sourceFile.getLineAndCharacterOfPosition(end).line;
  const lines =
    lastLine - firstLine >= 4
      ? [firstLine, firstLine + 1, lastLine - 1, lastLine]
      : Array.from({ length: lastLine - firstLine + 1 }, (_, offset) => firstLine + offset);
  return lines.map((line) => ({
    line,
    text: sourceFile.text.slice(lineStarts[line], lineStarts[line + 1] ?? sourceFile.text.length),
  }));
}

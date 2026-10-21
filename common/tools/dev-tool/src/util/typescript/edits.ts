// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SourceFile, Statement } from "typescript/ast";
import type { API } from "typescript/sync";
import { printStatementsWithComments } from "./printing.ts";

/**
 * A replacement of the text between two offsets of a source file.
 *
 * The TypeScript 7 API has no way to attach comments to synthesized nodes or to preserve the
 * comments of a replaced node, so code that rewrites source files describes its changes as text
 * edits positioned by the AST. Everything outside the edited ranges, comments included, is kept
 * exactly as written.
 */
export interface TextEdit {
  /** The offset of the first replaced character. */
  start: number;
  /** The offset after the last replaced character. */
  end: number;
  /** The replacement text. */
  text: string;
}

/**
 * Everything a rewriter needs to inspect a source file and describe changes to it.
 */
export interface RewriteContext {
  api: API;
  sourceFile: SourceFile;
}

/**
 * Inspects a parsed source file and returns the edits to apply to its text.
 */
export type SourceRewriter = (context: RewriteContext) => TextEdit[];

/**
 * Applies edits to text. Edits must not overlap.
 *
 * @param text - the text the edits were computed against
 * @param edits - the edits, in any order
 * @returns the edited text
 */
export function applyTextEdits(text: string, edits: readonly TextEdit[]): string {
  const sorted = [...edits].sort((a, b) => a.start - b.start || a.end - b.end);
  let result = "";
  let position = 0;
  for (const edit of sorted) {
    if (edit.start < position) {
      throw new Error(
        `[Internal Error] overlapping text edits at ${edit.start} (previous edit ended at ${position})`,
      );
    }
    result += text.slice(position, edit.start) + edit.text;
    position = edit.end;
  }
  return result + text.slice(position);
}

/**
 * Creates an edit that replaces a statement's own text (not its leading comments or trivia) with
 * another statement, printed.
 *
 * The replacement is printed with the original statement's text, because that is where the printer
 * finds the comments of the nodes the replacement reuses from the original, such as a comment inside
 * a list of imported names.
 *
 * @param api - the TypeScript API client, which prints the replacement
 * @param original - the statement to replace
 * @param replacement - the statement to print in its place
 */
export function replaceStatement(api: API, original: Statement, replacement: Statement): TextEdit {
  const start = original.getStart();
  const end = original.getEnd();
  return {
    start,
    end,
    text: printStatementsWithComments(api, original.getSourceFile(), [replacement], {
      start,
      end,
    }).trimEnd(),
  };
}

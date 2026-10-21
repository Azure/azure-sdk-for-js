// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SourceFile, Statement } from "typescript/ast";
import { SyntaxKind } from "typescript/ast";
import { createSourceFile, createToken } from "typescript/ast/factory";
import type { API } from "typescript/sync";

// Single-byte characters that stand in for non-ASCII characters while printing (see below): the control characters
// other than whitespace and the escape character.
const placeholders = [
  ...Array.from({ length: 8 }, (_, index) => index + 0x01),
  ...Array.from({ length: 13 }, (_, index) => index + 0x0e),
  ...Array.from({ length: 4 }, (_, index) => index + 0x1c),
].map((code) => String.fromCharCode(code));

/**
 * Prints statements with the comments that the text of their source file has at their positions: the
 * statements of a source file, or statements that reuse some of its nodes.
 *
 * Comments live in the text of the source file, not in nodes, and the printer takes them from the text it is given.
 * That has three consequences that this function deals with:
 *
 * - A synthesized node is treated as positioned at the start of the file, so it would print the comments there
 *   (a copyright header, say). The text before the range is blanked out.
 * - The printer misplaces comments (it prints them in the middle of the next statement) when the text has non-ASCII
 *   characters, because node positions count UTF-16 code units but it reads the text by bytes. The non-ASCII
 *   characters of the range are replaced by single-byte placeholders and put back in the printed text.
 * - String literals print from their nodes, and are escaped (`"\u00FC"`) unless told not to.
 *
 * @param api - the TypeScript API client, which prints the statements
 * @param sourceFile - the source file that the statements, or the nodes they reuse, come from
 * @param statements - the statements to print
 * @param range - the part of the source file's text that holds the comments to print, which is the text of the
 * statements and what is around them that belongs with them
 * @returns the printed statements, one per line
 */
export function printStatementsWithComments(
  api: API,
  sourceFile: SourceFile,
  statements: readonly Statement[],
  range: { start: number; end: number },
): string {
  const placeholderOf = new Map<string, string>();
  const text =
    " ".repeat(range.start) +
    sourceFile.text.slice(range.start, range.end).replace(/[^\x00-\x7f]/g, (character) => {
      let placeholder = placeholderOf.get(character);
      if (placeholder === undefined) {
        placeholder = placeholders[placeholderOf.size];
        if (placeholder === undefined) {
          throw new Error(
            `Cannot print more than ${placeholders.length} distinct non-ASCII characters in the comments and text of ` +
              `the statements of ${sourceFile.fileName}`,
          );
        }
        placeholderOf.set(character, placeholder);
      }
      return placeholder;
    });
  const characterOf = new Map(
    [...placeholderOf].map(([character, placeholder]) => [placeholder, character]),
  );

  const printed = api.printer.printFile(
    createSourceFile(
      statements,
      createToken(SyntaxKind.EndOfFile),
      text,
      sourceFile.fileName,
      sourceFile.path,
    ),
    { neverAsciiEscape: true },
  );
  return characterOf.size === 0
    ? printed
    : printed.replace(/[\x01-\x1f]/g, (placeholder) => characterOf.get(placeholder) ?? placeholder);
}

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, expect, it } from "vitest";
import type { Node } from "typescript/ast";
import { SyntaxKind } from "typescript/ast";
import { convert } from "../../src/util/samples/convert.ts";
import { createToCommonJsTransform } from "../../src/util/samples/transforms.ts";
import type { SourceRewriter, TextEdit } from "../../src/util/typescript/edits.ts";

/**
 * A rewriter that renames identifiers, to see the order the rewriters run in.
 */
function renameIdentifiers(from: string, to: string): SourceRewriter {
  return ({ sourceFile }) => {
    const edits: TextEdit[] = [];
    const visit = (node: Node): void => {
      if (
        node.kind === SyntaxKind.Identifier &&
        sourceFile.text.slice(node.getStart(), node.getEnd()) === from
      ) {
        edits.push({ start: node.getStart(), end: node.getEnd(), text: to });
      }
      node.forEachChild(visit);
    };
    visit(sourceFile);
    return edits;
  };
}

describe("convert", () => {
  it("erases types and keeps comments and the blank lines between statements", async () => {
    const result = await convert(
      [
        "// Copyright (c) Microsoft Corporation.",
        "",
        "/** Adds numbers. */",
        "export function add(a: number, b: number): number {",
        "  return a + b; // sum",
        "}",
        "",
        "// A constant",
        'export const value: string = "x";',
        "",
      ].join("\n"),
    );

    // The exports are removed, because samples are scripts.
    expect(result).toBe(
      [
        "// Copyright (c) Microsoft Corporation.",
        "",
        "/** Adds numbers. */",
        "function add(a, b) {",
        "  return a + b; // sum",
        "}",
        "",
        "// A constant",
        'const value = "x";',
        "",
      ].join("\n"),
    );
  });

  it("emits a source that has no imports or exports as a script", async () => {
    const result = await convert('console.log("side effect");\n');

    expect(result).toBe('"use strict";\nconsole.log("side effect");\n');
  });

  it("does not emit a module as a script when the rewriters leave it without imports or exports", async () => {
    const dropExport: SourceRewriter = ({ sourceFile }) =>
      sourceFile.statements.map((statement) => ({
        start: statement.getStart(),
        end: statement.getStart() + "export ".length,
        text: "",
      }));

    const result = await convert('export const value = "x";\n', {
      before: [dropExport],
      // The emitter keeps the module a module with `export {}`, which the CommonJS transform removes.
      after: [createToCommonJsTransform(() => ({}))],
    });

    expect(result).toBe('const value = "x";\n');
  });

  it("runs each rewriter on the result of the one before it", async () => {
    const result = await convert("const first = 1;\nconsole.log(first);\n", {
      before: [renameIdentifiers("first", "second"), renameIdentifiers("second", "third")],
      after: [renameIdentifiers("third", "fourth")],
    });

    expect(result).toBe('"use strict";\nconst fourth = 1;\nconsole.log(fourth);\n');
  });

  it("keeps the comments inside and around the imports it turns into requires, including non-ASCII ones", async () => {
    const result = await convert(
      [
        "// Ünïcode header ’ with “quotes”",
        "",
        "import {",
        "  // It’s the first name 😀",
        "  first,",
        "  // A naïve second one",
        "  second,",
        '} from "./names.js"; // trailing — dash',
        "",
        "console.log(first, second);",
        "",
      ].join("\n"),
      { after: [createToCommonJsTransform(() => ({}))] },
    );

    expect(result).toBe(
      [
        "// Ünïcode header ’ with “quotes”",
        "",
        "const {",
        "  // It’s the first name 😀",
        "  first,",
        "  // A naïve second one",
        "  second,",
        '} = require("./names.js"); // trailing — dash',
        "",
        "console.log(first, second);",
        "",
      ].join("\n"),
    );
  });
});

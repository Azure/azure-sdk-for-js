// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Test helpers for the compiler modules.
 * Provides utilities to create TypeScript AST nodes from source strings.
 */

import ts from "typescript";

/**
 * Parse a TypeScript source string into a SourceFile AST node.
 * Uses the TypeScript compiler API with default settings.
 */
export function parseSource(source: string, fileName: string = "test.ts"): ts.SourceFile {
  return ts.createSourceFile(fileName, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
}

/**
 * Print a SourceFile (or set of nodes) back to a string.
 */
export function printSourceFile(sourceFile: ts.SourceFile): string {
  const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
  return printer.printFile(sourceFile);
}

/**
 * Print a single AST node to a string.
 */
export function printNode(node: ts.Node, sourceFile: ts.SourceFile): string {
  const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
  return printer.printNode(ts.EmitHint.Unspecified, node, sourceFile);
}

/**
 * Collect all import declarations from a source file.
 */
export function getImports(sourceFile: ts.SourceFile): ts.ImportDeclaration[] {
  return sourceFile.statements.filter(ts.isImportDeclaration) as ts.ImportDeclaration[];
}

/**
 * Normalize whitespace in a string for comparison:
 * trims, collapses multiple blank lines, normalizes line endings.
 */
export function normalizeWhitespace(text: string): string {
  return text
    .replace(/\r\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

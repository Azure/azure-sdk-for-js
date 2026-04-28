// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Unused variable eliminator — removes declared-but-never-read variables.
 *
 * This is a post-processing pass that runs on the final compiled output.
 * It eliminates variables that:
 * 1. Are declared (var/let/const) at any scope
 * 2. Are never read anywhere in the surviving code
 *
 * This handles cases where forPublishing substitution replaced all references
 * to a variable with literal values, leaving the declaration orphaned.
 *
 * Example:
 *   let keysToCleanup: string[] = [];  // declared
 *   forPublishing(keysToCleanup.push(x), () => 0);  // substituted to: 0
 *   // After substitution, keysToCleanup is never read → eliminate declaration
 */

import ts from "typescript";

/**
 * Eliminate unused variable declarations from source text.
 * Uses text-based removal to preserve formatting.
 *
 * @param sourceText - The compiled sample source code
 * @param fileName - File name for error messages
 * @returns The source text with unused variables removed
 */
export function eliminateUnusedVariables(sourceText: string, fileName: string): string {
  const sourceFile = ts.createSourceFile(fileName, sourceText, ts.ScriptTarget.Latest, true);

  // Phase 1: Collect all declared variable names and their statements
  // We need to collect from all scopes (module level and inside functions)
  const declarations = new Map<string, ts.VariableStatement>();
  const declaredNames = new Set<string>();

  function collectDeclarations(node: ts.Node): void {
    if (ts.isVariableStatement(node)) {
      // Only handle simple single-declarator statements
      if (node.declarationList.declarations.length === 1) {
        const decl = node.declarationList.declarations[0];
        if (ts.isIdentifier(decl.name)) {
          const name = decl.name.text;
          declaredNames.add(name);
          declarations.set(name, node);
        }
      }
    }
    ts.forEachChild(node, collectDeclarations);
  }

  collectDeclarations(sourceFile);

  if (declaredNames.size === 0) {
    return sourceText; // Nothing to eliminate
  }

  // Phase 2: Collect all identifier references (excluding declarations)
  const referencedNames = new Set<string>();

  function visitNode(node: ts.Node): void {
    if (ts.isIdentifier(node)) {
      const name = node.text;
      // Skip if this is a declaration name (not a reference)
      if (!isDeclarationSite(node)) {
        referencedNames.add(name);
      }
    }
    ts.forEachChild(node, visitNode);
  }

  visitNode(sourceFile);

  // Phase 3: Find unused declarations (declared but never referenced)
  const unusedStatements: ts.VariableStatement[] = [];
  for (const name of declaredNames) {
    if (!referencedNames.has(name)) {
      const stmt = declarations.get(name);
      if (stmt) {
        unusedStatements.push(stmt);
      }
    }
  }

  if (unusedStatements.length === 0) {
    return sourceText; // Nothing unused
  }

  // Phase 4: Remove unused statements using text ranges
  // Sort by position descending so we can splice from end without invalidating positions
  unusedStatements.sort((a, b) => b.pos - a.pos);

  let result = sourceText;
  for (const stmt of unusedStatements) {
    // Find the full range including any preceding trivia (comments, whitespace)
    const startPos = stmt.getFullStart();
    const endPos = stmt.getEnd();

    // Remove the statement including its leading trivia (comments)
    // Also remove trailing newline if present
    let removeEnd = endPos;
    if (result[removeEnd] === "\n") {
      removeEnd++;
    }

    result = result.slice(0, startPos) + result.slice(removeEnd);
  }

  // Phase 5: Remove useless expression statements (like `0;` from forPublishing substitution)
  result = eliminateUselessExpressionStatements(result, fileName);

  return result;
}

/**
 * Remove expression statements that are just literals (e.g., `0;`, `"foo";`).
 * These appear when forPublishing substitutes `forPublishing(expr, () => 0)` → `0`.
 */
function eliminateUselessExpressionStatements(sourceText: string, fileName: string): string {
  const sourceFile = ts.createSourceFile(fileName, sourceText, ts.ScriptTarget.Latest, true);

  const uselessStatements: ts.ExpressionStatement[] = [];

  function visit(node: ts.Node): void {
    if (ts.isExpressionStatement(node)) {
      const expr = node.expression;
      // Check if it's a useless literal: number, string, true, false, null, undefined
      if (
        ts.isNumericLiteral(expr) ||
        ts.isStringLiteral(expr) ||
        expr.kind === ts.SyntaxKind.TrueKeyword ||
        expr.kind === ts.SyntaxKind.FalseKeyword ||
        expr.kind === ts.SyntaxKind.NullKeyword ||
        (ts.isIdentifier(expr) && expr.text === "undefined")
      ) {
        uselessStatements.push(node);
      }
    }
    ts.forEachChild(node, visit);
  }

  visit(sourceFile);

  if (uselessStatements.length === 0) {
    return sourceText;
  }

  // Sort by position descending to splice from end first
  uselessStatements.sort((a, b) => b.pos - a.pos);

  let result = sourceText;
  for (const stmt of uselessStatements) {
    const startPos = stmt.getFullStart();
    const endPos = stmt.getEnd();

    let removeEnd = endPos;
    if (result[removeEnd] === "\n") {
      removeEnd++;
    }

    result = result.slice(0, startPos) + result.slice(removeEnd);
  }

  return result;
}

/**
 * Check if an identifier is at a declaration site (not a reference).
 */
function isDeclarationSite(node: ts.Identifier): boolean {
  const parent = node.parent;
  if (!parent) return false;

  // Variable declaration: let x = ...
  if (ts.isVariableDeclaration(parent) && parent.name === node) {
    return true;
  }

  // Function declaration: function x() {}
  if (ts.isFunctionDeclaration(parent) && parent.name === node) {
    return true;
  }

  // Parameter: (x) => ...
  if (ts.isParameter(parent) && parent.name === node) {
    return true;
  }

  // Property assignment in object literal: { x: value }
  if (ts.isPropertyAssignment(parent) && parent.name === node) {
    return true;
  }

  // Shorthand property: { x } (this is both decl and ref, treat as ref)
  if (ts.isShorthandPropertyAssignment(parent) && parent.name === node) {
    return false; // Treat as reference since it reads the value
  }

  // Import specifier: import { x } from "..."
  if (ts.isImportSpecifier(parent) && parent.name === node) {
    return true;
  }

  // Binding element in destructuring: const { x } = obj
  if (ts.isBindingElement(parent) && parent.name === node) {
    return true;
  }

  // Class declaration: class X {}
  if (ts.isClassDeclaration(parent) && parent.name === node) {
    return true;
  }

  // Interface declaration: interface X {}
  if (ts.isInterfaceDeclaration(parent) && parent.name === node) {
    return true;
  }

  // Type alias: type X = ...
  if (ts.isTypeAliasDeclaration(parent) && parent.name === node) {
    return true;
  }

  // Enum declaration: enum X {}
  if (ts.isEnumDeclaration(parent) && parent.name === node) {
    return true;
  }

  // Method/property declaration: class { x() {} }
  if (ts.isMethodDeclaration(parent) && parent.name === node) {
    return true;
  }
  if (ts.isPropertyDeclaration(parent) && parent.name === node) {
    return true;
  }

  // Catch clause: catch (x) {}
  if (ts.isCatchClause(parent) && parent.variableDeclaration?.name === node) {
    return true;
  }

  return false;
}

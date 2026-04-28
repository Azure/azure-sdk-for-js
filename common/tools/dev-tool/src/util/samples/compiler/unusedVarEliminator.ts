// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Unused variable eliminator — removes declared-but-never-read variables.
 *
 * Runs as a post-processing pass on compiled output. Handles cases where
 * forPublishing substitution replaced all references to a variable with
 * literal values, leaving the declaration orphaned.
 */

import ts from "typescript";

export function eliminateUnusedVariables(sourceText: string, fileName: string): string {
  const sourceFile = ts.createSourceFile(fileName, sourceText, ts.ScriptTarget.Latest, true);

  const declarations = new Map<string, ts.VariableStatement>();
  const declaredNames = new Set<string>();

  function collectDeclarations(node: ts.Node): void {
    if (ts.isVariableStatement(node)) {
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
    return sourceText;
  }

  const referencedNames = new Set<string>();

  function visitNode(node: ts.Node): void {
    if (ts.isIdentifier(node)) {
      const name = node.text;
      if (!isDeclarationSite(node)) {
        referencedNames.add(name);
      }
    }
    ts.forEachChild(node, visitNode);
  }

  visitNode(sourceFile);

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
    return sourceText;
  }

  unusedStatements.sort((a, b) => b.pos - a.pos);

  let result = sourceText;
  for (const stmt of unusedStatements) {
    const startPos = stmt.getFullStart();
    const endPos = stmt.getEnd();

    let removeEnd = endPos;
    if (result[removeEnd] === "\n") {
      removeEnd++;
    }

    result = result.slice(0, startPos) + result.slice(removeEnd);
  }

  result = eliminateUselessExpressionStatements(result, fileName);

  return result;
}

function eliminateUselessExpressionStatements(sourceText: string, fileName: string): string {
  const sourceFile = ts.createSourceFile(fileName, sourceText, ts.ScriptTarget.Latest, true);

  const uselessStatements: ts.ExpressionStatement[] = [];

  function visit(node: ts.Node): void {
    if (ts.isExpressionStatement(node)) {
      const expr = node.expression;
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

function isDeclarationSite(node: ts.Identifier): boolean {
  const parent = node.parent;
  if (!parent) return false;

  if (ts.isVariableDeclaration(parent) && parent.name === node) return true;
  if (ts.isFunctionDeclaration(parent) && parent.name === node) return true;
  if (ts.isParameter(parent) && parent.name === node) return true;
  if (ts.isPropertyAssignment(parent) && parent.name === node) return true;
  if (ts.isShorthandPropertyAssignment(parent) && parent.name === node) return false;
  if (ts.isImportSpecifier(parent) && parent.name === node) return true;
  if (ts.isBindingElement(parent) && parent.name === node) return true;
  if (ts.isClassDeclaration(parent) && parent.name === node) return true;
  if (ts.isInterfaceDeclaration(parent) && parent.name === node) return true;
  if (ts.isTypeAliasDeclaration(parent) && parent.name === node) return true;
  if (ts.isEnumDeclaration(parent) && parent.name === node) return true;
  if (ts.isMethodDeclaration(parent) && parent.name === node) return true;
  if (ts.isPropertyDeclaration(parent) && parent.name === node) return true;
  if (ts.isCatchClause(parent) && parent.variableDeclaration?.name === node) return true;

  return false;
}

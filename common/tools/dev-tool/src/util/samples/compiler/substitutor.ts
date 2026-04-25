// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import ts from "typescript";
import { Substitution, CompilerError } from "./types.js";
import { isDeclarationName } from "./bindingAnalyzer.js";

/**
 * Result of the forPublishing substitution pass.
 */
export interface SubstitutionResult {
  /** The transformed source file with forPublishing calls replaced */
  transformedFile: ts.SourceFile;
  /** Details of each substitution performed */
  substitutions: Substitution[];
}

/**
 * Result of the sampleOnly substitution pass.
 */
export interface SampleOnlyResult {
  /** The transformed source file with sampleOnly calls replaced */
  transformedFile: ts.SourceFile;
  /** Count of sampleOnly calls replaced */
  replacementCount: number;
}

/**
 * Collect all identifier names referenced in an expression.
 * For property access chains like `process.env.X`, collects all identifiers
 * (`process`, `env`, `X`).
 */
function collectReferencedSymbols(node: ts.Expression): string[] {
  const symbols: string[] = [];
  function walk(n: ts.Node): void {
    if (ts.isIdentifier(n)) {
      symbols.push(n.text);
    }
    ts.forEachChild(n, walk);
  }
  walk(node);
  return symbols;
}

/**
 * Collect free variable names referenced in an expression.
 * Unlike `collectReferencedSymbols`, this only collects root-level identifiers:
 * for `x.y.z` only `x` is collected (not `y`, `z`), since `y` and `z` are
 * property names rather than binding references.
 */
export function collectFreeVariables(node: ts.Expression): Set<string> {
  const names = new Set<string>();
  const localScopes: Set<string>[] = [];

  function isLocal(name: string): boolean {
    for (const scope of localScopes) {
      if (scope.has(name)) return true;
    }
    return false;
  }

  function visit(n: ts.Node): void {
    if (ts.isPropertyAccessExpression(n)) {
      // Only visit the left side (expression), not the .name
      visit(n.expression);
      return;
    }

    // Enter nested function/arrow scope — collect parameters
    if (ts.isArrowFunction(n) || ts.isFunctionExpression(n)) {
      const scope = new Set<string>();
      for (const param of n.parameters) {
        collectBindingNames(param.name, scope);
      }
      localScopes.push(scope);
      ts.forEachChild(n, visit);
      localScopes.pop();
      return;
    }

    // Variable declarations inside expressions (rare but possible)
    if (ts.isVariableDeclaration(n) && ts.isIdentifier(n.name)) {
      if (localScopes.length > 0) {
        localScopes[localScopes.length - 1].add(n.name.text);
      }
    }

    if (ts.isIdentifier(n) && !isDeclarationName(n) && !isLocal(n.text)) {
      names.add(n.text);
    }
    ts.forEachChild(n, visit);
  }

  visit(node);
  return names;
}

function collectBindingNames(name: ts.BindingName, out: Set<string>): void {
  if (ts.isIdentifier(name)) {
    out.add(name.text);
  } else if (ts.isObjectBindingPattern(name) || ts.isArrayBindingPattern(name)) {
    for (const el of name.elements) {
      if (ts.isBindingElement(el)) {
        collectBindingNames(el.name, out);
      }
    }
  }
}

/**
 * Validate a `forPublishing(...)` call expression and extract the published expression.
 */
function validateAndExtract(
  node: ts.CallExpression,
  fileName: string,
  sourceFile: ts.SourceFile,
): ts.Expression {
  const args = node.arguments;

  if (args.length !== 2) {
    const { line } = sourceFile.getLineAndCharacterOfPosition(node.getStart(sourceFile));
    throw new CompilerError(
      `forPublishing expects exactly 2 arguments, got ${args.length}`,
      fileName,
      line + 1,
    );
  }

  const second = args[1];

  if (!ts.isArrowFunction(second)) {
    const { line } = sourceFile.getLineAndCharacterOfPosition(second.getStart(sourceFile));
    throw new CompilerError(
      "Second argument to forPublishing must be an arrow function",
      fileName,
      line + 1,
    );
  }

  if (second.parameters.length > 0) {
    const { line } = sourceFile.getLineAndCharacterOfPosition(second.getStart(sourceFile));
    throw new CompilerError(
      "Arrow function in forPublishing must take no parameters (use a thunk: () => expr)",
      fileName,
      line + 1,
    );
  }

  const body = second.body;

  if (ts.isBlock(body)) {
    const { line } = sourceFile.getLineAndCharacterOfPosition(body.getStart(sourceFile));
    throw new CompilerError(
      "Arrow function in forPublishing must have an expression body, not a block body",
      fileName,
      line + 1,
    );
  }

  return body as ts.Expression;
}

/**
 * Find all `forPublishing(testVal, () => sampleVal)` calls and replace them
 * with the arrow body expression.
 *
 * @param sourceFile - The parsed source file
 * @param fileName - For error messages
 * @returns The transformed source file and substitution details
 * @throws CompilerError if the call is malformed
 */
export function substituteForPublishing(
  sourceFile: ts.SourceFile,
  fileName: string = "<unknown>",
): SubstitutionResult {
  const substitutions: Substitution[] = [];

  // Find the local binding name for forPublishing from test-publishing import
  let forPublishingLocalName: string | undefined;
  for (const stmt of sourceFile.statements) {
    if (!ts.isImportDeclaration(stmt) || !stmt.moduleSpecifier) continue;
    const spec = ts.isStringLiteral(stmt.moduleSpecifier) ? stmt.moduleSpecifier.text : "";
    if (!spec.includes("test-publishing")) continue;
    const clause = stmt.importClause;
    if (!clause?.namedBindings || !ts.isNamedImports(clause.namedBindings)) continue;
    for (const el of clause.namedBindings.elements) {
      // el.propertyName is the original name (when aliased), el.name is the local name
      const originalName = el.propertyName?.text ?? el.name.text;
      if (originalName === "forPublishing") {
        forPublishingLocalName = el.name.text;
        break;
      }
    }
    if (forPublishingLocalName) break;
  }

  if (!forPublishingLocalName) {
    return { transformedFile: sourceFile, substitutions: [] };
  }

  const transformer: ts.TransformerFactory<ts.SourceFile> = (context) => {
    return (sf) => {
      function visitor(node: ts.Node): ts.Node {
        if (
          ts.isCallExpression(node) &&
          ts.isIdentifier(node.expression) &&
          node.expression.text === forPublishingLocalName
        ) {
          const publishedExpr = validateAndExtract(
            node as ts.CallExpression,
            fileName,
            sourceFile,
          );

          substitutions.push({
            originalNode: node as ts.CallExpression,
            publishedExpression: publishedExpr,
            referencedSymbols: collectReferencedSymbols(publishedExpr),
            freeVariables: collectFreeVariables(publishedExpr),
          });

          return publishedExpr;
        }

        return ts.visitEachChild(node, visitor, context);
      }

      return ts.visitEachChild(sf, visitor, context);
    };
  };

  const result = ts.transform(sourceFile, [transformer]);
  const transformedFile = result.transformed[0];
  result.dispose();

  return { transformedFile, substitutions };
}

/**
 * Validate a `sampleOnly(...)` call expression and extract the sample expression.
 *
 * sampleOnly takes a single argument: an arrow function returning the sample-only value.
 * At runtime it returns undefined; the compiler replaces the call with the arrow body.
 */
function validateAndExtractSampleOnly(
  node: ts.CallExpression,
  fileName: string,
  sourceFile: ts.SourceFile,
): ts.Expression {
  const args = node.arguments;

  if (args.length !== 1) {
    const { line } = sourceFile.getLineAndCharacterOfPosition(node.getStart(sourceFile));
    throw new CompilerError(
      `sampleOnly expects exactly 1 argument, got ${args.length}`,
      fileName,
      line + 1,
    );
  }

  const arg = args[0];

  if (!ts.isArrowFunction(arg)) {
    const { line } = sourceFile.getLineAndCharacterOfPosition(arg.getStart(sourceFile));
    throw new CompilerError(
      "Argument to sampleOnly must be an arrow function",
      fileName,
      line + 1,
    );
  }

  if (arg.parameters.length > 0) {
    const { line } = sourceFile.getLineAndCharacterOfPosition(arg.getStart(sourceFile));
    throw new CompilerError(
      "Arrow function in sampleOnly must take no parameters (use a thunk: () => expr)",
      fileName,
      line + 1,
    );
  }

  const body = arg.body;

  if (ts.isBlock(body)) {
    const { line } = sourceFile.getLineAndCharacterOfPosition(body.getStart(sourceFile));
    throw new CompilerError(
      "Arrow function in sampleOnly must have an expression body, not a block body",
      fileName,
      line + 1,
    );
  }

  return body as ts.Expression;
}

/**
 * Substitute `sampleOnly(() => expr)` calls with the arrow body expression.
 *
 * sampleOnly is simpler than forPublishing — there are no free variables to collect,
 * and the entire call is always replaced with the arrow body.
 */
export function substituteSampleOnly(
  sourceFile: ts.SourceFile,
  checker: ts.TypeChecker,
  fileName: string,
): SampleOnlyResult {
  // Find the sampleOnly import symbol
  let sampleOnlySymbol: ts.Symbol | undefined;

  for (const stmt of sourceFile.statements) {
    if (!ts.isImportDeclaration(stmt)) continue;
    const spec = stmt.moduleSpecifier;
    if (!ts.isStringLiteral(spec)) continue;
    // Only look in test-publishing imports
    if (!spec.text.includes("test-publishing")) continue;

    const clause = stmt.importClause;
    if (!clause?.namedBindings) continue;
    if (!ts.isNamedImports(clause.namedBindings)) continue;

    for (const el of clause.namedBindings.elements) {
      const importedName = el.propertyName?.text ?? el.name.text;
      if (importedName === "sampleOnly") {
        sampleOnlySymbol = checker.getSymbolAtLocation(el.name);
        break;
      }
    }
    if (sampleOnlySymbol) break;
  }

  // No sampleOnly import → nothing to substitute
  if (!sampleOnlySymbol) {
    return { transformedFile: sourceFile, replacementCount: 0 };
  }

  let replacementCount = 0;

  const transformer: ts.TransformerFactory<ts.SourceFile> = (context) => {
    return (sf) => {
      function visitor(node: ts.Node): ts.Node {
        if (
          ts.isCallExpression(node) &&
          ts.isIdentifier(node.expression) &&
          checker.getSymbolAtLocation(node.expression) === sampleOnlySymbol
        ) {
          const sampleExpr = validateAndExtractSampleOnly(node, fileName, sf);
          replacementCount++;

          // TypeScript printer handles precedence automatically - just return the expression
          return sampleExpr;
        }

        return ts.visitEachChild(node, visitor, context);
      }

      return ts.visitEachChild(sf, visitor, context);
    };
  };

  const result = ts.transform(sourceFile, [transformer]);
  const transformedFile = result.transformed[0];
  result.dispose();

  return { transformedFile, replacementCount };
}

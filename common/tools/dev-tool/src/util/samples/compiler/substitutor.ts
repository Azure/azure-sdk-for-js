// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import ts from "typescript";
import { Substitution, CompilerError } from "./types.js";

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
  function visit(n: ts.Node): void {
    if (ts.isPropertyAccessExpression(n)) {
      // Only visit the left side (expression), not the .name
      visit(n.expression);
      return;
    }
    if (ts.isIdentifier(n)) {
      names.add(n.text);
    }
    ts.forEachChild(n, visit);
  }
  visit(node);
  return names;
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

  const transformer: ts.TransformerFactory<ts.SourceFile> = (context) => {
    return (sf) => {
      function visitor(node: ts.Node): ts.Node {
        if (
          ts.isCallExpression(node) &&
          ts.isIdentifier(node.expression) &&
          node.expression.text === "forPublishing"
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

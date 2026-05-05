// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import ts from "typescript";

/**
 * Extract environment variable names from source text using AST analysis.
 *
 * Detects:
 * - `process.env.VARIABLE_NAME`
 * - `process?.env.VARIABLE_NAME` (optional chaining)
 * - `process.env["VARIABLE_NAME"]`
 * - `process.env['VARIABLE_NAME']`
 * - `const { VAR1, VAR2 } = process.env`
 * - `const { VAR1: alias } = process.env`
 * - `const { VAR1 = "default" } = process.env`
 * - `const { VAR1: alias = "default" } = process.env`
 * - `globalThis.process.env.VARIABLE_NAME`
 * - `globalThis.process?.env.VARIABLE_NAME`
 *
 * Uses TypeScript's parser for correctness — ignores matches in comments and strings.
 */
export function extractEnvVarNames(text: string): string[] {
  const vars = new Set<string>();

  // Parse the source text
  const sourceFile = ts.createSourceFile("env.ts", text, ts.ScriptTarget.Latest, true);

  /**
   * Check if a node is `process.env`, `process?.env`, `globalThis.process.env`, or
   * `globalThis.process?.env`.
   *
   * Handles both regular property access and optional chaining.
   */
  function isProcessEnv(node: ts.Node): boolean {
    // Check for `.env` property (can be PropertyAccessExpression or property in chain)
    if (!ts.isPropertyAccessExpression(node)) return false;
    if (node.name.text !== "env") return false;

    // The expression before `.env` must be `process` or `globalThis.process`
    const processExpr = node.expression;

    // Case 1: process.env or process?.env
    if (ts.isIdentifier(processExpr) && processExpr.text === "process") {
      return true;
    }

    // Case 2: globalThis.process.env or globalThis.process?.env
    if (ts.isPropertyAccessExpression(processExpr)) {
      if (
        processExpr.name.text === "process" &&
        ts.isIdentifier(processExpr.expression) &&
        processExpr.expression.text === "globalThis"
      ) {
        return true;
      }
    }

    return false;
  }

  /**
   * Check if this is `process?.env` or `globalThis.process?.env` using optional chaining.
   * In TS AST, `a?.b.c` is represented as a NonNullExpression or similar construct.
   * For `process?.env.VAR`, the chain is: PropertyAccess(PropertyAccess(process, ?env), VAR)
   */
  function isProcessEnvChain(node: ts.Node): boolean {
    // For optional chaining like process?.env, we also need to check through the chain
    if (!ts.isPropertyAccessExpression(node) && !ts.isPropertyAccessChain(node)) return false;

    // node.name should be "env"
    const propAccess = node as ts.PropertyAccessExpression;
    if (propAccess.name.text !== "env") return false;

    const processExpr = propAccess.expression;

    // Check if the expression is `process` (identifier)
    if (ts.isIdentifier(processExpr) && processExpr.text === "process") {
      return true;
    }

    // Check for globalThis.process or globalThis.process?
    if (ts.isPropertyAccessExpression(processExpr) || ts.isPropertyAccessChain(processExpr)) {
      const nestedAccess = processExpr as ts.PropertyAccessExpression;
      if (
        nestedAccess.name.text === "process" &&
        ts.isIdentifier(nestedAccess.expression) &&
        nestedAccess.expression.text === "globalThis"
      ) {
        return true;
      }
    }

    return false;
  }

  /**
   * Combined check for process.env patterns
   */
  function isAnyProcessEnv(node: ts.Node): boolean {
    return isProcessEnv(node) || isProcessEnvChain(node);
  }

  /**
   * Walk the AST and collect environment variable names
   */
  function visit(node: ts.Node): void {
    // Case 1: process.env.VAR_NAME (property access on process.env)
    if (ts.isPropertyAccessExpression(node) && isAnyProcessEnv(node.expression)) {
      const name = node.name.text;
      if (/^[A-Za-z_][A-Za-z0-9_]*$/.test(name)) {
        vars.add(name);
      }
      return; // Don't recurse into children
    }

    // Case 2: process.env["VAR_NAME"] or process.env['VAR_NAME'] (element access)
    if (ts.isElementAccessExpression(node) && isAnyProcessEnv(node.expression)) {
      const arg = node.argumentExpression;
      if (ts.isStringLiteral(arg)) {
        const name = arg.text;
        if (/^[A-Za-z_][A-Za-z0-9_]*$/.test(name)) {
          vars.add(name);
        }
      }
      return; // Don't recurse into children
    }

    // Case 3: const { VAR1, VAR2 } = process.env (destructuring assignment)
    if (ts.isVariableDeclaration(node) && node.initializer && isAnyProcessEnv(node.initializer)) {
      // node.name is the binding pattern (e.g., { VAR1, VAR2: alias = "default" })
      if (ts.isObjectBindingPattern(node.name)) {
        for (const element of node.name.elements) {
          // element.propertyName is the original property (VAR1 in "VAR1: alias")
          // element.name is the local binding (alias in "VAR1: alias", or VAR1 if no colon)
          const propName = element.propertyName ?? element.name;
          if (ts.isIdentifier(propName)) {
            const name = propName.text;
            if (/^[A-Za-z_][A-Za-z0-9_]*$/.test(name)) {
              vars.add(name);
            }
          }
          // Also check initializers (defaults) for additional process.env references
          // e.g., { FOO = process.env.BAR } = process.env
          if (element.initializer) {
            visit(element.initializer);
          }
        }
      }
      return; // Don't recurse into children (we handled initializers manually above)
    }

    // Recurse into children
    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
  return [...vars].sort();
}

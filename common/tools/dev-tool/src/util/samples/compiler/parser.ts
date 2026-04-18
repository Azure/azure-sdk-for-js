// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import ts from "typescript";
import {
  ParsedSampleTestFile,
  SampleMetadata,
  ParsedItBlock,
  ParsedHook,
  CompilerError,
} from "./types.js";

/**
 * Parse a sample-test source file into its structural components.
 *
 * @param sourceFile - The parsed TypeScript source file
 * @param fileName - For error messages
 * @returns The parsed structure, or null if no @summary tag is found
 * @throws CompilerError for structural issues (nested describe, missing describe/it)
 */
export function parseSampleTestFile(
  sourceFile: ts.SourceFile,
  fileName: string = sourceFile.fileName,
): ParsedSampleTestFile | null {
  const metadata = parseMetadata(sourceFile);
  if (!metadata) {
    return null;
  }

  const imports = sourceFile.statements.filter(ts.isImportDeclaration);

  const describeStatement = findDescribeStatement(sourceFile, fileName);
  if (!describeStatement) {
    throw new CompilerError("No describe block found", fileName);
  }

  const describeCall = describeStatement.expression as ts.CallExpression;
  const describeDescription = extractStringArgument(describeCall);
  const callbackBody = extractCallbackBody(describeCall);

  if (!callbackBody) {
    throw new CompilerError("Could not extract describe callback body", fileName);
  }

  // Check for nested describes
  for (const stmt of callbackBody.statements) {
    if (ts.isExpressionStatement(stmt) && ts.isCallExpression(stmt.expression)) {
      const callee = stmt.expression.expression;
      if (ts.isIdentifier(callee) && callee.text === "describe") {
        const line = sourceFile.getLineAndCharacterOfPosition(stmt.getStart()).line + 1;
        throw new CompilerError("Nested describe blocks are not supported", fileName, line);
      }
    }
  }

  const describeVariables: ts.VariableStatement[] = [];
  const itBlocks: ParsedItBlock[] = [];
  const beforeEachHooks: ParsedHook[] = [];
  const afterEachHooks: ParsedHook[] = [];

  for (const stmt of callbackBody.statements) {
    if (ts.isVariableStatement(stmt)) {
      describeVariables.push(stmt);
      continue;
    }

    if (ts.isExpressionStatement(stmt) && ts.isCallExpression(stmt.expression)) {
      const call = stmt.expression;
      const calleeName = getCalleeName(call);

      if (calleeName === "it" || calleeName === "it.skip" || calleeName === "it.only") {
        const description = extractStringArgument(call);
        const body = extractCallbackBody(call);
        itBlocks.push({
          description,
          body: body ? Array.from(body.statements) : [],
          node: stmt,
        });
      } else if (calleeName === "beforeEach") {
        const hook = parseHook("beforeEach", call, stmt);
        beforeEachHooks.push(hook);
      } else if (calleeName === "afterEach") {
        const hook = parseHook("afterEach", call, stmt);
        afterEachHooks.push(hook);
      }
    }
  }

  if (itBlocks.length === 0) {
    throw new CompilerError("No it blocks found in describe", fileName);
  }

  return {
    metadata,
    describeDescription,
    describeVariables,
    itBlocks,
    beforeEachHooks,
    afterEachHooks,
    imports: Array.from(imports),
    sourceFile,
  };
}

/**
 * Parse the file-top JSDoc comment for @summary and other azsdk tags.
 */
function parseMetadata(sourceFile: ts.SourceFile): SampleMetadata | null {
  const text = sourceFile.getFullText();

  // Find the first JSDoc-style comment in the file
  const jsdocMatch = text.match(/\/\*\*([\s\S]*?)\*\//);
  if (!jsdocMatch) {
    return null;
  }

  const jsdocText = jsdocMatch[1];

  // Extract @summary
  const summaryMatch = jsdocText.match(/@summary\s+(.+?)(?:\n|\*\/|$)/);
  if (!summaryMatch) {
    return null;
  }

  const summary = summaryMatch[1].replace(/\s*\*?\s*$/, "").trim();

  const metadata: SampleMetadata = { summary };

  // Extract @azsdk-weight
  const weightMatch = jsdocText.match(/@azsdk-weight\s+(\d+)/);
  if (weightMatch) {
    metadata.weight = parseInt(weightMatch[1], 10);
  }

  // Extract @azsdk-skip-javascript
  if (/@azsdk-skip-javascript/.test(jsdocText)) {
    metadata.skipJavascript = true;
  }

  // Extract @azsdk-ignore
  if (/@azsdk-ignore/.test(jsdocText)) {
    metadata.ignore = true;
  }

  return metadata;
}

/**
 * Find the top-level describe(...) ExpressionStatement.
 */
function findDescribeStatement(
  sourceFile: ts.SourceFile,
  _fileName: string,
): ts.ExpressionStatement | undefined {
  for (const stmt of sourceFile.statements) {
    if (ts.isExpressionStatement(stmt) && ts.isCallExpression(stmt.expression)) {
      const callee = stmt.expression.expression;
      if (ts.isIdentifier(callee) && callee.text === "describe") {
        return stmt;
      }
    }
  }
  return undefined;
}

/**
 * Get the callee name from a call expression: "it", "it.skip", "beforeEach", etc.
 */
function getCalleeName(call: ts.CallExpression): string {
  const expr = call.expression;
  if (ts.isIdentifier(expr)) {
    return expr.text;
  }
  if (ts.isPropertyAccessExpression(expr) && ts.isIdentifier(expr.expression)) {
    return `${expr.expression.text}.${expr.name.text}`;
  }
  return "";
}

/**
 * Extract the first string literal argument from a call expression.
 */
function extractStringArgument(call: ts.CallExpression): string {
  const firstArg = call.arguments[0];
  if (firstArg && ts.isStringLiteral(firstArg)) {
    return firstArg.text;
  }
  return "";
}

/**
 * Extract the body block from the callback argument of a call expression.
 * Handles: function expressions, arrow functions (block body).
 */
function extractCallbackBody(call: ts.CallExpression): ts.Block | undefined {
  // The callback is typically the last argument (or second for it/describe)
  for (let i = call.arguments.length - 1; i >= 0; i--) {
    const arg = call.arguments[i];
    if (ts.isFunctionExpression(arg) || ts.isArrowFunction(arg)) {
      if (ts.isBlock(arg.body)) {
        return arg.body;
      }
    }
  }
  return undefined;
}

/**
 * Parse a beforeEach/afterEach call into a ParsedHook.
 */
function parseHook(
  kind: "beforeEach" | "afterEach",
  call: ts.CallExpression,
  node: ts.ExpressionStatement,
): ParsedHook {
  const body = extractCallbackBody(call);
  let paramName: string | undefined;

  // Find the callback to get parameter name
  for (const arg of call.arguments) {
    if (ts.isFunctionExpression(arg) || ts.isArrowFunction(arg)) {
      if (arg.parameters.length > 0) {
        const param = arg.parameters[0];
        if (ts.isIdentifier(param.name)) {
          paramName = param.name.text;
        }
      }
      break;
    }
  }

  return {
    kind,
    body: body ? Array.from(body.statements) : [],
    paramName,
    node,
  };
}

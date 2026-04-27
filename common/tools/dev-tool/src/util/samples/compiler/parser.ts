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
 * @returns The parsed structure, or null if no description could be found
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
  const describeExtracted = extractCallback(describeCall);

  if (!describeExtracted) {
    throw new CompilerError("Could not extract describe callback body", fileName);
  }
  const callbackBody = describeExtracted.body;

  // Check for nested describes recursively (including describe.skip and describe.only)
  function checkForNestedDescribe(node: ts.Node): void {
    if (ts.isCallExpression(node)) {
      const callee = node.expression;
      const isDescribe =
        (ts.isIdentifier(callee) && callee.text === "describe") ||
        (ts.isPropertyAccessExpression(callee) &&
          ts.isIdentifier(callee.expression) &&
          callee.expression.text === "describe" &&
          (callee.name.text === "skip" || callee.name.text === "only"));
      if (isDescribe) {
        const line = sourceFile.getLineAndCharacterOfPosition(node.getStart()).line + 1;
        throw new CompilerError("Nested describe blocks are not supported", fileName, line);
      }
    }
    ts.forEachChild(node, checkForNestedDescribe);
  }
  for (const stmt of callbackBody.statements) {
    checkForNestedDescribe(stmt);
  }

  const describeStatements: ts.Statement[] = [];
  const itBlocks: ParsedItBlock[] = [];
  const beforeAllHooks: ParsedHook[] = [];
  const beforeEachHooks: ParsedHook[] = [];
  const afterAllHooks: ParsedHook[] = [];
  const afterEachHooks: ParsedHook[] = [];

  for (const stmt of callbackBody.statements) {
    if (ts.isVariableStatement(stmt)) {
      describeStatements.push(stmt);
      continue;
    }

    if (ts.isExpressionStatement(stmt) && ts.isCallExpression(stmt.expression)) {
      const call = stmt.expression;
      const kind = classifyCall(call);

      switch (kind) {
        case CallKind.It:
        case CallKind.ItSkip:
        case CallKind.ItOnly: {
          const description = extractStringArgument(call);
          const extracted = extractCallback(call);
          itBlocks.push({
            description,
            body: extracted ? Array.from(extracted.body.statements) : [],
            trailingComments: extracted ? extractTrailingComments(extracted.body, sourceFile) : "",
            node: stmt,
          });
          continue;
        }

        case CallKind.BeforeAll:
          beforeAllHooks.push(parseHook("beforeAll", call, stmt, sourceFile));
          continue;

        case CallKind.BeforeEach:
          beforeEachHooks.push(parseHook("beforeEach", call, stmt, sourceFile));
          continue;

        case CallKind.AfterAll:
          afterAllHooks.push(parseHook("afterAll", call, stmt, sourceFile));
          continue;

        case CallKind.AfterEach:
          afterEachHooks.push(parseHook("afterEach", call, stmt, sourceFile));
          continue;
      }
    }

    // Everything else: function declarations, class declarations,
    // unrecognized expression statements, etc.
    describeStatements.push(stmt);
  }

  if (itBlocks.length === 0) {
    throw new CompilerError("No it blocks found in describe", fileName);
  }

  // Detect non-import, non-describe top-level statements.
  // Type-only declarations (interfaces, type aliases) are allowed and preserved.
  // Runtime declarations (functions, classes, variables) would break the output
  // if referenced inside describe — make those a fatal error.
  const warnings: string[] = [];
  const invalidTopLevel: { line: number; kind: string }[] = [];
  const topLevelTypeDeclarations: ts.Statement[] = [];

  for (const stmt of sourceFile.statements) {
    // Skip imports and the describe statement
    if (ts.isImportDeclaration(stmt)) {
      continue;
    }
    if (stmt === describeStatement) {
      continue;
    }

    // Type-only declarations are allowed — they don't affect runtime
    if (ts.isTypeAliasDeclaration(stmt) || ts.isInterfaceDeclaration(stmt)) {
      topLevelTypeDeclarations.push(stmt);
      continue;
    }

    // Any other top-level statement is an error
    const line = sourceFile.getLineAndCharacterOfPosition(stmt.getStart()).line + 1;
    let kind = "statement";
    if (ts.isFunctionDeclaration(stmt)) kind = "function";
    else if (ts.isClassDeclaration(stmt)) kind = "class";
    else if (ts.isVariableStatement(stmt)) kind = "variable";
    invalidTopLevel.push({ line, kind });
  }
  if (invalidTopLevel.length > 0) {
    const details = invalidTopLevel.map((t) => `  - ${t.kind} at line ${t.line}`).join("\n");
    throw new CompilerError(
      `Found ${invalidTopLevel.length} statement(s) outside describe block. ` +
        `Move these inside the describe or into a helper file:\n${details}`,
      fileName,
    );
  }

  return {
    metadata,
    describeDescription,
    describeStatements,
    itBlocks,
    beforeAllHooks,
    beforeEachHooks,
    afterAllHooks,
    afterEachHooks,
    imports: Array.from(imports),
    sourceFile,
    warnings,
    topLevelTypeDeclarations,
  };
}

/**
 * Check if a call expression is a describe call (describe, describe.skip, describe.only).
 */
function isDescribeCall(call: ts.CallExpression): boolean {
  const callee = call.expression;
  return (
    (ts.isIdentifier(callee) && callee.text === "describe") ||
    (ts.isPropertyAccessExpression(callee) &&
      ts.isIdentifier(callee.expression) &&
      callee.expression.text === "describe" &&
      (callee.name.text === "skip" || callee.name.text === "only"))
  );
}

/**
 * Parse the file-top JSDoc comment for the description and other azsdk tags.
 * Uses AST-based comment extraction to find the file-level leading JSDoc comment.
 *
 * Checks two locations (in order of preference):
 * 1. Leading comment on the first statement (standard file header position)
 * 2. Leading comment on the describe block (legacy/alternative position)
 *
 * Supports both summary tags and plain first-paragraph descriptions.
 */
function parseMetadata(sourceFile: ts.SourceFile): SampleMetadata | null {
  const text = sourceFile.getFullText();

  // Try to find JSDoc in two places: first statement, or describe statement
  const statementsToCheck: ts.Statement[] = [];

  // 1. First statement (standard file header position)
  const firstStatement = sourceFile.statements[0];
  if (firstStatement) {
    statementsToCheck.push(firstStatement);
  }

  // 2. Find the describe statement (may be different from first)
  // Supports both describe() and describe.skip/only()
  for (const stmt of sourceFile.statements) {
    if (ts.isExpressionStatement(stmt) && ts.isCallExpression(stmt.expression)) {
      if (isDescribeCall(stmt.expression)) {
        if (stmt !== firstStatement) {
          statementsToCheck.push(stmt);
        }
        break;
      }
    }
  }

  // Find the first JSDoc-style comment in any of the candidate statements
  let jsdocText: string | undefined;
  for (const stmt of statementsToCheck) {
    const commentRanges = ts.getLeadingCommentRanges(text, stmt.pos);
    if (!commentRanges || commentRanges.length === 0) {
      continue;
    }

    for (const range of commentRanges) {
      const comment = text.slice(range.pos, range.end);
      if (comment.startsWith("/**")) {
        // Extract the content between /** and */
        jsdocText = comment.slice(3, -2);
        break;
      }
    }
    if (jsdocText) break;
  }

  if (!jsdocText) {
    return null;
  }

  // Extract @summary if present (backward-compatible)
  const summaryMatch = jsdocText.match(/@summary\s+([\s\S]*?)(?=\s*@\w|$)/);

  let summary: string | undefined;

  if (summaryMatch) {
    summary = summaryMatch[1]
      .split("\n")
      .map((line) => line.replace(/^\s*\*?\s*/, "").trim())
      .filter((line) => line.length > 0)
      .join(" ");
  } else {
    // Fall back to the first non-empty paragraph of the JSDoc comment (TSDoc-standard)
    const lines = jsdocText
      .split("\n")
      .map((line) => line.replace(/^\s*\*\s?/, "").trim())
      .filter((line) => line.length > 0 && !line.startsWith("@"));
    if (lines.length > 0) {
      summary = lines[0];
    }
  }

  if (!summary) {
    return null;
  }

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
  fileName: string,
): ts.ExpressionStatement | undefined {
  let foundDescribe: ts.ExpressionStatement | undefined;

  for (const stmt of sourceFile.statements) {
    if (ts.isExpressionStatement(stmt) && ts.isCallExpression(stmt.expression)) {
      if (isDescribeCall(stmt.expression)) {
        if (foundDescribe) {
          // Multiple top-level describes found — this is an error
          const firstLine =
            sourceFile.getLineAndCharacterOfPosition(foundDescribe.getStart()).line + 1;
          const secondLine = sourceFile.getLineAndCharacterOfPosition(stmt.getStart()).line + 1;
          throw new CompilerError(
            `Multiple top-level describe blocks found (lines ${firstLine} and ${secondLine}). ` +
              `Sample-test files must have exactly one top-level describe.`,
            fileName,
          );
        }
        foundDescribe = stmt;
      }
    }
  }

  return foundDescribe;
}

/**
 * Known test call kinds for structured dispatch.
 */
const enum CallKind {
  It = "it",
  ItSkip = "it.skip",
  ItOnly = "it.only",
  BeforeAll = "beforeAll",
  BeforeEach = "beforeEach",
  AfterAll = "afterAll",
  AfterEach = "afterEach",
  Unknown = "",
}

/**
 * Classify a call expression into a known test call kind.
 */
function classifyCall(call: ts.CallExpression): CallKind {
  const expr = call.expression;
  if (ts.isIdentifier(expr)) {
    switch (expr.text) {
      case "it":
        return CallKind.It;
      case "beforeAll":
        return CallKind.BeforeAll;
      case "beforeEach":
        return CallKind.BeforeEach;
      case "afterAll":
        return CallKind.AfterAll;
      case "afterEach":
        return CallKind.AfterEach;
      default:
        return CallKind.Unknown;
    }
  }
  if (ts.isPropertyAccessExpression(expr) && ts.isIdentifier(expr.expression)) {
    if (expr.expression.text === "it") {
      switch (expr.name.text) {
        case "skip":
          return CallKind.ItSkip;
        case "only":
          return CallKind.ItOnly;
        default:
          return CallKind.Unknown;
      }
    }
  }
  return CallKind.Unknown;
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

/** Result of extracting a callback body. */
interface ExtractedCallback {
  body: ts.Block;
}

/**
 * Extract the body block from the callback argument of a call expression.
 * Handles: function expressions, arrow functions (block body and expression body).
 *
 * For expression-bodied arrows (both async and non-async), wraps as `{ await expr; }`
 * to preserve promise semantics. The sample's main() function is always async,
 * so awaiting promise-returning expressions ensures they complete before the sample exits.
 */
function extractCallback(call: ts.CallExpression): ExtractedCallback | undefined {
  // The callback is typically the last argument (or second for it/describe)
  for (let i = call.arguments.length - 1; i >= 0; i--) {
    const arg = call.arguments[i];
    if (ts.isFunctionExpression(arg) || ts.isArrowFunction(arg)) {
      if (ts.isBlock(arg.body)) {
        return { body: arg.body };
      }
      // Expression body (e.g. () => expr): wrap in a synthetic block with await.
      // Always await since samples run in async main() — this ensures promise-returning
      // expressions complete before the sample exits (e.g., `() => client.doThing()`).
      if (ts.isArrowFunction(arg) && !ts.isBlock(arg.body)) {
        const awaitedExpr = ts.factory.createAwaitExpression(arg.body);
        return {
          body: ts.factory.createBlock([ts.factory.createExpressionStatement(awaitedExpr)]),
        };
      }
    }
  }
  return undefined;
}

/** Check if a function-like has the async modifier. */
function hasAsyncModifier(
  node: ts.FunctionExpression | ts.ArrowFunction | ts.FunctionDeclaration,
): boolean {
  const mods = ts.canHaveModifiers(node) ? ts.getModifiers(node) : undefined;
  return mods?.some((m) => m.kind === ts.SyntaxKind.AsyncKeyword) ?? false;
}

/**
 * Parse a beforeEach/afterEach call into a ParsedHook.
 */
function parseHook(
  kind: "beforeAll" | "afterAll" | "beforeEach" | "afterEach",
  call: ts.CallExpression,
  node: ts.ExpressionStatement,
  sourceFile: ts.SourceFile,
): ParsedHook {
  const extracted = extractCallback(call);

  return {
    kind,
    body: extracted ? Array.from(extracted.body.statements) : [],
    trailingComments: extracted ? extractTrailingComments(extracted.body, sourceFile) : "",
    node,
  };
}

/**
 * Extract comment lines between the last statement (or opening brace if empty) and the closing brace.
 * These trailing comments (e.g., `// @snippet-end Foo`) are leading trivia of the
 * closing brace and aren't attached to any body statement.
 */
function extractTrailingComments(block: ts.Block, sourceFile: ts.SourceFile): string {
  const statements = block.statements;

  // Synthetic blocks (e.g. from expression-bodied arrows) have no source positions
  if (block.pos === -1) return "";

  // The closing brace is the last character of the block
  const closeBracePos = block.getEnd() - 1;

  // Determine start position: after last statement, or after opening brace if empty
  let startPos: number;
  if (statements.length === 0) {
    // Empty block: scan from after opening brace to before closing brace
    // Find the opening brace position (first character of block text)
    const fullText = sourceFile.getFullText();
    const blockText = fullText.substring(block.pos, block.getEnd());
    const openBraceOffset = blockText.indexOf("{");
    if (openBraceOffset === -1) return "";
    startPos = block.pos + openBraceOffset + 1; // position after '{'
  } else {
    const lastStmt = statements[statements.length - 1];
    startPos = lastStmt.getEnd();
  }

  if (closeBracePos <= startPos) return "";

  const text = sourceFile.getFullText().substring(startPos, closeBracePos);
  const commentLines = text
    .split("\n")
    .filter((l) => l.trim().startsWith("//"))
    .map((l) => l.trim());

  return commentLines.join("\n");
}

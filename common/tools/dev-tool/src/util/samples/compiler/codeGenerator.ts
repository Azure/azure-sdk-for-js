// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Code generator for the sample-tests compiler.
 *
 * Takes a ParsedSampleTestFile and produces the final sample layout:
 * copyright header, summary JSDoc, module-level variables, named async
 * functions (one per `it` block), a `main()` function, and a catch handler.
 */

import ts from "typescript";
import type { ParsedSampleTestFile, SampleMetadata } from "./types.js";

/**
 * Result of generating sample code from a parsed test file.
 */
export interface GeneratedSample {
  /** The generated statements (imports are NOT included; caller adds them) */
  statements: ts.Statement[];
  /** Function names in call order for main() */
  functionNames: string[];
}

/**
 * Convert an `it` block description to a camelCase function name.
 *
 * Rules:
 * - Split on spaces, hyphens, underscores, and non-alphanumeric chars
 * - First word lowercase, subsequent words capitalized
 * - Remove non-alphanumeric characters
 * - If result starts with a digit, prefix with `_`
 * - Empty input returns "sample"
 */
export function descriptionToFunctionName(description: string): string {
  // Replace non-alphanumeric chars (except spaces/hyphens/underscores) with spaces to act as word boundaries
  const cleaned = description.replace(/[^a-zA-Z0-9\s\-_]/g, " ");
  const tokens = cleaned
    .split(/[\s\-_]+/)
    .filter((w) => w.length > 0);

  // Split each token on camelCase/PascalCase boundaries
  // e.g. "ReadmeSampleCreateClient" → ["Readme", "Sample", "Create", "Client"]
  const words: string[] = [];
  for (const token of tokens) {
    words.push(...token.split(/(?<=[a-z])(?=[A-Z])|(?<=[A-Z])(?=[A-Z][a-z])/));
  }

  if (words.length === 0) return "sample";

  const result = words
    .map((word, i) => {
      const lower = word.toLowerCase();
      if (i === 0) return lower;
      return lower[0].toUpperCase() + lower.slice(1);
    })
    .join("");

  if (/^\d/.test(result)) return "_" + result;
  return result;
}

/**
 * Generate sample code from a parsed test file structure.
 *
 * Produces:
 * 1. A copyright header comment
 * 2. A @summary JSDoc comment
 * 3. Module-level variable declarations (from describe scope)
 * 4. Named async functions (one per `it` block)
 * 5. A main() function that:
 *    a. Runs surviving beforeEach assignments as first statements
 *    b. Calls each named function in order
 * 6. A main().catch() error handler
 */
export function generateSampleCode(
  parsed: ParsedSampleTestFile,
  survivingBeforeEachStatements: ts.Statement[],
): GeneratedSample {
  const { factory } = ts;
  const statements: ts.Statement[] = [];
  const functionNames: string[] = [];

  // 1 & 2. Copyright header + summary JSDoc as a placeholder empty statement
  const copyrightAndSummary = createCopyrightAndSummary(parsed.metadata);
  statements.push(copyrightAndSummary);

  // 3. Module-level variable declarations
  for (const varStmt of parsed.describeVariables) {
    statements.push(varStmt);
  }

  // 4. Named async functions for each it block
  for (const itBlock of parsed.itBlocks) {
    const fnName = descriptionToFunctionName(itBlock.description);
    functionNames.push(fnName);

    const fnDecl = factory.createFunctionDeclaration(
      [factory.createModifier(ts.SyntaxKind.AsyncKeyword)],
      undefined,
      fnName,
      undefined,
      [],
      undefined,
      factory.createBlock(itBlock.body, true),
    );
    statements.push(fnDecl);
  }

  // 5. main() function
  const mainBodyStatements: ts.Statement[] = [];

  // 5a. Surviving beforeEach statements
  for (const stmt of survivingBeforeEachStatements) {
    mainBodyStatements.push(stmt);
  }

  // 5b. await calls to each named function
  for (const fnName of functionNames) {
    mainBodyStatements.push(
      factory.createExpressionStatement(
        factory.createAwaitExpression(
          factory.createCallExpression(factory.createIdentifier(fnName), undefined, []),
        ),
      ),
    );
  }

  const mainFn = factory.createFunctionDeclaration(
    [
      factory.createModifier(ts.SyntaxKind.ExportKeyword),
      factory.createModifier(ts.SyntaxKind.AsyncKeyword),
    ],
    undefined,
    "main",
    undefined,
    [],
    factory.createTypeReferenceNode("Promise", [
      factory.createKeywordTypeNode(ts.SyntaxKind.VoidKeyword),
    ]),
    factory.createBlock(mainBodyStatements, true),
  );
  statements.push(mainFn);

  // 6. main().catch((error) => { console.error(error); process.exit(1); })
  const catchHandler = factory.createExpressionStatement(
    factory.createCallExpression(
      factory.createPropertyAccessExpression(
        factory.createCallExpression(factory.createIdentifier("main"), undefined, []),
        "catch",
      ),
      undefined,
      [
        factory.createArrowFunction(
          undefined,
          undefined,
          [
            factory.createParameterDeclaration(
              undefined,
              undefined,
              "error",
              undefined,
              undefined,
              undefined,
            ),
          ],
          undefined,
          factory.createToken(ts.SyntaxKind.EqualsGreaterThanToken),
          factory.createBlock(
            [
              factory.createExpressionStatement(
                factory.createCallExpression(
                  factory.createPropertyAccessExpression(
                    factory.createIdentifier("console"),
                    "error",
                  ),
                  undefined,
                  [factory.createIdentifier("error")],
                ),
              ),
              factory.createExpressionStatement(
                factory.createCallExpression(
                  factory.createPropertyAccessExpression(
                    factory.createIdentifier("process"),
                    "exit",
                  ),
                  undefined,
                  [factory.createNumericLiteral(1)],
                ),
              ),
            ],
            true,
          ),
        ),
      ],
    ),
  );
  statements.push(catchHandler);

  return { statements, functionNames };
}

/**
 * Create a placeholder empty statement carrying the copyright header and
 * summary JSDoc as synthetic leading comments.
 */
function createCopyrightAndSummary(metadata: SampleMetadata): ts.Statement {
  const { factory } = ts;

  // We use an empty statement as a comment anchor
  let node: ts.Statement = factory.createEmptyStatement();

  // Copyright header (two single-line comments)
  node = ts.addSyntheticLeadingComment(
    node,
    ts.SyntaxKind.SingleLineCommentTrivia,
    " Copyright (c) Microsoft Corporation.",
    true, // hasTrailingNewLine
  );
  node = ts.addSyntheticLeadingComment(
    node,
    ts.SyntaxKind.SingleLineCommentTrivia,
    " Licensed under the MIT License.",
    true,
  );

  // Build the JSDoc body with @summary and any @azsdk-* tags
  const lines: string[] = [`*`, ` * @summary ${metadata.summary}`];
  if (metadata.weight !== undefined) {
    lines.push(` * @azsdk-weight ${metadata.weight}`);
  }
  if (metadata.skipJavascript) {
    lines.push(` * @azsdk-skip-javascript`);
  }
  if (metadata.ignore) {
    lines.push(` * @azsdk-ignore`);
  }
  lines.push(` `);

  // Summary JSDoc (multi-line comment)
  node = ts.addSyntheticLeadingComment(
    node,
    ts.SyntaxKind.MultiLineCommentTrivia,
    lines.join("\n"),
    true,
  );

  return node;
}

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as ts from "typescript";
import { createPrinter } from "../printer";

const log = createPrinter("samples:processor");

/**
 * Tests for syntax compatibility.
 *
 * This is a Map from Category -> Name -> Test, where Test is a predicate that determines if a ts.Node is an instance
 * of the syntax form. For example:
 *
 * ES2020 -> NullishCoalesce -> ts.isNullishCoalesce
 * Category: ES2020
 * Name: NullishCoalesce
 * Test: ts.isNullishCoalesce (TS API built-in helper)
 *
 * If the test returns true, then the syntax is considered unsupported by the compiler, and an error will be generated
 * during sample publication.
 */
const SYNTAX_VIABILITY_TESTS = {
  CommonJS: {
    // require(<not a literal string>)
    DynamicRequire: (node: ts.Node) =>
      ts.isCallExpression(node) &&
      ts.isIdentifier(node.expression) &&
      node.expression.text === "require" &&
      !ts.isStringLiteral(node.arguments[0]),
  },
  ESModule: {
    // TODO: this is difficult to support well, but we could do it by enforcing that the RHS is a static require call
    ImportEquals: ts.isImportEqualsDeclaration,
    // These are possible to support, but samples that really need them should probably have their own unique setup
    // export { ... }, export foo from "bar", export * as foo from "bar", and export { ... } from "foo";
    ExportDeclaration: ts.isExportDeclaration,
    // export = { ... }
    ExportAssignment: ts.isExportAssignment,
  },
  ES2020: {
    // 1n
    BigInt: ts.isBigIntLiteral,
    // import("foo")
    ImportExpression: (node: ts.Node) =>
      ts.isCallExpression(node) && node.expression.kind === ts.SyntaxKind.ImportKeyword,
    // foo ?? bar
    NullishCoalesce: ts.isNullishCoalesce,
    // foo?.bar, foo?.(bar), and foo?.[bar]
    OptionalChain: ts.isOptionalChain,
  },
  ES2021: {
    // x ??= y, x ||= y, and x &&= y
    ShorthandAssignment: (node: ts.Node) =>
      ts.isBinaryExpression(node) &&
      [
        ts.SyntaxKind.AmpersandAmpersandEqualsToken,
        ts.SyntaxKind.BarBarEqualsToken,
        ts.SyntaxKind.QuestionQuestionEqualsToken,
      ].includes(node.operatorToken.kind),
    // 1_000_000
    NumericSeparator: (node: ts.Node) =>
      ts.isNumericLiteral(node) && !!node.getText().includes("_"),
  },
  ES2022: {
    // This is well-supported in TypeScript but is emitted as an assignment rather than a `static`
    // static foo = "bar"
    StaticField: (node: ts.Node) =>
      ts.isPropertyDeclaration(node) &&
      node.modifiers?.some((modifier) => modifier.kind === ts.SyntaxKind.StaticKeyword),
    // #foo
    PrivateIdentifier: ts.isPrivateIdentifier,
    // static { ... }
    StaticInitializer: ts.isClassStaticBlockDeclaration,
  },
} as const;

/**
 * Converts a union type U of types [T1, T2, ... Tn] into an intersection of the same types.
 */
type UnionToIntersection<Union> =
  // Evil distributive magic. The first conditional distributes U into a union of functions, then the second conditional
  // infers an intersection due to variance inversion.
  (Union extends unknown ? (k: Union) => void : never) extends (k: infer Intersection) => void
    ? Intersection
    : never;

type SyntaxTest = (node: ts.Node) => boolean;

type SyntaxName = keyof UnionToIntersection<
  typeof SYNTAX_VIABILITY_TESTS[keyof typeof SYNTAX_VIABILITY_TESTS]
>;

/**
 * Suggestions. Each item in the map is the name of a syntax item from SYNTAX_VIABILITY_TESTS and the values are either
 * strings or functions of nodes that yield strings.
 */
const SUGGEST_SYNTAX: {
  [K in SyntaxName]?: ((node: ts.Node) => string) | string;
} = {
  DynamicRequire: "use static import/exports in samples for the best TypeScript experience",
  ExportAssignment: "export each symbol individually instead of using `export =`",
  ExportDeclaration:
    "export each symbol individually where it is declared instead of using a blanket export declaration",
  OptionalChain: (node) => {
    const chain = node as ts.OptionalChain;
    const expressionText = chain.expression.getText().replace(/\?\./g, ".");
    // We need some text for the right-hand side
    const rhs = (
      ts.isPropertyAccessExpression(chain)
        ? "." + chain.name.text
        : ts.isElementAccessExpression(chain)
        ? "[" + chain.argumentExpression.getText() + "]"
        : ts.isCallExpression(chain)
        ? "(" + chain.arguments.map((node) => node.getText()).join(", ") + ")"
        : (() => {
            log.warn(
              "[Internal Error] Unknown right-hand-side of Optional Chain:",
              chain.getText()
            );
            return "<unknown>";
          })()
    ).replace(/\?\./g, ".");
    return `try \`${expressionText} && ${expressionText}${rhs}\` if it does not affect runtime behavior, or use an explicit \`if\` block to handle the nullish case`;
  },
  NullishCoalesce: (node) => {
    const nullish = node as ts.BinaryExpression;
    return `try \`${nullish.left.getText()} || ${nullish.right.getText()}\` if it does not affect runtime behavior, or use an explicit \`if\` block to handle the nullish case`;
  },
};

/**
 * An error message and optional suggestion message.
 */
export interface SyntaxSupportError {
  /**
   * The primary error message
   */
  message: string;
  /**
   * An optional suggestion for how to remediate the error.
   */
  suggest?: string;
}

export function testSyntax(node: ts.Node): SyntaxSupportError | undefined {
  for (const [category, tests] of Object.entries(SYNTAX_VIABILITY_TESTS)) {
    for (const [syntaxName, test] of Object.entries(tests) as [SyntaxName, SyntaxTest][]) {
      if (test(node)) {
        const suggest = SUGGEST_SYNTAX[syntaxName];
        return {
          message: `unsupported ${category} "${syntaxName}" syntax`,
          suggest: typeof suggest === "string" ? suggest : suggest?.(node),
        };
      }
    }
  }
}

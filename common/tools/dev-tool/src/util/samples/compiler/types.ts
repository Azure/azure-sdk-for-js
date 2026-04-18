// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Shared types for the unified sample-tests compiler.
 *
 * The compiler transforms test files (vitest describe/it blocks) into
 * publishable sample code by removing test infrastructure, substituting
 * values, and restructuring the code.
 */

import ts from "typescript";

/**
 * The five import categories. Every import in a test file falls into exactly one.
 */
export type ImportCategory = "test" | "sourceCode" | "localHelper" | "dataFile" | "external";

/**
 * A classified import: the original declaration plus its category.
 */
export interface ClassifiedImport {
  node: ts.ImportDeclaration;
  category: ImportCategory;
  /** The module specifier string (e.g. "vitest", "../src/index.js"). */
  moduleSpecifier: string;
}

/** Well-known test package specifiers that are always classified as "test". */
export const TEST_PACKAGES: ReadonlySet<string> = new Set([
  "vitest",
  "@azure-tools/test-recorder",
  "@azure-tools/test-publishing",
  "@azure-tools/test-credential",
  "@azure-tools/test-utils",
  "@azure-tools/test-utils-vitest",
]);

/**
 * Parsed metadata from the file-top JSDoc comment.
 */
export interface SampleMetadata {
  summary: string;
  weight?: number;
  skipJavascript?: boolean;
  ignore?: boolean;
}

/**
 * A parsed `it` block from the test file.
 */
export interface ParsedItBlock {
  /** The description string from `it("...", ...)` */
  description: string;
  /** The body statements of the callback */
  body: ts.Statement[];
  /** The original node */
  node: ts.ExpressionStatement;
}

/**
 * A parsed `beforeEach` or `afterEach` block.
 */
export interface ParsedHook {
  kind: "beforeEach" | "afterEach";
  /** The body statements of the callback */
  body: ts.Statement[];
  /** The parameter name if present (e.g., `ctx` in `beforeEach(async (ctx) => ...)`) */
  paramName?: string;
  /** The original node */
  node: ts.ExpressionStatement;
}

/**
 * The fully parsed structure of a sample-test file.
 */
export interface ParsedSampleTestFile {
  metadata: SampleMetadata;
  /** The describe block description */
  describeDescription: string;
  /** `let` and `const` declarations at describe scope */
  describeVariables: ts.VariableStatement[];
  /** Parsed it blocks in declaration order */
  itBlocks: ParsedItBlock[];
  /** beforeEach hooks (usually 0 or 1) */
  beforeEachHooks: ParsedHook[];
  /** afterEach hooks (usually 0 or 1) */
  afterEachHooks: ParsedHook[];
  /** All import declarations from the file */
  imports: ts.ImportDeclaration[];
  /** The full source file AST */
  sourceFile: ts.SourceFile;
}

/**
 * Result of a forPublishing substitution.
 */
export interface Substitution {
  /** The original `forPublishing(...)` call expression */
  originalNode: ts.CallExpression;
  /** The extracted arrow body expression (the published-stage value) */
  publishedExpression: ts.Expression;
  /** Symbols referenced in the published expression that may need imports */
  referencedSymbols: string[];
  /** Free variable names (root identifiers only, excluding property access names) */
  freeVariables: Set<string>;
}

/**
 * Result of the full compilation of a single sample-test file.
 */
export interface CompiledSample {
  /** The output TypeScript source text */
  outputText: string;
  /** Snippet regions extracted from the output */
  snippets: Map<string, string>;
  /** Environment variables referenced (for sample.env generation) */
  envVars: string[];
  /** The metadata from the source file */
  metadata: SampleMetadata;
  /** Any warnings produced during compilation */
  warnings: string[];
  /** Compiled helper files: relative path → output text */
  helperFiles: Map<string, string>;
}

/**
 * Error thrown by the compiler when it encounters invalid input.
 */
export class CompilerError extends Error {
  constructor(
    message: string,
    public readonly file: string,
    public readonly line?: number,
  ) {
    super(`${file}${line !== undefined ? `:${line}` : ""}: ${message}`);
    this.name = "CompilerError";
  }
}

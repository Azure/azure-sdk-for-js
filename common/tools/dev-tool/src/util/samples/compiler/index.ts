// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Sample-tests compiler — transforms vitest-based test files into publishable samples.
 *
 * @module
 */

// ── Main entry point ─────────────────────────────────────────────────
export { compileSampleTest } from "./compiler.js";
export type { CompileOptions } from "./compiler.js";

// ── Pipeline passes (for testing/advanced use) ──────────────────────
export { parseSampleTestFile } from "./parser.js";
export { substituteForPublishing } from "./substitutor.js";
export { classifyImport, classifyImports } from "./importClassifier.js";
export { eliminateDeadBindings, eliminateDeadStatements } from "./deadBindingEliminator.js";
export { rewriteImports } from "./importRewriter.js";

// ── Types ────────────────────────────────────────────────────────────
export type {
  ImportCategory,
  ClassifiedImport,
  SampleMetadata,
  ParsedItBlock,
  ParsedHook,
  ParsedSampleTestFile,
  Substitution,
  CompiledSample,
} from "./types.js";

// ── Constants and utilities ──────────────────────────────────────────
export { CompilerError, TEST_PACKAGES } from "./types.js";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export { classifyImport, classifyImports } from "./importClassifier.js";
export type { SourceImportPredicate } from "./importClassifier.js";
export { substituteForPublishing } from "./substitutor.js";
export { parseSampleTestFile } from "./parser.js";
export { eliminateDeadBindings, eliminateDeadStatements } from "./deadBindingEliminator.js";
export { rewriteImports } from "./importRewriter.js";
export { compileSampleTest } from "./compiler.js";
export type { CompileOptions } from "./compiler.js";
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
export { CompilerError, TEST_PACKAGES } from "./types.js";

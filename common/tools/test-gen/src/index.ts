// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export {
  extractGaps,
  computeBranchCoverage,
  filterGapsForFile,
  formatGaps,
} from "./extract-gaps.ts";
export { extractConventions } from "./extract-conventions.ts";
export { extractTestContext } from "./extract-context.ts";
export type { TestContextOptions } from "./extract-context.ts";
export { annotateSource, commentPrefixFor, mergeAdjacentGaps } from "./annotate-source.ts";
export { extractTestMap } from "./extract-test-map.ts";
export type { TestMapEntry } from "./extract-test-map.ts";
export { resolveContext } from "./resolve-context.ts";
export type { ContextFile, ResolveContextOptions } from "./resolve-context.ts";
export { send, stopClient } from "./llm.ts";
export type { SendOptions, SendResult } from "./llm.ts";
export { buildPrompt } from "./build-prompt.ts";
export { runLoop, runSinglePass } from "./runner.ts";
export { loop, aiLoop } from "./loop/index.ts";
export { fileExists, tryReadFile, numberLines } from "./utils.ts";
export { defaults, resolveConfig, codeFenceFor } from "./config.ts";
export type {
  Pos,
  CoverageGap,
  FileCoverageStats,
  IstanbulFileCoverage,
  CoveragePyFile,
  CoveragePyReport,
  LlmCallStats,
  RunReport,
} from "./types.ts";
export type { PromptContext } from "./build-prompt.ts";
export type { ConventionOptions } from "./extract-conventions.ts";
export type { ExtractGapsOptions } from "./extract-gaps.ts";
export type { Loop, AILoop, AILoopOptions, AIAction } from "./loop/index.ts";
export type {
  Config,
  RunnerConfig,
  PathsConfig,
  LlmConfig,
  LoopConfig,
  ExamplesConfig,
  LanguageConfig,
} from "./config.ts";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export {
  extractGaps,
  computeBranchCoverage,
  filterGapsForFile,
  formatGaps,
} from "./extract-gaps.ts";
export { annotateSource, commentPrefixFor, mergeAdjacentGaps } from "./annotate-source.ts";
export { extractTestMap } from "./extract-test-map.ts";
export type { TestMapEntry } from "./extract-test-map.ts";
export { resolveContext } from "./resolve-context.ts";
export type { ContextFile, ResolveContextOptions } from "./resolve-context.ts";
export {
  send,
  seedSession,
  stopClient,
  getLlmTelemetry,
  checkQuota,
  compactSessionIfNeeded,
  startFleet,
  setSessionMode,
} from "./llm.ts";
export type {
  LlmPhase,
  ReasoningEffort,
  SendAttachment,
  SendOptions,
  SendResult,
  SeedSessionOptions,
  QuotaSnapshot,
  QuotaInfo,
  FleetResult,
} from "./llm.ts";
export { runSinglePass } from "./runner.ts";
export { loop } from "./loop/index.ts";
export { fileExists, tryReadFile } from "./utils.ts";
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
export type { PreparedPrompt, PromptSeedContext } from "./build-prompt.ts";
export type { ExtractGapsOptions } from "./extract-gaps.ts";
export type { Loop } from "./loop/index.ts";
export type {
  Config,
  RunnerConfig,
  PathsConfig,
  LlmConfig,
  LoopConfig,
  ExamplesConfig,
  LanguageConfig,
} from "./config.ts";

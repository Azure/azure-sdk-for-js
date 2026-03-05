// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export { discoverPRs } from "./discover-prs.ts";
export { fetchComments } from "./fetch-comments.ts";
export { enrichThread } from "./enrich-context.ts";
export { renderMarkdown } from "./render-markdown.ts";
export { renderJsonl } from "./render-jsonl.ts";
export { createLocalEmbedder, embedThreads, threadToText } from "./embed.ts";
export { clusterThreads, cosineDistance } from "./cluster.ts";
export { dedup } from "./dedup.ts";
export { labelClusters, createGitHubModelsCompleter, extractThreadRules } from "./label.ts";
export { loadConfig, mergeConfig, patternToRegex } from "./config.ts";
export type {
  ThreadComment,
  ReviewThread,
  EnrichedThread,
  AnalyzedThread,
  ClusterInfo,
  MinerOptions,
} from "./types.ts";
export type { Embedder } from "./embed.ts";
export type { ChatCompleter } from "./label.ts";
export type { MineConfig, MineFilters } from "./config.ts";

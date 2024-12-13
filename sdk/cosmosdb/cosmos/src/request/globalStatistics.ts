// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @internal
 * Represents the full text statistics for a text.
 */
export interface FullTextStatistics {
  totalWordCount: number;
  hitCounts: number[];
}

/**
 * @internal
 * Represents the global statistics for a full text query
 */
export interface GlobalStatistics {
  documentCount: number;
  fullTextStatistics: FullTextStatistics[];
}

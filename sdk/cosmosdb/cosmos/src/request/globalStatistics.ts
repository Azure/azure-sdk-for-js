// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export interface FullTextStatistics {
  totalWordCount: number;
  hitCounts: number[];
}

export interface GlobalStatistics {
  documentCount: number;
  fullTextStatistics: FullTextStatistics[];
}

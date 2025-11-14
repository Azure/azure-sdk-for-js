// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Context interface with only the state needed by fetch implementations
 */
export interface FetchContext {
  fetchBuffer: any[];
  fetchMoreRespHeaders: Record<string, any>;
  pageSize: number;
}

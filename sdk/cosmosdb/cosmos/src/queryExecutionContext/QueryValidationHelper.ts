// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { ErrorResponse } from "../request/ErrorResponse.js";

/**
 * Represents a query type that doesn't support continuation tokens
 * @internal
 */
export interface UnsupportedQueryType {
  readonly name: string;
  readonly isPresent: boolean;
  readonly errorMessage: string;
}

/**
 * Rejects continuation token usage for unsupported query types
 * @param continuationToken - The continuation token if provided
 * @param unsupportedQueryTypes - Array of query types that don't support continuation tokens
 * @throws ErrorResponse if continuation token is provided for any unsupported query type
 * @hidden
 */
export function rejectContinuationTokenForUnsupportedQueries(
  continuationToken: string | undefined,
  unsupportedQueryTypes: UnsupportedQueryType[],
): void {
  if (!continuationToken) {
    return;
  }

  // Find the first unsupported query type that is present
  const conflictingQueryType = unsupportedQueryTypes.find(queryType => queryType.isPresent);

  if (conflictingQueryType) {
    throw new ErrorResponse(conflictingQueryType.errorMessage);
  }
}

/**
 * Factory functions for creating unsupported query type descriptors
 * @internal
 */
export const QueryTypes = {
  nonStreamingOrderBy: (isPresent: boolean): UnsupportedQueryType => ({
    name: "NonStreamingOrderBy",
    isPresent,
    errorMessage: (
      "Continuation tokens are not supported for non-streaming ORDER BY queries. " +
      "These queries must process all results to ensure correct ordering and cannot be resumed from an intermediate state. " +
      "Consider removing the continuation token and using fetchAll() instead for complete results."
    ),
  }),

  groupBy: (isPresent: boolean): UnsupportedQueryType => ({
    name: "GroupBy",
    isPresent,
    errorMessage: (
      "Continuation tokens are not supported for GROUP BY queries. " +
      "These queries must process all results to compute aggregations and cannot be resumed from an intermediate state. " +
      "Consider removing the continuation token and using fetchAll() instead for complete results."
    ),
  }),

  unorderedDistinct: (isPresent: boolean): UnsupportedQueryType => ({
    name: "UnorderedDistinct",
    isPresent,
    errorMessage: (
      "Continuation tokens are not supported for unordered DISTINCT queries. " +
      "These queries require tracking large amounts of duplicate data in continuation tokens which is not practical. " +
      "Consider removing the continuation token and using fetchAll() instead, or use ordered DISTINCT queries which are supported."
    ),
  }),

  hybridSearch: (isPresent: boolean): UnsupportedQueryType => ({
    name: "HybridSearch",
    isPresent,
    errorMessage: (
      "Continuation tokens are not supported for hybrid search queries. " +
      "Hybrid search queries require processing and ranking of all component query results " +
      "to compute accurate Reciprocal Rank Fusion (RRF) scores and cannot be resumed from an intermediate state. " +
      "Consider removing the continuation token and using fetchAll() instead for complete results."
    ),
  }),

  // Easy to add new unsupported query types here
  vectorSearch: (isPresent: boolean): UnsupportedQueryType => ({
    name: "VectorSearch",
    isPresent,
    errorMessage: (
      "Continuation tokens are not supported for vector search queries. " +
      "Vector search queries require processing similarity calculations across all data " +
      "and cannot be resumed from an intermediate state. " +
      "Consider removing the continuation token and using fetchAll() instead for complete results."
    ),
  }),
} as const;

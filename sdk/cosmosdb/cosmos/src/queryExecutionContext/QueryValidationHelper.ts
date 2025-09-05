// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { ErrorResponse } from "../request/ErrorResponse.js";

/**
 * Validates continuation token usage against unsupported query types
 * @param continuationToken - The continuation token to validate
 * @param nonStreamingOrderBy - Whether this is a non-streaming ORDER BY query
 * @param isUnorderedDistinctQuery - Whether this is an unordered DISTINCT query
 * @param isGroupByQuery - Whether this is a GROUP BY query
 * @throws ErrorResponse if continuation token is used with unsupported query types
 * @hidden
 */
export function validateContinuationTokenSupport(
  continuationToken: string | undefined,
  nonStreamingOrderBy: boolean,
  isUnorderedDistinctQuery: boolean,
  isGroupByQuery: boolean
): void {
  if (!continuationToken) {
    return;
  }

  const unsupportedQueries = [
    { condition: nonStreamingOrderBy, type: "non-streaming ORDER BY", reason: "must process all results to ensure correct ordering" },
    { condition: isGroupByQuery, type: "GROUP BY", reason: "must process all results to compute aggregations" },
    { condition: isUnorderedDistinctQuery, type: "unordered DISTINCT", reason: "require tracking large amounts of duplicate data in continuation tokens which is not practical", extra: ", or use ordered DISTINCT queries which are supported" }
  ];

  for (const query of unsupportedQueries) {
    if (query.condition) {
      throw new ErrorResponse(
        `Continuation tokens are not supported for ${query.type} queries. ` +
        `These queries ${query.reason} and cannot be resumed from an intermediate state. ` +
        `Consider removing the continuation token or using fetchAll() instead for complete results${query.extra || ""}.`
      );
    }
  }
}

/**
 * Validates continuation token usage for hybrid search queries
 * @param continuationToken - The continuation token to validate
 * @throws ErrorResponse if continuation token is used with hybrid search queries
 * @hidden
 */
export function validateHybridSearchContinuationToken(continuationToken: string | undefined): void {
  if (!continuationToken) {
    return;
  }

  throw new ErrorResponse(
    "Continuation tokens are not supported for hybrid search queries. " +
    "Hybrid search queries require processing and ranking of all component query results " +
    "to compute accurate Reciprocal Rank Fusion (RRF) scores and cannot be resumed from an intermediate state. " +
    "Consider removing the continuation token and using fetchAll() instead for complete results."
  );
}

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { ErrorResponse } from "../request/ErrorResponse.js";

/**
 * Validates continuation token usage for unsupported query types
 * @param continuationToken - The continuation token if provided
 * @param isNonStreamingOrderBy - Whether this is a non-streaming ORDER BY query
 * @param isGroupByQuery - Whether this is a GROUP BY query
 * @param isUnorderedDistinctQuery - Whether this is an unordered DISTINCT query
 * @hidden
 */
export function validateContinuationTokenUsage(
  continuationToken: string | undefined,
  isNonStreamingOrderBy: boolean,
  isGroupByQuery: boolean,
  isUnorderedDistinctQuery: boolean,
): void {
  if (!continuationToken) {
    return;
  }

  if (isNonStreamingOrderBy) {
    throw new ErrorResponse(getNonStreamingOrderByErrorMessage());
  }

  if (isGroupByQuery) {
    throw new ErrorResponse(getGroupByErrorMessage());
  }

  if (isUnorderedDistinctQuery) {
    throw new ErrorResponse(getUnorderedDistinctErrorMessage());
  }
}

/** @hidden */
function getNonStreamingOrderByErrorMessage(): string {
  return (
    "Continuation tokens are not supported for non-streaming ORDER BY queries. " +
    "These queries must process all results to ensure correct ordering and cannot be resumed from an intermediate state. " +
    "Consider removing the continuation token and using fetchAll() instead for complete results."
  );
}

/** @hidden */
function getGroupByErrorMessage(): string {
  return (
    "Continuation tokens are not supported for GROUP BY queries. " +
    "These queries must process all results to compute aggregations and cannot be resumed from an intermediate state. " +
    "Consider removing the continuation token and using fetchAll() instead for complete results."
  );
}

/** @hidden */
function getUnorderedDistinctErrorMessage(): string {
  return (
    "Continuation tokens are not supported for unordered DISTINCT queries. " +
    "These queries require tracking large amounts of duplicate data in continuation tokens which is not practical. " +
    "Consider removing the continuation token and using fetchAll() instead, or use ordered DISTINCT queries which are supported."
  );
}

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Lightweight interface for continuation token fields needed by pipeline
 * @internal
 */
export interface ContinuationTokenFields {
  offset?: number;
  limit?: number;
  hashedLastResult?: string;
}

/**
 * Parses a continuation token string to extract specific fields without full deserialization
 * Supports both CompositeQueryContinuationToken and OrderByQueryContinuationToken formats
 * @param continuationToken - The continuation token string to parse
 * @returns Object containing offset, limit, and hashedLastResult if present
 * @internal
 */
export function parseContinuationTokenFields(continuationToken: string): ContinuationTokenFields {
  try {
    const parsed = JSON.parse(continuationToken);

    return {
      offset: parsed.offset,
      limit: parsed.limit,
      hashedLastResult: parsed.hashedLastResult,
    };
  } catch {
    // Token is not JSON — return empty fields for opaque server continuation tokens
    return {};
  }
}

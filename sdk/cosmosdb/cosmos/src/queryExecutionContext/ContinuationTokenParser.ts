// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { type BaseContinuationToken } from "../documents/ContinuationToken/CompositeQueryContinuationToken.js";
import { parseCompositeQueryContinuationToken } from "../documents/ContinuationToken/CompositeQueryContinuationToken.js";
import {
  parseOrderByQueryContinuationToken,
  type OrderByQueryContinuationToken,
} from "../documents/ContinuationToken/OrderByQueryContinuationToken.js";

/**
 * Lightweight interface for continuation token fields needed by pipeline
 * @internal
 */
export interface ContinuationTokenFields {
  offset?: number;
  limit?: number;
  hashedLastResult?: string;
  parsedToken: BaseContinuationToken | OrderByQueryContinuationToken;
}

/**
 * Parses a continuation token string to extract specific fields without full deserialization
 * Supports both CompositeQueryContinuationToken and OrderByQueryContinuationToken formats
 * @param continuationToken - The continuation token string to parse
 * @returns Object containing offset, limit, and hashedLastResult if present
 * @internal
 */
export function parseContinuationTokenFields(
  continuationToken: string,
  isOrderByQuery: boolean,
): ContinuationTokenFields {
  const parsed = isOrderByQuery
    ? parseOrderByQueryContinuationToken(continuationToken)
    : parseCompositeQueryContinuationToken(continuationToken);
  const hashedLastResult = "hashedLastResult" in parsed ? parsed.hashedLastResult : undefined;
  return {
    offset: parsed.offset,
    limit: parsed.limit,
    hashedLastResult: typeof hashedLastResult === "string" ? hashedLastResult : undefined,
    parsedToken: parsed,
  };
}

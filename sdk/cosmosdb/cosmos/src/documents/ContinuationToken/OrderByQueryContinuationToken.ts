// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  QueryRangeWithContinuationToken,
  BaseContinuationToken,
} from "./CompositeQueryContinuationToken.js";
import { parseBaseContinuationToken } from "./CompositeQueryContinuationToken.js";
import { ErrorResponse } from "../../request/ErrorResponse.js";

/**
 * Continuation token for order by queries.
 * @hidden
 */
export interface OrderByQueryContinuationToken extends BaseContinuationToken {
  /**
   * Order by items for the query
   */
  orderByItems: any[];

  /**
   * Number of items to skip in the query
   */
  skipCount: number;

  /**
   * Document ID of the last document result
   */
  documentRid: string;

  /**
   * Hash of the last document result for distinct order queries
   * Used to ensure duplicates are not returned across continuation boundaries
   */
  hashedLastResult?: string;
}

/**
 * Creates an OrderByQueryContinuationToken
 * @hidden
 */
export function createOrderByQueryContinuationToken(
  rangeMappings: QueryRangeWithContinuationToken[],
  orderByItems: any[],
  rid: string,
  skipCount: number,
  documentRid?: string,
  offset?: number,
  limit?: number,
  hashedLastResult?: string,
): OrderByQueryContinuationToken {
  if (!rangeMappings || rangeMappings.length === 0) {
    throw new Error("rangeMappings must contain at least one element");
  }

  if (!orderByItems || orderByItems.length === 0) {
    throw new Error("orderByItems must contain at least one element");
  }

  return {
    rangeMappings,
    orderByItems,
    rid,
    skipCount,
    documentRid,
    offset,
    limit,
    hashedLastResult,
  } as OrderByQueryContinuationToken;
}

/**
 * Serializes an OrderByQueryContinuationToken to a JSON string
 * @hidden
 */
export function serializeOrderByQueryContinuationToken(
  token: OrderByQueryContinuationToken,
): string {
  return JSON.stringify(token);
}

/**
 * Deserializes a JSON string to an OrderByQueryContinuationToken
 * @hidden
 */
export function parseOrderByQueryContinuationToken(
  tokenString: string,
): OrderByQueryContinuationToken {
  const token = parseBaseContinuationToken(tokenString) as Partial<OrderByQueryContinuationToken>;
  if (!Array.isArray(token.orderByItems) || token.orderByItems.length === 0) {
    throw new ErrorResponse(
      "Invalid continuation token. ORDER BY tokens require non-empty orderByItems.",
    );
  }
  if (token.orderByItems.some((item) => !item || typeof item !== "object" || Array.isArray(item))) {
    throw new ErrorResponse("Invalid continuation token. ORDER BY items must be objects.");
  }
  if (
    typeof token.skipCount !== "number" ||
    !Number.isSafeInteger(token.skipCount) ||
    token.skipCount < 0
  ) {
    throw new ErrorResponse(
      "Invalid continuation token. ORDER BY tokens require a non-negative safe integer skipCount.",
    );
  }
  if (token.documentRid !== undefined && typeof token.documentRid !== "string") {
    throw new ErrorResponse(
      "Invalid continuation token. ORDER BY documentRid must be a string when present.",
    );
  }
  const logicallyOrderedMappings = [...token.rangeMappings].sort((left, right) =>
    left.queryRange.min.localeCompare(right.queryRange.min),
  );
  const checkpointIndexes = logicallyOrderedMappings
    .map((mapping, index) => (mapping.isOrderByCheckpoint === true ? index : -1))
    .filter((index) => index >= 0);
  const hasCheckpointMetadata = logicallyOrderedMappings.some(
    (mapping) => mapping.isOrderByCheckpoint !== undefined,
  );
  if (
    hasCheckpointMetadata &&
    (checkpointIndexes.length === 0 ||
      checkpointIndexes[checkpointIndexes.length - 1] - checkpointIndexes[0] + 1 !==
        checkpointIndexes.length)
  ) {
    throw new ErrorResponse(
      "Invalid continuation token. ORDER BY checkpoint owners must form one contiguous logical interval.",
    );
  }
  return token as OrderByQueryContinuationToken;
}

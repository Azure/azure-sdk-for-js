// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { QueryRange } from "../../routing/QueryRange.js";
import type { QueryRangeMapping } from "../../queryExecutionContext/queryRangeMapping.js";
import { ErrorResponse } from "../../request/ErrorResponse.js";

/**
 * @hidden
 */
export interface RangeBoundary {
  /**
   * Minimum boundary (inclusive)
   */
  min: string;
  /**
   * Maximum boundary (exclusive)
   */
  max: string;
}

/**
 * @hidden
 * Base interface for all continuation tokens containing common fields
 */
export interface BaseContinuationToken {
  /**
   * Resource ID of the container for which the continuation token is issued
   */
  rid: string;

  /**
   * List of query ranges with their continuation tokens
   */
  rangeMappings: QueryRangeWithContinuationToken[];

  /**
   * Current offset value for OFFSET/LIMIT queries
   */
  offset?: number;

  /**
   * Current limit value for OFFSET/LIMIT queries
   */
  limit?: number;
}

/**
 * @hidden
 * Composite continuation token for parallel query execution across multiple partition ranges
 */
export interface CompositeQueryContinuationToken extends BaseContinuationToken {}

/**
 * Creates a new CompositeQueryContinuationToken
 * @hidden
 */
export function createCompositeQueryContinuationToken(
  rid: string,
  rangeMappings: QueryRangeWithContinuationToken[],
  offset?: number,
  limit?: number,
): CompositeQueryContinuationToken {
  if (!rangeMappings || rangeMappings.length === 0) {
    throw new Error(
      "Failed to create composite continuation token: No partition range mappings provided. " +
        "This typically indicates an issue with query execution context initialization or partition key range resolution. " +
        "Ensure the query is properly configured and the container has valid partition ranges.",
    );
  }

  return {
    rid,
    rangeMappings: rangeMappings,
    offset,
    limit,
  };
}

/**
 * Serializes the composite continuation token to a JSON string
 * @hidden
 */
export function serializeCompositeToken(token: CompositeQueryContinuationToken): string {
  return JSON.stringify(token);
}

/**
 * Deserializes a JSON string to a CompositeQueryContinuationToken
 * @hidden
 */
export function parseCompositeQueryContinuationToken(
  tokenString: string,
): CompositeQueryContinuationToken {
  return parseBaseContinuationToken(tokenString) as CompositeQueryContinuationToken;
}

/**
 * Deserializes a JSON string to a CompositeQueryContinuationToken
 * @hidden
 */
export function parseBaseContinuationToken(tokenString: string): BaseContinuationToken {
  let token: unknown;
  try {
    token = JSON.parse(tokenString);
  } catch (error) {
    throw createInvalidContinuationTokenError("Token is not valid JSON.", error);
  }
  validateBaseContinuationToken(token);
  return token;
}

function validateBaseContinuationToken(token: unknown): asserts token is BaseContinuationToken {
  if (!token || typeof token !== "object" || Array.isArray(token)) {
    throw createInvalidContinuationTokenError("Token must be a JSON object.");
  }
  const candidate = token as Partial<BaseContinuationToken>;
  if (typeof candidate.rid !== "string" || candidate.rid.length === 0) {
    throw createInvalidContinuationTokenError("Token rid must be a non-empty string.");
  }
  if (!Array.isArray(candidate.rangeMappings) || candidate.rangeMappings.length === 0) {
    throw createInvalidContinuationTokenError("Token rangeMappings must be a non-empty array.");
  }
  if (candidate.offset !== undefined && !Number.isFinite(candidate.offset)) {
    throw createInvalidContinuationTokenError("Token offset must be a finite number.");
  }
  if (candidate.limit !== undefined && !Number.isFinite(candidate.limit)) {
    throw createInvalidContinuationTokenError("Token limit must be a finite number.");
  }

  const ranges = candidate.rangeMappings.map((mapping, index) => {
    if (!mapping || typeof mapping !== "object" || Array.isArray(mapping)) {
      throw createInvalidContinuationTokenError(`Token rangeMappings[${index}] must be an object.`);
    }
    if (
      !mapping.queryRange ||
      typeof mapping.queryRange !== "object" ||
      Array.isArray(mapping.queryRange)
    ) {
      throw createInvalidContinuationTokenError(
        `Token rangeMappings[${index}].queryRange is required.`,
      );
    }
    const { min, max } = mapping.queryRange;
    if (typeof min !== "string" || typeof max !== "string") {
      throw createInvalidContinuationTokenError(
        `Token rangeMappings[${index}] boundaries must be strings.`,
      );
    }
    if (!(min < max)) {
      throw createInvalidContinuationTokenError(
        `Token rangeMappings[${index}] must have min less than max.`,
      );
    }
    if (
      mapping.continuationToken !== undefined &&
      mapping.continuationToken !== null &&
      typeof mapping.continuationToken !== "string"
    ) {
      throw createInvalidContinuationTokenError(
        `Token rangeMappings[${index}].continuationToken must be a string when present.`,
      );
    }
    if (mapping.isActive !== undefined && typeof mapping.isActive !== "boolean") {
      throw createInvalidContinuationTokenError(
        `Token rangeMappings[${index}].isActive must be a boolean when present.`,
      );
    }
    if (
      mapping.isOrderByCheckpoint !== undefined &&
      typeof mapping.isOrderByCheckpoint !== "boolean"
    ) {
      throw createInvalidContinuationTokenError(
        `Token rangeMappings[${index}].isOrderByCheckpoint must be a boolean when present.`,
      );
    }
    return { min, max };
  });

  ranges.sort((left, right) => left.min.localeCompare(right.min));
  for (let index = 1; index < ranges.length; index++) {
    if (ranges[index].min < ranges[index - 1].max) {
      throw createInvalidContinuationTokenError("Token rangeMappings must not overlap.");
    }
  }
}

function createInvalidContinuationTokenError(message: string, cause?: unknown): ErrorResponse {
  const error = new ErrorResponse(`Invalid continuation token. ${message}`);
  if (cause !== undefined) {
    error.cause = cause;
  }
  return error;
}

/**
 * @hidden
 * Represents a query range with its associated continuation token
 */
export interface QueryRangeWithContinuationToken {
  /**
   * The simplified query range containing min/max boundaries
   */
  queryRange: RangeBoundary;

  /**
   * The continuation token for this specific range
   */
  continuationToken: string | undefined;

  /**
   * Whether this logical range still has work to resume.
   */
  isActive?: boolean;

  /**
   * Whether this range owns the global ORDER BY RID/skip checkpoint.
   */
  isOrderByCheckpoint?: boolean;
}

/**
 * Converts QueryRangeMapping to QueryRangeWithContinuationToken using simplified range format
 * @param rangeMapping - The QueryRangeMapping to convert
 * @returns QueryRangeWithContinuationToken with simplified boundaries and continuation token
 * @hidden
 */
export function convertRangeMappingToQueryRange(
  rangeMapping: QueryRangeMapping,
): QueryRangeWithContinuationToken {
  if (!rangeMapping.partitionKeyRange) {
    throw new Error(
      "Failed to convert range mapping: Missing partition key range information. " +
        "The QueryRangeMapping object must contain a valid partitionKeyRange with min and max boundaries. " +
        "This may indicate an incomplete partition key range resolution during query setup.",
    );
  }

  const pkRange = rangeMapping.partitionKeyRange;

  // Create simplified range assuming min is inclusive and max is exclusive
  const simplifiedRange: RangeBoundary = {
    min: pkRange.minInclusive,
    max: pkRange.maxExclusive,
  };

  const inferredActive =
    !!rangeMapping.continuationToken && rangeMapping.continuationToken.toLowerCase() !== "null";
  const isActive =
    rangeMapping.isActive === false
      ? false
      : rangeMapping.isActive === true && !inferredActive
        ? true
        : undefined;

  return {
    queryRange: simplifiedRange,
    continuationToken: rangeMapping.continuationToken,
    isActive,
    isOrderByCheckpoint: rangeMapping.isOrderByCheckpoint,
  };
}

/**
 * Converts an array of QueryRangeMapping to an array of QueryRangeWithContinuationToken
 * @param rangeMappings - Array of QueryRangeMapping to convert
 * @returns Array of QueryRangeWithContinuationToken with simplified boundaries and continuation tokens
 * @hidden
 */
export function convertRangeMappingsToQueryRangesWithTokens(
  rangeMappings: QueryRangeMapping[],
): QueryRangeWithContinuationToken[] {
  return rangeMappings.map((mapping) => convertRangeMappingToQueryRange(mapping));
}

/**
 * Converts a SimplifiedQueryRange back to a QueryRange for internal use
 * @param simplifiedRange - The simplified range to convert
 * @returns QueryRange with standard assumptions (min inclusive, max exclusive)
 * @hidden
 */
export function convertSimplifiedRangeToQueryRange(simplifiedRange: RangeBoundary): QueryRange {
  return new QueryRange(
    simplifiedRange.min,
    simplifiedRange.max,
    true, // minInclusive = true (assumption)
    false, // maxInclusive = false (max is exclusive, assumption)
  );
}

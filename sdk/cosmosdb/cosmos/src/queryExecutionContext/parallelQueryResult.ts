// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Response } from "../request/index.js";
import type { CosmosHeaders } from "./headerUtils.js";
import type { QueryPage } from "./QueryPage.js";
import type { QueryRangeMapping } from "./queryRangeMapping.js";

/**
 * Represents an ORDER BY item with its associated document resource ID.
 * Used for tracking ORDER BY criteria and document identity in sorted query results.
 * @internal
 */
export interface OrderByItemWithRid {
  /**
   * The ORDER BY values for this document
   */
  orderByItems: any[];
  /**
   * The resource ID (_rid) of the document
   */
  _rid: string;
}

/**
 * Represents the result structure returned by parallel query execution contexts
 * @hidden
 */
export interface ParallelQueryResult {
  /**
   * The actual query result data (documents/items)
   */
  buffer: any[];

  /**
   * Mapping of partition key ranges used during query execution
   */
  partitionKeyRangeMap: Map<string, QueryRangeMapping>;

  /**
   * Updated continuation ranges after partition split/merge operations
   */
  updatedContinuationRanges?: Record<string, any>;

  /**
   * Optional array of orderBy items corresponding to each item in the buffer
   * Used for ORDER BY queries to track sorting criteria
   */
  orderByItems?: OrderByItemWithRid[];
}

/**
 * Creates a new ParallelQueryResult with the specified data
 * @param buffer - The query result data
 * @param partitionKeyRangeMap - Partition key range mappings
 * @param updatedContinuationRanges - Updated continuation ranges
 * @param orderByItems - Optional array of orderBy items for each buffer item
 * @returns A new ParallelQueryResult instance
 * @hidden
 */
export function createParallelQueryResult(
  buffer: any[],
  partitionKeyRangeMap: Map<string, QueryRangeMapping>,
  updatedContinuationRanges?: Record<string, any>,
  orderByItems?: OrderByItemWithRid[],
): ParallelQueryResult {
  const result: ParallelQueryResult = {
    buffer,
    partitionKeyRangeMap,
    updatedContinuationRanges,
  };

  if (orderByItems !== undefined) {
    result.orderByItems = orderByItems;
  }
  return result;
}

/**
 * Converts a ParallelQueryResult + headers into a typed QueryPage.
 * Bridge adapter for transitioning from the untyped Response<unknown> pipeline
 * to the typed QueryPage pipeline.
 * @param result - The parallel query result (may be undefined for empty pages)
 * @param headers - Response headers from the backend
 * @param hasMore - Whether the source has more results
 * @returns A typed QueryPage
 * @internal
 */
export function toQueryPage(
  result: ParallelQueryResult | undefined,
  headers: CosmosHeaders,
  hasMore: boolean,
): QueryPage {
  if (!result) {
    return {
      items: [],
      headers,
      partitionKeyRangeMap: new Map(),
      hasMore,
    };
  }
  const page: QueryPage = {
    items: result.buffer,
    headers,
    partitionKeyRangeMap: result.partitionKeyRangeMap,
    updatedContinuationRanges: result.updatedContinuationRanges,
    hasMore,
  };
  if (result.orderByItems !== undefined) {
    return { ...page, orderByItems: result.orderByItems };
  }
  return page;
}

/**
 * Converts a QueryPage back to a Response<ParallelQueryResult> for legacy consumers.
 * Bridge adapter for backward compatibility during the AsyncGenerator migration.
 * @param page - The typed QueryPage
 * @returns A Response wrapping a ParallelQueryResult
 * @internal
 */
export function fromQueryPage(page: QueryPage): Response<unknown> {
  const result = createParallelQueryResult(
    page.items as any[],
    page.partitionKeyRangeMap,
    page.updatedContinuationRanges,
    page.orderByItems,
  );
  return {
    result,
    headers: page.headers,
  };
}

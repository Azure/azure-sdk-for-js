// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { OrderByContinuationFilter } from "../../documents/ContinuationToken/CompositeQueryContinuationToken.js";

/**
 * Represents the context for filtering, including the values from the continuation token.
 */
export interface FilterContext extends OrderByContinuationFilter {
  /**
   * The sort orders for the ORDER BY fields ("Ascending" or "Descending").
   */
  sortOrders: any[];
  /**
   * Query execution information from x-ms-cosmos-query-execution-info header.
   */
  queryExecutionInfo?: {
    reverseRidEnabled: boolean;
    reverseIndexScan: boolean;
  };
}

/**
 * Defines the interface for a post-fetch query filter.
 */
export interface FilterStrategy {
  /**
   * Applies the filtering logic to a set of documents.
   * @param documents - The documents to filter.
   * @returns The filtered set of documents.
   */
  applyFilter(documents: any[]): any[];

  /**
   * Gets the current filter context so replacement producers can resume from the same state.
   */
  getFilterContext(): FilterContext;
}

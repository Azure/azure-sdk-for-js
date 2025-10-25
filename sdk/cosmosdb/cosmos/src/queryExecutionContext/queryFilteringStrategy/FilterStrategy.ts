// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @internal
 * Represents the context for filtering, including the values from the continuation token.
 */
export interface FilterContext {
  /**
   * The _rid of the document from which the continuation token was created.
   */
  rid: string;
  /**
   * The number of documents with the same _rid to skip, used in JOIN queries.
   */
  skipCount: number;
  /**
   * The order by item values from the last document of the previous page.
   */
  orderByItems: any[];
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
 * @internal
 * Defines the interface for a post-fetch query filter.
 */
export interface FilterStrategy {
  /**
   * Applies the filtering logic to a set of documents.
   * @param documents - The documents to filter.
   * @returns The filtered set of documents.
   */
  applyFilter(documents: any[]): any[];
}

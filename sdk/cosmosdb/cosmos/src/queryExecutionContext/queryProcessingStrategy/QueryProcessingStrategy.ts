// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OrderByQueryContinuationToken } from "../../documents/ContinuationToken/OrderByQueryContinuationToken.js";
import type { CompositeQueryContinuationToken } from "../../documents/ContinuationToken/CompositeQueryContinuationToken.js";
import type { FilterContext } from "../queryFilteringStrategy/FilterStrategy.js";

/**
 * Strategy interface for processing different query types
 * @hidden
 */
export interface QueryProcessingStrategy {
  /**
   * Creates additional query info from parsed continuation token
   * @param parsedToken - The parsed continuation token
   * @returns Additional query info or undefined
   */
  createAdditionalQueryInfo(
    parsedToken: OrderByQueryContinuationToken | CompositeQueryContinuationToken,
  ): any;

  /**
   * Creates filter context for continuation token processing
   * @param parsedToken - The parsed continuation token
   * @param sortOrders - Sort orders from query info
   * @returns Filter context or undefined
   */
  createFilterContext(
    parsedToken: OrderByQueryContinuationToken | CompositeQueryContinuationToken,
    sortOrders: any[],
  ): FilterContext | undefined;

  /**
   * Determines if filter context should be applied to a specific partition
   * @param filterContext - The filter context
   * @param targetPartitionId - ID of the target partition
   * @param partitionTargetRangeId - ID of the current partition range
   * @returns Filter context to apply or undefined
   */
  getPartitionFilterContext(
    filterContext: FilterContext | undefined,
    targetPartitionId: string | undefined,
    partitionTargetRangeId: string,
  ): FilterContext | undefined;

  /**
   * Parses continuation token based on query type
   * @param continuationToken - The continuation token string to parse
   * @returns Parsed continuation token object
   */
  parseContinuationToken(
    continuationToken: string,
  ): OrderByQueryContinuationToken | CompositeQueryContinuationToken;
}

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OrderByQueryContinuationToken } from "../../documents/ContinuationToken/OrderByQueryContinuationToken.js";
import { parseOrderByQueryContinuationToken } from "../../documents/ContinuationToken/OrderByQueryContinuationToken.js";
import type { CompositeQueryContinuationToken } from "../../documents/ContinuationToken/CompositeQueryContinuationToken.js";
import type { FilterContext } from "../queryFilteringStrategy/FilterStrategy.js";
import type { QueryProcessingStrategy } from "./QueryProcessingStrategy.js";

/**
 * Strategy for processing ORDER BY queries
 * @hidden
 */
export class OrderByQueryProcessingStrategy implements QueryProcessingStrategy {
  /**
   * Creates additional query info from ORDER BY continuation token
   */
  createAdditionalQueryInfo(
    parsedToken: OrderByQueryContinuationToken | CompositeQueryContinuationToken,
  ): any {
    const orderByToken = parsedToken as OrderByQueryContinuationToken;
    const info: any = {};
    if (orderByToken.orderByItems) info.orderByItems = orderByToken.orderByItems;
    if (orderByToken.documentRid) info.rid = orderByToken.documentRid;
    return Object.keys(info).length > 0 ? info : undefined;
  }

  /**
   * Creates filter context for ORDER BY continuation token processing
   */
  createFilterContext(
    parsedToken: OrderByQueryContinuationToken | CompositeQueryContinuationToken,
    sortOrders: any[],
  ): FilterContext | undefined {
    const orderByToken = parsedToken as OrderByQueryContinuationToken;
    return {
      orderByItems: orderByToken.orderByItems,
      rid: orderByToken.documentRid,
      skipCount: orderByToken.skipCount,
      sortOrders: sortOrders || [],
    };
  }

  /**
   * For ORDER BY queries, only apply filter to the target partition (last range in continuation)
   */
  getPartitionFilterContext(
    filterContext: FilterContext | undefined,
    targetPartitionId: string | undefined,
    partitionTargetRangeId: string,
  ): FilterContext | undefined {
    if (!filterContext) return undefined;
    const isTargetPartition = targetPartitionId === partitionTargetRangeId;
    return isTargetPartition ? filterContext : undefined;
  }

  /**
   * Parses ORDER BY continuation token
   */
  parseContinuationToken(
    continuationToken: string,
  ): OrderByQueryContinuationToken | CompositeQueryContinuationToken {
    return parseOrderByQueryContinuationToken(continuationToken);
  }
}

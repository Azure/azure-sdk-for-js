// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OrderByQueryContinuationToken } from "../../documents/ContinuationToken/OrderByQueryContinuationToken.js";
import type { CompositeQueryContinuationToken } from "../../documents/ContinuationToken/CompositeQueryContinuationToken.js";
import { ContinuationTokenCodec } from "../../documents/ContinuationToken/ContinuationTokenCodec.js";
import type { FilterContext } from "../queryFilteringStrategy/FilterStrategy.js";
import type { QueryProcessingStrategy } from "./QueryProcessingStrategy.js";

/**
 * Strategy for processing parallel queries (non-ORDER BY)
 * @hidden
 */
export class ParallelQueryProcessingStrategy implements QueryProcessingStrategy {
  /**
   * Parallel queries don't need additional query info from continuation token
   */
  createAdditionalQueryInfo(
    _parsedToken: OrderByQueryContinuationToken | CompositeQueryContinuationToken,
  ): any {
    return undefined;
  }

  /**
   * Parallel queries don't use filter context for continuation token processing
   */
  createFilterContext(
    _parsedToken: OrderByQueryContinuationToken | CompositeQueryContinuationToken,
  ): FilterContext | undefined {
    return undefined;
  }

  /**
   * Parallel queries don't apply partition-specific filter context
   */
  getPartitionFilterContext(
    _filterContext: FilterContext | undefined,
    _targetPartitionId: string | undefined,
    _partitionTargetRangeId: string,
  ): FilterContext | undefined {
    return undefined;
  }

  /**
   * Parses parallel/composite continuation token
   */
  parseContinuationToken(
    continuationToken: string,
  ): OrderByQueryContinuationToken | CompositeQueryContinuationToken {
    return ContinuationTokenCodec.decodeComposite(continuationToken);
  }
}

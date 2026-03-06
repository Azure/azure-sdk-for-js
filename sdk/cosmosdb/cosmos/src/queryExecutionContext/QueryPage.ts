// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CosmosHeaders } from "./headerUtils.js";
import type { QueryRangeMapping } from "./queryRangeMapping.js";
import type { OrderByItemWithRid } from "./parallelQueryResult.js";

/**
 * Immutable page of query results flowing through the pipeline.
 * Replaces the untyped Response<unknown> + ParallelQueryResult contract
 * with an explicit, typed internal page structure.
 * @internal
 */
export interface QueryPage {
  /** Result items for this page */
  readonly items: unknown[];
  /** Response headers (RU charge, diagnostics, continuation) */
  readonly headers: CosmosHeaders;
  /** Partition-to-range mapping for continuation token construction */
  readonly partitionKeyRangeMap: Map<string, QueryRangeMapping>;
  /** Updated continuation ranges after partition split/merge operations */
  readonly updatedContinuationRanges?: Record<string, any>;
  /** ORDER BY metadata per item (only present for ORDER BY queries) */
  readonly orderByItems?: OrderByItemWithRid[];
  /** Whether the source has more results after this page */
  readonly hasMore: boolean;
}

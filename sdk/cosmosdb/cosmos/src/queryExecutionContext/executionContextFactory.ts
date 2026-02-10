// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ClientContext } from "../ClientContext.js";
import type { DiagnosticNodeInternal } from "../diagnostics/DiagnosticNodeInternal.js";
import type { PartitionedQueryExecutionInfo, QueryRange } from "../request/ErrorResponse.js";
import type { FeedOptions } from "../request/FeedOptions.js";
import type { ExecutionContext } from "./ExecutionContext.js";
import { HybridQueryExecutionContext } from "./hybridQueryExecutionContext.js";
import { PipelinedQueryExecutionContext } from "./pipelinedQueryExecutionContext.js";
import type { SqlQuerySpec } from "./SqlQuerySpec.js";
import type { PartitionKeyRangeCache } from "../routing/index.js";

/**
 * Factory for creating the appropriate {@link ExecutionContext} based on a query plan.
 *
 * The factory inspects `PartitionedQueryExecutionInfo` and returns either a
 * {@link PipelinedQueryExecutionContext} for standard queries or a
 * {@link HybridQueryExecutionContext} for hybrid-search queries.
 *
 * @hidden
 */
export class ExecutionContextFactory {
  constructor(
    private clientContext: ClientContext,
    private resourceLink: string,
    private query: string | SqlQuerySpec,
    private options: FeedOptions,
    private partitionKeyRangeCache: PartitionKeyRangeCache,
  ) {}

  /**
   * Creates the appropriate execution context from a query plan.
   *
   * @param queryPlan - The partitioned query execution info returned by the query-plan endpoint.
   * @param correlatedActivityId - Activity id for correlated diagnostics.
   * @param diagnosticNode - Optional diagnostic node for tracing metadata lookups.
   * @returns A fully-initialised {@link ExecutionContext}.
   */
  public async create(
    queryPlan: PartitionedQueryExecutionInfo,
    correlatedActivityId: string,
    diagnosticNode?: DiagnosticNodeInternal,
  ): Promise<ExecutionContext> {
    if (queryPlan.hybridSearchQueryInfo && queryPlan.hybridSearchQueryInfo !== null) {
      return this.createHybridContext(queryPlan, correlatedActivityId, diagnosticNode);
    }
    return this.createPipelinedContext(queryPlan, correlatedActivityId);
  }

  /**
   * Creates a {@link PipelinedQueryExecutionContext}.
   */
  private createPipelinedContext(
    queryPlan: PartitionedQueryExecutionInfo,
    correlatedActivityId: string,
  ): ExecutionContext {
    const queryInfo = queryPlan.queryInfo;
    if (queryInfo.aggregates.length > 0 && queryInfo.hasSelectValue === false) {
      throw new Error("Aggregate queries must use the VALUE keyword");
    }
    return new PipelinedQueryExecutionContext(
      this.clientContext,
      this.resourceLink,
      this.query,
      this.options,
      queryPlan,
      correlatedActivityId,
    );
  }

  /**
   * Creates a {@link HybridQueryExecutionContext}.
   */
  private async createHybridContext(
    queryPlan: PartitionedQueryExecutionInfo,
    correlatedActivityId: string,
    diagnosticNode?: DiagnosticNodeInternal,
  ): Promise<ExecutionContext> {
    const allPartitionKeyRanges = (
      await this.partitionKeyRangeCache.onCollectionRoutingMap(this.resourceLink, diagnosticNode)
    ).getOrderedParitionKeyRanges();

    const queryRanges: QueryRange[] = allPartitionKeyRanges.map((partitionKeyRange) => ({
      min: partitionKeyRange.minInclusive,
      max: partitionKeyRange.maxExclusive,
      isMinInclusive: true,
      isMaxInclusive: false,
    }));

    return new HybridQueryExecutionContext(
      this.clientContext,
      this.resourceLink,
      this.query,
      this.options,
      queryPlan,
      correlatedActivityId,
      queryRanges,
    );
  }
}

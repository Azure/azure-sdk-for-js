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
 * Bundles shared dependencies needed when creating an {@link ExecutionContext}.
 *
 * Implementations of {@link ExecutionContextProvider} receive this object so
 * they have everything they need without coupling to the factory internals.
 *
 * @hidden
 */
export interface ExecutionContextCreationParams {
  clientContext: ClientContext;
  resourceLink: string;
  query: string | SqlQuerySpec;
  options: FeedOptions;
  partitionKeyRangeCache: PartitionKeyRangeCache;
  queryPlan: PartitionedQueryExecutionInfo;
  correlatedActivityId: string;
  diagnosticNode?: DiagnosticNodeInternal;
}

/**
 * Contract for pluggable execution-context providers.
 *
 * Implement this interface to add a new execution-context type to
 * {@link ExecutionContextFactory}.  Each provider decides whether it can
 * handle a given query plan (`canHandle`) and, if so, creates the
 * corresponding {@link ExecutionContext} (`create`).
 *
 * @hidden
 */
export interface ExecutionContextProvider {
  /** Returns `true` when this provider can handle the given query plan. */
  canHandle(queryPlan: PartitionedQueryExecutionInfo): boolean;

  /** Creates the {@link ExecutionContext} for the given parameters. */
  create(params: ExecutionContextCreationParams): Promise<ExecutionContext> | ExecutionContext;
}

// ---------------------------------------------------------------------------
// Built-in providers
// ---------------------------------------------------------------------------

/**
 * Provider for {@link HybridQueryExecutionContext}.
 *
 * Handles query plans that contain `hybridSearchQueryInfo`.
 *
 * @hidden
 */
export class HybridQueryExecutionContextProvider implements ExecutionContextProvider {
  public canHandle(queryPlan: PartitionedQueryExecutionInfo): boolean {
    return queryPlan.hybridSearchQueryInfo != null;
  }

  public async create(params: ExecutionContextCreationParams): Promise<ExecutionContext> {
    const allPartitionKeyRanges = (
      await params.partitionKeyRangeCache.onCollectionRoutingMap(
        params.resourceLink,
        params.diagnosticNode,
      )
    ).getOrderedParitionKeyRanges();

    const queryRanges: QueryRange[] = allPartitionKeyRanges.map((partitionKeyRange) => ({
      min: partitionKeyRange.minInclusive,
      max: partitionKeyRange.maxExclusive,
      isMinInclusive: true,
      isMaxInclusive: false,
    }));

    return new HybridQueryExecutionContext(
      params.clientContext,
      params.resourceLink,
      params.query,
      params.options,
      params.queryPlan,
      params.correlatedActivityId,
      queryRanges,
    );
  }
}

/**
 * Provider for {@link PipelinedQueryExecutionContext}.
 *
 * Acts as the default catch-all for standard queries.
 *
 * @hidden
 */
export class PipelinedQueryExecutionContextProvider implements ExecutionContextProvider {
  public canHandle(_queryPlan: PartitionedQueryExecutionInfo): boolean {
    return true; // catch-all for standard queries
  }

  public create(params: ExecutionContextCreationParams): ExecutionContext {
    const queryInfo = params.queryPlan.queryInfo;
    if (queryInfo.aggregates.length > 0 && queryInfo.hasSelectValue === false) {
      throw new Error("Aggregate queries must use the VALUE keyword");
    }
    return new PipelinedQueryExecutionContext(
      params.clientContext,
      params.resourceLink,
      params.query,
      params.options,
      params.queryPlan,
      params.correlatedActivityId,
    );
  }
}

// ---------------------------------------------------------------------------
// Factory
// ---------------------------------------------------------------------------

/**
 * Registry-based factory for creating {@link ExecutionContext} instances.
 *
 * Providers are evaluated in registration order; the first whose
 * `canHandle` returns `true` wins.  Built-in providers for hybrid-search
 * and pipelined queries are registered automatically.
 *
 * To add support for a new context type, implement
 * {@link ExecutionContextProvider} and call {@link register} **before** the
 * default catch-all provider (use `registerBefore` or register at
 * construction time).
 *
 * @hidden
 */
export class ExecutionContextFactory {
  private providers: ExecutionContextProvider[] = [];

  constructor(
    private clientContext: ClientContext,
    private resourceLink: string,
    private query: string | SqlQuerySpec,
    private options: FeedOptions,
    private partitionKeyRangeCache: PartitionKeyRangeCache,
  ) {
    // Built-in providers — order matters: specific first, catch-all last.
    this.providers.push(new HybridQueryExecutionContextProvider());
    this.providers.push(new PipelinedQueryExecutionContextProvider());
  }

  /**
   * Registers a custom {@link ExecutionContextProvider}.
   *
   * The provider is inserted **before** the existing providers so that it
   * takes precedence over built-in catch-all providers.
   */
  public register(provider: ExecutionContextProvider): void {
    // Insert before the last element (the catch-all PipelinedQueryExecutionContextProvider)
    // so custom providers are evaluated before the default.
    const insertIndex = Math.max(this.providers.length - 1, 0);
    this.providers.splice(insertIndex, 0, provider);
  }

  /**
   * Creates the appropriate execution context from a query plan.
   *
   * Iterates through registered providers in order and delegates to the
   * first provider whose `canHandle` returns `true`.
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
    const params: ExecutionContextCreationParams = {
      clientContext: this.clientContext,
      resourceLink: this.resourceLink,
      query: this.query,
      options: this.options,
      partitionKeyRangeCache: this.partitionKeyRangeCache,
      queryPlan,
      correlatedActivityId,
      diagnosticNode,
    };

    for (const provider of this.providers) {
      if (provider.canHandle(queryPlan)) {
        return provider.create(params);
      }
    }

    throw new Error(
      "No execution context provider found for the given query plan. " +
        "Register a provider via ExecutionContextFactory.register().",
    );
  }
}

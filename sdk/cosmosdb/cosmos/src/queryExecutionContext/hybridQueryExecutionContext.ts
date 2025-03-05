// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureLogger } from "@azure/logger";
import { createClientLogger } from "@azure/logger";
import type { ClientContext } from "../ClientContext";
import type { DiagnosticNodeInternal } from "../diagnostics/DiagnosticNodeInternal";
import type {
  FeedOptions,
  GlobalStatistics,
  PartitionedQueryExecutionInfo,
  QueryInfo,
  QueryRange,
  Response,
} from "../request";
import { HybridSearchQueryResult } from "../request/hybridSearchQueryResult";
import { GlobalStatisticsAggregator } from "./Aggregators/GlobalStatisticsAggregator";
import type { CosmosHeaders } from "./CosmosHeaders";
import type { ExecutionContext } from "./ExecutionContext";
import { getInitialHeader, mergeHeaders } from "./headerUtils";
import { ParallelQueryExecutionContext } from "./parallelQueryExecutionContext";
import { PipelinedQueryExecutionContext } from "./pipelinedQueryExecutionContext";

/** @hidden */
export enum HybridQueryExecutionContextBaseStates {
  uninitialized = "uninitialized",
  initialized = "initialized",
  draining = "draining",
  done = "done",
}
export class HybridQueryExecutionContext implements ExecutionContext {
  private globalStatisticsExecutionContext: ExecutionContext;
  private componentsExecutionContext: ExecutionContext[] = [];
  private pageSize: number;
  private state: HybridQueryExecutionContextBaseStates;
  private globalStatisticsAggregator: GlobalStatisticsAggregator;
  private emitRawOrderByPayload: boolean = true;
  private buffer: HybridSearchQueryResult[] = [];
  private DEFAULT_PAGE_SIZE = 10;
  private TOTAL_WORD_COUNT_PLACEHOLDER = "documentdb-formattablehybridsearchquery-totalwordcount";
  private HIT_COUNTS_ARRAY_PLACEHOLDER = "documentdb-formattablehybridsearchquery-hitcountsarray";
  private TOTAL_DOCUMENT_COUNT_PLACEHOLDER =
    "documentdb-formattablehybridsearchquery-totaldocumentcount";
  private RRF_CONSTANT = 60; // Constant for RRF score calculation
  private logger: AzureLogger = createClientLogger("HybridQueryExecutionContext");
  private hybridSearchResult: HybridSearchQueryResult[] = [];
  private uniqueItems = new Map<string, HybridSearchQueryResult>();
  private isSingleComponent: boolean = false;

  constructor(
    private clientContext: ClientContext,
    private collectionLink: string,
    private options: FeedOptions,
    private partitionedQueryExecutionInfo: PartitionedQueryExecutionInfo,
    private correlatedActivityId: string,
    private allPartitionsRanges: QueryRange[],
  ) {
    this.state = HybridQueryExecutionContextBaseStates.uninitialized;
    this.pageSize = this.options.maxItemCount;
    if (this.pageSize === undefined) {
      this.pageSize = this.DEFAULT_PAGE_SIZE;
    }
    if (partitionedQueryExecutionInfo.hybridSearchQueryInfo.requiresGlobalStatistics) {
      const globalStaticsQueryOptions: FeedOptions = { maxItemCount: this.pageSize };
      this.globalStatisticsAggregator = new GlobalStatisticsAggregator();

      const globalStatisticsQuery =
        this.partitionedQueryExecutionInfo.hybridSearchQueryInfo.globalStatisticsQuery;
      const globalStatisticsQueryExecutionInfo: PartitionedQueryExecutionInfo = {
        partitionedQueryExecutionInfoVersion: 1,
        queryInfo: {
          distinctType: "None",
          hasSelectValue: false,
          groupByAliasToAggregateType: {},
          rewrittenQuery: globalStatisticsQuery,
          hasNonStreamingOrderBy: false,
        },
        queryRanges: this.allPartitionsRanges,
      };

      this.globalStatisticsExecutionContext = new ParallelQueryExecutionContext(
        this.clientContext,
        this.collectionLink,
        globalStatisticsQuery,
        globalStaticsQueryOptions,
        globalStatisticsQueryExecutionInfo,
        this.correlatedActivityId,
      );
    } else {
      this.createComponentExecutionContexts();
      this.state = HybridQueryExecutionContextBaseStates.initialized;
    }
  }
  public async nextItem(diagnosticNode: DiagnosticNodeInternal): Promise<Response<any>> {
    const nextItemRespHeaders = getInitialHeader();
    while (
      (this.state === HybridQueryExecutionContextBaseStates.uninitialized ||
        this.state === HybridQueryExecutionContextBaseStates.initialized) &&
      this.buffer.length === 0
    ) {
      await this.fetchMoreInternal(diagnosticNode, nextItemRespHeaders);
    }

    if (this.state === HybridQueryExecutionContextBaseStates.draining && this.buffer.length > 0) {
      return this.drainOne(nextItemRespHeaders);
    } else {
      return this.done(nextItemRespHeaders);
    }
  }

  public hasMoreResults(): boolean {
    switch (this.state) {
      case HybridQueryExecutionContextBaseStates.uninitialized:
        return true;
      case HybridQueryExecutionContextBaseStates.initialized:
        return true;
      case HybridQueryExecutionContextBaseStates.draining:
        return this.buffer.length > 0;
      case HybridQueryExecutionContextBaseStates.done:
        return false;
      default:
        return false;
    }
  }

  public async fetchMore(diagnosticNode?: DiagnosticNodeInternal): Promise<Response<any>> {
    const fetchMoreRespHeaders = getInitialHeader();
    return this.fetchMoreInternal(diagnosticNode, fetchMoreRespHeaders);
  }

  private async fetchMoreInternal(
    diagnosticNode: DiagnosticNodeInternal,
    headers: CosmosHeaders,
  ): Promise<Response<any>> {
    switch (this.state) {
      case HybridQueryExecutionContextBaseStates.uninitialized:
        await this.initialize(diagnosticNode, headers);
        return {
          result: [],
          headers: headers,
        };

      case HybridQueryExecutionContextBaseStates.initialized:
        await this.executeComponentQueries(diagnosticNode, headers);
        return {
          result: [],
          headers: headers,
        };
      case HybridQueryExecutionContextBaseStates.draining:
        return this.drain(headers);
      case HybridQueryExecutionContextBaseStates.done:
        return this.done(headers);
      default:
        throw new Error(`Invalid state: ${this.state}`);
    }
  }

  private async initialize(
    diagnosticNode: DiagnosticNodeInternal,
    fetchMoreRespHeaders: CosmosHeaders,
  ): Promise<void> {
    try {
      while (this.globalStatisticsExecutionContext.hasMoreResults()) {
        const result = await this.globalStatisticsExecutionContext.fetchMore(diagnosticNode);
        mergeHeaders(fetchMoreRespHeaders, result.headers);
        if (result && result.result) {
          for (const item of result.result) {
            const globalStatistics: GlobalStatistics = item;
            if (globalStatistics) {
              // iterate over the components update placeholders from globalStatistics
              this.globalStatisticsAggregator.aggregate(globalStatistics);
            }
          }
        }
      }
    } catch (error) {
      this.state = HybridQueryExecutionContextBaseStates.done;
      throw error;
    }

    // create component execution contexts for each component query
    this.createComponentExecutionContexts();
    this.state = HybridQueryExecutionContextBaseStates.initialized;
  }

  private async executeComponentQueries(
    diagnosticNode: DiagnosticNodeInternal,
    fetchMoreRespHeaders: CosmosHeaders,
  ): Promise<void> {
    if (this.isSingleComponent) {
      await this.drainSingleComponent(diagnosticNode, fetchMoreRespHeaders);
      return;
    }
    try {
      if (this.options.enableQueryControl) {
        // track componentExecutionContexts with remaining results and call them in LIFO order
        if (this.componentsExecutionContext.length > 0) {
          const componentExecutionContext = this.componentsExecutionContext.pop();
          if (componentExecutionContext.hasMoreResults()) {
            const result = await componentExecutionContext.fetchMore(diagnosticNode);
            const response = result.result;
            mergeHeaders(fetchMoreRespHeaders, result.headers);
            if (response) {
              response.forEach((item: any) => {
                const hybridItem = HybridSearchQueryResult.create(item);
                if (!this.uniqueItems.has(hybridItem.rid)) {
                  this.uniqueItems.set(hybridItem.rid, hybridItem);
                }
              });
            }
            if (componentExecutionContext.hasMoreResults()) {
              this.componentsExecutionContext.push(componentExecutionContext);
            }
          }
        }
        if (this.componentsExecutionContext.length === 0) {
          this.processUniqueItems();
        }
      } else {
        for (const componentExecutionContext of this.componentsExecutionContext) {
          while (componentExecutionContext.hasMoreResults()) {
            const result = await componentExecutionContext.fetchMore(diagnosticNode);
            const response = result.result;
            mergeHeaders(fetchMoreRespHeaders, result.headers);
            if (response) {
              response.forEach((item: any) => {
                const hybridItem = HybridSearchQueryResult.create(item);
                if (!this.uniqueItems.has(hybridItem.rid)) {
                  this.uniqueItems.set(hybridItem.rid, hybridItem);
                }
              });
            }
          }
        }
        this.processUniqueItems();
      }
    } catch (error) {
      this.state = HybridQueryExecutionContextBaseStates.done;
      throw error;
    }
  }

  private processUniqueItems(): void {
    this.uniqueItems.forEach((item) => this.hybridSearchResult.push(item));
    if (this.hybridSearchResult.length === 0 || this.hybridSearchResult.length === 1) {
      // return the result as no or one element is present
      this.hybridSearchResult.forEach((item) => this.buffer.push(item.data));
      this.state = HybridQueryExecutionContextBaseStates.draining;
      return;
    }

    // Initialize an array to hold ranks for each document
    const sortedHybridSearchResult = this.sortHybridSearchResultByRRFScore(this.hybridSearchResult);
    // store the result to buffer
    // add only data from the sortedHybridSearchResult in the buffer
    sortedHybridSearchResult.forEach((item) => this.buffer.push(item.data));
    this.applySkipAndTakeToBuffer();
    this.state = HybridQueryExecutionContextBaseStates.draining;
  }

  private applySkipAndTakeToBuffer(): void {
    const { skip, take } = this.partitionedQueryExecutionInfo.hybridSearchQueryInfo;
    if (skip) {
      this.buffer = skip >= this.buffer.length ? [] : this.buffer.slice(skip);
    }
    if (take) {
      this.buffer = take <= 0 ? [] : this.buffer.slice(0, take);
    }
  }

  private async drain(fetchMoreRespHeaders: CosmosHeaders): Promise<Response<any>> {
    try {
      if (this.buffer.length === 0) {
        this.state = HybridQueryExecutionContextBaseStates.done;
        return this.done(fetchMoreRespHeaders);
      }
      const result = this.buffer.slice(0, this.pageSize);
      this.buffer = this.buffer.slice(this.pageSize);
      if (this.buffer.length === 0) {
        this.state = HybridQueryExecutionContextBaseStates.done;
      }
      return {
        result: result,
        headers: fetchMoreRespHeaders,
      };
    } catch (error) {
      this.state = HybridQueryExecutionContextBaseStates.done;
      throw error;
    }
  }

  private async drainOne(nextItemRespHeaders: CosmosHeaders): Promise<Response<any>> {
    try {
      if (this.buffer.length === 0) {
        this.state = HybridQueryExecutionContextBaseStates.done;
        return this.done(nextItemRespHeaders);
      }
      const result = this.buffer.shift();
      if (this.buffer.length === 0) {
        this.state = HybridQueryExecutionContextBaseStates.done;
      }
      return {
        result: result,
        headers: nextItemRespHeaders,
      };
    } catch (error) {
      this.state = HybridQueryExecutionContextBaseStates.done;
      throw error;
    }
  }

  private done(fetchMoreRespHeaders: CosmosHeaders): Response<any> {
    return {
      result: undefined,
      headers: fetchMoreRespHeaders,
    };
  }

  private sortHybridSearchResultByRRFScore(
    hybridSearchResult: HybridSearchQueryResult[],
  ): HybridSearchQueryResult[] {
    if (hybridSearchResult.length === 0) {
      return [];
    }
    const ranksArray: { rid: string; ranks: number[] }[] = hybridSearchResult.map((item) => ({
      rid: item.rid,
      ranks: new Array(item.componentScores.length).fill(0),
    }));
    // Compute ranks for each component score
    for (let i = 0; i < hybridSearchResult[0].componentScores.length; i++) {
      // Sort based on the i-th component score
      hybridSearchResult.sort((a, b) => b.componentScores[i] - a.componentScores[i]);

      // Assign ranks
      let rank = 1;
      for (let j = 0; j < hybridSearchResult.length; j++) {
        if (
          j > 0 &&
          hybridSearchResult[j].componentScores[i] !== hybridSearchResult[j - 1].componentScores[i]
        ) {
          rank = j + 1;
        }
        const rankIndex = ranksArray.findIndex(
          (rankItem) => rankItem.rid === hybridSearchResult[j].rid,
        );
        ranksArray[rankIndex].ranks[i] = rank; // 1-based rank
      }
    }

    // Function to compute RRF score
    const computeRRFScore = (ranks: number[], k: number): number => {
      return ranks.reduce((acc, rank) => acc + 1 / (k + rank), 0);
    };

    // Compute RRF scores and sort based on them
    const rrfScores = ranksArray.map((item) => ({
      rid: item.rid,
      rrfScore: computeRRFScore(item.ranks, this.RRF_CONSTANT),
    }));

    // Sort based on RRF scores
    rrfScores.sort((a, b) => b.rrfScore - a.rrfScore);

    // Map sorted RRF scores back to hybridSearchResult
    const sortedHybridSearchResult = rrfScores.map((scoreItem) =>
      hybridSearchResult.find((item) => item.rid === scoreItem.rid),
    );
    return sortedHybridSearchResult;
  }

  private async drainSingleComponent(
    diagNode: DiagnosticNodeInternal,
    fetchMoreRespHeaders: CosmosHeaders,
  ): Promise<void> {
    if (this.componentsExecutionContext && this.componentsExecutionContext.length !== 1) {
      this.logger.error("drainSingleComponent called on multiple components");
      return;
    }
    try {
      if (this.options.enableQueryControl) {
        const componentExecutionContext = this.componentsExecutionContext[0];
        if (componentExecutionContext.hasMoreResults()) {
          const result = await componentExecutionContext.fetchMore(diagNode);
          const response = result.result;
          mergeHeaders(fetchMoreRespHeaders, result.headers);
          if (response) {
            response.forEach((item: any) => {
              this.hybridSearchResult.push(HybridSearchQueryResult.create(item));
            });
          }
        }
        if (!componentExecutionContext.hasMoreResults()) {
          this.state = HybridQueryExecutionContextBaseStates.draining;
          this.hybridSearchResult.forEach((item) => this.buffer.push(item.data));
          this.applySkipAndTakeToBuffer();
          this.state = HybridQueryExecutionContextBaseStates.draining;
        }
        return;
      } else {
        const componentExecutionContext = this.componentsExecutionContext[0];
        const hybridSearchResult: HybridSearchQueryResult[] = [];
        // add check for enable query control
        while (componentExecutionContext.hasMoreResults()) {
          const result = await componentExecutionContext.fetchMore(diagNode);
          const response = result.result;
          mergeHeaders(fetchMoreRespHeaders, result.headers);
          if (response) {
            response.forEach((item: any) => {
              hybridSearchResult.push(HybridSearchQueryResult.create(item));
            });
          }
        }
        hybridSearchResult.forEach((item) => this.buffer.push(item.data));
        this.applySkipAndTakeToBuffer();
        this.state = HybridQueryExecutionContextBaseStates.draining;
      }
    } catch (error) {
      this.state = HybridQueryExecutionContextBaseStates.done;
      throw error;
    }
  }

  private createComponentExecutionContexts(): void {
    // rewrite queries based on global statistics
    let queryInfos: QueryInfo[] =
      this.partitionedQueryExecutionInfo.hybridSearchQueryInfo.componentQueryInfos;
    if (this.partitionedQueryExecutionInfo.hybridSearchQueryInfo.requiresGlobalStatistics) {
      queryInfos = this.processComponentQueries(
        this.partitionedQueryExecutionInfo.hybridSearchQueryInfo.componentQueryInfos,
        this.globalStatisticsAggregator.getResult(),
      );
    }
    // create component execution contexts
    for (const componentQueryInfo of queryInfos) {
      const componentPartitionExecutionInfo: PartitionedQueryExecutionInfo = {
        partitionedQueryExecutionInfoVersion: 1,
        queryInfo: componentQueryInfo,
        queryRanges: this.partitionedQueryExecutionInfo.queryRanges,
      };
      const executionContext = new PipelinedQueryExecutionContext(
        this.clientContext,
        this.collectionLink,
        componentQueryInfo.rewrittenQuery,
        this.options,
        componentPartitionExecutionInfo,
        this.correlatedActivityId,
        this.emitRawOrderByPayload,
      );
      this.componentsExecutionContext.push(executionContext);
    }
    this.isSingleComponent = this.componentsExecutionContext.length === 1;
  }
  private processComponentQueries(
    componentQueryInfos: QueryInfo[],
    globalStats: GlobalStatistics,
  ): QueryInfo[] {
    return componentQueryInfos.map((queryInfo) => {
      if (!queryInfo.hasNonStreamingOrderBy) {
        throw new Error("The component query must have a non-streaming order by clause.");
      }
      return {
        ...queryInfo,
        rewrittenQuery: this.replacePlaceholdersWorkaroud(
          queryInfo.rewrittenQuery,
          globalStats,
          componentQueryInfos.length,
        ),
        orderByExpressions: queryInfo.orderByExpressions.map((expr) =>
          this.replacePlaceholdersWorkaroud(expr, globalStats, componentQueryInfos.length),
        ),
      };
    });
  }
  // This method is commented currently, but we will switch back to using this
  // once the gateway has been redeployed with the fix for placeholder indexes
  // private replacePlaceholders(query: string, globalStats: GlobalStatistics): string {
  //   // Replace total document count
  //   query = query.replace(
  //     new RegExp(`{${this.TOTAL_DOCUMENT_COUNT_PLACEHOLDER}}`, "g"),
  //     globalStats.documentCount.toString(),
  //   );

  //   // Replace total word counts and hit counts from fullTextStatistics
  //   globalStats.fullTextStatistics.forEach((stats, index) => {
  //     // Replace total word counts
  //     query = query.replace(
  //       new RegExp(`{${this.TOTAL_WORD_COUNT_PLACEHOLDER}-${index}}`, "g"),
  //       stats.totalWordCount.toString(),
  //     );
  //     // Replace hit counts
  //     query = query.replace(
  //       new RegExp(`{${this.HIT_COUNTS_ARRAY_PLACEHOLDER}-${index}}`, "g"),
  //       `[${stats.hitCounts.join(",")}]`,
  //     );
  //   });

  //   return query;
  // }

  private replacePlaceholdersWorkaroud(
    query: string,
    globalStats: GlobalStatistics,
    componentCount: number,
  ): string {
    if (
      !globalStats ||
      !globalStats.documentCount ||
      !Array.isArray(globalStats.fullTextStatistics)
    ) {
      throw new Error("GlobalStats validation failed");
    }
    // Replace total document count
    query = query.replace(
      new RegExp(`{${this.TOTAL_DOCUMENT_COUNT_PLACEHOLDER}}`, "g"),
      globalStats.documentCount.toString(),
    );
    let statisticsIndex: number = 0;
    for (let i = 0; i < componentCount; i++) {
      // Replace total word counts and hit counts from fullTextStatistics
      const wordCountPlaceholder = `{${this.TOTAL_WORD_COUNT_PLACEHOLDER}-${i}}`;
      const hitCountPlaceholder = `{${this.HIT_COUNTS_ARRAY_PLACEHOLDER}-${i}}`;
      if (!query.includes(wordCountPlaceholder)) {
        continue;
      }
      const stats = globalStats.fullTextStatistics[statisticsIndex];
      // Replace total word counts
      query = query.replace(new RegExp(wordCountPlaceholder, "g"), stats.totalWordCount.toString());
      // Replace hit counts
      query = query.replace(new RegExp(hitCountPlaceholder, "g"), `[${stats.hitCounts.join(",")}]`);
      statisticsIndex++;
    }
    return query;
  }
}

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ClientContext } from "../ClientContext";
import { DiagnosticNodeInternal } from "../diagnostics/DiagnosticNodeInternal";
import {
  FeedOptions,
  GlobalStatistics,
  PartitionedQueryExecutionInfo,
  QueryInfo,
  QueryRange,
  Response,
} from "../request";
import { HybridSearchQueryResult } from "../request/hybridSearchQueryResult";
import { GlobalStatisticsAggregator } from "./Aggregators/GlobalStatisticsAggregator";
import { ExecutionContext } from "./ExecutionContext";
import { SqlQuerySpec } from "./SqlQuerySpec";
import { getInitialHeader } from "./headerUtils";
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

  constructor(
    private clientContext: ClientContext,
    private collectionLink: string,
    private query: string | SqlQuerySpec,
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
    console.log("query", this.query);
    if (partitionedQueryExecutionInfo.hybridSearchQueryInfo.requiresGlobalStatistics) {
      const globalStaticsQueryOptions: FeedOptions = { maxItemCount: this.pageSize };
      this.globalStatisticsAggregator = new GlobalStatisticsAggregator();

      let globalStatisticsQuery =
        this.partitionedQueryExecutionInfo.hybridSearchQueryInfo.globalStatisticsQuery;
      console.log("globalStatisticsQuery", globalStatisticsQuery);
      // globalStatisticsQuery = globalStatisticsQuery.replace("_FullTextWordCount", "_FullText_WordCount");
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

      console.log("setting global execution context");
      this.globalStatisticsExecutionContext = new ParallelQueryExecutionContext(
        this.clientContext,
        this.collectionLink,
        globalStatisticsQuery,
        globalStaticsQueryOptions,
        globalStatisticsQueryExecutionInfo,
        this.correlatedActivityId,
      );
    } else {
      // initialise context without global statistics
      this.state = HybridQueryExecutionContextBaseStates.initialized;
    }
  }
  public async nextItem(diagnosticNode: DiagnosticNodeInternal): Promise<Response<any>> {
    while (
      (this.state === HybridQueryExecutionContextBaseStates.uninitialized ||
        this.state === HybridQueryExecutionContextBaseStates.initialized) &&
      this.buffer.length === 0
    ) {
      await this.fetchMore(diagnosticNode);
    }

    if (this.buffer.length > 0) {
      return this.drainOne();
    } else {
      return this.done();
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

  public async fetchMore(diagnosticNode: DiagnosticNodeInternal): Promise<Response<any>> {
    switch (this.state) {
      case HybridQueryExecutionContextBaseStates.uninitialized:
        await this.initialize(diagnosticNode);
        return {
          result: [],
          headers: getInitialHeader(),
        };

      case HybridQueryExecutionContextBaseStates.initialized:
        await this.executeComponentQueries(diagnosticNode);
        return {
          result: [],
          headers: getInitialHeader(),
        };
      case HybridQueryExecutionContextBaseStates.draining:
        const result = await this.drain();
        return result;
      case HybridQueryExecutionContextBaseStates.done:
        return this.done();
      default:
        throw new Error(`Invalid state: ${this.state}`);
    }
  }

  private async initialize(diagnosticNode: DiagnosticNodeInternal): Promise<void> {
    // const requestCharge = 0;
    // TODO: Add request charge to the response and other headers
    // TODO: either add a check for require global statistics or create pipeline inside
    try {
      while (this.globalStatisticsExecutionContext.hasMoreResults()) {
        const result = await this.globalStatisticsExecutionContext.nextItem(diagnosticNode);
        console.log("result gloabal statistics", result);
        const globalStatistics: GlobalStatistics = result.result;
        //iterate over the components update placeholders from globalStatistics
        this.globalStatisticsAggregator.aggregate(globalStatistics);
      }
    } catch (error) {
      this.state = HybridQueryExecutionContextBaseStates.done;
      throw error;
    }

    // create component execution contexts for each component query
    this.createComponentExecutionContexts();
    this.state = HybridQueryExecutionContextBaseStates.initialized;
  }

  private async executeComponentQueries(diagnosticNode: DiagnosticNodeInternal): Promise<void> {
    if (this.componentsExecutionContext.length === 1) {
      await this.drainSingleComponent(diagnosticNode);
      return;
    }
    try {
      const hybridSearchResult: HybridSearchQueryResult[] = [];
      const uniqueItems = new Map<string, HybridSearchQueryResult>();

      for (const componentExecutionContext of this.componentsExecutionContext) {
        while (componentExecutionContext.hasMoreResults()) {
          const result = await componentExecutionContext.fetchMore(diagnosticNode);
          const response = result.result;
          console.log("individual component response", JSON.stringify(response));
          if (response) {
            response.forEach((item: any) => {
              const hybridItem = HybridSearchQueryResult.create(item);
              console.log("hybridItem", hybridItem);
              if (!uniqueItems.has(hybridItem.rid)) {
                uniqueItems.set(hybridItem.rid, hybridItem);
              }
            });
          }
        }
      }
      uniqueItems.forEach((item) => hybridSearchResult.push(item));
      console.log("hybridSearchResult", hybridSearchResult);
      if (hybridSearchResult.length === 0 || hybridSearchResult.length === 1) {
        // return the result as no or one element is present
        hybridSearchResult.forEach((item) => this.buffer.push(item.data));
        this.state = HybridQueryExecutionContextBaseStates.draining;
        return;
      }

      // Initialize an array to hold ranks for each document
      const sortedHybridSearchResult = this.sortHybridSearchResultByRRFScore(hybridSearchResult);

      // console.log("sortedHybridSearchResult", sortedHybridSearchResult);
      console.log("sortedHybridSearchResult length", sortedHybridSearchResult.length);
      // print Index, rid and componentScores for each item
      sortedHybridSearchResult.forEach((item) => {
        console.log(
          `Index: ${item.data.Index}, rid: ${item.rid}, componentScores: ${item.componentScores}`,
        );
      });
      // store the result to buffer
      // add only data from the sortedHybridSearchResult in the buffer
      sortedHybridSearchResult.forEach((item) => this.buffer.push(item.data));
      this.applySkipAndTakeToBuffer();
      this.state = HybridQueryExecutionContextBaseStates.draining;
      console.log("draining");
      // remove this
    } catch (error) {
      this.state = HybridQueryExecutionContextBaseStates.done;
      throw error;
    }
  }

  private applySkipAndTakeToBuffer() {
    const { skip, take } = this.partitionedQueryExecutionInfo.hybridSearchQueryInfo;
    if (skip) {
      this.buffer = this.buffer.slice(skip);
      console.log("buffer after skip", skip, this.buffer);
    }

    if (take) {
      this.buffer = this.buffer.slice(0, take);
      console.log("buffer after take", take, this.buffer);
    }
  }

  private async drain(): Promise<Response<any>> {
    try {
      if (this.buffer.length === 0) {
        this.state = HybridQueryExecutionContextBaseStates.done;
        return this.done();
      }
      const result = this.buffer.slice(0, this.pageSize);
      this.buffer = this.buffer.slice(this.pageSize);
      if (this.buffer.length === 0) {
        this.state = HybridQueryExecutionContextBaseStates.done;
        console.log("state:", this.state);
      }
      return {
        result: result,
        headers: getInitialHeader(),
      };
    } catch (error) {
      this.state = HybridQueryExecutionContextBaseStates.done;
      throw error;
    }
  }

  private async drainOne(): Promise<Response<any>> {
    try {
      if (this.buffer.length === 0) {
        this.state = HybridQueryExecutionContextBaseStates.done;
        return this.done();
      }
      const result = this.buffer.shift();
      if (this.buffer.length === 0) {
        this.state = HybridQueryExecutionContextBaseStates.done;
      }
      return {
        result: result,
        headers: getInitialHeader(),
      };
    } catch (error) {
      this.state = HybridQueryExecutionContextBaseStates.done;
      throw error;
    }
  }

  private done(): Response<any> {
    return {
      result: undefined,
      headers: getInitialHeader(),
    };
  }

  private sortHybridSearchResultByRRFScore(hybridSearchResult: HybridSearchQueryResult[]) {
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
    const k = 60; // Constant for RRF score calculation
    const rrfScores = ranksArray.map((item) => ({
      rid: item.rid,
      rrfScore: computeRRFScore(item.ranks, k),
    }));

    // Sort based on RRF scores
    rrfScores.sort((a, b) => b.rrfScore - a.rrfScore);
    console.log("rrfScores array", rrfScores);

    // Map sorted RRF scores back to hybridSearchResult
    const sortedHybridSearchResult = rrfScores.map((scoreItem) =>
      hybridSearchResult.find((item) => item.rid === scoreItem.rid),
    );
    return sortedHybridSearchResult;
  }

  private async drainSingleComponent(diagNode: DiagnosticNodeInternal): Promise<void> {
    if (this.componentsExecutionContext && this.componentsExecutionContext.length !== 1) {
      throw new Error("drainSingleComponent called on multiple components");
    }
    try {
      const componentExecutionContext = this.componentsExecutionContext[0];
      const hybridSearchResult: HybridSearchQueryResult[] = [];
      while (componentExecutionContext.hasMoreResults()) {
        const result = await componentExecutionContext.fetchMore(diagNode);
        const response = result.result;
        response.forEach((item: any) => {
          hybridSearchResult.push(HybridSearchQueryResult.create(item));
        });
      }
      console.log("result from single drain", JSON.stringify(hybridSearchResult));

      hybridSearchResult.forEach((item) => this.buffer.push(item.data));
      this.applySkipAndTakeToBuffer();
      this.state = HybridQueryExecutionContextBaseStates.draining;
    } catch (error) {
      this.state = HybridQueryExecutionContextBaseStates.done;
      throw error;
    }
  }

  private createComponentExecutionContexts(): void {
    // rewrite queries based on global statistics
    const rewrittenQueryInfos = this.processComponentQueries(
      this.partitionedQueryExecutionInfo.hybridSearchQueryInfo.componentQueryInfos,
      this.globalStatisticsAggregator.getResult(),
    );
    console.log("rewrittenQueryInfo", rewrittenQueryInfos);
    // create component execution contexts
    for (const componentQueryInfo of rewrittenQueryInfos) {
      const componentPartitionExecutionInfo: PartitionedQueryExecutionInfo = {
        partitionedQueryExecutionInfoVersion: 1,
        queryInfo: componentQueryInfo,
        queryRanges: this.partitionedQueryExecutionInfo.queryRanges,
      };
      this.componentsExecutionContext.push(
        new PipelinedQueryExecutionContext(
          this.clientContext,
          this.collectionLink,
          componentQueryInfo.rewrittenQuery,
          this.options,
          componentPartitionExecutionInfo,
          this.correlatedActivityId,
          this.emitRawOrderByPayload,
        ),
      );
    }
  }
  private processComponentQueries(
    componentQueryInfos: QueryInfo[],
    globalStats: GlobalStatistics,
  ): QueryInfo[] {
    return componentQueryInfos.map((queryInfo) => {
      if (!queryInfo.hasNonStreamingOrderBy) {
        throw new Error("The component query should a non streaming order by");
      }
      return {
        ...queryInfo,
        rewrittenQuery: this.replacePlaceholders(queryInfo.rewrittenQuery, globalStats),
        orderByExpressions: queryInfo.orderByExpressions.map((expr) =>
          this.replacePlaceholders(expr, globalStats),
        ),
      };
    });
  }

  private replacePlaceholders(query: string, globalStats: GlobalStatistics): string {
    // Replace total document count
    query = query.replace(
      /{documentdb-formattablehybridsearchquery-totaldocumentcount}/g,
      globalStats.documentCount.toString(),
    );

    // Replace total word counts and hit counts from fullTextStatistics
    globalStats.fullTextStatistics.forEach((stats, index) => {
      // Replace total word counts
      query = query.replace(
        new RegExp(`{documentdb-formattablehybridsearchquery-totalwordcount-${index}}`, "g"),
        stats.totalWordCount.toString(),
      );
      // Replace hit counts
      query = query.replace(
        new RegExp(`{documentdb-formattablehybridsearchquery-hitcountsarray-${index}}`, "g"),
        `[${stats.hitCounts.join(",")}]`,
      );
    });

    return query;
  }
}

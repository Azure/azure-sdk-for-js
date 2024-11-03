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
// import { OrderByComparator } from "./orderByComparator";
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
  nextItem: (diagnosticNode: DiagnosticNodeInternal) => Promise<Response<any>>;

  public hasMoreResults(): boolean {
    console.log("state", this.state);
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
      const result = await this.drainSingleComponent(diagnosticNode);
      console.log("result from single drain", JSON.stringify(result));
      return;
    }
    console.log("componentsExecutionContext", this.componentsExecutionContext.length);
    try {
      const hybridSearchResult: HybridSearchQueryResult[] = [];
      const uniqueItems = new Map<string, HybridSearchQueryResult>();

      for (const componentExecutionContext of this.componentsExecutionContext) {
        console.log("componentExecutionContext", componentExecutionContext);
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
      console.log("uniqueItems", uniqueItems);
      uniqueItems.forEach((item) => hybridSearchResult.push(item));
      console.log("hybridSearchResult", hybridSearchResult);
      if (hybridSearchResult.length === 0 || hybridSearchResult.length === 1) {
        // return the result as no or one element is present
        this.state = HybridQueryExecutionContextBaseStates.draining;
        return;
      }

      // Initialize an array to hold ranks for each document
      const sortedHybridSearchResult = this.sortHybridSearchResultByRRFScore(hybridSearchResult);

      console.log("sortedHybridSearchResult", sortedHybridSearchResult);
      // store the result to buffer
      // add only data from the sortedHybridSearchResult in the buffer
      sortedHybridSearchResult.forEach((item) => this.buffer.push(item.data));
      this.state = HybridQueryExecutionContextBaseStates.draining;
      console.log("draining");
      // remove this
    } catch (error) {
      this.state = HybridQueryExecutionContextBaseStates.done;
      throw error;
    }
  }

  private async drain(): Promise<Response<any>> {
    try {
      const result = this.buffer.slice(0, this.pageSize);
      this.buffer = this.buffer.slice(this.pageSize);
      console.log("page size", this.pageSize);
      console.log("drain result", result.length);
      console.log("buffer length", this.buffer.length);
      console.log("drain result", result);
      if (this.buffer.length === 0) {
        this.state = HybridQueryExecutionContextBaseStates.done;
        console.log("done:", this.state);
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
    console.log("done");
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
      hybridSearchResult.forEach((item, index) => {
        const rankIndex = ranksArray.findIndex((rankItem) => rankItem.rid === item.rid);
        ranksArray[rankIndex].ranks[i] = index + 1; // 1-based rank
      });
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

    // Map sorted RRF scores back to hybridSearchResult
    const sortedHybridSearchResult = rrfScores.map((scoreItem) =>
      hybridSearchResult.find((item) => item.rid === scoreItem.rid),
    );
    return sortedHybridSearchResult;
  }

  private async drainSingleComponent(diagNode: DiagnosticNodeInternal): Promise<Response<any>> {
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

      this.state = HybridQueryExecutionContextBaseStates.draining;
      return {
        result: hybridSearchResult,
        headers: getInitialHeader(),
      };
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

// function rankComponents(responseSet: Map<string, any>): Map<string, any> {
//   // Convert the map values (ComponentObjects) into an array
//   const valuesArray = Array.from(responseSet.values()) as ComponentObject[];

//   // Determine how many elements are in componentScores (assuming all have the same length)
//   const numComponents = valuesArray[0].componentScores.length;

//   // Iterate through each index in componentScores (e.g., 0, 1, 2,...)
//   for (let i = 0; i < numComponents; i++) {
//         const comparator = new OrderByComparator(this.partitionedQueryExecutionInfo.hybridSearchQueryInfo.componentQueryInfos[i].orderBy);
//     // Sort the array based on componentScores[i]
//     valuesArray.sort((a, b) => comparator.compareItems(a.componentScores[i], b.componentScores[i]));

//     // Assign ranks based on the sorted order
//     valuesArray.forEach((obj, rank) => {
//       // Initialize componentRanks if not already
//       if (!obj.componentRanks) {
//         obj.componentRanks = new Array(numComponents).fill(0); // Initialize with zeros
//       }
//       // Assign the rank (1-based rank)
//       obj.componentRanks[i] = rank + 1;
//     });
//   }

//   // Convert the array back into a Map, preserving the original keys
//   const rankedResponseSet = new Map<string, any>();
//   let index = 0;

//   // Iterate through the original keys and map back the updated values
//   responseSet.forEach((_, key) => {
//     rankedResponseSet.set(key, valuesArray[index++]);
//   });

//   return rankedResponseSet; // Return the new Map with ranked data
// }

// function computeRRFScore(ranks: number[], k: number): number {
//   return ranks.reduce((acc, rank) => acc + (1 / (k + rank)), 0);
// }

// Function to compute the RRF score based on componentRanks for each object in the set
// function computeRRFScoreForSet(responseSet: Map<string, any>, k: number): Map<string, any> {
//   // Convert the map values (ComponentObjects) into an array
//   const valuesArray = Array.from(responseSet.values()) as ComponentObject[];

//   // Iterate through each object and compute its RRF score
//   valuesArray.forEach((obj) => {
//     if (obj.componentRanks) {
//       obj.RRFscore = computeRRFScore(obj.componentRanks, k);
//     }
//   });

//   // Convert the array back into a Map, preserving the original keys
//   const scoredResponseSet = new Map<string, any>();
//   let index = 0;

//   // Iterate through the original keys and map back the updated values
//   responseSet.forEach((_, key) => {
//     scoredResponseSet.set(key, valuesArray[index++]);
//   });

//   return scoredResponseSet; // Return the Map with updated RRF scores
// }

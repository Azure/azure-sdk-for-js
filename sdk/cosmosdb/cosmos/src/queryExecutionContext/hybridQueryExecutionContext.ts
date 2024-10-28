// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ClientContext } from "../ClientContext";
import { DiagnosticNodeInternal } from "../diagnostics/DiagnosticNodeInternal";
import {
  FeedOptions,
  GlobalStatistics,
  PartitionedQueryExecutionInfo,
  QueryRange,
  Response,
} from "../request";
import { GlobalStatisticsAggregator } from "./Aggregators/GlobalStatisticsAggregator";
import { ExecutionContext } from "./ExecutionContext";
import { SqlQuerySpec } from "./SqlQuerySpec";
import { getInitialHeader } from "./headerUtils";
// import { OrderByComparator } from "./orderByComparator";
import { ParallelQueryExecutionContext } from "./parallelQueryExecutionContext";

/** @hidden */
export enum HybridQueryExecutionContextBaseStates {
  uninitialized = "uninitialized",
  initialized = "initialized",
  draining = "draining",
  done = "done",
}
export class HybridQueryExecutionContext implements ExecutionContext {
  private globalStatisticsExecutionContext: ExecutionContext;
  // private componentsExecutionContext: ExecutionContext[] = [];
  private pageSize: number;
  private state: HybridQueryExecutionContextBaseStates;
  private globalStatisticsAggregator: GlobalStatisticsAggregator;

  constructor(
    private clientContext: ClientContext,
    private collectionLink: string,
    private query: string | SqlQuerySpec,
    private options: FeedOptions,
    private partitionedQueryExecutionInfo: PartitionedQueryExecutionInfo,
    private correlatedActivityId: string,
    private allPartitionsRanges: QueryRange[],
  ) {
    this.pageSize = this.options.maxItemCount;
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
      this.state = HybridQueryExecutionContextBaseStates.uninitialized;
    }
  }
  nextItem: (diagnosticNode: DiagnosticNodeInternal) => Promise<Response<any>>;

  public hasMoreResults(): boolean {
    return this.state !== HybridQueryExecutionContextBaseStates.done;
  }

  public async fetchMore(diagnosticNode: DiagnosticNodeInternal): Promise<Response<any>> {
    switch (this.state) {
      case HybridQueryExecutionContextBaseStates.uninitialized:
        await this.initialize(diagnosticNode);
        this.state = HybridQueryExecutionContextBaseStates.initialized;
        console.log("fetchMore GloabalStatitics", this.globalStatisticsAggregator.getResult());
        return {
          result: undefined,
          headers: getInitialHeader(),
        };

      // case HybridQueryExecutionContextBaseStates.initialized:
      //   return this.processComponentQueries(diagnosticNode);
      // case HybridQueryExecutionContextBaseStates.draining:
      //   return this.drain(diagnosticNode);
      // case HybridQueryExecutionContextBaseStates.done:
      //   return this.done();
      default:
        throw new Error(`Invalid state: ${this.state}`);
    }

    //     const globalStatistics: GlobalStatistics = result.result;
    //     //iterate over the components update placeholders from globalStatistics

    //     // TODO: update to get data from all ranges instead of just target ranges for globalStatistics
    //     this.partitionedQueryExecutionInfo.hybridSearchQueryInfo.componentQueryInfos = processComponentQueries(this.partitionedQueryExecutionInfo.hybridSearchQueryInfo.componentQueryInfos, globalStatistics);

    //     for (const componentQueryInfo of this.partitionedQueryExecutionInfo.hybridSearchQueryInfo.componentQueryInfos){

    //           const componentPartitionExecutionInfo: PartitionedQueryExecutionInfo = {
    //               partitionedQueryExecutionInfoVersion: 1,
    //               queryInfo: componentQueryInfo,
    //               queryRanges: this.partitionedQueryExecutionInfo.queryRanges
    //           };
    //           this.componentsExecutionContext.push(new PipelinedQueryExecutionContext(this.clientContext,
    //               this.collectionLink,
    //               this.query,
    //               this.options,
    //               componentPartitionExecutionInfo,
    //               this.correlatedActivityId));
    //       }

    //   this.isInitialized = true;
    //   } else {
    //     // update response such that it holds unique rid's

    //     const responseSet = new Map<string, any>();

    //     for (const componentExecutionContext of this.componentsExecutionContext){
    //       while(componentExecutionContext.hasMoreResults()){

    //       const result = await componentExecutionContext.fetchMore(diagnosticNode);
    //       // add all the pages of result to response

    //       for (const item of result.result){
    //         if(!responseSet.has(item.rid)){
    //           responseSet.set(item.rid, item);
    //         }
    //       }

    //     }
    //   }

    //   // continue from assigning ranks to the responseSet

    //   const rankedResponseSet = rankComponents(responseSet);

    //   // compute rrf ranks
    //   // set k as constant 60
    //   const rrfScoreSet = computeRRFScoreForSet(rankedResponseSet, 60);

    //   // sort the responseSet based on rrfScore
    //   const sortedResponseSet = new Map([...rrfScoreSet.entries()].sort((a, b) => b[1].RRFscore - a[1].RRFscore));

    //   // skip elements based on skip value in hybridSearchQueryInfo and take elements based on take value in hybridSearchQueryInfo
    //   const skip = this.partitionedQueryExecutionInfo.hybridSearchQueryInfo.skip;
    //   const take = this.partitionedQueryExecutionInfo.hybridSearchQueryInfo.take;
    //   let i = 0;
    //   const response = new Map<string, any>();
    //   for (const [key, value] of sortedResponseSet.entries()) {
    //     if (i < skip) {
    //       i++;
    //       continue;
    //     }
    //     response.set(key, value); // Add the item to the response
    //     if (response.size >= take) {
    //       break;
    //     }
    //   }
    //   return response;

    // }
  }

  private async initialize(diagnosticNode: DiagnosticNodeInternal): Promise<void> {
    // const requestCharge = 0;
    // TODO: Add request charge to the response and other headers

    while (this.globalStatisticsExecutionContext.hasMoreResults()) {
      const result = await this.globalStatisticsExecutionContext.nextItem(diagnosticNode);
      console.log("result gloabal statistics", result);
      const globalStatistics: GlobalStatistics = result.result;
      //iterate over the components update placeholders from globalStatistics
      this.globalStatisticsAggregator.aggregate(globalStatistics);
    }
  }
}

//     function processComponentQueries(componentQueryInfos: QueryInfo[], globalStats: GlobalStatistics): QueryInfo[] {
//       return componentQueryInfos.map((queryInfo) => {
//         return {
//           ...queryInfo,
//           rewrittenQuery: replacePlaceholders(queryInfo.rewrittenQuery, globalStats),
//           orderByExpressions: queryInfo.orderByExpressions.map(expr => replacePlaceholders(expr, globalStats)),
//         };
//       });
//     }

//     function replacePlaceholders(query: string, globalStats: GlobalStatistics): string {
//   // Replace total document count
//   query = query.replace(/{documentdb-formattablehybridsearchquery-totaldocumentcount}/g, globalStats.documentCount.toString());

//   // Replace total word counts and hit counts from fullTextStatistics
//   globalStats.fullTextStatistics.forEach((stats, index) => {
//     // Replace total word counts
//     query = query.replace(
//       new RegExp(`{documentdb-formattablehybridsearchquery-totalwordcount-${index}}`, 'g'),
//       stats.totalWordCount.toString()
//     );

//     // Replace hit counts
//       query = query.replace(
//         new RegExp(`{documentdb-formattablehybridsearchquery-hitcountsarray-${index}}`, 'g'),
//         stats.hitCounts.toString()
//       );
//     });

//   return query;
// }

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

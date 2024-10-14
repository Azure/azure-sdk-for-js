// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ClientContext } from "../ClientContext";
import { DiagnosticNodeInternal } from "../diagnostics/DiagnosticNodeInternal";
import { FeedOptions, GlobalStatistics, PartitionedQueryExecutionInfo, QueryInfo, Response } from "../request";
import { ExecutionContext } from "./ExecutionContext";
import { PipelinedQueryExecutionContext } from "./pipelinedQueryExecutionContext";
import { SqlQuerySpec } from "./SqlQuerySpec";
import { GlobalStatisticsExecutionContext } from "./EndpointComponent/GlobalStatisticsExecutionContext";


export class HybridQueryExecutionContext implements ExecutionContext{
    
    private queryExecutionContext: any;
    private globalStatisticsExecutionContext: ExecutionContext;
    private componentsExecutionContext: ExecutionContext[] = [];
    private isInitialized: boolean = false;

    constructor(private clientContext: ClientContext,
    private collectionLink: string,
    private query: string | SqlQuerySpec,
    private options: FeedOptions,
    private partitionedQueryExecutionInfo: PartitionedQueryExecutionInfo,
    private correlatedActivityId: string,) {

      this.globalStatisticsExecutionContext = new GlobalStatisticsExecutionContext( this.clientContext,
          this.collectionLink,
          this.query,
          this.options,
          this.partitionedQueryExecutionInfo,
          this.correlatedActivityId );

      
        
    }
  nextItem: (diagnosticNode: DiagnosticNodeInternal) => Promise<Response<any>>;
  hasMoreResults: () => boolean;
  
    async fetchMore(diagnosticNode: DiagnosticNodeInternal) {
      if(!this.isInitialized){

        const result = await this.globalStatisticsExecutionContext.nextItem(diagnosticNode);
        const globalStatistics: GlobalStatistics = result.result;

        //iterate over the components update placeholders from globalStatistics

        processComponentQueries(this.partitionedQueryExecutionInfo.hybridSearchQueryInfo.componentQueryInfos, globalStatistics);


        if(this.partitionedQueryExecutionInfo.hybridSearchQueryInfo !== undefined){
          for (const componentQueryInfo of this.partitionedQueryExecutionInfo.hybridSearchQueryInfo.componentQueryInfos){

              const componentPartitionExecitionInfo: PartitionedQueryExecutionInfo = {
                  partitionedQueryExecutionInfoVersion: 1,
                  queryInfo: componentQueryInfo,
                  queryRanges: this.partitionedQueryExecutionInfo.queryRanges
              };
              this.componentsExecutionContext.push(new PipelinedQueryExecutionContext(this.clientContext,
                  this.collectionLink,
                  this.query,
                  this.options,
                  componentPartitionExecitionInfo,
                  this.correlatedActivityId));
          }
      }
      this.isInitialized = true;
      } else {
        // update response such that it holds unique rid's
                  
        const responseSet = new Map<string, Document>();

        for (const componentExecutionContext of this.componentsExecutionContext){
          while(componentExecutionContext.hasMoreResults()){
          
          const result = await componentExecutionContext.fetchMore(diagnosticNode);
          // add all the pages of result to response

          for (const item of result.result){
            if(!responseSet.has(item.rid)){
              responseSet.set(item.rid, item);
            }
          }

        }
      }

      // continue from assigning ranks to the responseSet

        return this.queryExecutionContext.fetchMore();
    }
  }
    
    function processComponentQueries(componentQueryInfos: QueryInfo[], globalStats: GlobalStatistics): QueryInfo[] {
      return componentQueryInfos.map((queryInfo) => {
        return {
          ...queryInfo,
          rewrittenQuery: replacePlaceholders(queryInfo.rewrittenQuery, globalStats),
          orderByExpressions: queryInfo.orderByExpressions.map(expr => replacePlaceholders(expr, globalStats)),
        };
      });
    }

    function replacePlaceholders(query: string, globalStats: GlobalStatistics): string {
  // Replace total document count
  query = query.replace(/{documentdb-formattablehybridsearchquery-totaldocumentcount}/g, globalStats.documentCount.toString());

  // Replace total word counts and hit counts from fullTextStatistics
  globalStats.fullTextStatistics.forEach((stats, index) => {
    // Replace total word counts
    query = query.replace(
      new RegExp(`{documentdb-formattablehybridsearchquery-totalwordcount-${index}}`, 'g'),
      stats.totalWordCount.toString()
    );

    // Replace hit counts
      query = query.replace(
        new RegExp(`{documentdb-formattablehybridsearchquery-hitcountsarray-${index}}`, 'g'),
        stats.hitCounts.toString()
      );
    });
  

  return query;
}

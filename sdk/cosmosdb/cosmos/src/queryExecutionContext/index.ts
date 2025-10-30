// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
export * from "./headerUtils.js";
export * from "./SqlQuerySpec.js";
export * from "./defaultQueryExecutionContext.js";
export * from "./Aggregators/index.js";
export * from "./documentProducer.js";
export * from "./FetchResult.js";
export * from "./orderByDocumentProducerComparator.js";
export * from "./ExecutionContext.js";
export * from "./parallelQueryExecutionContextBase.js";
export * from "./parallelQueryExecutionContext.js";
export * from "./orderByQueryExecutionContext.js";
export * from "./pipelinedQueryExecutionContext.js";
export * from "./orderByComparator.js";

// Query Filtering Strategy - Direct exports
export type { FilterContext, FilterStrategy } from "./queryFilteringStrategy/FilterStrategy.js";
export { RidSkipCountFilter } from "./queryFilteringStrategy/RidSkipCountFilter.js";
export {
  TargetPartitionRangeManager,
  QueryExecutionContextType,
} from "./queryFilteringStrategy/TargetPartitionRangeManager.js";
export type { TargetPartitionRangeManagerConfig } from "./queryFilteringStrategy/TargetPartitionRangeManager.js";
export type {
  TargetPartitionRangeStrategy,
  PartitionRangeFilterResult,
} from "./queryFilteringStrategy/TargetPartitionRangeStrategy.js";
export { ParallelQueryRangeStrategy } from "./queryFilteringStrategy/ParallelQueryRangeStrategy.js";
export { OrderByQueryRangeStrategy } from "./queryFilteringStrategy/OrderByQueryRangeStrategy.js";

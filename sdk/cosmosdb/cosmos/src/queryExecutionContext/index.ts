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

// Target Partition Range Management
export {
  TargetPartitionRangeManager,
  QueryExecutionContextType,
} from "./TargetPartitionRangeManager.js";
export type { TargetPartitionRangeManagerConfig } from "./TargetPartitionRangeManager.js";
export type {
  TargetPartitionRangeStrategy,
  PartitionRangeFilterResult,
} from "./TargetPartitionRangeStrategy.js";
export { ParallelQueryRangeStrategy } from "./ParallelQueryRangeStrategy.js";
export { OrderByQueryRangeStrategy } from "./OrderByQueryRangeStrategy.js";

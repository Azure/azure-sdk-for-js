// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
export {
  ErrorResponse,
  type ErrorBody,
  type PartitionedQueryExecutionInfo,
  type QueryInfo,
  type QueryRange,
  type AggregateType,
  type GroupByExpressions,
  type GroupByAliasToAggregateType,
  type HybridSearchQueryInfo,
} from "./ErrorResponse.js";
export type { FeedOptions } from "./FeedOptions.js";
export type { RequestOptions } from "./RequestOptions.js";
export type { Response } from "./Response.js";
export { ResourceResponse } from "./ResourceResponse.js";
export type { SharedOptions } from "./SharedOptions.js";
export type { StatusCode, SubStatusCode } from "./StatusCodes.js";
export { FeedResponse } from "./FeedResponse.js";
export type { RequestContext } from "./RequestContext.js";
export { TimeoutError } from "./TimeoutError.js";
export type * from "./globalStatistics.js";

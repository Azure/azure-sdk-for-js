// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export { LogsQueryClient } from "./logsQueryClient.js";
export {
  type QueryBody,
  type Table,
  type Column,
  type ColumnDataType,
  type ErrorInfo,
  type ErrorDetail,
  type ErrorResponse,
  type BatchRequest,
  type BatchQueryRequest,
  type LogsQueryBatchResult,
  type BatchQueryResponse,
  type BatchQueryResults,
  type QueryBatch,
  type QueryTimeInterval,
  Durations,
} from "./models/index.js";
export {
  type LogsQueryResult,
  LogsQueryResultStatus,
  type LogsTable,
  type LogsColumn,
  type LogsErrorInfo,
  type LogsQuerySuccessfulResult,
  type LogsQueryPartialResult,
  type LogsQueryError,
  KnownMonitorLogsQueryAudience,
} from "./models/public.js";
export type {
  LogsQueryClientOptions,
  LogsQueryBatchOptions,
  LogsQueryOptions,
  ExecuteWithResourceIdOptionalParams,
  ExecuteOptionalParams,
  QueryLogsOptions,
} from "./api/index.js";

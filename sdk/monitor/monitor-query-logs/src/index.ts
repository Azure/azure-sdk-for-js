// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export { LogsQueryClient } from "./logsQueryClient.js";
export {
  QueryBody,
  Table,
  Column,
  ColumnDataType,
  ErrorInfo,
  ErrorDetail,
  ErrorResponse,
  BatchRequest,
  BatchQueryRequest,
  LogsQueryBatchResult,
  BatchQueryResponse,
  BatchQueryResults,
  QueryBatch,
  QueryTimeInterval,
  Durations,
} from "./models/index.js";
export {
  LogsQueryResult,
  LogsQueryResultStatus,
  LogsTable,
  LogsColumn,
  LogsErrorInfo,
  LogsQuerySuccessfulResult,
  LogsQueryPartialResult,
  LogsQueryError,
  KnownMonitorLogsQueryAudience,
} from "./models/public.js";
export {
  LogsQueryClientOptions,
  LogsQueryBatchOptions,
  LogsQueryOptions,
  ExecuteWithResourceIdOptionalParams,
  ExecuteOptionalParams,
  QueryLogsOptions,
} from "./api/index.js";

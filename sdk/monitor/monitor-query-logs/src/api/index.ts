// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export {
  createMonitorQueryLogs,
  type MonitorQueryLogsContext,
  type LogsQueryClientOptions,
} from "./monitorQueryLogsContext.js";
export { batch, executeWithResourceId, execute } from "./operations.js";
export type {
  LogsQueryBatchOptions,
  LogsQueryOptions,
  ExecuteWithResourceIdOptionalParams,
  ExecuteOptionalParams,
  QueryLogsOptions,
} from "./options.js";

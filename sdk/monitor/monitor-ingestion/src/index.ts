// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export { LogsIngestionClient } from "./logsIngestionClient.js";
export {
  KnownVersions,
  KnownMonitorAudience,
  AggregateLogsUploadErrorName,
  isAggregateLogsUploadError,
  AggregateLogsUploadError,
  type LogsUploadFailure,
} from "./models/index.js";
export type { LogsIngestionClientOptions, LogsUploadOptions } from "./api/index.js";

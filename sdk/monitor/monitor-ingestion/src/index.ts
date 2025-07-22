// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export { LogsIngestionClient } from "./logsIngestionClient.js";
export {
  KnownVersions,
  KnownMonitorAudience,
  AggregateLogsUploadErrorName,
  isAggregateLogsUploadError,
  AggregateLogsUploadError,
  LogsUploadFailure,
} from "./models/index.js";
export { LogsIngestionClientOptions, LogsUploadOptions } from "./api/index.js";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

//
// Curated exports
//
export { LogsQueryClientOptions, LogsQueryClient } from "./logsQueryClient.js";
export {
  QueryBatch,
  LogsQueryBatchOptions,
  LogsQueryBatchResult,
  LogsQueryOptions,
  LogsQueryResult,
  LogsQueryError,
  LogsQueryPartialResult,
  LogsQuerySuccessfulResult,
  LogsTable,
  LogsColumn,
  LogsQueryResultStatus,
  LogsErrorInfo,
} from "./models/publicLogsModels.js";
export {
  MetricsQueryClient,
  MetricsQueryClientOptions as MetricsClientOptions,
} from "./metricsQueryClient.js";
export {
  ListMetricDefinitionsOptions,
  ListMetricNamespacesOptions,
  MetadataValue,
  Metric,
  MetricDefinition,
  MetricsQueryOptions,
  MetricsQueryResult,
  TimeSeriesElement,
  MetricNamespace,
  MetricAvailability,
} from "./models/publicMetricsModels.js";

export { Durations } from "./models/constants.js";
export { QueryTimeInterval } from "./models/timeInterval.js";
//
// LogsClient: generated exports
//

export {
  // TODO: these are the generated model names. We probably want to run them
  // through a manual review to make them consistent with style.
  LogsColumnType,
} from "./generated/logquery/src/index.js";

//
// MetricsClient: generated exports (from all three clients)
//
export {
  // TODO: these are the generated model names. We probably want to run them
  // through a manual review to make them consistent with style.
  MetricValue,
  ResultType,
  MetricUnit,
} from "./generated/metrics/src/index.js";

export { AggregationType, MetricClass } from "./generated/metricsdefinitions/src/index.js";
export { NamespaceClassification } from "./generated/metricsnamespaces/src/index.js";

export { MetricsQueryResourcesOptions } from "./models/publicBatchModels.js";
export { MetricsClient } from "./metricsClient.js";
export {
  KnownMonitorAudience,
  KnownMonitorLogsQueryAudience,
  KnownMonitorMetricsQueryAudience,
} from "./constants.js";

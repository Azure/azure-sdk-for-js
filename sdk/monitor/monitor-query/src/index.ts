// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

//
// Curated exports
//
export { LogsQueryClientOptions, LogsQueryClient } from "./logsQueryClient";
export {
  QueryBatch,
  LogsQueryBatchOptions,
  LogsQueryBatchResult,
  LogsQueryOptions,
  LogsQueryResult,
  // TODO: design issues around this still pending.
  // QueryStatistics,
  LogsTable,
  LogsColumn,
  LogsQueryResultStatus,
  ErrorInfo
} from "./models/publicLogsModels";
export {
  MetricsQueryClient,
  MetricsQueryClientOptions as MetricsClientOptions
} from "./metricsQueryClient";
export {
  ListMetricDefinitionsOptions,
  ListMetricNamespacesOptions,
  MetadataValue,
  Metric,
  MetricDefinition,
  MetricsQueryOptions,
  MetricsQueryResult,
  TimeSeriesElement,
  MetricNamespace
} from "./models/publicMetricsModels";

export { Durations } from "./models/constants";
export { TimeInterval } from "./models/timeInterval";
//
// LogsClient: generated exports
//

export {
  // TODO: these are the generated model names. We probably want to run them
  // through a manual review to make them consistent with style.
  LogsColumnType,
  ErrorDetail
} from "./generated/logquery/src";

//
// MetricsClient: generated exports (from all three clients)
//
export {
  // TODO: these are the generated model names. We probably want to run them
  // through a manual review to make them consistent with style.
  MetricValue,
  ResultType,
  MetricUnit
} from "./generated/metrics/src";

export {
  AggregationType,
  MetricAvailability,
  MetricClass
} from "./generated/metricsdefinitions/src";
export { NamespaceClassification } from "./generated/metricsnamespaces/src";

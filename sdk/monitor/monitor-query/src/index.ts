// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

//
// Curated exports
//
export { LogsQueryClientOptions, LogsQueryClient } from "./logsQueryClient";
export {
  BatchQuery,
  QueryLogsBatch,
  QueryLogsBatchOptions,
  QueryLogsBatchResponse,
  QueryLogsOptions,
  QueryLogsResult,
  QueryStatistics,
  Table
} from "./models/publicLogsModels";
export {
  MetricsQueryClient,
  MetricsQueryClientOptions as MetricsClientOptions
} from "./metricsQueryClient";
export {
  GetMetricDefinitionsOptions,
  GetMetricDefinitionsResponse,
  GetMetricNamespacesOptions,
  GetMetricNamespacesResponse,
  MetadataValue,
  Metric,
  MetricDefinition,
  QueryMetricsOptions,
  QueryMetricsResponse,
  TimeSeriesElement
} from "./models/publicMetricsModels";

export { Durations } from "./models/constants";

//
// LogsClient: generated exports
//

export {
  // TODO: these are the generated model names. We probably want to run them
  // through a manual review to make them consistent with style.
  Column as MetricColumn,
  ColumnDataType,
  ErrorDetail,
  ErrorInfo
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

export { AggregationType, MetricAvailability } from "./generated/metricsdefinitions/src";
export {
  MetricNamespace,
  MetricNamespaceName,
  NamespaceClassification
} from "./generated/metricsnamespaces/src";

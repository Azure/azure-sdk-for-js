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
  QueryStatistics
} from "./models/publicLogsModels";
export { MetricsClient, MetricsClientOptions } from "./metricsClient";
export {
  GetMetricDefinitionsOptions,
  GetMetricDefinitionsResponse,
  GetMetricNamespacesOptions,
  GetMetricNamespacesResponse,
  Metric,
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
  ErrorInfo,
  QueryResults,
  Table
} from "./generated/logquery/src";

//
// MetricsClient: generated exports (from all three clients)
//
export {
  // TODO: these are the generated model names. We probably want to run them
  // through a manual review to make them consistent with style.
  LocalizableString,
  MetadataValue,
  MetricValue,
  ResultType,
  MetricUnit
} from "./generated/metrics/src";

export {
  AggregationType,
  MetricAvailability,
  MetricDefinition
} from "./generated/metricsdefinitions/src";
export {
  MetricNamespace,
  MetricNamespaceName,
  NamespaceClassification
} from "./generated/metricsnamespaces/src";

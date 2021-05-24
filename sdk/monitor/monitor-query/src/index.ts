// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

//
// Curated exports
//
export { LogsClientOptions, LogsClient } from "./logsClient";
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

export { CommonDurations } from "./models/constants";

//
// LogsClient: generated exports
//

export {
  // TODO: these are the generated model names. We probably want to run them
  // through a manual review to make them consistent with style.
  BatchResponse,
  BatchResponseError,
  BatchResponseErrorInnerError,
  Column as MetricColumn,
  ErrorDetails,
  LogQueryResponse,
  QueryGetResponse,
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
  Unit
} from "./generated/metrics/src";

export {
  AggregationType,
  MetricAvailability,
  MetricDefinition
} from "./generated/metricsdefinitions/src";
export { MetricNamespace, MetricNamespaceName } from "./generated/metricsnamespaces/src";

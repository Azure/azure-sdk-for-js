// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

//
// Curated exports
//
export { LogsClientOptions, LogsClient } from "./logsClient";
export {
  QueryLogsBatchOptions,
  QueryLogsOptions,
  QueryStatistics,
  QueryLogsResult
} from "./models/logsModels";
export { MetricsClient } from "./metricsClient";
export {
  GetMetricDefinitionsOptions,
  QueryMetricsOptions,
  GetMetricNamespaces
} from "./models/metricsModels";

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
  BatchRequest,
  Column as MetricColumn,
  ErrorDetails,
  LogQueryResponse,
  LogQueryRequest,
  QueryBatchResponse,
  QueryBody,
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
  Metric,
  MetricValue,
  MetricsListResponse,
  MetricsListOptionalParams,
  Response,
  ResultType,
  TimeSeriesElement,
  Unit
} from "./generated/metrics/src";

export {
  AggregationType,
  MetricAvailability,
  MetricDefinition,
  MetricDefinitionCollection,
  MetricDefinitionsListOptionalParams,
  MetricDefinitionsListResponse
} from "./generated/metricsdefinitions/src";
export {
  MetricNamespace,
  MetricNamespaceCollection,
  MetricNamespaceName,
  MetricNamespacesListOptionalParams,
  MetricNamespacesListResponse
} from "./generated/metricsnamespaces/src";

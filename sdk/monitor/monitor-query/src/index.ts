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
  // common day increments
  last7Days,
  last3Days,
  last2Days,
  lastDay,
  // common hour increments
  lastHour,
  last4Hours,
  last24Hours,
  last48Hours,
  // common minute increments
  last30Minutes,
  last5Minutes
} from "./models/constants";

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

export { MetricDefinitionsListOptionalParams } from "./generated/metricsdefinitions/src";
export {
  // TODO: is this type needed? It literally only contains an array. Will it ever have additional attributes?
  MetricNamespace,
  MetricNamespaceCollection,
  MetricNamespacesListOptionalParams,
  MetricNamespacesListResponse
} from "./generated/metricsnamespaces/src";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export { MetricsClient } from "./publicMetricsClient.js";
export {
  MetricsQueryResourcesOptions,
  MetricsQueryResult,
  QueryTimeInterval,
  Durations,
  KnownMonitorMetricsQueryAudience,
  MetricsClientOptions,
} from "./models.js";
export {
  ResourceIdList,
  MetricResultsResponse,
  MetricResultsResponseValuesItem,
  Metric,
  LocalizableString,
  MetricUnit,
  TimeSeriesElement,
  MetadataValue,
  MetricValue,
  ErrorResponse,
  ErrorDetail,
  ErrorAdditionalInfo,
  KnownVersions,
} from "./models/index.js";
export { MetricsClientOptionalParams, QueryResourcesOptionalParams } from "./api/index.js";

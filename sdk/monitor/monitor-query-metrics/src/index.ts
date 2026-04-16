// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export { MetricsClient } from "./metricsClient.js";
export {
  type MetricsQueryResourcesOptions,
  type MetricsQueryResult,
  type QueryTimeInterval,
  Durations,
  KnownMonitorMetricsQueryAudience,
  type MetricsClientOptions,
} from "./models.js";
export {
  type ResourceIdList,
  type MetricResultsResponse,
  type MetricResultsResponseValuesItem,
  type Metric,
  type MetricUnit,
  type TimeSeriesElement,
  type MetadataValue,
  type MetricValue,
  type ErrorResponse,
  type ErrorDetail,
  type ErrorAdditionalInfo,
  KnownVersions,
} from "./models/index.js";
export type { MetricsClientOptionalParams } from "./api/index.js";

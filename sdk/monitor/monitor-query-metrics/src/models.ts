// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MetricsClientOptionalParams } from "./internalMetricsClient.js";
import type { Metric } from "./models/models.js";

/**
 * Known values for Monitor Audience
 */
export enum KnownMonitorMetricsQueryAudience {
  /**
   * Audience for Azure China
   */
  AzureChina = "https://management.chinacloudapi.cn",
  /**
   * Audience for Azure Government
   */
  AzureGovernment = "https://management.usgovcloudapi.net",
  /**
   * Audience for Azure Public
   */
  AzurePublicCloud = "https://management.azure.com",
}

/**
 * Options for configuring the MetricsClient.
 */
export interface MetricsClientOptions extends MetricsClientOptionalParams {
  /**
   * The Audience to use for authentication with Microsoft Entra ID. The
   * audience is not considered when using a shared key.
   * {@link KnownMonitorMetricsQueryAudience} can be used interchangeably with audience
   */
  audience?: string;
  /**
   * The endpoint to use when communicating with the service.
   */
  endpoint?: string;
}

// MetricsQueryResourcesOptions is equivalent to Omit<QueryResourcesOptionalParams, "startTime" | "endTime"> {
//   endTime?: Date;
//   startTime?: Date;
// }
/**
 * Options for querying metrics for multiple resources.
 */
export interface MetricsQueryResourcesOptions {
  /**
   * The start time of the query.
   */
  startTime?: Date;
  /** The end time of the query. */
  endTime?: Date;
  /**
   * The interval (i.e. timegrain) of the query in ISO 8601 duration format.
   * Defaults to PT1M. Special case for 'FULL' value that returns single datapoint
   * for entire time span requested.
   * *Examples: PT15M, PT1H, P1D, FULL*
   *
   * {@link Durations}
   */
  interval?: string;
  /** The list of aggregation types (comma separated) to retrieve. *Examples: average, minimum, maximum* */
  aggregation?: string;
  /**
   * The maximum number of records to retrieve per resource ID in the request.
   * Valid only if filter is specified.
   * Defaults to 10.
   */
  top?: number;
  /**
   * The aggregation to use for sorting results and the direction of the sort.
   * Only one order can be specified.
   * *Examples: sum asc*
   */
  orderBy?: string;
  /**
   * The filter is used to reduce the set of metric data
   * returned.<br>Example:<br>Metric contains metadata A, B and C.<br>- Return all
   * time series of C where A = a1 and B = b1 or b2<br>**filter=A eq ‘a1’ and B eq
   * ‘b1’ or B eq ‘b2’ and C eq ‘*’**<br>- Invalid variant:<br>**filter=A eq ‘a1’
   * and B eq ‘b1’ and C eq ‘*’ or B = ‘b2’**<br>This is invalid because the logical
   * or operator cannot separate two different metadata names.<br>- Return all time
   * series where A = a1, B = b1 and C = c1:<br>**filter=A eq ‘a1’ and B eq ‘b1’ and
   * C eq ‘c1’**<br>- Return all time series where A = a1<br>**filter=A eq ‘a1’ and
   * B eq ‘*’ and C eq ‘*’**.
   */
  filter?: string;
  /**
   * Dimension name(s) to rollup results by. For example if you only want to see
   * metric values with a filter like 'City eq Seattle or City eq Tacoma' but don't
   * want to see separate values for each city, you can specify 'RollUpBy=City' to
   * see the results for Seattle and Tacoma rolled up into one timeseries.
   */
  rollUpBy?: string;
}

/**
 * Query time interval type that supports multiple formats.
 */
export type QueryTimeInterval =
  | { startTime: Date; endTime: Date }
  | { startTime: Date; duration: string }
  | { duration: string; endTime: Date }
  | { duration: string };

/**
 * Result of a metrics query for a single resource.
 */
export interface MetricsQueryResult {
  /**
   * The cost associated with the query.
   */
  cost?: number;
  /**
   * The interval (window size) for which the metric data was returned.
   */
  granularity?: string;
  /**
   * The metrics data.
   */
  metrics: Metric[];
  /**
   * The namespace of the metrics been queried.
   */
  namespace?: string;
  /**
   * The resource that has been queried for metrics.
   */
  resourceId?: string;
  /**
   * The region of the resource been queried for metrics.
   */
  resourceRegion?: string;
  /**
   * The timespan for the query.
   */
  timespan: QueryTimeInterval;
  /**
   * Helper method to get a metric by name.
   * @param metricName - The name of the metric to retrieve.
   * @returns The metric if found, undefined otherwise.
   */
  getMetricByName(metricName: string): Metric | undefined;
}

/**
 * Aliases for some common ISO8601 durations.
 */
export const Durations = {
  /** Alias for ISO8601 value 'P7D' */
  sevenDays: "P7D",
  /** Alias for ISO8601 value 'P3D' */
  threeDays: "P3D",
  /** Alias for ISO8601 value 'P2D' */
  twoDays: "P2D",
  /** Alias for ISO8601 value 'P1D' */
  oneDay: "P1D",
  /** Alias for ISO8601 value 'PT1H' */
  oneHour: "PT1H",
  /** Alias for ISO8601 value 'PT4H' */
  fourHours: "PT4H",
  /** Alias for ISO8601 value 'PT24H' */
  twentyFourHours: "PT24H",
  /** Alias for ISO8601 value 'PT48H' */
  fortyEightHours: "PT48H",
  /** Alias for ISO8601 value 'PT30M' */
  thirtyMinutes: "PT30M",
  /** Alias for ISO8601 value 'PT5M' */
  fiveMinutes: "PT5M",
} as const;

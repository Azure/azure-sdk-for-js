// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TimeSeriesElement } from "./publicMetricsModels";
import { MetricUnit } from "../generated/metrics/src";
import { LocalizableString } from "../generated/metricBatch/src";
import * as coreClient from "@azure/core-client";

/**
 * Metric Results Response Values Item
 */
export interface MetricResultsResponseValuesItem {
  /** The start time, in datetime format, for which the data was retrieved. */
  startTime: string;
  /** The end time, in datetime format, for which the data was retrieved. */
  endTime: string;
  /** The interval (window size) for which the metric data was returned in. Follows the IS8601/RFC3339 duration format (e.g. 'P1D' for 1 day). This may be adjusted in the future and returned back from what was originally requested.  This is not present if a metadata request was made. */
  interval?: string;
  /** The namespace of the metrics been queried */
  namespace?: string;
  /** The region of the resource been queried for metrics. */
  resourceRegion?: string;
  /** The resource that has been queried for metrics. */
  resourceId?: string;
  /** The value of the collection. */
  value: Metric[];
}

/** The result data of a query. */
export interface Metric {
  /** The metric Id. */
  id: string;
  /** The name and the display name of the metric, i.e. it is localizable string. */
  name: LocalizableString;
  /** Description of this metric */
  displayDescription: string;
  /** The resource type of the metric resource. */
  type: string;
  /** The unit of the metric. */
  unit: MetricUnit;
  /** The time series returned when a data query is performed. */
  timeseries: TimeSeriesElement[];
  /** 'Success' or the error details on query failures for this metric. */
  errorCode?: string;
  /** Error message encountered querying this specific metric. */
  errorMessage?: string;
}

/** Optional parameters. */
export interface MetricsBatchOptionalParams extends coreClient.OperationOptions {
  /**
   * The start time of the query. It is a string in the format 'yyyy-MM-ddTHH:mm:ss.fffZ'. If you have specified the endTime parameter, then this parameter is required.
   * If only startTime is specified, then endTime defaults to the current time.
   * If no time interval is specified, the default is 1 hour.
   */
  startTime?: Date;
  /** The end time of the query. It is a string in the format 'yyyy-MM-ddTHH:mm:ss.fffZ'. */
  endTime?: Date;
  /**
   * The interval (i.e. timegrain) of the query.
   * *Examples: PT15M, PT1H, P1D*
   */
  interval?: string;
  /**
   * The list of aggregation types (comma separated) to retrieve.
   * *Examples: average, minimum, maximum*
   */
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
  /** The filter is used to reduce the set of metric data returned.<br>Example:<br>Metric contains metadata A, B and C.<br>- Return all time series of C where A = a1 and B = b1 or b2<br>**filter=A eq ‘a1’ and B eq ‘b1’ or B eq ‘b2’ and C eq ‘*’**<br>- Invalid variant:<br>**filter=A eq ‘a1’ and B eq ‘b1’ and C eq ‘*’ or B = ‘b2’**<br>This is invalid because the logical or operator cannot separate two different metadata names.<br>- Return all time series where A = a1, B = b1 and C = c1:<br>**filter=A eq ‘a1’ and B eq ‘b1’ and C eq ‘c1’**<br>- Return all time series where A = a1<br>**filter=A eq ‘a1’ and B eq ‘*’ and C eq ‘*’**. */
  filter?: string;
}

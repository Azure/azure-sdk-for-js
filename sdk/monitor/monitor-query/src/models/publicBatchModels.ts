// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TimeSeriesElement } from "./publicMetricsModels";
import { MetricUnit } from "../generated/metrics/src";
import { LocalizableString } from "../generated/metricBatch/src";

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

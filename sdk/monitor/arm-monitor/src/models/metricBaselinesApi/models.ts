// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MicrosoftCommonErrorResponseError } from "../microsoft/common/models.js";
import { microsoftCommonErrorResponseErrorDeserializer } from "../microsoft/common/models.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** A list of metric baselines. */
export interface _MetricBaselinesApiMetricBaselinesResponse {
  /** The list of metric baselines. */
  value?: MetricBaselinesApiSingleMetricBaseline[];
  /** The URL to get the next set of results. */
  nextLink?: string;
}

export function _metricBaselinesApiMetricBaselinesResponseDeserializer(
  item: any,
): _MetricBaselinesApiMetricBaselinesResponse {
  return {
    value: !item["value"]
      ? item["value"]
      : metricBaselinesApiSingleMetricBaselineArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function metricBaselinesApiSingleMetricBaselineArrayDeserializer(
  result: Array<MetricBaselinesApiSingleMetricBaseline>,
): any[] {
  return result.map((item) => {
    return metricBaselinesApiSingleMetricBaselineDeserializer(item);
  });
}

/** The baseline results of a single metric. */
export interface MetricBaselinesApiSingleMetricBaseline {
  /** The metric baseline Id. */
  id: string;
  /** The resource type of the metric baseline resource. */
  type: string;
  /** The name of the metric for which the baselines were retrieved. */
  name: string;
  /** The timespan for which the data was retrieved. Its value consists of two datetimes concatenated, separated by '/'.  This may be adjusted in the future and returned back from what was originally requested. */
  timespan: string;
  /** The interval (window size) for which the metric data was returned in.  This may be adjusted in the future and returned back from what was originally requested.  This is not present if a metadata request was made. */
  interval: string;
  /** The namespace of the metrics been queried. */
  namespace?: string;
  /** The baseline for each time series that was queried. */
  baselines: MetricBaselinesApiTimeSeriesBaseline[];
}

export function metricBaselinesApiSingleMetricBaselineDeserializer(
  item: any,
): MetricBaselinesApiSingleMetricBaseline {
  return {
    id: item["id"],
    type: item["type"],
    name: item["name"],
    ..._singleMetricBaselinePropertiesDeserializer(item["properties"]),
  };
}

/** The response to a metric baselines query. */
export interface MetricBaselinesApiMetricBaselinesProperties {
  /** The timespan for which the data was retrieved. Its value consists of two datetimes concatenated, separated by '/'.  This may be adjusted in the future and returned back from what was originally requested. */
  timespan: string;
  /** The interval (window size) for which the metric data was returned in.  This may be adjusted in the future and returned back from what was originally requested.  This is not present if a metadata request was made. */
  interval: string;
  /** The namespace of the metrics been queried. */
  namespace?: string;
  /** The baseline for each time series that was queried. */
  baselines: MetricBaselinesApiTimeSeriesBaseline[];
}

export function metricBaselinesApiMetricBaselinesPropertiesDeserializer(
  item: any,
): MetricBaselinesApiMetricBaselinesProperties {
  return {
    timespan: item["timespan"],
    interval: item["interval"],
    namespace: item["namespace"],
    baselines: metricBaselinesApiTimeSeriesBaselineArrayDeserializer(item["baselines"]),
  };
}

export function metricBaselinesApiTimeSeriesBaselineArrayDeserializer(
  result: Array<MetricBaselinesApiTimeSeriesBaseline>,
): any[] {
  return result.map((item) => {
    return metricBaselinesApiTimeSeriesBaselineDeserializer(item);
  });
}

/** The baseline values for a single time series. */
export interface MetricBaselinesApiTimeSeriesBaseline {
  /** The aggregation type of the metric. */
  aggregation: string;
  /** The dimensions of this time series. */
  dimensions?: MetricBaselinesApiMetricSingleDimension[];
  /** The list of timestamps of the baselines. */
  timestamps: Date[];
  /** The baseline values for each sensitivity. */
  data: MetricBaselinesApiSingleBaseline[];
  /** The baseline metadata values. */
  metadataValues?: MetricBaselinesApiBaselineMetadata[];
}

export function metricBaselinesApiTimeSeriesBaselineDeserializer(
  item: any,
): MetricBaselinesApiTimeSeriesBaseline {
  return {
    aggregation: item["aggregation"],
    dimensions: !item["dimensions"]
      ? item["dimensions"]
      : metricBaselinesApiMetricSingleDimensionArrayDeserializer(item["dimensions"]),
    timestamps: item["timestamps"].map((p: any) => {
      return new Date(p);
    }),
    data: metricBaselinesApiSingleBaselineArrayDeserializer(item["data"]),
    metadataValues: !item["metadataValues"]
      ? item["metadataValues"]
      : metricBaselinesApiBaselineMetadataArrayDeserializer(item["metadataValues"]),
  };
}

export function metricBaselinesApiMetricSingleDimensionArrayDeserializer(
  result: Array<MetricBaselinesApiMetricSingleDimension>,
): any[] {
  return result.map((item) => {
    return metricBaselinesApiMetricSingleDimensionDeserializer(item);
  });
}

/** The metric dimension name and value. */
export interface MetricBaselinesApiMetricSingleDimension {
  /** Name of the dimension. */
  name: string;
  /** Value of the dimension. */
  value: string;
}

export function metricBaselinesApiMetricSingleDimensionDeserializer(
  item: any,
): MetricBaselinesApiMetricSingleDimension {
  return {
    name: item["name"],
    value: item["value"],
  };
}

export function metricBaselinesApiSingleBaselineArrayDeserializer(
  result: Array<MetricBaselinesApiSingleBaseline>,
): any[] {
  return result.map((item) => {
    return metricBaselinesApiSingleBaselineDeserializer(item);
  });
}

/** The baseline values for a single sensitivity value. */
export interface MetricBaselinesApiSingleBaseline {
  /** the sensitivity of the baseline. */
  sensitivity: MetricBaselinesApiBaselineSensitivity;
  /** The low thresholds of the baseline. */
  lowThresholds: number[];
  /** The high thresholds of the baseline. */
  highThresholds: number[];
}

export function metricBaselinesApiSingleBaselineDeserializer(
  item: any,
): MetricBaselinesApiSingleBaseline {
  return {
    sensitivity: item["sensitivity"],
    lowThresholds: item["lowThresholds"].map((p: any) => {
      return p;
    }),
    highThresholds: item["highThresholds"].map((p: any) => {
      return p;
    }),
  };
}

/** the sensitivity of the baseline. */
export enum KnownMetricBaselinesApiBaselineSensitivity {
  /** Low */
  Low = "Low",
  /** Medium */
  Medium = "Medium",
  /** High */
  High = "High",
}

/**
 * the sensitivity of the baseline. \
 * {@link KnownMetricBaselinesApiBaselineSensitivity} can be used interchangeably with MetricBaselinesApiBaselineSensitivity,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Low**: Low \
 * **Medium**: Medium \
 * **High**: High
 */
export type MetricBaselinesApiBaselineSensitivity = string;

export function metricBaselinesApiBaselineMetadataArrayDeserializer(
  result: Array<MetricBaselinesApiBaselineMetadata>,
): any[] {
  return result.map((item) => {
    return metricBaselinesApiBaselineMetadataDeserializer(item);
  });
}

/** Represents a baseline metadata value. */
export interface MetricBaselinesApiBaselineMetadata {
  /** Name of the baseline metadata. */
  name: string;
  /** Value of the baseline metadata. */
  value: string;
}

export function metricBaselinesApiBaselineMetadataDeserializer(
  item: any,
): MetricBaselinesApiBaselineMetadata {
  return {
    name: item["name"],
    value: item["value"],
  };
}

/** Describes the format of Error response. */
export interface MetricBaselinesApiMetricBaselinesErrorResponse {
  error?: MicrosoftCommonErrorResponseError;
}

export function metricBaselinesApiMetricBaselinesErrorResponseDeserializer(
  item: any,
): MetricBaselinesApiMetricBaselinesErrorResponse {
  return {
    error: !item["error"]
      ? item["error"]
      : microsoftCommonErrorResponseErrorDeserializer(item["error"]),
  };
}

export function _singleMetricBaselinePropertiesDeserializer(item: any) {
  return {
    timespan: item["timespan"],
    interval: item["interval"],
    namespace: item["namespace"],
    baselines: metricBaselinesApiTimeSeriesBaselineArrayDeserializer(item["baselines"]),
  };
}

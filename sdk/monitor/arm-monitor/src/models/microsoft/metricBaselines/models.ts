// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** A list of metric baselines. */
export interface _MicrosoftMetricBaselinesMetricBaselinesResponse {
  /** The list of metric baselines. */
  value?: MicrosoftMetricBaselinesSingleMetricBaseline[];
  /** The URL to get the next set of results. */
  nextLink?: string;
}

export function _microsoftMetricBaselinesMetricBaselinesResponseDeserializer(
  item: any,
): _MicrosoftMetricBaselinesMetricBaselinesResponse {
  return {
    value: !item["value"]
      ? item["value"]
      : microsoftMetricBaselinesSingleMetricBaselineArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function microsoftMetricBaselinesSingleMetricBaselineArrayDeserializer(
  result: Array<MicrosoftMetricBaselinesSingleMetricBaseline>,
): any[] {
  return result.map((item) => {
    return microsoftMetricBaselinesSingleMetricBaselineDeserializer(item);
  });
}

/** The baseline results of a single metric. */
export interface MicrosoftMetricBaselinesSingleMetricBaseline {
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
  baselines: MicrosoftMetricBaselinesTimeSeriesBaseline[];
}

export function microsoftMetricBaselinesSingleMetricBaselineDeserializer(
  item: any,
): MicrosoftMetricBaselinesSingleMetricBaseline {
  return {
    id: item["id"],
    type: item["type"],
    name: item["name"],
    ..._singleMetricBaselinePropertiesDeserializer(item["properties"]),
  };
}

/** The response to a metric baselines query. */
export interface MicrosoftMetricBaselinesMetricBaselinesProperties {
  /** The timespan for which the data was retrieved. Its value consists of two datetimes concatenated, separated by '/'.  This may be adjusted in the future and returned back from what was originally requested. */
  timespan: string;
  /** The interval (window size) for which the metric data was returned in.  This may be adjusted in the future and returned back from what was originally requested.  This is not present if a metadata request was made. */
  interval: string;
  /** The namespace of the metrics been queried. */
  namespace?: string;
  /** The baseline for each time series that was queried. */
  baselines: MicrosoftMetricBaselinesTimeSeriesBaseline[];
}

export function microsoftMetricBaselinesMetricBaselinesPropertiesDeserializer(
  item: any,
): MicrosoftMetricBaselinesMetricBaselinesProperties {
  return {
    timespan: item["timespan"],
    interval: item["interval"],
    namespace: item["namespace"],
    baselines: microsoftMetricBaselinesTimeSeriesBaselineArrayDeserializer(item["baselines"]),
  };
}

export function microsoftMetricBaselinesTimeSeriesBaselineArrayDeserializer(
  result: Array<MicrosoftMetricBaselinesTimeSeriesBaseline>,
): any[] {
  return result.map((item) => {
    return microsoftMetricBaselinesTimeSeriesBaselineDeserializer(item);
  });
}

/** The baseline values for a single time series. */
export interface MicrosoftMetricBaselinesTimeSeriesBaseline {
  /** The aggregation type of the metric. */
  aggregation: string;
  /** The dimensions of this time series. */
  dimensions?: MicrosoftMetricBaselinesMetricSingleDimension[];
  /** The list of timestamps of the baselines. */
  timestamps: Date[];
  /** The baseline values for each sensitivity. */
  data: MicrosoftMetricBaselinesSingleBaseline[];
  /** The baseline metadata values. */
  metadataValues?: MicrosoftMetricBaselinesBaselineMetadata[];
}

export function microsoftMetricBaselinesTimeSeriesBaselineDeserializer(
  item: any,
): MicrosoftMetricBaselinesTimeSeriesBaseline {
  return {
    aggregation: item["aggregation"],
    dimensions: !item["dimensions"]
      ? item["dimensions"]
      : microsoftMetricBaselinesMetricSingleDimensionArrayDeserializer(item["dimensions"]),
    timestamps: item["timestamps"].map((p: any) => {
      return new Date(p);
    }),
    data: microsoftMetricBaselinesSingleBaselineArrayDeserializer(item["data"]),
    metadataValues: !item["metadataValues"]
      ? item["metadataValues"]
      : microsoftMetricBaselinesBaselineMetadataArrayDeserializer(item["metadataValues"]),
  };
}

export function microsoftMetricBaselinesMetricSingleDimensionArrayDeserializer(
  result: Array<MicrosoftMetricBaselinesMetricSingleDimension>,
): any[] {
  return result.map((item) => {
    return microsoftMetricBaselinesMetricSingleDimensionDeserializer(item);
  });
}

/** The metric dimension name and value. */
export interface MicrosoftMetricBaselinesMetricSingleDimension {
  /** Name of the dimension. */
  name: string;
  /** Value of the dimension. */
  value: string;
}

export function microsoftMetricBaselinesMetricSingleDimensionDeserializer(
  item: any,
): MicrosoftMetricBaselinesMetricSingleDimension {
  return {
    name: item["name"],
    value: item["value"],
  };
}

export function microsoftMetricBaselinesSingleBaselineArrayDeserializer(
  result: Array<MicrosoftMetricBaselinesSingleBaseline>,
): any[] {
  return result.map((item) => {
    return microsoftMetricBaselinesSingleBaselineDeserializer(item);
  });
}

/** The baseline values for a single sensitivity value. */
export interface MicrosoftMetricBaselinesSingleBaseline {
  /** the sensitivity of the baseline. */
  sensitivity: MicrosoftMetricBaselinesBaselineSensitivity;
  /** The low thresholds of the baseline. */
  lowThresholds: number[];
  /** The high thresholds of the baseline. */
  highThresholds: number[];
}

export function microsoftMetricBaselinesSingleBaselineDeserializer(
  item: any,
): MicrosoftMetricBaselinesSingleBaseline {
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
export enum KnownMicrosoftMetricBaselinesBaselineSensitivity {
  /** Low */
  Low = "Low",
  /** Medium */
  Medium = "Medium",
  /** High */
  High = "High",
}

/**
 * the sensitivity of the baseline. \
 * {@link KnownMicrosoftMetricBaselinesBaselineSensitivity} can be used interchangeably with MicrosoftMetricBaselinesBaselineSensitivity,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Low**: Low \
 * **Medium**: Medium \
 * **High**: High
 */
export type MicrosoftMetricBaselinesBaselineSensitivity = string;

export function microsoftMetricBaselinesBaselineMetadataArrayDeserializer(
  result: Array<MicrosoftMetricBaselinesBaselineMetadata>,
): any[] {
  return result.map((item) => {
    return microsoftMetricBaselinesBaselineMetadataDeserializer(item);
  });
}

/** Represents a baseline metadata value. */
export interface MicrosoftMetricBaselinesBaselineMetadata {
  /** Name of the baseline metadata. */
  name: string;
  /** Value of the baseline metadata. */
  value: string;
}

export function microsoftMetricBaselinesBaselineMetadataDeserializer(
  item: any,
): MicrosoftMetricBaselinesBaselineMetadata {
  return {
    name: item["name"],
    value: item["value"],
  };
}

/** Describes the format of Error response. */
export interface MicrosoftMetricBaselinesErrorResponse {
  error?: MicrosoftMetricBaselinesErrorResponseError;
}

export function microsoftMetricBaselinesErrorResponseDeserializer(
  item: any,
): MicrosoftMetricBaselinesErrorResponse {
  return {
    error: !item["error"]
      ? item["error"]
      : microsoftMetricBaselinesErrorResponseErrorDeserializer(item["error"]),
  };
}

/** model interface MicrosoftMetricBaselinesErrorResponseError */
export interface MicrosoftMetricBaselinesErrorResponseError {
  /** Unlocalized string which can be used to programmatically identify the error. */
  code?: string;
  /** Describes the error in detail and provides debugging information. If Accept-Language is set in the request, it must be localized to that language. */
  message?: string;
  /** The target of the particular error (for example, the name of the property in error). */
  target?: string;
  /** An array of additional nested error response info objects, as described by this contract. */
  details?: MicrosoftMetricBaselinesErrorDetail[];
  /** An array of objects with 'type' and 'info' properties. The schema of 'info' is service-specific and dependent on the 'type' string. */
  additionalInfo?: MicrosoftMetricBaselinesErrorResponseErrorAdditionalInfoItem[];
}

export function microsoftMetricBaselinesErrorResponseErrorDeserializer(
  item: any,
): MicrosoftMetricBaselinesErrorResponseError {
  return {
    code: item["code"],
    message: item["message"],
    target: item["target"],
    details: !item["details"]
      ? item["details"]
      : microsoftMetricBaselinesErrorDetailArrayDeserializer(item["details"]),
    additionalInfo: !item["additionalInfo"]
      ? item["additionalInfo"]
      : microsoftMetricBaselinesErrorResponseErrorAdditionalInfoItemArrayDeserializer(
          item["additionalInfo"],
        ),
  };
}

export function microsoftMetricBaselinesErrorDetailArrayDeserializer(
  result: Array<MicrosoftMetricBaselinesErrorDetail>,
): any[] {
  return result.map((item) => {
    return microsoftMetricBaselinesErrorDetailDeserializer(item);
  });
}

/** Describes details of an error response. */
export interface MicrosoftMetricBaselinesErrorDetail {
  /** Unlocalized string which can be used to programmatically identify the error. */
  code?: string;
  /** Describes the error in detail and provides debugging information. */
  message?: string;
  /** The target of the particular error (for example, the name of the property in error). */
  target?: string;
  /** An array of objects with 'type' and 'info' properties. The schema of 'info' is service-specific and dependent on the 'type' string. */
  additionalInfo?: MicrosoftMetricBaselinesErrorDetailAdditionalInfoItem[];
}

export function microsoftMetricBaselinesErrorDetailDeserializer(
  item: any,
): MicrosoftMetricBaselinesErrorDetail {
  return {
    code: item["code"],
    message: item["message"],
    target: item["target"],
    additionalInfo: !item["additionalInfo"]
      ? item["additionalInfo"]
      : microsoftMetricBaselinesErrorDetailAdditionalInfoItemArrayDeserializer(
          item["additionalInfo"],
        ),
  };
}

export function microsoftMetricBaselinesErrorDetailAdditionalInfoItemArrayDeserializer(
  result: Array<MicrosoftMetricBaselinesErrorDetailAdditionalInfoItem>,
): any[] {
  return result.map((item) => {
    return microsoftMetricBaselinesErrorDetailAdditionalInfoItemDeserializer(item);
  });
}

/** model interface MicrosoftMetricBaselinesErrorDetailAdditionalInfoItem */
export interface MicrosoftMetricBaselinesErrorDetailAdditionalInfoItem {
  /** The type of additional information. */
  type?: string;
  /** The additional information specific to the type. */
  info?: Record<string, any>;
}

export function microsoftMetricBaselinesErrorDetailAdditionalInfoItemDeserializer(
  item: any,
): MicrosoftMetricBaselinesErrorDetailAdditionalInfoItem {
  return {
    type: item["type"],
    info: !item["info"]
      ? item["info"]
      : Object.fromEntries(Object.entries(item["info"]).map(([k, p]: [string, any]) => [k, p])),
  };
}

export function microsoftMetricBaselinesErrorResponseErrorAdditionalInfoItemArrayDeserializer(
  result: Array<MicrosoftMetricBaselinesErrorResponseErrorAdditionalInfoItem>,
): any[] {
  return result.map((item) => {
    return microsoftMetricBaselinesErrorResponseErrorAdditionalInfoItemDeserializer(item);
  });
}

/** model interface MicrosoftMetricBaselinesErrorResponseErrorAdditionalInfoItem */
export interface MicrosoftMetricBaselinesErrorResponseErrorAdditionalInfoItem {
  /** The type of additional information. */
  type?: string;
  /** The additional information specific to the type. */
  info?: Record<string, any>;
}

export function microsoftMetricBaselinesErrorResponseErrorAdditionalInfoItemDeserializer(
  item: any,
): MicrosoftMetricBaselinesErrorResponseErrorAdditionalInfoItem {
  return {
    type: item["type"],
    info: !item["info"]
      ? item["info"]
      : Object.fromEntries(Object.entries(item["info"]).map(([k, p]: [string, any]) => [k, p])),
  };
}

/** Type of MicrosoftMetricBaselinesResultType */
export type MicrosoftMetricBaselinesResultType = "Data" | "Metadata";

export function _singleMetricBaselinePropertiesDeserializer(item: any) {
  return {
    timespan: item["timespan"],
    interval: item["interval"],
    namespace: item["namespace"],
    baselines: microsoftMetricBaselinesTimeSeriesBaselineArrayDeserializer(item["baselines"]),
  };
}

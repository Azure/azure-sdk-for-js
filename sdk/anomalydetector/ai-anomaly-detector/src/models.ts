// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PipelineOptions } from "@azure/core-http";
import { TimeSeriesPoint } from "./generated";

/**
 * Client options used to configure Form Recognizer API requests.
 */
export interface AnomalyDetectorClientOptions extends PipelineOptions {}

export enum TimeGranularity {
  /**
   * Yearly time granularity
   */
  yearly = "yearly",
  /**
   * Monthly time granularity
   */
  monthly = "monthly",
  /**
   * Weekly time granularity
   */
  weekly = "weekly",
  /**
   * Daily time granularity
   */
  daily = "daily",
  /**
   * Hourly time granularity
   */
  hourly = "hourly",
  /**
   * Per minute time granularity
   */
  perMinute = "minutely",
  /**
   * Per second time granularity
   */
  perSecond = "secondly"
}

export interface DetectRequest {
  /**
   * Time series data points. Points should be sorted by timestamp in ascending order to match the anomaly detection result. If the data is not sorted correctly or there is duplicated timestamp, the API will not work. In such case, an error message will be returned.
   */
  series: TimeSeriesPoint[];
  /**
   * Can only be one of yearly, monthly, weekly, daily, hourly, minutely or secondly. Granularity is used for verify whether input series is valid.
   */
  granularity: TimeGranularity;
  /**
   * Custom Interval is used to set non-standard time interval, for example, if the series is 5 minutes, request can be set as {"granularity":"minutely", "customInterval":5}.
   */
  customInterval?: number;
  /**
   * Optional argument, periodic value of a time series. If the value is null or does not present, the API will determine the period automatically.
   */
  period?: number;
  /**
   * Optional argument, advanced model parameter, max anomaly ratio in a time series.
   */
  maxAnomalyRatio?: number;
  /**
   * Optional argument, advanced model parameter, between 0-99, the lower the value is, the larger the margin value will be which means less anomalies will be accepted.
   */
  sensitivity?: number;
}

export interface DetectChangePointRequest {
  /**
   * Time series data points. Points should be sorted by timestamp in ascending order to match the change point detection result.
   */
  series: TimeSeriesPoint[];
  /**
   * Can only be one of yearly, monthly, weekly, daily, hourly, minutely or secondly. Granularity is used for verify whether input series is valid.
   */
  granularity: TimeGranularity;
  /**
   * Custom Interval is used to set non-standard time interval, for example, if the series is 5 minutes, request can be set as {"granularity":"minutely", "customInterval":5}.
   */
  customInterval?: number;
  /**
   * Optional argument, periodic value of a time series. If the value is null or does not present, the API will determine the period automatically.
   */
  period?: number;
  /**
   * Optional argument, advanced model parameter, a default stableTrendWindow will be used in detection.
   */
  stableTrendWindow?: number;
  /**
   * Optional argument, advanced model parameter, between 0.0-1.0, the lower the value is, the larger the trend error will be which means less change point will be accepted.
   */
  threshold?: number;
}

export {
  GeneratedClientDetectChangePointResponse as AnomalyDetectorClientDetectChangePointResponse,
  GeneratedClientDetectEntireSeriesResponse as AnomalyDetectorClientDetectEntireResponse,
  GeneratedClientDetectLastPointResponse as AnomalyDetectorClientDetectLastPointResponse,
  DetectLastPointResponse,
  DetectChangePointResponse,
  DetectEntireResponse,
  TimeSeriesPoint
} from "./generated/models";

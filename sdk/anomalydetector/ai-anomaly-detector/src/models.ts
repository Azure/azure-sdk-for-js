// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PipelineOptions } from "@azure/core-http";

/**
 * Client options used to configure Form Recognizer API requests.
 */
export interface AnomalyDetectorClientOptions extends PipelineOptions {}

export enum TimeGranularityEnum {
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

export {
  GeneratedClientDetectChangePointResponse as AnomalyDetectorClientChangePointDetectResponse,
  GeneratedClientDetectEntireSeriesResponse as AnomalyDetectorClientEntireDetectResponse,
  GeneratedClientDetectLastPointResponse as AnomalyDetectorClientLastDetectResponse,
  LastDetectResponse,
  ChangePointDetectResponse,
  TimeGranularity,
  DetectRequest,
  EntireDetectResponse,
  ChangePointDetectRequest,
  TimeSeriesPoint
} from "./generated/models";

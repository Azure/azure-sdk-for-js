// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PipelineOptions } from "@azure/core-http";

/**
 * Client options used to configure Form Recognizer API requests.
 */
export interface AnomalyDetectorClientOptions extends PipelineOptions {}

export enum KnownTimeGranularity {
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
  perSecond = "secondly",
  /**
   * Per microsecond time granularity
   */
  perMicrosecond = "microsecond",
  /**
   * None
   */
  none = "none"
}

export {
  DetectRequest,
  DetectChangePointRequest,
  GeneratedClientDetectChangePointResponse as AnomalyDetectorClientDetectChangePointResponse,
  GeneratedClientDetectEntireSeriesResponse as AnomalyDetectorClientDetectEntireResponse,
  GeneratedClientDetectLastPointResponse as AnomalyDetectorClientDetectLastPointResponse,
  DetectLastPointResponse,
  DetectChangePointResponse,
  DetectEntireResponse,
  TimeSeriesPoint,
  GeneratedClientTrainMultivariateModelResponse as AnomalyDetectorClientTrainMultivariateModelResponse,
  GeneratedClientGetMultivariateModelResponse as AnomalyDetectorClientGetMultivariateModelResponse,
  GeneratedClientDetectAnomalyResponse as AnomalyDetectorClientDetectAnomalyResponse,
  DetectionRequest,
  DetectionResult,
  DetectionResultSummary,
  DetectionStatus,
  AnomalyState,
  AnomalyValue,
  AnomalyContributor,
  GeneratedClientGetDetectionResultResponse as AnomalyDetectorClientGetDetectionResultResponse,
  GeneratedClientExportModelResponse as AnomalyDetectorClientExportModelResponse,
  GeneratedClientListMultivariateModelOptionalParams as ListMultivariateModelOptionalParams,
  GeneratedClientListMultivariateModelNextOptionalParams as ListMultivariateModelNextOptionalParams,
  GeneratedClientListMultivariateModelResponse as AnomalyDetectorClientListMultivariateModelResponse,
  GeneratedClientListMultivariateModelNextResponse as AnomalyDetectorClientListMultivariateModelNextResponse,
  Model as AnomalyDetectorClientModel,
  ModelInfo as AnomalyDetectorClientModelInfo,
  ModelList as AnomalyDetectorClientModelList,
  ModelSnapshot as AnomalyDetectorClientModelSnapshot,
  ModelStatus as AnomalyDetectorClientModelStatus,
  ModelState as AnomalyDetectorClientModelState,
  VariableState as AnomalyDetectorClientVariableState,
  ErrorResponse as AnomalyDetectorClientErrorResponse,
  AlignPolicy,
  AlignMode,
  DiagnosticsInfo,
  FillNAMethod,
  GeneratedClientDetectAnomalyHeaders as AnomalyDetectorClientDetectAnomalyHeaders,
  GeneratedClientExportModelHeaders as AnomalyDetectorClientExportModelHeaders,
  GeneratedClientTrainMultivariateModelHeaders as AnomalyDetectorClientTrainMultivariateModelHeaders,
  TimeGranularity
} from "./generated/models";

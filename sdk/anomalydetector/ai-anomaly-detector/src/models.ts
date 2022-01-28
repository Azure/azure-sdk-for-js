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
  none = "none",
}

export {
  DetectRequest,
  DetectChangePointRequest,
  AnomalyDetectorDetectChangePointResponse,
  AnomalyDetectorDetectEntireSeriesResponse,
  AnomalyDetectorDetectLastPointResponse,
  DetectLastPointResponse,
  DetectChangePointResponse,
  DetectEntireResponse,
  TimeSeriesPoint,
  AnomalyDetectorTrainMultivariateModelResponse,
  AnomalyDetectorGetMultivariateModelResponse,
  AnomalyDetectorDetectAnomalyResponse,
  DetectionRequest,
  DetectionResult,
  DetectionResultSummary,
  DetectionStatus,
  AnomalyState,
  AnomalyValue,
  AnomalyDetectorGetDetectionResultResponse,
  AnomalyDetectorExportModelResponse,
  AnomalyDetectorListMultivariateModelNextOptionalParams,
  AnomalyDetectorListMultivariateModelOptionalParams,
  AnomalyDetectorListMultivariateModelResponse,
  AnomalyDetectorListMultivariateModelNextResponse,
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
  AnomalyDetectorDetectAnomalyHeaders,
  AnomalyDetectorTrainMultivariateModelHeaders,
  TimeGranularity,
  AnomalyDetectorExportModelOptionalParams,
  AnomalyDetectorGetDetectionResultOptionalParams,
  AnomalyDetectorDetectAnomalyOptionalParams,
  AnomalyDetectorDeleteMultivariateModelOptionalParams,
  AnomalyDetectorGetMultivariateModelOptionalParams,
  AnomalyDetectorTrainMultivariateModelOptionalParams,
  AnomalyDetectorDetectChangePointOptionalParams,
  AnomalyDetectorDetectLastPointOptionalParams,
  AnomalyDetectorDetectEntireSeriesOptionalParams,
  AnomalyDetectorListMultivariateModelNextExceptionHeaders,
  AnomalyDetectorLastDetectAnomalyExceptionHeaders,
  AnomalyDetectorExportModelExceptionHeaders,
  AnomalyDetectorGetDetectionResultExceptionHeaders,
  AnomalyDetectorDetectAnomalyExceptionHeaders,
  AnomalyDetectorDeleteMultivariateModelExceptionHeaders,
  AnomalyDetectorGetMultivariateModelExceptionHeaders,
  AnomalyDetectorListMultivariateModelExceptionHeaders,
  AnomalyDetectorTrainMultivariateModelExceptionHeaders,
  AnomalyDetectorDetectChangePointExceptionHeaders,
  AnomalyDetectorDetectLastPointExceptionHeaders,
  ImputeMode,
  KnownImputeMode,
  AnomalyDetectorLastDetectAnomalyResponse,
  KnownFillNAMethod,
  AnomalyDetectorDetectEntireSeriesExceptionHeaders,
  LastDetectionResult,
  VariableValues,
  LastDetectionRequest,
  CorrelationChanges,
  AnomalyInterpretation,
  AnomalyDetectorLastDetectAnomalyOptionalParams,
} from "./generated/models";

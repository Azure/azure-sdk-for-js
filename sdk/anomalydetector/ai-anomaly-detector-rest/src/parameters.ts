// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RequestParameters } from "@azure-rest/core-client";
import {
  ChangePointDetectRequest,
  DetectRequest,
  DetectionRequest,
  LastDetectionRequest,
  ModelInfo,
} from "./models";

export interface DetectEntireSeriesBodyParam {
  /** Time series points and period if needed. Advanced model parameters can also be set in the request. */
  body: DetectRequest;
}

export interface DetectEntireSeriesMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type DetectEntireSeriesParameters = DetectEntireSeriesMediaTypesParam &
  DetectEntireSeriesBodyParam &
  RequestParameters;

export interface DetectLastPointBodyParam {
  /** Time series points and period if needed. Advanced model parameters can also be set in the request. */
  body: DetectRequest;
}

export interface DetectLastPointMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type DetectLastPointParameters = DetectLastPointMediaTypesParam &
  DetectLastPointBodyParam &
  RequestParameters;

export interface DetectChangePointBodyParam {
  /** Time series points and granularity is needed. Advanced model parameters can also be set in the request if needed. */
  body: ChangePointDetectRequest;
}

export interface DetectChangePointMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type DetectChangePointParameters = DetectChangePointMediaTypesParam &
  DetectChangePointBodyParam &
  RequestParameters;
export type GetBatchDetectionResultParameters = RequestParameters;

export interface CreateMultivariateModelBodyParam {
  /** Training request */
  body: ModelInfo;
}

export interface CreateMultivariateModelMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type CreateMultivariateModelParameters = CreateMultivariateModelMediaTypesParam &
  CreateMultivariateModelBodyParam &
  RequestParameters;

export interface ListMultivariateModelQueryParamProperties {
  /** Skip indicates how many models will be skipped. */
  skip?: number;
  /** Top indicates how many models will be fetched. */
  top?: number;
}

export interface ListMultivariateModelQueryParam {
  queryParameters?: ListMultivariateModelQueryParamProperties;
}

export type ListMultivariateModelParameters = ListMultivariateModelQueryParam & RequestParameters;
export type DeleteMultivariateModelParameters = RequestParameters;
export type GetMultivariateModelParameters = RequestParameters;

export interface BatchDetectAnomalyBodyParam {
  /** Detect anomaly request */
  body: DetectionRequest;
}

export interface BatchDetectAnomalyMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type BatchDetectAnomalyParameters = BatchDetectAnomalyMediaTypesParam &
  BatchDetectAnomalyBodyParam &
  RequestParameters;

export interface LastDetectAnomalyBodyParam {
  /** Request for last detection */
  body: LastDetectionRequest;
}

export interface LastDetectAnomalyMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type LastDetectAnomalyParameters = LastDetectAnomalyMediaTypesParam &
  LastDetectAnomalyBodyParam &
  RequestParameters;

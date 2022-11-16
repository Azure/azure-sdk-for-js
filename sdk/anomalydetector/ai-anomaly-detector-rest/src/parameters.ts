// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RequestParameters } from "@azure-rest/core-client";
import {
  DetectRequest,
  ChangePointDetectRequest,
  ModelInfo,
  DetectionRequest,
  LastDetectionRequest,
} from "./models";

export interface UnivariateDetectUnivariateEntireSeriesBodyParam {
  body: DetectRequest;
}

export type UnivariateDetectUnivariateEntireSeriesParameters = UnivariateDetectUnivariateEntireSeriesBodyParam &
  RequestParameters;

export interface UnivariateDetectUnivariateLastPointBodyParam {
  body: DetectRequest;
}

export type UnivariateDetectUnivariateLastPointParameters = UnivariateDetectUnivariateLastPointBodyParam &
  RequestParameters;

export interface UnivariateDetectUnivariateChangePointBodyParam {
  body: ChangePointDetectRequest;
}

export type UnivariateDetectUnivariateChangePointParameters = UnivariateDetectUnivariateChangePointBodyParam &
  RequestParameters;
export type MultivariateGetMultivariateBatchDetectionResultParameters = RequestParameters;

export interface MultivariateCreateAndTrainMultivariateModelBodyParam {
  body: ModelInfo;
}

export type MultivariateCreateAndTrainMultivariateModelParameters = MultivariateCreateAndTrainMultivariateModelBodyParam &
  RequestParameters;

export interface MultivariateListMultivariateModelsQueryParamProperties {
  /** Skip indicates how many models will be skipped. */
  skip?: number;
  /** Top indicates how many models will be fetched. */
  top?: number;
}

export interface MultivariateListMultivariateModelsQueryParam {
  queryParameters?: MultivariateListMultivariateModelsQueryParamProperties;
}

export type MultivariateListMultivariateModelsParameters = MultivariateListMultivariateModelsQueryParam &
  RequestParameters;
export type MultivariateDeleteMultivariateModelParameters = RequestParameters;
export type MultivariateGetMultivariateModelParameters = RequestParameters;

export interface MultivariateDetectMultivariateBatchAnomalyBodyParam {
  body: DetectionRequest;
}

export type MultivariateDetectMultivariateBatchAnomalyParameters = MultivariateDetectMultivariateBatchAnomalyBodyParam &
  RequestParameters;

export interface MultivariateDetectMultivariateLastAnomalyBodyParam {
  body: LastDetectionRequest;
}

export type MultivariateDetectMultivariateLastAnomalyParameters = MultivariateDetectMultivariateLastAnomalyBodyParam &
  RequestParameters;

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

export interface DetectUnivariateEntireSeriesBodyParam {
  body: DetectRequest;
}

export type DetectUnivariateEntireSeriesParameters =
  DetectUnivariateEntireSeriesBodyParam & RequestParameters;

export interface DetectUnivariateLastPointBodyParam {
  body: DetectRequest;
}

export type DetectUnivariateLastPointParameters =
  DetectUnivariateLastPointBodyParam & RequestParameters;

export interface DetectUnivariateChangePointBodyParam {
  body: ChangePointDetectRequest;
}

export type DetectUnivariateChangePointParameters =
  DetectUnivariateChangePointBodyParam & RequestParameters;
export type GetMultivariateBatchDetectionResultParameters = RequestParameters;

export interface CreateAndTrainMultivariateModelBodyParam {
  body: ModelInfo;
}

export type CreateAndTrainMultivariateModelParameters =
  CreateAndTrainMultivariateModelBodyParam & RequestParameters;

export interface ListMultivariateModelsQueryParamProperties {
  /** Skip indicates how many models will be skipped. */
  skip?: number;
  /** Top indicates how many models will be fetched. */
  top?: number;
}

export interface ListMultivariateModelsQueryParam {
  queryParameters?: ListMultivariateModelsQueryParamProperties;
}

export type ListMultivariateModelsParameters =
  ListMultivariateModelsQueryParam & RequestParameters;
export type DeleteMultivariateModelParameters = RequestParameters;
export type GetMultivariateModelParameters = RequestParameters;

export interface DetectMultivariateBatchAnomalyBodyParam {
  body: DetectionRequest;
}

export type DetectMultivariateBatchAnomalyParameters =
  DetectMultivariateBatchAnomalyBodyParam & RequestParameters;

export interface DetectMultivariateLastAnomalyBodyParam {
  body: LastDetectionRequest;
}

export type DetectMultivariateLastAnomalyParameters =
  DetectMultivariateLastAnomalyBodyParam & RequestParameters;

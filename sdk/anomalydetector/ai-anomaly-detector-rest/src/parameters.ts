// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RequestParameters } from "@azure-rest/core-client";
import {
  UnivariateDetectionOptions,
  UnivariateChangePointDetectionOptions,
  ModelInfo,
  MultivariateBatchDetectionOptions,
  MultivariateLastDetectionOptions,
} from "./models";

export interface DetectUnivariateEntireSeriesBodyParam {
  /** Method of univariate anomaly detection. */
  body: UnivariateDetectionOptions;
}

export type DetectUnivariateEntireSeriesParameters = DetectUnivariateEntireSeriesBodyParam &
  RequestParameters;

export interface DetectUnivariateLastPointBodyParam {
  /** Method of univariate anomaly detection. */
  body: UnivariateDetectionOptions;
}

export type DetectUnivariateLastPointParameters = DetectUnivariateLastPointBodyParam &
  RequestParameters;

export interface DetectUnivariateChangePointBodyParam {
  /** Method of univariate anomaly detection. */
  body: UnivariateChangePointDetectionOptions;
}

export type DetectUnivariateChangePointParameters = DetectUnivariateChangePointBodyParam &
  RequestParameters;
export type GetMultivariateBatchDetectionResultParameters = RequestParameters;

export interface TrainMultivariateModelBodyParam {
  /** Model information. */
  body: ModelInfo;
}

export type TrainMultivariateModelParameters = TrainMultivariateModelBodyParam & RequestParameters;

export interface ListMultivariateModelsQueryParamProperties {
  /** Skip indicates how many models will be skipped. */
  skip?: number;
  /** Top indicates how many models will be fetched. */
  top?: number;
}

export interface ListMultivariateModelsQueryParam {
  queryParameters?: ListMultivariateModelsQueryParamProperties;
}

export type ListMultivariateModelsParameters = ListMultivariateModelsQueryParam & RequestParameters;
export type DeleteMultivariateModelParameters = RequestParameters;
export type GetMultivariateModelParameters = RequestParameters;

export interface DetectMultivariateBatchAnomalyBodyParam {
  /** Request of multivariate anomaly detection. */
  body: MultivariateBatchDetectionOptions;
}

export type DetectMultivariateBatchAnomalyParameters = DetectMultivariateBatchAnomalyBodyParam &
  RequestParameters;

export interface DetectMultivariateLastAnomalyBodyParam {
  /** Request of last detection. */
  body: MultivariateLastDetectionOptions;
}

export type DetectMultivariateLastAnomalyParameters = DetectMultivariateLastAnomalyBodyParam &
  RequestParameters;

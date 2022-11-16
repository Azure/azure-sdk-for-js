// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  UnivariateDetectUnivariateEntireSeriesParameters,
  UnivariateDetectUnivariateLastPointParameters,
  UnivariateDetectUnivariateChangePointParameters,
  MultivariateGetMultivariateBatchDetectionResultParameters,
  MultivariateCreateAndTrainMultivariateModelParameters,
  MultivariateListMultivariateModelsParameters,
  MultivariateDeleteMultivariateModelParameters,
  MultivariateGetMultivariateModelParameters,
  MultivariateDetectMultivariateBatchAnomalyParameters,
  MultivariateDetectMultivariateLastAnomalyParameters,
} from "./parameters";
import {
  UnivariateDetectUnivariateEntireSeries200Response,
  UnivariateDetectUnivariateEntireSeriesDefaultResponse,
  UnivariateDetectUnivariateLastPoint200Response,
  UnivariateDetectUnivariateLastPointDefaultResponse,
  UnivariateDetectUnivariateChangePoint200Response,
  UnivariateDetectUnivariateChangePointDefaultResponse,
  MultivariateGetMultivariateBatchDetectionResult200Response,
  MultivariateGetMultivariateBatchDetectionResultDefaultResponse,
  MultivariateCreateAndTrainMultivariateModel201Response,
  MultivariateCreateAndTrainMultivariateModelDefaultResponse,
  MultivariateListMultivariateModels200Response,
  MultivariateListMultivariateModelsDefaultResponse,
  MultivariateDeleteMultivariateModel204Response,
  MultivariateDeleteMultivariateModelDefaultResponse,
  MultivariateGetMultivariateModel200Response,
  MultivariateGetMultivariateModelDefaultResponse,
  MultivariateDetectMultivariateBatchAnomaly202Response,
  MultivariateDetectMultivariateBatchAnomalyDefaultResponse,
  MultivariateDetectMultivariateLastAnomaly200Response,
  MultivariateDetectMultivariateLastAnomalyDefaultResponse,
} from "./responses";
import { Client, StreamableMethod } from "@azure-rest/core-client";

export interface UnivariateDetectUnivariateEntireSeries {
  /**
   * This operation generates a model with an entire series, each point is detected
   * with the same model. With this method, points before and after a certain point
   * are used to determine whether it is an anomaly. The entire detection can give
   * user an overall status of the time series.
   */
  post(
    options: UnivariateDetectUnivariateEntireSeriesParameters
  ): StreamableMethod<
    | UnivariateDetectUnivariateEntireSeries200Response
    | UnivariateDetectUnivariateEntireSeriesDefaultResponse
  >;
}

export interface UnivariateDetectUnivariateLastPoint {
  /**
   * This operation generates a model using the points that you sent into the API,
   * and based on all data to determine whether the last point is anomalous.
   */
  post(
    options: UnivariateDetectUnivariateLastPointParameters
  ): StreamableMethod<
    | UnivariateDetectUnivariateLastPoint200Response
    | UnivariateDetectUnivariateLastPointDefaultResponse
  >;
}

export interface UnivariateDetectUnivariateChangePoint {
  /** Evaluate change point score of every series point */
  post(
    options: UnivariateDetectUnivariateChangePointParameters
  ): StreamableMethod<
    | UnivariateDetectUnivariateChangePoint200Response
    | UnivariateDetectUnivariateChangePointDefaultResponse
  >;
}

export interface MultivariateGetMultivariateBatchDetectionResult {
  /**
   * For asynchronous inference, get multivariate anomaly detection result based on
   * resultId returned by the BatchDetectAnomaly api.
   */
  get(
    options?: MultivariateGetMultivariateBatchDetectionResultParameters
  ): StreamableMethod<
    | MultivariateGetMultivariateBatchDetectionResult200Response
    | MultivariateGetMultivariateBatchDetectionResultDefaultResponse
  >;
}

export interface MultivariateCreateAndTrainMultivariateModel {
  /**
   * Create and train a multivariate anomaly detection model. The request must
   * include a source parameter to indicate an externally accessible Azure blob
   * storage URI.There are two types of data input: An URI pointed to an Azure blob
   * storage folder which contains multiple CSV files, and each CSV file contains
   * two columns, timestamp and variable. Another type of input is an URI pointed to
   * a CSV file in Azure blob storage, which contains all the variables and a
   * timestamp column.
   */
  post(
    options: MultivariateCreateAndTrainMultivariateModelParameters
  ): StreamableMethod<
    | MultivariateCreateAndTrainMultivariateModel201Response
    | MultivariateCreateAndTrainMultivariateModelDefaultResponse
  >;
  /** List models of a resource. */
  get(
    options?: MultivariateListMultivariateModelsParameters
  ): StreamableMethod<
    | MultivariateListMultivariateModels200Response
    | MultivariateListMultivariateModelsDefaultResponse
  >;
}

export interface MultivariateDeleteMultivariateModel {
  /** Delete an existing multivariate model according to the modelId */
  delete(
    options?: MultivariateDeleteMultivariateModelParameters
  ): StreamableMethod<
    | MultivariateDeleteMultivariateModel204Response
    | MultivariateDeleteMultivariateModelDefaultResponse
  >;
  /**
   * Get detailed information of multivariate model, including the training status
   * and variables used in the model.
   */
  get(
    options?: MultivariateGetMultivariateModelParameters
  ): StreamableMethod<
    MultivariateGetMultivariateModel200Response | MultivariateGetMultivariateModelDefaultResponse
  >;
}

export interface MultivariateDetectMultivariateBatchAnomaly {
  /**
   * Submit multivariate anomaly detection task with the modelId of trained model
   * and inference data, the input schema should be the same with the training
   * request. The request will complete asynchronously and return a resultId to
   * query the detection result.The request should be a source link to indicate an
   * externally accessible Azure storage Uri, either pointed to an Azure blob
   * storage folder, or pointed to a CSV file in Azure blob storage.
   */
  post(
    options: MultivariateDetectMultivariateBatchAnomalyParameters
  ): StreamableMethod<
    | MultivariateDetectMultivariateBatchAnomaly202Response
    | MultivariateDetectMultivariateBatchAnomalyDefaultResponse
  >;
}

export interface MultivariateDetectMultivariateLastAnomaly {
  /**
   * Submit multivariate anomaly detection task with the modelId of trained model
   * and inference data, and the inference data should be put into request body in a
   * JSON format. The request will complete synchronously and return the detection
   * immediately in the response body.
   */
  post(
    options: MultivariateDetectMultivariateLastAnomalyParameters
  ): StreamableMethod<
    | MultivariateDetectMultivariateLastAnomaly200Response
    | MultivariateDetectMultivariateLastAnomalyDefaultResponse
  >;
}

export interface Routes {
  /** Resource for '/timeseries/entire/detect' has methods for the following verbs: post */
  (path: "/timeseries/entire/detect"): UnivariateDetectUnivariateEntireSeries;
  /** Resource for '/timeseries/last/detect' has methods for the following verbs: post */
  (path: "/timeseries/last/detect"): UnivariateDetectUnivariateLastPoint;
  /** Resource for '/timeseries/changepoint/detect' has methods for the following verbs: post */
  (path: "/timeseries/changepoint/detect"): UnivariateDetectUnivariateChangePoint;
  /** Resource for '/multivariate/detect-batch/\{resultId\}' has methods for the following verbs: get */
  (
    path: "/multivariate/detect-batch/{resultId}",
    resultId: string
  ): MultivariateGetMultivariateBatchDetectionResult;
  /** Resource for '/multivariate/models' has methods for the following verbs: post, get */
  (path: "/multivariate/models"): MultivariateCreateAndTrainMultivariateModel;
  /** Resource for '/multivariate/models/\{modelId\}' has methods for the following verbs: delete, get */
  (path: "/multivariate/models/{modelId}", modelId: string): MultivariateDeleteMultivariateModel;
  /** Resource for '/multivariate/models/\{modelId\}:detect-batch' has methods for the following verbs: post */
  (
    path: "/multivariate/models/{modelId}:detect-batch",
    modelId: string
  ): MultivariateDetectMultivariateBatchAnomaly;
  /** Resource for '/multivariate/models/\{modelId\}:detect-last' has methods for the following verbs: post */
  (
    path: "/multivariate/models/{modelId}:detect-last",
    modelId: string
  ): MultivariateDetectMultivariateLastAnomaly;
}

export type AnomalyDetectorRestClient = Client & {
  path: Routes;
};

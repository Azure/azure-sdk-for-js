// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  DetectUnivariateEntireSeriesParameters,
  DetectUnivariateLastPointParameters,
  DetectUnivariateChangePointParameters,
  GetMultivariateBatchDetectionResultParameters,
  TrainMultivariateModelParameters,
  ListMultivariateModelsParameters,
  DeleteMultivariateModelParameters,
  GetMultivariateModelParameters,
  DetectMultivariateBatchAnomalyParameters,
  DetectMultivariateLastAnomalyParameters,
} from "./parameters";
import {
  DetectUnivariateEntireSeries200Response,
  DetectUnivariateEntireSeriesDefaultResponse,
  DetectUnivariateLastPoint200Response,
  DetectUnivariateLastPointDefaultResponse,
  DetectUnivariateChangePoint200Response,
  DetectUnivariateChangePointDefaultResponse,
  GetMultivariateBatchDetectionResult200Response,
  GetMultivariateBatchDetectionResultDefaultResponse,
  TrainMultivariateModel201Response,
  TrainMultivariateModelDefaultResponse,
  ListMultivariateModels200Response,
  ListMultivariateModelsDefaultResponse,
  DeleteMultivariateModel204Response,
  DeleteMultivariateModelDefaultResponse,
  GetMultivariateModel200Response,
  GetMultivariateModelDefaultResponse,
  DetectMultivariateBatchAnomaly202Response,
  DetectMultivariateBatchAnomalyDefaultResponse,
  DetectMultivariateLastAnomaly200Response,
  DetectMultivariateLastAnomalyDefaultResponse,
} from "./responses";
import { Client, StreamableMethod } from "@azure-rest/core-client";

export interface DetectUnivariateEntireSeries {
  /**
   * This operation generates a model with an entire series. Each point is detected
   * with the same model. With this method, points before and after a certain point
   * are used to determine whether it's an anomaly. The entire detection can give the
   * user an overall status of the time series.
   */
  post(
    options: DetectUnivariateEntireSeriesParameters
  ): StreamableMethod<
    | DetectUnivariateEntireSeries200Response
    | DetectUnivariateEntireSeriesDefaultResponse
  >;
}

export interface DetectUnivariateLastPoint {
  /**
   * This operation generates a model by using the points that you sent in to the API
   * and based on all data to determine whether the last point is anomalous.
   */
  post(
    options: DetectUnivariateLastPointParameters
  ): StreamableMethod<
    | DetectUnivariateLastPoint200Response
    | DetectUnivariateLastPointDefaultResponse
  >;
}

export interface DetectUnivariateChangePoint {
  /** Evaluate the change point score of every series point. */
  post(
    options: DetectUnivariateChangePointParameters
  ): StreamableMethod<
    | DetectUnivariateChangePoint200Response
    | DetectUnivariateChangePointDefaultResponse
  >;
}

export interface GetMultivariateBatchDetectionResult {
  /**
   * For asynchronous inference, get a multivariate anomaly detection result based on the
   * resultId value that the BatchDetectAnomaly API returns.
   */
  get(
    options?: GetMultivariateBatchDetectionResultParameters
  ): StreamableMethod<
    | GetMultivariateBatchDetectionResult200Response
    | GetMultivariateBatchDetectionResultDefaultResponse
  >;
}

export interface TrainMultivariateModel {
  /**
   * Create and train a multivariate anomaly detection model. The request must
   * include a source parameter to indicate an Azure Blob
   * Storage URI that's accessible to the service. There are two types of data input. The Blob Storage URI can point to an Azure Blob
   * Storage folder that contains multiple CSV files, where each CSV file has
   * two columns, time stamp and variable. Or the Blob Storage URI can point to a single blob that contains a CSV file that has all the variables and a
   * time stamp column.
   */
  post(
    options: TrainMultivariateModelParameters
  ): StreamableMethod<
    TrainMultivariateModel201Response | TrainMultivariateModelDefaultResponse
  >;
  /** List models of a resource. */
  get(
    options?: ListMultivariateModelsParameters
  ): StreamableMethod<
    ListMultivariateModels200Response | ListMultivariateModelsDefaultResponse
  >;
}

export interface DeleteMultivariateModel {
  /** Delete an existing multivariate model according to the modelId value. */
  delete(
    options?: DeleteMultivariateModelParameters
  ): StreamableMethod<
    DeleteMultivariateModel204Response | DeleteMultivariateModelDefaultResponse
  >;
  /**
   * Get detailed information about the multivariate model, including the training status
   * and variables used in the model.
   */
  get(
    options?: GetMultivariateModelParameters
  ): StreamableMethod<
    GetMultivariateModel200Response | GetMultivariateModelDefaultResponse
  >;
}

export interface DetectMultivariateBatchAnomaly {
  /**
   * Submit a multivariate anomaly detection task with the modelId value of a trained model
   * and inference data. The input schema should be the same with the training
   * request. The request will finish asynchronously and return a resultId value to
   * query the detection result. The request should be a source link to indicate an
   * externally accessible Azure Storage URI that either points to an Azure Blob
   * Storage folder or points to a CSV file in Azure Blob Storage.
   */
  post(
    options: DetectMultivariateBatchAnomalyParameters
  ): StreamableMethod<
    | DetectMultivariateBatchAnomaly202Response
    | DetectMultivariateBatchAnomalyDefaultResponse
  >;
}

export interface DetectMultivariateLastAnomaly {
  /**
   * Submit a multivariate anomaly detection task with the modelId value of a trained model
   * and inference data. The inference data should be put into the request body in
   * JSON format. The request will finish synchronously and return the detection
   * immediately in the response body.
   */
  post(
    options: DetectMultivariateLastAnomalyParameters
  ): StreamableMethod<
    | DetectMultivariateLastAnomaly200Response
    | DetectMultivariateLastAnomalyDefaultResponse
  >;
}

export interface Routes {
  /** Resource for '/timeseries/entire/detect' has methods for the following verbs: post */
  (path: "/timeseries/entire/detect"): DetectUnivariateEntireSeries;
  /** Resource for '/timeseries/last/detect' has methods for the following verbs: post */
  (path: "/timeseries/last/detect"): DetectUnivariateLastPoint;
  /** Resource for '/timeseries/changepoint/detect' has methods for the following verbs: post */
  (path: "/timeseries/changepoint/detect"): DetectUnivariateChangePoint;
  /** Resource for '/multivariate/detect-batch/\{resultId\}' has methods for the following verbs: get */
  (
    path: "/multivariate/detect-batch/{resultId}",
    resultId: string
  ): GetMultivariateBatchDetectionResult;
  /** Resource for '/multivariate/models' has methods for the following verbs: post, get */
  (path: "/multivariate/models"): TrainMultivariateModel;
  /** Resource for '/multivariate/models/\{modelId\}' has methods for the following verbs: delete, get */
  (
    path: "/multivariate/models/{modelId}",
    modelId: string
  ): DeleteMultivariateModel;
  /** Resource for '/multivariate/models/\{modelId\}:detect-batch' has methods for the following verbs: post */
  (
    path: "/multivariate/models/{modelId}:detect-batch",
    modelId: string
  ): DetectMultivariateBatchAnomaly;
  /** Resource for '/multivariate/models/\{modelId\}:detect-last' has methods for the following verbs: post */
  (
    path: "/multivariate/models/{modelId}:detect-last",
    modelId: string
  ): DetectMultivariateLastAnomaly;
}

export type AnomalyDetectorClient = Client & {
  path: Routes;
};

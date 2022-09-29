// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  BatchDetectAnomalyParameters,
  CreateMultivariateModelParameters,
  DeleteMultivariateModelParameters,
  DetectChangePointParameters,
  DetectEntireSeriesParameters,
  DetectLastPointParameters,
  GetBatchDetectionResultParameters,
  GetMultivariateModelParameters,
  LastDetectAnomalyParameters,
  ListMultivariateModelParameters,
} from "./parameters";
import {
  BatchDetectAnomaly202Response,
  BatchDetectAnomalyDefaultResponse,
  CreateMultivariateModel201Response,
  CreateMultivariateModelDefaultResponse,
  DeleteMultivariateModel204Response,
  DeleteMultivariateModelDefaultResponse,
  DetectChangePoint200Response,
  DetectChangePointDefaultResponse,
  DetectEntireSeries200Response,
  DetectEntireSeriesDefaultResponse,
  DetectLastPoint200Response,
  DetectLastPointDefaultResponse,
  GetBatchDetectionResult200Response,
  GetBatchDetectionResultDefaultResponse,
  GetMultivariateModel200Response,
  GetMultivariateModelDefaultResponse,
  LastDetectAnomaly200Response,
  LastDetectAnomalyDefaultResponse,
  ListMultivariateModel200Response,
  ListMultivariateModelDefaultResponse,
} from "./responses";
import { Client, StreamableMethod } from "@azure-rest/core-client";

export interface DetectEntireSeries {
  /** This operation generates a model with an entire series, each point is detected with the same model. With this method, points before and after a certain point are used to determine whether it is an anomaly. The entire detection can give user an overall status of the time series. */
  post(
    options: DetectEntireSeriesParameters
  ): StreamableMethod<DetectEntireSeries200Response | DetectEntireSeriesDefaultResponse>;
}

export interface DetectLastPoint {
  /** This operation generates a model using the points that you sent into the API, and based on all data to determine whether the last point is anomalous. */
  post(
    options: DetectLastPointParameters
  ): StreamableMethod<DetectLastPoint200Response | DetectLastPointDefaultResponse>;
}

export interface DetectChangePoint {
  /** Evaluate change point score of every series point */
  post(
    options: DetectChangePointParameters
  ): StreamableMethod<DetectChangePoint200Response | DetectChangePointDefaultResponse>;
}

export interface GetBatchDetectionResult {
  /** For asynchronous inference, get multivariate anomaly detection result based on resultId returned by the BatchDetectAnomaly api. */
  get(
    options?: GetBatchDetectionResultParameters
  ): StreamableMethod<GetBatchDetectionResult200Response | GetBatchDetectionResultDefaultResponse>;
}

export interface CreateMultivariateModel {
  /** Create and train a multivariate anomaly detection model. The request must include a source parameter to indicate an externally accessible Azure blob storage URI.There are two types of data input: An URI pointed to an Azure blob storage folder which contains multiple CSV files, and each CSV file contains two columns, timestamp and variable. Another type of input is an URI pointed to a CSV file in Azure blob storage, which contains all the variables and a timestamp column. */
  post(
    options: CreateMultivariateModelParameters
  ): StreamableMethod<CreateMultivariateModel201Response | CreateMultivariateModelDefaultResponse>;
  /** List models of a resource. */
  get(
    options?: ListMultivariateModelParameters
  ): StreamableMethod<ListMultivariateModel200Response | ListMultivariateModelDefaultResponse>;
}

export interface DeleteMultivariateModel {
  /** Delete an existing multivariate model according to the modelId */
  delete(
    options?: DeleteMultivariateModelParameters
  ): StreamableMethod<DeleteMultivariateModel204Response | DeleteMultivariateModelDefaultResponse>;
  /** Get detailed information of multivariate model, including the training status and variables used in the model. */
  get(
    options?: GetMultivariateModelParameters
  ): StreamableMethod<GetMultivariateModel200Response | GetMultivariateModelDefaultResponse>;
}

export interface BatchDetectAnomaly {
  /** Submit multivariate anomaly detection task with the modelId of trained model and inference data, the input schema should be the same with the training request. The request will complete asynchronously and return a resultId to query the detection result.The request should be a source link to indicate an externally accessible Azure storage Uri, either pointed to an Azure blob storage folder, or pointed to a CSV file in Azure blob storage. */
  post(
    options: BatchDetectAnomalyParameters
  ): StreamableMethod<BatchDetectAnomaly202Response | BatchDetectAnomalyDefaultResponse>;
}

export interface LastDetectAnomaly {
  /** Submit multivariate anomaly detection task with the modelId of trained model and inference data, and the inference data should be put into request body in a JSON format. The request will complete synchronously and return the detection immediately in the response body. */
  post(
    options: LastDetectAnomalyParameters
  ): StreamableMethod<LastDetectAnomaly200Response | LastDetectAnomalyDefaultResponse>;
}

export interface Routes {
  /** Resource for '/timeseries/entire/detect' has methods for the following verbs: post */
  (path: "/timeseries/entire/detect"): DetectEntireSeries;
  /** Resource for '/timeseries/last/detect' has methods for the following verbs: post */
  (path: "/timeseries/last/detect"): DetectLastPoint;
  /** Resource for '/timeseries/changepoint/detect' has methods for the following verbs: post */
  (path: "/timeseries/changepoint/detect"): DetectChangePoint;
  /** Resource for '/multivariate/detect-batch/\{resultId\}' has methods for the following verbs: get */
  (path: "/multivariate/detect-batch/{resultId}", resultId: string): GetBatchDetectionResult;
  /** Resource for '/multivariate/models' has methods for the following verbs: post, get */
  (path: "/multivariate/models"): CreateMultivariateModel;
  /** Resource for '/multivariate/models/\{modelId\}' has methods for the following verbs: delete, get */
  (path: "/multivariate/models/{modelId}", modelId: string): DeleteMultivariateModel;
  /** Resource for '/multivariate/models/\{modelId\}:detect-batch' has methods for the following verbs: post */
  (path: "/multivariate/models/{modelId}:detect-batch", modelId: string): BatchDetectAnomaly;
  /** Resource for '/multivariate/models/\{modelId\}:detect-last' has methods for the following verbs: post */
  (path: "/multivariate/models/{modelId}:detect-last", modelId: string): LastDetectAnomaly;
}

export type AnomalyDetectorRestClient = Client & {
  path: Routes;
};

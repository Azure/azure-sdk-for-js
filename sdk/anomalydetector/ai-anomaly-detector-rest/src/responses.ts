// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RawHttpHeaders } from "@azure/core-rest-pipeline";
import { HttpResponse } from "@azure-rest/core-client";
import {
  EntireDetectResponseOutput,
  AnomalyDetectorErrorOutput,
  LastDetectResponseOutput,
  ChangePointDetectResponseOutput,
  DetectionResultOutput,
  ErrorResponseOutput,
  ModelOutput,
  ModelListOutput,
  LastDetectionResultOutput,
} from "./outputModels";

/** The request has succeeded. */
export interface DetectUnivariateEntireSeries200Response extends HttpResponse {
  status: "200";
  body: EntireDetectResponseOutput;
}

export interface DetectUnivariateEntireSeriesDefaultHeaders {
  "x-ms-error"?: string;
}

export interface DetectUnivariateEntireSeriesDefaultResponse
  extends HttpResponse {
  status: string;
  body: AnomalyDetectorErrorOutput;
  headers: RawHttpHeaders & DetectUnivariateEntireSeriesDefaultHeaders;
}

/** The request has succeeded. */
export interface DetectUnivariateLastPoint200Response extends HttpResponse {
  status: "200";
  body: LastDetectResponseOutput;
}

export interface DetectUnivariateLastPointDefaultHeaders {
  "x-ms-error"?: string;
}

export interface DetectUnivariateLastPointDefaultResponse extends HttpResponse {
  status: string;
  body: AnomalyDetectorErrorOutput;
  headers: RawHttpHeaders & DetectUnivariateLastPointDefaultHeaders;
}

/** The request has succeeded. */
export interface DetectUnivariateChangePoint200Response extends HttpResponse {
  status: "200";
  body: ChangePointDetectResponseOutput;
}

export interface DetectUnivariateChangePointDefaultHeaders {
  "x-ms-error"?: string;
}

export interface DetectUnivariateChangePointDefaultResponse
  extends HttpResponse {
  status: string;
  body: AnomalyDetectorErrorOutput;
  headers: RawHttpHeaders & DetectUnivariateChangePointDefaultHeaders;
}

/** The request has succeeded. */
export interface GetMultivariateBatchDetectionResult200Response
  extends HttpResponse {
  status: "200";
  body: DetectionResultOutput;
}

export interface GetMultivariateBatchDetectionResultDefaultHeaders {
  /** Error code. */
  "x-ms-error-code"?: string;
}

export interface GetMultivariateBatchDetectionResultDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & GetMultivariateBatchDetectionResultDefaultHeaders;
}

export interface CreateAndTrainMultivariateModel201Headers {
  /** Location and ID of the model. */
  location: string;
}

/** The request has succeeded and a new resource has been created as a result. */
export interface CreateAndTrainMultivariateModel201Response
  extends HttpResponse {
  status: "201";
  body: ModelOutput;
  headers: RawHttpHeaders & CreateAndTrainMultivariateModel201Headers;
}

export interface CreateAndTrainMultivariateModelDefaultHeaders {
  /** Error code. */
  "x-ms-error-code"?: string;
}

export interface CreateAndTrainMultivariateModelDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & CreateAndTrainMultivariateModelDefaultHeaders;
}

/** The request has succeeded. */
export interface ListMultivariateModels200Response extends HttpResponse {
  status: "200";
  body: ModelListOutput;
}

export interface ListMultivariateModelsDefaultHeaders {
  /** Error code. */
  "x-ms-error-code"?: string;
}

export interface ListMultivariateModelsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & ListMultivariateModelsDefaultHeaders;
}

/** There is no content to send for this request, but the headers may be useful. */
export interface DeleteMultivariateModel204Response extends HttpResponse {
  status: "204";
}

export interface DeleteMultivariateModelDefaultHeaders {
  /** Error code. */
  "x-ms-error-code"?: string;
}

export interface DeleteMultivariateModelDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & DeleteMultivariateModelDefaultHeaders;
}

/** The request has succeeded. */
export interface GetMultivariateModel200Response extends HttpResponse {
  status: "200";
  body: ModelOutput;
}

export interface GetMultivariateModelDefaultHeaders {
  /** Error code. */
  "x-ms-error-code"?: string;
}

export interface GetMultivariateModelDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & GetMultivariateModelDefaultHeaders;
}

export interface DetectMultivariateBatchAnomaly202Headers {
  /** Id of the detection result. */
  "operation-id": string;
  /** Location of the detection result. */
  "operation-location": string;
}

/** The request has been accepted for processing, but processing has not yet completed. */
export interface DetectMultivariateBatchAnomaly202Response
  extends HttpResponse {
  status: "202";
  body: DetectionResultOutput;
  headers: RawHttpHeaders & DetectMultivariateBatchAnomaly202Headers;
}

export interface DetectMultivariateBatchAnomalyDefaultHeaders {
  /** Error code. */
  "x-ms-error-code"?: string;
}

export interface DetectMultivariateBatchAnomalyDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & DetectMultivariateBatchAnomalyDefaultHeaders;
}

/** The request has succeeded. */
export interface DetectMultivariateLastAnomaly200Response extends HttpResponse {
  status: "200";
  body: LastDetectionResultOutput;
}

export interface DetectMultivariateLastAnomalyDefaultHeaders {
  /** Error code. */
  "x-ms-error-code"?: string;
}

export interface DetectMultivariateLastAnomalyDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & DetectMultivariateLastAnomalyDefaultHeaders;
}

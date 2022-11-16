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
export interface UnivariateDetectUnivariateEntireSeries200Response extends HttpResponse {
  status: "200";
  body: EntireDetectResponseOutput;
}

export interface UnivariateDetectUnivariateEntireSeriesDefaultHeaders {
  "x-ms-error"?: string;
}

export interface UnivariateDetectUnivariateEntireSeriesDefaultResponse extends HttpResponse {
  status: string;
  body: AnomalyDetectorErrorOutput;
  headers: RawHttpHeaders & UnivariateDetectUnivariateEntireSeriesDefaultHeaders;
}

/** The request has succeeded. */
export interface UnivariateDetectUnivariateLastPoint200Response extends HttpResponse {
  status: "200";
  body: LastDetectResponseOutput;
}

export interface UnivariateDetectUnivariateLastPointDefaultHeaders {
  "x-ms-error"?: string;
}

export interface UnivariateDetectUnivariateLastPointDefaultResponse extends HttpResponse {
  status: string;
  body: AnomalyDetectorErrorOutput;
  headers: RawHttpHeaders & UnivariateDetectUnivariateLastPointDefaultHeaders;
}

/** The request has succeeded. */
export interface UnivariateDetectUnivariateChangePoint200Response extends HttpResponse {
  status: "200";
  body: ChangePointDetectResponseOutput;
}

export interface UnivariateDetectUnivariateChangePointDefaultHeaders {
  "x-ms-error"?: string;
}

export interface UnivariateDetectUnivariateChangePointDefaultResponse extends HttpResponse {
  status: string;
  body: AnomalyDetectorErrorOutput;
  headers: RawHttpHeaders & UnivariateDetectUnivariateChangePointDefaultHeaders;
}

/** The request has succeeded. */
export interface MultivariateGetMultivariateBatchDetectionResult200Response extends HttpResponse {
  status: "200";
  body: DetectionResultOutput;
}

export interface MultivariateGetMultivariateBatchDetectionResultDefaultHeaders {
  /** Error code. */
  "x-ms-error-code"?: string;
}

export interface MultivariateGetMultivariateBatchDetectionResultDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & MultivariateGetMultivariateBatchDetectionResultDefaultHeaders;
}

export interface MultivariateCreateAndTrainMultivariateModel201Headers {
  /** Location and ID of the model. */
  location: string;
}

/** The request has succeeded and a new resource has been created as a result. */
export interface MultivariateCreateAndTrainMultivariateModel201Response extends HttpResponse {
  status: "201";
  body: ModelOutput;
  headers: RawHttpHeaders & MultivariateCreateAndTrainMultivariateModel201Headers;
}

export interface MultivariateCreateAndTrainMultivariateModelDefaultHeaders {
  /** Error code. */
  "x-ms-error-code"?: string;
}

export interface MultivariateCreateAndTrainMultivariateModelDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & MultivariateCreateAndTrainMultivariateModelDefaultHeaders;
}

/** The request has succeeded. */
export interface MultivariateListMultivariateModels200Response extends HttpResponse {
  status: "200";
  body: ModelListOutput;
}

export interface MultivariateListMultivariateModelsDefaultHeaders {
  /** Error code. */
  "x-ms-error-code"?: string;
}

export interface MultivariateListMultivariateModelsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & MultivariateListMultivariateModelsDefaultHeaders;
}

/** There is no content to send for this request, but the headers may be useful. */
export interface MultivariateDeleteMultivariateModel204Response extends HttpResponse {
  status: "204";
}

export interface MultivariateDeleteMultivariateModelDefaultHeaders {
  /** Error code. */
  "x-ms-error-code"?: string;
}

export interface MultivariateDeleteMultivariateModelDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & MultivariateDeleteMultivariateModelDefaultHeaders;
}

/** The request has succeeded. */
export interface MultivariateGetMultivariateModel200Response extends HttpResponse {
  status: "200";
  body: ModelOutput;
}

export interface MultivariateGetMultivariateModelDefaultHeaders {
  /** Error code. */
  "x-ms-error-code"?: string;
}

export interface MultivariateGetMultivariateModelDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & MultivariateGetMultivariateModelDefaultHeaders;
}

export interface MultivariateDetectMultivariateBatchAnomaly202Headers {
  /** Id of the detection result. */
  "operation-id": string;
  /** Location of the detection result. */
  "operation-location": string;
}

/** The request has been accepted for processing, but processing has not yet completed. */
export interface MultivariateDetectMultivariateBatchAnomaly202Response extends HttpResponse {
  status: "202";
  body: DetectionResultOutput;
  headers: RawHttpHeaders & MultivariateDetectMultivariateBatchAnomaly202Headers;
}

export interface MultivariateDetectMultivariateBatchAnomalyDefaultHeaders {
  /** Error code. */
  "x-ms-error-code"?: string;
}

export interface MultivariateDetectMultivariateBatchAnomalyDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & MultivariateDetectMultivariateBatchAnomalyDefaultHeaders;
}

/** The request has succeeded. */
export interface MultivariateDetectMultivariateLastAnomaly200Response extends HttpResponse {
  status: "200";
  body: LastDetectionResultOutput;
}

export interface MultivariateDetectMultivariateLastAnomalyDefaultHeaders {
  /** Error code. */
  "x-ms-error-code"?: string;
}

export interface MultivariateDetectMultivariateLastAnomalyDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & MultivariateDetectMultivariateLastAnomalyDefaultHeaders;
}

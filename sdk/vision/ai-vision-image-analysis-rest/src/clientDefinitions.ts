// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AnalyzeFromImageDataParameters, AnalyzeFromUrlParameters } from "./parameters.js";
import type {
  AnalyzeFromImageData200Response,
  AnalyzeFromImageDataDefaultResponse,
  AnalyzeFromUrl200Response,
  AnalyzeFromUrlDefaultResponse,
} from "./responses.js";
import type { Client, StreamableMethod } from "@azure-rest/core-client";

export interface AnalyzeFromImageData {
  /** Performs a single Image Analysis operation */
  post(
    options: AnalyzeFromImageDataParameters,
  ): StreamableMethod<AnalyzeFromImageData200Response | AnalyzeFromImageDataDefaultResponse>;
  /** Performs a single Image Analysis operation */
  post(
    options: AnalyzeFromUrlParameters,
  ): StreamableMethod<AnalyzeFromUrl200Response | AnalyzeFromUrlDefaultResponse>;
}

export interface Routes {
  /** Resource for '/imageanalysis:analyze' has methods for the following verbs: post */
  (path: "/imageanalysis:analyze"): AnalyzeFromImageData;
}

export type ImageAnalysisClient = Client & {
  path: Routes;
};

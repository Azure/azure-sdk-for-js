// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  AnalyzeFromStreamParameters,
  AnalyzeFromUrlParameters,
} from "./parameters";
import {
  AnalyzeFromStream200Response,
  AnalyzeFromStreamDefaultResponse,
  AnalyzeFromUrl200Response,
  AnalyzeFromUrlDefaultResponse,
} from "./responses";
import { Client, StreamableMethod } from "@azure-rest/core-client";

export interface AnalyzeFromStream {
  /** Performs a single Image Analysis operation */
  post(
    options: AnalyzeFromStreamParameters
  ): StreamableMethod<
    AnalyzeFromStream200Response | AnalyzeFromStreamDefaultResponse
  >;
  /** Performs a single Image Analysis operation */
  post(
    options: AnalyzeFromUrlParameters
  ): StreamableMethod<
    AnalyzeFromUrl200Response | AnalyzeFromUrlDefaultResponse
  >;
}

export interface Routes {
  /** Resource for '/imageanalysis:analyze' has methods for the following verbs: post */
  (path: "/imageanalysis:analyze"): AnalyzeFromStream;
}

export type ImageAnalysisClient = Client & {
  path: Routes;
};

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  AnalyzeFromBufferParameters,
  AnalyzeFromUrlParameters,
} from "./parameters";
import {
  AnalyzeFromBuffer200Response,
  AnalyzeFromBufferDefaultResponse,
  AnalyzeFromUrl200Response,
  AnalyzeFromUrlDefaultResponse,
} from "./responses";
import { Client, StreamableMethod } from "@azure-rest/core-client";

export interface AnalyzeFromBuffer {
  /** Performs a single Image Analysis operation */
  post(
    options: AnalyzeFromBufferParameters
  ): StreamableMethod<
    AnalyzeFromBuffer200Response | AnalyzeFromBufferDefaultResponse
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
  (path: "/imageanalysis:analyze"): AnalyzeFromBuffer;
}

export type ImageAnalysisClient = Client & {
  path: Routes;
};

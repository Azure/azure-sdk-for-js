// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  AnalyzeFromStreamParameters,
  AnalyzeFromUrlParameters,
  SegmentFromUrlParameters,
  SegmentFromStreamParameters,
} from "./parameters.js";
import {
  AnalyzeFromStream200Response,
  AnalyzeFromStreamDefaultResponse,
  AnalyzeFromUrl200Response,
  AnalyzeFromUrlDefaultResponse,
  SegmentFromUrl200Response,
  SegmentFromUrlDefaultResponse,
  SegmentFromStream200Response,
  SegmentFromStreamDefaultResponse,
} from "./responses.js";
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

export interface SegmentFromUrl {
  /** Segment the input image. An image stream of content type 'image/png' is returned, where the pixel values depend on the analysis mode. The returned image has the same dimensions as the input image for modes: foregroundMatting. The returned image has the same aspect ratio and same dimensions as the input image up to a limit of 16 megapixels for modes: backgroundRemoval. */
  post(
    options: SegmentFromUrlParameters
  ): StreamableMethod<
    SegmentFromUrl200Response | SegmentFromUrlDefaultResponse
  >;
  /** Segment the input image. An image stream of content type 'image/png' is returned, where the pixel values depend on the analysis mode. The returned image has the same dimensions as the input image for modes: foregroundMatting. The returned image has the same aspect ratio and same dimensions as the input image up to a limit of 16 megapixels for modes: backgroundRemoval. */
  post(
    options: SegmentFromStreamParameters
  ): StreamableMethod<
    SegmentFromStream200Response | SegmentFromStreamDefaultResponse
  >;
}

export interface Routes {
  /** Resource for '/imageanalysis:analyze' has methods for the following verbs: post */
  (path: "/imageanalysis:analyze"): AnalyzeFromStream;
  /** Resource for '/imageanalysis:segment' has methods for the following verbs: post */
  (path: "/imageanalysis:segment"): SegmentFromUrl;
}

export type ImageAnalysisContext = Client & {
  path: Routes;
};

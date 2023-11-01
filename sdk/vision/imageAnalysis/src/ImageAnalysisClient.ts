// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { KeyCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";
import {
  ImageAnalysisResult,
  ImageUrl,
  segmentationMode,
} from "./models/models.js";
import {
  AnalyzeFromStreamOptions,
  AnalyzeFromUrlOptions,
  SegmentFromUrlOptions,
  SegmentFromStreamOptions,
} from "./models/options.js";
import {
  createImageAnalysis,
  ImageAnalysisClientOptions,
  ImageAnalysisContext,
  analyzeFromStream,
  analyzeFromUrl,
  segmentFromUrl,
  segmentFromStream,
} from "./api/index.js";

export { ImageAnalysisClientOptions } from "./api/ImageAnalysisContext.js";

export class ImageAnalysisClient {
  private _client: ImageAnalysisContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(
    endpoint: string,
    credential: KeyCredential,
    options: ImageAnalysisClientOptions = {}
  ) {
    this._client = createImageAnalysis(endpoint, credential, options);
    this.pipeline = this._client.pipeline;
  }

  /** Performs a single Image Analysis operation */
  analyzeFromStream(
    imageContent: Uint8Array,
    options: AnalyzeFromStreamOptions = { requestOptions: {} }
  ): Promise<ImageAnalysisResult> {
    return analyzeFromStream(this._client, imageContent, options);
  }

  /** Performs a single Image Analysis operation */
  analyzeFromUrl(
    imageContent: ImageUrl,
    options: AnalyzeFromUrlOptions = { requestOptions: {} }
  ): Promise<ImageAnalysisResult> {
    return analyzeFromUrl(this._client, imageContent, options);
  }

  /** Segment the input image. An image stream of content type 'image/png' is returned, where the pixel values depend on the analysis mode. The returned image has the same dimensions as the input image for modes: foregroundMatting. The returned image has the same aspect ratio and same dimensions as the input image up to a limit of 16 megapixels for modes: backgroundRemoval. */
  segmentFromUrl(
    mode: segmentationMode,
    imageContent: ImageUrl,
    options: SegmentFromUrlOptions = { requestOptions: {} }
  ): Promise<Uint8Array> {
    return segmentFromUrl(this._client, mode, imageContent, options);
  }

  /** Segment the input image. An image stream of content type 'image/png' is returned, where the pixel values depend on the analysis mode. The returned image has the same dimensions as the input image for modes: foregroundMatting. The returned image has the same aspect ratio and same dimensions as the input image up to a limit of 16 megapixels for modes: backgroundRemoval. */
  segmentFromStream(
    mode: segmentationMode,
    imageContent: Uint8Array,
    options: SegmentFromStreamOptions = { requestOptions: {} }
  ): Promise<Uint8Array> {
    return segmentFromStream(this._client, mode, imageContent, options);
  }
}

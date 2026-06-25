// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  ImageAnalysisContext,
  ImageAnalysisClientOptionalParams,
  createImageAnalysis,
} from "./api/index.js";
import { analyzeFromUrl, analyzeFromImageData } from "./api/operations.js";
import { AnalyzeFromUrlOptionalParams, AnalyzeFromImageDataOptionalParams } from "./api/options.js";
import { ImageAnalysisResult, ImageUrl, VisualFeatures } from "./models/models.js";
import { KeyCredential, TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";

export type { ImageAnalysisClientOptionalParams } from "./api/imageAnalysisContext.js";

export class ImageAnalysisClient {
  private _client: ImageAnalysisContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(
    endpointParam: string,
    credential: KeyCredential | TokenCredential,
    options: ImageAnalysisClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createImageAnalysis(endpointParam, credential, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
  }

  /** Performs a single Image Analysis operation */
  analyzeFromUrl(
    imageUrl: ImageUrl,
    visualFeatures: VisualFeatures[],
    options: AnalyzeFromUrlOptionalParams = { requestOptions: {} },
  ): Promise<ImageAnalysisResult> {
    return analyzeFromUrl(this._client, imageUrl, visualFeatures, options);
  }

  /** Performs a single Image Analysis operation */
  analyzeFromImageData(
    imageData: Uint8Array,
    visualFeatures: VisualFeatures[],
    options: AnalyzeFromImageDataOptionalParams = { requestOptions: {} },
  ): Promise<ImageAnalysisResult> {
    return analyzeFromImageData(this._client, imageData, visualFeatures, options);
  }
}

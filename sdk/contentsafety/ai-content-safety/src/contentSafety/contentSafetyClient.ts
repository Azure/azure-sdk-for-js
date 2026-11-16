// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  ContentSafetyContext,
  ContentSafetyClientOptionalParams,
  createContentSafety,
} from "./api/index.js";
import {
  AnalyzeImageOptions,
  AnalyzeImageResult,
  AnalyzeTextOptions,
  AnalyzeTextResult,
  DetectTextProtectedMaterialOptions,
  DetectTextProtectedMaterialResult,
  ShieldPromptOptions,
  ShieldPromptResult,
  UnifiedModerateOptions,
  UnifiedModerateResult,
} from "../models/models.js";
import {
  unifiedModerate,
  shieldPrompt,
  detectTextProtectedMaterial,
  analyzeText,
  analyzeImage,
} from "./api/operations.js";
import {
  UnifiedModerateOptionalParams,
  ShieldPromptOptionalParams,
  DetectTextProtectedMaterialOptionalParams,
  AnalyzeTextOptionalParams,
  AnalyzeImageOptionalParams,
} from "./api/options.js";
import { KeyCredential, TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";

export type { ContentSafetyClientOptionalParams } from "./api/contentSafetyContext.js";

export class ContentSafetyClient {
  private _client: ContentSafetyContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(
    endpointParam: string,
    credential: KeyCredential | TokenCredential,
    options: ContentSafetyClientOptionalParams = {},
  ) {
    this._client = createContentSafety(endpointParam, credential, options);
    this.pipeline = this._client.pipeline;
  }

  /** A synchronous API that evaluates input, output, a proposed tool call, or a completed tool result against an applicable Agent Control Specification policy and returns the enforced content and policy verdict. */
  unifiedModerate(
    body: UnifiedModerateOptions,
    options: UnifiedModerateOptionalParams = { requestOptions: {} },
  ): Promise<UnifiedModerateResult> {
    return unifiedModerate(this._client, body, options);
  }

  /** A synchronous API for shielding prompt from direct and indirect injection attacks. */
  shieldPrompt(
    body: ShieldPromptOptions,
    options: ShieldPromptOptionalParams = { requestOptions: {} },
  ): Promise<ShieldPromptResult> {
    return shieldPrompt(this._client, body, options);
  }

  /** A synchronous API for detecting protected material in the given text. */
  detectTextProtectedMaterial(
    body: DetectTextProtectedMaterialOptions,
    options: DetectTextProtectedMaterialOptionalParams = { requestOptions: {} },
  ): Promise<DetectTextProtectedMaterialResult> {
    return detectTextProtectedMaterial(this._client, body, options);
  }

  /** A synchronous API for the analysis of potentially harmful text content. Currently, it supports four categories: Hate, SelfHarm, Sexual, and Violence. */
  analyzeText(
    body: AnalyzeTextOptions,
    options: AnalyzeTextOptionalParams = { requestOptions: {} },
  ): Promise<AnalyzeTextResult> {
    return analyzeText(this._client, body, options);
  }

  /** A synchronous API for the analysis of potentially harmful image content. Currently, it supports four categories: Hate, SelfHarm, Sexual, and Violence. */
  analyzeImage(
    body: AnalyzeImageOptions,
    options: AnalyzeImageOptionalParams = { requestOptions: {} },
  ): Promise<AnalyzeImageResult> {
    return analyzeImage(this._client, body, options);
  }
}

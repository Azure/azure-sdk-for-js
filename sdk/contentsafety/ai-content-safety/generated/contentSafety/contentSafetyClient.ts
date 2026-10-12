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
  AgentContextUnion,
  AgentVerdictUnion,
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

  /** Synchronously evaluate a canonical Agent Hooks 0.1 context against authorized effective policy. This version evolves Unified Moderate on its existing route and supports all eight interception points. Azure AI Content Safety composes the applicable selected, bound, subscription and hierarchy policies within this evaluation and returns a complete Verdict. The calling host owns composition across independent interceptors, transform application, final enforcement, approvals, timeouts and audit. policyId selects an authorized policy and targetResourceId selects an authorized binding target; provide at least one. Applicable mandatory policies cannot be bypassed by either selector. Body identity metadata is not authorization. Request and response limits are 1,048,576 decoded UTF-8 JSON bytes and container depth 64 including the root. Over-limit results are errors, not truncated successful verdicts. */
  unifiedModerate(
    body: AgentContextUnion,
    options: UnifiedModerateOptionalParams = { requestOptions: {} },
  ): Promise<AgentVerdictUnion> {
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

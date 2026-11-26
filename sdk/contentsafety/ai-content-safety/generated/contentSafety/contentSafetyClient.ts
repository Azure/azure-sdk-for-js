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
  AgentEvaluationResult,
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

  /** Synchronously evaluate a canonical Agent Hooks 0.1 context and return a closed canonical Verdict plus a separate evaluation receipt. The hosted API supports two selector profiles. The Foundry-project profile requires targetResourceId plus one exact selected Guardrail through the all-or-none selectedPolicyId/revision/digest tuple. AACS may additionally resolve zero or more explicit administrator policies bound to the target or its ancestors; no binding is required for the selected-Guardrail-only case. The named-policy profile uses policyId without requiring a Foundry project. Exactly one profile is selected; targetResourceId and policyId cannot be combined. Local Copilot and WorkIQ integrations use in-process Agent Hooks/ACS rather than this hosted protocol. The receipt binds its policy metadata to the exact API version, AgentContext and admitted selectors through an RFC 8785 SHA-256 request digest. The calling host recomputes that binding and owns transform application, final enforcement, approvals, timeouts, audit and any separate host-action attestation. The receipt proves evaluation evidence, not host enforcement or feature activation. Body identity metadata and customer-settable headers are not authorization. Request and response limits are 1,048,576 decoded UTF-8 JSON bytes and container depth 64 including the root. Duplicate members, ambiguous selectors and over-limit requests are errors, not truncated successful responses. */
  unifiedModerate(
    body: AgentContextUnion,
    options: UnifiedModerateOptionalParams = { requestOptions: {} },
  ): Promise<AgentEvaluationResult> {
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

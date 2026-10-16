// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContentSafetyContext as Client } from "./index.js";
import {
  AnalyzeImageOptions,
  analyzeImageOptionsSerializer,
  AnalyzeImageResult,
  analyzeImageResultDeserializer,
  AnalyzeTextOptions,
  analyzeTextOptionsSerializer,
  AnalyzeTextResult,
  analyzeTextResultDeserializer,
  DetectTextProtectedMaterialOptions,
  detectTextProtectedMaterialOptionsSerializer,
  DetectTextProtectedMaterialResult,
  detectTextProtectedMaterialResultDeserializer,
  ShieldPromptOptions,
  shieldPromptOptionsSerializer,
  ShieldPromptResult,
  shieldPromptResultDeserializer,
  agentContextUnionSerializer,
  AgentContextUnion,
  AgentEvaluationResult,
  agentEvaluationResultDeserializer,
  agentEvaluationErrorDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  UnifiedModerateOptionalParams,
  ShieldPromptOptionalParams,
  DetectTextProtectedMaterialOptionalParams,
  AnalyzeTextOptionalParams,
  AnalyzeImageOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _unifiedModerateSend(
  context: Client,
  body: AgentContextUnion,
  options: UnifiedModerateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/content:unifiedModerate{?api%2Dversion,targetResourceId,policyId,selectedPolicyId,selectedPolicyRevision,selectedPolicySemanticDigest}",
    {
      "api%2Dversion": context.apiVersion ?? "2026-10-15-preview",
      targetResourceId: options?.targetResourceId,
      policyId: options?.policyId,
      selectedPolicyId: options?.selectedPolicyId,
      selectedPolicyRevision: options?.selectedPolicyRevision,
      selectedPolicySemanticDigest: options?.selectedPolicySemanticDigest,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: agentContextUnionSerializer(body),
    });
}

export async function _unifiedModerateDeserialize(
  result: PathUncheckedResponse,
): Promise<AgentEvaluationResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    const statusCode = Number.parseInt(result.status);
    if (statusCode === 400) {
      if (result.body) {
        error.details = agentEvaluationErrorDeserializer(result.body);
      }
    } else if (statusCode === 401) {
      if (result.body) {
        error.details = agentEvaluationErrorDeserializer(result.body);
      }
    } else if (statusCode === 403) {
      if (result.body) {
        error.details = agentEvaluationErrorDeserializer(result.body);
      }
    } else if (statusCode === 404) {
      if (result.body) {
        error.details = agentEvaluationErrorDeserializer(result.body);
      }
    } else if (statusCode === 409) {
      if (result.body) {
        error.details = agentEvaluationErrorDeserializer(result.body);
      }
    } else if (statusCode === 429) {
      if (result.body) {
        error.details = agentEvaluationErrorDeserializer(result.body);
      }
    } else if (statusCode === 500) {
      if (result.body) {
        error.details = agentEvaluationErrorDeserializer(result.body);
      }
    } else if (statusCode === 503) {
      if (result.body) {
        error.details = agentEvaluationErrorDeserializer(result.body);
      }
    }
    throw error;
  }

  return agentEvaluationResultDeserializer(result.body);
}

/** Synchronously evaluate a canonical Agent Hooks 0.1 context and return a closed canonical Verdict plus a separate evaluation receipt. The hosted API supports two selector profiles. The Foundry-project profile requires targetResourceId plus one exact selected Guardrail through the all-or-none selectedPolicyId/revision/digest tuple. AACS may additionally resolve zero or more explicit administrator policies bound to the target or its ancestors; no binding is required for the selected-Guardrail-only case. The named-policy profile uses policyId without requiring a Foundry project. Exactly one profile is selected; targetResourceId and policyId cannot be combined. Local Copilot and WorkIQ integrations use in-process Agent Hooks/ACS rather than this hosted protocol. The receipt binds its policy metadata to the exact API version, AgentContext and admitted selectors through an RFC 8785 SHA-256 request digest. The calling host recomputes that binding and owns transform application, final enforcement, approvals, timeouts, audit and any separate host-action attestation. The receipt proves evaluation evidence, not host enforcement or feature activation. Body identity metadata and customer-settable headers are not authorization. Request and response limits are 1,048,576 decoded UTF-8 JSON bytes and container depth 64 including the root. Duplicate members, ambiguous selectors and over-limit requests are errors, not truncated successful responses. */
export async function unifiedModerate(
  context: Client,
  body: AgentContextUnion,
  options: UnifiedModerateOptionalParams = { requestOptions: {} },
): Promise<AgentEvaluationResult> {
  const result = await _unifiedModerateSend(context, body, options);
  return _unifiedModerateDeserialize(result);
}

export function _shieldPromptSend(
  context: Client,
  body: ShieldPromptOptions,
  options: ShieldPromptOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/text:shieldPrompt{?api%2Dversion}",
    {
      "api%2Dversion": context.apiVersion ?? "2026-10-15-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: shieldPromptOptionsSerializer(body),
    });
}

export async function _shieldPromptDeserialize(
  result: PathUncheckedResponse,
): Promise<ShieldPromptResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return shieldPromptResultDeserializer(result.body);
}

/** A synchronous API for shielding prompt from direct and indirect injection attacks. */
export async function shieldPrompt(
  context: Client,
  body: ShieldPromptOptions,
  options: ShieldPromptOptionalParams = { requestOptions: {} },
): Promise<ShieldPromptResult> {
  const result = await _shieldPromptSend(context, body, options);
  return _shieldPromptDeserialize(result);
}

export function _detectTextProtectedMaterialSend(
  context: Client,
  body: DetectTextProtectedMaterialOptions,
  options: DetectTextProtectedMaterialOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/text:detectProtectedMaterial{?api%2Dversion}",
    {
      "api%2Dversion": context.apiVersion ?? "2026-10-15-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: detectTextProtectedMaterialOptionsSerializer(body),
    });
}

export async function _detectTextProtectedMaterialDeserialize(
  result: PathUncheckedResponse,
): Promise<DetectTextProtectedMaterialResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return detectTextProtectedMaterialResultDeserializer(result.body);
}

/** A synchronous API for detecting protected material in the given text. */
export async function detectTextProtectedMaterial(
  context: Client,
  body: DetectTextProtectedMaterialOptions,
  options: DetectTextProtectedMaterialOptionalParams = { requestOptions: {} },
): Promise<DetectTextProtectedMaterialResult> {
  const result = await _detectTextProtectedMaterialSend(context, body, options);
  return _detectTextProtectedMaterialDeserialize(result);
}

export function _analyzeTextSend(
  context: Client,
  body: AnalyzeTextOptions,
  options: AnalyzeTextOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/text:analyze{?api%2Dversion}",
    {
      "api%2Dversion": context.apiVersion ?? "2026-10-15-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: analyzeTextOptionsSerializer(body),
    });
}

export async function _analyzeTextDeserialize(
  result: PathUncheckedResponse,
): Promise<AnalyzeTextResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return analyzeTextResultDeserializer(result.body);
}

/** A synchronous API for the analysis of potentially harmful text content. Currently, it supports four categories: Hate, SelfHarm, Sexual, and Violence. */
export async function analyzeText(
  context: Client,
  body: AnalyzeTextOptions,
  options: AnalyzeTextOptionalParams = { requestOptions: {} },
): Promise<AnalyzeTextResult> {
  const result = await _analyzeTextSend(context, body, options);
  return _analyzeTextDeserialize(result);
}

export function _analyzeImageSend(
  context: Client,
  body: AnalyzeImageOptions,
  options: AnalyzeImageOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/image:analyze{?api%2Dversion}",
    {
      "api%2Dversion": context.apiVersion ?? "2026-10-15-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: analyzeImageOptionsSerializer(body),
    });
}

export async function _analyzeImageDeserialize(
  result: PathUncheckedResponse,
): Promise<AnalyzeImageResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return analyzeImageResultDeserializer(result.body);
}

/** A synchronous API for the analysis of potentially harmful image content. Currently, it supports four categories: Hate, SelfHarm, Sexual, and Violence. */
export async function analyzeImage(
  context: Client,
  body: AnalyzeImageOptions,
  options: AnalyzeImageOptionalParams = { requestOptions: {} },
): Promise<AnalyzeImageResult> {
  const result = await _analyzeImageSend(context, body, options);
  return _analyzeImageDeserialize(result);
}

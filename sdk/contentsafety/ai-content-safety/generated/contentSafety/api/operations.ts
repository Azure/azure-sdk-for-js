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
  agentVerdictUnionDeserializer,
  AgentVerdictUnion,
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
    "/content:unifiedModerate{?api%2Dversion,targetResourceId,policyId}",
    {
      "api%2Dversion": context.apiVersion ?? "2026-10-15-preview",
      targetResourceId: options?.targetResourceId,
      policyId: options?.policyId,
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
): Promise<AgentVerdictUnion> {
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

  return agentVerdictUnionDeserializer(result.body);
}

/** Synchronously evaluate a canonical Agent Hooks 0.1 context against authorized effective policy. This version evolves Unified Moderate on its existing route and supports all eight interception points. Azure AI Content Safety composes the applicable selected, bound, subscription and hierarchy policies within this evaluation and returns a complete Verdict. The calling host owns composition across independent interceptors, transform application, final enforcement, approvals, timeouts and audit. policyId selects an authorized policy and targetResourceId selects an authorized binding target; provide at least one. Applicable mandatory policies cannot be bypassed by either selector. Body identity metadata is not authorization. Request and response limits are 1,048,576 decoded UTF-8 JSON bytes and container depth 64 including the root. Over-limit results are errors, not truncated successful verdicts. */
export async function unifiedModerate(
  context: Client,
  body: AgentContextUnion,
  options: UnifiedModerateOptionalParams = { requestOptions: {} },
): Promise<AgentVerdictUnion> {
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

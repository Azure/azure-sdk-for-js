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
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
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

export function _shieldPromptSend(
  context: Client,
  body: ShieldPromptOptions,
  options: ShieldPromptOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/text:shieldPrompt{?api%2Dversion}",
    {
      "api%2Dversion": context.apiVersion ?? "2024-09-01",
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
      "api%2Dversion": context.apiVersion ?? "2024-09-01",
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
      "api%2Dversion": context.apiVersion ?? "2024-09-01",
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
      "api%2Dversion": context.apiVersion ?? "2024-09-01",
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

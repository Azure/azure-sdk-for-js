// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContentProvenanceContext as Client } from "./index.js";
import {
  DetectProvenanceOptions,
  detectProvenanceOptionsSerializer,
  DetectProvenanceResult,
  detectProvenanceResultDeserializer,
  ProvenanceDetectOperation,
  provenanceDetectOperationDeserializer,
} from "../../models/models.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import { GetOperationStatusOptionalParams, DetectOptionalParams } from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _getOperationStatusSend(
  context: Client,
  operationId: string,
  options: GetOperationStatusOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/operations/{operationId}{?api%2Dversion}",
    {
      operationId: operationId,
      "api%2Dversion": context.apiVersion ?? "2026-07-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getOperationStatusDeserialize(
  result: PathUncheckedResponse,
): Promise<ProvenanceDetectOperation> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return provenanceDetectOperationDeserializer(result.body);
}
/** Gets the status, result, or error of an asynchronous Content Provenance Detection operation. */
export async function getOperationStatus(
  context: Client,
  operationId: string,
  options: GetOperationStatusOptionalParams = { requestOptions: {} },
): Promise<ProvenanceDetectOperation> {
  const result = await _getOperationStatusSend(context, operationId, options);
  return _getOperationStatusDeserialize(result);
}

export function _detectSend(
  context: Client,
  options: DetectProvenanceOptions,
  optionalParams: DetectOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    ":detect{?api%2Dversion}",
    {
      "api%2Dversion": context.apiVersion ?? "2026-07-01-preview",
    },
    {
      allowReserved: optionalParams?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(optionalParams),
    contentType: "application/json",
    headers: { accept: "application/json", ...optionalParams.requestOptions?.headers },
    body: detectProvenanceOptionsSerializer(options),
  });
}

export async function _detectDeserialize(
  result: PathUncheckedResponse,
): Promise<DetectProvenanceResult> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  if (result?.body?.result === undefined) {
    throw createRestError(
      `Expected a result in the response at position "result.body.result"`,
      result,
    );
  }

  return detectProvenanceResultDeserializer(result.body.result);
}
/** Starts an asynchronous Content Provenance Detection operation that inspects the supplied media for Microsoft-issued C2PA and imperceptible watermark signals indicating the content was created or modified using AI. */
export function detect(
  context: Client,
  options: DetectProvenanceOptions,
  optionalParams: DetectOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<DetectProvenanceResult>, DetectProvenanceResult> {
  return getLongRunningPoller(context, _detectDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: optionalParams?.updateIntervalInMs,
    abortSignal: optionalParams?.abortSignal,
    getInitialResponse: () => _detectSend(context, options, optionalParams),
    resourceLocationConfig: "operation-location",
    apiVersion: context.apiVersion ?? "2026-07-01-preview",
  }) as PollerLike<OperationState<DetectProvenanceResult>, DetectProvenanceResult>;
}

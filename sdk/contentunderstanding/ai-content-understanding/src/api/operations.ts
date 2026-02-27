// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ContentUnderstandingContext as Client } from "./index.js";
import type {
  AnalysisInput,
  AnalysisResult,
  ContentAnalyzerAnalyzeOperationStatus,
  ContentAnalyzer,
  ContentAnalyzerOperationStatus,
  ContentUnderstandingDefaults,
  CopyAuthorization,
  _PagedContentAnalyzer,
} from "../models/models.js";
import {
  analysisInputArraySerializer,
  analysisResultDeserializer,
  contentAnalyzerAnalyzeOperationStatusDeserializer,
  contentAnalyzerSerializer,
  contentAnalyzerDeserializer,
  contentAnalyzerOperationStatusDeserializer,
  contentUnderstandingDefaultsDeserializer,
  copyAuthorizationDeserializer,
  recordMergePatchUpdateSerializer,
  _pagedContentAnalyzerDeserializer,
} from "../models/models.js";
import type { PagedAsyncIterableIterator } from "../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../static-helpers/pollingHelpers.js";
import { getBinaryResponse } from "../static-helpers/serialization/get-binary-response.js";
import { expandUrlTemplate } from "../static-helpers/urlTemplate.js";
import type {
  UpdateDefaultsOptionalParams,
  UpdateAnalyzerOptionalParams,
  ListAnalyzersOptionalParams,
  GrantCopyAuthorizationOptionalParams,
  GetResultFileOptionalParams,
  GetResultOptionalParams,
  GetOperationStatusOptionalParams,
  GetDefaultsOptionalParams,
  GetAnalyzerOptionalParams,
  DeleteResultOptionalParams,
  DeleteAnalyzerOptionalParams,
  CreateAnalyzerOptionalParams,
  CopyAnalyzerOptionalParams,
  AnalyzeBinaryOptionalParams,
  AnalyzeOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _updateDefaultsSend(
  context: Client,
  options: UpdateDefaultsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/defaults{?api%2Dversion}",
    {
      "api%2Dversion": context.apiVersion ?? "2025-11-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/merge-patch+json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: {
      modelDeployments: !options?.modelDeployments
        ? options?.modelDeployments
        : recordMergePatchUpdateSerializer(options?.modelDeployments),
    },
  });
}

export async function _updateDefaultsDeserialize(
  result: PathUncheckedResponse,
): Promise<ContentUnderstandingDefaults> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return contentUnderstandingDefaultsDeserializer(result.body);
}

/** Update default settings for this Content Understanding resource. */
export async function updateDefaults(
  context: Client,
  options: UpdateDefaultsOptionalParams = { requestOptions: {} },
): Promise<ContentUnderstandingDefaults> {
  const result = await _updateDefaultsSend(context, options);
  return _updateDefaultsDeserialize(result);
}

export function _updateAnalyzerSend(
  context: Client,
  analyzerId: string,
  resource: ContentAnalyzer,
  options: UpdateAnalyzerOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/analyzers/{analyzerId}{?api%2Dversion}",
    {
      analyzerId: analyzerId,
      "api%2Dversion": context.apiVersion ?? "2025-11-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/merge-patch+json",
    headers: {
      ...(options?.clientRequestId !== undefined
        ? { "x-ms-client-request-id": options?.clientRequestId }
        : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: contentAnalyzerSerializer(resource),
  });
}

export async function _updateAnalyzerDeserialize(
  result: PathUncheckedResponse,
): Promise<ContentAnalyzer> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return contentAnalyzerDeserializer(result.body);
}

/** Update analyzer properties. */
export async function updateAnalyzer(
  context: Client,
  analyzerId: string,
  resource: ContentAnalyzer,
  options: UpdateAnalyzerOptionalParams = { requestOptions: {} },
): Promise<ContentAnalyzer> {
  const result = await _updateAnalyzerSend(context, analyzerId, resource, options);
  return _updateAnalyzerDeserialize(result);
}

export function _listAnalyzersSend(
  context: Client,
  options: ListAnalyzersOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/analyzers{?api%2Dversion}",
    {
      "api%2Dversion": context.apiVersion ?? "2025-11-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.clientRequestId !== undefined
        ? { "x-ms-client-request-id": options?.clientRequestId }
        : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listAnalyzersDeserialize(
  result: PathUncheckedResponse,
): Promise<_PagedContentAnalyzer> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _pagedContentAnalyzerDeserializer(result.body);
}

/** List analyzers. */
export function listAnalyzers(
  context: Client,
  options: ListAnalyzersOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ContentAnalyzer> {
  return buildPagedAsyncIterator(
    context,
    () => _listAnalyzersSend(context, options),
    _listAnalyzersDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-11-01" },
  );
}

export function _grantCopyAuthorizationSend(
  context: Client,
  analyzerId: string,
  targetAzureResourceId: string,
  options: GrantCopyAuthorizationOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/analyzers/{analyzerId}:grantCopyAuthorization{?api%2Dversion}",
    {
      analyzerId: analyzerId,
      "api%2Dversion": context.apiVersion ?? "2025-11-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      ...(options?.clientRequestId !== undefined
        ? { "x-ms-client-request-id": options?.clientRequestId }
        : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: { targetAzureResourceId: targetAzureResourceId, targetRegion: options?.targetRegion },
  });
}

export async function _grantCopyAuthorizationDeserialize(
  result: PathUncheckedResponse,
): Promise<CopyAuthorization> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return copyAuthorizationDeserializer(result.body);
}

/** Get authorization for copying this analyzer to another location. */
export async function grantCopyAuthorization(
  context: Client,
  analyzerId: string,
  targetAzureResourceId: string,
  options: GrantCopyAuthorizationOptionalParams = { requestOptions: {} },
): Promise<CopyAuthorization> {
  const result = await _grantCopyAuthorizationSend(
    context,
    analyzerId,
    targetAzureResourceId,
    options,
  );
  return _grantCopyAuthorizationDeserialize(result);
}

export function _getResultFileSend(
  context: Client,
  operationId: string,
  path: string,
  options: GetResultFileOptionalParams = { requestOptions: {} },
): StreamableMethod {
  // CUSTOMIZATION: EMITTER-FIX: Renamed `path` to `urlPath` to avoid shadowing the function parameter `path`
  const urlPath = expandUrlTemplate(
    "/analyzerResults/{operationId}/files/{+path}{?api%2Dversion}",
    {
      operationId: operationId,
      path: path,
      "api%2Dversion": context.apiVersion ?? "2025-11-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(urlPath).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "*/*", ...options.requestOptions?.headers },
  });
}

export async function _getResultFileDeserialize(
  result: PathUncheckedResponse,
): Promise<Uint8Array> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return result.body;
}

/** Get a file associated with the result of an analysis operation. */
export async function getResultFile(
  context: Client,
  operationId: string,
  path: string,
  options: GetResultFileOptionalParams = { requestOptions: {} },
): Promise<Uint8Array> {
  const streamableMethod = _getResultFileSend(context, operationId, path, options);
  const result = await getBinaryResponse(streamableMethod);
  return _getResultFileDeserialize(result);
}

export function _getResultSend(
  context: Client,
  operationId: string,
  options: GetResultOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/analyzerResults/{operationId}{?api%2Dversion}",
    {
      operationId: operationId,
      "api%2Dversion": context.apiVersion ?? "2025-11-01",
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

export async function _getResultDeserialize(
  result: PathUncheckedResponse,
): Promise<ContentAnalyzerAnalyzeOperationStatus> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return contentAnalyzerAnalyzeOperationStatusDeserializer(result.body);
}

/** Get the result of an analysis operation. */
export async function getResult(
  context: Client,
  operationId: string,
  options: GetResultOptionalParams = { requestOptions: {} },
): Promise<ContentAnalyzerAnalyzeOperationStatus> {
  const result = await _getResultSend(context, operationId, options);
  return _getResultDeserialize(result);
}

export function _getOperationStatusSend(
  context: Client,
  analyzerId: string,
  operationId: string,
  options: GetOperationStatusOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/analyzers/{analyzerId}/operations/{operationId}{?api%2Dversion}",
    {
      analyzerId: analyzerId,
      operationId: operationId,
      "api%2Dversion": context.apiVersion ?? "2025-11-01",
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
): Promise<ContentAnalyzerOperationStatus> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return contentAnalyzerOperationStatusDeserializer(result.body);
}

/** Get the status of an analyzer creation operation. */
export async function getOperationStatus(
  context: Client,
  analyzerId: string,
  operationId: string,
  options: GetOperationStatusOptionalParams = { requestOptions: {} },
): Promise<ContentAnalyzerOperationStatus> {
  const result = await _getOperationStatusSend(context, analyzerId, operationId, options);
  return _getOperationStatusDeserialize(result);
}

export function _getDefaultsSend(
  context: Client,
  options: GetDefaultsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/defaults{?api%2Dversion}",
    {
      "api%2Dversion": context.apiVersion ?? "2025-11-01",
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

export async function _getDefaultsDeserialize(
  result: PathUncheckedResponse,
): Promise<ContentUnderstandingDefaults> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return contentUnderstandingDefaultsDeserializer(result.body);
}

/** Return default settings for this Content Understanding resource. */
export async function getDefaults(
  context: Client,
  options: GetDefaultsOptionalParams = { requestOptions: {} },
): Promise<ContentUnderstandingDefaults> {
  const result = await _getDefaultsSend(context, options);
  return _getDefaultsDeserialize(result);
}

export function _getAnalyzerSend(
  context: Client,
  analyzerId: string,
  options: GetAnalyzerOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/analyzers/{analyzerId}{?api%2Dversion}",
    {
      analyzerId: analyzerId,
      "api%2Dversion": context.apiVersion ?? "2025-11-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.clientRequestId !== undefined
        ? { "x-ms-client-request-id": options?.clientRequestId }
        : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getAnalyzerDeserialize(
  result: PathUncheckedResponse,
): Promise<ContentAnalyzer> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return contentAnalyzerDeserializer(result.body);
}

/** Get analyzer properties. */
export async function getAnalyzer(
  context: Client,
  analyzerId: string,
  options: GetAnalyzerOptionalParams = { requestOptions: {} },
): Promise<ContentAnalyzer> {
  const result = await _getAnalyzerSend(context, analyzerId, options);
  return _getAnalyzerDeserialize(result);
}

export function _deleteResultSend(
  context: Client,
  operationId: string,
  options: DeleteResultOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/analyzerResults/{operationId}{?api%2Dversion}",
    {
      operationId: operationId,
      "api%2Dversion": context.apiVersion ?? "2025-11-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteResultDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** Mark the result of an analysis operation for deletion. */
export async function deleteResult(
  context: Client,
  operationId: string,
  options: DeleteResultOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteResultSend(context, operationId, options);
  return _deleteResultDeserialize(result);
}

export function _deleteAnalyzerSend(
  context: Client,
  analyzerId: string,
  options: DeleteAnalyzerOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/analyzers/{analyzerId}{?api%2Dversion}",
    {
      analyzerId: analyzerId,
      "api%2Dversion": context.apiVersion ?? "2025-11-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.clientRequestId !== undefined
        ? { "x-ms-client-request-id": options?.clientRequestId }
        : {}),
      ...options.requestOptions?.headers,
    },
  });
}

export async function _deleteAnalyzerDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** Delete analyzer. */
export async function deleteAnalyzer(
  context: Client,
  analyzerId: string,
  options: DeleteAnalyzerOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteAnalyzerSend(context, analyzerId, options);
  return _deleteAnalyzerDeserialize(result);
}

export function _createAnalyzerSend(
  context: Client,
  analyzerId: string,
  resource: ContentAnalyzer,
  options: CreateAnalyzerOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/analyzers/{analyzerId}{?api%2Dversion,allowReplace}",
    {
      analyzerId: analyzerId,
      "api%2Dversion": context.apiVersion ?? "2025-11-01",
      allowReplace: options?.allowReplace,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      ...(options?.clientRequestId !== undefined
        ? { "x-ms-client-request-id": options?.clientRequestId }
        : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: contentAnalyzerSerializer(resource),
  });
}

export async function _createAnalyzerDeserialize(
  result: PathUncheckedResponse,
): Promise<ContentAnalyzer> {
  const expectedStatuses = ["201", "200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return contentAnalyzerDeserializer(result.body);
}

/** Create a new analyzer asynchronously. */
export function createAnalyzer(
  context: Client,
  analyzerId: string,
  resource: ContentAnalyzer,
  options: CreateAnalyzerOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ContentAnalyzer>, ContentAnalyzer> {
  return getLongRunningPoller(context, _createAnalyzerDeserialize, ["201", "200", "202"], {
    // CUSTOMIZATION: SDK-IMPROVEMENT: Default polling interval to 3 seconds (generated code defaults to 2 seconds).
    updateIntervalInMs: options?.updateIntervalInMs ?? 3000,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _createAnalyzerSend(context, analyzerId, resource, options),
    resourceLocationConfig: "original-uri",
    apiVersion: context.apiVersion ?? "2025-11-01",
  }) as PollerLike<OperationState<ContentAnalyzer>, ContentAnalyzer>;
}

export function _copyAnalyzerSend(
  context: Client,
  analyzerId: string,
  sourceAnalyzerId: string,
  options: CopyAnalyzerOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/analyzers/{analyzerId}:copy{?api%2Dversion,allowReplace}",
    {
      analyzerId: analyzerId,
      "api%2Dversion": context.apiVersion ?? "2025-11-01",
      allowReplace: options?.allowReplace,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      ...(options?.clientRequestId !== undefined
        ? { "x-ms-client-request-id": options?.clientRequestId }
        : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: {
      sourceAzureResourceId: options?.sourceAzureResourceId,
      sourceRegion: options?.sourceRegion,
      sourceAnalyzerId: sourceAnalyzerId,
    },
  });
}

export async function _copyAnalyzerDeserialize(
  result: PathUncheckedResponse,
): Promise<ContentAnalyzer> {
  const expectedStatuses = ["201", "200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  if (result?.body?.result === undefined) {
    throw createRestError(
      `Expected a result in the response at position "result.body.result"`,
      result,
    );
  }

  return contentAnalyzerDeserializer(result.body.result);
}

/** Create a copy of the source analyzer to the current location. */
export function copyAnalyzer(
  context: Client,
  analyzerId: string,
  sourceAnalyzerId: string,
  options: CopyAnalyzerOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ContentAnalyzer>, ContentAnalyzer> {
  return getLongRunningPoller(context, _copyAnalyzerDeserialize, ["201", "200", "202"], {
    // CUSTOMIZATION: SDK-IMPROVEMENT: Default polling interval to 3 seconds (generated code defaults to 2 seconds).
    updateIntervalInMs: options?.updateIntervalInMs ?? 3000,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _copyAnalyzerSend(context, analyzerId, sourceAnalyzerId, options),
    resourceLocationConfig: "operation-location",
    apiVersion: context.apiVersion ?? "2025-11-01",
  }) as PollerLike<OperationState<ContentAnalyzer>, ContentAnalyzer>;
}

// CUSTOMIZATION: SDK-IMPROVEMENT: `_analyzeBinarySend` and `analyzeBinary` signatures differ from generated code:
// - Generated has: (context, analyzerId, input, stringEncoding, contentType, options)
// - Custom has: (context, analyzerId, input, contentType, options)
// `stringEncoding` is removed as a positional param and passed via options instead, so the custom
// ContentUnderstandingClient can always inject `"utf16"` internally.
// Also fixes generated bug: `body: binaryInput` (wrong var name, should be `input`).
export function _analyzeBinarySend(
  context: Client,
  analyzerId: string,
  input: Uint8Array,
  contentType: string,
  options: AnalyzeBinaryOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/analyzers/{analyzerId}:analyzeBinary{?api%2Dversion,stringEncoding,processingLocation,range}",
    {
      analyzerId: analyzerId,
      "api%2Dversion": context.apiVersion ?? "2025-11-01",
      stringEncoding: options?.stringEncoding,
      processingLocation: options?.processingLocation,
      range: options?.contentRange,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: contentType,
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: input,
  });
}

export async function _analyzeBinaryDeserialize(
  result: PathUncheckedResponse,
): Promise<AnalysisResult> {
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

  return analysisResultDeserializer(result.body.result);
}

/** Extract content and fields from input. */
export function analyzeBinary(
  context: Client,
  analyzerId: string,
  input: Uint8Array,
  contentType: string,
  options: AnalyzeBinaryOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<AnalysisResult>, AnalysisResult> {
  return getLongRunningPoller(context, _analyzeBinaryDeserialize, ["202", "200", "201"], {
    // CUSTOMIZATION: SDK-IMPROVEMENT: Default polling interval to 3 seconds (generated code defaults to 2 seconds).
    updateIntervalInMs: options?.updateIntervalInMs ?? 3000,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _analyzeBinarySend(context, analyzerId, input, contentType, options),
    resourceLocationConfig: "operation-location",
    apiVersion: context.apiVersion ?? "2025-11-01",
  }) as PollerLike<OperationState<AnalysisResult>, AnalysisResult>;
}

// CUSTOMIZATION: SDK-IMPROVEMENT: `_analyzeSend` and `analyze` signatures differ from generated code:
// - Generated has: (context, analyzerId, inputs, stringEncoding, options)
// - Custom has: (context, analyzerId, inputs, options)
// `stringEncoding` is removed as a positional param and passed via options instead,
// so the custom ContentUnderstandingClient can always inject `"utf16"` internally.
export function _analyzeSend(
  context: Client,
  analyzerId: string,
  inputs: AnalysisInput[],
  options: AnalyzeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/analyzers/{analyzerId}:analyze{?api%2Dversion,stringEncoding,processingLocation}",
    {
      analyzerId: analyzerId,
      "api%2Dversion": context.apiVersion ?? "2025-11-01",
      stringEncoding: options?.stringEncoding,
      processingLocation: options?.processingLocation,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: {
      inputs: analysisInputArraySerializer(inputs),
      modelDeployments: options?.modelDeployments,
    },
  });
}

export async function _analyzeDeserialize(result: PathUncheckedResponse): Promise<AnalysisResult> {
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

  return analysisResultDeserializer(result.body.result);
}

/** Extract content and fields from input. */
export function analyze(
  context: Client,
  analyzerId: string,
  inputs: AnalysisInput[],
  options: AnalyzeOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<AnalysisResult>, AnalysisResult> {
  return getLongRunningPoller(context, _analyzeDeserialize, ["202", "200", "201"], {
    // CUSTOMIZATION: SDK-IMPROVEMENT: Default polling interval to 3 seconds (generated code defaults to 2 seconds).
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _analyzeSend(context, analyzerId, inputs, options),
    resourceLocationConfig: "operation-location",
    apiVersion: context.apiVersion ?? "2025-11-01",
  }) as PollerLike<OperationState<AnalysisResult>, AnalysisResult>;
}

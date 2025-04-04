// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AIProjectContext as Client } from "../index.js";
import {
  PendingUploadRequest,
  pendingUploadRequestSerializer,
  PendingUploadResponse,
  pendingUploadResponseDeserializer,
  _PagedEvaluationResult,
  _pagedEvaluationResultDeserializer,
  EvaluationResult,
  evaluationResultSerializer,
  evaluationResultDeserializer,
} from "../../models/models.js";
import {
  EvaluationResultsStartPendingUploadOptionalParams,
  EvaluationResultsCreateVersionOptionalParams,
  EvaluationResultsCreateOptionalParams,
  EvaluationResultsDeleteVersionOptionalParams,
  EvaluationResultsGetVersionOptionalParams,
  EvaluationResultsListLatestOptionalParams,
  EvaluationResultsListVersionsOptionalParams,
} from "./options.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _startPendingUploadSend(
  context: Client,
  name: string,
  version: string,
  body: PendingUploadRequest,
  options: EvaluationResultsStartPendingUploadOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/evaluationResults/{name}/versions/{version}/startPendingUpload{?api%2Dversion}",
    {
      name: name,
      version: version,
      "api%2Dversion": context.apiVersion,
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
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      body: pendingUploadRequestSerializer(body),
    });
}

export async function _startPendingUploadDeserialize(
  result: PathUncheckedResponse,
): Promise<PendingUploadResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return pendingUploadResponseDeserializer(result.body);
}

/** Create or start a pending upload of a evaluation results for a specific version. */
export async function startPendingUpload(
  context: Client,
  name: string,
  version: string,
  body: PendingUploadRequest,
  options: EvaluationResultsStartPendingUploadOptionalParams = {
    requestOptions: {},
  },
): Promise<PendingUploadResponse> {
  const result = await _startPendingUploadSend(
    context,
    name,
    version,
    body,
    options,
  );
  return _startPendingUploadDeserialize(result);
}

export function _createVersionSend(
  context: Client,
  name: string,
  version: string,
  body: EvaluationResult,
  options: EvaluationResultsCreateVersionOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/evaluationResults/{name}/versions/{version}{?api%2Dversion}",
    {
      name: name,
      version: version,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .put({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      body: evaluationResultSerializer(body),
    });
}

export async function _createVersionDeserialize(
  result: PathUncheckedResponse,
): Promise<EvaluationResult> {
  const expectedStatuses = ["201", "200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return evaluationResultDeserializer(result.body);
}

/** Create a new or replace an existing EvaluationResult with the given version id */
export async function createVersion(
  context: Client,
  name: string,
  version: string,
  body: EvaluationResult,
  options: EvaluationResultsCreateVersionOptionalParams = {
    requestOptions: {},
  },
): Promise<EvaluationResult> {
  const result = await _createVersionSend(
    context,
    name,
    version,
    body,
    options,
  );
  return _createVersionDeserialize(result);
}

export function _createSend(
  context: Client,
  name: string,
  body: EvaluationResult,
  options: EvaluationResultsCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/evaluationResults/{name}/versions{?api%2Dversion}",
    {
      name: name,
      "api%2Dversion": context.apiVersion,
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
      headers: {
        ...(options?.repeatabilityRequestId !== undefined
          ? { "Repeatability-Request-ID": options?.repeatabilityRequestId }
          : {}),
        ...(options?.repeatabilityFirstSent !== undefined
          ? {
              "Repeatability-First-Sent": !options?.repeatabilityFirstSent
                ? options?.repeatabilityFirstSent
                : options?.repeatabilityFirstSent.toUTCString(),
            }
          : {}),
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      body: evaluationResultSerializer(body),
    });
}

export async function _createDeserialize(
  result: PathUncheckedResponse,
): Promise<EvaluationResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return evaluationResultDeserializer(result.body);
}

/** Create a new EvaluationResult. The version id will be generated by the service. */
export async function create(
  context: Client,
  name: string,
  body: EvaluationResult,
  options: EvaluationResultsCreateOptionalParams = { requestOptions: {} },
): Promise<EvaluationResult> {
  const result = await _createSend(context, name, body, options);
  return _createDeserialize(result);
}

export function _deleteVersionSend(
  context: Client,
  name: string,
  version: string,
  options: EvaluationResultsDeleteVersionOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/evaluationResults/{name}/versions/{version}{?api%2Dversion}",
    {
      name: name,
      version: version,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .delete({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _deleteVersionDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** Delete the specific version of the EvaluationResult */
export async function deleteVersion(
  context: Client,
  name: string,
  version: string,
  options: EvaluationResultsDeleteVersionOptionalParams = {
    requestOptions: {},
  },
): Promise<void> {
  const result = await _deleteVersionSend(context, name, version, options);
  return _deleteVersionDeserialize(result);
}

export function _getVersionSend(
  context: Client,
  name: string,
  version: string,
  options: EvaluationResultsGetVersionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/evaluationResults/{name}/versions/{version}{?api%2Dversion}",
    {
      name: name,
      version: version,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _getVersionDeserialize(
  result: PathUncheckedResponse,
): Promise<EvaluationResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return evaluationResultDeserializer(result.body);
}

/** Get the specific version of the EvaluationResult */
export async function getVersion(
  context: Client,
  name: string,
  version: string,
  options: EvaluationResultsGetVersionOptionalParams = { requestOptions: {} },
): Promise<EvaluationResult> {
  const result = await _getVersionSend(context, name, version, options);
  return _getVersionDeserialize(result);
}

export function _listLatestSend(
  context: Client,
  options: EvaluationResultsListLatestOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/evaluationResults{?api%2Dversion,top,skip,tags,listViewType}",
    {
      "api%2Dversion": context.apiVersion,
      top: options?.top,
      skip: options?.skip,
      tags: options?.tags,
      listViewType: options?.listViewType,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _listLatestDeserialize(
  result: PathUncheckedResponse,
): Promise<_PagedEvaluationResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _pagedEvaluationResultDeserializer(result.body);
}

/** List the latest version of each EvaluationResult */
export function listLatest(
  context: Client,
  options: EvaluationResultsListLatestOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<EvaluationResult> {
  return buildPagedAsyncIterator(
    context,
    () => _listLatestSend(context, options),
    _listLatestDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _listVersionsSend(
  context: Client,
  name: string,
  options: EvaluationResultsListVersionsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/evaluationResults/{name}/versions{?api%2Dversion,top,skip,tags,listViewType}",
    {
      name: name,
      "api%2Dversion": context.apiVersion,
      top: options?.top,
      skip: options?.skip,
      tags: options?.tags,
      listViewType: options?.listViewType,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _listVersionsDeserialize(
  result: PathUncheckedResponse,
): Promise<_PagedEvaluationResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _pagedEvaluationResultDeserializer(result.body);
}

/** List all versions of the given EvaluationResult */
export function listVersions(
  context: Client,
  name: string,
  options: EvaluationResultsListVersionsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<EvaluationResult> {
  return buildPagedAsyncIterator(
    context,
    () => _listVersionsSend(context, name, options),
    _listVersionsDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

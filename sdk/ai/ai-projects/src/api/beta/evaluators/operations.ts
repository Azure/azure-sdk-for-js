// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AIProjectContext as Client } from "../../index.js";
import type {
  _PagedEvaluatorVersion,
  PendingUploadRequest,
  PendingUploadResponse,
  DatasetCredential,
  EvaluatorCredentialRequest,
  EvaluatorVersion,
} from "../../../models/models.js";
import {
  apiErrorResponseDeserializer,
  datasetCredentialDeserializer,
  evaluatorCredentialRequestSerializer,
  evaluatorVersionSerializer,
  evaluatorVersionDeserializer,
  pendingUploadRequestSerializer,
  pendingUploadResponseDeserializer,
  _pagedEvaluatorVersionDeserializer,
} from "../../../models/models.js";
import type { PagedAsyncIterableIterator } from "@azure/core-paging";
import { buildPagedAsyncIterator } from "../../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../../static-helpers/urlTemplate.js";
import type {
  BetaEvaluatorsGetCredentialsOptionalParams,
  BetaEvaluatorsStartPendingUploadOptionalParams,
  BetaEvaluatorsUpdateVersionOptionalParams,
  BetaEvaluatorsCreateVersionOptionalParams,
  BetaEvaluatorsDeleteVersionOptionalParams,
  BetaEvaluatorsGetVersionOptionalParams,
  BetaEvaluatorsListLatestVersionsOptionalParams,
  BetaEvaluatorsListVersionsOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _getCredentialsSend(
  context: Client,
  name: string,
  credentialRequest: EvaluatorCredentialRequest,
  version: string,
  options: BetaEvaluatorsGetCredentialsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/evaluators/{name}/versions/{version}/credentials{?api-version}",
    {
      name: name,
      version: version,
      "api-version": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      ...(options?.foundryFeatures !== undefined
        ? { "foundry-features": options?.foundryFeatures }
        : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: evaluatorCredentialRequestSerializer(credentialRequest),
  });
}

export async function _getCredentialsDeserialize(
  result: PathUncheckedResponse,
): Promise<DatasetCredential> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorResponseDeserializer(result.body);

    throw error;
  }

  return datasetCredentialDeserializer(result.body);
}

/** Get the SAS credential to access the storage account associated with an Evaluator version. */
export async function getCredentials(
  context: Client,
  name: string,
  credentialRequest: EvaluatorCredentialRequest,
  version: string,
  options: BetaEvaluatorsGetCredentialsOptionalParams = { requestOptions: {} },
): Promise<DatasetCredential> {
  const result = await _getCredentialsSend(context, name, credentialRequest, version, options);
  return _getCredentialsDeserialize(result);
}

export function _startPendingUploadSend(
  context: Client,
  name: string,
  version: string,
  pendingUploadRequest: PendingUploadRequest,
  options: BetaEvaluatorsStartPendingUploadOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/evaluators/{name}/versions/{version}/startPendingUpload{?api-version}",
    {
      name: name,
      version: version,
      "api-version": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      ...(options?.foundryFeatures !== undefined
        ? { "foundry-features": options?.foundryFeatures }
        : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: pendingUploadRequestSerializer(pendingUploadRequest),
  });
}

export async function _startPendingUploadDeserialize(
  result: PathUncheckedResponse,
): Promise<PendingUploadResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorResponseDeserializer(result.body);

    throw error;
  }

  return pendingUploadResponseDeserializer(result.body);
}

/** Start a new or get an existing pending upload of an evaluator for a specific version. */
export async function startPendingUpload(
  context: Client,
  name: string,
  version: string,
  pendingUploadRequest: PendingUploadRequest,
  options: BetaEvaluatorsStartPendingUploadOptionalParams = { requestOptions: {} },
): Promise<PendingUploadResponse> {
  const result = await _startPendingUploadSend(
    context,
    name,
    version,
    pendingUploadRequest,
    options,
  );
  return _startPendingUploadDeserialize(result);
}

export function _updateVersionSend(
  context: Client,
  name: string,
  version: string,
  evaluatorVersion: EvaluatorVersion,
  options: BetaEvaluatorsUpdateVersionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const foundryFeatures = "Evaluations=V1Preview";
  const path = expandUrlTemplate(
    "/evaluators/{name}/versions/{version}{?api-version}",
    {
      name: name,
      version: version,
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      "foundry-features": foundryFeatures,
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: evaluatorVersionSerializer(evaluatorVersion),
  });
}

export async function _updateVersionDeserialize(
  result: PathUncheckedResponse,
): Promise<EvaluatorVersion> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return evaluatorVersionDeserializer(result.body);
}

/** Update an existing EvaluatorVersion with the given version id */
export async function updateVersion(
  context: Client,
  name: string,
  version: string,
  evaluatorVersion: EvaluatorVersion,
  options: BetaEvaluatorsUpdateVersionOptionalParams = { requestOptions: {} },
): Promise<EvaluatorVersion> {
  const result = await _updateVersionSend(context, name, version, evaluatorVersion, options);
  return _updateVersionDeserialize(result);
}

export function _createVersionSend(
  context: Client,
  name: string,
  evaluatorVersion: EvaluatorVersion,
  options: BetaEvaluatorsCreateVersionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const foundryFeatures = "Evaluations=V1Preview";
  const path = expandUrlTemplate(
    "/evaluators/{name}/versions{?api-version}",
    {
      name: name,
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      "foundry-features": foundryFeatures,
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: evaluatorVersionSerializer(evaluatorVersion),
  });
}

export async function _createVersionDeserialize(
  result: PathUncheckedResponse,
): Promise<EvaluatorVersion> {
  const expectedStatuses = ["201"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return evaluatorVersionDeserializer(result.body);
}

/** Create a new EvaluatorVersion with auto incremented version id */
export async function createVersion(
  context: Client,
  name: string,
  evaluatorVersion: EvaluatorVersion,
  options: BetaEvaluatorsCreateVersionOptionalParams = { requestOptions: {} },
): Promise<EvaluatorVersion> {
  const result = await _createVersionSend(context, name, evaluatorVersion, options);
  return _createVersionDeserialize(result);
}

export function _deleteVersionSend(
  context: Client,
  name: string,
  version: string,
  options: BetaEvaluatorsDeleteVersionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const foundryFeatures = "Evaluations=V1Preview";
  const path = expandUrlTemplate(
    "/evaluators/{name}/versions/{version}{?api-version}",
    {
      name: name,
      version: version,
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({
    ...operationOptionsToRequestParameters(options),
    headers: { "foundry-features": foundryFeatures, ...options.requestOptions?.headers },
  });
}

export async function _deleteVersionDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** Delete the specific version of the EvaluatorVersion. The service returns 204 No Content if the EvaluatorVersion was deleted successfully or if the EvaluatorVersion does not exist. */
export async function deleteVersion(
  context: Client,
  name: string,
  version: string,
  options: BetaEvaluatorsDeleteVersionOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteVersionSend(context, name, version, options);
  return _deleteVersionDeserialize(result);
}

export function _getVersionSend(
  context: Client,
  name: string,
  version: string,
  options: BetaEvaluatorsGetVersionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const foundryFeatures = "Evaluations=V1Preview";
  const path = expandUrlTemplate(
    "/evaluators/{name}/versions/{version}{?api-version}",
    {
      name: name,
      version: version,
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      "foundry-features": foundryFeatures,
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getVersionDeserialize(
  result: PathUncheckedResponse,
): Promise<EvaluatorVersion> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return evaluatorVersionDeserializer(result.body);
}

/** Get the specific version of the EvaluatorVersion. The service returns 404 Not Found error if the EvaluatorVersion does not exist. */
export async function getVersion(
  context: Client,
  name: string,
  version: string,
  options: BetaEvaluatorsGetVersionOptionalParams = { requestOptions: {} },
): Promise<EvaluatorVersion> {
  const result = await _getVersionSend(context, name, version, options);
  return _getVersionDeserialize(result);
}

export function _listLatestVersionsSend(
  context: Client,
  options: BetaEvaluatorsListLatestVersionsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const foundryFeatures = "Evaluations=V1Preview";
  const path = expandUrlTemplate(
    "/evaluators{?api-version,type,limit}",
    {
      "api-version": context.apiVersion,
      type: options?.evaluatorType as any,
      limit: options?.limit,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      "foundry-features": foundryFeatures,
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listLatestVersionsDeserialize(
  result: PathUncheckedResponse,
): Promise<_PagedEvaluatorVersion> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _pagedEvaluatorVersionDeserializer(result.body);
}

/** List the latest version of each evaluator */
export function listLatestVersions(
  context: Client,
  options: BetaEvaluatorsListLatestVersionsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<EvaluatorVersion> {
  return buildPagedAsyncIterator(
    context,
    () => _listLatestVersionsSend(context, options),
    _listLatestVersionsDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion,
      nextPageRequestOptions: {
        headers: {
          "foundry-features": "Evaluations=V1Preview",
        },
      },
    },
  );
}

export function _listVersionsSend(
  context: Client,
  name: string,
  options: BetaEvaluatorsListVersionsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const foundryFeatures = "Evaluations=V1Preview";
  const path = expandUrlTemplate(
    "/evaluators/{name}/versions{?api-version,type,limit}",
    {
      name: name,
      "api-version": context.apiVersion,
      type: options?.evaluatorType as any,
      limit: options?.limit,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      "foundry-features": foundryFeatures,
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listVersionsDeserialize(
  result: PathUncheckedResponse,
): Promise<_PagedEvaluatorVersion> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _pagedEvaluatorVersionDeserializer(result.body);
}

/** List all versions of the given evaluator */
export function listVersions(
  context: Client,
  name: string,
  options: BetaEvaluatorsListVersionsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<EvaluatorVersion> {
  return buildPagedAsyncIterator(
    context,
    () => _listVersionsSend(context, name, options),
    _listVersionsDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion,
      nextPageRequestOptions: {
        headers: {
          "foundry-features": "Evaluations=V1Preview",
        },
      },
    },
  );
}

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AIProjectContext as Client } from "../../index.js";
import {
  PendingUploadRequest,
  pendingUploadRequestSerializer,
  PendingUploadResponse,
  pendingUploadResponseDeserializer,
  DatasetCredential,
  datasetCredentialDeserializer,
  _PagedEvaluatorVersion,
  _pagedEvaluatorVersionDeserializer,
  EvaluatorVersion,
  evaluatorVersionSerializer,
  evaluatorVersionDeserializer,
  EvaluatorCredentialRequest,
  evaluatorCredentialRequestSerializer,
} from "../../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../../static-helpers/urlTemplate.js";
import {
  BetaEvaluatorsGetCredentialsOptionalParams,
  BetaEvaluatorsPendingUploadOptionalParams,
  BetaEvaluatorsUpdateVersionOptionalParams,
  BetaEvaluatorsCreateVersionOptionalParams,
  BetaEvaluatorsDeleteVersionOptionalParams,
  BetaEvaluatorsGetVersionOptionalParams,
  BetaEvaluatorsListOptionalParams,
  BetaEvaluatorsListVersionsOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _getCredentialsSend(
  context: Client,
  name: string,
  foundryFeatures: "Evaluations=V1Preview",
  credentialRequest: EvaluatorCredentialRequest,
  version: string,
  options: BetaEvaluatorsGetCredentialsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/evaluators/{name}/versions/{version}/credentials{?api%2Dversion}",
    {
      name: name,
      version: version,
      "api%2Dversion": context.apiVersion ?? "v1",
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
        "foundry-features": foundryFeatures,
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
    throw createRestError(result);
  }

  return datasetCredentialDeserializer(result.body);
}

/** Get the SAS credential to access the storage account associated with an Evaluator version. */
export async function getCredentials(
  context: Client,
  name: string,
  foundryFeatures: "Evaluations=V1Preview",
  credentialRequest: EvaluatorCredentialRequest,
  version: string,
  options: BetaEvaluatorsGetCredentialsOptionalParams = { requestOptions: {} },
): Promise<DatasetCredential> {
  const result = await _getCredentialsSend(
    context,
    name,
    foundryFeatures,
    credentialRequest,
    version,
    options,
  );
  return _getCredentialsDeserialize(result);
}

export function _pendingUploadSend(
  context: Client,
  name: string,
  foundryFeatures: "Evaluations=V1Preview",
  pendingUploadRequest: PendingUploadRequest,
  version: string,
  options: BetaEvaluatorsPendingUploadOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/evaluators/{name}/versions/{version}/startPendingUpload{?api%2Dversion}",
    {
      name: name,
      version: version,
      "api%2Dversion": context.apiVersion ?? "v1",
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
        "foundry-features": foundryFeatures,
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      body: pendingUploadRequestSerializer(pendingUploadRequest),
    });
}

export async function _pendingUploadDeserialize(
  result: PathUncheckedResponse,
): Promise<PendingUploadResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return pendingUploadResponseDeserializer(result.body);
}

/** Start a new or get an existing pending upload of an evaluator for a specific version. */
export async function pendingUpload(
  context: Client,
  name: string,
  foundryFeatures: "Evaluations=V1Preview",
  pendingUploadRequest: PendingUploadRequest,
  version: string,
  options: BetaEvaluatorsPendingUploadOptionalParams = { requestOptions: {} },
): Promise<PendingUploadResponse> {
  const result = await _pendingUploadSend(
    context,
    name,
    foundryFeatures,
    pendingUploadRequest,
    version,
    options,
  );
  return _pendingUploadDeserialize(result);
}

export function _updateVersionSend(
  context: Client,
  name: string,
  foundryFeatures: "Evaluations=V1Preview",
  version: string,
  evaluatorVersion: EvaluatorVersion,
  options: BetaEvaluatorsUpdateVersionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/evaluators/{name}/versions/{version}{?api%2Dversion}",
    {
      name: name,
      version: version,
      "api%2Dversion": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .patch({
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
  foundryFeatures: "Evaluations=V1Preview",
  version: string,
  evaluatorVersion: EvaluatorVersion,
  options: BetaEvaluatorsUpdateVersionOptionalParams = { requestOptions: {} },
): Promise<EvaluatorVersion> {
  const result = await _updateVersionSend(
    context,
    name,
    foundryFeatures,
    version,
    evaluatorVersion,
    options,
  );
  return _updateVersionDeserialize(result);
}

export function _createVersionSend(
  context: Client,
  name: string,
  foundryFeatures: "Evaluations=V1Preview",
  evaluatorVersion: EvaluatorVersion,
  options: BetaEvaluatorsCreateVersionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/evaluators/{name}/versions{?api%2Dversion}",
    {
      name: name,
      "api%2Dversion": context.apiVersion ?? "v1",
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
  foundryFeatures: "Evaluations=V1Preview",
  evaluatorVersion: EvaluatorVersion,
  options: BetaEvaluatorsCreateVersionOptionalParams = { requestOptions: {} },
): Promise<EvaluatorVersion> {
  const result = await _createVersionSend(
    context,
    name,
    foundryFeatures,
    evaluatorVersion,
    options,
  );
  return _createVersionDeserialize(result);
}

export function _deleteVersionSend(
  context: Client,
  name: string,
  foundryFeatures: "Evaluations=V1Preview",
  version: string,
  options: BetaEvaluatorsDeleteVersionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/evaluators/{name}/versions/{version}{?api%2Dversion}",
    {
      name: name,
      version: version,
      "api%2Dversion": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .delete({
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
  foundryFeatures: "Evaluations=V1Preview",
  version: string,
  options: BetaEvaluatorsDeleteVersionOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteVersionSend(context, name, foundryFeatures, version, options);
  return _deleteVersionDeserialize(result);
}

export function _getVersionSend(
  context: Client,
  name: string,
  foundryFeatures: "Evaluations=V1Preview",
  version: string,
  options: BetaEvaluatorsGetVersionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/evaluators/{name}/versions/{version}{?api%2Dversion}",
    {
      name: name,
      version: version,
      "api%2Dversion": context.apiVersion ?? "v1",
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
  foundryFeatures: "Evaluations=V1Preview",
  version: string,
  options: BetaEvaluatorsGetVersionOptionalParams = { requestOptions: {} },
): Promise<EvaluatorVersion> {
  const result = await _getVersionSend(context, name, foundryFeatures, version, options);
  return _getVersionDeserialize(result);
}

export function _listSend(
  context: Client,
  foundryFeatures: "Evaluations=V1Preview",
  options: BetaEvaluatorsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/evaluators{?api%2Dversion,type,limit}",
    {
      "api%2Dversion": context.apiVersion ?? "v1",
      type: options?.typeParam as any,
      limit: options?.limit,
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
        "foundry-features": foundryFeatures,
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_PagedEvaluatorVersion> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _pagedEvaluatorVersionDeserializer(result.body);
}

/** List the latest version of each evaluator */
export function list(
  context: Client,
  foundryFeatures: "Evaluations=V1Preview",
  options: BetaEvaluatorsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<EvaluatorVersion> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, foundryFeatures, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "v1" },
  );
}

export function _listVersionsSend(
  context: Client,
  name: string,
  foundryFeatures: "Evaluations=V1Preview",
  options: BetaEvaluatorsListVersionsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/evaluators/{name}/versions{?api%2Dversion,type,limit}",
    {
      name: name,
      "api%2Dversion": context.apiVersion ?? "v1",
      type: options?.typeParam as any,
      limit: options?.limit,
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
  foundryFeatures: "Evaluations=V1Preview",
  options: BetaEvaluatorsListVersionsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<EvaluatorVersion> {
  return buildPagedAsyncIterator(
    context,
    () => _listVersionsSend(context, name, foundryFeatures, options),
    _listVersionsDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "v1" },
  );
}

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AIProjectContext as Client } from "../../index.js";
import {
  DatasetCredential,
  datasetCredentialDeserializer,
  _PagedModelVersion,
  _pagedModelVersionDeserializer,
  ModelVersion,
  modelVersionSerializer,
  modelVersionDeserializer,
  UpdateModelVersionRequest,
  updateModelVersionRequestSerializer,
  _createAsyncResponseDeserializer,
  ModelPendingUploadRequest,
  modelPendingUploadRequestSerializer,
  ModelPendingUploadResponse,
  modelPendingUploadResponseDeserializer,
  ModelCredentialRequest,
  modelCredentialRequestSerializer,
} from "../../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../../static-helpers/urlTemplate.js";
import {
  BetaModelsGetCredentialsOptionalParams,
  BetaModelsPendingUploadOptionalParams,
  BetaModelsCreateAsyncOptionalParams,
  BetaModelsUpdateOptionalParams,
  BetaModelsDeleteOptionalParams,
  BetaModelsGetOptionalParams,
  BetaModelsListOptionalParams,
  BetaModelsListVersionsOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _getCredentialsSend(
  context: Client,
  foundryFeatures: "Models=V1Preview",
  name: string,
  version: string,
  body: ModelCredentialRequest,
  options: BetaModelsGetCredentialsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/models/{name}/versions/{version}/credentials{?api%2Dversion}",
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
      body: modelCredentialRequestSerializer(body),
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

/** Get credentials for a model version asset. */
export async function getCredentials(
  context: Client,
  foundryFeatures: "Models=V1Preview",
  name: string,
  version: string,
  body: ModelCredentialRequest,
  options: BetaModelsGetCredentialsOptionalParams = { requestOptions: {} },
): Promise<DatasetCredential> {
  const result = await _getCredentialsSend(context, foundryFeatures, name, version, body, options);
  return _getCredentialsDeserialize(result);
}

export function _pendingUploadSend(
  context: Client,
  foundryFeatures: "Models=V1Preview",
  name: string,
  version: string,
  body: ModelPendingUploadRequest,
  options: BetaModelsPendingUploadOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/models/{name}/versions/{version}/startPendingUpload{?api%2Dversion}",
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
      body: modelPendingUploadRequestSerializer(body),
    });
}

export async function _pendingUploadDeserialize(
  result: PathUncheckedResponse,
): Promise<ModelPendingUploadResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return modelPendingUploadResponseDeserializer(result.body);
}

/** Start or retrieve a pending upload for a model version. */
export async function pendingUpload(
  context: Client,
  foundryFeatures: "Models=V1Preview",
  name: string,
  version: string,
  body: ModelPendingUploadRequest,
  options: BetaModelsPendingUploadOptionalParams = { requestOptions: {} },
): Promise<ModelPendingUploadResponse> {
  const result = await _pendingUploadSend(context, foundryFeatures, name, version, body, options);
  return _pendingUploadDeserialize(result);
}

export function _createAsyncSend(
  context: Client,
  foundryFeatures: "Models=V1Preview",
  name: string,
  version: string,
  body: ModelVersion,
  options: BetaModelsCreateAsyncOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/models/{name}/versions/{version}/createAsync{?api%2Dversion}",
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
      body: modelVersionSerializer(body),
    });
}

export async function _createAsyncDeserialize(result: PathUncheckedResponse): Promise<{
  location?: string;
  operationResult?: string | null;
}> {
  const expectedStatuses = ["202"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _createAsyncResponseDeserializer(result.body);
}

/** Creates a model version asynchronously with blob content validation. Returns 202 Accepted with a Location header for polling. */
export async function createAsync(
  context: Client,
  foundryFeatures: "Models=V1Preview",
  name: string,
  version: string,
  body: ModelVersion,
  options: BetaModelsCreateAsyncOptionalParams = { requestOptions: {} },
): Promise<{
  location?: string;
  operationResult?: string | null;
}> {
  const result = await _createAsyncSend(context, foundryFeatures, name, version, body, options);
  return _createAsyncDeserialize(result);
}

export function _updateSend(
  context: Client,
  name: string,
  body: UpdateModelVersionRequest,
  version: string,
  foundryFeatures: "Models=V1Preview",
  options: BetaModelsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/models/{name}/versions/{version}{?api%2Dversion}",
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
      contentType: "application/merge-patch+json",
      headers: {
        "foundry-features": foundryFeatures,
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      body: updateModelVersionRequestSerializer(body),
    });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<ModelVersion> {
  const expectedStatuses = ["201", "200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return modelVersionDeserializer(result.body);
}

/** Update an existing ModelVersion with the given version id */
export async function update(
  context: Client,
  name: string,
  body: UpdateModelVersionRequest,
  version: string,
  foundryFeatures: "Models=V1Preview",
  options: BetaModelsUpdateOptionalParams = { requestOptions: {} },
): Promise<ModelVersion> {
  const result = await _updateSend(context, name, body, version, foundryFeatures, options);
  return _updateDeserialize(result);
}

export function _$deleteSend(
  context: Client,
  name: string,
  foundryFeatures: "Models=V1Preview",
  version: string,
  options: BetaModelsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/models/{name}/versions/{version}{?api%2Dversion}",
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

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** Delete the specific version of the ModelVersion. The service returns 200 OK if the ModelVersion was deleted successfully or if the ModelVersion does not exist. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  name: string,
  foundryFeatures: "Models=V1Preview",
  version: string,
  options: BetaModelsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, name, foundryFeatures, version, options);
  return _$deleteDeserialize(result);
}

export function _getSend(
  context: Client,
  name: string,
  foundryFeatures: "Models=V1Preview",
  version: string,
  options: BetaModelsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/models/{name}/versions/{version}{?api%2Dversion}",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<ModelVersion> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return modelVersionDeserializer(result.body);
}

/** Get the specific version of the ModelVersion. The service returns 404 Not Found error if the ModelVersion does not exist. */
export async function get(
  context: Client,
  name: string,
  foundryFeatures: "Models=V1Preview",
  version: string,
  options: BetaModelsGetOptionalParams = { requestOptions: {} },
): Promise<ModelVersion> {
  const result = await _getSend(context, name, foundryFeatures, version, options);
  return _getDeserialize(result);
}

export function _listSend(
  context: Client,
  foundryFeatures: "Models=V1Preview",
  options: BetaModelsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/models{?api%2Dversion}",
    {
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

export async function _listDeserialize(result: PathUncheckedResponse): Promise<_PagedModelVersion> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _pagedModelVersionDeserializer(result.body);
}

/** List the latest version of each ModelVersion */
export function list(
  context: Client,
  foundryFeatures: "Models=V1Preview",
  options: BetaModelsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ModelVersion> {
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
  foundryFeatures: "Models=V1Preview",
  options: BetaModelsListVersionsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/models/{name}/versions{?api%2Dversion}",
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
): Promise<_PagedModelVersion> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _pagedModelVersionDeserializer(result.body);
}

/** List all versions of the given ModelVersion */
export function listVersions(
  context: Client,
  name: string,
  foundryFeatures: "Models=V1Preview",
  options: BetaModelsListVersionsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ModelVersion> {
  return buildPagedAsyncIterator(
    context,
    () => _listVersionsSend(context, name, foundryFeatures, options),
    _listVersionsDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "v1" },
  );
}

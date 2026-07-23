// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AIProjectContext as Client } from "../../index.js";
import type {
  DatasetCredential,
  _PagedModelVersion,
  ModelVersion,
  UpdateModelVersionRequest,
  ModelPendingUploadRequest,
  ModelPendingUploadResponse,
  ModelCredentialRequest,
} from "../../../models/models.js";
import {
  datasetCredentialDeserializer,
  _pagedModelVersionDeserializer,
  modelVersionSerializer,
  modelVersionDeserializer,
  updateModelVersionRequestSerializer,
  _createAsyncResponseDeserializer,
  modelPendingUploadRequestSerializer,
  modelPendingUploadResponseDeserializer,
  modelCredentialRequestSerializer,
} from "../../../models/models.js";
import type { PagedAsyncIterableIterator } from "@azure/core-paging";
import { buildPagedAsyncIterator } from "../../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../../static-helpers/urlTemplate.js";
import type {
  BetaModelsGetCredentialsOptionalParams,
  BetaModelsPendingUploadOptionalParams,
  BetaModelsPendingCreateVersionOptionalParams,
  BetaModelsCreateFromSourceOptions,
  BetaModelsUpdateOptionalParams,
  BetaModelsDeleteOptionalParams,
  BetaModelsGetOptionalParams,
  BetaModelsListOptionalParams,
  BetaModelsListVersionsOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import { BlobServiceClient } from "@azure/storage-blob";
import fs from "node:fs";
import nodePath from "node:path";

export function _getCredentialsSend(
  context: Client,
  name: string,
  version: string,
  credentialRequest: ModelCredentialRequest,
  options: BetaModelsGetCredentialsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const foundryFeatures = "Models=V1Preview";
  const path = expandUrlTemplate(
    "/models/{name}/versions/{version}/credentials{?api-version}",
    {
      name: name,
      version: version,
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
    body: modelCredentialRequestSerializer(credentialRequest),
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

/** Retrieves temporary credentials for accessing the storage backing the specified model version. */
export async function getCredentials(
  context: Client,
  name: string,
  version: string,
  credentialRequest: ModelCredentialRequest,
  options: BetaModelsGetCredentialsOptionalParams = { requestOptions: {} },
): Promise<DatasetCredential> {
  const result = await _getCredentialsSend(context, name, version, credentialRequest, options);
  return _getCredentialsDeserialize(result);
}

export function _pendingUploadSend(
  context: Client,
  name: string,
  version: string,
  pendingUploadRequest: ModelPendingUploadRequest,
  options: BetaModelsPendingUploadOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const foundryFeatures = "Models=V1Preview";
  const path = expandUrlTemplate(
    "/models/{name}/versions/{version}/startPendingUpload{?api-version}",
    {
      name: name,
      version: version,
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
    body: modelPendingUploadRequestSerializer(pendingUploadRequest),
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

/** Initiates a new pending upload or retrieves an existing one for the specified model version. */
export async function pendingUpload(
  context: Client,
  name: string,
  version: string,
  pendingUploadRequest: ModelPendingUploadRequest,
  options: BetaModelsPendingUploadOptionalParams = { requestOptions: {} },
): Promise<ModelPendingUploadResponse> {
  const result = await _pendingUploadSend(context, name, version, pendingUploadRequest, options);
  return _pendingUploadDeserialize(result);
}

export function _pendingCreateVersionSend(
  context: Client,
  name: string,
  version: string,
  modelVersion: ModelVersion,
  options: BetaModelsPendingCreateVersionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const foundryFeatures = "Models=V1Preview";
  const path = expandUrlTemplate(
    "/models/{name}/versions/{version}/createAsync{?api-version}",
    {
      name: name,
      version: version,
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
    body: modelVersionSerializer(modelVersion),
  });
}

export async function _pendingCreateVersionDeserialize(result: PathUncheckedResponse): Promise<{
  location?: string;
  operationResult?: string | null;
}> {
  const expectedStatuses = ["202"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _createAsyncResponseDeserializer(result.body);
}

/** Creates a model version asynchronously with blob content validation. Returns 202 Accepted with a location header for polling the operation status. */
export async function pendingCreateVersion(
  context: Client,
  name: string,
  version: string,
  modelVersion: ModelVersion,
  options: BetaModelsPendingCreateVersionOptionalParams = { requestOptions: {} },
): Promise<{
  location?: string;
  operationResult?: string | null;
}> {
  const result = await _pendingCreateVersionSend(context, name, version, modelVersion, options);
  return _pendingCreateVersionDeserialize(result);
}

export function _updateSend(
  context: Client,
  name: string,
  modelVersionUpdate: UpdateModelVersionRequest,
  version: string,
  options: BetaModelsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const foundryFeatures = "Models=V1Preview";
  const path = expandUrlTemplate(
    "/models/{name}/versions/{version}{?api-version}",
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
    contentType: "application/merge-patch+json",
    headers: {
      "foundry-features": foundryFeatures,
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: updateModelVersionRequestSerializer(modelVersionUpdate),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<ModelVersion> {
  const expectedStatuses = ["201", "200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return modelVersionDeserializer(result.body);
}

/** Updates an existing model version identified by its version ID. */
export async function update(
  context: Client,
  name: string,
  modelVersionUpdate: UpdateModelVersionRequest,
  version: string,
  options: BetaModelsUpdateOptionalParams = { requestOptions: {} },
): Promise<ModelVersion> {
  const result = await _updateSend(context, name, modelVersionUpdate, version, options);
  return _updateDeserialize(result);
}

export function _$deleteSend(
  context: Client,
  name: string,
  version: string,
  options: BetaModelsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const foundryFeatures = "Models=V1Preview";
  const path = expandUrlTemplate(
    "/models/{name}/versions/{version}{?api-version}",
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

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** Delete the specific version of the ModelVersion. The service returns 200 OK if the ModelVersion was deleted successfully or if the ModelVersion does not exist. */
export async function $delete(
  context: Client,
  name: string,
  version: string,
  options: BetaModelsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, name, version, options);
  return _$deleteDeserialize(result);
}

export function _getSend(
  context: Client,
  name: string,
  version: string,
  options: BetaModelsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const foundryFeatures = "Models=V1Preview";
  const path = expandUrlTemplate(
    "/models/{name}/versions/{version}{?api-version}",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<ModelVersion> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return modelVersionDeserializer(result.body);
}

/** Retrieves the specified model version, returning 404 if it does not exist. */
export async function get(
  context: Client,
  name: string,
  version: string,
  options: BetaModelsGetOptionalParams = { requestOptions: {} },
): Promise<ModelVersion> {
  const result = await _getSend(context, name, version, options);
  return _getDeserialize(result);
}

export function _listSend(
  context: Client,
  options: BetaModelsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const foundryFeatures = "Models=V1Preview";
  const path = expandUrlTemplate(
    "/models{?api-version}",
    {
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
  options: BetaModelsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ModelVersion> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "v1" },
  );
}

export function _listVersionsSend(
  context: Client,
  name: string,
  options: BetaModelsListVersionsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const foundryFeatures = "Models=V1Preview";
  const path = expandUrlTemplate(
    "/models/{name}/versions{?api-version}",
    {
      name: name,
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
  options: BetaModelsListVersionsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ModelVersion> {
  return buildPagedAsyncIterator(
    context,
    () => _listVersionsSend(context, name, options),
    _listVersionsDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "v1" },
  );
}

function getAllFiles(dir: string): string[] {
  const results: string[] = [];
  for (const entry of fs.readdirSync(dir)) {
    const fullPath = nodePath.join(dir, entry);
    if (fs.statSync(fullPath).isDirectory()) {
      results.push(...getAllFiles(fullPath));
    } else {
      results.push(fullPath);
    }
  }
  return results;
}

export async function createFromSource(
  context: Client,
  name: string,
  version: string,
  source: string,
  options: BetaModelsCreateFromSourceOptions = {},
): Promise<ModelVersion> {
  const pollingTimeout = options.pollingTimeout ?? 300_000;
  const pollingInterval = options.pollingInterval ?? 2_000;

  // Step 1: Get a pending upload SAS URL
  const uploadResponse = await pendingUpload(context, name, version, {
    pendingUploadType: "TemporaryBlobReference",
  });

  // Step 2: Upload local files to the blob container
  const containerClient = new BlobServiceClient(
    uploadResponse.blobReference.credential.sasUri,
  ).getContainerClient("");
  const files = getAllFiles(source);
  for (const filePath of files) {
    const blobName = nodePath.relative(source, filePath).replace(/\\/g, "/");
    const data = fs.readFileSync(filePath);
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    await blockBlobClient.upload(data, data.length);
  }

  // Step 3: Trigger async model version creation
  await pendingCreateVersion(context, name, version, {
    blobUri: uploadResponse.blobReference.blobUri,
    weightType: options.weightType,
    baseModel: options.baseModel,
    description: options.description,
    tags: options.tags,
    name,
    version,
  });

  // Step 4: Poll until the model version is available
  const deadline = Date.now() + pollingTimeout;
  while (Date.now() < deadline) {
    try {
      return await get(context, name, version);
    } catch (e: any) {
      if (e.statusCode === 404) {
        await new Promise((resolve) => setTimeout(resolve, pollingInterval));
      } else {
        throw e;
      }
    }
  }
  throw new Error(
    `Model version '${name}@${version}' did not become available within ${pollingTimeout}ms.`,
  );
}

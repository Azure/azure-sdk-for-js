// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/* eslint-disable tsdoc/syntax */

import * as fs from "fs";
import * as nodePath from "path";
import { AIProjectContext as Client } from "../index.js";
import {
  _PagedDatasetVersion,
  _pagedDatasetVersionDeserializer,
  datasetVersionUnionSerializer,
  datasetVersionUnionDeserializer,
  DatasetVersionUnion,
  PendingUploadRequest,
  pendingUploadRequestSerializer,
  PendingUploadResponse,
  pendingUploadResponseDeserializer,
  _getCredentialsRequestSerializer,
  AssetCredentialResponse,
  assetCredentialResponseDeserializer,
} from "../../models/models.js";
import {
  DatasetsGetCredentialsOptionalParams,
  DatasetsPendingUploadOptionalParams,
  DatasetsCreateOrUpdateOptionalParams,
  DatasetsDeleteOptionalParams,
  DatasetsGetOptionalParams,
  DatasetsListOptionalParams,
  DatasetsListVersionsOptionalParams,
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
import { ContainerClient } from "@azure/storage-blob";

export function _getCredentialsSend(
  context: Client,
  name: string,
  version: string,
  body: Record<string, any>,
  options: DatasetsGetCredentialsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/datasets/{name}/versions/{version}/credentials{?api-version}",
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
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: _getCredentialsRequestSerializer(body),
  });
}

export async function _getCredentialsDeserialize(
  result: PathUncheckedResponse,
): Promise<AssetCredentialResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return assetCredentialResponseDeserializer(result.body);
}

/** Get the SAS credential to access the storage account associated with a Dataset version. */
export async function getCredentials(
  context: Client,
  name: string,
  version: string,
  body: Record<string, any>,
  options: DatasetsGetCredentialsOptionalParams = { requestOptions: {} },
): Promise<AssetCredentialResponse> {
  const result = await _getCredentialsSend(context, name, version, body, options);
  return _getCredentialsDeserialize(result);
}

export function _pendingUploadSend(
  context: Client,
  name: string,
  version: string,
  body: PendingUploadRequest,
  options: DatasetsPendingUploadOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/datasets/{name}/versions/{version}/startPendingUpload{?api-version}",
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
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: pendingUploadRequestSerializer(body),
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

/** Start a new or get an existing pending upload of a dataset for a specific version. */
export async function pendingUpload(
  context: Client,
  name: string,
  version: string,
  body: PendingUploadRequest,
  options: DatasetsPendingUploadOptionalParams = { requestOptions: {} },
): Promise<PendingUploadResponse> {
  const result = await _pendingUploadSend(context, name, version, body, options);
  return _pendingUploadDeserialize(result);
}

// Internal helper method to create a new dataset and return a ContainerClient from azure-storage-blob package, to the dataset's blob storage.
async function createDatasetAndGetItsContainer(
  context: Client,
  name: string,
  version: string,
): Promise<{ containerClient: ContainerClient; version: string }> {
  // Start a pending upload to get the container URL with SAS token
  const pendingUploadResponse = await pendingUpload(context, name, version, {
    pendingUploadType: "BlobReference",
  } as PendingUploadRequest);

  const blobReference = pendingUploadResponse.blobReference;
  // Validate the response
  if (!blobReference) {
    throw new Error("Blob reference for consumption is not present");
  }

  if (!blobReference.credential?.type) {
    throw new Error("Credential type is not present");
  }

  if (blobReference.credential.type !== "SAS") {
    throw new Error("Credential type is not SAS");
  }

  if (!blobReference.blobUri) {
    throw new Error("Blob URI is not present or empty");
  }

  // Optional debug logging
  console.debug(
    `[createDatasetAndGetItsContainer] pendingUploadResponse.pendingUploadId = ${pendingUploadResponse.pendingUploadId}`,
  );
  console.debug(
    `[createDatasetAndGetItsContainer] pendingUploadResponse.pendingUploadType = ${pendingUploadResponse.pendingUploadType}`,
  );
  console.debug(
    `[createDatasetAndGetItsContainer] blobReference.blobUri = ${blobReference.blobUri}`,
  );
  console.debug(
    `[createDatasetAndGetItsContainer] blobReference.storageAccountArmId = ${blobReference.storageAccountArmId}`,
  );
  console.debug(
    `[createDatasetAndGetItsContainer] blobReference.credential.sasUri = ${blobReference.credential.sasUri}`,
  );
  console.debug(
    `[createDatasetAndGetItsContainer] blobReference.credential.type = ${blobReference.credential.type}`,
  );

  // Create container client from the blob URI (which includes the SAS token)
  const containerClient = new ContainerClient(blobReference.blobUri);

  return {
    containerClient,
    version,
  };
}

export async function uploadFile(
  context: Client,
  name: string,
  version: string,
  filePath: string,
): Promise<DatasetVersionUnion> {
  // if file does not exist

  const fileExists = fs.existsSync(filePath);
  if (!fileExists) {
    throw new Error(`File does not exist at path: ${filePath}`);
  }
  // Check if the file is a directory
  const isDirectory = fs.lstatSync(filePath).isDirectory();
  if (isDirectory) {
    throw new Error(`The provided file is actually a folder. Use method uploadFolder instead`);
  }

  const { containerClient, version: outputVersion } = await createDatasetAndGetItsContainer(
    context,
    name,
    version,
  );
  // file name as blob name
  const blobName = nodePath.basename(filePath);
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);
  await blockBlobClient.uploadFile(filePath);

  const datasetVersion = await createOrUpdate(context, name, outputVersion, {
    name: name,
    version: outputVersion,
    type: "uri_file",
    dataUri: blockBlobClient.url,
  });
  return datasetVersion;
}

export async function uploadFolder(
  context: Client,
  name: string,
  version: string,
  folderPath: string,
): Promise<DatasetVersionUnion> {
  // Check if the folder exists
  const folderExists = fs.existsSync(folderPath);
  if (!folderExists) {
    throw new Error(`Folder does not exist at path: ${folderPath}`);
  }
  // Check if the folder is a file
  const isFile = fs.lstatSync(folderPath).isFile();
  if (isFile) {
    throw new Error(`The provided path is actually a file. Use method uploadFile instead`);
  }

  const { containerClient, version: outputVersion } = await createDatasetAndGetItsContainer(
    context,
    name,
    version,
  );

  // Helper function to recursively get all files in a directory
  async function getAllFiles(dir: string, fileList: string[] = []): Promise<string[]> {
    const files = await fs.promises.readdir(dir);

    for (const file of files) {
      const filePath = `${dir}/${file}`;
      const stat = await fs.promises.lstat(filePath);

      if (stat.isDirectory()) {
        await getAllFiles(filePath, fileList);
      } else {
        fileList.push(filePath);
      }
    }

    return fileList;
  }

  // Get all files in the folder
  const allFiles = await getAllFiles(folderPath);
  if (allFiles.length === 0) {
    throw new Error("The provided folder is empty.");
  }

  // Upload each file to blob storage while maintaining relative paths
  for (const filePath of allFiles) {
    // Create blob name as relative path from the base folder
    const relativePath = nodePath.relative(folderPath, filePath).split(nodePath.sep).join("/");

    console.debug(
      `[uploadFolderAndCreate] Start uploading file '${filePath}' as blob '${relativePath}'`,
    );

    // Get a block blob client for the relative path
    const blobClient = containerClient.getBlockBlobClient(relativePath);

    // Upload the file using a readable stream for better performance
    const fileStream = fs.createReadStream(filePath);
    await blobClient.uploadStream(fileStream);
    console.debug(
      `[uploadFolderAndCreate] Done uploading file '${filePath}' as blob '${relativePath}'`,
    );
  }

  // Create dataset version that references this folder
  const datasetVersion = await createOrUpdate(context, name, outputVersion, {
    name: name,
    version: outputVersion,
    type: "uri_folder",
    dataUri: containerClient.url,
  });

  return datasetVersion;
}

export function _createOrUpdateSend(
  context: Client,
  name: string,
  version: string,
  body: DatasetVersionUnion,
  options: DatasetsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/datasets/{name}/versions/{version}{?api-version}",
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
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: datasetVersionUnionSerializer(body),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<DatasetVersionUnion> {
  const expectedStatuses = ["201", "200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return datasetVersionUnionDeserializer(result.body);
}

/** Create a new or update an existing DatasetVersion with the given version id */
export async function createOrUpdate(
  context: Client,
  name: string,
  version: string,
  body: DatasetVersionUnion,
  options: DatasetsCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<DatasetVersionUnion> {
  const result = await _createOrUpdateSend(context, name, version, body, options);
  return _createOrUpdateDeserialize(result);
}

export function _$deleteSend(
  context: Client,
  name: string,
  version: string,
  options: DatasetsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/datasets/{name}/versions/{version}{?api-version}",
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
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** Delete the specific version of the DatasetVersion */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  name: string,
  version: string,
  options: DatasetsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, name, version, options);
  return _$deleteDeserialize(result);
}

export function _getSend(
  context: Client,
  name: string,
  version: string,
  options: DatasetsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/datasets/{name}/versions/{version}{?api-version}",
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
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getDeserialize(result: PathUncheckedResponse): Promise<DatasetVersionUnion> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return datasetVersionUnionDeserializer(result.body);
}

/** Get the specific version of the DatasetVersion */
export async function get(
  context: Client,
  name: string,
  version: string,
  options: DatasetsGetOptionalParams = { requestOptions: {} },
): Promise<DatasetVersionUnion> {
  const result = await _getSend(context, name, version, options);
  return _getDeserialize(result);
}

export function _listSend(
  context: Client,
  options: DatasetsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/datasets{?api-version,continuationToken}",
    {
      "api-version": context.apiVersion,
      continuationToken: options?.continuationToken,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_PagedDatasetVersion> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _pagedDatasetVersionDeserializer(result.body);
}

/** List the latest version of each DatasetVersion */
export function list(
  context: Client,
  options: DatasetsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DatasetVersionUnion> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _listVersionsSend(
  context: Client,
  name: string,
  options: DatasetsListVersionsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/datasets/{name}/versions{?api-version,continuationToken}",
    {
      name: name,
      "api-version": context.apiVersion,
      continuationToken: options?.continuationToken,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listVersionsDeserialize(
  result: PathUncheckedResponse,
): Promise<_PagedDatasetVersion> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _pagedDatasetVersionDeserializer(result.body);
}

/** List all versions of the given DatasetVersion */
export function listVersions(
  context: Client,
  name: string,
  options: DatasetsListVersionsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DatasetVersionUnion> {
  return buildPagedAsyncIterator(
    context,
    () => _listVersionsSend(context, name, options),
    _listVersionsDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

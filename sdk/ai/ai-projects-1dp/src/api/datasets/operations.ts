// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

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
  FolderDatasetVersion,
} from "../../models/models.js";
import {
  DatasetsGetCredentialsOptionalParams,
  DatasetsStartPendingUploadVersionOptionalParams,
  DatasetsCreateVersionOptionalParams,
  DatasetsDeleteVersionOptionalParams,
  DatasetsGetVersionOptionalParams,
  DatasetsListLatestOptionalParams,
  DatasetsListVersionsOptionalParams,
  DatasetsUploadFileAndCreateOptionalParams,
  DatasetsUploadFolderAndCreateOptionalParams,
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
    "/datasets/{name}/versions/{version}/credentials{?api%2Dversion}",
    {
      name: name,
      version: version,
      "api%2Dversion": context.apiVersion,
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

/** Get download sas for dataset version. */
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

export function _startPendingUploadVersionSend(
  context: Client,
  name: string,
  version: string,
  body: PendingUploadRequest,
  options: DatasetsStartPendingUploadVersionOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/datasets/{name}/versions/{version}/startPendingUpload{?api%2Dversion}",
    {
      name: name,
      version: version,
      "api%2Dversion": context.apiVersion,
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

export async function _startPendingUploadVersionDeserialize(
  result: PathUncheckedResponse,
): Promise<PendingUploadResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return pendingUploadResponseDeserializer(result.body);
}

/** Start a new or get an existing pending upload of a dataset for a specific version. */
export async function startPendingUploadVersion(
  context: Client,
  name: string,
  version: string,
  body: PendingUploadRequest,
  options: DatasetsStartPendingUploadVersionOptionalParams = {
    requestOptions: {},
  },
): Promise<PendingUploadResponse> {
  const result = await _startPendingUploadVersionSend(context, name, version, body, options);
  return _startPendingUploadVersionDeserialize(result);
}

// Internal helper method to create a new dataset and return a ContainerClient from azure-storage-blob package, to the dataset's blob storage.
async function createDatasetAndGetItsContainer(
  context: Client,
  name: string,
  version: string,
  options?: DatasetsUploadFileAndCreateOptionalParams | DatasetsUploadFolderAndCreateOptionalParams,
): Promise<{ containerClient: ContainerClient; version: string }> {
  // Start a pending upload to get the container URL with SAS token
  const pendingUploadResponse = await startPendingUploadVersion(
    context,
    name,
    version,
    {
      pendingUploadType: "TemporaryBlobReference",
    } as PendingUploadRequest,
    options?.startPendingUploadVersionOptions,
  );

  const blobReference = pendingUploadResponse.blobReferenceForConsumption;
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

export async function uploadFileAndCreate(
  context: Client,
  name: string,
  version: string,
  filePath: string,
  options?: DatasetsUploadFileAndCreateOptionalParams,
): Promise<DatasetVersionUnion> {
  // if file does not exist

  const fileExists = fs.existsSync(filePath);
  if (!fileExists) {
    throw new Error(`File does not exist at path: ${filePath}`);
  }
  // Check if the file is a directory
  const isDirectory = fs.lstatSync(filePath).isDirectory();
  if (isDirectory) {
    throw new Error(
      `The provided file is actually a folder. Use method createAndUploadFolder instead`,
    );
  }

  const { containerClient, version: outputVersion } = await createDatasetAndGetItsContainer(
    context,
    name,
    version,
    options,
  );
  const blobName = filePath.split("/").pop() || filePath;
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);
  await blockBlobClient.uploadFile(filePath);

  const datasetVersion = await createVersion(context, name, outputVersion, {
    name: name,
    version: outputVersion,
    type: "uri_file",
    datasetUri: blockBlobClient.url,
  });
  return datasetVersion;
}

export async function uploadFolderAndCreate(
  context: Client,
  name: string,
  version: string,
  folderPath: string,
  options?: DatasetsUploadFolderAndCreateOptionalParams,
): Promise<DatasetVersionUnion> {
  // Check if the folder exists
  const folderExists = fs.existsSync(folderPath);
  if (!folderExists) {
    throw new Error(`Folder does not exist at path: ${folderPath}`);
  }
  // Check if the folder is a file
  const isFile = fs.lstatSync(folderPath).isFile();
  if (isFile) {
    throw new Error(`The provided path is actually a file. Use method createAndUploadFile instead`);
  }

  const { containerClient, version: outputVersion } = await createDatasetAndGetItsContainer(
    context,
    name,
    version,
    options,
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
  const datasetVersion = await createVersion(context, name, outputVersion, {
    name: name,
    version: outputVersion,
    type: "uri_folder",
    datasetUri: containerClient.url,
  } as FolderDatasetVersion);

  return datasetVersion;
}

export function _createVersionSend(
  context: Client,
  name: string,
  version: string,
  body: DatasetVersionUnion,
  options: DatasetsCreateVersionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/datasets/{name}/versions/{version}{?api%2Dversion}",
    {
      name: name,
      version: version,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: datasetVersionUnionSerializer(body),
  });
}

export async function _createVersionDeserialize(
  result: PathUncheckedResponse,
): Promise<DatasetVersionUnion> {
  const expectedStatuses = ["201", "200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return datasetVersionUnionDeserializer(result.body);
}

/** Create a new or replace an existing DatasetVersion with the given version id */
export async function createVersion(
  context: Client,
  name: string,
  version: string,
  body: DatasetVersionUnion,
  options: DatasetsCreateVersionOptionalParams = { requestOptions: {} },
): Promise<DatasetVersionUnion> {
  const result = await _createVersionSend(context, name, version, body, options);
  return _createVersionDeserialize(result);
}

export function _deleteVersionSend(
  context: Client,
  name: string,
  version: string,
  options: DatasetsDeleteVersionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/datasets/{name}/versions/{version}{?api%2Dversion}",
    {
      name: name,
      version: version,
      "api%2Dversion": context.apiVersion,
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

export async function _deleteVersionDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** Delete the specific version of the DatasetVersion */
export async function deleteVersion(
  context: Client,
  name: string,
  version: string,
  options: DatasetsDeleteVersionOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteVersionSend(context, name, version, options);
  return _deleteVersionDeserialize(result);
}

export function _getVersionSend(
  context: Client,
  name: string,
  version: string,
  options: DatasetsGetVersionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/datasets/{name}/versions/{version}{?api%2Dversion}",
    {
      name: name,
      version: version,
      "api%2Dversion": context.apiVersion,
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

export async function _getVersionDeserialize(
  result: PathUncheckedResponse,
): Promise<DatasetVersionUnion> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return datasetVersionUnionDeserializer(result.body);
}

/** Get the specific version of the DatasetVersion */
export async function getVersion(
  context: Client,
  name: string,
  version: string,
  options: DatasetsGetVersionOptionalParams = { requestOptions: {} },
): Promise<DatasetVersionUnion> {
  const result = await _getVersionSend(context, name, version, options);
  return _getVersionDeserialize(result);
}

export function _listLatestSend(
  context: Client,
  options: DatasetsListLatestOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/datasets{?api%2Dversion,top,skip,tags,listViewType}",
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
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listLatestDeserialize(
  result: PathUncheckedResponse,
): Promise<_PagedDatasetVersion> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _pagedDatasetVersionDeserializer(result.body);
}

/** List the latest version of each DatasetVersion */
export function listLatest(
  context: Client,
  options: DatasetsListLatestOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DatasetVersionUnion> {
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
  options: DatasetsListVersionsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/datasets/{name}/versions{?api%2Dversion,top,skip,tags,listViewType}",
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

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataMigrationManagementContext as Client } from "../index.js";
import {
  apiErrorDeserializer,
  ProjectFile,
  projectFileSerializer,
  projectFileDeserializer,
  _FileList,
  _fileListDeserializer,
  FileStorageInfo,
  fileStorageInfoDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  FilesReadWriteOptionalParams,
  FilesReadOptionalParams,
  FilesListOptionalParams,
  FilesDeleteOptionalParams,
  FilesUpdateOptionalParams,
  FilesCreateOrUpdateOptionalParams,
  FilesGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _readWriteSend(
  context: Client,
  groupName: string,
  serviceName: string,
  projectName: string,
  fileName: string,
  options: FilesReadWriteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{groupName}/providers/Microsoft.DataMigration/services/{serviceName}/projects/{projectName}/files/{fileName}/readwrite{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      groupName: groupName,
      serviceName: serviceName,
      projectName: projectName,
      fileName: fileName,
      "api%2Dversion": context.apiVersion ?? "2025-09-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _readWriteDeserialize(
  result: PathUncheckedResponse,
): Promise<FileStorageInfo> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorDeserializer(result.body);
    }

    throw error;
  }

  return fileStorageInfoDeserializer(result.body);
}

/** This method is used for requesting information for reading and writing the file content. */
export async function readWrite(
  context: Client,
  groupName: string,
  serviceName: string,
  projectName: string,
  fileName: string,
  options: FilesReadWriteOptionalParams = { requestOptions: {} },
): Promise<FileStorageInfo> {
  const result = await _readWriteSend(
    context,
    groupName,
    serviceName,
    projectName,
    fileName,
    options,
  );
  return _readWriteDeserialize(result);
}

export function _readSend(
  context: Client,
  groupName: string,
  serviceName: string,
  projectName: string,
  fileName: string,
  options: FilesReadOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{groupName}/providers/Microsoft.DataMigration/services/{serviceName}/projects/{projectName}/files/{fileName}/read{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      groupName: groupName,
      serviceName: serviceName,
      projectName: projectName,
      fileName: fileName,
      "api%2Dversion": context.apiVersion ?? "2025-09-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _readDeserialize(result: PathUncheckedResponse): Promise<FileStorageInfo> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorDeserializer(result.body);
    }

    throw error;
  }

  return fileStorageInfoDeserializer(result.body);
}

/** This method is used for requesting storage information using which contents of the file can be downloaded. */
export async function read(
  context: Client,
  groupName: string,
  serviceName: string,
  projectName: string,
  fileName: string,
  options: FilesReadOptionalParams = { requestOptions: {} },
): Promise<FileStorageInfo> {
  const result = await _readSend(context, groupName, serviceName, projectName, fileName, options);
  return _readDeserialize(result);
}

export function _listSend(
  context: Client,
  groupName: string,
  serviceName: string,
  projectName: string,
  options: FilesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{groupName}/providers/Microsoft.DataMigration/services/{serviceName}/projects/{projectName}/files{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      groupName: groupName,
      serviceName: serviceName,
      projectName: projectName,
      "api%2Dversion": context.apiVersion ?? "2025-09-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _listDeserialize(result: PathUncheckedResponse): Promise<_FileList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorDeserializer(result.body);
    }

    throw error;
  }

  return _fileListDeserializer(result.body);
}

/** The project resource is a nested resource representing a stored migration project. This method returns a list of files owned by a project resource. */
export function list(
  context: Client,
  groupName: string,
  serviceName: string,
  projectName: string,
  options: FilesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ProjectFile> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, groupName, serviceName, projectName, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-09-01-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  groupName: string,
  serviceName: string,
  projectName: string,
  fileName: string,
  options: FilesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{groupName}/providers/Microsoft.DataMigration/services/{serviceName}/projects/{projectName}/files/{fileName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      groupName: groupName,
      serviceName: serviceName,
      projectName: projectName,
      fileName: fileName,
      "api%2Dversion": context.apiVersion ?? "2025-09-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** This method deletes a file. */
export async function $delete(
  context: Client,
  groupName: string,
  serviceName: string,
  projectName: string,
  fileName: string,
  options: FilesDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(
    context,
    groupName,
    serviceName,
    projectName,
    fileName,
    options,
  );
  return _$deleteDeserialize(result);
}

export function _updateSend(
  context: Client,
  groupName: string,
  serviceName: string,
  projectName: string,
  fileName: string,
  parameters: ProjectFile,
  options: FilesUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{groupName}/providers/Microsoft.DataMigration/services/{serviceName}/projects/{projectName}/files/{fileName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      groupName: groupName,
      serviceName: serviceName,
      projectName: projectName,
      fileName: fileName,
      "api%2Dversion": context.apiVersion ?? "2025-09-01-preview",
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
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: projectFileSerializer(parameters),
    });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<ProjectFile> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorDeserializer(result.body);
    }

    throw error;
  }

  return projectFileDeserializer(result.body);
}

/** This method updates an existing file. */
export async function update(
  context: Client,
  groupName: string,
  serviceName: string,
  projectName: string,
  fileName: string,
  parameters: ProjectFile,
  options: FilesUpdateOptionalParams = { requestOptions: {} },
): Promise<ProjectFile> {
  const result = await _updateSend(
    context,
    groupName,
    serviceName,
    projectName,
    fileName,
    parameters,
    options,
  );
  return _updateDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  groupName: string,
  serviceName: string,
  projectName: string,
  fileName: string,
  parameters: ProjectFile,
  options: FilesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{groupName}/providers/Microsoft.DataMigration/services/{serviceName}/projects/{projectName}/files/{fileName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      groupName: groupName,
      serviceName: serviceName,
      projectName: projectName,
      fileName: fileName,
      "api%2Dversion": context.apiVersion ?? "2025-09-01-preview",
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
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: projectFileSerializer(parameters),
    });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<ProjectFile> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorDeserializer(result.body);
    }

    throw error;
  }

  return projectFileDeserializer(result.body);
}

/** The PUT method creates a new file or updates an existing one. */
export async function createOrUpdate(
  context: Client,
  groupName: string,
  serviceName: string,
  projectName: string,
  fileName: string,
  parameters: ProjectFile,
  options: FilesCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<ProjectFile> {
  const result = await _createOrUpdateSend(
    context,
    groupName,
    serviceName,
    projectName,
    fileName,
    parameters,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  groupName: string,
  serviceName: string,
  projectName: string,
  fileName: string,
  options: FilesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{groupName}/providers/Microsoft.DataMigration/services/{serviceName}/projects/{projectName}/files/{fileName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      groupName: groupName,
      serviceName: serviceName,
      projectName: projectName,
      fileName: fileName,
      "api%2Dversion": context.apiVersion ?? "2025-09-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _getDeserialize(result: PathUncheckedResponse): Promise<ProjectFile> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorDeserializer(result.body);
    }

    throw error;
  }

  return projectFileDeserializer(result.body);
}

/** The files resource is a nested, proxy-only resource representing a file stored under the project resource. This method retrieves information about a file. */
export async function get(
  context: Client,
  groupName: string,
  serviceName: string,
  projectName: string,
  fileName: string,
  options: FilesGetOptionalParams = { requestOptions: {} },
): Promise<ProjectFile> {
  const result = await _getSend(context, groupName, serviceName, projectName, fileName, options);
  return _getDeserialize(result);
}

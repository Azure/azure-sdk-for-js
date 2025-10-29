// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ContainerRegistryManagementContext as Client } from "../index.js";
import type { Archive, ArchiveUpdateParameters, _ArchiveListResult } from "../../models/models.js";
import {
  errorResponseDeserializer,
  archiveSerializer,
  archiveDeserializer,
  archiveUpdateParametersSerializer,
  _archiveListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ArchivesListOptionalParams,
  ArchivesDeleteOptionalParams,
  ArchivesUpdateOptionalParams,
  ArchivesCreateOptionalParams,
  ArchivesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  registryName: string,
  packageType: string,
  options: ArchivesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerRegistry/registries/{registryName}/packages/{packageType}/archives{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      registryName: registryName,
      packageType: packageType,
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

export async function _listDeserialize(result: PathUncheckedResponse): Promise<_ArchiveListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _archiveListResultDeserializer(result.body);
}

/** Lists all archives for the specified container registry and package type. */
export function list(
  context: Client,
  resourceGroupName: string,
  registryName: string,
  packageType: string,
  options: ArchivesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Archive> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, registryName, packageType, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  registryName: string,
  packageType: string,
  archiveName: string,
  options: ArchivesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerRegistry/registries/{registryName}/packages/{packageType}/archives/{archiveName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      registryName: registryName,
      packageType: packageType,
      archiveName: archiveName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "204", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Deletes a archive from a container registry. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  registryName: string,
  packageType: string,
  archiveName: string,
  options: ArchivesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, registryName, packageType, archiveName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  registryName: string,
  packageType: string,
  archiveName: string,
  archiveUpdateParameters: ArchiveUpdateParameters,
  options: ArchivesUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerRegistry/registries/{registryName}/packages/{packageType}/archives/{archiveName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      registryName: registryName,
      packageType: packageType,
      archiveName: archiveName,
      "api%2Dversion": context.apiVersion,
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
    body: archiveUpdateParametersSerializer(archiveUpdateParameters),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<Archive> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return archiveDeserializer(result.body);
}

/** Updates a archive for a container registry with the specified parameters. */
export async function update(
  context: Client,
  resourceGroupName: string,
  registryName: string,
  packageType: string,
  archiveName: string,
  archiveUpdateParameters: ArchiveUpdateParameters,
  options: ArchivesUpdateOptionalParams = { requestOptions: {} },
): Promise<Archive> {
  const result = await _updateSend(
    context,
    resourceGroupName,
    registryName,
    packageType,
    archiveName,
    archiveUpdateParameters,
    options,
  );
  return _updateDeserialize(result);
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  registryName: string,
  packageType: string,
  archiveName: string,
  archiveCreateParameters: Archive,
  options: ArchivesCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerRegistry/registries/{registryName}/packages/{packageType}/archives/{archiveName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      registryName: registryName,
      packageType: packageType,
      archiveName: archiveName,
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
    body: archiveSerializer(archiveCreateParameters),
  });
}

export async function _createDeserialize(result: PathUncheckedResponse): Promise<Archive> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return archiveDeserializer(result.body);
}

/** Creates a archive for a container registry with the specified parameters. */
export function create(
  context: Client,
  resourceGroupName: string,
  registryName: string,
  packageType: string,
  archiveName: string,
  archiveCreateParameters: Archive,
  options: ArchivesCreateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Archive>, Archive> {
  return getLongRunningPoller(context, _createDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createSend(
        context,
        resourceGroupName,
        registryName,
        packageType,
        archiveName,
        archiveCreateParameters,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<Archive>, Archive>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  registryName: string,
  packageType: string,
  archiveName: string,
  options: ArchivesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerRegistry/registries/{registryName}/packages/{packageType}/archives/{archiveName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      registryName: registryName,
      packageType: packageType,
      archiveName: archiveName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<Archive> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return archiveDeserializer(result.body);
}

/** Gets the properties of the archive. */
export async function get(
  context: Client,
  resourceGroupName: string,
  registryName: string,
  packageType: string,
  archiveName: string,
  options: ArchivesGetOptionalParams = { requestOptions: {} },
): Promise<Archive> {
  const result = await _getSend(
    context,
    resourceGroupName,
    registryName,
    packageType,
    archiveName,
    options,
  );
  return _getDeserialize(result);
}

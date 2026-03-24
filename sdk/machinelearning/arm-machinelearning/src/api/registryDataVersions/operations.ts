// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureMachineLearningServicesManagementContext as Client } from "../index.js";
import type {
  PendingUploadRequestDto,
  PendingUploadResponseDto,
  DataVersionBase,
  _DataVersionBaseResourceArmPaginatedResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  pendingUploadRequestDtoSerializer,
  pendingUploadResponseDtoDeserializer,
  dataVersionBaseSerializer,
  dataVersionBaseDeserializer,
  _dataVersionBaseResourceArmPaginatedResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  RegistryDataVersionsCreateOrGetStartPendingUploadOptionalParams,
  RegistryDataVersionsListOptionalParams,
  RegistryDataVersionsDeleteOptionalParams,
  RegistryDataVersionsCreateOrUpdateOptionalParams,
  RegistryDataVersionsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _createOrGetStartPendingUploadSend(
  context: Client,
  resourceGroupName: string,
  registryName: string,
  name: string,
  version: string,
  body: PendingUploadRequestDto,
  options: RegistryDataVersionsCreateOrGetStartPendingUploadOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/registries/{registryName}/data/{name}/versions/{version}/startPendingUpload{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      registryName: registryName,
      name: name,
      version: version,
      "api%2Dversion": context.apiVersion ?? "2025-12-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: pendingUploadRequestDtoSerializer(body),
  });
}

export async function _createOrGetStartPendingUploadDeserialize(
  result: PathUncheckedResponse,
): Promise<PendingUploadResponseDto> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return pendingUploadResponseDtoDeserializer(result.body);
}

/** Generate a storage location and credential for the client to upload a data asset to. */
export async function createOrGetStartPendingUpload(
  context: Client,
  resourceGroupName: string,
  registryName: string,
  name: string,
  version: string,
  body: PendingUploadRequestDto,
  options: RegistryDataVersionsCreateOrGetStartPendingUploadOptionalParams = { requestOptions: {} },
): Promise<PendingUploadResponseDto> {
  const result = await _createOrGetStartPendingUploadSend(
    context,
    resourceGroupName,
    registryName,
    name,
    version,
    body,
    options,
  );
  return _createOrGetStartPendingUploadDeserialize(result);
}

export function _listSend(
  context: Client,
  resourceGroupName: string,
  registryName: string,
  name: string,
  options: RegistryDataVersionsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/registries/{registryName}/data/{name}/versions{?api%2Dversion,%24orderBy,%24top,%24skip,%24tags,listViewType}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      registryName: registryName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-12-01",
      "%24orderBy": options?.orderBy,
      "%24top": options?.top,
      "%24skip": options?.skip,
      "%24tags": options?.tags,
      listViewType: options?.listViewType,
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

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_DataVersionBaseResourceArmPaginatedResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _dataVersionBaseResourceArmPaginatedResultDeserializer(result.body);
}

/** List data versions in the data container */
export function list(
  context: Client,
  resourceGroupName: string,
  registryName: string,
  name: string,
  options: RegistryDataVersionsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DataVersionBase> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, registryName, name, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-12-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  registryName: string,
  name: string,
  version: string,
  options: RegistryDataVersionsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/registries/{registryName}/data/{name}/versions/{version}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      registryName: registryName,
      name: name,
      version: version,
      "api%2Dversion": context.apiVersion ?? "2025-12-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "202", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Delete version. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  registryName: string,
  name: string,
  version: string,
  options: RegistryDataVersionsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, registryName, name, version, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-12-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  registryName: string,
  name: string,
  version: string,
  body: DataVersionBase,
  options: RegistryDataVersionsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/registries/{registryName}/data/{name}/versions/{version}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      registryName: registryName,
      name: name,
      version: version,
      "api%2Dversion": context.apiVersion ?? "2025-12-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: dataVersionBaseSerializer(body),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<DataVersionBase> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return dataVersionBaseDeserializer(result.body);
}

/** Create or update version. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  registryName: string,
  name: string,
  version: string,
  body: DataVersionBase,
  options: RegistryDataVersionsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<DataVersionBase>, DataVersionBase> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, resourceGroupName, registryName, name, version, body, options),
    resourceLocationConfig: "original-uri",
    apiVersion: context.apiVersion ?? "2025-12-01",
  }) as PollerLike<OperationState<DataVersionBase>, DataVersionBase>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  registryName: string,
  name: string,
  version: string,
  options: RegistryDataVersionsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/registries/{registryName}/data/{name}/versions/{version}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      registryName: registryName,
      name: name,
      version: version,
      "api%2Dversion": context.apiVersion ?? "2025-12-01",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<DataVersionBase> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return dataVersionBaseDeserializer(result.body);
}

/** Get version. */
export async function get(
  context: Client,
  resourceGroupName: string,
  registryName: string,
  name: string,
  version: string,
  options: RegistryDataVersionsGetOptionalParams = { requestOptions: {} },
): Promise<DataVersionBase> {
  const result = await _getSend(context, resourceGroupName, registryName, name, version, options);
  return _getDeserialize(result);
}

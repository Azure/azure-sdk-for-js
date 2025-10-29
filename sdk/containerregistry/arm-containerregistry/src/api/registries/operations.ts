// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ContainerRegistryManagementContext as Client } from "../index.js";
import type {
  Registry,
  RegistryUpdateParameters,
  _RegistryListResult,
  ImportImageParameters,
  RegistryUsageListResult,
  RegistryListCredentialsResult,
  RegenerateCredentialParameters,
  GenerateCredentialsParameters,
  GenerateCredentialsResult,
  RegistryNameCheckRequest,
  RegistryNameStatus,
  PrivateLinkResource,
  _PrivateLinkResourceListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  registrySerializer,
  registryDeserializer,
  registryUpdateParametersSerializer,
  _registryListResultDeserializer,
  importImageParametersSerializer,
  registryUsageListResultDeserializer,
  registryListCredentialsResultDeserializer,
  regenerateCredentialParametersSerializer,
  generateCredentialsParametersSerializer,
  generateCredentialsResultDeserializer,
  registryNameCheckRequestSerializer,
  registryNameStatusDeserializer,
  privateLinkResourceDeserializer,
  _privateLinkResourceListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  RegistriesListPrivateLinkResourcesOptionalParams,
  RegistriesGetPrivateLinkResourceOptionalParams,
  RegistriesCheckNameAvailabilityOptionalParams,
  RegistriesGenerateCredentialsOptionalParams,
  RegistriesRegenerateCredentialOptionalParams,
  RegistriesListCredentialsOptionalParams,
  RegistriesListUsagesOptionalParams,
  RegistriesImportImageOptionalParams,
  RegistriesListOptionalParams,
  RegistriesListByResourceGroupOptionalParams,
  RegistriesDeleteOptionalParams,
  RegistriesUpdateOptionalParams,
  RegistriesCreateOptionalParams,
  RegistriesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listPrivateLinkResourcesSend(
  context: Client,
  resourceGroupName: string,
  registryName: string,
  options: RegistriesListPrivateLinkResourcesOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerRegistry/registries/{registryName}/privateLinkResources{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      registryName: registryName,
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

export async function _listPrivateLinkResourcesDeserialize(
  result: PathUncheckedResponse,
): Promise<_PrivateLinkResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _privateLinkResourceListResultDeserializer(result.body);
}

/** Lists the private link resources for a container registry. */
export function listPrivateLinkResources(
  context: Client,
  resourceGroupName: string,
  registryName: string,
  options: RegistriesListPrivateLinkResourcesOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<PrivateLinkResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listPrivateLinkResourcesSend(context, resourceGroupName, registryName, options),
    _listPrivateLinkResourcesDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _getPrivateLinkResourceSend(
  context: Client,
  resourceGroupName: string,
  registryName: string,
  groupName: string,
  options: RegistriesGetPrivateLinkResourceOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerRegistry/registries/{registryName}/privateLinkResources/{groupName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      registryName: registryName,
      groupName: groupName,
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

export async function _getPrivateLinkResourceDeserialize(
  result: PathUncheckedResponse,
): Promise<PrivateLinkResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return privateLinkResourceDeserializer(result.body);
}

/** Gets a private link resource by a specified group name for a container registry. */
export async function getPrivateLinkResource(
  context: Client,
  resourceGroupName: string,
  registryName: string,
  groupName: string,
  options: RegistriesGetPrivateLinkResourceOptionalParams = {
    requestOptions: {},
  },
): Promise<PrivateLinkResource> {
  const result = await _getPrivateLinkResourceSend(
    context,
    resourceGroupName,
    registryName,
    groupName,
    options,
  );
  return _getPrivateLinkResourceDeserialize(result);
}

export function _checkNameAvailabilitySend(
  context: Client,
  registryNameCheckRequest: RegistryNameCheckRequest,
  options: RegistriesCheckNameAvailabilityOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ContainerRegistry/checkNameAvailability{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
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
    body: registryNameCheckRequestSerializer(registryNameCheckRequest),
  });
}

export async function _checkNameAvailabilityDeserialize(
  result: PathUncheckedResponse,
): Promise<RegistryNameStatus> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return registryNameStatusDeserializer(result.body);
}

/** Checks whether the container registry name is available for use. The name must contain only alphanumeric characters, be globally unique, and between 5 and 50 characters in length. */
export async function checkNameAvailability(
  context: Client,
  registryNameCheckRequest: RegistryNameCheckRequest,
  options: RegistriesCheckNameAvailabilityOptionalParams = {
    requestOptions: {},
  },
): Promise<RegistryNameStatus> {
  const result = await _checkNameAvailabilitySend(context, registryNameCheckRequest, options);
  return _checkNameAvailabilityDeserialize(result);
}

export function _generateCredentialsSend(
  context: Client,
  resourceGroupName: string,
  registryName: string,
  generateCredentialsParameters: GenerateCredentialsParameters,
  options: RegistriesGenerateCredentialsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerRegistry/registries/{registryName}/generateCredentials{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      registryName: registryName,
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
    body: generateCredentialsParametersSerializer(generateCredentialsParameters),
  });
}

export async function _generateCredentialsDeserialize(
  result: PathUncheckedResponse,
): Promise<GenerateCredentialsResult> {
  const expectedStatuses = ["202", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return generateCredentialsResultDeserializer(result.body);
}

/** Generate keys for a token of a specified container registry. */
export function generateCredentials(
  context: Client,
  resourceGroupName: string,
  registryName: string,
  generateCredentialsParameters: GenerateCredentialsParameters,
  options: RegistriesGenerateCredentialsOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<GenerateCredentialsResult>, GenerateCredentialsResult> {
  return getLongRunningPoller(context, _generateCredentialsDeserialize, ["202", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _generateCredentialsSend(
        context,
        resourceGroupName,
        registryName,
        generateCredentialsParameters,
        options,
      ),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<GenerateCredentialsResult>, GenerateCredentialsResult>;
}

export function _regenerateCredentialSend(
  context: Client,
  resourceGroupName: string,
  registryName: string,
  regenerateCredentialParameters: RegenerateCredentialParameters,
  options: RegistriesRegenerateCredentialOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerRegistry/registries/{registryName}/regenerateCredential{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      registryName: registryName,
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
    body: regenerateCredentialParametersSerializer(regenerateCredentialParameters),
  });
}

export async function _regenerateCredentialDeserialize(
  result: PathUncheckedResponse,
): Promise<RegistryListCredentialsResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return registryListCredentialsResultDeserializer(result.body);
}

/** Regenerates one of the login credentials for the specified container registry. */
export async function regenerateCredential(
  context: Client,
  resourceGroupName: string,
  registryName: string,
  regenerateCredentialParameters: RegenerateCredentialParameters,
  options: RegistriesRegenerateCredentialOptionalParams = {
    requestOptions: {},
  },
): Promise<RegistryListCredentialsResult> {
  const result = await _regenerateCredentialSend(
    context,
    resourceGroupName,
    registryName,
    regenerateCredentialParameters,
    options,
  );
  return _regenerateCredentialDeserialize(result);
}

export function _listCredentialsSend(
  context: Client,
  resourceGroupName: string,
  registryName: string,
  options: RegistriesListCredentialsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerRegistry/registries/{registryName}/listCredentials{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      registryName: registryName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listCredentialsDeserialize(
  result: PathUncheckedResponse,
): Promise<RegistryListCredentialsResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return registryListCredentialsResultDeserializer(result.body);
}

/** Lists the login credentials for the specified container registry. */
export async function listCredentials(
  context: Client,
  resourceGroupName: string,
  registryName: string,
  options: RegistriesListCredentialsOptionalParams = { requestOptions: {} },
): Promise<RegistryListCredentialsResult> {
  const result = await _listCredentialsSend(context, resourceGroupName, registryName, options);
  return _listCredentialsDeserialize(result);
}

export function _listUsagesSend(
  context: Client,
  resourceGroupName: string,
  registryName: string,
  options: RegistriesListUsagesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerRegistry/registries/{registryName}/listUsages{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      registryName: registryName,
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

export async function _listUsagesDeserialize(
  result: PathUncheckedResponse,
): Promise<RegistryUsageListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return registryUsageListResultDeserializer(result.body);
}

/** Gets the quota usages for the specified container registry. */
export async function listUsages(
  context: Client,
  resourceGroupName: string,
  registryName: string,
  options: RegistriesListUsagesOptionalParams = { requestOptions: {} },
): Promise<RegistryUsageListResult> {
  const result = await _listUsagesSend(context, resourceGroupName, registryName, options);
  return _listUsagesDeserialize(result);
}

export function _importImageSend(
  context: Client,
  resourceGroupName: string,
  registryName: string,
  parameters: ImportImageParameters,
  options: RegistriesImportImageOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerRegistry/registries/{registryName}/importImage{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      registryName: registryName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: importImageParametersSerializer(parameters),
  });
}

export async function _importImageDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Copies an image to this container registry from the specified container registry. */
export function importImage(
  context: Client,
  resourceGroupName: string,
  registryName: string,
  parameters: ImportImageParameters,
  options: RegistriesImportImageOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _importImageDeserialize, ["202", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _importImageSend(context, resourceGroupName, registryName, parameters, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _listSend(
  context: Client,
  options: RegistriesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ContainerRegistry/registries{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
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

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_RegistryListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _registryListResultDeserializer(result.body);
}

/** Lists all the container registries under the specified subscription. */
export function list(
  context: Client,
  options: RegistriesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Registry> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: RegistriesListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerRegistry/registries{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
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

export async function _listByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_RegistryListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _registryListResultDeserializer(result.body);
}

/** Lists all the container registries under the specified resource group. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: RegistriesListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Registry> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  registryName: string,
  options: RegistriesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerRegistry/registries/{registryName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      registryName: registryName,
      "api%2Dversion": context.apiVersion,
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

/** Deletes a container registry. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  registryName: string,
  options: RegistriesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _$deleteSend(context, resourceGroupName, registryName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  registryName: string,
  registryUpdateParameters: RegistryUpdateParameters,
  options: RegistriesUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerRegistry/registries/{registryName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      registryName: registryName,
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
    body: registryUpdateParametersSerializer(registryUpdateParameters),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<Registry> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return registryDeserializer(result.body);
}

/** Updates a container registry with the specified parameters. */
export function update(
  context: Client,
  resourceGroupName: string,
  registryName: string,
  registryUpdateParameters: RegistryUpdateParameters,
  options: RegistriesUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Registry>, Registry> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, registryName, registryUpdateParameters, options),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<Registry>, Registry>;
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  registryName: string,
  registry: Registry,
  options: RegistriesCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerRegistry/registries/{registryName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      registryName: registryName,
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
    body: registrySerializer(registry),
  });
}

export async function _createDeserialize(result: PathUncheckedResponse): Promise<Registry> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return registryDeserializer(result.body);
}

/** Creates a container registry with the specified parameters. */
export function create(
  context: Client,
  resourceGroupName: string,
  registryName: string,
  registry: Registry,
  options: RegistriesCreateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Registry>, Registry> {
  return getLongRunningPoller(context, _createDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createSend(context, resourceGroupName, registryName, registry, options),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<Registry>, Registry>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  registryName: string,
  options: RegistriesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerRegistry/registries/{registryName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      registryName: registryName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<Registry> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return registryDeserializer(result.body);
}

/** Gets the properties of the specified container registry. */
export async function get(
  context: Client,
  resourceGroupName: string,
  registryName: string,
  options: RegistriesGetOptionalParams = { requestOptions: {} },
): Promise<Registry> {
  const result = await _getSend(context, resourceGroupName, registryName, options);
  return _getDeserialize(result);
}

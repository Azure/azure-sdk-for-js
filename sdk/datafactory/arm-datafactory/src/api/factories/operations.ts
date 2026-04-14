// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DataFactoryManagementContext as Client } from "../index.js";
import type {
  Factory,
  FactoryUpdateParameters,
  _FactoryListResponse,
  GitHubAccessTokenRequest,
  GitHubAccessTokenResponse,
  UserAccessPolicy,
  AccessPolicyResponse,
  FactoryRepoUpdate,
} from "../../models/models.js";
import {
  cloudErrorDeserializer,
  factorySerializer,
  factoryDeserializer,
  factoryUpdateParametersSerializer,
  _factoryListResponseDeserializer,
  gitHubAccessTokenRequestSerializer,
  gitHubAccessTokenResponseDeserializer,
  userAccessPolicySerializer,
  accessPolicyResponseDeserializer,
  factoryRepoUpdateSerializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  FactoriesConfigureFactoryRepoOptionalParams,
  FactoriesGetDataPlaneAccessOptionalParams,
  FactoriesGetGitHubAccessTokenOptionalParams,
  FactoriesListOptionalParams,
  FactoriesListByResourceGroupOptionalParams,
  FactoriesDeleteOptionalParams,
  FactoriesUpdateOptionalParams,
  FactoriesCreateOrUpdateOptionalParams,
  FactoriesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _configureFactoryRepoSend(
  context: Client,
  locationId: string,
  factoryRepoUpdate: FactoryRepoUpdate,
  options: FactoriesConfigureFactoryRepoOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.DataFactory/locations/{locationId}/configureFactoryRepo{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      locationId: locationId,
      "api%2Dversion": context.apiVersion ?? "2018-06-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: factoryRepoUpdateSerializer(factoryRepoUpdate),
  });
}

export async function _configureFactoryRepoDeserialize(
  result: PathUncheckedResponse,
): Promise<Factory> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return factoryDeserializer(result.body);
}

/** Updates a factory's repo information. */
export async function configureFactoryRepo(
  context: Client,
  locationId: string,
  factoryRepoUpdate: FactoryRepoUpdate,
  options: FactoriesConfigureFactoryRepoOptionalParams = { requestOptions: {} },
): Promise<Factory> {
  const result = await _configureFactoryRepoSend(context, locationId, factoryRepoUpdate, options);
  return _configureFactoryRepoDeserialize(result);
}

export function _getDataPlaneAccessSend(
  context: Client,
  resourceGroupName: string,
  factoryName: string,
  policy: UserAccessPolicy,
  options: FactoriesGetDataPlaneAccessOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/getDataPlaneAccess{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      factoryName: factoryName,
      "api%2Dversion": context.apiVersion ?? "2018-06-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: userAccessPolicySerializer(policy),
  });
}

export async function _getDataPlaneAccessDeserialize(
  result: PathUncheckedResponse,
): Promise<AccessPolicyResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return accessPolicyResponseDeserializer(result.body);
}

/** Get Data Plane access. */
export async function getDataPlaneAccess(
  context: Client,
  resourceGroupName: string,
  factoryName: string,
  policy: UserAccessPolicy,
  options: FactoriesGetDataPlaneAccessOptionalParams = { requestOptions: {} },
): Promise<AccessPolicyResponse> {
  const result = await _getDataPlaneAccessSend(
    context,
    resourceGroupName,
    factoryName,
    policy,
    options,
  );
  return _getDataPlaneAccessDeserialize(result);
}

export function _getGitHubAccessTokenSend(
  context: Client,
  resourceGroupName: string,
  factoryName: string,
  gitHubAccessTokenRequest: GitHubAccessTokenRequest,
  options: FactoriesGetGitHubAccessTokenOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/getGitHubAccessToken{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      factoryName: factoryName,
      "api%2Dversion": context.apiVersion ?? "2018-06-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: gitHubAccessTokenRequestSerializer(gitHubAccessTokenRequest),
  });
}

export async function _getGitHubAccessTokenDeserialize(
  result: PathUncheckedResponse,
): Promise<GitHubAccessTokenResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return gitHubAccessTokenResponseDeserializer(result.body);
}

/** Get GitHub Access Token. */
export async function getGitHubAccessToken(
  context: Client,
  resourceGroupName: string,
  factoryName: string,
  gitHubAccessTokenRequest: GitHubAccessTokenRequest,
  options: FactoriesGetGitHubAccessTokenOptionalParams = { requestOptions: {} },
): Promise<GitHubAccessTokenResponse> {
  const result = await _getGitHubAccessTokenSend(
    context,
    resourceGroupName,
    factoryName,
    gitHubAccessTokenRequest,
    options,
  );
  return _getGitHubAccessTokenDeserialize(result);
}

export function _listSend(
  context: Client,
  options: FactoriesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.DataFactory/factories{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2018-06-01",
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
): Promise<_FactoryListResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _factoryListResponseDeserializer(result.body);
}

/** Lists factories under the specified subscription. */
export function list(
  context: Client,
  options: FactoriesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Factory> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2018-06-01" },
  );
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: FactoriesListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": context.apiVersion ?? "2018-06-01",
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

export async function _listByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_FactoryListResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _factoryListResponseDeserializer(result.body);
}

/** Lists factories. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: FactoriesListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Factory> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2018-06-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  factoryName: string,
  options: FactoriesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      factoryName: factoryName,
      "api%2Dversion": context.apiVersion ?? "2018-06-01",
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
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return;
}

/** Deletes a factory. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  factoryName: string,
  options: FactoriesDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, resourceGroupName, factoryName, options);
  return _$deleteDeserialize(result);
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  factoryName: string,
  factoryUpdateParameters: FactoryUpdateParameters,
  options: FactoriesUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      factoryName: factoryName,
      "api%2Dversion": context.apiVersion ?? "2018-06-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: factoryUpdateParametersSerializer(factoryUpdateParameters),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<Factory> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return factoryDeserializer(result.body);
}

/** Updates a factory. */
export async function update(
  context: Client,
  resourceGroupName: string,
  factoryName: string,
  factoryUpdateParameters: FactoryUpdateParameters,
  options: FactoriesUpdateOptionalParams = { requestOptions: {} },
): Promise<Factory> {
  const result = await _updateSend(
    context,
    resourceGroupName,
    factoryName,
    factoryUpdateParameters,
    options,
  );
  return _updateDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  factoryName: string,
  factory: Factory,
  options: FactoriesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      factoryName: factoryName,
      "api%2Dversion": context.apiVersion ?? "2018-06-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: factorySerializer(factory),
  });
}

export async function _createOrUpdateDeserialize(result: PathUncheckedResponse): Promise<Factory> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return factoryDeserializer(result.body);
}

/** Creates or updates a factory. */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  factoryName: string,
  factory: Factory,
  options: FactoriesCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<Factory> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    factoryName,
    factory,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  factoryName: string,
  options: FactoriesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      factoryName: factoryName,
      "api%2Dversion": context.apiVersion ?? "2018-06-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.ifNoneMatch !== undefined ? { "if-none-match": options?.ifNoneMatch } : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getDeserialize(result: PathUncheckedResponse): Promise<Factory> {
  const expectedStatuses = ["200", "304"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return factoryDeserializer(result.body);
}

/** Gets a factory. */
export async function get(
  context: Client,
  resourceGroupName: string,
  factoryName: string,
  options: FactoriesGetOptionalParams = { requestOptions: {} },
): Promise<Factory> {
  const result = await _getSend(context, resourceGroupName, factoryName, options);
  return _getDeserialize(result);
}

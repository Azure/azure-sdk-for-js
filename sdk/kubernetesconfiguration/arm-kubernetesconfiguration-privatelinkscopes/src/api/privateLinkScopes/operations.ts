// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PrivateLinkScopesContext as Client } from "../index.js";
import type {
  KubernetesConfigurationPrivateLinkScope,
  TagsResource,
  _KubernetesConfigurationPrivateLinkScopeListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  kubernetesConfigurationPrivateLinkScopeSerializer,
  kubernetesConfigurationPrivateLinkScopeDeserializer,
  tagsResourceSerializer,
  _kubernetesConfigurationPrivateLinkScopeListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  PrivateLinkScopesListOptionalParams,
  PrivateLinkScopesListByResourceGroupOptionalParams,
  PrivateLinkScopesDeleteOptionalParams,
  PrivateLinkScopesUpdateTagsOptionalParams,
  PrivateLinkScopesCreateOrUpdateOptionalParams,
  PrivateLinkScopesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  options: PrivateLinkScopesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.KubernetesConfiguration/privateLinkScopes{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2024-11-01-preview",
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
): Promise<_KubernetesConfigurationPrivateLinkScopeListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _kubernetesConfigurationPrivateLinkScopeListResultDeserializer(result.body);
}

/** Gets a list of all Azure Arc PrivateLinkScopes within a subscription. */
export function list(
  context: Client,
  options: PrivateLinkScopesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<KubernetesConfigurationPrivateLinkScope> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2024-11-01-preview",
    },
  );
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: PrivateLinkScopesListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.KubernetesConfiguration/privateLinkScopes{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": context.apiVersion ?? "2024-11-01-preview",
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
): Promise<_KubernetesConfigurationPrivateLinkScopeListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _kubernetesConfigurationPrivateLinkScopeListResultDeserializer(result.body);
}

/** Gets a list of Azure Arc PrivateLinkScopes within a resource group. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: PrivateLinkScopesListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<KubernetesConfigurationPrivateLinkScope> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2024-11-01-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  scopeName: string,
  options: PrivateLinkScopesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.KubernetesConfiguration/privateLinkScopes/{scopeName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      scopeName: scopeName,
      "api%2Dversion": context.apiVersion ?? "2024-11-01-preview",
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
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Deletes a Azure Arc PrivateLinkScope. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  scopeName: string,
  options: PrivateLinkScopesDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, resourceGroupName, scopeName, options);
  return _$deleteDeserialize(result);
}

export function _updateTagsSend(
  context: Client,
  resourceGroupName: string,
  scopeName: string,
  privateLinkScopeTags: TagsResource,
  options: PrivateLinkScopesUpdateTagsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.KubernetesConfiguration/privateLinkScopes/{scopeName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      scopeName: scopeName,
      "api%2Dversion": context.apiVersion ?? "2024-11-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: tagsResourceSerializer(privateLinkScopeTags),
  });
}

export async function _updateTagsDeserialize(
  result: PathUncheckedResponse,
): Promise<KubernetesConfigurationPrivateLinkScope> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return kubernetesConfigurationPrivateLinkScopeDeserializer(result.body);
}

/** Updates an existing PrivateLinkScope's tags. To update other fields use the CreateOrUpdate method. */
export async function updateTags(
  context: Client,
  resourceGroupName: string,
  scopeName: string,
  privateLinkScopeTags: TagsResource,
  options: PrivateLinkScopesUpdateTagsOptionalParams = { requestOptions: {} },
): Promise<KubernetesConfigurationPrivateLinkScope> {
  const result = await _updateTagsSend(
    context,
    resourceGroupName,
    scopeName,
    privateLinkScopeTags,
    options,
  );
  return _updateTagsDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  scopeName: string,
  parameters: KubernetesConfigurationPrivateLinkScope,
  options: PrivateLinkScopesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.KubernetesConfiguration/privateLinkScopes/{scopeName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      scopeName: scopeName,
      "api%2Dversion": context.apiVersion ?? "2024-11-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: kubernetesConfigurationPrivateLinkScopeSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<KubernetesConfigurationPrivateLinkScope> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return kubernetesConfigurationPrivateLinkScopeDeserializer(result.body);
}

/** Creates (or updates) a Azure Arc PrivateLinkScope. Note: You cannot specify a different value for InstrumentationKey nor AppId in the Put operation. */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  scopeName: string,
  parameters: KubernetesConfigurationPrivateLinkScope,
  options: PrivateLinkScopesCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<KubernetesConfigurationPrivateLinkScope> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    scopeName,
    parameters,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  scopeName: string,
  options: PrivateLinkScopesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.KubernetesConfiguration/privateLinkScopes/{scopeName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      scopeName: scopeName,
      "api%2Dversion": context.apiVersion ?? "2024-11-01-preview",
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

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<KubernetesConfigurationPrivateLinkScope> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return kubernetesConfigurationPrivateLinkScopeDeserializer(result.body);
}

/** Returns a Azure Arc PrivateLinkScope. */
export async function get(
  context: Client,
  resourceGroupName: string,
  scopeName: string,
  options: PrivateLinkScopesGetOptionalParams = { requestOptions: {} },
): Promise<KubernetesConfigurationPrivateLinkScope> {
  const result = await _getSend(context, resourceGroupName, scopeName, options);
  return _getDeserialize(result);
}

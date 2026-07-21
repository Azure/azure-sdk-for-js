// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { HybridComputeManagementContext as Client } from "../index.js";
import type {
  PrivateLinkScopeValidationDetails,
  HybridComputePrivateLinkScope,
  TagsResource,
  _HybridComputePrivateLinkScopeListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  privateLinkScopeValidationDetailsDeserializer,
  hybridComputePrivateLinkScopeSerializer,
  hybridComputePrivateLinkScopeDeserializer,
  tagsResourceSerializer,
  _hybridComputePrivateLinkScopeListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  PrivateLinkScopesGetValidationDetailsOptionalParams,
  PrivateLinkScopesListOptionalParams,
  PrivateLinkScopesListByResourceGroupOptionalParams,
  PrivateLinkScopesDeleteOptionalParams,
  PrivateLinkScopesUpdateTagsOptionalParams,
  PrivateLinkScopesCreateOrUpdateOptionalParams,
  PrivateLinkScopesGetOptionalParams,
  PrivateLinkScopesGetValidationDetailsForMachineOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _getValidationDetailsSend(
  context: Client,
  location: string,
  privateLinkScopeId: string,
  options: PrivateLinkScopesGetValidationDetailsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.HybridCompute/locations/{location}/privateLinkScopes/{privateLinkScopeId}{?api%2Dversion}",
    {
      location: location,
      subscriptionId: context.subscriptionId,
      privateLinkScopeId: privateLinkScopeId,
      "api%2Dversion": context.apiVersion ?? "2025-09-16-preview",
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

export async function _getValidationDetailsDeserialize(
  result: PathUncheckedResponse,
): Promise<PrivateLinkScopeValidationDetails> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return privateLinkScopeValidationDetailsDeserializer(result.body);
}

/** Returns a Azure Arc PrivateLinkScope's validation details. */
export async function getValidationDetails(
  context: Client,
  location: string,
  privateLinkScopeId: string,
  options: PrivateLinkScopesGetValidationDetailsOptionalParams = { requestOptions: {} },
): Promise<PrivateLinkScopeValidationDetails> {
  const result = await _getValidationDetailsSend(context, location, privateLinkScopeId, options);
  return _getValidationDetailsDeserialize(result);
}

export function _listSend(
  context: Client,
  options: PrivateLinkScopesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.HybridCompute/privateLinkScopes{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2025-09-16-preview",
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
): Promise<_HybridComputePrivateLinkScopeListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _hybridComputePrivateLinkScopeListResultDeserializer(result.body);
}

/** Gets a list of all Azure Arc PrivateLinkScopes within a subscription. */
export function list(
  context: Client,
  options: PrivateLinkScopesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<HybridComputePrivateLinkScope> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-09-16-preview",
    },
  );
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: PrivateLinkScopesListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridCompute/privateLinkScopes{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": context.apiVersion ?? "2025-09-16-preview",
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
): Promise<_HybridComputePrivateLinkScopeListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _hybridComputePrivateLinkScopeListResultDeserializer(result.body);
}

/** Gets a list of Azure Arc PrivateLinkScopes within a resource group. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: PrivateLinkScopesListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<HybridComputePrivateLinkScope> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-09-16-preview",
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
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridCompute/privateLinkScopes/{scopeName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      scopeName: scopeName,
      "api%2Dversion": context.apiVersion ?? "2025-09-16-preview",
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
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Deletes a Azure Arc PrivateLinkScope. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  scopeName: string,
  options: PrivateLinkScopesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _$deleteSend(context, resourceGroupName, scopeName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-09-16-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateTagsSend(
  context: Client,
  resourceGroupName: string,
  scopeName: string,
  privateLinkScopeTags: TagsResource,
  options: PrivateLinkScopesUpdateTagsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridCompute/privateLinkScopes/{scopeName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      scopeName: scopeName,
      "api%2Dversion": context.apiVersion ?? "2025-09-16-preview",
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
): Promise<HybridComputePrivateLinkScope> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return hybridComputePrivateLinkScopeDeserializer(result.body);
}

/** Updates an existing PrivateLinkScope's tags. To update other fields use the CreateOrUpdate method. */
export async function updateTags(
  context: Client,
  resourceGroupName: string,
  scopeName: string,
  privateLinkScopeTags: TagsResource,
  options: PrivateLinkScopesUpdateTagsOptionalParams = { requestOptions: {} },
): Promise<HybridComputePrivateLinkScope> {
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
  parameters: HybridComputePrivateLinkScope,
  options: PrivateLinkScopesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridCompute/privateLinkScopes/{scopeName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      scopeName: scopeName,
      "api%2Dversion": context.apiVersion ?? "2025-09-16-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: hybridComputePrivateLinkScopeSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<HybridComputePrivateLinkScope> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return hybridComputePrivateLinkScopeDeserializer(result.body);
}

/** Creates (or updates) a Azure Arc PrivateLinkScope. Note: You cannot specify a different value for InstrumentationKey nor AppId in the Put operation. */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  scopeName: string,
  parameters: HybridComputePrivateLinkScope,
  options: PrivateLinkScopesCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<HybridComputePrivateLinkScope> {
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
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridCompute/privateLinkScopes/{scopeName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      scopeName: scopeName,
      "api%2Dversion": context.apiVersion ?? "2025-09-16-preview",
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
): Promise<HybridComputePrivateLinkScope> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return hybridComputePrivateLinkScopeDeserializer(result.body);
}

/** Returns a Azure Arc PrivateLinkScope. */
export async function get(
  context: Client,
  resourceGroupName: string,
  scopeName: string,
  options: PrivateLinkScopesGetOptionalParams = { requestOptions: {} },
): Promise<HybridComputePrivateLinkScope> {
  const result = await _getSend(context, resourceGroupName, scopeName, options);
  return _getDeserialize(result);
}

export function _getValidationDetailsForMachineSend(
  context: Client,
  resourceGroupName: string,
  machineName: string,
  options: PrivateLinkScopesGetValidationDetailsForMachineOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridCompute/machines/{machineName}/privateLinkScopes/current{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      machineName: machineName,
      "api%2Dversion": context.apiVersion ?? "2025-09-16-preview",
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

export async function _getValidationDetailsForMachineDeserialize(
  result: PathUncheckedResponse,
): Promise<PrivateLinkScopeValidationDetails> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return privateLinkScopeValidationDetailsDeserializer(result.body);
}

/** Returns a Azure Arc PrivateLinkScope's validation details for a given machine. */
export async function getValidationDetailsForMachine(
  context: Client,
  resourceGroupName: string,
  machineName: string,
  options: PrivateLinkScopesGetValidationDetailsForMachineOptionalParams = { requestOptions: {} },
): Promise<PrivateLinkScopeValidationDetails> {
  const result = await _getValidationDetailsForMachineSend(
    context,
    resourceGroupName,
    machineName,
    options,
  );
  return _getValidationDetailsForMachineDeserialize(result);
}

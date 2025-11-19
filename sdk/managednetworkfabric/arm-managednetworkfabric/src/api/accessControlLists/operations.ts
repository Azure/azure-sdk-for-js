// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ManagedNetworkFabricContext as Client } from "../index.js";
import type {
  AccessControlList,
  AccessControlListPatch,
  _AccessControlListListResult,
  UpdateAdministrativeState,
  CommonPostActionResponseForStateUpdate,
  ValidateConfigurationResponse,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  accessControlListSerializer,
  accessControlListDeserializer,
  accessControlListPatchSerializer,
  _accessControlListListResultDeserializer,
  updateAdministrativeStateSerializer,
  commonPostActionResponseForStateUpdateDeserializer,
  validateConfigurationResponseDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  AccessControlListsValidateConfigurationOptionalParams,
  AccessControlListsResyncOptionalParams,
  AccessControlListsUpdateAdministrativeStateOptionalParams,
  AccessControlListsListBySubscriptionOptionalParams,
  AccessControlListsListByResourceGroupOptionalParams,
  AccessControlListsDeleteOptionalParams,
  AccessControlListsUpdateOptionalParams,
  AccessControlListsCreateOptionalParams,
  AccessControlListsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _validateConfigurationSend(
  context: Client,
  resourceGroupName: string,
  accessControlListName: string,
  options: AccessControlListsValidateConfigurationOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/accessControlLists/{accessControlListName}/validateConfiguration{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accessControlListName: accessControlListName,
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

export async function _validateConfigurationDeserialize(
  result: PathUncheckedResponse,
): Promise<ValidateConfigurationResponse> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return validateConfigurationResponseDeserializer(result.body);
}

/** Implements the operation to the underlying resources. */
export function validateConfiguration(
  context: Client,
  resourceGroupName: string,
  accessControlListName: string,
  options: AccessControlListsValidateConfigurationOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<ValidateConfigurationResponse>, ValidateConfigurationResponse> {
  return getLongRunningPoller(context, _validateConfigurationDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _validateConfigurationSend(context, resourceGroupName, accessControlListName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<ValidateConfigurationResponse>, ValidateConfigurationResponse>;
}

export function _resyncSend(
  context: Client,
  resourceGroupName: string,
  accessControlListName: string,
  options: AccessControlListsResyncOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/accessControlLists/{accessControlListName}/resync{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accessControlListName: accessControlListName,
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

export async function _resyncDeserialize(
  result: PathUncheckedResponse,
): Promise<CommonPostActionResponseForStateUpdate> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return commonPostActionResponseForStateUpdateDeserializer(result.body);
}

/** Implements the operation to the underlying resources. */
export function resync(
  context: Client,
  resourceGroupName: string,
  accessControlListName: string,
  options: AccessControlListsResyncOptionalParams = { requestOptions: {} },
): PollerLike<
  OperationState<CommonPostActionResponseForStateUpdate>,
  CommonPostActionResponseForStateUpdate
> {
  return getLongRunningPoller(context, _resyncDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _resyncSend(context, resourceGroupName, accessControlListName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<
    OperationState<CommonPostActionResponseForStateUpdate>,
    CommonPostActionResponseForStateUpdate
  >;
}

export function _updateAdministrativeStateSend(
  context: Client,
  resourceGroupName: string,
  accessControlListName: string,
  body: UpdateAdministrativeState,
  options: AccessControlListsUpdateAdministrativeStateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/accessControlLists/{accessControlListName}/updateAdministrativeState{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accessControlListName: accessControlListName,
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
    body: updateAdministrativeStateSerializer(body),
  });
}

export async function _updateAdministrativeStateDeserialize(
  result: PathUncheckedResponse,
): Promise<CommonPostActionResponseForStateUpdate> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return commonPostActionResponseForStateUpdateDeserializer(result.body);
}

/** Implements the operation to the underlying resources. */
export function updateAdministrativeState(
  context: Client,
  resourceGroupName: string,
  accessControlListName: string,
  body: UpdateAdministrativeState,
  options: AccessControlListsUpdateAdministrativeStateOptionalParams = {
    requestOptions: {},
  },
): PollerLike<
  OperationState<CommonPostActionResponseForStateUpdate>,
  CommonPostActionResponseForStateUpdate
> {
  return getLongRunningPoller(
    context,
    _updateAdministrativeStateDeserialize,
    ["202", "200", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _updateAdministrativeStateSend(
          context,
          resourceGroupName,
          accessControlListName,
          body,
          options,
        ),
      resourceLocationConfig: "location",
    },
  ) as PollerLike<
    OperationState<CommonPostActionResponseForStateUpdate>,
    CommonPostActionResponseForStateUpdate
  >;
}

export function _listBySubscriptionSend(
  context: Client,
  options: AccessControlListsListBySubscriptionOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ManagedNetworkFabric/accessControlLists{?api%2Dversion}",
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

export async function _listBySubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<_AccessControlListListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _accessControlListListResultDeserializer(result.body);
}

/** Implements AccessControlLists list by subscription GET method. */
export function listBySubscription(
  context: Client,
  options: AccessControlListsListBySubscriptionOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<AccessControlList> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionSend(context, options),
    _listBySubscriptionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: AccessControlListsListByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/accessControlLists{?api%2Dversion}",
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
): Promise<_AccessControlListListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _accessControlListListResultDeserializer(result.body);
}

/** Implements AccessControlLists list by resource group GET method. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: AccessControlListsListByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<AccessControlList> {
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
  accessControlListName: string,
  options: AccessControlListsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/accessControlLists/{accessControlListName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accessControlListName: accessControlListName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "204", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Implements Access Control List DELETE method. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  accessControlListName: string,
  options: AccessControlListsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, accessControlListName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  accessControlListName: string,
  properties: AccessControlListPatch,
  options: AccessControlListsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/accessControlLists/{accessControlListName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accessControlListName: accessControlListName,
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
    body: accessControlListPatchSerializer(properties),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<AccessControlList> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return accessControlListDeserializer(result.body);
}

/** API to update certain properties of the Access Control List resource. */
export function update(
  context: Client,
  resourceGroupName: string,
  accessControlListName: string,
  properties: AccessControlListPatch,
  options: AccessControlListsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<AccessControlList>, AccessControlList> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, accessControlListName, properties, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<AccessControlList>, AccessControlList>;
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  accessControlListName: string,
  resource: AccessControlList,
  options: AccessControlListsCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/accessControlLists/{accessControlListName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accessControlListName: accessControlListName,
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
    body: accessControlListSerializer(resource),
  });
}

export async function _createDeserialize(
  result: PathUncheckedResponse,
): Promise<AccessControlList> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return accessControlListDeserializer(result.body);
}

/** Implements Access Control List PUT method. */
export function create(
  context: Client,
  resourceGroupName: string,
  accessControlListName: string,
  resource: AccessControlList,
  options: AccessControlListsCreateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<AccessControlList>, AccessControlList> {
  return getLongRunningPoller(context, _createDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createSend(context, resourceGroupName, accessControlListName, resource, options),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<AccessControlList>, AccessControlList>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  accessControlListName: string,
  options: AccessControlListsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/accessControlLists/{accessControlListName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accessControlListName: accessControlListName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<AccessControlList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return accessControlListDeserializer(result.body);
}

/** Implements Access Control List GET method. */
export async function get(
  context: Client,
  resourceGroupName: string,
  accessControlListName: string,
  options: AccessControlListsGetOptionalParams = { requestOptions: {} },
): Promise<AccessControlList> {
  const result = await _getSend(context, resourceGroupName, accessControlListName, options);
  return _getDeserialize(result);
}

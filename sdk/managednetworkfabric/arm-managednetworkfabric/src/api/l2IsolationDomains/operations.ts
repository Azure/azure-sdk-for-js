// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ManagedNetworkFabricContext as Client } from "../index.js";
import type {
  UpdateAdministrativeState,
  CommonPostActionResponseForStateUpdate,
  ValidateConfigurationResponse,
  L2IsolationDomain,
  L2IsolationDomainPatch,
  _L2IsolationDomainListResult,
  CommonPostActionResponseForDeviceUpdate,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  updateAdministrativeStateSerializer,
  commonPostActionResponseForStateUpdateDeserializer,
  validateConfigurationResponseDeserializer,
  l2IsolationDomainSerializer,
  l2IsolationDomainDeserializer,
  l2IsolationDomainPatchSerializer,
  _l2IsolationDomainListResultDeserializer,
  commonPostActionResponseForDeviceUpdateDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  L2IsolationDomainsCommitConfigurationOptionalParams,
  L2IsolationDomainsValidateConfigurationOptionalParams,
  L2IsolationDomainsUpdateAdministrativeStateOptionalParams,
  L2IsolationDomainsListBySubscriptionOptionalParams,
  L2IsolationDomainsListByResourceGroupOptionalParams,
  L2IsolationDomainsDeleteOptionalParams,
  L2IsolationDomainsUpdateOptionalParams,
  L2IsolationDomainsCreateOptionalParams,
  L2IsolationDomainsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _commitConfigurationSend(
  context: Client,
  resourceGroupName: string,
  l2IsolationDomainName: string,
  options: L2IsolationDomainsCommitConfigurationOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/l2IsolationDomains/{l2IsolationDomainName}/commitConfiguration{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      l2IsolationDomainName: l2IsolationDomainName,
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

export async function _commitConfigurationDeserialize(
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

/** Commits the configuration of the given resources. */
export function commitConfiguration(
  context: Client,
  resourceGroupName: string,
  l2IsolationDomainName: string,
  options: L2IsolationDomainsCommitConfigurationOptionalParams = {
    requestOptions: {},
  },
): PollerLike<
  OperationState<CommonPostActionResponseForStateUpdate>,
  CommonPostActionResponseForStateUpdate
> {
  return getLongRunningPoller(context, _commitConfigurationDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _commitConfigurationSend(context, resourceGroupName, l2IsolationDomainName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<
    OperationState<CommonPostActionResponseForStateUpdate>,
    CommonPostActionResponseForStateUpdate
  >;
}

export function _validateConfigurationSend(
  context: Client,
  resourceGroupName: string,
  l2IsolationDomainName: string,
  options: L2IsolationDomainsValidateConfigurationOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/l2IsolationDomains/{l2IsolationDomainName}/validateConfiguration{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      l2IsolationDomainName: l2IsolationDomainName,
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

/** Validates the configuration of the resources. */
export function validateConfiguration(
  context: Client,
  resourceGroupName: string,
  l2IsolationDomainName: string,
  options: L2IsolationDomainsValidateConfigurationOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<ValidateConfigurationResponse>, ValidateConfigurationResponse> {
  return getLongRunningPoller(context, _validateConfigurationDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _validateConfigurationSend(context, resourceGroupName, l2IsolationDomainName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<ValidateConfigurationResponse>, ValidateConfigurationResponse>;
}

export function _updateAdministrativeStateSend(
  context: Client,
  resourceGroupName: string,
  l2IsolationDomainName: string,
  body: UpdateAdministrativeState,
  options: L2IsolationDomainsUpdateAdministrativeStateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/l2IsolationDomains/{l2IsolationDomainName}/updateAdministrativeState{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      l2IsolationDomainName: l2IsolationDomainName,
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
): Promise<CommonPostActionResponseForDeviceUpdate> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return commonPostActionResponseForDeviceUpdateDeserializer(result.body);
}

/** Enables isolation domain across the fabric or on specified racks. */
export function updateAdministrativeState(
  context: Client,
  resourceGroupName: string,
  l2IsolationDomainName: string,
  body: UpdateAdministrativeState,
  options: L2IsolationDomainsUpdateAdministrativeStateOptionalParams = {
    requestOptions: {},
  },
): PollerLike<
  OperationState<CommonPostActionResponseForDeviceUpdate>,
  CommonPostActionResponseForDeviceUpdate
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
          l2IsolationDomainName,
          body,
          options,
        ),
      resourceLocationConfig: "location",
    },
  ) as PollerLike<
    OperationState<CommonPostActionResponseForDeviceUpdate>,
    CommonPostActionResponseForDeviceUpdate
  >;
}

export function _listBySubscriptionSend(
  context: Client,
  options: L2IsolationDomainsListBySubscriptionOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ManagedNetworkFabric/l2IsolationDomains{?api%2Dversion}",
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
): Promise<_L2IsolationDomainListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _l2IsolationDomainListResultDeserializer(result.body);
}

/** Displays L2IsolationDomains list by subscription GET method. */
export function listBySubscription(
  context: Client,
  options: L2IsolationDomainsListBySubscriptionOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<L2IsolationDomain> {
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
  options: L2IsolationDomainsListByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/l2IsolationDomains{?api%2Dversion}",
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
): Promise<_L2IsolationDomainListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _l2IsolationDomainListResultDeserializer(result.body);
}

/** Displays L2IsolationDomains list by resource group GET method. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: L2IsolationDomainsListByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<L2IsolationDomain> {
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
  l2IsolationDomainName: string,
  options: L2IsolationDomainsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/l2IsolationDomains/{l2IsolationDomainName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      l2IsolationDomainName: l2IsolationDomainName,
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

/** Deletes layer 2 connectivity between compute nodes by managed by named L2 Isolation name. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  l2IsolationDomainName: string,
  options: L2IsolationDomainsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, l2IsolationDomainName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  l2IsolationDomainName: string,
  properties: L2IsolationDomainPatch,
  options: L2IsolationDomainsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/l2IsolationDomains/{l2IsolationDomainName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      l2IsolationDomainName: l2IsolationDomainName,
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
    body: l2IsolationDomainPatchSerializer(properties),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<L2IsolationDomain> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return l2IsolationDomainDeserializer(result.body);
}

/** API to update certain properties of the L2 Isolation Domain resource. */
export function update(
  context: Client,
  resourceGroupName: string,
  l2IsolationDomainName: string,
  properties: L2IsolationDomainPatch,
  options: L2IsolationDomainsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<L2IsolationDomain>, L2IsolationDomain> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, l2IsolationDomainName, properties, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<L2IsolationDomain>, L2IsolationDomain>;
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  l2IsolationDomainName: string,
  resource: L2IsolationDomain,
  options: L2IsolationDomainsCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/l2IsolationDomains/{l2IsolationDomainName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      l2IsolationDomainName: l2IsolationDomainName,
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
    body: l2IsolationDomainSerializer(resource),
  });
}

export async function _createDeserialize(
  result: PathUncheckedResponse,
): Promise<L2IsolationDomain> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return l2IsolationDomainDeserializer(result.body);
}

/** Creates layer 2 network connectivity between compute nodes within a rack and across racks.The configuration is applied on the devices only after the isolation domain is enabled. */
export function create(
  context: Client,
  resourceGroupName: string,
  l2IsolationDomainName: string,
  resource: L2IsolationDomain,
  options: L2IsolationDomainsCreateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<L2IsolationDomain>, L2IsolationDomain> {
  return getLongRunningPoller(context, _createDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createSend(context, resourceGroupName, l2IsolationDomainName, resource, options),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<L2IsolationDomain>, L2IsolationDomain>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  l2IsolationDomainName: string,
  options: L2IsolationDomainsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/l2IsolationDomains/{l2IsolationDomainName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      l2IsolationDomainName: l2IsolationDomainName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<L2IsolationDomain> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return l2IsolationDomainDeserializer(result.body);
}

/** Implements L2 Isolation Domain GET method. */
export async function get(
  context: Client,
  resourceGroupName: string,
  l2IsolationDomainName: string,
  options: L2IsolationDomainsGetOptionalParams = { requestOptions: {} },
): Promise<L2IsolationDomain> {
  const result = await _getSend(context, resourceGroupName, l2IsolationDomainName, options);
  return _getDeserialize(result);
}

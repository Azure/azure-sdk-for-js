// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext as Client } from "../index.js";
import type {
  TagsObject,
  LoadBalancer,
  MigratedPools,
  QueryInboundNatRulePortMappingRequest,
  BackendAddressInboundNatRulePortMappings,
  LoadBalancerVipSwapRequest,
} from "../../models/microsoft/network/models.js";
import {
  cloudErrorDeserializer,
  tagsObjectSerializer,
  loadBalancerSerializer,
  loadBalancerDeserializer,
  migrateLoadBalancerToIpBasedRequestSerializer,
  migratedPoolsDeserializer,
  queryInboundNatRulePortMappingRequestSerializer,
  backendAddressInboundNatRulePortMappingsDeserializer,
  loadBalancerVipSwapRequestSerializer,
} from "../../models/microsoft/network/models.js";
import type { _LoadBalancerListResult } from "../../models/models.js";
import { _loadBalancerListResultDeserializer } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  LoadBalancersSwapPublicIpAddressesOptionalParams,
  LoadBalancersListInboundNatRulePortMappingsOptionalParams,
  LoadBalancersMigrateToIpBasedOptionalParams,
  LoadBalancersListAllOptionalParams,
  LoadBalancersListOptionalParams,
  LoadBalancersDeleteOptionalParams,
  LoadBalancersUpdateTagsOptionalParams,
  LoadBalancersCreateOrUpdateOptionalParams,
  LoadBalancersGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _swapPublicIpAddressesSend(
  context: Client,
  location: string,
  parameters: LoadBalancerVipSwapRequest,
  options: LoadBalancersSwapPublicIpAddressesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Network/locations/{location}/setLoadBalancerFrontendPublicIpAddresses{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      "api%2Dversion": "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: loadBalancerVipSwapRequestSerializer(parameters),
  });
}

export async function _swapPublicIpAddressesDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return;
}

/** Swaps VIPs between two load balancers. */
export function swapPublicIpAddresses(
  context: Client,
  location: string,
  parameters: LoadBalancerVipSwapRequest,
  options: LoadBalancersSwapPublicIpAddressesOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _swapPublicIpAddressesDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _swapPublicIpAddressesSend(context, location, parameters, options),
    resourceLocationConfig: "location",
    apiVersion: "2025-05-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _listInboundNatRulePortMappingsSend(
  context: Client,
  groupName: string,
  loadBalancerName: string,
  backendPoolName: string,
  parameters: QueryInboundNatRulePortMappingRequest,
  options: LoadBalancersListInboundNatRulePortMappingsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{groupName}/providers/Microsoft.Network/loadBalancers/{loadBalancerName}/backendAddressPools/{backendPoolName}/queryInboundNatRulePortMapping{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      groupName: groupName,
      loadBalancerName: loadBalancerName,
      backendPoolName: backendPoolName,
      "api%2Dversion": "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: queryInboundNatRulePortMappingRequestSerializer(parameters),
  });
}

export async function _listInboundNatRulePortMappingsDeserialize(
  result: PathUncheckedResponse,
): Promise<BackendAddressInboundNatRulePortMappings> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return backendAddressInboundNatRulePortMappingsDeserializer(result.body);
}

/** List of inbound NAT rule port mappings. */
export function listInboundNatRulePortMappings(
  context: Client,
  groupName: string,
  loadBalancerName: string,
  backendPoolName: string,
  parameters: QueryInboundNatRulePortMappingRequest,
  options: LoadBalancersListInboundNatRulePortMappingsOptionalParams = { requestOptions: {} },
): PollerLike<
  OperationState<BackendAddressInboundNatRulePortMappings>,
  BackendAddressInboundNatRulePortMappings
> {
  return getLongRunningPoller(
    context,
    _listInboundNatRulePortMappingsDeserialize,
    ["200", "202", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _listInboundNatRulePortMappingsSend(
          context,
          groupName,
          loadBalancerName,
          backendPoolName,
          parameters,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: "2025-05-01",
    },
  ) as PollerLike<
    OperationState<BackendAddressInboundNatRulePortMappings>,
    BackendAddressInboundNatRulePortMappings
  >;
}

export function _migrateToIpBasedSend(
  context: Client,
  groupName: string,
  loadBalancerName: string,
  options: LoadBalancersMigrateToIpBasedOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{groupName}/providers/Microsoft.Network/loadBalancers/{loadBalancerName}/migrateToIpBased{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      groupName: groupName,
      loadBalancerName: loadBalancerName,
      "api%2Dversion": "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: !options["parameters"]
      ? options["parameters"]
      : migrateLoadBalancerToIpBasedRequestSerializer(options["parameters"]),
  });
}

export async function _migrateToIpBasedDeserialize(
  result: PathUncheckedResponse,
): Promise<MigratedPools> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return migratedPoolsDeserializer(result.body);
}

/** Migrate load balancer to IP Based */
export async function migrateToIpBased(
  context: Client,
  groupName: string,
  loadBalancerName: string,
  options: LoadBalancersMigrateToIpBasedOptionalParams = { requestOptions: {} },
): Promise<MigratedPools> {
  const result = await _migrateToIpBasedSend(context, groupName, loadBalancerName, options);
  return _migrateToIpBasedDeserialize(result);
}

export function _listAllSend(
  context: Client,
  options: LoadBalancersListAllOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Network/loadBalancers{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": "2025-05-01",
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

export async function _listAllDeserialize(
  result: PathUncheckedResponse,
): Promise<_LoadBalancerListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _loadBalancerListResultDeserializer(result.body);
}

/** Gets all the load balancers in a subscription. */
export function listAll(
  context: Client,
  options: LoadBalancersListAllOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<LoadBalancer> {
  return buildPagedAsyncIterator(
    context,
    () => _listAllSend(context, options),
    _listAllDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2025-05-01" },
  );
}

export function _listSend(
  context: Client,
  resourceGroupName: string,
  options: LoadBalancersListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/loadBalancers{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": "2025-05-01",
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
): Promise<_LoadBalancerListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _loadBalancerListResultDeserializer(result.body);
}

/** Gets all the load balancers in a resource group. */
export function list(
  context: Client,
  resourceGroupName: string,
  options: LoadBalancersListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<LoadBalancer> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2025-05-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  loadBalancerName: string,
  options: LoadBalancersDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/loadBalancers/{loadBalancerName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      loadBalancerName: loadBalancerName,
      "api%2Dversion": "2025-05-01",
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
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return;
}

/** Deletes the specified load balancer. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  loadBalancerName: string,
  options: LoadBalancersDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _$deleteSend(context, resourceGroupName, loadBalancerName, options),
    resourceLocationConfig: "location",
    apiVersion: "2025-05-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateTagsSend(
  context: Client,
  resourceGroupName: string,
  loadBalancerName: string,
  parameters: TagsObject,
  options: LoadBalancersUpdateTagsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/loadBalancers/{loadBalancerName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      loadBalancerName: loadBalancerName,
      "api%2Dversion": "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: tagsObjectSerializer(parameters),
  });
}

export async function _updateTagsDeserialize(result: PathUncheckedResponse): Promise<LoadBalancer> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return loadBalancerDeserializer(result.body);
}

/** Updates a load balancer tags. */
export async function updateTags(
  context: Client,
  resourceGroupName: string,
  loadBalancerName: string,
  parameters: TagsObject,
  options: LoadBalancersUpdateTagsOptionalParams = { requestOptions: {} },
): Promise<LoadBalancer> {
  const result = await _updateTagsSend(
    context,
    resourceGroupName,
    loadBalancerName,
    parameters,
    options,
  );
  return _updateTagsDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  loadBalancerName: string,
  parameters: LoadBalancer,
  options: LoadBalancersCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/loadBalancers/{loadBalancerName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      loadBalancerName: loadBalancerName,
      "api%2Dversion": "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: loadBalancerSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<LoadBalancer> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return loadBalancerDeserializer(result.body);
}

/** Creates or updates a load balancer. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  loadBalancerName: string,
  parameters: LoadBalancer,
  options: LoadBalancersCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<LoadBalancer>, LoadBalancer> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, resourceGroupName, loadBalancerName, parameters, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: "2025-05-01",
  }) as PollerLike<OperationState<LoadBalancer>, LoadBalancer>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  loadBalancerName: string,
  options: LoadBalancersGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/loadBalancers/{loadBalancerName}{?api%2Dversion,%24expand}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      loadBalancerName: loadBalancerName,
      "api%2Dversion": "2025-05-01",
      "%24expand": options?.expand,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<LoadBalancer> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return loadBalancerDeserializer(result.body);
}

/** Gets the specified load balancer. */
export async function get(
  context: Client,
  resourceGroupName: string,
  loadBalancerName: string,
  options: LoadBalancersGetOptionalParams = { requestOptions: {} },
): Promise<LoadBalancer> {
  const result = await _getSend(context, resourceGroupName, loadBalancerName, options);
  return _getDeserialize(result);
}

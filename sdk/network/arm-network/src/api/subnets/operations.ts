// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext as Client } from "../index.js";
import type {
  Subnet,
  PrepareNetworkPoliciesRequest,
  UnprepareNetworkPoliciesRequest,
} from "../../models/microsoft/network/models.js";
import {
  cloudErrorDeserializer,
  subnetSerializer,
  subnetDeserializer,
  prepareNetworkPoliciesRequestSerializer,
  unprepareNetworkPoliciesRequestSerializer,
} from "../../models/microsoft/network/models.js";
import type { _SubnetListResult } from "../../models/models.js";
import { _subnetListResultDeserializer } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  SubnetsUnprepareNetworkPoliciesOptionalParams,
  SubnetsPrepareNetworkPoliciesOptionalParams,
  SubnetsListOptionalParams,
  SubnetsDeleteOptionalParams,
  SubnetsCreateOrUpdateOptionalParams,
  SubnetsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _unprepareNetworkPoliciesSend(
  context: Client,
  resourceGroupName: string,
  virtualNetworkName: string,
  subnetName: string,
  unprepareNetworkPoliciesRequestParameters: UnprepareNetworkPoliciesRequest,
  options: SubnetsUnprepareNetworkPoliciesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworks/{virtualNetworkName}/subnets/{subnetName}/unprepareNetworkPolicies{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      virtualNetworkName: virtualNetworkName,
      subnetName: subnetName,
      "api%2Dversion": "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: unprepareNetworkPoliciesRequestSerializer(unprepareNetworkPoliciesRequestParameters),
  });
}

export async function _unprepareNetworkPoliciesDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return;
}

/** Unprepares a subnet by removing network intent policies. */
export function unprepareNetworkPolicies(
  context: Client,
  resourceGroupName: string,
  virtualNetworkName: string,
  subnetName: string,
  unprepareNetworkPoliciesRequestParameters: UnprepareNetworkPoliciesRequest,
  options: SubnetsUnprepareNetworkPoliciesOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(
    context,
    _unprepareNetworkPoliciesDeserialize,
    ["202", "200", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _unprepareNetworkPoliciesSend(
          context,
          resourceGroupName,
          virtualNetworkName,
          subnetName,
          unprepareNetworkPoliciesRequestParameters,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: "2025-05-01",
    },
  ) as PollerLike<OperationState<void>, void>;
}

export function _prepareNetworkPoliciesSend(
  context: Client,
  resourceGroupName: string,
  virtualNetworkName: string,
  subnetName: string,
  prepareNetworkPoliciesRequestParameters: PrepareNetworkPoliciesRequest,
  options: SubnetsPrepareNetworkPoliciesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworks/{virtualNetworkName}/subnets/{subnetName}/prepareNetworkPolicies{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      virtualNetworkName: virtualNetworkName,
      subnetName: subnetName,
      "api%2Dversion": "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: prepareNetworkPoliciesRequestSerializer(prepareNetworkPoliciesRequestParameters),
  });
}

export async function _prepareNetworkPoliciesDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return;
}

/** Prepares a subnet by applying network intent policies. */
export function prepareNetworkPolicies(
  context: Client,
  resourceGroupName: string,
  virtualNetworkName: string,
  subnetName: string,
  prepareNetworkPoliciesRequestParameters: PrepareNetworkPoliciesRequest,
  options: SubnetsPrepareNetworkPoliciesOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _prepareNetworkPoliciesDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _prepareNetworkPoliciesSend(
        context,
        resourceGroupName,
        virtualNetworkName,
        subnetName,
        prepareNetworkPoliciesRequestParameters,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: "2025-05-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _listSend(
  context: Client,
  resourceGroupName: string,
  virtualNetworkName: string,
  options: SubnetsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworks/{virtualNetworkName}/subnets{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      virtualNetworkName: virtualNetworkName,
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

export async function _listDeserialize(result: PathUncheckedResponse): Promise<_SubnetListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _subnetListResultDeserializer(result.body);
}

/** Gets all subnets in a virtual network. */
export function list(
  context: Client,
  resourceGroupName: string,
  virtualNetworkName: string,
  options: SubnetsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Subnet> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, virtualNetworkName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2025-05-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  virtualNetworkName: string,
  subnetName: string,
  options: SubnetsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworks/{virtualNetworkName}/subnets/{subnetName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      virtualNetworkName: virtualNetworkName,
      subnetName: subnetName,
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

/** Deletes the specified subnet. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  virtualNetworkName: string,
  subnetName: string,
  options: SubnetsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, virtualNetworkName, subnetName, options),
    resourceLocationConfig: "location",
    apiVersion: "2025-05-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  virtualNetworkName: string,
  subnetName: string,
  subnetParameters: Subnet,
  options: SubnetsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworks/{virtualNetworkName}/subnets/{subnetName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      virtualNetworkName: virtualNetworkName,
      subnetName: subnetName,
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
    body: subnetSerializer(subnetParameters),
  });
}

export async function _createOrUpdateDeserialize(result: PathUncheckedResponse): Promise<Subnet> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return subnetDeserializer(result.body);
}

/** Creates or updates a subnet in the specified virtual network. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  virtualNetworkName: string,
  subnetName: string,
  subnetParameters: Subnet,
  options: SubnetsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Subnet>, Subnet> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        virtualNetworkName,
        subnetName,
        subnetParameters,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: "2025-05-01",
  }) as PollerLike<OperationState<Subnet>, Subnet>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  virtualNetworkName: string,
  subnetName: string,
  options: SubnetsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworks/{virtualNetworkName}/subnets/{subnetName}{?api%2Dversion,%24expand}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      virtualNetworkName: virtualNetworkName,
      subnetName: subnetName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<Subnet> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return subnetDeserializer(result.body);
}

/** Gets the specified subnet by virtual network and resource group. */
export async function get(
  context: Client,
  resourceGroupName: string,
  virtualNetworkName: string,
  subnetName: string,
  options: SubnetsGetOptionalParams = { requestOptions: {} },
): Promise<Subnet> {
  const result = await _getSend(
    context,
    resourceGroupName,
    virtualNetworkName,
    subnetName,
    options,
  );
  return _getDeserialize(result);
}

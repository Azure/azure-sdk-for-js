// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  BrokerCreateOrUpdateOptionalParams,
  BrokerDeleteOptionalParams,
  BrokerGetOptionalParams,
  BrokerListByResourceGroupOptionalParams,
  IoTOperationsContext as Client,
} from "../index.js";
import {
  BrokerResource,
  brokerResourceSerializer,
  brokerResourceDeserializer,
  _BrokerResourceListResult,
  _brokerResourceListResultDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _brokerGetSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  instanceName: string,
  brokerName: string,
  options: BrokerGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.IoTOperations/instances/{instanceName}/brokers/{brokerName}",
      subscriptionId,
      resourceGroupName,
      instanceName,
      brokerName,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _brokerGetDeserialize(
  result: PathUncheckedResponse,
): Promise<BrokerResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return brokerResourceDeserializer(result.body);
}

/** Get a BrokerResource */
export async function brokerGet(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  instanceName: string,
  brokerName: string,
  options: BrokerGetOptionalParams = { requestOptions: {} },
): Promise<BrokerResource> {
  const result = await _brokerGetSend(
    context,
    subscriptionId,
    resourceGroupName,
    instanceName,
    brokerName,
    options,
  );
  return _brokerGetDeserialize(result);
}

export function _brokerCreateOrUpdateSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  instanceName: string,
  brokerName: string,
  resource: BrokerResource,
  options: BrokerCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.IoTOperations/instances/{instanceName}/brokers/{brokerName}",
      subscriptionId,
      resourceGroupName,
      instanceName,
      brokerName,
    )
    .put({
      ...operationOptionsToRequestParameters(options),
      body: brokerResourceSerializer(resource),
    });
}

export async function _brokerCreateOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<BrokerResource> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return brokerResourceDeserializer(result.body);
}

/** Create a BrokerResource */
export function brokerCreateOrUpdate(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  instanceName: string,
  brokerName: string,
  resource: BrokerResource,
  options: BrokerCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<BrokerResource>, BrokerResource> {
  return getLongRunningPoller(
    context,
    _brokerCreateOrUpdateDeserialize,
    ["200", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _brokerCreateOrUpdateSend(
          context,
          subscriptionId,
          resourceGroupName,
          instanceName,
          brokerName,
          resource,
          options,
        ),
      resourceLocationConfig: "azure-async-operation",
    },
  ) as PollerLike<OperationState<BrokerResource>, BrokerResource>;
}

export function _brokerDeleteSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  instanceName: string,
  brokerName: string,
  options: BrokerDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.IoTOperations/instances/{instanceName}/brokers/{brokerName}",
      subscriptionId,
      resourceGroupName,
      instanceName,
      brokerName,
    )
    .delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _brokerDeleteDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["202", "204", "200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** Delete a BrokerResource */
export function brokerDelete(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  instanceName: string,
  brokerName: string,
  options: BrokerDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(
    context,
    _brokerDeleteDeserialize,
    ["202", "204", "200"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _brokerDeleteSend(
          context,
          subscriptionId,
          resourceGroupName,
          instanceName,
          brokerName,
          options,
        ),
      resourceLocationConfig: "location",
    },
  ) as PollerLike<OperationState<void>, void>;
}

export function _brokerListByResourceGroupSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  instanceName: string,
  options: BrokerListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.IoTOperations/instances/{instanceName}/brokers",
      subscriptionId,
      resourceGroupName,
      instanceName,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _brokerListByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_BrokerResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _brokerResourceListResultDeserializer(result.body);
}

/** List BrokerResource resources by InstanceResource */
export function brokerListByResourceGroup(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  instanceName: string,
  options: BrokerListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<BrokerResource> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _brokerListByResourceGroupSend(
        context,
        subscriptionId,
        resourceGroupName,
        instanceName,
        options,
      ),
    _brokerListByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

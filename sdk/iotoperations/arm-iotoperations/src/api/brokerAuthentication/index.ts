// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  BrokerAuthenticationCreateOrUpdateOptionalParams,
  BrokerAuthenticationDeleteOptionalParams,
  BrokerAuthenticationGetOptionalParams,
  BrokerAuthenticationListByResourceGroupOptionalParams,
  IoTOperationsContext as Client,
} from "../index.js";
import {
  BrokerAuthenticationResource,
  brokerAuthenticationResourceSerializer,
  brokerAuthenticationResourceDeserializer,
  _BrokerAuthenticationResourceListResult,
  _brokerAuthenticationResourceListResultDeserializer,
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

export function _brokerAuthenticationGetSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  instanceName: string,
  brokerName: string,
  authenticationName: string,
  options: BrokerAuthenticationGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.IoTOperations/instances/{instanceName}/brokers/{brokerName}/authentications/{authenticationName}",
      subscriptionId,
      resourceGroupName,
      instanceName,
      brokerName,
      authenticationName,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _brokerAuthenticationGetDeserialize(
  result: PathUncheckedResponse,
): Promise<BrokerAuthenticationResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return brokerAuthenticationResourceDeserializer(result.body);
}

/** Get a BrokerAuthenticationResource */
export async function brokerAuthenticationGet(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  instanceName: string,
  brokerName: string,
  authenticationName: string,
  options: BrokerAuthenticationGetOptionalParams = { requestOptions: {} },
): Promise<BrokerAuthenticationResource> {
  const result = await _brokerAuthenticationGetSend(
    context,
    subscriptionId,
    resourceGroupName,
    instanceName,
    brokerName,
    authenticationName,
    options,
  );
  return _brokerAuthenticationGetDeserialize(result);
}

export function _brokerAuthenticationCreateOrUpdateSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  instanceName: string,
  brokerName: string,
  authenticationName: string,
  resource: BrokerAuthenticationResource,
  options: BrokerAuthenticationCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.IoTOperations/instances/{instanceName}/brokers/{brokerName}/authentications/{authenticationName}",
      subscriptionId,
      resourceGroupName,
      instanceName,
      brokerName,
      authenticationName,
    )
    .put({
      ...operationOptionsToRequestParameters(options),
      body: brokerAuthenticationResourceSerializer(resource),
    });
}

export async function _brokerAuthenticationCreateOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<BrokerAuthenticationResource> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return brokerAuthenticationResourceDeserializer(result.body);
}

/** Create a BrokerAuthenticationResource */
export function brokerAuthenticationCreateOrUpdate(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  instanceName: string,
  brokerName: string,
  authenticationName: string,
  resource: BrokerAuthenticationResource,
  options: BrokerAuthenticationCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): PollerLike<
  OperationState<BrokerAuthenticationResource>,
  BrokerAuthenticationResource
> {
  return getLongRunningPoller(
    context,
    _brokerAuthenticationCreateOrUpdateDeserialize,
    ["200", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _brokerAuthenticationCreateOrUpdateSend(
          context,
          subscriptionId,
          resourceGroupName,
          instanceName,
          brokerName,
          authenticationName,
          resource,
          options,
        ),
      resourceLocationConfig: "azure-async-operation",
    },
  ) as PollerLike<
    OperationState<BrokerAuthenticationResource>,
    BrokerAuthenticationResource
  >;
}

export function _brokerAuthenticationDeleteSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  instanceName: string,
  brokerName: string,
  authenticationName: string,
  options: BrokerAuthenticationDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.IoTOperations/instances/{instanceName}/brokers/{brokerName}/authentications/{authenticationName}",
      subscriptionId,
      resourceGroupName,
      instanceName,
      brokerName,
      authenticationName,
    )
    .delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _brokerAuthenticationDeleteDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["202", "204", "200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** Delete a BrokerAuthenticationResource */
export function brokerAuthenticationDelete(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  instanceName: string,
  brokerName: string,
  authenticationName: string,
  options: BrokerAuthenticationDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(
    context,
    _brokerAuthenticationDeleteDeserialize,
    ["202", "204", "200"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _brokerAuthenticationDeleteSend(
          context,
          subscriptionId,
          resourceGroupName,
          instanceName,
          brokerName,
          authenticationName,
          options,
        ),
      resourceLocationConfig: "location",
    },
  ) as PollerLike<OperationState<void>, void>;
}

export function _brokerAuthenticationListByResourceGroupSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  instanceName: string,
  brokerName: string,
  options: BrokerAuthenticationListByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.IoTOperations/instances/{instanceName}/brokers/{brokerName}/authentications",
      subscriptionId,
      resourceGroupName,
      instanceName,
      brokerName,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _brokerAuthenticationListByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_BrokerAuthenticationResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _brokerAuthenticationResourceListResultDeserializer(result.body);
}

/** List BrokerAuthenticationResource resources by BrokerResource */
export function brokerAuthenticationListByResourceGroup(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  instanceName: string,
  brokerName: string,
  options: BrokerAuthenticationListByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<BrokerAuthenticationResource> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _brokerAuthenticationListByResourceGroupSend(
        context,
        subscriptionId,
        resourceGroupName,
        instanceName,
        brokerName,
        options,
      ),
    _brokerAuthenticationListByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

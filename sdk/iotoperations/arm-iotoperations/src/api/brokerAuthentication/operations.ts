// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { IoTOperationsContext as Client } from "../index.js";
import type {
  BrokerAuthenticationResource,
  _BrokerAuthenticationResourceListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  brokerAuthenticationResourceSerializer,
  brokerAuthenticationResourceDeserializer,
  _brokerAuthenticationResourceListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  BrokerAuthenticationListByResourceGroupOptionalParams,
  BrokerAuthenticationDeleteOptionalParams,
  BrokerAuthenticationCreateOrUpdateOptionalParams,
  BrokerAuthenticationGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  instanceName: string,
  brokerName: string,
  options: BrokerAuthenticationListByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.IoTOperations/instances/{instanceName}/brokers/{brokerName}/authentications{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      instanceName: instanceName,
      brokerName: brokerName,
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
): Promise<_BrokerAuthenticationResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _brokerAuthenticationResourceListResultDeserializer(result.body);
}

/** List BrokerAuthenticationResource resources by BrokerResource */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  instanceName: string,
  brokerName: string,
  options: BrokerAuthenticationListByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<BrokerAuthenticationResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, instanceName, brokerName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  instanceName: string,
  brokerName: string,
  authenticationName: string,
  options: BrokerAuthenticationDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.IoTOperations/instances/{instanceName}/brokers/{brokerName}/authentications/{authenticationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      instanceName: instanceName,
      brokerName: brokerName,
      authenticationName: authenticationName,
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

/** Delete a BrokerAuthenticationResource */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  instanceName: string,
  brokerName: string,
  authenticationName: string,
  options: BrokerAuthenticationDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(
        context,
        resourceGroupName,
        instanceName,
        brokerName,
        authenticationName,
        options,
      ),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  instanceName: string,
  brokerName: string,
  authenticationName: string,
  resource: BrokerAuthenticationResource,
  options: BrokerAuthenticationCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.IoTOperations/instances/{instanceName}/brokers/{brokerName}/authentications/{authenticationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      instanceName: instanceName,
      brokerName: brokerName,
      authenticationName: authenticationName,
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
    body: brokerAuthenticationResourceSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<BrokerAuthenticationResource> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return brokerAuthenticationResourceDeserializer(result.body);
}

/** Create a BrokerAuthenticationResource */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  instanceName: string,
  brokerName: string,
  authenticationName: string,
  resource: BrokerAuthenticationResource,
  options: BrokerAuthenticationCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<BrokerAuthenticationResource>, BrokerAuthenticationResource> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        instanceName,
        brokerName,
        authenticationName,
        resource,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<BrokerAuthenticationResource>, BrokerAuthenticationResource>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  instanceName: string,
  brokerName: string,
  authenticationName: string,
  options: BrokerAuthenticationGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.IoTOperations/instances/{instanceName}/brokers/{brokerName}/authentications/{authenticationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      instanceName: instanceName,
      brokerName: brokerName,
      authenticationName: authenticationName,
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

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<BrokerAuthenticationResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return brokerAuthenticationResourceDeserializer(result.body);
}

/** Get a BrokerAuthenticationResource */
export async function get(
  context: Client,
  resourceGroupName: string,
  instanceName: string,
  brokerName: string,
  authenticationName: string,
  options: BrokerAuthenticationGetOptionalParams = { requestOptions: {} },
): Promise<BrokerAuthenticationResource> {
  const result = await _getSend(
    context,
    resourceGroupName,
    instanceName,
    brokerName,
    authenticationName,
    options,
  );
  return _getDeserialize(result);
}

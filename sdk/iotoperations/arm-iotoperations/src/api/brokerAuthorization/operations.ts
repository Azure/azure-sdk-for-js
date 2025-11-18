// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { IoTOperationsContext as Client } from "../index.js";
import type {
  BrokerAuthorizationResource,
  _BrokerAuthorizationResourceListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  brokerAuthorizationResourceSerializer,
  brokerAuthorizationResourceDeserializer,
  _brokerAuthorizationResourceListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  BrokerAuthorizationListByResourceGroupOptionalParams,
  BrokerAuthorizationDeleteOptionalParams,
  BrokerAuthorizationCreateOrUpdateOptionalParams,
  BrokerAuthorizationGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  instanceName: string,
  brokerName: string,
  options: BrokerAuthorizationListByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.IoTOperations/instances/{instanceName}/brokers/{brokerName}/authorizations{?api%2Dversion}",
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
): Promise<_BrokerAuthorizationResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _brokerAuthorizationResourceListResultDeserializer(result.body);
}

/** List BrokerAuthorizationResource resources by BrokerResource */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  instanceName: string,
  brokerName: string,
  options: BrokerAuthorizationListByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<BrokerAuthorizationResource> {
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
  authorizationName: string,
  options: BrokerAuthorizationDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.IoTOperations/instances/{instanceName}/brokers/{brokerName}/authorizations/{authorizationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      instanceName: instanceName,
      brokerName: brokerName,
      authorizationName: authorizationName,
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

/** Delete a BrokerAuthorizationResource */
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
  authorizationName: string,
  options: BrokerAuthorizationDeleteOptionalParams = { requestOptions: {} },
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
        authorizationName,
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
  authorizationName: string,
  resource: BrokerAuthorizationResource,
  options: BrokerAuthorizationCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.IoTOperations/instances/{instanceName}/brokers/{brokerName}/authorizations/{authorizationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      instanceName: instanceName,
      brokerName: brokerName,
      authorizationName: authorizationName,
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
    body: brokerAuthorizationResourceSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<BrokerAuthorizationResource> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return brokerAuthorizationResourceDeserializer(result.body);
}

/** Create a BrokerAuthorizationResource */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  instanceName: string,
  brokerName: string,
  authorizationName: string,
  resource: BrokerAuthorizationResource,
  options: BrokerAuthorizationCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<BrokerAuthorizationResource>, BrokerAuthorizationResource> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        instanceName,
        brokerName,
        authorizationName,
        resource,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<BrokerAuthorizationResource>, BrokerAuthorizationResource>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  instanceName: string,
  brokerName: string,
  authorizationName: string,
  options: BrokerAuthorizationGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.IoTOperations/instances/{instanceName}/brokers/{brokerName}/authorizations/{authorizationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      instanceName: instanceName,
      brokerName: brokerName,
      authorizationName: authorizationName,
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
): Promise<BrokerAuthorizationResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return brokerAuthorizationResourceDeserializer(result.body);
}

/** Get a BrokerAuthorizationResource */
export async function get(
  context: Client,
  resourceGroupName: string,
  instanceName: string,
  brokerName: string,
  authorizationName: string,
  options: BrokerAuthorizationGetOptionalParams = { requestOptions: {} },
): Promise<BrokerAuthorizationResource> {
  const result = await _getSend(
    context,
    resourceGroupName,
    instanceName,
    brokerName,
    authorizationName,
    options,
  );
  return _getDeserialize(result);
}

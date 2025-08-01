// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MessagingConnectorsContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  MessagingConnector,
  messagingConnectorSerializer,
  messagingConnectorDeserializer,
  _MessagingConnectorListResult,
  _messagingConnectorListResultDeserializer,
  MessagingConnectorTagsUpdate,
  messagingConnectorTagsUpdateSerializer,
} from "../../models/azure/mgmt/placeholder/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  ConnectorOperationsUpdateTagsOptionalParams,
  ConnectorOperationsListBySubscriptionOptionalParams,
  ConnectorOperationsListByResourceGroupOptionalParams,
  ConnectorOperationsResumeOptionalParams,
  ConnectorOperationsPauseOptionalParams,
  ConnectorOperationsDeleteOptionalParams,
  ConnectorOperationsCreateOrUpdateOptionalParams,
  ConnectorOperationsGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _updateTagsSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  properties: MessagingConnectorTagsUpdate,
  options: ConnectorOperationsUpdateTagsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MessagingConnectors/connectors/{name}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .patch({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      body: messagingConnectorTagsUpdateSerializer(properties),
    });
}

export async function _updateTagsDeserialize(
  result: PathUncheckedResponse,
): Promise<MessagingConnector> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return messagingConnectorDeserializer(result.body);
}

/** Update Tags of Connector */
export async function updateTags(
  context: Client,
  resourceGroupName: string,
  name: string,
  properties: MessagingConnectorTagsUpdate,
  options: ConnectorOperationsUpdateTagsOptionalParams = { requestOptions: {} },
): Promise<MessagingConnector> {
  const result = await _updateTagsSend(
    context,
    resourceGroupName,
    name,
    properties,
    options,
  );
  return _updateTagsDeserialize(result);
}

export function _listBySubscriptionSend(
  context: Client,
  options: ConnectorOperationsListBySubscriptionOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.MessagingConnectors/connectors{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _listBySubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<_MessagingConnectorListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _messagingConnectorListResultDeserializer(result.body);
}

/** List Connector By Subscription */
export function listBySubscription(
  context: Client,
  options: ConnectorOperationsListBySubscriptionOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<MessagingConnector> {
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
  options: ConnectorOperationsListByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MessagingConnectors/connectors{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _listByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_MessagingConnectorListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _messagingConnectorListResultDeserializer(result.body);
}

/** List Connector By ResourceGroup and Subscription */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: ConnectorOperationsListByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<MessagingConnector> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _resumeSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: ConnectorOperationsResumeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MessagingConnectors/connectors/{name}/resume{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _resumeDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Resume one Connector to running status */
export async function resume(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: ConnectorOperationsResumeOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _resumeSend(context, resourceGroupName, name, options);
  return _resumeDeserialize(result);
}

export function _pauseSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: ConnectorOperationsPauseOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MessagingConnectors/connectors/{name}/pause{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _pauseDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Pause one Connector to paused status */
export async function pause(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: ConnectorOperationsPauseOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _pauseSend(context, resourceGroupName, name, options);
  return _pauseDeserialize(result);
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: ConnectorOperationsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MessagingConnectors/connectors/{name}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .delete({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _$deleteDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Delete an Connector instance for the specified subscription, resource group, and instance name. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: ConnectorOperationsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, resourceGroupName, name, options);
  return _$deleteDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  resource: MessagingConnector,
  options: ConnectorOperationsCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MessagingConnectors/connectors/{name}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .put({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      body: messagingConnectorSerializer(resource),
    });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<MessagingConnector> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return messagingConnectorDeserializer(result.body);
}

/** Create an Connector instance for the specified subscription, resource group, and instance name. */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  name: string,
  resource: MessagingConnector,
  options: ConnectorOperationsCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): Promise<MessagingConnector> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    name,
    resource,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: ConnectorOperationsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MessagingConnectors/connectors/{name}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<MessagingConnector> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return messagingConnectorDeserializer(result.body);
}

/** Gets an Connector instance for the specified subscription, resource group, and instance name. */
export async function get(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: ConnectorOperationsGetOptionalParams = { requestOptions: {} },
): Promise<MessagingConnector> {
  const result = await _getSend(context, resourceGroupName, name, options);
  return _getDeserialize(result);
}

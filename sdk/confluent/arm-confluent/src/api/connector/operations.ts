// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ConfluentManagementContext as Client } from "../index.js";
import {
  resourceProviderDefaultErrorResponseDeserializer,
  errorResponseDeserializer,
  ConnectorResource,
  connectorResourceSerializer,
  connectorResourceDeserializer,
  _ListConnectorsSuccessResponse,
  _listConnectorsSuccessResponseDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  ConnectorListOptionalParams,
  ConnectorDeleteOptionalParams,
  ConnectorCreateOrUpdateOptionalParams,
  ConnectorGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  environmentId: string,
  clusterId: string,
  options: ConnectorListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Confluent/organizations/{organizationName}/environments/{environmentId}/clusters/{clusterId}/connectors{?api%2Dversion,pageSize,pageToken}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      organizationName: organizationName,
      environmentId: environmentId,
      clusterId: clusterId,
      "api%2Dversion": context.apiVersion,
      pageSize: options?.pageSize,
      pageToken: options?.pageToken,
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

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_ListConnectorsSuccessResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = resourceProviderDefaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return _listConnectorsSuccessResponseDeserializer(result.body);
}

/** Lists all the connectors in a cluster */
export function list(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  environmentId: string,
  clusterId: string,
  options: ConnectorListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ConnectorResource> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listSend(context, resourceGroupName, organizationName, environmentId, clusterId, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  environmentId: string,
  clusterId: string,
  connectorName: string,
  options: ConnectorDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Confluent/organizations/{organizationName}/environments/{environmentId}/clusters/{clusterId}/connectors/{connectorName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      organizationName: organizationName,
      environmentId: environmentId,
      clusterId: clusterId,
      connectorName: connectorName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "204", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Delete confluent connector by name */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  environmentId: string,
  clusterId: string,
  connectorName: string,
  options: ConnectorDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(
        context,
        resourceGroupName,
        organizationName,
        environmentId,
        clusterId,
        connectorName,
        options,
      ),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  environmentId: string,
  clusterId: string,
  connectorName: string,
  options: ConnectorCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Confluent/organizations/{organizationName}/environments/{environmentId}/clusters/{clusterId}/connectors/{connectorName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      organizationName: organizationName,
      environmentId: environmentId,
      clusterId: clusterId,
      connectorName: connectorName,
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
    body: !options["body"] ? options["body"] : connectorResourceSerializer(options["body"]),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<ConnectorResource> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = resourceProviderDefaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return connectorResourceDeserializer(result.body);
}

/** Create confluent connector by Name */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  environmentId: string,
  clusterId: string,
  connectorName: string,
  options: ConnectorCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<ConnectorResource> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    organizationName,
    environmentId,
    clusterId,
    connectorName,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  environmentId: string,
  clusterId: string,
  connectorName: string,
  options: ConnectorGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Confluent/organizations/{organizationName}/environments/{environmentId}/clusters/{clusterId}/connectors/{connectorName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      organizationName: organizationName,
      environmentId: environmentId,
      clusterId: clusterId,
      connectorName: connectorName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<ConnectorResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = resourceProviderDefaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return connectorResourceDeserializer(result.body);
}

/** Get confluent connector by Name */
export async function get(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  environmentId: string,
  clusterId: string,
  connectorName: string,
  options: ConnectorGetOptionalParams = { requestOptions: {} },
): Promise<ConnectorResource> {
  const result = await _getSend(
    context,
    resourceGroupName,
    organizationName,
    environmentId,
    clusterId,
    connectorName,
    options,
  );
  return _getDeserialize(result);
}

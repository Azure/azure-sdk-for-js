// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureSiteRecoveryManagementServiceAPIContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  PrivateEndpointConnectionProxy,
  privateEndpointConnectionProxySerializer,
  privateEndpointConnectionProxyDeserializer,
  _PrivateEndpointConnectionProxyListResult,
  _privateEndpointConnectionProxyListResultDeserializer,
} from "../../models/models.js";
import {
  PrivateEndpointConnectionProxiesValidateOptionalParams,
  PrivateEndpointConnectionProxiesListOptionalParams,
  PrivateEndpointConnectionProxiesDeleteOptionalParams,
  PrivateEndpointConnectionProxiesCreateOptionalParams,
  PrivateEndpointConnectionProxiesGetOptionalParams,
} from "./options.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
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

export function _validateSend(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  privateEndpointConnectionProxyName: string,
  body: PrivateEndpointConnectionProxy,
  options: PrivateEndpointConnectionProxiesValidateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataReplication/replicationVaults/{vaultName}/privateEndpointConnectionProxies/{privateEndpointConnectionProxyName}/validate{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vaultName: vaultName,
      privateEndpointConnectionProxyName: privateEndpointConnectionProxyName,
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
    body: privateEndpointConnectionProxySerializer(body),
  });
}

export async function _validateDeserialize(
  result: PathUncheckedResponse,
): Promise<PrivateEndpointConnectionProxy> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return privateEndpointConnectionProxyDeserializer(result.body);
}

/** Returns remote private endpoint connection information after validation. */
export async function validate(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  privateEndpointConnectionProxyName: string,
  body: PrivateEndpointConnectionProxy,
  options: PrivateEndpointConnectionProxiesValidateOptionalParams = {
    requestOptions: {},
  },
): Promise<PrivateEndpointConnectionProxy> {
  const result = await _validateSend(
    context,
    resourceGroupName,
    vaultName,
    privateEndpointConnectionProxyName,
    body,
    options,
  );
  return _validateDeserialize(result);
}

export function _listSend(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  options: PrivateEndpointConnectionProxiesListOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataReplication/replicationVaults/{vaultName}/privateEndpointConnectionProxies{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vaultName: vaultName,
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

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_PrivateEndpointConnectionProxyListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _privateEndpointConnectionProxyListResultDeserializer(result.body);
}

/** Gets the all private endpoint connections proxies. */
export function list(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  options: PrivateEndpointConnectionProxiesListOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<PrivateEndpointConnectionProxy> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, vaultName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  privateEndpointConnectionProxyName: string,
  options: PrivateEndpointConnectionProxiesDeleteOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataReplication/replicationVaults/{vaultName}/privateEndpointConnectionProxies/{privateEndpointConnectionProxyName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vaultName: vaultName,
      privateEndpointConnectionProxyName: privateEndpointConnectionProxyName,
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

/** Returns the operation to track the deletion of private endpoint connection proxy. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  privateEndpointConnectionProxyName: string,
  options: PrivateEndpointConnectionProxiesDeleteOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(
        context,
        resourceGroupName,
        vaultName,
        privateEndpointConnectionProxyName,
        options,
      ),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  privateEndpointConnectionProxyName: string,
  resource: PrivateEndpointConnectionProxy,
  options: PrivateEndpointConnectionProxiesCreateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataReplication/replicationVaults/{vaultName}/privateEndpointConnectionProxies/{privateEndpointConnectionProxyName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vaultName: vaultName,
      privateEndpointConnectionProxyName: privateEndpointConnectionProxyName,
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
    body: privateEndpointConnectionProxySerializer(resource),
  });
}

export async function _createDeserialize(
  result: PathUncheckedResponse,
): Promise<PrivateEndpointConnectionProxy> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return privateEndpointConnectionProxyDeserializer(result.body);
}

/** Create a new private endpoint connection proxy which includes both auto and manual approval types. Creating the proxy resource will also create a private endpoint connection resource. */
export async function create(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  privateEndpointConnectionProxyName: string,
  resource: PrivateEndpointConnectionProxy,
  options: PrivateEndpointConnectionProxiesCreateOptionalParams = {
    requestOptions: {},
  },
): Promise<PrivateEndpointConnectionProxy> {
  const result = await _createSend(
    context,
    resourceGroupName,
    vaultName,
    privateEndpointConnectionProxyName,
    resource,
    options,
  );
  return _createDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  privateEndpointConnectionProxyName: string,
  options: PrivateEndpointConnectionProxiesGetOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataReplication/replicationVaults/{vaultName}/privateEndpointConnectionProxies/{privateEndpointConnectionProxyName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vaultName: vaultName,
      privateEndpointConnectionProxyName: privateEndpointConnectionProxyName,
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
): Promise<PrivateEndpointConnectionProxy> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return privateEndpointConnectionProxyDeserializer(result.body);
}

/** Gets the private endpoint connection proxy details. */
export async function get(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  privateEndpointConnectionProxyName: string,
  options: PrivateEndpointConnectionProxiesGetOptionalParams = {
    requestOptions: {},
  },
): Promise<PrivateEndpointConnectionProxy> {
  const result = await _getSend(
    context,
    resourceGroupName,
    vaultName,
    privateEndpointConnectionProxyName,
    options,
  );
  return _getDeserialize(result);
}

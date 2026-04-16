// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { EventGridManagementContext as Client } from "../index.js";
import type { Client as Client_1, _ClientsListResult } from "../../models/models.js";
import {
  errorResponseDeserializer,
  clientSerializer,
  clientDeserializer,
  _clientsListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ClientsListByNamespaceOptionalParams,
  ClientsDeleteOptionalParams,
  ClientsCreateOrUpdateOptionalParams,
  ClientsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listByNamespaceSend(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  options: ClientsListByNamespaceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/namespaces/{namespaceName}/clients{?api%2Dversion,%24filter,%24top}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      namespaceName: namespaceName,
      "api%2Dversion": context.apiVersion ?? "2025-07-15-preview",
      "%24filter": options?.filter,
      "%24top": options?.top,
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

export async function _listByNamespaceDeserialize(
  result: PathUncheckedResponse,
): Promise<_ClientsListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _clientsListResultDeserializer(result.body);
}

/** Get all the permission bindings under a namespace. */
export function listByNamespace(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  options: ClientsListByNamespaceOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Client_1> {
  return buildPagedAsyncIterator(
    context,
    () => _listByNamespaceSend(context, resourceGroupName, namespaceName, options),
    _listByNamespaceDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-07-15-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  clientName: string,
  options: ClientsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/namespaces/{namespaceName}/clients/{clientName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      namespaceName: namespaceName,
      clientName: clientName,
      "api%2Dversion": context.apiVersion ?? "2025-07-15-preview",
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
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Delete an existing client. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  clientName: string,
  options: ClientsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, namespaceName, clientName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-07-15-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  clientName: string,
  clientInfo: Client_1,
  options: ClientsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/namespaces/{namespaceName}/clients/{clientName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      namespaceName: namespaceName,
      clientName: clientName,
      "api%2Dversion": context.apiVersion ?? "2025-07-15-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: clientSerializer(clientInfo),
  });
}

export async function _createOrUpdateDeserialize(result: PathUncheckedResponse): Promise<Client_1> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return clientDeserializer(result.body);
}

/** Create or update a client with the specified parameters. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  clientName: string,
  clientInfo: Client_1,
  options: ClientsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Client_1>, Client_1> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        namespaceName,
        clientName,
        clientInfo,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2025-07-15-preview",
  }) as PollerLike<OperationState<Client_1>, Client_1>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  clientName: string,
  options: ClientsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/namespaces/{namespaceName}/clients/{clientName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      namespaceName: namespaceName,
      clientName: clientName,
      "api%2Dversion": context.apiVersion ?? "2025-07-15-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<Client_1> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return clientDeserializer(result.body);
}

/** Get properties of a client. */
export async function get(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  clientName: string,
  options: ClientsGetOptionalParams = { requestOptions: {} },
): Promise<Client_1> {
  const result = await _getSend(context, resourceGroupName, namespaceName, clientName, options);
  return _getDeserialize(result);
}

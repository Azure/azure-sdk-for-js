// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext as Client } from "../index.js";
import type {
  GatewayContract,
  _GatewayCollection,
  GatewayKeysContract,
  GatewayKeyRegenerationRequestContract,
  GatewayTokenRequestContract,
  GatewayTokenContract,
  GatewayListDebugCredentialsContract,
  GatewayDebugCredentialsContract,
  GatewayListTraceContract,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  gatewayContractSerializer,
  gatewayContractDeserializer,
  _gatewayCollectionDeserializer,
  gatewayKeysContractDeserializer,
  gatewayKeyRegenerationRequestContractSerializer,
  gatewayTokenRequestContractSerializer,
  gatewayTokenContractDeserializer,
  gatewayListDebugCredentialsContractSerializer,
  gatewayDebugCredentialsContractDeserializer,
  gatewayListTraceContractSerializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  GatewayListTraceOptionalParams,
  GatewayListDebugCredentialsOptionalParams,
  GatewayInvalidateDebugCredentialsOptionalParams,
  GatewayGenerateTokenOptionalParams,
  GatewayRegenerateKeyOptionalParams,
  GatewayListKeysOptionalParams,
  GatewayListByServiceOptionalParams,
  GatewayDeleteOptionalParams,
  GatewayUpdateOptionalParams,
  GatewayCreateOrUpdateOptionalParams,
  GatewayGetEntityTagOptionalParams,
  GatewayGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listTraceSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  gatewayId: string,
  parameters: GatewayListTraceContract,
  options: GatewayListTraceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/gateways/{gatewayId}/listTrace{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      gatewayId: gatewayId,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: gatewayListTraceContractSerializer(parameters),
  });
}

export async function _listTraceDeserialize(
  result: PathUncheckedResponse,
): Promise<Record<string, any>> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return Object.fromEntries(Object.entries(result.body).map(([k, p]: [string, any]) => [k, p]));
}

/** Fetches trace collected by gateway. */
export async function listTrace(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  gatewayId: string,
  parameters: GatewayListTraceContract,
  options: GatewayListTraceOptionalParams = { requestOptions: {} },
): Promise<Record<string, any>> {
  const result = await _listTraceSend(
    context,
    resourceGroupName,
    serviceName,
    gatewayId,
    parameters,
    options,
  );
  return _listTraceDeserialize(result);
}

export function _listDebugCredentialsSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  gatewayId: string,
  parameters: GatewayListDebugCredentialsContract,
  options: GatewayListDebugCredentialsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/gateways/{gatewayId}/listDebugCredentials{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      gatewayId: gatewayId,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: gatewayListDebugCredentialsContractSerializer(parameters),
  });
}

export async function _listDebugCredentialsDeserialize(
  result: PathUncheckedResponse,
): Promise<GatewayDebugCredentialsContract> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return gatewayDebugCredentialsContractDeserializer(result.body);
}

/** Create new debug credentials for gateway. */
export async function listDebugCredentials(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  gatewayId: string,
  parameters: GatewayListDebugCredentialsContract,
  options: GatewayListDebugCredentialsOptionalParams = { requestOptions: {} },
): Promise<GatewayDebugCredentialsContract> {
  const result = await _listDebugCredentialsSend(
    context,
    resourceGroupName,
    serviceName,
    gatewayId,
    parameters,
    options,
  );
  return _listDebugCredentialsDeserialize(result);
}

export function _invalidateDebugCredentialsSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  gatewayId: string,
  options: GatewayInvalidateDebugCredentialsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/gateways/{gatewayId}/invalidateDebugCredentials{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      gatewayId: gatewayId,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _invalidateDebugCredentialsDeserialize(
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

/** Action is invalidating all debug credentials issued for gateway. */
export async function invalidateDebugCredentials(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  gatewayId: string,
  options: GatewayInvalidateDebugCredentialsOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _invalidateDebugCredentialsSend(
    context,
    resourceGroupName,
    serviceName,
    gatewayId,
    options,
  );
  return _invalidateDebugCredentialsDeserialize(result);
}

export function _generateTokenSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  gatewayId: string,
  parameters: GatewayTokenRequestContract,
  options: GatewayGenerateTokenOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/gateways/{gatewayId}/generateToken{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      gatewayId: gatewayId,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: gatewayTokenRequestContractSerializer(parameters),
  });
}

export async function _generateTokenDeserialize(
  result: PathUncheckedResponse,
): Promise<GatewayTokenContract> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return gatewayTokenContractDeserializer(result.body);
}

/** Gets the Shared Access Authorization Token for the gateway. */
export async function generateToken(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  gatewayId: string,
  parameters: GatewayTokenRequestContract,
  options: GatewayGenerateTokenOptionalParams = { requestOptions: {} },
): Promise<GatewayTokenContract> {
  const result = await _generateTokenSend(
    context,
    resourceGroupName,
    serviceName,
    gatewayId,
    parameters,
    options,
  );
  return _generateTokenDeserialize(result);
}

export function _regenerateKeySend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  gatewayId: string,
  parameters: GatewayKeyRegenerationRequestContract,
  options: GatewayRegenerateKeyOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/gateways/{gatewayId}/regenerateKey{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      gatewayId: gatewayId,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: gatewayKeyRegenerationRequestContractSerializer(parameters),
  });
}

export async function _regenerateKeyDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Regenerates specified gateway key invalidating any tokens created with it. */
export async function regenerateKey(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  gatewayId: string,
  parameters: GatewayKeyRegenerationRequestContract,
  options: GatewayRegenerateKeyOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _regenerateKeySend(
    context,
    resourceGroupName,
    serviceName,
    gatewayId,
    parameters,
    options,
  );
  return _regenerateKeyDeserialize(result);
}

export function _listKeysSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  gatewayId: string,
  options: GatewayListKeysOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/gateways/{gatewayId}/listKeys{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      gatewayId: gatewayId,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listKeysDeserialize(
  result: PathUncheckedResponse,
): Promise<GatewayKeysContract> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return gatewayKeysContractDeserializer(result.body);
}

/** Retrieves gateway keys. */
export async function listKeys(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  gatewayId: string,
  options: GatewayListKeysOptionalParams = { requestOptions: {} },
): Promise<GatewayKeysContract> {
  const result = await _listKeysSend(context, resourceGroupName, serviceName, gatewayId, options);
  return _listKeysDeserialize(result);
}

export function _listByServiceSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  options: GatewayListByServiceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/gateways{?api%2Dversion,%24filter,%24top,%24skip}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
      "%24filter": options?.filter,
      "%24top": options?.top,
      "%24skip": options?.skip,
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

export async function _listByServiceDeserialize(
  result: PathUncheckedResponse,
): Promise<_GatewayCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _gatewayCollectionDeserializer(result.body);
}

/** Lists a collection of gateways registered with service instance. */
export function listByService(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  options: GatewayListByServiceOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<GatewayContract> {
  return buildPagedAsyncIterator(
    context,
    () => _listByServiceSend(context, resourceGroupName, serviceName, options),
    _listByServiceDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-03-01-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  gatewayId: string,
  ifMatch: string,
  options: GatewayDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/gateways/{gatewayId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      gatewayId: gatewayId,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({
    ...operationOptionsToRequestParameters(options),
    headers: { "if-match": ifMatch, ...options.requestOptions?.headers },
  });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Deletes specific Gateway. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  gatewayId: string,
  ifMatch: string,
  options: GatewayDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(
    context,
    resourceGroupName,
    serviceName,
    gatewayId,
    ifMatch,
    options,
  );
  return _$deleteDeserialize(result);
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  gatewayId: string,
  ifMatch: string,
  parameters: GatewayContract,
  options: GatewayUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/gateways/{gatewayId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      gatewayId: gatewayId,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      "if-match": ifMatch,
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: gatewayContractSerializer(parameters),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<GatewayContract> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return gatewayContractDeserializer(result.body);
}

/** Updates the details of the gateway specified by its identifier. */
export async function update(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  gatewayId: string,
  ifMatch: string,
  parameters: GatewayContract,
  options: GatewayUpdateOptionalParams = { requestOptions: {} },
): Promise<GatewayContract> {
  const result = await _updateSend(
    context,
    resourceGroupName,
    serviceName,
    gatewayId,
    ifMatch,
    parameters,
    options,
  );
  return _updateDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  gatewayId: string,
  parameters: GatewayContract,
  options: GatewayCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/gateways/{gatewayId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      gatewayId: gatewayId,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: gatewayContractSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<GatewayContract> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return gatewayContractDeserializer(result.body);
}

/** Creates or updates a Gateway to be used in Api Management instance. */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  gatewayId: string,
  parameters: GatewayContract,
  options: GatewayCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<GatewayContract> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    serviceName,
    gatewayId,
    parameters,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getEntityTagSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  gatewayId: string,
  options: GatewayGetEntityTagOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/gateways/{gatewayId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      gatewayId: gatewayId,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).head({ ...operationOptionsToRequestParameters(options) });
}

export async function _getEntityTagDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Gets the entity state (Etag) version of the Gateway specified by its identifier. */
export async function getEntityTag(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  gatewayId: string,
  options: GatewayGetEntityTagOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _getEntityTagSend(
    context,
    resourceGroupName,
    serviceName,
    gatewayId,
    options,
  );
  return _getEntityTagDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  gatewayId: string,
  options: GatewayGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/gateways/{gatewayId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      gatewayId: gatewayId,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<GatewayContract> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return gatewayContractDeserializer(result.body);
}

/** Gets the details of the Gateway specified by its identifier. */
export async function get(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  gatewayId: string,
  options: GatewayGetOptionalParams = { requestOptions: {} },
): Promise<GatewayContract> {
  const result = await _getSend(context, resourceGroupName, serviceName, gatewayId, options);
  return _getDeserialize(result);
}

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext as Client } from "../index.js";
import type {
  SubscriptionContract,
  _SubscriptionCollection,
  SubscriptionCreateParameters,
  SubscriptionUpdateParameters,
  SubscriptionKeysContract,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  subscriptionContractDeserializer,
  _subscriptionCollectionDeserializer,
  subscriptionCreateParametersSerializer,
  subscriptionUpdateParametersSerializer,
  subscriptionKeysContractDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  SubscriptionListSecretsOptionalParams,
  SubscriptionRegenerateSecondaryKeyOptionalParams,
  SubscriptionRegeneratePrimaryKeyOptionalParams,
  SubscriptionListOptionalParams,
  SubscriptionDeleteOptionalParams,
  SubscriptionUpdateOptionalParams,
  SubscriptionCreateOrUpdateOptionalParams,
  SubscriptionGetEntityTagOptionalParams,
  SubscriptionGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSecretsSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  sid: string,
  options: SubscriptionListSecretsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/subscriptions/{sid}/listSecrets{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      sid: sid,
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

export async function _listSecretsDeserialize(
  result: PathUncheckedResponse,
): Promise<SubscriptionKeysContract> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return subscriptionKeysContractDeserializer(result.body);
}

/** Gets the specified Subscription keys. */
export async function listSecrets(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  sid: string,
  options: SubscriptionListSecretsOptionalParams = { requestOptions: {} },
): Promise<SubscriptionKeysContract> {
  const result = await _listSecretsSend(context, resourceGroupName, serviceName, sid, options);
  return _listSecretsDeserialize(result);
}

export function _regenerateSecondaryKeySend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  sid: string,
  options: SubscriptionRegenerateSecondaryKeyOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/subscriptions/{sid}/regenerateSecondaryKey{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      sid: sid,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _regenerateSecondaryKeyDeserialize(
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

/** Regenerates secondary key of existing subscription of the API Management service instance. */
export async function regenerateSecondaryKey(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  sid: string,
  options: SubscriptionRegenerateSecondaryKeyOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _regenerateSecondaryKeySend(
    context,
    resourceGroupName,
    serviceName,
    sid,
    options,
  );
  return _regenerateSecondaryKeyDeserialize(result);
}

export function _regeneratePrimaryKeySend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  sid: string,
  options: SubscriptionRegeneratePrimaryKeyOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/subscriptions/{sid}/regeneratePrimaryKey{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      sid: sid,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _regeneratePrimaryKeyDeserialize(
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

/** Regenerates primary key of existing subscription of the API Management service instance. */
export async function regeneratePrimaryKey(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  sid: string,
  options: SubscriptionRegeneratePrimaryKeyOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _regeneratePrimaryKeySend(
    context,
    resourceGroupName,
    serviceName,
    sid,
    options,
  );
  return _regeneratePrimaryKeyDeserialize(result);
}

export function _listSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  options: SubscriptionListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/subscriptions{?api%2Dversion,%24filter,%24top,%24skip}",
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

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_SubscriptionCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _subscriptionCollectionDeserializer(result.body);
}

/** Lists all subscriptions of the API Management service instance. */
export function list(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  options: SubscriptionListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SubscriptionContract> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, serviceName, options),
    _listDeserialize,
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
  sid: string,
  ifMatch: string,
  options: SubscriptionDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/subscriptions/{sid}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      sid: sid,
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

/** Deletes the specified subscription. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  sid: string,
  ifMatch: string,
  options: SubscriptionDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, resourceGroupName, serviceName, sid, ifMatch, options);
  return _$deleteDeserialize(result);
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  sid: string,
  ifMatch: string,
  parameters: SubscriptionUpdateParameters,
  options: SubscriptionUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/subscriptions/{sid}{?api%2Dversion,notify,appType}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      sid: sid,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
      notify: options?.notify,
      appType: options?.appType,
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
    body: subscriptionUpdateParametersSerializer(parameters),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<SubscriptionContract> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return subscriptionContractDeserializer(result.body);
}

/** Updates the details of a subscription specified by its identifier. */
export async function update(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  sid: string,
  ifMatch: string,
  parameters: SubscriptionUpdateParameters,
  options: SubscriptionUpdateOptionalParams = { requestOptions: {} },
): Promise<SubscriptionContract> {
  const result = await _updateSend(
    context,
    resourceGroupName,
    serviceName,
    sid,
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
  sid: string,
  parameters: SubscriptionCreateParameters,
  options: SubscriptionCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/subscriptions/{sid}{?api%2Dversion,notify,appType}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      sid: sid,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
      notify: options?.notify,
      appType: options?.appType,
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
    body: subscriptionCreateParametersSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<SubscriptionContract> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return subscriptionContractDeserializer(result.body);
}

/** Creates or updates the subscription of specified user to the specified product. */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  sid: string,
  parameters: SubscriptionCreateParameters,
  options: SubscriptionCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<SubscriptionContract> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    serviceName,
    sid,
    parameters,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getEntityTagSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  sid: string,
  options: SubscriptionGetEntityTagOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/subscriptions/{sid}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      sid: sid,
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

/** Gets the entity state (Etag) version of the apimanagement subscription specified by its identifier. */
export async function getEntityTag(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  sid: string,
  options: SubscriptionGetEntityTagOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _getEntityTagSend(context, resourceGroupName, serviceName, sid, options);
  return _getEntityTagDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  sid: string,
  options: SubscriptionGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/subscriptions/{sid}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      sid: sid,
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

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<SubscriptionContract> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return subscriptionContractDeserializer(result.body);
}

/** Gets the specified Subscription entity. */
export async function get(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  sid: string,
  options: SubscriptionGetOptionalParams = { requestOptions: {} },
): Promise<SubscriptionContract> {
  const result = await _getSend(context, resourceGroupName, serviceName, sid, options);
  return _getDeserialize(result);
}

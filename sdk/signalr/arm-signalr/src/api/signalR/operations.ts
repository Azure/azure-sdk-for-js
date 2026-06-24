// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SignalRManagementContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  SignalRResource,
  signalRResourceSerializer,
  signalRResourceDeserializer,
  _SignalRResourceList,
  _signalRResourceListDeserializer,
  SignalRKeys,
  signalRKeysDeserializer,
  RegenerateKeyParameters,
  regenerateKeyParametersSerializer,
  SkuList,
  skuListDeserializer,
  NameAvailabilityParameters,
  nameAvailabilityParametersSerializer,
  NameAvailability,
  nameAvailabilityDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  SignalRCheckNameAvailabilityOptionalParams,
  SignalRListReplicaSkusOptionalParams,
  SignalRListSkusOptionalParams,
  SignalRRestartOptionalParams,
  SignalRRegenerateKeyOptionalParams,
  SignalRListKeysOptionalParams,
  SignalRListBySubscriptionOptionalParams,
  SignalRListByResourceGroupOptionalParams,
  SignalRDeleteOptionalParams,
  SignalRUpdateOptionalParams,
  SignalRCreateOrUpdateOptionalParams,
  SignalRGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _checkNameAvailabilitySend(
  context: Client,
  location: string,
  parameters: NameAvailabilityParameters,
  options: SignalRCheckNameAvailabilityOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.SignalRService/locations/{location}/checkNameAvailability{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      "api%2Dversion": context.apiVersion ?? "2025-01-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: nameAvailabilityParametersSerializer(parameters),
    });
}

export async function _checkNameAvailabilityDeserialize(
  result: PathUncheckedResponse,
): Promise<NameAvailability> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return nameAvailabilityDeserializer(result.body);
}

/** Checks that the resource name is valid and is not already in use. */
export async function checkNameAvailability(
  context: Client,
  location: string,
  parameters: NameAvailabilityParameters,
  options: SignalRCheckNameAvailabilityOptionalParams = { requestOptions: {} },
): Promise<NameAvailability> {
  const result = await _checkNameAvailabilitySend(context, location, parameters, options);
  return _checkNameAvailabilityDeserialize(result);
}

export function _listReplicaSkusSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  replicaName: string,
  options: SignalRListReplicaSkusOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SignalRService/signalR/{resourceName}/replicas/{replicaName}/skus{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      replicaName: replicaName,
      "api%2Dversion": context.apiVersion ?? "2025-01-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _listReplicaSkusDeserialize(result: PathUncheckedResponse): Promise<SkuList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return skuListDeserializer(result.body);
}

/** List all available skus of the replica resource. */
export async function listReplicaSkus(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  replicaName: string,
  options: SignalRListReplicaSkusOptionalParams = { requestOptions: {} },
): Promise<SkuList> {
  const result = await _listReplicaSkusSend(
    context,
    resourceGroupName,
    resourceName,
    replicaName,
    options,
  );
  return _listReplicaSkusDeserialize(result);
}

export function _listSkusSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: SignalRListSkusOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SignalRService/signalR/{resourceName}/skus{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      "api%2Dversion": context.apiVersion ?? "2025-01-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _listSkusDeserialize(result: PathUncheckedResponse): Promise<SkuList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return skuListDeserializer(result.body);
}

/** List all available skus of the resource. */
export async function listSkus(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: SignalRListSkusOptionalParams = { requestOptions: {} },
): Promise<SkuList> {
  const result = await _listSkusSend(context, resourceGroupName, resourceName, options);
  return _listSkusDeserialize(result);
}

export function _restartSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: SignalRRestartOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SignalRService/signalR/{resourceName}/restart{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      "api%2Dversion": context.apiVersion ?? "2025-01-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _restartDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "204", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Operation to restart a resource. */
export function restart(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: SignalRRestartOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _restartDeserialize, ["202", "204", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _restartSend(context, resourceGroupName, resourceName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-01-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _regenerateKeySend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  parameters: RegenerateKeyParameters,
  options: SignalRRegenerateKeyOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SignalRService/signalR/{resourceName}/regenerateKey{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      "api%2Dversion": context.apiVersion ?? "2025-01-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: regenerateKeyParametersSerializer(parameters),
    });
}

export async function _regenerateKeyDeserialize(
  result: PathUncheckedResponse,
): Promise<SignalRKeys> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return signalRKeysDeserializer(result.body);
}

/** Regenerate the access key for the resource. PrimaryKey and SecondaryKey cannot be regenerated at the same time. */
export function regenerateKey(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  parameters: RegenerateKeyParameters,
  options: SignalRRegenerateKeyOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<SignalRKeys>, SignalRKeys> {
  return getLongRunningPoller(context, _regenerateKeyDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _regenerateKeySend(context, resourceGroupName, resourceName, parameters, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-01-01-preview",
  }) as PollerLike<OperationState<SignalRKeys>, SignalRKeys>;
}

export function _listKeysSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: SignalRListKeysOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SignalRService/signalR/{resourceName}/listKeys{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      "api%2Dversion": context.apiVersion ?? "2025-01-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _listKeysDeserialize(result: PathUncheckedResponse): Promise<SignalRKeys> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return signalRKeysDeserializer(result.body);
}

/** Get the access keys of the resource. */
export async function listKeys(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: SignalRListKeysOptionalParams = { requestOptions: {} },
): Promise<SignalRKeys> {
  const result = await _listKeysSend(context, resourceGroupName, resourceName, options);
  return _listKeysDeserialize(result);
}

export function _listBySubscriptionSend(
  context: Client,
  options: SignalRListBySubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.SignalRService/signalR{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2025-01-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _listBySubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<_SignalRResourceList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _signalRResourceListDeserializer(result.body);
}

/** Handles requests to list all resources in a subscription. */
export function listBySubscription(
  context: Client,
  options: SignalRListBySubscriptionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SignalRResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionSend(context, options),
    _listBySubscriptionDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-01-01-preview",
    },
  );
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: SignalRListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SignalRService/signalR{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": context.apiVersion ?? "2025-01-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _listByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_SignalRResourceList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _signalRResourceListDeserializer(result.body);
}

/** Handles requests to list all resources in a resource group. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: SignalRListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SignalRResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-01-01-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: SignalRDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SignalRService/signalR/{resourceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      "api%2Dversion": context.apiVersion ?? "2025-01-01-preview",
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
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Operation to delete a resource. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: SignalRDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _$deleteSend(context, resourceGroupName, resourceName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-01-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  parameters: SignalRResource,
  options: SignalRUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SignalRService/signalR/{resourceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      "api%2Dversion": context.apiVersion ?? "2025-01-01-preview",
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
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: signalRResourceSerializer(parameters),
    });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<SignalRResource> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return signalRResourceDeserializer(result.body);
}

/** Operation to update an exiting resource. */
export function update(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  parameters: SignalRResource,
  options: SignalRUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<SignalRResource>, SignalRResource> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, resourceName, parameters, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-01-01-preview",
  }) as PollerLike<OperationState<SignalRResource>, SignalRResource>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  parameters: SignalRResource,
  options: SignalRCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SignalRService/signalR/{resourceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      "api%2Dversion": context.apiVersion ?? "2025-01-01-preview",
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
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: signalRResourceSerializer(parameters),
    });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<SignalRResource> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return signalRResourceDeserializer(result.body);
}

/** Create or update a resource. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  parameters: SignalRResource,
  options: SignalRCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<SignalRResource>, SignalRResource> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, resourceGroupName, resourceName, parameters, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2025-01-01-preview",
  }) as PollerLike<OperationState<SignalRResource>, SignalRResource>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: SignalRGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SignalRService/signalR/{resourceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      "api%2Dversion": context.apiVersion ?? "2025-01-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _getDeserialize(result: PathUncheckedResponse): Promise<SignalRResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return signalRResourceDeserializer(result.body);
}

/** Get the resource and its properties. */
export async function get(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: SignalRGetOptionalParams = { requestOptions: {} },
): Promise<SignalRResource> {
  const result = await _getSend(context, resourceGroupName, resourceName, options);
  return _getDeserialize(result);
}

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CommunicationServiceManagementContext as Client } from "../index.js";
import type {
  CommunicationServiceResource,
  CommunicationServiceResourceUpdate,
  _CommunicationServiceResourceList,
  LinkedNotificationHub,
  CommunicationServiceKeys,
  RegenerateKeyParameters,
  NameAvailabilityParameters,
  CheckNameAvailabilityResponse,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  communicationServiceResourceSerializer,
  communicationServiceResourceDeserializer,
  communicationServiceResourceUpdateSerializer,
  _communicationServiceResourceListDeserializer,
  linkNotificationHubParametersSerializer,
  linkedNotificationHubDeserializer,
  communicationServiceKeysDeserializer,
  regenerateKeyParametersSerializer,
  nameAvailabilityParametersSerializer,
  checkNameAvailabilityResponseDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  CommunicationServicesCheckNameAvailabilityOptionalParams,
  CommunicationServicesRegenerateKeyOptionalParams,
  CommunicationServicesListKeysOptionalParams,
  CommunicationServicesLinkNotificationHubOptionalParams,
  CommunicationServicesListBySubscriptionOptionalParams,
  CommunicationServicesListByResourceGroupOptionalParams,
  CommunicationServicesDeleteOptionalParams,
  CommunicationServicesUpdateOptionalParams,
  CommunicationServicesCreateOrUpdateOptionalParams,
  CommunicationServicesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _checkNameAvailabilitySend(
  context: Client,
  nameAvailabilityParameters: NameAvailabilityParameters,
  options: CommunicationServicesCheckNameAvailabilityOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Communication/checkNameAvailability{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2026-03-18",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: nameAvailabilityParametersSerializer(nameAvailabilityParameters),
  });
}

export async function _checkNameAvailabilityDeserialize(
  result: PathUncheckedResponse,
): Promise<CheckNameAvailabilityResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return checkNameAvailabilityResponseDeserializer(result.body);
}

/** Checks that the CommunicationService name is valid and is not already in use. */
export async function checkNameAvailability(
  context: Client,
  nameAvailabilityParameters: NameAvailabilityParameters,
  options: CommunicationServicesCheckNameAvailabilityOptionalParams = { requestOptions: {} },
): Promise<CheckNameAvailabilityResponse> {
  const result = await _checkNameAvailabilitySend(context, nameAvailabilityParameters, options);
  return _checkNameAvailabilityDeserialize(result);
}

export function _regenerateKeySend(
  context: Client,
  resourceGroupName: string,
  communicationServiceName: string,
  parameters: RegenerateKeyParameters,
  options: CommunicationServicesRegenerateKeyOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Communication/communicationServices/{communicationServiceName}/regenerateKey{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      communicationServiceName: communicationServiceName,
      "api%2Dversion": context.apiVersion ?? "2026-03-18",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: regenerateKeyParametersSerializer(parameters),
  });
}

export async function _regenerateKeyDeserialize(
  result: PathUncheckedResponse,
): Promise<CommunicationServiceKeys> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return communicationServiceKeysDeserializer(result.body);
}

/** Regenerate CommunicationService access key. PrimaryKey and SecondaryKey cannot be regenerated at the same time. */
export async function regenerateKey(
  context: Client,
  resourceGroupName: string,
  communicationServiceName: string,
  parameters: RegenerateKeyParameters,
  options: CommunicationServicesRegenerateKeyOptionalParams = { requestOptions: {} },
): Promise<CommunicationServiceKeys> {
  const result = await _regenerateKeySend(
    context,
    resourceGroupName,
    communicationServiceName,
    parameters,
    options,
  );
  return _regenerateKeyDeserialize(result);
}

export function _listKeysSend(
  context: Client,
  resourceGroupName: string,
  communicationServiceName: string,
  options: CommunicationServicesListKeysOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Communication/communicationServices/{communicationServiceName}/listKeys{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      communicationServiceName: communicationServiceName,
      "api%2Dversion": context.apiVersion ?? "2026-03-18",
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
): Promise<CommunicationServiceKeys> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return communicationServiceKeysDeserializer(result.body);
}

/** Get the access keys of the CommunicationService resource. */
export async function listKeys(
  context: Client,
  resourceGroupName: string,
  communicationServiceName: string,
  options: CommunicationServicesListKeysOptionalParams = { requestOptions: {} },
): Promise<CommunicationServiceKeys> {
  const result = await _listKeysSend(context, resourceGroupName, communicationServiceName, options);
  return _listKeysDeserialize(result);
}

export function _linkNotificationHubSend(
  context: Client,
  resourceGroupName: string,
  communicationServiceName: string,
  options: CommunicationServicesLinkNotificationHubOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Communication/communicationServices/{communicationServiceName}/linkNotificationHub{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      communicationServiceName: communicationServiceName,
      "api%2Dversion": context.apiVersion ?? "2026-03-18",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: !options["linkNotificationHubParameters"]
      ? options["linkNotificationHubParameters"]
      : linkNotificationHubParametersSerializer(options["linkNotificationHubParameters"]),
  });
}

export async function _linkNotificationHubDeserialize(
  result: PathUncheckedResponse,
): Promise<LinkedNotificationHub> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return linkedNotificationHubDeserializer(result.body);
}

/** Links an Azure Notification Hub to this communication service. */
export async function linkNotificationHub(
  context: Client,
  resourceGroupName: string,
  communicationServiceName: string,
  options: CommunicationServicesLinkNotificationHubOptionalParams = { requestOptions: {} },
): Promise<LinkedNotificationHub> {
  const result = await _linkNotificationHubSend(
    context,
    resourceGroupName,
    communicationServiceName,
    options,
  );
  return _linkNotificationHubDeserialize(result);
}

export function _listBySubscriptionSend(
  context: Client,
  options: CommunicationServicesListBySubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Communication/communicationServices{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2026-03-18",
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

export async function _listBySubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<_CommunicationServiceResourceList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _communicationServiceResourceListDeserializer(result.body);
}

/** Handles requests to list all resources in a subscription. */
export function listBySubscription(
  context: Client,
  options: CommunicationServicesListBySubscriptionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<CommunicationServiceResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionSend(context, options),
    _listBySubscriptionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2026-03-18" },
  );
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: CommunicationServicesListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Communication/communicationServices{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": context.apiVersion ?? "2026-03-18",
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

export async function _listByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_CommunicationServiceResourceList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _communicationServiceResourceListDeserializer(result.body);
}

/** Handles requests to list all resources in a resource group. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: CommunicationServicesListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<CommunicationServiceResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2026-03-18" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  communicationServiceName: string,
  options: CommunicationServicesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Communication/communicationServices/{communicationServiceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      communicationServiceName: communicationServiceName,
      "api%2Dversion": context.apiVersion ?? "2026-03-18",
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

/** Operation to delete a CommunicationService. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  communicationServiceName: string,
  options: CommunicationServicesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, communicationServiceName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-03-18",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  communicationServiceName: string,
  parameters: CommunicationServiceResourceUpdate,
  options: CommunicationServicesUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Communication/communicationServices/{communicationServiceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      communicationServiceName: communicationServiceName,
      "api%2Dversion": context.apiVersion ?? "2026-03-18",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: communicationServiceResourceUpdateSerializer(parameters),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<CommunicationServiceResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return communicationServiceResourceDeserializer(result.body);
}

/** Operation to update an existing CommunicationService. */
export async function update(
  context: Client,
  resourceGroupName: string,
  communicationServiceName: string,
  parameters: CommunicationServiceResourceUpdate,
  options: CommunicationServicesUpdateOptionalParams = { requestOptions: {} },
): Promise<CommunicationServiceResource> {
  const result = await _updateSend(
    context,
    resourceGroupName,
    communicationServiceName,
    parameters,
    options,
  );
  return _updateDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  communicationServiceName: string,
  parameters: CommunicationServiceResource,
  options: CommunicationServicesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Communication/communicationServices/{communicationServiceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      communicationServiceName: communicationServiceName,
      "api%2Dversion": context.apiVersion ?? "2026-03-18",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: communicationServiceResourceSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<CommunicationServiceResource> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return communicationServiceResourceDeserializer(result.body);
}

/** Create a new CommunicationService or update an existing CommunicationService. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  communicationServiceName: string,
  parameters: CommunicationServiceResource,
  options: CommunicationServicesCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<CommunicationServiceResource>, CommunicationServiceResource> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        communicationServiceName,
        parameters,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-03-18",
  }) as PollerLike<OperationState<CommunicationServiceResource>, CommunicationServiceResource>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  communicationServiceName: string,
  options: CommunicationServicesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Communication/communicationServices/{communicationServiceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      communicationServiceName: communicationServiceName,
      "api%2Dversion": context.apiVersion ?? "2026-03-18",
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
): Promise<CommunicationServiceResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return communicationServiceResourceDeserializer(result.body);
}

/** Get the CommunicationService and its properties. */
export async function get(
  context: Client,
  resourceGroupName: string,
  communicationServiceName: string,
  options: CommunicationServicesGetOptionalParams = { requestOptions: {} },
): Promise<CommunicationServiceResource> {
  const result = await _getSend(context, resourceGroupName, communicationServiceName, options);
  return _getDeserialize(result);
}

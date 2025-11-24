// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { IotDpsContext as Client } from "../index.js";
import type {
  AsyncOperationResult,
  ProvisioningServiceDescription,
  PrivateEndpointConnection,
  SharedAccessSignatureAuthorizationRuleAccessRightsDescription,
  TagsResource,
  _ProvisioningServiceDescriptionListResult,
  _IotDpsSkuDefinitionListResult,
  IotDpsSkuDefinition,
  _SharedAccessSignatureAuthorizationRuleListResult,
  GroupIdInformation,
  _PrivateLinkResources,
  OperationInputs,
  NameAvailabilityInfo,
} from "../../models/models.js";
import {
  errorDetailsDeserializer,
  asyncOperationResultDeserializer,
  provisioningServiceDescriptionSerializer,
  provisioningServiceDescriptionDeserializer,
  privateEndpointConnectionSerializer,
  privateEndpointConnectionDeserializer,
  sharedAccessSignatureAuthorizationRuleAccessRightsDescriptionDeserializer,
  tagsResourceSerializer,
  errorResponseDeserializer,
  _provisioningServiceDescriptionListResultDeserializer,
  _iotDpsSkuDefinitionListResultDeserializer,
  _sharedAccessSignatureAuthorizationRuleListResultDeserializer,
  groupIdInformationDeserializer,
  _privateLinkResourcesDeserializer,
  operationInputsSerializer,
  nameAvailabilityInfoDeserializer,
  privateEndpointConnectionArrayDeserializer_1,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  IotDpsResourceCheckProvisioningServiceNameAvailabilityOptionalParams,
  IotDpsResourceListPrivateEndpointConnectionsOptionalParams,
  IotDpsResourceDeletePrivateEndpointConnectionOptionalParams,
  IotDpsResourceCreateOrUpdatePrivateEndpointConnectionOptionalParams,
  IotDpsResourceGetPrivateEndpointConnectionOptionalParams,
  IotDpsResourceListPrivateLinkResourcesOptionalParams,
  IotDpsResourceGetPrivateLinkResourcesOptionalParams,
  IotDpsResourceListKeysForKeyNameOptionalParams,
  IotDpsResourceListKeysOptionalParams,
  IotDpsResourceListValidSkusOptionalParams,
  IotDpsResourceListBySubscriptionOptionalParams,
  IotDpsResourceListByResourceGroupOptionalParams,
  IotDpsResourceDeleteOptionalParams,
  IotDpsResourceUpdateOptionalParams,
  IotDpsResourceCreateOrUpdateOptionalParams,
  IotDpsResourceGetOptionalParams,
  IotDpsResourceGetOperationResultOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _checkProvisioningServiceNameAvailabilitySend(
  context: Client,
  argumentsParam: OperationInputs,
  options: IotDpsResourceCheckProvisioningServiceNameAvailabilityOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Devices/checkProvisioningServiceNameAvailability{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
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
    body: operationInputsSerializer(argumentsParam),
  });
}

export async function _checkProvisioningServiceNameAvailabilityDeserialize(
  result: PathUncheckedResponse,
): Promise<NameAvailabilityInfo> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorDetailsDeserializer(result.body);
    throw error;
  }

  return nameAvailabilityInfoDeserializer(result.body);
}

/** Check if a provisioning service name is available. This will validate if the name is syntactically valid and if the name is usable */
export async function checkProvisioningServiceNameAvailability(
  context: Client,
  argumentsParam: OperationInputs,
  options: IotDpsResourceCheckProvisioningServiceNameAvailabilityOptionalParams = {
    requestOptions: {},
  },
): Promise<NameAvailabilityInfo> {
  const result = await _checkProvisioningServiceNameAvailabilitySend(
    context,
    argumentsParam,
    options,
  );
  return _checkProvisioningServiceNameAvailabilityDeserialize(result);
}

export function _listPrivateEndpointConnectionsSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: IotDpsResourceListPrivateEndpointConnectionsOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Devices/provisioningServices/{resourceName}/privateEndpointConnections{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
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

export async function _listPrivateEndpointConnectionsDeserialize(
  result: PathUncheckedResponse,
): Promise<PrivateEndpointConnection[]> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorDetailsDeserializer(result.body);
    throw error;
  }

  return privateEndpointConnectionArrayDeserializer_1(result.body);
}

/** List private endpoint connection properties */
export async function listPrivateEndpointConnections(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: IotDpsResourceListPrivateEndpointConnectionsOptionalParams = {
    requestOptions: {},
  },
): Promise<PrivateEndpointConnection[]> {
  const result = await _listPrivateEndpointConnectionsSend(
    context,
    resourceGroupName,
    resourceName,
    options,
  );
  return _listPrivateEndpointConnectionsDeserialize(result);
}

export function _deletePrivateEndpointConnectionSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  privateEndpointConnectionName: string,
  options: IotDpsResourceDeletePrivateEndpointConnectionOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Devices/provisioningServices/{resourceName}/privateEndpointConnections/{privateEndpointConnectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      privateEndpointConnectionName: privateEndpointConnectionName,
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

export async function _deletePrivateEndpointConnectionDeserialize(
  result: PathUncheckedResponse,
): Promise<PrivateEndpointConnection> {
  const expectedStatuses = ["200", "202", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorDetailsDeserializer(result.body);
    throw error;
  }

  return privateEndpointConnectionDeserializer(result.body);
}

/** Delete private endpoint connection with the specified name */
export function deletePrivateEndpointConnection(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  privateEndpointConnectionName: string,
  options: IotDpsResourceDeletePrivateEndpointConnectionOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<PrivateEndpointConnection>, PrivateEndpointConnection> {
  return getLongRunningPoller(
    context,
    _deletePrivateEndpointConnectionDeserialize,
    ["200", "202", "204"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _deletePrivateEndpointConnectionSend(
          context,
          resourceGroupName,
          resourceName,
          privateEndpointConnectionName,
          options,
        ),
      resourceLocationConfig: "location",
    },
  ) as PollerLike<OperationState<PrivateEndpointConnection>, PrivateEndpointConnection>;
}

export function _createOrUpdatePrivateEndpointConnectionSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  privateEndpointConnectionName: string,
  privateEndpointConnection: PrivateEndpointConnection,
  options: IotDpsResourceCreateOrUpdatePrivateEndpointConnectionOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Devices/provisioningServices/{resourceName}/privateEndpointConnections/{privateEndpointConnectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      privateEndpointConnectionName: privateEndpointConnectionName,
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
    body: privateEndpointConnectionSerializer(privateEndpointConnection),
  });
}

export async function _createOrUpdatePrivateEndpointConnectionDeserialize(
  result: PathUncheckedResponse,
): Promise<PrivateEndpointConnection> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorDetailsDeserializer(result.body);
    throw error;
  }

  return privateEndpointConnectionDeserializer(result.body);
}

/** Create or update the status of a private endpoint connection with the specified name */
export function createOrUpdatePrivateEndpointConnection(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  privateEndpointConnectionName: string,
  privateEndpointConnection: PrivateEndpointConnection,
  options: IotDpsResourceCreateOrUpdatePrivateEndpointConnectionOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<PrivateEndpointConnection>, PrivateEndpointConnection> {
  return getLongRunningPoller(
    context,
    _createOrUpdatePrivateEndpointConnectionDeserialize,
    ["200", "201", "202"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _createOrUpdatePrivateEndpointConnectionSend(
          context,
          resourceGroupName,
          resourceName,
          privateEndpointConnectionName,
          privateEndpointConnection,
          options,
        ),
      resourceLocationConfig: "location",
    },
  ) as PollerLike<OperationState<PrivateEndpointConnection>, PrivateEndpointConnection>;
}

export function _getPrivateEndpointConnectionSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  privateEndpointConnectionName: string,
  options: IotDpsResourceGetPrivateEndpointConnectionOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Devices/provisioningServices/{resourceName}/privateEndpointConnections/{privateEndpointConnectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      privateEndpointConnectionName: privateEndpointConnectionName,
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

export async function _getPrivateEndpointConnectionDeserialize(
  result: PathUncheckedResponse,
): Promise<PrivateEndpointConnection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorDetailsDeserializer(result.body);
    throw error;
  }

  return privateEndpointConnectionDeserializer(result.body);
}

/** Get private endpoint connection properties */
export async function getPrivateEndpointConnection(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  privateEndpointConnectionName: string,
  options: IotDpsResourceGetPrivateEndpointConnectionOptionalParams = {
    requestOptions: {},
  },
): Promise<PrivateEndpointConnection> {
  const result = await _getPrivateEndpointConnectionSend(
    context,
    resourceGroupName,
    resourceName,
    privateEndpointConnectionName,
    options,
  );
  return _getPrivateEndpointConnectionDeserialize(result);
}

export function _listPrivateLinkResourcesSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: IotDpsResourceListPrivateLinkResourcesOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Devices/provisioningServices/{resourceName}/privateLinkResources{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
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

export async function _listPrivateLinkResourcesDeserialize(
  result: PathUncheckedResponse,
): Promise<_PrivateLinkResources> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorDetailsDeserializer(result.body);
    throw error;
  }

  return _privateLinkResourcesDeserializer(result.body);
}

/** List private link resources for the given provisioning service */
export function listPrivateLinkResources(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: IotDpsResourceListPrivateLinkResourcesOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<GroupIdInformation> {
  return buildPagedAsyncIterator(
    context,
    () => _listPrivateLinkResourcesSend(context, resourceGroupName, resourceName, options),
    _listPrivateLinkResourcesDeserialize,
    ["200"],
    { itemName: "value" },
  );
}

export function _getPrivateLinkResourcesSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  groupId: string,
  options: IotDpsResourceGetPrivateLinkResourcesOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Devices/provisioningServices/{resourceName}/privateLinkResources/{groupId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      groupId: groupId,
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

export async function _getPrivateLinkResourcesDeserialize(
  result: PathUncheckedResponse,
): Promise<GroupIdInformation> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorDetailsDeserializer(result.body);
    throw error;
  }

  return groupIdInformationDeserializer(result.body);
}

/** Get the specified private link resource for the given provisioning service */
export async function getPrivateLinkResources(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  groupId: string,
  options: IotDpsResourceGetPrivateLinkResourcesOptionalParams = {
    requestOptions: {},
  },
): Promise<GroupIdInformation> {
  const result = await _getPrivateLinkResourcesSend(
    context,
    resourceGroupName,
    resourceName,
    groupId,
    options,
  );
  return _getPrivateLinkResourcesDeserialize(result);
}

export function _listKeysForKeyNameSend(
  context: Client,
  provisioningServiceName: string,
  keyName: string,
  resourceGroupName: string,
  options: IotDpsResourceListKeysForKeyNameOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Devices/provisioningServices/{provisioningServiceName}/keys/{keyName}/listkeys{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      provisioningServiceName: provisioningServiceName,
      keyName: keyName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listKeysForKeyNameDeserialize(
  result: PathUncheckedResponse,
): Promise<SharedAccessSignatureAuthorizationRuleAccessRightsDescription> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorDetailsDeserializer(result.body);
    throw error;
  }

  return sharedAccessSignatureAuthorizationRuleAccessRightsDescriptionDeserializer(result.body);
}

/** List primary and secondary keys for a specific key name */
export async function listKeysForKeyName(
  context: Client,
  provisioningServiceName: string,
  keyName: string,
  resourceGroupName: string,
  options: IotDpsResourceListKeysForKeyNameOptionalParams = {
    requestOptions: {},
  },
): Promise<SharedAccessSignatureAuthorizationRuleAccessRightsDescription> {
  const result = await _listKeysForKeyNameSend(
    context,
    provisioningServiceName,
    keyName,
    resourceGroupName,
    options,
  );
  return _listKeysForKeyNameDeserialize(result);
}

export function _listKeysSend(
  context: Client,
  provisioningServiceName: string,
  resourceGroupName: string,
  options: IotDpsResourceListKeysOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Devices/provisioningServices/{provisioningServiceName}/listkeys{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      provisioningServiceName: provisioningServiceName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listKeysDeserialize(
  result: PathUncheckedResponse,
): Promise<_SharedAccessSignatureAuthorizationRuleListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorDetailsDeserializer(result.body);
    throw error;
  }

  return _sharedAccessSignatureAuthorizationRuleListResultDeserializer(result.body);
}

/** List the primary and secondary keys for a provisioning service. */
export function listKeys(
  context: Client,
  provisioningServiceName: string,
  resourceGroupName: string,
  options: IotDpsResourceListKeysOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SharedAccessSignatureAuthorizationRuleAccessRightsDescription> {
  return buildPagedAsyncIterator(
    context,
    () => _listKeysSend(context, provisioningServiceName, resourceGroupName, options),
    _listKeysDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _listValidSkusSend(
  context: Client,
  provisioningServiceName: string,
  resourceGroupName: string,
  options: IotDpsResourceListValidSkusOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Devices/provisioningServices/{provisioningServiceName}/skus{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      provisioningServiceName: provisioningServiceName,
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

export async function _listValidSkusDeserialize(
  result: PathUncheckedResponse,
): Promise<_IotDpsSkuDefinitionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorDetailsDeserializer(result.body);
    throw error;
  }

  return _iotDpsSkuDefinitionListResultDeserializer(result.body);
}

/** Gets the list of valid SKUs and tiers for a provisioning service. */
export function listValidSkus(
  context: Client,
  provisioningServiceName: string,
  resourceGroupName: string,
  options: IotDpsResourceListValidSkusOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<IotDpsSkuDefinition> {
  return buildPagedAsyncIterator(
    context,
    () => _listValidSkusSend(context, provisioningServiceName, resourceGroupName, options),
    _listValidSkusDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _listBySubscriptionSend(
  context: Client,
  options: IotDpsResourceListBySubscriptionOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Devices/provisioningServices{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
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

export async function _listBySubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<_ProvisioningServiceDescriptionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorDetailsDeserializer(result.body);
    throw error;
  }

  return _provisioningServiceDescriptionListResultDeserializer(result.body);
}

/** List all the provisioning services for a given subscription id. */
export function listBySubscription(
  context: Client,
  options: IotDpsResourceListBySubscriptionOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<ProvisioningServiceDescription> {
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
  options: IotDpsResourceListByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Devices/provisioningServices{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
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
): Promise<_ProvisioningServiceDescriptionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorDetailsDeserializer(result.body);
    throw error;
  }

  return _provisioningServiceDescriptionListResultDeserializer(result.body);
}

/** Get a list of all provisioning services in the given resource group. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: IotDpsResourceListByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<ProvisioningServiceDescription> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  provisioningServiceName: string,
  options: IotDpsResourceDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Devices/provisioningServices/{provisioningServiceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      provisioningServiceName: provisioningServiceName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "202", "204", "404"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorDetailsDeserializer(result.body);
    throw error;
  }

  return;
}

/** Deletes the Provisioning Service. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  provisioningServiceName: string,
  options: IotDpsResourceDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204", "404"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, provisioningServiceName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  provisioningServiceName: string,
  provisioningServiceTags: TagsResource,
  options: IotDpsResourceUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Devices/provisioningServices/{provisioningServiceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      provisioningServiceName: provisioningServiceName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: tagsResourceSerializer(provisioningServiceTags),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<ProvisioningServiceDescription> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return provisioningServiceDescriptionDeserializer(result.body);
}

/** Update an existing provisioning service's tags. to update other fields use the CreateOrUpdate method */
export function update(
  context: Client,
  resourceGroupName: string,
  provisioningServiceName: string,
  provisioningServiceTags: TagsResource,
  options: IotDpsResourceUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ProvisioningServiceDescription>, ProvisioningServiceDescription> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(
        context,
        resourceGroupName,
        provisioningServiceName,
        provisioningServiceTags,
        options,
      ),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<ProvisioningServiceDescription>, ProvisioningServiceDescription>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  provisioningServiceName: string,
  iotDpsDescription: ProvisioningServiceDescription,
  options: IotDpsResourceCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Devices/provisioningServices/{provisioningServiceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      provisioningServiceName: provisioningServiceName,
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
    body: provisioningServiceDescriptionSerializer(iotDpsDescription),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<ProvisioningServiceDescription> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorDetailsDeserializer(result.body);
    throw error;
  }

  return provisioningServiceDescriptionDeserializer(result.body);
}

/** Create or update the metadata of the provisioning service. The usual pattern to modify a property is to retrieve the provisioning service metadata and security metadata, and then combine them with the modified values in a new body to update the provisioning service. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  provisioningServiceName: string,
  iotDpsDescription: ProvisioningServiceDescription,
  options: IotDpsResourceCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ProvisioningServiceDescription>, ProvisioningServiceDescription> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        provisioningServiceName,
        iotDpsDescription,
        options,
      ),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<ProvisioningServiceDescription>, ProvisioningServiceDescription>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  provisioningServiceName: string,
  options: IotDpsResourceGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Devices/provisioningServices/{provisioningServiceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      provisioningServiceName: provisioningServiceName,
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
): Promise<ProvisioningServiceDescription> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorDetailsDeserializer(result.body);
    throw error;
  }

  return provisioningServiceDescriptionDeserializer(result.body);
}

/** Get the metadata of the provisioning service without SAS keys. */
export async function get(
  context: Client,
  resourceGroupName: string,
  provisioningServiceName: string,
  options: IotDpsResourceGetOptionalParams = { requestOptions: {} },
): Promise<ProvisioningServiceDescription> {
  const result = await _getSend(context, resourceGroupName, provisioningServiceName, options);
  return _getDeserialize(result);
}

export function _getOperationResultSend(
  context: Client,
  operationId: string,
  resourceGroupName: string,
  provisioningServiceName: string,
  asyncinfo: string,
  options: IotDpsResourceGetOperationResultOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Devices/provisioningServices/{provisioningServiceName}/operationresults/{operationId}{?api%2Dversion,asyncinfo}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      provisioningServiceName: provisioningServiceName,
      operationId: operationId,
      "api%2Dversion": context.apiVersion,
      asyncinfo: asyncinfo,
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

export async function _getOperationResultDeserialize(
  result: PathUncheckedResponse,
): Promise<AsyncOperationResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorDetailsDeserializer(result.body);
    throw error;
  }

  return asyncOperationResultDeserializer(result.body);
}

/** Gets the status of a long running operation, such as create, update or delete a provisioning service. */
export async function getOperationResult(
  context: Client,
  operationId: string,
  resourceGroupName: string,
  provisioningServiceName: string,
  asyncinfo: string,
  options: IotDpsResourceGetOperationResultOptionalParams = {
    requestOptions: {},
  },
): Promise<AsyncOperationResult> {
  const result = await _getOperationResultSend(
    context,
    operationId,
    resourceGroupName,
    provisioningServiceName,
    asyncinfo,
    options,
  );
  return _getOperationResultDeserialize(result);
}

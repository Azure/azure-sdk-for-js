// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext as Client } from "../index.js";
import type {
  TagsObject,
  ServiceGateway,
  ServiceGatewayUpdateAddressLocationsRequest,
  ServiceGatewayUpdateServicesRequest,
  ServiceGatewayService,
  _GetServiceGatewayAddressLocationsResult,
  ServiceGatewayAddressLocationResponse,
  _GetServiceGatewayServicesResult,
} from "../../models/microsoft/network/models.js";
import {
  cloudErrorDeserializer,
  tagsObjectSerializer,
  serviceGatewaySerializer,
  serviceGatewayDeserializer,
  serviceGatewayUpdateAddressLocationsRequestSerializer,
  serviceGatewayUpdateServicesRequestSerializer,
  _getServiceGatewayAddressLocationsResultDeserializer,
  _getServiceGatewayServicesResultDeserializer,
} from "../../models/microsoft/network/models.js";
import type { _ServiceGatewayListResult } from "../../models/models.js";
import { _serviceGatewayListResultDeserializer } from "../../models/models.js";
import type { NoContentResponse } from "../../models/typeSpec/http/models.js";
import { noContentResponseDeserializer } from "../../models/typeSpec/http/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ServiceGatewaysListServicesOptionalParams,
  ServiceGatewaysListAddressLocationsOptionalParams,
  ServiceGatewaysUpdateServicesOptionalParams,
  ServiceGatewaysUpdateAddressLocationsOptionalParams,
  ServiceGatewaysListAllOptionalParams,
  ServiceGatewaysListOptionalParams,
  ServiceGatewaysDeleteOptionalParams,
  ServiceGatewaysUpdateTagsOptionalParams,
  ServiceGatewaysCreateOrUpdateOptionalParams,
  ServiceGatewaysGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listServicesSend(
  context: Client,
  resourceGroupName: string,
  serviceGatewayName: string,
  options: ServiceGatewaysListServicesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/serviceGateways/{serviceGatewayName}/services{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceGatewayName: serviceGatewayName,
      "api%2Dversion": "2025-05-01",
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

export async function _listServicesDeserialize(
  result: PathUncheckedResponse,
): Promise<_GetServiceGatewayServicesResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _getServiceGatewayServicesResultDeserializer(result.body);
}

/** Get Services in service gateway. */
export function listServices(
  context: Client,
  resourceGroupName: string,
  serviceGatewayName: string,
  options: ServiceGatewaysListServicesOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ServiceGatewayService> {
  return buildPagedAsyncIterator(
    context,
    () => _listServicesSend(context, resourceGroupName, serviceGatewayName, options),
    _listServicesDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2025-05-01" },
  );
}

export function _listAddressLocationsSend(
  context: Client,
  resourceGroupName: string,
  serviceGatewayName: string,
  options: ServiceGatewaysListAddressLocationsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/serviceGateways/{serviceGatewayName}/addressLocations{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceGatewayName: serviceGatewayName,
      "api%2Dversion": "2025-05-01",
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

export async function _listAddressLocationsDeserialize(
  result: PathUncheckedResponse,
): Promise<_GetServiceGatewayAddressLocationsResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _getServiceGatewayAddressLocationsResultDeserializer(result.body);
}

/** Get address locations in service gateway. */
export function listAddressLocations(
  context: Client,
  resourceGroupName: string,
  serviceGatewayName: string,
  options: ServiceGatewaysListAddressLocationsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ServiceGatewayAddressLocationResponse> {
  return buildPagedAsyncIterator(
    context,
    () => _listAddressLocationsSend(context, resourceGroupName, serviceGatewayName, options),
    _listAddressLocationsDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2025-05-01" },
  );
}

export function _updateServicesSend(
  context: Client,
  resourceGroupName: string,
  serviceGatewayName: string,
  parameters: ServiceGatewayUpdateServicesRequest,
  options: ServiceGatewaysUpdateServicesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/serviceGateways/{serviceGatewayName}/updateServices{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceGatewayName: serviceGatewayName,
      "api%2Dversion": "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: serviceGatewayUpdateServicesRequestSerializer(parameters),
  });
}

export async function _updateServicesDeserialize(
  result: PathUncheckedResponse,
): Promise<NoContentResponse> {
  const expectedStatuses = ["202", "204", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return noContentResponseDeserializer(result.body);
}

/**
 * Creates, updates, or deletes services within the service gateway.
 * The request supports both full and partial update modes at the service level.
 *
 * Full update replaces all existing services with the new list provided in the request.
 * Partial update modifies only the specified services.
 */
export function updateServices(
  context: Client,
  resourceGroupName: string,
  serviceGatewayName: string,
  parameters: ServiceGatewayUpdateServicesRequest,
  options: ServiceGatewaysUpdateServicesOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<NoContentResponse>, NoContentResponse> {
  return getLongRunningPoller(context, _updateServicesDeserialize, ["202", "204", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateServicesSend(context, resourceGroupName, serviceGatewayName, parameters, options),
    resourceLocationConfig: "location",
    apiVersion: "2025-05-01",
  }) as PollerLike<OperationState<NoContentResponse>, NoContentResponse>;
}

export function _updateAddressLocationsSend(
  context: Client,
  resourceGroupName: string,
  serviceGatewayName: string,
  parameters: ServiceGatewayUpdateAddressLocationsRequest,
  options: ServiceGatewaysUpdateAddressLocationsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/serviceGateways/{serviceGatewayName}/updateAddressLocations{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceGatewayName: serviceGatewayName,
      "api%2Dversion": "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: serviceGatewayUpdateAddressLocationsRequestSerializer(parameters),
  });
}

export async function _updateAddressLocationsDeserialize(
  result: PathUncheckedResponse,
): Promise<NoContentResponse> {
  const expectedStatuses = ["202", "204", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return noContentResponseDeserializer(result.body);
}

/**
 * Creates or updates address locations within the service gateway.
 *
 * The request supports both full and partial update modes at two levels: location and address.
 *
 * Full update replaces all existing data.
 *
 * Partial update modifies only the specified entries:
 *
 * For location-level partial updates, if no address is provided, the existing address will be deleted.
 *
 * For address-level partial updates, if no services are provided, the existing services will be considered for deletion.
 */
export function updateAddressLocations(
  context: Client,
  resourceGroupName: string,
  serviceGatewayName: string,
  parameters: ServiceGatewayUpdateAddressLocationsRequest,
  options: ServiceGatewaysUpdateAddressLocationsOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<NoContentResponse>, NoContentResponse> {
  return getLongRunningPoller(
    context,
    _updateAddressLocationsDeserialize,
    ["202", "204", "200", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _updateAddressLocationsSend(
          context,
          resourceGroupName,
          serviceGatewayName,
          parameters,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: "2025-05-01",
    },
  ) as PollerLike<OperationState<NoContentResponse>, NoContentResponse>;
}

export function _listAllSend(
  context: Client,
  options: ServiceGatewaysListAllOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Network/serviceGateways{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": "2025-05-01",
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

export async function _listAllDeserialize(
  result: PathUncheckedResponse,
): Promise<_ServiceGatewayListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _serviceGatewayListResultDeserializer(result.body);
}

/** Gets all the service gateways in a subscription. */
export function listAll(
  context: Client,
  options: ServiceGatewaysListAllOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ServiceGateway> {
  return buildPagedAsyncIterator(
    context,
    () => _listAllSend(context, options),
    _listAllDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2025-05-01" },
  );
}

export function _listSend(
  context: Client,
  resourceGroupName: string,
  options: ServiceGatewaysListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/serviceGateways{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": "2025-05-01",
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
): Promise<_ServiceGatewayListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _serviceGatewayListResultDeserializer(result.body);
}

/** Gets all the service gateways in a resource group. */
export function list(
  context: Client,
  resourceGroupName: string,
  options: ServiceGatewaysListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ServiceGateway> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2025-05-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  serviceGatewayName: string,
  options: ServiceGatewaysDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/serviceGateways/{serviceGatewayName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceGatewayName: serviceGatewayName,
      "api%2Dversion": "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "204", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return;
}

/** Deletes the specified service gateway. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  serviceGatewayName: string,
  options: ServiceGatewaysDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _$deleteSend(context, resourceGroupName, serviceGatewayName, options),
    resourceLocationConfig: "location",
    apiVersion: "2025-05-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateTagsSend(
  context: Client,
  resourceGroupName: string,
  serviceGatewayName: string,
  parameters: TagsObject,
  options: ServiceGatewaysUpdateTagsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/serviceGateways/{serviceGatewayName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceGatewayName: serviceGatewayName,
      "api%2Dversion": "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: tagsObjectSerializer(parameters),
  });
}

export async function _updateTagsDeserialize(
  result: PathUncheckedResponse,
): Promise<ServiceGateway> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return serviceGatewayDeserializer(result.body);
}

/** Updates a service gateway tags. */
export async function updateTags(
  context: Client,
  resourceGroupName: string,
  serviceGatewayName: string,
  parameters: TagsObject,
  options: ServiceGatewaysUpdateTagsOptionalParams = { requestOptions: {} },
): Promise<ServiceGateway> {
  const result = await _updateTagsSend(
    context,
    resourceGroupName,
    serviceGatewayName,
    parameters,
    options,
  );
  return _updateTagsDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  serviceGatewayName: string,
  parameters: ServiceGateway,
  options: ServiceGatewaysCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/serviceGateways/{serviceGatewayName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceGatewayName: serviceGatewayName,
      "api%2Dversion": "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: serviceGatewaySerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<ServiceGateway> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return serviceGatewayDeserializer(result.body);
}

/** Creates or updates a service gateway. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  serviceGatewayName: string,
  parameters: ServiceGateway,
  options: ServiceGatewaysCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ServiceGateway>, ServiceGateway> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, resourceGroupName, serviceGatewayName, parameters, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: "2025-05-01",
  }) as PollerLike<OperationState<ServiceGateway>, ServiceGateway>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  serviceGatewayName: string,
  options: ServiceGatewaysGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/serviceGateways/{serviceGatewayName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceGatewayName: serviceGatewayName,
      "api%2Dversion": "2025-05-01",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<ServiceGateway> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return serviceGatewayDeserializer(result.body);
}

/** Gets the specified service gateway. */
export async function get(
  context: Client,
  resourceGroupName: string,
  serviceGatewayName: string,
  options: ServiceGatewaysGetOptionalParams = { requestOptions: {} },
): Promise<ServiceGateway> {
  const result = await _getSend(context, resourceGroupName, serviceGatewayName, options);
  return _getDeserialize(result);
}

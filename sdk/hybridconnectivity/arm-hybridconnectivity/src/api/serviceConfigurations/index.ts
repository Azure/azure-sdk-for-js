// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  HybridConnectivityManagementAPIContext as Client,
  ServiceConfigurationsCreateOrupdateOptionalParams,
  ServiceConfigurationsDeleteOptionalParams,
  ServiceConfigurationsGetOptionalParams,
  ServiceConfigurationsListByEndpointResourceOptionalParams,
  ServiceConfigurationsUpdateOptionalParams,
} from "../index.js";
import {
  errorResponseDeserializer,
  ServiceConfigurationResource,
  serviceConfigurationResourceSerializer,
  serviceConfigurationResourceDeserializer,
  ServiceConfigurationResourcePatch,
  serviceConfigurationResourcePatchSerializer,
  _ServiceConfigurationList,
  _serviceConfigurationListDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _serviceConfigurationsListByEndpointResourceSend(
  context: Client,
  resourceUri: string,
  endpointName: string,
  options: ServiceConfigurationsListByEndpointResourceOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  return context
    .path(
      "/{resourceUri}/providers/Microsoft.HybridConnectivity/endpoints/{endpointName}/serviceConfigurations",
      { value: resourceUri, allowReserved: true },
      { value: endpointName, allowReserved: true },
    )
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      queryParameters: { "api-version": context.apiVersion },
    });
}

export async function _serviceConfigurationsListByEndpointResourceDeserialize(
  result: PathUncheckedResponse,
): Promise<_ServiceConfigurationList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _serviceConfigurationListDeserializer(result.body);
}

/** API to enumerate registered services in service configurations under a Endpoint Resource */
export function serviceConfigurationsListByEndpointResource(
  context: Client,
  resourceUri: string,
  endpointName: string,
  options: ServiceConfigurationsListByEndpointResourceOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<ServiceConfigurationResource> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _serviceConfigurationsListByEndpointResourceSend(context, resourceUri, endpointName, options),
    _serviceConfigurationsListByEndpointResourceDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _serviceConfigurationsDeleteSend(
  context: Client,
  resourceUri: string,
  endpointName: string,
  serviceConfigurationName: string,
  options: ServiceConfigurationsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/{resourceUri}/providers/Microsoft.HybridConnectivity/endpoints/{endpointName}/serviceConfigurations/{serviceConfigurationName}",
      { value: resourceUri, allowReserved: true },
      { value: endpointName, allowReserved: true },
      { value: serviceConfigurationName, allowReserved: true },
    )
    .delete({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      queryParameters: { "api-version": context.apiVersion },
    });
}

export async function _serviceConfigurationsDeleteDeserialize(
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

/** Deletes the service details to the target resource. */
export async function serviceConfigurationsDelete(
  context: Client,
  resourceUri: string,
  endpointName: string,
  serviceConfigurationName: string,
  options: ServiceConfigurationsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _serviceConfigurationsDeleteSend(
    context,
    resourceUri,
    endpointName,
    serviceConfigurationName,
    options,
  );
  return _serviceConfigurationsDeleteDeserialize(result);
}

export function _serviceConfigurationsUpdateSend(
  context: Client,
  resourceUri: string,
  endpointName: string,
  serviceConfigurationName: string,
  serviceConfigurationResource: ServiceConfigurationResourcePatch,
  options: ServiceConfigurationsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/{resourceUri}/providers/Microsoft.HybridConnectivity/endpoints/{endpointName}/serviceConfigurations/{serviceConfigurationName}",
      { value: resourceUri, allowReserved: true },
      { value: endpointName, allowReserved: true },
      { value: serviceConfigurationName, allowReserved: true },
    )
    .patch({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      queryParameters: { "api-version": context.apiVersion },
      body: serviceConfigurationResourcePatchSerializer(serviceConfigurationResource),
    });
}

export async function _serviceConfigurationsUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<ServiceConfigurationResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return serviceConfigurationResourceDeserializer(result.body);
}

/** Update the service details in the service configurations of the target resource. */
export async function serviceConfigurationsUpdate(
  context: Client,
  resourceUri: string,
  endpointName: string,
  serviceConfigurationName: string,
  serviceConfigurationResource: ServiceConfigurationResourcePatch,
  options: ServiceConfigurationsUpdateOptionalParams = { requestOptions: {} },
): Promise<ServiceConfigurationResource> {
  const result = await _serviceConfigurationsUpdateSend(
    context,
    resourceUri,
    endpointName,
    serviceConfigurationName,
    serviceConfigurationResource,
    options,
  );
  return _serviceConfigurationsUpdateDeserialize(result);
}

export function _serviceConfigurationsCreateOrupdateSend(
  context: Client,
  resourceUri: string,
  endpointName: string,
  serviceConfigurationName: string,
  serviceConfigurationResource: ServiceConfigurationResource,
  options: ServiceConfigurationsCreateOrupdateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  return context
    .path(
      "/{resourceUri}/providers/Microsoft.HybridConnectivity/endpoints/{endpointName}/serviceConfigurations/{serviceConfigurationName}",
      { value: resourceUri, allowReserved: true },
      { value: endpointName, allowReserved: true },
      { value: serviceConfigurationName, allowReserved: true },
    )
    .put({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      queryParameters: { "api-version": context.apiVersion },
      body: serviceConfigurationResourceSerializer(serviceConfigurationResource),
    });
}

export async function _serviceConfigurationsCreateOrupdateDeserialize(
  result: PathUncheckedResponse,
): Promise<ServiceConfigurationResource> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return serviceConfigurationResourceDeserializer(result.body);
}

/** Create or update a service in serviceConfiguration for the endpoint resource. */
export async function serviceConfigurationsCreateOrupdate(
  context: Client,
  resourceUri: string,
  endpointName: string,
  serviceConfigurationName: string,
  serviceConfigurationResource: ServiceConfigurationResource,
  options: ServiceConfigurationsCreateOrupdateOptionalParams = {
    requestOptions: {},
  },
): Promise<ServiceConfigurationResource> {
  const result = await _serviceConfigurationsCreateOrupdateSend(
    context,
    resourceUri,
    endpointName,
    serviceConfigurationName,
    serviceConfigurationResource,
    options,
  );
  return _serviceConfigurationsCreateOrupdateDeserialize(result);
}

export function _serviceConfigurationsGetSend(
  context: Client,
  resourceUri: string,
  endpointName: string,
  serviceConfigurationName: string,
  options: ServiceConfigurationsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/{resourceUri}/providers/Microsoft.HybridConnectivity/endpoints/{endpointName}/serviceConfigurations/{serviceConfigurationName}",
      { value: resourceUri, allowReserved: true },
      { value: endpointName, allowReserved: true },
      { value: serviceConfigurationName, allowReserved: true },
    )
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      queryParameters: { "api-version": context.apiVersion },
    });
}

export async function _serviceConfigurationsGetDeserialize(
  result: PathUncheckedResponse,
): Promise<ServiceConfigurationResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return serviceConfigurationResourceDeserializer(result.body);
}

/** Gets the details about the service to the resource. */
export async function serviceConfigurationsGet(
  context: Client,
  resourceUri: string,
  endpointName: string,
  serviceConfigurationName: string,
  options: ServiceConfigurationsGetOptionalParams = { requestOptions: {} },
): Promise<ServiceConfigurationResource> {
  const result = await _serviceConfigurationsGetSend(
    context,
    resourceUri,
    endpointName,
    serviceConfigurationName,
    options,
  );
  return _serviceConfigurationsGetDeserialize(result);
}

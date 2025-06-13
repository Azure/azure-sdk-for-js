// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HybridConnectivityManagementAPIContext as Client } from "../index.js";
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
  ServiceConfigurationsListByEndpointResourceOptionalParams,
  ServiceConfigurationsDeleteOptionalParams,
  ServiceConfigurationsUpdateOptionalParams,
  ServiceConfigurationsCreateOrupdateOptionalParams,
  ServiceConfigurationsGetOptionalParams,
} from "./options.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listByEndpointResourceSend(
  context: Client,
  resourceUri: string,
  endpointName: string,
  options: ServiceConfigurationsListByEndpointResourceOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceUri}/providers/Microsoft.HybridConnectivity/endpoints/{+endpointName}/serviceConfigurations{?api-version}",
    {
      resourceUri: resourceUri,
      endpointName: endpointName,
      "api-version": context.apiVersion,
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

export async function _listByEndpointResourceDeserialize(
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
export function listByEndpointResource(
  context: Client,
  resourceUri: string,
  endpointName: string,
  options: ServiceConfigurationsListByEndpointResourceOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<ServiceConfigurationResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listByEndpointResourceSend(context, resourceUri, endpointName, options),
    _listByEndpointResourceDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceUri: string,
  endpointName: string,
  serviceConfigurationName: string,
  options: ServiceConfigurationsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceUri}/providers/Microsoft.HybridConnectivity/endpoints/{+endpointName}/serviceConfigurations/{+serviceConfigurationName}{?api-version}",
    {
      resourceUri: resourceUri,
      endpointName: endpointName,
      serviceConfigurationName: serviceConfigurationName,
      "api-version": context.apiVersion,
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
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Deletes the service details to the target resource. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  resourceUri: string,
  endpointName: string,
  serviceConfigurationName: string,
  options: ServiceConfigurationsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(
    context,
    resourceUri,
    endpointName,
    serviceConfigurationName,
    options,
  );
  return _$deleteDeserialize(result);
}

export function _updateSend(
  context: Client,
  resourceUri: string,
  endpointName: string,
  serviceConfigurationName: string,
  serviceConfigurationResource: ServiceConfigurationResourcePatch,
  options: ServiceConfigurationsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceUri}/providers/Microsoft.HybridConnectivity/endpoints/{+endpointName}/serviceConfigurations/{+serviceConfigurationName}{?api-version}",
    {
      resourceUri: resourceUri,
      endpointName: endpointName,
      serviceConfigurationName: serviceConfigurationName,
      "api-version": context.apiVersion,
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
    body: serviceConfigurationResourcePatchSerializer(serviceConfigurationResource),
  });
}

export async function _updateDeserialize(
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
export async function update(
  context: Client,
  resourceUri: string,
  endpointName: string,
  serviceConfigurationName: string,
  serviceConfigurationResource: ServiceConfigurationResourcePatch,
  options: ServiceConfigurationsUpdateOptionalParams = { requestOptions: {} },
): Promise<ServiceConfigurationResource> {
  const result = await _updateSend(
    context,
    resourceUri,
    endpointName,
    serviceConfigurationName,
    serviceConfigurationResource,
    options,
  );
  return _updateDeserialize(result);
}

export function _createOrupdateSend(
  context: Client,
  resourceUri: string,
  endpointName: string,
  serviceConfigurationName: string,
  serviceConfigurationResource: ServiceConfigurationResource,
  options: ServiceConfigurationsCreateOrupdateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceUri}/providers/Microsoft.HybridConnectivity/endpoints/{+endpointName}/serviceConfigurations/{+serviceConfigurationName}{?api-version}",
    {
      resourceUri: resourceUri,
      endpointName: endpointName,
      serviceConfigurationName: serviceConfigurationName,
      "api-version": context.apiVersion,
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
    body: serviceConfigurationResourceSerializer(serviceConfigurationResource),
  });
}

export async function _createOrupdateDeserialize(
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
export async function createOrupdate(
  context: Client,
  resourceUri: string,
  endpointName: string,
  serviceConfigurationName: string,
  serviceConfigurationResource: ServiceConfigurationResource,
  options: ServiceConfigurationsCreateOrupdateOptionalParams = {
    requestOptions: {},
  },
): Promise<ServiceConfigurationResource> {
  const result = await _createOrupdateSend(
    context,
    resourceUri,
    endpointName,
    serviceConfigurationName,
    serviceConfigurationResource,
    options,
  );
  return _createOrupdateDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceUri: string,
  endpointName: string,
  serviceConfigurationName: string,
  options: ServiceConfigurationsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceUri}/providers/Microsoft.HybridConnectivity/endpoints/{+endpointName}/serviceConfigurations/{+serviceConfigurationName}{?api-version}",
    {
      resourceUri: resourceUri,
      endpointName: endpointName,
      serviceConfigurationName: serviceConfigurationName,
      "api-version": context.apiVersion,
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
export async function get(
  context: Client,
  resourceUri: string,
  endpointName: string,
  serviceConfigurationName: string,
  options: ServiceConfigurationsGetOptionalParams = { requestOptions: {} },
): Promise<ServiceConfigurationResource> {
  const result = await _getSend(
    context,
    resourceUri,
    endpointName,
    serviceConfigurationName,
    options,
  );
  return _getDeserialize(result);
}

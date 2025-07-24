// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HybridConnectivityManagementAPIContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  EndpointResource,
  endpointResourceSerializer,
  endpointResourceDeserializer,
  _EndpointsList,
  _endpointsListDeserializer,
  listCredentialsRequestSerializer,
  EndpointAccessResource,
  endpointAccessResourceDeserializer,
  listIngressGatewayCredentialsRequestSerializer,
  IngressGatewayResource,
  ingressGatewayResourceDeserializer,
  ManagedProxyRequest,
  managedProxyRequestSerializer,
  ManagedProxyResource,
  managedProxyResourceDeserializer,
} from "../../models/models.js";
import {
  EndpointsListManagedProxyDetailsOptionalParams,
  EndpointsListIngressGatewayCredentialsOptionalParams,
  EndpointsListCredentialsOptionalParams,
  EndpointsListOptionalParams,
  EndpointsDeleteOptionalParams,
  EndpointsUpdateOptionalParams,
  EndpointsCreateOrUpdateOptionalParams,
  EndpointsGetOptionalParams,
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

export function _listManagedProxyDetailsSend(
  context: Client,
  resourceUri: string,
  endpointName: string,
  managedProxyRequest: ManagedProxyRequest,
  options: EndpointsListManagedProxyDetailsOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceUri}/providers/Microsoft.HybridConnectivity/endpoints/{+endpointName}/listManagedProxyDetails{?api-version}",
    {
      resourceUri: resourceUri,
      endpointName: endpointName,
      "api-version": context.apiVersion,
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
    body: managedProxyRequestSerializer(managedProxyRequest),
  });
}

export async function _listManagedProxyDetailsDeserialize(
  result: PathUncheckedResponse,
): Promise<ManagedProxyResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return managedProxyResourceDeserializer(result.body);
}

/** Fetches the managed proxy details */
export async function listManagedProxyDetails(
  context: Client,
  resourceUri: string,
  endpointName: string,
  managedProxyRequest: ManagedProxyRequest,
  options: EndpointsListManagedProxyDetailsOptionalParams = {
    requestOptions: {},
  },
): Promise<ManagedProxyResource> {
  const result = await _listManagedProxyDetailsSend(
    context,
    resourceUri,
    endpointName,
    managedProxyRequest,
    options,
  );
  return _listManagedProxyDetailsDeserialize(result);
}

export function _listIngressGatewayCredentialsSend(
  context: Client,
  resourceUri: string,
  endpointName: string,
  options: EndpointsListIngressGatewayCredentialsOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceUri}/providers/Microsoft.HybridConnectivity/endpoints/{+endpointName}/listIngressGatewayCredentials{?api-version,expiresin}",
    {
      resourceUri: resourceUri,
      endpointName: endpointName,
      "api-version": context.apiVersion,
      expiresin: options?.expiresin,
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
    body: !options["listIngressGatewayCredentialsRequest"]
      ? options["listIngressGatewayCredentialsRequest"]
      : listIngressGatewayCredentialsRequestSerializer(
          options["listIngressGatewayCredentialsRequest"],
        ),
  });
}

export async function _listIngressGatewayCredentialsDeserialize(
  result: PathUncheckedResponse,
): Promise<IngressGatewayResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return ingressGatewayResourceDeserializer(result.body);
}

/** Gets the ingress gateway endpoint credentials */
export async function listIngressGatewayCredentials(
  context: Client,
  resourceUri: string,
  endpointName: string,
  options: EndpointsListIngressGatewayCredentialsOptionalParams = {
    requestOptions: {},
  },
): Promise<IngressGatewayResource> {
  const result = await _listIngressGatewayCredentialsSend(
    context,
    resourceUri,
    endpointName,
    options,
  );
  return _listIngressGatewayCredentialsDeserialize(result);
}

export function _listCredentialsSend(
  context: Client,
  resourceUri: string,
  endpointName: string,
  options: EndpointsListCredentialsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceUri}/providers/Microsoft.HybridConnectivity/endpoints/{+endpointName}/listCredentials{?api-version,expiresin}",
    {
      resourceUri: resourceUri,
      endpointName: endpointName,
      "api-version": context.apiVersion,
      expiresin: options?.expiresin,
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
    body: !options["listCredentialsRequest"]
      ? options["listCredentialsRequest"]
      : listCredentialsRequestSerializer(options["listCredentialsRequest"]),
  });
}

export async function _listCredentialsDeserialize(
  result: PathUncheckedResponse,
): Promise<EndpointAccessResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return endpointAccessResourceDeserializer(result.body);
}

/** Gets the endpoint access credentials to the resource. */
export async function listCredentials(
  context: Client,
  resourceUri: string,
  endpointName: string,
  options: EndpointsListCredentialsOptionalParams = { requestOptions: {} },
): Promise<EndpointAccessResource> {
  const result = await _listCredentialsSend(context, resourceUri, endpointName, options);
  return _listCredentialsDeserialize(result);
}

export function _listSend(
  context: Client,
  resourceUri: string,
  options: EndpointsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceUri}/providers/Microsoft.HybridConnectivity/endpoints{?api-version}",
    {
      resourceUri: resourceUri,
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

export async function _listDeserialize(result: PathUncheckedResponse): Promise<_EndpointsList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _endpointsListDeserializer(result.body);
}

/** List of endpoints to the target resource. */
export function list(
  context: Client,
  resourceUri: string,
  options: EndpointsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<EndpointResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceUri, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceUri: string,
  endpointName: string,
  options: EndpointsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceUri}/providers/Microsoft.HybridConnectivity/endpoints/{+endpointName}{?api-version}",
    {
      resourceUri: resourceUri,
      endpointName: endpointName,
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

/** Deletes the endpoint access to the target resource. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  resourceUri: string,
  endpointName: string,
  options: EndpointsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, resourceUri, endpointName, options);
  return _$deleteDeserialize(result);
}

export function _updateSend(
  context: Client,
  resourceUri: string,
  endpointName: string,
  endpointResource: EndpointResource,
  options: EndpointsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceUri}/providers/Microsoft.HybridConnectivity/endpoints/{+endpointName}{?api-version}",
    {
      resourceUri: resourceUri,
      endpointName: endpointName,
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
    body: endpointResourceSerializer(endpointResource),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<EndpointResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return endpointResourceDeserializer(result.body);
}

/** Update the endpoint to the target resource. */
export async function update(
  context: Client,
  resourceUri: string,
  endpointName: string,
  endpointResource: EndpointResource,
  options: EndpointsUpdateOptionalParams = { requestOptions: {} },
): Promise<EndpointResource> {
  const result = await _updateSend(context, resourceUri, endpointName, endpointResource, options);
  return _updateDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceUri: string,
  endpointName: string,
  endpointResource: EndpointResource,
  options: EndpointsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceUri}/providers/Microsoft.HybridConnectivity/endpoints/{+endpointName}{?api-version}",
    {
      resourceUri: resourceUri,
      endpointName: endpointName,
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
    body: endpointResourceSerializer(endpointResource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<EndpointResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return endpointResourceDeserializer(result.body);
}

/** Create or update the endpoint to the target resource. */
export async function createOrUpdate(
  context: Client,
  resourceUri: string,
  endpointName: string,
  endpointResource: EndpointResource,
  options: EndpointsCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<EndpointResource> {
  const result = await _createOrUpdateSend(
    context,
    resourceUri,
    endpointName,
    endpointResource,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceUri: string,
  endpointName: string,
  options: EndpointsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceUri}/providers/Microsoft.HybridConnectivity/endpoints/{+endpointName}{?api-version}",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<EndpointResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return endpointResourceDeserializer(result.body);
}

/** Gets the endpoint to the resource. */
export async function get(
  context: Client,
  resourceUri: string,
  endpointName: string,
  options: EndpointsGetOptionalParams = { requestOptions: {} },
): Promise<EndpointResource> {
  const result = await _getSend(context, resourceUri, endpointName, options);
  return _getDeserialize(result);
}

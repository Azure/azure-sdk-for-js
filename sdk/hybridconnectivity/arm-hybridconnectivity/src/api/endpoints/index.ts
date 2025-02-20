// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  HybridConnectivityManagementAPIContext as Client,
  EndpointsCreateOrUpdateOptionalParams,
  EndpointsDeleteOptionalParams,
  EndpointsGetOptionalParams,
  EndpointsListCredentialsOptionalParams,
  EndpointsListIngressGatewayCredentialsOptionalParams,
  EndpointsListManagedProxyDetailsOptionalParams,
  EndpointsListOptionalParams,
  EndpointsUpdateOptionalParams,
} from "../index.js";
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
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _endpointsListManagedProxyDetailsSend(
  context: Client,
  resourceUri: string,
  endpointName: string,
  managedProxyRequest: ManagedProxyRequest,
  options: EndpointsListManagedProxyDetailsOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  return context
    .path(
      "/{resourceUri}/providers/Microsoft.HybridConnectivity/endpoints/{endpointName}/listManagedProxyDetails",
      { value: resourceUri, allowReserved: true },
      { value: endpointName, allowReserved: true },
    )
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      queryParameters: { "api-version": context.apiVersion },
      body: managedProxyRequestSerializer(managedProxyRequest),
    });
}

export async function _endpointsListManagedProxyDetailsDeserialize(
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
export async function endpointsListManagedProxyDetails(
  context: Client,
  resourceUri: string,
  endpointName: string,
  managedProxyRequest: ManagedProxyRequest,
  options: EndpointsListManagedProxyDetailsOptionalParams = {
    requestOptions: {},
  },
): Promise<ManagedProxyResource> {
  const result = await _endpointsListManagedProxyDetailsSend(
    context,
    resourceUri,
    endpointName,
    managedProxyRequest,
    options,
  );
  return _endpointsListManagedProxyDetailsDeserialize(result);
}

export function _endpointsListIngressGatewayCredentialsSend(
  context: Client,
  resourceUri: string,
  endpointName: string,
  options: EndpointsListIngressGatewayCredentialsOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  return context
    .path(
      "/{resourceUri}/providers/Microsoft.HybridConnectivity/endpoints/{endpointName}/listIngressGatewayCredentials",
      { value: resourceUri, allowReserved: true },
      { value: endpointName, allowReserved: true },
    )
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      queryParameters: {
        "api-version": context.apiVersion,
        expiresin: options?.expiresin,
      },
      body: !options["listIngressGatewayCredentialsRequest"]
        ? options["listIngressGatewayCredentialsRequest"]
        : listIngressGatewayCredentialsRequestSerializer(
            options["listIngressGatewayCredentialsRequest"],
          ),
    });
}

export async function _endpointsListIngressGatewayCredentialsDeserialize(
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
export async function endpointsListIngressGatewayCredentials(
  context: Client,
  resourceUri: string,
  endpointName: string,
  options: EndpointsListIngressGatewayCredentialsOptionalParams = {
    requestOptions: {},
  },
): Promise<IngressGatewayResource> {
  const result = await _endpointsListIngressGatewayCredentialsSend(
    context,
    resourceUri,
    endpointName,
    options,
  );
  return _endpointsListIngressGatewayCredentialsDeserialize(result);
}

export function _endpointsListCredentialsSend(
  context: Client,
  resourceUri: string,
  endpointName: string,
  options: EndpointsListCredentialsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/{resourceUri}/providers/Microsoft.HybridConnectivity/endpoints/{endpointName}/listCredentials",
      { value: resourceUri, allowReserved: true },
      { value: endpointName, allowReserved: true },
    )
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      queryParameters: {
        "api-version": context.apiVersion,
        expiresin: options?.expiresin,
      },
      body: !options["listCredentialsRequest"]
        ? options["listCredentialsRequest"]
        : listCredentialsRequestSerializer(options["listCredentialsRequest"]),
    });
}

export async function _endpointsListCredentialsDeserialize(
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
export async function endpointsListCredentials(
  context: Client,
  resourceUri: string,
  endpointName: string,
  options: EndpointsListCredentialsOptionalParams = { requestOptions: {} },
): Promise<EndpointAccessResource> {
  const result = await _endpointsListCredentialsSend(context, resourceUri, endpointName, options);
  return _endpointsListCredentialsDeserialize(result);
}

export function _endpointsListSend(
  context: Client,
  resourceUri: string,
  options: EndpointsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/{resourceUri}/providers/Microsoft.HybridConnectivity/endpoints", {
      value: resourceUri,
      allowReserved: true,
    })
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      queryParameters: { "api-version": context.apiVersion },
    });
}

export async function _endpointsListDeserialize(
  result: PathUncheckedResponse,
): Promise<_EndpointsList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _endpointsListDeserializer(result.body);
}

/** List of endpoints to the target resource. */
export function endpointsList(
  context: Client,
  resourceUri: string,
  options: EndpointsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<EndpointResource> {
  return buildPagedAsyncIterator(
    context,
    () => _endpointsListSend(context, resourceUri, options),
    _endpointsListDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _endpointsDeleteSend(
  context: Client,
  resourceUri: string,
  endpointName: string,
  options: EndpointsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/{resourceUri}/providers/Microsoft.HybridConnectivity/endpoints/{endpointName}",
      { value: resourceUri, allowReserved: true },
      { value: endpointName, allowReserved: true },
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

export async function _endpointsDeleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Deletes the endpoint access to the target resource. */
export async function endpointsDelete(
  context: Client,
  resourceUri: string,
  endpointName: string,
  options: EndpointsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _endpointsDeleteSend(context, resourceUri, endpointName, options);
  return _endpointsDeleteDeserialize(result);
}

export function _endpointsUpdateSend(
  context: Client,
  resourceUri: string,
  endpointName: string,
  endpointResource: EndpointResource,
  options: EndpointsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/{resourceUri}/providers/Microsoft.HybridConnectivity/endpoints/{endpointName}",
      { value: resourceUri, allowReserved: true },
      { value: endpointName, allowReserved: true },
    )
    .patch({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      queryParameters: { "api-version": context.apiVersion },
      body: endpointResourceSerializer(endpointResource),
    });
}

export async function _endpointsUpdateDeserialize(
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

/** Update the endpoint to the target resource. */
export async function endpointsUpdate(
  context: Client,
  resourceUri: string,
  endpointName: string,
  endpointResource: EndpointResource,
  options: EndpointsUpdateOptionalParams = { requestOptions: {} },
): Promise<EndpointResource> {
  const result = await _endpointsUpdateSend(
    context,
    resourceUri,
    endpointName,
    endpointResource,
    options,
  );
  return _endpointsUpdateDeserialize(result);
}

export function _endpointsCreateOrUpdateSend(
  context: Client,
  resourceUri: string,
  endpointName: string,
  endpointResource: EndpointResource,
  options: EndpointsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/{resourceUri}/providers/Microsoft.HybridConnectivity/endpoints/{endpointName}",
      { value: resourceUri, allowReserved: true },
      { value: endpointName, allowReserved: true },
    )
    .put({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      queryParameters: { "api-version": context.apiVersion },
      body: endpointResourceSerializer(endpointResource),
    });
}

export async function _endpointsCreateOrUpdateDeserialize(
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
export async function endpointsCreateOrUpdate(
  context: Client,
  resourceUri: string,
  endpointName: string,
  endpointResource: EndpointResource,
  options: EndpointsCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<EndpointResource> {
  const result = await _endpointsCreateOrUpdateSend(
    context,
    resourceUri,
    endpointName,
    endpointResource,
    options,
  );
  return _endpointsCreateOrUpdateDeserialize(result);
}

export function _endpointsGetSend(
  context: Client,
  resourceUri: string,
  endpointName: string,
  options: EndpointsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/{resourceUri}/providers/Microsoft.HybridConnectivity/endpoints/{endpointName}",
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

export async function _endpointsGetDeserialize(
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

/** Gets the endpoint to the resource. */
export async function endpointsGet(
  context: Client,
  resourceUri: string,
  endpointName: string,
  options: EndpointsGetOptionalParams = { requestOptions: {} },
): Promise<EndpointResource> {
  const result = await _endpointsGetSend(context, resourceUri, endpointName, options);
  return _endpointsGetDeserialize(result);
}

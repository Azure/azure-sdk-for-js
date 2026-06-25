// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { KubernetesRuntimeContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  ServiceResource,
  serviceResourceSerializer,
  serviceResourceDeserializer,
  _ServiceResourceListResult,
  _serviceResourceListResultDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  ServicesListOptionalParams,
  ServicesDeleteOptionalParams,
  ServicesCreateOrUpdateOptionalParams,
  ServicesGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  resourceUri: string,
  options: ServicesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceUri}/providers/Microsoft.KubernetesRuntime/services{?api%2Dversion}",
    {
      resourceUri: resourceUri,
      "api%2Dversion": context.apiVersion ?? "2024-03-01",
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

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_ServiceResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _serviceResourceListResultDeserializer(result.body);
}

/** List ServiceResource resources by parent */
export function list(
  context: Client,
  resourceUri: string,
  options: ServicesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ServiceResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceUri, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2024-03-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceUri: string,
  serviceName: string,
  options: ServicesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceUri}/providers/Microsoft.KubernetesRuntime/services/{serviceName}{?api%2Dversion}",
    {
      resourceUri: resourceUri,
      serviceName: serviceName,
      "api%2Dversion": context.apiVersion ?? "2024-03-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Delete a ServiceResource */
export async function $delete(
  context: Client,
  resourceUri: string,
  serviceName: string,
  options: ServicesDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, resourceUri, serviceName, options);
  return _$deleteDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceUri: string,
  serviceName: string,
  resource: ServiceResource,
  options: ServicesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceUri}/providers/Microsoft.KubernetesRuntime/services/{serviceName}{?api%2Dversion}",
    {
      resourceUri: resourceUri,
      serviceName: serviceName,
      "api%2Dversion": context.apiVersion ?? "2024-03-01",
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
      body: serviceResourceSerializer(resource),
    });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<ServiceResource> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return serviceResourceDeserializer(result.body);
}

/** Create a ServiceResource */
export async function createOrUpdate(
  context: Client,
  resourceUri: string,
  serviceName: string,
  resource: ServiceResource,
  options: ServicesCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<ServiceResource> {
  const result = await _createOrUpdateSend(context, resourceUri, serviceName, resource, options);
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceUri: string,
  serviceName: string,
  options: ServicesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceUri}/providers/Microsoft.KubernetesRuntime/services/{serviceName}{?api%2Dversion}",
    {
      resourceUri: resourceUri,
      serviceName: serviceName,
      "api%2Dversion": context.apiVersion ?? "2024-03-01",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<ServiceResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return serviceResourceDeserializer(result.body);
}

/** Get a ServiceResource */
export async function get(
  context: Client,
  resourceUri: string,
  serviceName: string,
  options: ServicesGetOptionalParams = { requestOptions: {} },
): Promise<ServiceResource> {
  const result = await _getSend(context, resourceUri, serviceName, options);
  return _getDeserialize(result);
}

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ServiceFabricContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  ManagedVMSize,
  managedVMSizeDeserializer,
  _ManagedVMSizesResult,
  _managedVMSizesResultDeserializer,
} from "../../models/models.js";
import {
  ManagedUnsupportedVMSizesListOptionalParams,
  ManagedUnsupportedVMSizesGetOptionalParams,
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

export function _listSend(
  context: Client,
  location: string,
  options: ManagedUnsupportedVMSizesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ServiceFabric/locations/{location}/managedUnsupportedVMSizes{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
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

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_ManagedVMSizesResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _managedVMSizesResultDeserializer(result.body);
}

/** Get the lists of unsupported vm sizes for Service Fabric Managed Clusters. */
export function list(
  context: Client,
  location: string,
  options: ManagedUnsupportedVMSizesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ManagedVMSize> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, location, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _getSend(
  context: Client,
  location: string,
  vmSize: string,
  options: ManagedUnsupportedVMSizesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ServiceFabric/locations/{location}/managedUnsupportedVMSizes/{vmSize}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      vmSize: vmSize,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<ManagedVMSize> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return managedVMSizeDeserializer(result.body);
}

/** Get unsupported vm size for Service Fabric Managed Clusters. */
export async function get(
  context: Client,
  location: string,
  vmSize: string,
  options: ManagedUnsupportedVMSizesGetOptionalParams = { requestOptions: {} },
): Promise<ManagedVMSize> {
  const result = await _getSend(context, location, vmSize, options);
  return _getDeserialize(result);
}

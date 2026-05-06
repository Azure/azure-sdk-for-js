// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ServiceFabricManagementContext as Client } from "../index.js";
import {
  errorModelDeserializer,
  VMSizeResource,
  vmSizeResourceDeserializer,
  _VMSizesResult,
  _vmSizesResultDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  UnsupportedVmSizesListOptionalParams,
  UnsupportedVmSizesGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  location: string,
  options: UnsupportedVmSizesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ServiceFabric/locations/{location}/unsupportedVmSizes{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      "api%2Dversion": context.apiVersion ?? "2026-03-01-preview",
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

export async function _listDeserialize(result: PathUncheckedResponse): Promise<_VMSizesResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorModelDeserializer(result.body);

    throw error;
  }

  return _vmSizesResultDeserializer(result.body);
}

/** Get the lists of unsupported vm sizes for Service Fabric Clusters. */
export function list(
  context: Client,
  location: string,
  options: UnsupportedVmSizesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<VMSizeResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, location, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-03-01-preview",
    },
  );
}

export function _getSend(
  context: Client,
  location: string,
  vmSize: string,
  options: UnsupportedVmSizesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ServiceFabric/locations/{location}/unsupportedVmSizes/{vmSize}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      vmSize: vmSize,
      "api%2Dversion": context.apiVersion ?? "2026-03-01-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<VMSizeResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorModelDeserializer(result.body);

    throw error;
  }

  return vmSizeResourceDeserializer(result.body);
}

/** Get unsupported vm size for Service Fabric Clusters. */
export async function get(
  context: Client,
  location: string,
  vmSize: string,
  options: UnsupportedVmSizesGetOptionalParams = { requestOptions: {} },
): Promise<VMSizeResource> {
  const result = await _getSend(context, location, vmSize, options);
  return _getDeserialize(result);
}

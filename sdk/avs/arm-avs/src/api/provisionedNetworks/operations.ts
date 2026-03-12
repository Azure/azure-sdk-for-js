// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureVMwareSolutionAPIContext as Client } from "../index.js";
import type { _ProvisionedNetworkListResult, ProvisionedNetwork } from "../../models/models.js";
import {
  errorResponseDeserializer,
  _provisionedNetworkListResultDeserializer,
  provisionedNetworkDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ProvisionedNetworksGetOptionalParams,
  ProvisionedNetworksListOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _getSend(
  context: Client,
  resourceGroupName: string,
  privateCloudName: string,
  provisionedNetworkName: string,
  options: ProvisionedNetworksGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/provisionedNetworks/{provisionedNetworkName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      privateCloudName: privateCloudName,
      provisionedNetworkName: provisionedNetworkName,
      "api%2Dversion": context.apiVersion,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<ProvisionedNetwork> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return provisionedNetworkDeserializer(result.body);
}

/** Get a ProvisionedNetwork */
export async function get(
  context: Client,
  resourceGroupName: string,
  privateCloudName: string,
  provisionedNetworkName: string,
  options: ProvisionedNetworksGetOptionalParams = { requestOptions: {} },
): Promise<ProvisionedNetwork> {
  const result = await _getSend(
    context,
    resourceGroupName,
    privateCloudName,
    provisionedNetworkName,
    options,
  );
  return _getDeserialize(result);
}

export function _listSend(
  context: Client,
  resourceGroupName: string,
  privateCloudName: string,
  options: ProvisionedNetworksListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/provisionedNetworks{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      privateCloudName: privateCloudName,
      "api%2Dversion": context.apiVersion,
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
): Promise<_ProvisionedNetworkListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _provisionedNetworkListResultDeserializer(result.body);
}

/** List ProvisionedNetwork resources by PrivateCloud */
export function list(
  context: Client,
  resourceGroupName: string,
  privateCloudName: string,
  options: ProvisionedNetworksListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ProvisionedNetwork> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, privateCloudName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

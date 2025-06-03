// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureSiteRecoveryManagementServiceAPIContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  PrivateLinkResource,
  privateLinkResourceDeserializer,
  _PrivateLinkResourceListResult,
  _privateLinkResourceListResultDeserializer,
} from "../../models/models.js";
import {
  PrivateLinkResourcesListOptionalParams,
  PrivateLinkResourcesGetOptionalParams,
} from "./options.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
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

export function _listSend(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  options: PrivateLinkResourcesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataReplication/replicationVaults/{vaultName}/privateLinkResources{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vaultName: vaultName,
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
): Promise<_PrivateLinkResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _privateLinkResourceListResultDeserializer(result.body);
}

/** Gets the list of private link resources. */
export function list(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  options: PrivateLinkResourcesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<PrivateLinkResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, vaultName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  privateLinkResourceName: string,
  options: PrivateLinkResourcesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataReplication/replicationVaults/{vaultName}/privateLinkResources/{privateLinkResourceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vaultName: vaultName,
      privateLinkResourceName: privateLinkResourceName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<PrivateLinkResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return privateLinkResourceDeserializer(result.body);
}

/** Gets the details of site recovery private link resource. */
export async function get(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  privateLinkResourceName: string,
  options: PrivateLinkResourcesGetOptionalParams = { requestOptions: {} },
): Promise<PrivateLinkResource> {
  const result = await _getSend(
    context,
    resourceGroupName,
    vaultName,
    privateLinkResourceName,
    options,
  );
  return _getDeserialize(result);
}

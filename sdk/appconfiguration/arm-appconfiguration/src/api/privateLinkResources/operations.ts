// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AppConfigurationManagementContext as Client } from "../index.js";
import type { PrivateLinkResource, _PrivateLinkResourceListResult } from "../../models/models.js";
import {
  errorResponseDeserializer,
  privateLinkResourceDeserializer,
  _privateLinkResourceListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  PrivateLinkResourcesListByConfigurationStoreOptionalParams,
  PrivateLinkResourcesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listByConfigurationStoreSend(
  context: Client,
  resourceGroupName: string,
  configStoreName: string,
  options: PrivateLinkResourcesListByConfigurationStoreOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AppConfiguration/configurationStores/{configStoreName}/privateLinkResources{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      configStoreName: configStoreName,
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

export async function _listByConfigurationStoreDeserialize(
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

/** Gets the private link resources that need to be created for a configuration store. */
export function listByConfigurationStore(
  context: Client,
  resourceGroupName: string,
  configStoreName: string,
  options: PrivateLinkResourcesListByConfigurationStoreOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<PrivateLinkResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listByConfigurationStoreSend(context, resourceGroupName, configStoreName, options),
    _listByConfigurationStoreDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  configStoreName: string,
  groupName: string,
  options: PrivateLinkResourcesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AppConfiguration/configurationStores/{configStoreName}/privateLinkResources/{groupName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      configStoreName: configStoreName,
      groupName: groupName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<PrivateLinkResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return privateLinkResourceDeserializer(result.body);
}

/** Gets a private link resource that need to be created for a configuration store. */
export async function get(
  context: Client,
  resourceGroupName: string,
  configStoreName: string,
  groupName: string,
  options: PrivateLinkResourcesGetOptionalParams = { requestOptions: {} },
): Promise<PrivateLinkResource> {
  const result = await _getSend(context, resourceGroupName, configStoreName, groupName, options);
  return _getDeserialize(result);
}

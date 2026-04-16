// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureMapsManagementContext as Client } from "../index.js";
import type { PrivateLinkResource, _PrivateLinkResourceList } from "../../models/models.js";
import {
  errorResponseDeserializer,
  privateLinkResourceDeserializer,
  _privateLinkResourceListDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  PrivateLinkResourcesListByAccountOptionalParams,
  PrivateLinkResourcesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listByAccountSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  options: PrivateLinkResourcesListByAccountOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Maps/accounts/{accountName}/privateLinkResources{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      "api%2Dversion": context.apiVersion ?? "2025-10-01-preview",
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

export async function _listByAccountDeserialize(
  result: PathUncheckedResponse,
): Promise<_PrivateLinkResourceList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _privateLinkResourceListDeserializer(result.body);
}

/** Gets the private link resources that are available to be used for the Maps Account. */
export function listByAccount(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  options: PrivateLinkResourcesListByAccountOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<PrivateLinkResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listByAccountSend(context, resourceGroupName, accountName, options),
    _listByAccountDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-10-01-preview",
    },
  );
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  privateLinkResourceName: string,
  options: PrivateLinkResourcesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Maps/accounts/{accountName}/privateLinkResources/{privateLinkResourceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      privateLinkResourceName: privateLinkResourceName,
      "api%2Dversion": context.apiVersion ?? "2025-10-01-preview",
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

/** Gets a private link resource by name which can be used for the Maps Account. */
export async function get(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  privateLinkResourceName: string,
  options: PrivateLinkResourcesGetOptionalParams = { requestOptions: {} },
): Promise<PrivateLinkResource> {
  const result = await _getSend(
    context,
    resourceGroupName,
    accountName,
    privateLinkResourceName,
    options,
  );
  return _getDeserialize(result);
}

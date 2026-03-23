// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PurviewManagementContext as Client } from "../index.js";
import type { PrivateLinkResource, _PrivateLinkResourceList } from "../../models/models.js";
import {
  errorResponseModelDeserializer,
  privateLinkResourceDeserializer,
  _privateLinkResourceListDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  PrivateLinkResourcesListByAccountOptionalParams,
  PrivateLinkResourcesGetByGroupIdOptionalParams,
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
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Purview/accounts/{accountName}/privateLinkResources{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      "api%2Dversion": context.apiVersion ?? "2024-04-01-preview",
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
    error.details = errorResponseModelDeserializer(result.body);

    throw error;
  }

  return _privateLinkResourceListDeserializer(result.body);
}

/** Gets a list of privately linkable resources for an account */
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
      apiVersion: context.apiVersion ?? "2024-04-01-preview",
    },
  );
}

export function _getByGroupIdSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  groupId: string,
  options: PrivateLinkResourcesGetByGroupIdOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Purview/accounts/{accountName}/privateLinkResources/{groupId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      groupId: groupId,
      "api%2Dversion": context.apiVersion ?? "2024-04-01-preview",
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

export async function _getByGroupIdDeserialize(
  result: PathUncheckedResponse,
): Promise<PrivateLinkResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseModelDeserializer(result.body);

    throw error;
  }

  return privateLinkResourceDeserializer(result.body);
}

/** Gets a privately linkable resources for an account with given group identifier */
export async function getByGroupId(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  groupId: string,
  options: PrivateLinkResourcesGetByGroupIdOptionalParams = { requestOptions: {} },
): Promise<PrivateLinkResource> {
  const result = await _getByGroupIdSend(context, resourceGroupName, accountName, groupId, options);
  return _getByGroupIdDeserialize(result);
}

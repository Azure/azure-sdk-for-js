// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { BatchManagementContext as Client } from "../index.js";
import type { PrivateLinkResource, _ListPrivateLinkResourcesResult } from "../../models/models.js";
import {
  cloudErrorDeserializer,
  privateLinkResourceDeserializer,
  _listPrivateLinkResourcesResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  PrivateLinkResourceListByBatchAccountOptionalParams,
  PrivateLinkResourceGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listByBatchAccountSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  options: PrivateLinkResourceListByBatchAccountOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Batch/batchAccounts/{accountName}/privateLinkResources{?api%2Dversion,maxresults}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      "api%2Dversion": context.apiVersion ?? "2025-06-01",
      maxresults: options?.maxresults,
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

export async function _listByBatchAccountDeserialize(
  result: PathUncheckedResponse,
): Promise<_ListPrivateLinkResourcesResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return _listPrivateLinkResourcesResultDeserializer(result.body);
}

/** Lists all of the private link resources in the specified account. */
export function listByBatchAccount(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  options: PrivateLinkResourceListByBatchAccountOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<PrivateLinkResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listByBatchAccountSend(context, resourceGroupName, accountName, options),
    _listByBatchAccountDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-06-01" },
  );
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  privateLinkResourceName: string,
  options: PrivateLinkResourceGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Batch/batchAccounts/{accountName}/privateLinkResources/{privateLinkResourceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      privateLinkResourceName: privateLinkResourceName,
      "api%2Dversion": context.apiVersion ?? "2025-06-01",
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
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return privateLinkResourceDeserializer(result.body);
}

/** Gets information about the specified private link resource. */
export async function get(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  privateLinkResourceName: string,
  options: PrivateLinkResourceGetOptionalParams = { requestOptions: {} },
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

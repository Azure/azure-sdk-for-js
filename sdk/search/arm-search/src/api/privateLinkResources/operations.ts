// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SearchManagementContext as Client } from "../index.js";
import type { _PrivateLinkResourcesResult, PrivateLinkResource } from "../../models/models.js";
import {
  cloudErrorDeserializer,
  _privateLinkResourcesResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { PrivateLinkResourcesListSupportedOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSupportedSend(
  context: Client,
  resourceGroupName: string,
  searchServiceName: string,
  options: PrivateLinkResourcesListSupportedOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Search/searchServices/{searchServiceName}/privateLinkResources{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      searchServiceName: searchServiceName,
      "api%2Dversion": context.apiVersion ?? "2026-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.searchManagementRequestOptions?.clientRequestId !== undefined
        ? { "x-ms-client-request-id": options?.searchManagementRequestOptions?.clientRequestId }
        : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listSupportedDeserialize(
  result: PathUncheckedResponse,
): Promise<_PrivateLinkResourcesResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _privateLinkResourcesResultDeserializer(result.body);
}

/** Gets a list of all supported private link resource types for the given service. */
export function listSupported(
  context: Client,
  resourceGroupName: string,
  searchServiceName: string,
  options: PrivateLinkResourcesListSupportedOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<PrivateLinkResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listSupportedSend(context, resourceGroupName, searchServiceName, options),
    _listSupportedDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-03-01-preview",
    },
  );
}

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityCenterContext as Client } from "../index.js";
import type { _PrivateLinkGroupResourceListResult } from "../../models/models.js";
import {
  errorResponseDeserializer,
  _privateLinkGroupResourceListResultDeserializer,
} from "../../models/models.js";
import type { PrivateLinkGroupResource } from "../../models/privateLinksAPI/models.js";
import { privateLinkGroupResourceDeserializer } from "../../models/privateLinksAPI/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  PrivateLinkResourcesListOptionalParams,
  PrivateLinkResourcesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  options: PrivateLinkResourcesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Security/privateLinks/{privateLinkName}/privateLinkResources{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      privateLinkName: options?.params?.privateLinkName,
      "api%2Dversion": "2026-01-01",
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
): Promise<_PrivateLinkGroupResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _privateLinkGroupResourceListResultDeserializer(result.body);
}

/** List all private link resources in a private link. */
export function list(
  context: Client,
  resourceGroupName: string,
  options: PrivateLinkResourcesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<PrivateLinkGroupResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2026-01-01" },
  );
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  groupId: string,
  options: PrivateLinkResourcesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Security/privateLinks/{privateLinkName}/privateLinkResources/{groupId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      privateLinkName: options?.params?.privateLinkName,
      groupId: groupId,
      "api%2Dversion": "2026-01-01",
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

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<PrivateLinkGroupResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return privateLinkGroupResourceDeserializer(result.body);
}

/** Get the specified private link resource associated with the private link. */
export async function get(
  context: Client,
  resourceGroupName: string,
  groupId: string,
  options: PrivateLinkResourcesGetOptionalParams = { requestOptions: {} },
): Promise<PrivateLinkGroupResource> {
  const result = await _getSend(context, resourceGroupName, groupId, options);
  return _getDeserialize(result);
}

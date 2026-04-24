// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityCenterContext as Client } from "../index.js";
import { commonCloudErrorDeserializer } from "../../models/common/models.js";
import type {
  SecuritySolutionsAPIAllowedConnectionsResource,
  SecuritySolutionsAPIConnectionType,
  _SecuritySolutionsAPIAllowedConnectionsList,
} from "../../models/securitySolutionsAPI/models.js";
import {
  securitySolutionsAPIAllowedConnectionsResourceDeserializer,
  _securitySolutionsAPIAllowedConnectionsListDeserializer,
} from "../../models/securitySolutionsAPI/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  AllowedConnectionsListOptionalParams,
  AllowedConnectionsListByHomeRegionOptionalParams,
  AllowedConnectionsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  options: AllowedConnectionsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Security/allowedConnections{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": "2020-01-01",
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
): Promise<_SecuritySolutionsAPIAllowedConnectionsList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = commonCloudErrorDeserializer(result.body);

    throw error;
  }

  return _securitySolutionsAPIAllowedConnectionsListDeserializer(result.body);
}

/** Gets the list of all possible traffic between resources for the subscription */
export function list(
  context: Client,
  options: AllowedConnectionsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SecuritySolutionsAPIAllowedConnectionsResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2020-01-01" },
  );
}

export function _listByHomeRegionSend(
  context: Client,
  ascLocation: string,
  options: AllowedConnectionsListByHomeRegionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Security/locations/{ascLocation}/allowedConnections{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      ascLocation: ascLocation,
      "api%2Dversion": "2020-01-01",
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

export async function _listByHomeRegionDeserialize(
  result: PathUncheckedResponse,
): Promise<_SecuritySolutionsAPIAllowedConnectionsList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = commonCloudErrorDeserializer(result.body);

    throw error;
  }

  return _securitySolutionsAPIAllowedConnectionsListDeserializer(result.body);
}

/** Gets the list of all possible traffic between resources for the subscription and location. */
export function listByHomeRegion(
  context: Client,
  ascLocation: string,
  options: AllowedConnectionsListByHomeRegionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SecuritySolutionsAPIAllowedConnectionsResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listByHomeRegionSend(context, ascLocation, options),
    _listByHomeRegionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2020-01-01" },
  );
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  ascLocation: string,
  connectionType: SecuritySolutionsAPIConnectionType,
  options: AllowedConnectionsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Security/locations/{ascLocation}/allowedConnections/{connectionType}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      ascLocation: ascLocation,
      connectionType: connectionType,
      "api%2Dversion": "2020-01-01",
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
): Promise<SecuritySolutionsAPIAllowedConnectionsResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = commonCloudErrorDeserializer(result.body);

    throw error;
  }

  return securitySolutionsAPIAllowedConnectionsResourceDeserializer(result.body);
}

/** Gets the list of all possible traffic between resources for the subscription and location, based on connection type. */
export async function get(
  context: Client,
  resourceGroupName: string,
  ascLocation: string,
  connectionType: SecuritySolutionsAPIConnectionType,
  options: AllowedConnectionsGetOptionalParams = { requestOptions: {} },
): Promise<SecuritySolutionsAPIAllowedConnectionsResource> {
  const result = await _getSend(context, resourceGroupName, ascLocation, connectionType, options);
  return _getDeserialize(result);
}

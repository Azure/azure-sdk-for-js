// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityCenterContext as Client } from "../index.js";
import { commonCloudErrorDeserializer } from "../../models/common/models.js";
import type {
  SecuritySolutionsAPITopologyResource,
  _SecuritySolutionsAPITopologyList,
} from "../../models/securitySolutionsAPI/models.js";
import {
  securitySolutionsAPITopologyResourceDeserializer,
  _securitySolutionsAPITopologyListDeserializer,
} from "../../models/securitySolutionsAPI/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  TopologyListOptionalParams,
  TopologyListByHomeRegionOptionalParams,
  TopologyGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  options: TopologyListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Security/topologies{?api%2Dversion}",
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
): Promise<_SecuritySolutionsAPITopologyList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = commonCloudErrorDeserializer(result.body);

    throw error;
  }

  return _securitySolutionsAPITopologyListDeserializer(result.body);
}

/** Gets a list that allows to build a topology view of a subscription. */
export function list(
  context: Client,
  options: TopologyListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SecuritySolutionsAPITopologyResource> {
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
  options: TopologyListByHomeRegionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Security/locations/{ascLocation}/topologies{?api%2Dversion}",
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
): Promise<_SecuritySolutionsAPITopologyList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = commonCloudErrorDeserializer(result.body);

    throw error;
  }

  return _securitySolutionsAPITopologyListDeserializer(result.body);
}

/** Gets a list that allows to build a topology view of a subscription and location. */
export function listByHomeRegion(
  context: Client,
  ascLocation: string,
  options: TopologyListByHomeRegionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SecuritySolutionsAPITopologyResource> {
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
  topologyResourceName: string,
  options: TopologyGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Security/locations/{ascLocation}/topologies/{topologyResourceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      ascLocation: ascLocation,
      topologyResourceName: topologyResourceName,
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
): Promise<SecuritySolutionsAPITopologyResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = commonCloudErrorDeserializer(result.body);

    throw error;
  }

  return securitySolutionsAPITopologyResourceDeserializer(result.body);
}

/** Gets a specific topology component. */
export async function get(
  context: Client,
  resourceGroupName: string,
  ascLocation: string,
  topologyResourceName: string,
  options: TopologyGetOptionalParams = { requestOptions: {} },
): Promise<SecuritySolutionsAPITopologyResource> {
  const result = await _getSend(
    context,
    resourceGroupName,
    ascLocation,
    topologyResourceName,
    options,
  );
  return _getDeserialize(result);
}

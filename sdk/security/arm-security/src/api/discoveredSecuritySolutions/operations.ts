// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityCenterContext as Client } from "../index.js";
import { commonCloudErrorDeserializer } from "../../models/common/models.js";
import type {
  SecuritySolutionsAPIDiscoveredSecuritySolution,
  _SecuritySolutionsAPIDiscoveredSecuritySolutionList,
} from "../../models/securitySolutionsAPI/models.js";
import {
  securitySolutionsAPIDiscoveredSecuritySolutionDeserializer,
  _securitySolutionsAPIDiscoveredSecuritySolutionListDeserializer,
} from "../../models/securitySolutionsAPI/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  DiscoveredSecuritySolutionsListOptionalParams,
  DiscoveredSecuritySolutionsListByHomeRegionOptionalParams,
  DiscoveredSecuritySolutionsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  options: DiscoveredSecuritySolutionsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Security/discoveredSecuritySolutions{?api%2Dversion}",
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
): Promise<_SecuritySolutionsAPIDiscoveredSecuritySolutionList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = commonCloudErrorDeserializer(result.body);

    throw error;
  }

  return _securitySolutionsAPIDiscoveredSecuritySolutionListDeserializer(result.body);
}

/** Gets a list of discovered Security Solutions for the subscription. */
export function list(
  context: Client,
  options: DiscoveredSecuritySolutionsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SecuritySolutionsAPIDiscoveredSecuritySolution> {
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
  options: DiscoveredSecuritySolutionsListByHomeRegionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Security/locations/{ascLocation}/discoveredSecuritySolutions{?api%2Dversion}",
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
): Promise<_SecuritySolutionsAPIDiscoveredSecuritySolutionList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = commonCloudErrorDeserializer(result.body);

    throw error;
  }

  return _securitySolutionsAPIDiscoveredSecuritySolutionListDeserializer(result.body);
}

/** Gets a list of discovered Security Solutions for the subscription and location. */
export function listByHomeRegion(
  context: Client,
  ascLocation: string,
  options: DiscoveredSecuritySolutionsListByHomeRegionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SecuritySolutionsAPIDiscoveredSecuritySolution> {
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
  discoveredSecuritySolutionName: string,
  options: DiscoveredSecuritySolutionsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Security/locations/{ascLocation}/discoveredSecuritySolutions/{discoveredSecuritySolutionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      ascLocation: ascLocation,
      discoveredSecuritySolutionName: discoveredSecuritySolutionName,
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
): Promise<SecuritySolutionsAPIDiscoveredSecuritySolution> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = commonCloudErrorDeserializer(result.body);

    throw error;
  }

  return securitySolutionsAPIDiscoveredSecuritySolutionDeserializer(result.body);
}

/** Gets a specific discovered Security Solution. */
export async function get(
  context: Client,
  resourceGroupName: string,
  ascLocation: string,
  discoveredSecuritySolutionName: string,
  options: DiscoveredSecuritySolutionsGetOptionalParams = { requestOptions: {} },
): Promise<SecuritySolutionsAPIDiscoveredSecuritySolution> {
  const result = await _getSend(
    context,
    resourceGroupName,
    ascLocation,
    discoveredSecuritySolutionName,
    options,
  );
  return _getDeserialize(result);
}

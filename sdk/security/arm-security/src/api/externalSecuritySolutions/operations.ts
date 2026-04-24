// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityCenterContext as Client } from "../index.js";
import { commonCloudErrorDeserializer } from "../../models/common/models.js";
import type {
  SecuritySolutionsAPIExternalSecuritySolutionUnion,
  _SecuritySolutionsAPIExternalSecuritySolutionList,
} from "../../models/securitySolutionsAPI/models.js";
import {
  securitySolutionsAPIExternalSecuritySolutionUnionDeserializer,
  _securitySolutionsAPIExternalSecuritySolutionListDeserializer,
} from "../../models/securitySolutionsAPI/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ExternalSecuritySolutionsListOptionalParams,
  ExternalSecuritySolutionsListByHomeRegionOptionalParams,
  ExternalSecuritySolutionsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  options: ExternalSecuritySolutionsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Security/externalSecuritySolutions{?api%2Dversion}",
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
): Promise<_SecuritySolutionsAPIExternalSecuritySolutionList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = commonCloudErrorDeserializer(result.body);

    throw error;
  }

  return _securitySolutionsAPIExternalSecuritySolutionListDeserializer(result.body);
}

/** Gets a list of external security solutions for the subscription. */
export function list(
  context: Client,
  options: ExternalSecuritySolutionsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SecuritySolutionsAPIExternalSecuritySolutionUnion> {
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
  options: ExternalSecuritySolutionsListByHomeRegionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Security/locations/{ascLocation}/ExternalSecuritySolutions{?api%2Dversion}",
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
): Promise<_SecuritySolutionsAPIExternalSecuritySolutionList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = commonCloudErrorDeserializer(result.body);

    throw error;
  }

  return _securitySolutionsAPIExternalSecuritySolutionListDeserializer(result.body);
}

/** Gets a list of external Security Solutions for the subscription and location. */
export function listByHomeRegion(
  context: Client,
  ascLocation: string,
  options: ExternalSecuritySolutionsListByHomeRegionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SecuritySolutionsAPIExternalSecuritySolutionUnion> {
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
  externalSecuritySolutionsName: string,
  options: ExternalSecuritySolutionsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Security/locations/{ascLocation}/ExternalSecuritySolutions/{externalSecuritySolutionsName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      ascLocation: ascLocation,
      externalSecuritySolutionsName: externalSecuritySolutionsName,
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
): Promise<SecuritySolutionsAPIExternalSecuritySolutionUnion> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = commonCloudErrorDeserializer(result.body);

    throw error;
  }

  return securitySolutionsAPIExternalSecuritySolutionUnionDeserializer(result.body);
}

/** Gets a specific external Security Solution. */
export async function get(
  context: Client,
  resourceGroupName: string,
  ascLocation: string,
  externalSecuritySolutionsName: string,
  options: ExternalSecuritySolutionsGetOptionalParams = { requestOptions: {} },
): Promise<SecuritySolutionsAPIExternalSecuritySolutionUnion> {
  const result = await _getSend(
    context,
    resourceGroupName,
    ascLocation,
    externalSecuritySolutionsName,
    options,
  );
  return _getDeserialize(result);
}

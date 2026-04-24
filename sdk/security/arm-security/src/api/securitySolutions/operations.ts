// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityCenterContext as Client } from "../index.js";
import { commonCloudErrorDeserializer } from "../../models/common/models.js";
import type {
  SecuritySolutionsAPISecuritySolution,
  _SecuritySolutionsAPISecuritySolutionList,
} from "../../models/securitySolutionsAPI/models.js";
import {
  securitySolutionsAPISecuritySolutionDeserializer,
  _securitySolutionsAPISecuritySolutionListDeserializer,
} from "../../models/securitySolutionsAPI/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  SecuritySolutionsListOptionalParams,
  SecuritySolutionsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  options: SecuritySolutionsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Security/securitySolutions{?api%2Dversion}",
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
): Promise<_SecuritySolutionsAPISecuritySolutionList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = commonCloudErrorDeserializer(result.body);

    throw error;
  }

  return _securitySolutionsAPISecuritySolutionListDeserializer(result.body);
}

/** Gets a list of Security Solutions for the subscription. */
export function list(
  context: Client,
  options: SecuritySolutionsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SecuritySolutionsAPISecuritySolution> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2020-01-01" },
  );
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  ascLocation: string,
  securitySolutionName: string,
  options: SecuritySolutionsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Security/locations/{ascLocation}/securitySolutions/{securitySolutionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      ascLocation: ascLocation,
      securitySolutionName: securitySolutionName,
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
): Promise<SecuritySolutionsAPISecuritySolution> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = commonCloudErrorDeserializer(result.body);

    throw error;
  }

  return securitySolutionsAPISecuritySolutionDeserializer(result.body);
}

/** Gets a specific Security Solution. */
export async function get(
  context: Client,
  resourceGroupName: string,
  ascLocation: string,
  securitySolutionName: string,
  options: SecuritySolutionsGetOptionalParams = { requestOptions: {} },
): Promise<SecuritySolutionsAPISecuritySolution> {
  const result = await _getSend(
    context,
    resourceGroupName,
    ascLocation,
    securitySolutionName,
    options,
  );
  return _getDeserialize(result);
}

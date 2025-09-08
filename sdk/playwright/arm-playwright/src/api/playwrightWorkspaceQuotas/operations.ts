// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PlaywrightManagementContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  QuotaName,
  PlaywrightWorkspaceQuota,
  playwrightWorkspaceQuotaDeserializer,
  _PlaywrightWorkspaceQuotaListResult,
  _playwrightWorkspaceQuotaListResultDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  PlaywrightWorkspaceQuotasListByPlaywrightWorkspaceOptionalParams,
  PlaywrightWorkspaceQuotasGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listByPlaywrightWorkspaceSend(
  context: Client,
  resourceGroupName: string,
  playwrightWorkspaceName: string,
  options: PlaywrightWorkspaceQuotasListByPlaywrightWorkspaceOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.LoadTestService/playwrightWorkspaces/{playwrightWorkspaceName}/quotas{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      playwrightWorkspaceName: playwrightWorkspaceName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listByPlaywrightWorkspaceDeserialize(
  result: PathUncheckedResponse,
): Promise<_PlaywrightWorkspaceQuotaListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _playwrightWorkspaceQuotaListResultDeserializer(result.body);
}

/** Lists quota resources for a given Playwright workspace. */
export function listByPlaywrightWorkspace(
  context: Client,
  resourceGroupName: string,
  playwrightWorkspaceName: string,
  options: PlaywrightWorkspaceQuotasListByPlaywrightWorkspaceOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<PlaywrightWorkspaceQuota> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listByPlaywrightWorkspaceSend(context, resourceGroupName, playwrightWorkspaceName, options),
    _listByPlaywrightWorkspaceDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  playwrightWorkspaceName: string,
  quotaName: QuotaName,
  options: PlaywrightWorkspaceQuotasGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.LoadTestService/playwrightWorkspaces/{playwrightWorkspaceName}/quotas/{quotaName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      playwrightWorkspaceName: playwrightWorkspaceName,
      quotaName: quotaName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<PlaywrightWorkspaceQuota> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return playwrightWorkspaceQuotaDeserializer(result.body);
}

/** Gets a Playwright workspace quota resource by name. */
export async function get(
  context: Client,
  resourceGroupName: string,
  playwrightWorkspaceName: string,
  quotaName: QuotaName,
  options: PlaywrightWorkspaceQuotasGetOptionalParams = { requestOptions: {} },
): Promise<PlaywrightWorkspaceQuota> {
  const result = await _getSend(
    context,
    resourceGroupName,
    playwrightWorkspaceName,
    quotaName,
    options,
  );
  return _getDeserialize(result);
}

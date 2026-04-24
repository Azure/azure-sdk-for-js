// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityCenterContext as Client } from "../index.js";
import { errorResponseDeserializer } from "../../models/models.js";
import type {
  GitLabGroup,
  GitLabGroupListResponse,
} from "../../models/securityConnectorsDevOpsAPI/models.js";
import {
  gitLabGroupDeserializer,
  gitLabGroupListResponseDeserializer,
} from "../../models/securityConnectorsDevOpsAPI/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  GitLabGroupsListAvailableOptionalParams,
  GitLabGroupsListOptionalParams,
  GitLabGroupsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listAvailableSend(
  context: Client,
  resourceGroupName: string,
  securityConnectorName: string,
  options: GitLabGroupsListAvailableOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Security/securityConnectors/{securityConnectorName}/devops/default/listAvailableGitLabGroups{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      securityConnectorName: securityConnectorName,
      "api%2Dversion": "2025-11-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listAvailableDeserialize(
  result: PathUncheckedResponse,
): Promise<GitLabGroupListResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return gitLabGroupListResponseDeserializer(result.body);
}

/** Returns a list of all GitLab groups accessible by the user token consumed by the connector. */
export async function listAvailable(
  context: Client,
  resourceGroupName: string,
  securityConnectorName: string,
  options: GitLabGroupsListAvailableOptionalParams = { requestOptions: {} },
): Promise<GitLabGroupListResponse> {
  const result = await _listAvailableSend(
    context,
    resourceGroupName,
    securityConnectorName,
    options,
  );
  return _listAvailableDeserialize(result);
}

export function _listSend(
  context: Client,
  resourceGroupName: string,
  securityConnectorName: string,
  options: GitLabGroupsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Security/securityConnectors/{securityConnectorName}/devops/default/gitLabGroups{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      securityConnectorName: securityConnectorName,
      "api%2Dversion": "2025-11-01-preview",
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
): Promise<GitLabGroupListResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return gitLabGroupListResponseDeserializer(result.body);
}

/** Returns a list of GitLab groups onboarded to the connector. */
export function list(
  context: Client,
  resourceGroupName: string,
  securityConnectorName: string,
  options: GitLabGroupsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<GitLabGroup> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, securityConnectorName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2025-11-01-preview" },
  );
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  securityConnectorName: string,
  groupFQName: string,
  options: GitLabGroupsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Security/securityConnectors/{securityConnectorName}/devops/default/gitLabGroups/{groupFQName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      securityConnectorName: securityConnectorName,
      groupFQName: groupFQName,
      "api%2Dversion": "2025-11-01-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<GitLabGroup> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return gitLabGroupDeserializer(result.body);
}

/** Returns a monitored GitLab Group resource for a given fully-qualified name. */
export async function get(
  context: Client,
  resourceGroupName: string,
  securityConnectorName: string,
  groupFQName: string,
  options: GitLabGroupsGetOptionalParams = { requestOptions: {} },
): Promise<GitLabGroup> {
  const result = await _getSend(
    context,
    resourceGroupName,
    securityConnectorName,
    groupFQName,
    options,
  );
  return _getDeserialize(result);
}

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityCenterContext as Client } from "../index.js";
import { errorResponseDeserializer } from "../../models/models.js";
import type {
  SecurityConnectorsDevOpsAPIGitLabProject,
  _SecurityConnectorsDevOpsAPIGitLabProjectListResponse,
} from "../../models/securityConnectorsDevOpsAPI/models.js";
import {
  securityConnectorsDevOpsAPIGitLabProjectDeserializer,
  _securityConnectorsDevOpsAPIGitLabProjectListResponseDeserializer,
} from "../../models/securityConnectorsDevOpsAPI/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  GitLabProjectsListOptionalParams,
  GitLabProjectsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  securityConnectorName: string,
  groupFQName: string,
  options: GitLabProjectsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Security/securityConnectors/{securityConnectorName}/devops/default/gitLabGroups/{groupFQName}/projects{?api%2Dversion}",
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

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_SecurityConnectorsDevOpsAPIGitLabProjectListResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _securityConnectorsDevOpsAPIGitLabProjectListResponseDeserializer(result.body);
}

/** Gets a list of GitLab projects that are directly owned by given group and onboarded to the connector. */
export function list(
  context: Client,
  resourceGroupName: string,
  securityConnectorName: string,
  groupFQName: string,
  options: GitLabProjectsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SecurityConnectorsDevOpsAPIGitLabProject> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, securityConnectorName, groupFQName, options),
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
  projectName: string,
  options: GitLabProjectsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Security/securityConnectors/{securityConnectorName}/devops/default/gitLabGroups/{groupFQName}/projects/{projectName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      securityConnectorName: securityConnectorName,
      groupFQName: groupFQName,
      projectName: projectName,
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

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<SecurityConnectorsDevOpsAPIGitLabProject> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return securityConnectorsDevOpsAPIGitLabProjectDeserializer(result.body);
}

/** Returns a monitored GitLab Project resource for a given fully-qualified group name and project name. */
export async function get(
  context: Client,
  resourceGroupName: string,
  securityConnectorName: string,
  groupFQName: string,
  projectName: string,
  options: GitLabProjectsGetOptionalParams = { requestOptions: {} },
): Promise<SecurityConnectorsDevOpsAPIGitLabProject> {
  const result = await _getSend(
    context,
    resourceGroupName,
    securityConnectorName,
    groupFQName,
    projectName,
    options,
  );
  return _getDeserialize(result);
}

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityCenterContext as Client } from "../index.js";
import { errorResponseDeserializer } from "../../models/models.js";
import type {
  SecurityConnectorsDevOpsAPIGitHubRepository,
  _SecurityConnectorsDevOpsAPIGitHubRepositoryListResponse,
} from "../../models/securityConnectorsDevOpsAPI/models.js";
import {
  securityConnectorsDevOpsAPIGitHubRepositoryDeserializer,
  _securityConnectorsDevOpsAPIGitHubRepositoryListResponseDeserializer,
} from "../../models/securityConnectorsDevOpsAPI/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { GitHubReposListOptionalParams, GitHubReposGetOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  securityConnectorName: string,
  ownerName: string,
  options: GitHubReposListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Security/securityConnectors/{securityConnectorName}/devops/default/gitHubOwners/{ownerName}/repos{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      securityConnectorName: securityConnectorName,
      ownerName: ownerName,
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
): Promise<_SecurityConnectorsDevOpsAPIGitHubRepositoryListResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _securityConnectorsDevOpsAPIGitHubRepositoryListResponseDeserializer(result.body);
}

/** Returns a list of GitHub repositories onboarded to the connector. */
export function list(
  context: Client,
  resourceGroupName: string,
  securityConnectorName: string,
  ownerName: string,
  options: GitHubReposListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SecurityConnectorsDevOpsAPIGitHubRepository> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, securityConnectorName, ownerName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2025-11-01-preview" },
  );
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  securityConnectorName: string,
  ownerName: string,
  repoName: string,
  options: GitHubReposGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Security/securityConnectors/{securityConnectorName}/devops/default/gitHubOwners/{ownerName}/repos/{repoName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      securityConnectorName: securityConnectorName,
      ownerName: ownerName,
      repoName: repoName,
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
): Promise<SecurityConnectorsDevOpsAPIGitHubRepository> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return securityConnectorsDevOpsAPIGitHubRepositoryDeserializer(result.body);
}

/** Returns a monitored GitHub repository. */
export async function get(
  context: Client,
  resourceGroupName: string,
  securityConnectorName: string,
  ownerName: string,
  repoName: string,
  options: GitHubReposGetOptionalParams = { requestOptions: {} },
): Promise<SecurityConnectorsDevOpsAPIGitHubRepository> {
  const result = await _getSend(
    context,
    resourceGroupName,
    securityConnectorName,
    ownerName,
    repoName,
    options,
  );
  return _getDeserialize(result);
}

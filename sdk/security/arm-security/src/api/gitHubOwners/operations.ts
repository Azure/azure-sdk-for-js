// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityCenterContext as Client } from "../index.js";
import { errorResponseDeserializer } from "../../models/models.js";
import type {
  GitHubOwner,
  GitHubOwnerListResponse,
} from "../../models/securityConnectorsDevOpsAPI/models.js";
import {
  gitHubOwnerDeserializer,
  gitHubOwnerListResponseDeserializer,
} from "../../models/securityConnectorsDevOpsAPI/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  GitHubOwnersListAvailableOptionalParams,
  GitHubOwnersListOptionalParams,
  GitHubOwnersGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listAvailableSend(
  context: Client,
  resourceGroupName: string,
  securityConnectorName: string,
  options: GitHubOwnersListAvailableOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Security/securityConnectors/{securityConnectorName}/devops/default/listAvailableGitHubOwners{?api%2Dversion}",
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
): Promise<GitHubOwnerListResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return gitHubOwnerListResponseDeserializer(result.body);
}

/** Returns a list of all GitHub owners accessible by the user token consumed by the connector. */
export async function listAvailable(
  context: Client,
  resourceGroupName: string,
  securityConnectorName: string,
  options: GitHubOwnersListAvailableOptionalParams = { requestOptions: {} },
): Promise<GitHubOwnerListResponse> {
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
  options: GitHubOwnersListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Security/securityConnectors/{securityConnectorName}/devops/default/gitHubOwners{?api%2Dversion}",
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
): Promise<GitHubOwnerListResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return gitHubOwnerListResponseDeserializer(result.body);
}

/** Returns a list of GitHub owners onboarded to the connector. */
export function list(
  context: Client,
  resourceGroupName: string,
  securityConnectorName: string,
  options: GitHubOwnersListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<GitHubOwner> {
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
  ownerName: string,
  options: GitHubOwnersGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Security/securityConnectors/{securityConnectorName}/devops/default/gitHubOwners/{ownerName}{?api%2Dversion}",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<GitHubOwner> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return gitHubOwnerDeserializer(result.body);
}

/** Returns a monitored GitHub owner. */
export async function get(
  context: Client,
  resourceGroupName: string,
  securityConnectorName: string,
  ownerName: string,
  options: GitHubOwnersGetOptionalParams = { requestOptions: {} },
): Promise<GitHubOwner> {
  const result = await _getSend(
    context,
    resourceGroupName,
    securityConnectorName,
    ownerName,
    options,
  );
  return _getDeserialize(result);
}

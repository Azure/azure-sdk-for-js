// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityInsightsContext as Client } from "../index.js";
import {
  cloudErrorDeserializer,
  RepositoryAccessProperties,
  repositoryAccessPropertiesSerializer,
  _RepoList,
  _repoListDeserializer,
  Repo,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import { SourceControlOperationsListRepositoriesOptionalParams } from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listRepositoriesSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  repositoryAccess: RepositoryAccessProperties,
  options: SourceControlOperationsListRepositoriesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/listRepositories{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      "api%2Dversion": context.apiVersion ?? "2025-07-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: repositoryAccessPropertiesSerializer(repositoryAccess),
    });
}

export async function _listRepositoriesDeserialize(
  result: PathUncheckedResponse,
): Promise<_RepoList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return _repoListDeserializer(result.body);
}

/** Gets a list of repositories metadata. */
export function listRepositories(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  repositoryAccess: RepositoryAccessProperties,
  options: SourceControlOperationsListRepositoriesOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Repo> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listRepositoriesSend(context, resourceGroupName, workspaceName, repositoryAccess, options),
    _listRepositoriesDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-07-01-preview",
    },
  );
}

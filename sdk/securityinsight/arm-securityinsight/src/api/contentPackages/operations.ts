// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityInsightsContext as Client } from "../index.js";
import type { PackageModel, _PackageList } from "../../models/models.js";
import {
  cloudErrorDeserializer,
  packageModelDeserializer,
  _packageListDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ContentPackagesListOptionalParams,
  ContentPackagesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  options: ContentPackagesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/contentPackages{?api%2Dversion,%24filter,%24orderby,%24search,%24count,%24top,%24skip,%24skipToken}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      "api%2Dversion": context.apiVersion ?? "2025-07-01-preview",
      "%24filter": options?.filter,
      "%24orderby": options?.orderby,
      "%24search": options?.search,
      "%24count": options?.count,
      "%24top": options?.top,
      "%24skip": options?.skip,
      "%24skipToken": options?.skipToken,
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

export async function _listDeserialize(result: PathUncheckedResponse): Promise<_PackageList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _packageListDeserializer(result.body);
}

/** Gets all installed packages. */
export function list(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  options: ContentPackagesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<PackageModel> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, workspaceName, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-07-01-preview",
    },
  );
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  packageId: string,
  options: ContentPackagesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/contentPackages/{packageId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      packageId: packageId,
      "api%2Dversion": context.apiVersion ?? "2025-07-01-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<PackageModel> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return packageModelDeserializer(result.body);
}

/** Gets an installed packages by its id. */
export async function get(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  packageId: string,
  options: ContentPackagesGetOptionalParams = { requestOptions: {} },
): Promise<PackageModel> {
  const result = await _getSend(context, resourceGroupName, workspaceName, packageId, options);
  return _getDeserialize(result);
}

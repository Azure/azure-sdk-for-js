// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ChaosManagementContext as Client } from "../index.js";
import type { WorkspaceDiscovery, _WorkspaceDiscoveryListResult } from "../../models/models.js";
import {
  errorResponseDeserializer,
  workspaceDiscoveryDeserializer,
  _workspaceDiscoveryListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  WorkspaceDiscoveriesListOptionalParams,
  WorkspaceDiscoveriesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  options: WorkspaceDiscoveriesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Chaos/workspaces/{workspaceName}/discoveries{?api%2Dversion,continuationToken}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      "api%2Dversion": context.apiVersion ?? "2026-11-01",
      continuationToken: options?.continuationToken,
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
): Promise<_WorkspaceDiscoveryListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _workspaceDiscoveryListResultDeserializer(result.body);
}

/** Lists retained discovery results under the workspace. Each result has its canonical ID; latest is an alias and is not a separate collection entry. This operation does not extend result retention. */
export function list(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  options: WorkspaceDiscoveriesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<WorkspaceDiscovery> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, workspaceName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2026-11-01" },
  );
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  discoveryName: string,
  options: WorkspaceDiscoveriesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Chaos/workspaces/{workspaceName}/discoveries/{discoveryName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      discoveryName: discoveryName,
      "api%2Dversion": context.apiVersion ?? "2026-11-01",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<WorkspaceDiscovery> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return workspaceDiscoveryDeserializer(result.body);
}

/** Gets a retained discovery result by its ID, or uses latest to select the most recently durably admitted discovery. Returns 200 with the current representation while processing or terminal. A Failed result can contain errors without a snapshot. Returns 404 if no qualifying retained result exists. This is not an LRO polling endpoint. */
export async function get(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  discoveryName: string,
  options: WorkspaceDiscoveriesGetOptionalParams = { requestOptions: {} },
): Promise<WorkspaceDiscovery> {
  const result = await _getSend(context, resourceGroupName, workspaceName, discoveryName, options);
  return _getDeserialize(result);
}

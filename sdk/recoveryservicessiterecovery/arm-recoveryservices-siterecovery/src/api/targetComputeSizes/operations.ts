// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SiteRecoveryManagementContext as Client } from "../index.js";
import type { _TargetComputeSizeCollection, TargetComputeSize } from "../../models/models.js";
import { _targetComputeSizeCollectionDeserializer } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { TargetComputeSizesListByReplicationProtectedItemsOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listByReplicationProtectedItemsSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  protectionContainerName: string,
  replicatedProtectedItemName: string,
  options: TargetComputeSizesListByReplicationProtectedItemsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationProtectionContainers/{protectionContainerName}/replicationProtectedItems/{replicatedProtectedItemName}/targetComputeSizes{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      fabricName: fabricName,
      protectionContainerName: protectionContainerName,
      replicatedProtectedItemName: replicatedProtectedItemName,
      "api%2Dversion": context.apiVersion ?? "2025-08-01",
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

export async function _listByReplicationProtectedItemsDeserialize(
  result: PathUncheckedResponse,
): Promise<_TargetComputeSizeCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _targetComputeSizeCollectionDeserializer(result.body);
}

/** Lists the available target compute sizes for a replication protected item. */
export function listByReplicationProtectedItems(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  protectionContainerName: string,
  replicatedProtectedItemName: string,
  options: TargetComputeSizesListByReplicationProtectedItemsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<TargetComputeSize> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listByReplicationProtectedItemsSend(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        replicatedProtectedItemName,
        options,
      ),
    _listByReplicationProtectedItemsDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-08-01" },
  );
}

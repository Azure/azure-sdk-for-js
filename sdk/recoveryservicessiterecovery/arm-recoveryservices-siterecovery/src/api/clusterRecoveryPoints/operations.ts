// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SiteRecoveryManagementContext as Client } from "../index.js";
import type { _ClusterRecoveryPointCollection, ClusterRecoveryPoint } from "../../models/models.js";
import {
  errorResponseDeserializer,
  _clusterRecoveryPointCollectionDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { ClusterRecoveryPointsListByReplicationProtectionClusterOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listByReplicationProtectionClusterSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  protectionContainerName: string,
  replicationProtectionClusterName: string,
  options: ClusterRecoveryPointsListByReplicationProtectionClusterOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationProtectionContainers/{protectionContainerName}/replicationProtectionClusters/{replicationProtectionClusterName}/recoveryPoints{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      fabricName: fabricName,
      protectionContainerName: protectionContainerName,
      replicationProtectionClusterName: replicationProtectionClusterName,
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

export async function _listByReplicationProtectionClusterDeserialize(
  result: PathUncheckedResponse,
): Promise<_ClusterRecoveryPointCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _clusterRecoveryPointCollectionDeserializer(result.body);
}

/** The list of cluster recovery points. */
export function listByReplicationProtectionCluster(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  protectionContainerName: string,
  replicationProtectionClusterName: string,
  options: ClusterRecoveryPointsListByReplicationProtectionClusterOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<ClusterRecoveryPoint> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listByReplicationProtectionClusterSend(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        replicationProtectionClusterName,
        options,
      ),
    _listByReplicationProtectionClusterDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-08-01" },
  );
}

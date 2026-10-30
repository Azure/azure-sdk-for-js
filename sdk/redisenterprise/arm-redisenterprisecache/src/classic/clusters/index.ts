// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RedisEnterpriseManagementContext } from "../../api/redisEnterpriseManagementContext.js";
import { unlinkMigratedEndpoint } from "../../api/clusters/operations.js";
import type { ClustersUnlinkMigratedEndpointOptionalParams } from "../../api/clusters/options.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Clusters operations. */
export interface ClustersOperations {
  /** Unlinks the migrated endpoint from an Azure Managed Redis cluster that was migrated from Azure Cache for Redis Enterprise, removing the source cache endpoint that was redirected to this cluster during migration. */
  unlinkMigratedEndpoint: (
    resourceGroupName: string,
    clusterName: string,
    options?: ClustersUnlinkMigratedEndpointOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use unlinkMigratedEndpoint instead */
  beginUnlinkMigratedEndpoint: (
    resourceGroupName: string,
    clusterName: string,
    options?: ClustersUnlinkMigratedEndpointOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use unlinkMigratedEndpoint instead */
  beginUnlinkMigratedEndpointAndWait: (
    resourceGroupName: string,
    clusterName: string,
    options?: ClustersUnlinkMigratedEndpointOptionalParams,
  ) => Promise<void>;
}

function _getClusters(context: RedisEnterpriseManagementContext) {
  return {
    unlinkMigratedEndpoint: (
      resourceGroupName: string,
      clusterName: string,
      options?: ClustersUnlinkMigratedEndpointOptionalParams,
    ) => unlinkMigratedEndpoint(context, resourceGroupName, clusterName, options),
    beginUnlinkMigratedEndpoint: async (
      resourceGroupName: string,
      clusterName: string,
      options?: ClustersUnlinkMigratedEndpointOptionalParams,
    ) => {
      const poller = unlinkMigratedEndpoint(context, resourceGroupName, clusterName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUnlinkMigratedEndpointAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      options?: ClustersUnlinkMigratedEndpointOptionalParams,
    ) => {
      return await unlinkMigratedEndpoint(context, resourceGroupName, clusterName, options);
    },
  };
}

export function _getClustersOperations(
  context: RedisEnterpriseManagementContext,
): ClustersOperations {
  return {
    ..._getClusters(context),
  };
}

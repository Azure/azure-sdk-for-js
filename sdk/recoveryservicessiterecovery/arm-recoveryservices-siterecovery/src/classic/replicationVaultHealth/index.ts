// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SiteRecoveryManagementContext } from "../../api/siteRecoveryManagementContext.js";
import { refresh, get } from "../../api/replicationVaultHealth/operations.js";
import {
  ReplicationVaultHealthRefreshOptionalParams,
  ReplicationVaultHealthGetOptionalParams,
} from "../../api/replicationVaultHealth/options.js";
import { VaultHealthDetails } from "../../models/models.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ReplicationVaultHealth operations. */
export interface ReplicationVaultHealthOperations {
  /** Refreshes health summary of the vault. */
  refresh: (
    resourceGroupName: string,
    resourceName: string,
    options?: ReplicationVaultHealthRefreshOptionalParams,
  ) => PollerLike<OperationState<VaultHealthDetails>, VaultHealthDetails>;
  /** @deprecated use refresh instead */
  beginRefresh: (
    resourceGroupName: string,
    resourceName: string,
    options?: ReplicationVaultHealthRefreshOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<VaultHealthDetails>, VaultHealthDetails>>;
  /** @deprecated use refresh instead */
  beginRefreshAndWait: (
    resourceGroupName: string,
    resourceName: string,
    options?: ReplicationVaultHealthRefreshOptionalParams,
  ) => Promise<VaultHealthDetails>;
  /** Gets the health details of the vault. */
  get: (
    resourceGroupName: string,
    resourceName: string,
    options?: ReplicationVaultHealthGetOptionalParams,
  ) => Promise<VaultHealthDetails>;
}

function _getReplicationVaultHealth(context: SiteRecoveryManagementContext) {
  return {
    refresh: (
      resourceGroupName: string,
      resourceName: string,
      options?: ReplicationVaultHealthRefreshOptionalParams,
    ) => refresh(context, resourceGroupName, resourceName, options),
    beginRefresh: async (
      resourceGroupName: string,
      resourceName: string,
      options?: ReplicationVaultHealthRefreshOptionalParams,
    ) => {
      const poller = refresh(context, resourceGroupName, resourceName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginRefreshAndWait: async (
      resourceGroupName: string,
      resourceName: string,
      options?: ReplicationVaultHealthRefreshOptionalParams,
    ) => {
      return await refresh(context, resourceGroupName, resourceName, options);
    },
    get: (
      resourceGroupName: string,
      resourceName: string,
      options?: ReplicationVaultHealthGetOptionalParams,
    ) => get(context, resourceGroupName, resourceName, options),
  };
}

export function _getReplicationVaultHealthOperations(
  context: SiteRecoveryManagementContext,
): ReplicationVaultHealthOperations {
  return {
    ..._getReplicationVaultHealth(context),
  };
}

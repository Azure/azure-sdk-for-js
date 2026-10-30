// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SiteRecoveryManagementContext } from "../../api/siteRecoveryManagementContext.js";
import { list, create, get } from "../../api/replicationVaultSetting/operations.js";
import type {
  ReplicationVaultSettingListOptionalParams,
  ReplicationVaultSettingCreateOptionalParams,
  ReplicationVaultSettingGetOptionalParams,
} from "../../api/replicationVaultSetting/options.js";
import type { VaultSetting, VaultSettingCreationInput } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ReplicationVaultSetting operations. */
export interface ReplicationVaultSettingOperations {
  /** Gets the list of vault setting. This includes the Migration Hub connection settings. */
  list: (
    resourceGroupName: string,
    resourceName: string,
    options?: ReplicationVaultSettingListOptionalParams,
  ) => PagedAsyncIterableIterator<VaultSetting>;
  /** The operation to configure vault setting. */
  create: (
    resourceGroupName: string,
    resourceName: string,
    vaultSettingName: string,
    input: VaultSettingCreationInput,
    options?: ReplicationVaultSettingCreateOptionalParams,
  ) => PollerLike<OperationState<VaultSetting>, VaultSetting>;
  /** @deprecated use create instead */
  beginCreate: (
    resourceGroupName: string,
    resourceName: string,
    vaultSettingName: string,
    input: VaultSettingCreationInput,
    options?: ReplicationVaultSettingCreateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<VaultSetting>, VaultSetting>>;
  /** @deprecated use create instead */
  beginCreateAndWait: (
    resourceGroupName: string,
    resourceName: string,
    vaultSettingName: string,
    input: VaultSettingCreationInput,
    options?: ReplicationVaultSettingCreateOptionalParams,
  ) => Promise<VaultSetting>;
  /** Gets the vault setting. This includes the Migration Hub connection settings. */
  get: (
    resourceGroupName: string,
    resourceName: string,
    vaultSettingName: string,
    options?: ReplicationVaultSettingGetOptionalParams,
  ) => Promise<VaultSetting>;
}

function _getReplicationVaultSetting(context: SiteRecoveryManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      resourceName: string,
      options?: ReplicationVaultSettingListOptionalParams,
    ) => list(context, resourceGroupName, resourceName, options),
    create: (
      resourceGroupName: string,
      resourceName: string,
      vaultSettingName: string,
      input: VaultSettingCreationInput,
      options?: ReplicationVaultSettingCreateOptionalParams,
    ) => create(context, resourceGroupName, resourceName, vaultSettingName, input, options),
    beginCreate: async (
      resourceGroupName: string,
      resourceName: string,
      vaultSettingName: string,
      input: VaultSettingCreationInput,
      options?: ReplicationVaultSettingCreateOptionalParams,
    ) => {
      const poller = create(
        context,
        resourceGroupName,
        resourceName,
        vaultSettingName,
        input,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateAndWait: async (
      resourceGroupName: string,
      resourceName: string,
      vaultSettingName: string,
      input: VaultSettingCreationInput,
      options?: ReplicationVaultSettingCreateOptionalParams,
    ) => {
      return await create(
        context,
        resourceGroupName,
        resourceName,
        vaultSettingName,
        input,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      resourceName: string,
      vaultSettingName: string,
      options?: ReplicationVaultSettingGetOptionalParams,
    ) => get(context, resourceGroupName, resourceName, vaultSettingName, options),
  };
}

export function _getReplicationVaultSettingOperations(
  context: SiteRecoveryManagementContext,
): ReplicationVaultSettingOperations {
  return {
    ..._getReplicationVaultSetting(context),
  };
}

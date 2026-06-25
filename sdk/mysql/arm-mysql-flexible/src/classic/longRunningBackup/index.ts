// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MySQLManagementFlexibleServerContext } from "../../api/mySQLManagementFlexibleServerContext.js";
import { $delete, create } from "../../api/longRunningBackup/operations.js";
import {
  LongRunningBackupDeleteOptionalParams,
  LongRunningBackupCreateOptionalParams,
} from "../../api/longRunningBackup/options.js";
import { ServerBackupV2 } from "../../models/models.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a LongRunningBackup operations. */
export interface LongRunningBackupOperations {
  /** Delete backup for a given server with specified backup name */
  delete: (
    resourceGroupName: string,
    serverName: string,
    backupName: string,
    options?: LongRunningBackupDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    serverName: string,
    backupName: string,
    options?: LongRunningBackupDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    serverName: string,
    backupName: string,
    options?: LongRunningBackupDeleteOptionalParams,
  ) => Promise<void>;
  /** Create backup for a given server with specified backup name. */
  create: (
    resourceGroupName: string,
    serverName: string,
    backupName: string,
    options?: LongRunningBackupCreateOptionalParams,
  ) => PollerLike<OperationState<ServerBackupV2>, ServerBackupV2>;
  /** @deprecated use create instead */
  beginCreate: (
    resourceGroupName: string,
    serverName: string,
    backupName: string,
    options?: LongRunningBackupCreateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<ServerBackupV2>, ServerBackupV2>>;
  /** @deprecated use create instead */
  beginCreateAndWait: (
    resourceGroupName: string,
    serverName: string,
    backupName: string,
    options?: LongRunningBackupCreateOptionalParams,
  ) => Promise<ServerBackupV2>;
}

function _getLongRunningBackup(context: MySQLManagementFlexibleServerContext) {
  return {
    delete: (
      resourceGroupName: string,
      serverName: string,
      backupName: string,
      options?: LongRunningBackupDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, serverName, backupName, options),
    beginDelete: async (
      resourceGroupName: string,
      serverName: string,
      backupName: string,
      options?: LongRunningBackupDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, serverName, backupName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      serverName: string,
      backupName: string,
      options?: LongRunningBackupDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, serverName, backupName, options);
    },
    create: (
      resourceGroupName: string,
      serverName: string,
      backupName: string,
      options?: LongRunningBackupCreateOptionalParams,
    ) => create(context, resourceGroupName, serverName, backupName, options),
    beginCreate: async (
      resourceGroupName: string,
      serverName: string,
      backupName: string,
      options?: LongRunningBackupCreateOptionalParams,
    ) => {
      const poller = create(context, resourceGroupName, serverName, backupName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateAndWait: async (
      resourceGroupName: string,
      serverName: string,
      backupName: string,
      options?: LongRunningBackupCreateOptionalParams,
    ) => {
      return await create(context, resourceGroupName, serverName, backupName, options);
    },
  };
}

export function _getLongRunningBackupOperations(
  context: MySQLManagementFlexibleServerContext,
): LongRunningBackupOperations {
  return {
    ..._getLongRunningBackup(context),
  };
}

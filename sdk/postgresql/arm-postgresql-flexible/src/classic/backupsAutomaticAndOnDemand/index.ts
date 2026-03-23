// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PostgreSQLManagementFlexibleServerContext } from "../../api/postgreSQLManagementFlexibleServerContext.js";
import {
  listByServer,
  $delete,
  create,
  get,
} from "../../api/backupsAutomaticAndOnDemand/operations.js";
import type {
  BackupsAutomaticAndOnDemandListByServerOptionalParams,
  BackupsAutomaticAndOnDemandDeleteOptionalParams,
  BackupsAutomaticAndOnDemandCreateOptionalParams,
  BackupsAutomaticAndOnDemandGetOptionalParams,
} from "../../api/backupsAutomaticAndOnDemand/options.js";
import type { BackupAutomaticAndOnDemand } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a BackupsAutomaticAndOnDemand operations. */
export interface BackupsAutomaticAndOnDemandOperations {
  /** Lists all available backups of a server. */
  listByServer: (
    resourceGroupName: string,
    serverName: string,
    options?: BackupsAutomaticAndOnDemandListByServerOptionalParams,
  ) => PagedAsyncIterableIterator<BackupAutomaticAndOnDemand>;
  /** Deletes a specific backup, given its name. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    serverName: string,
    backupName: string,
    options?: BackupsAutomaticAndOnDemandDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    serverName: string,
    backupName: string,
    options?: BackupsAutomaticAndOnDemandDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    serverName: string,
    backupName: string,
    options?: BackupsAutomaticAndOnDemandDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates an on demand backup of a server. */
  create: (
    resourceGroupName: string,
    serverName: string,
    backupName: string,
    options?: BackupsAutomaticAndOnDemandCreateOptionalParams,
  ) => PollerLike<OperationState<BackupAutomaticAndOnDemand>, BackupAutomaticAndOnDemand>;
  /** @deprecated use create instead */
  beginCreate: (
    resourceGroupName: string,
    serverName: string,
    backupName: string,
    options?: BackupsAutomaticAndOnDemandCreateOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<BackupAutomaticAndOnDemand>, BackupAutomaticAndOnDemand>
  >;
  /** @deprecated use create instead */
  beginCreateAndWait: (
    resourceGroupName: string,
    serverName: string,
    backupName: string,
    options?: BackupsAutomaticAndOnDemandCreateOptionalParams,
  ) => Promise<BackupAutomaticAndOnDemand>;
  /** Gets information of an on demand backup, given its name. */
  get: (
    resourceGroupName: string,
    serverName: string,
    backupName: string,
    options?: BackupsAutomaticAndOnDemandGetOptionalParams,
  ) => Promise<BackupAutomaticAndOnDemand>;
}

function _getBackupsAutomaticAndOnDemand(context: PostgreSQLManagementFlexibleServerContext) {
  return {
    listByServer: (
      resourceGroupName: string,
      serverName: string,
      options?: BackupsAutomaticAndOnDemandListByServerOptionalParams,
    ) => listByServer(context, resourceGroupName, serverName, options),
    delete: (
      resourceGroupName: string,
      serverName: string,
      backupName: string,
      options?: BackupsAutomaticAndOnDemandDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, serverName, backupName, options),
    beginDelete: async (
      resourceGroupName: string,
      serverName: string,
      backupName: string,
      options?: BackupsAutomaticAndOnDemandDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, serverName, backupName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      serverName: string,
      backupName: string,
      options?: BackupsAutomaticAndOnDemandDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, serverName, backupName, options);
    },
    create: (
      resourceGroupName: string,
      serverName: string,
      backupName: string,
      options?: BackupsAutomaticAndOnDemandCreateOptionalParams,
    ) => create(context, resourceGroupName, serverName, backupName, options),
    beginCreate: async (
      resourceGroupName: string,
      serverName: string,
      backupName: string,
      options?: BackupsAutomaticAndOnDemandCreateOptionalParams,
    ) => {
      const poller = create(context, resourceGroupName, serverName, backupName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateAndWait: async (
      resourceGroupName: string,
      serverName: string,
      backupName: string,
      options?: BackupsAutomaticAndOnDemandCreateOptionalParams,
    ) => {
      return await create(context, resourceGroupName, serverName, backupName, options);
    },
    get: (
      resourceGroupName: string,
      serverName: string,
      backupName: string,
      options?: BackupsAutomaticAndOnDemandGetOptionalParams,
    ) => get(context, resourceGroupName, serverName, backupName, options),
  };
}

export function _getBackupsAutomaticAndOnDemandOperations(
  context: PostgreSQLManagementFlexibleServerContext,
): BackupsAutomaticAndOnDemandOperations {
  return {
    ..._getBackupsAutomaticAndOnDemand(context),
  };
}

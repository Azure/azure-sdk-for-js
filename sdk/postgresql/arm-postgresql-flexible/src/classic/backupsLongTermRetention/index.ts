// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PostgreSQLManagementFlexibleServerContext } from "../../api/postgreSQLManagementFlexibleServerContext.js";
import {
  listByServer,
  get,
  start,
  checkPrerequisites,
} from "../../api/backupsLongTermRetention/operations.js";
import type {
  BackupsLongTermRetentionListByServerOptionalParams,
  BackupsLongTermRetentionGetOptionalParams,
  BackupsLongTermRetentionStartOptionalParams,
  BackupsLongTermRetentionCheckPrerequisitesOptionalParams,
} from "../../api/backupsLongTermRetention/options.js";
import type {
  LtrPreBackupRequest,
  LtrPreBackupResponse,
  BackupsLongTermRetentionRequest,
  BackupsLongTermRetentionResponse,
  BackupsLongTermRetentionOperation,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a BackupsLongTermRetention operations. */
export interface BackupsLongTermRetentionOperations {
  /** Lists the results of the long term retention backup operations for a server. */
  listByServer: (
    resourceGroupName: string,
    serverName: string,
    options?: BackupsLongTermRetentionListByServerOptionalParams,
  ) => PagedAsyncIterableIterator<BackupsLongTermRetentionOperation>;
  /** Gets the results of a long retention backup operation for a server. */
  get: (
    resourceGroupName: string,
    serverName: string,
    backupName: string,
    options?: BackupsLongTermRetentionGetOptionalParams,
  ) => Promise<BackupsLongTermRetentionOperation>;
  /** Initiates a long term retention backup. */
  start: (
    resourceGroupName: string,
    serverName: string,
    parameters: BackupsLongTermRetentionRequest,
    options?: BackupsLongTermRetentionStartOptionalParams,
  ) => PollerLike<
    OperationState<BackupsLongTermRetentionResponse>,
    BackupsLongTermRetentionResponse
  >;
  /** Performs all checks required for a long term retention backup operation to succeed. */
  checkPrerequisites: (
    resourceGroupName: string,
    serverName: string,
    parameters: LtrPreBackupRequest,
    options?: BackupsLongTermRetentionCheckPrerequisitesOptionalParams,
  ) => Promise<LtrPreBackupResponse>;
}

function _getBackupsLongTermRetention(context: PostgreSQLManagementFlexibleServerContext) {
  return {
    listByServer: (
      resourceGroupName: string,
      serverName: string,
      options?: BackupsLongTermRetentionListByServerOptionalParams,
    ) => listByServer(context, resourceGroupName, serverName, options),
    get: (
      resourceGroupName: string,
      serverName: string,
      backupName: string,
      options?: BackupsLongTermRetentionGetOptionalParams,
    ) => get(context, resourceGroupName, serverName, backupName, options),
    start: (
      resourceGroupName: string,
      serverName: string,
      parameters: BackupsLongTermRetentionRequest,
      options?: BackupsLongTermRetentionStartOptionalParams,
    ) => start(context, resourceGroupName, serverName, parameters, options),
    checkPrerequisites: (
      resourceGroupName: string,
      serverName: string,
      parameters: LtrPreBackupRequest,
      options?: BackupsLongTermRetentionCheckPrerequisitesOptionalParams,
    ) => checkPrerequisites(context, resourceGroupName, serverName, parameters, options),
  };
}

export function _getBackupsLongTermRetentionOperations(
  context: PostgreSQLManagementFlexibleServerContext,
): BackupsLongTermRetentionOperations {
  return {
    ..._getBackupsLongTermRetention(context),
  };
}

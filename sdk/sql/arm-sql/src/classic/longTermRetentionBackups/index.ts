// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlContext } from "../../api/sqlContext.js";
import {
  listByResourceGroupServer,
  listByResourceGroupLocation,
  listByServer,
  listByLocation,
  updateByResourceGroup,
  setLegalHoldImmutabilityByResourceGroup,
  removeTimeBasedImmutabilityByResourceGroup,
  removeLegalHoldImmutabilityByResourceGroup,
  lockTimeBasedImmutabilityByResourceGroup,
  copyByResourceGroup,
  changeAccessTierByResourceGroup,
  listByResourceGroupDatabase,
  deleteByResourceGroup,
  getByResourceGroup,
  update,
  setLegalHoldImmutability,
  removeTimeBasedImmutability,
  removeLegalHoldImmutability,
  lockTimeBasedImmutability,
  copy,
  changeAccessTier,
  listByDatabase,
  $delete,
  get,
} from "../../api/longTermRetentionBackups/operations.js";
import type {
  LongTermRetentionBackupsListByResourceGroupServerOptionalParams,
  LongTermRetentionBackupsListByResourceGroupLocationOptionalParams,
  LongTermRetentionBackupsListByServerOptionalParams,
  LongTermRetentionBackupsListByLocationOptionalParams,
  LongTermRetentionBackupsUpdateByResourceGroupOptionalParams,
  LongTermRetentionBackupsSetLegalHoldImmutabilityByResourceGroupOptionalParams,
  LongTermRetentionBackupsRemoveTimeBasedImmutabilityByResourceGroupOptionalParams,
  LongTermRetentionBackupsRemoveLegalHoldImmutabilityByResourceGroupOptionalParams,
  LongTermRetentionBackupsLockTimeBasedImmutabilityByResourceGroupOptionalParams,
  LongTermRetentionBackupsCopyByResourceGroupOptionalParams,
  LongTermRetentionBackupsChangeAccessTierByResourceGroupOptionalParams,
  LongTermRetentionBackupsListByResourceGroupDatabaseOptionalParams,
  LongTermRetentionBackupsDeleteByResourceGroupOptionalParams,
  LongTermRetentionBackupsGetByResourceGroupOptionalParams,
  LongTermRetentionBackupsUpdateOptionalParams,
  LongTermRetentionBackupsSetLegalHoldImmutabilityOptionalParams,
  LongTermRetentionBackupsRemoveTimeBasedImmutabilityOptionalParams,
  LongTermRetentionBackupsRemoveLegalHoldImmutabilityOptionalParams,
  LongTermRetentionBackupsLockTimeBasedImmutabilityOptionalParams,
  LongTermRetentionBackupsCopyOptionalParams,
  LongTermRetentionBackupsChangeAccessTierOptionalParams,
  LongTermRetentionBackupsListByDatabaseOptionalParams,
  LongTermRetentionBackupsDeleteOptionalParams,
  LongTermRetentionBackupsGetOptionalParams,
} from "../../api/longTermRetentionBackups/options.js";
import type {
  LongTermRetentionBackup,
  ChangeLongTermRetentionBackupAccessTierParameters,
  CopyLongTermRetentionBackupParameters,
  LongTermRetentionBackupOperationResult,
  UpdateLongTermRetentionBackupParameters,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a LongTermRetentionBackups operations. */
export interface LongTermRetentionBackupsOperations {
  /** Lists the long term retention backups for a given server based on resource groups. */
  listByResourceGroupServer: (
    resourceGroupName: string,
    locationName: string,
    longTermRetentionServerName: string,
    options?: LongTermRetentionBackupsListByResourceGroupServerOptionalParams,
  ) => PagedAsyncIterableIterator<LongTermRetentionBackup>;
  /** Lists the long term retention backups for a given location based on resource group. */
  listByResourceGroupLocation: (
    resourceGroupName: string,
    locationName: string,
    options?: LongTermRetentionBackupsListByResourceGroupLocationOptionalParams,
  ) => PagedAsyncIterableIterator<LongTermRetentionBackup>;
  /** Lists the long term retention backups for a given server. */
  listByServer: (
    locationName: string,
    longTermRetentionServerName: string,
    options?: LongTermRetentionBackupsListByServerOptionalParams,
  ) => PagedAsyncIterableIterator<LongTermRetentionBackup>;
  /** Lists the long term retention backups for a given location. */
  listByLocation: (
    locationName: string,
    options?: LongTermRetentionBackupsListByLocationOptionalParams,
  ) => PagedAsyncIterableIterator<LongTermRetentionBackup>;
  /** Updates an existing long term retention backup. */
  updateByResourceGroup: (
    resourceGroupName: string,
    locationName: string,
    longTermRetentionServerName: string,
    longTermRetentionDatabaseName: string,
    backupName: string,
    parameters: UpdateLongTermRetentionBackupParameters,
    options?: LongTermRetentionBackupsUpdateByResourceGroupOptionalParams,
  ) => PollerLike<
    OperationState<LongTermRetentionBackupOperationResult>,
    LongTermRetentionBackupOperationResult
  >;
  /** @deprecated use updateByResourceGroup instead */
  beginUpdateByResourceGroup: (
    resourceGroupName: string,
    locationName: string,
    longTermRetentionServerName: string,
    longTermRetentionDatabaseName: string,
    backupName: string,
    parameters: UpdateLongTermRetentionBackupParameters,
    options?: LongTermRetentionBackupsUpdateByResourceGroupOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<LongTermRetentionBackupOperationResult>,
      LongTermRetentionBackupOperationResult
    >
  >;
  /** @deprecated use updateByResourceGroup instead */
  beginUpdateByResourceGroupAndWait: (
    resourceGroupName: string,
    locationName: string,
    longTermRetentionServerName: string,
    longTermRetentionDatabaseName: string,
    backupName: string,
    parameters: UpdateLongTermRetentionBackupParameters,
    options?: LongTermRetentionBackupsUpdateByResourceGroupOptionalParams,
  ) => Promise<LongTermRetentionBackupOperationResult>;
  /** Set legal hold immutability of an existing long term retention backup. */
  setLegalHoldImmutabilityByResourceGroup: (
    resourceGroupName: string,
    locationName: string,
    longTermRetentionServerName: string,
    longTermRetentionDatabaseName: string,
    backupName: string,
    options?: LongTermRetentionBackupsSetLegalHoldImmutabilityByResourceGroupOptionalParams,
  ) => PollerLike<OperationState<LongTermRetentionBackup>, LongTermRetentionBackup>;
  /** @deprecated use setLegalHoldImmutabilityByResourceGroup instead */
  beginSetLegalHoldImmutabilityByResourceGroup: (
    resourceGroupName: string,
    locationName: string,
    longTermRetentionServerName: string,
    longTermRetentionDatabaseName: string,
    backupName: string,
    options?: LongTermRetentionBackupsSetLegalHoldImmutabilityByResourceGroupOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<LongTermRetentionBackup>, LongTermRetentionBackup>>;
  /** @deprecated use setLegalHoldImmutabilityByResourceGroup instead */
  beginSetLegalHoldImmutabilityByResourceGroupAndWait: (
    resourceGroupName: string,
    locationName: string,
    longTermRetentionServerName: string,
    longTermRetentionDatabaseName: string,
    backupName: string,
    options?: LongTermRetentionBackupsSetLegalHoldImmutabilityByResourceGroupOptionalParams,
  ) => Promise<LongTermRetentionBackup>;
  /** Remove time based immutability of an existing long term retention backup. */
  removeTimeBasedImmutabilityByResourceGroup: (
    resourceGroupName: string,
    locationName: string,
    longTermRetentionServerName: string,
    longTermRetentionDatabaseName: string,
    backupName: string,
    options?: LongTermRetentionBackupsRemoveTimeBasedImmutabilityByResourceGroupOptionalParams,
  ) => PollerLike<OperationState<LongTermRetentionBackup>, LongTermRetentionBackup>;
  /** @deprecated use removeTimeBasedImmutabilityByResourceGroup instead */
  beginRemoveTimeBasedImmutabilityByResourceGroup: (
    resourceGroupName: string,
    locationName: string,
    longTermRetentionServerName: string,
    longTermRetentionDatabaseName: string,
    backupName: string,
    options?: LongTermRetentionBackupsRemoveTimeBasedImmutabilityByResourceGroupOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<LongTermRetentionBackup>, LongTermRetentionBackup>>;
  /** @deprecated use removeTimeBasedImmutabilityByResourceGroup instead */
  beginRemoveTimeBasedImmutabilityByResourceGroupAndWait: (
    resourceGroupName: string,
    locationName: string,
    longTermRetentionServerName: string,
    longTermRetentionDatabaseName: string,
    backupName: string,
    options?: LongTermRetentionBackupsRemoveTimeBasedImmutabilityByResourceGroupOptionalParams,
  ) => Promise<LongTermRetentionBackup>;
  /** Remove legal hold immutability of an existing long term retention backup. */
  removeLegalHoldImmutabilityByResourceGroup: (
    resourceGroupName: string,
    locationName: string,
    longTermRetentionServerName: string,
    longTermRetentionDatabaseName: string,
    backupName: string,
    options?: LongTermRetentionBackupsRemoveLegalHoldImmutabilityByResourceGroupOptionalParams,
  ) => PollerLike<OperationState<LongTermRetentionBackup>, LongTermRetentionBackup>;
  /** @deprecated use removeLegalHoldImmutabilityByResourceGroup instead */
  beginRemoveLegalHoldImmutabilityByResourceGroup: (
    resourceGroupName: string,
    locationName: string,
    longTermRetentionServerName: string,
    longTermRetentionDatabaseName: string,
    backupName: string,
    options?: LongTermRetentionBackupsRemoveLegalHoldImmutabilityByResourceGroupOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<LongTermRetentionBackup>, LongTermRetentionBackup>>;
  /** @deprecated use removeLegalHoldImmutabilityByResourceGroup instead */
  beginRemoveLegalHoldImmutabilityByResourceGroupAndWait: (
    resourceGroupName: string,
    locationName: string,
    longTermRetentionServerName: string,
    longTermRetentionDatabaseName: string,
    backupName: string,
    options?: LongTermRetentionBackupsRemoveLegalHoldImmutabilityByResourceGroupOptionalParams,
  ) => Promise<LongTermRetentionBackup>;
  /** Lock time based immutability of an existing long term retention backup. */
  lockTimeBasedImmutabilityByResourceGroup: (
    resourceGroupName: string,
    locationName: string,
    longTermRetentionServerName: string,
    longTermRetentionDatabaseName: string,
    backupName: string,
    options?: LongTermRetentionBackupsLockTimeBasedImmutabilityByResourceGroupOptionalParams,
  ) => PollerLike<OperationState<LongTermRetentionBackup>, LongTermRetentionBackup>;
  /** @deprecated use lockTimeBasedImmutabilityByResourceGroup instead */
  beginLockTimeBasedImmutabilityByResourceGroup: (
    resourceGroupName: string,
    locationName: string,
    longTermRetentionServerName: string,
    longTermRetentionDatabaseName: string,
    backupName: string,
    options?: LongTermRetentionBackupsLockTimeBasedImmutabilityByResourceGroupOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<LongTermRetentionBackup>, LongTermRetentionBackup>>;
  /** @deprecated use lockTimeBasedImmutabilityByResourceGroup instead */
  beginLockTimeBasedImmutabilityByResourceGroupAndWait: (
    resourceGroupName: string,
    locationName: string,
    longTermRetentionServerName: string,
    longTermRetentionDatabaseName: string,
    backupName: string,
    options?: LongTermRetentionBackupsLockTimeBasedImmutabilityByResourceGroupOptionalParams,
  ) => Promise<LongTermRetentionBackup>;
  /** Copy an existing long term retention backup to a different server. */
  copyByResourceGroup: (
    resourceGroupName: string,
    locationName: string,
    longTermRetentionServerName: string,
    longTermRetentionDatabaseName: string,
    backupName: string,
    parameters: CopyLongTermRetentionBackupParameters,
    options?: LongTermRetentionBackupsCopyByResourceGroupOptionalParams,
  ) => PollerLike<
    OperationState<LongTermRetentionBackupOperationResult>,
    LongTermRetentionBackupOperationResult
  >;
  /** @deprecated use copyByResourceGroup instead */
  beginCopyByResourceGroup: (
    resourceGroupName: string,
    locationName: string,
    longTermRetentionServerName: string,
    longTermRetentionDatabaseName: string,
    backupName: string,
    parameters: CopyLongTermRetentionBackupParameters,
    options?: LongTermRetentionBackupsCopyByResourceGroupOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<LongTermRetentionBackupOperationResult>,
      LongTermRetentionBackupOperationResult
    >
  >;
  /** @deprecated use copyByResourceGroup instead */
  beginCopyByResourceGroupAndWait: (
    resourceGroupName: string,
    locationName: string,
    longTermRetentionServerName: string,
    longTermRetentionDatabaseName: string,
    backupName: string,
    parameters: CopyLongTermRetentionBackupParameters,
    options?: LongTermRetentionBackupsCopyByResourceGroupOptionalParams,
  ) => Promise<LongTermRetentionBackupOperationResult>;
  /** Change a long term retention backup access tier. */
  changeAccessTierByResourceGroup: (
    resourceGroupName: string,
    locationName: string,
    longTermRetentionServerName: string,
    longTermRetentionDatabaseName: string,
    backupName: string,
    parameters: ChangeLongTermRetentionBackupAccessTierParameters,
    options?: LongTermRetentionBackupsChangeAccessTierByResourceGroupOptionalParams,
  ) => PollerLike<OperationState<LongTermRetentionBackup>, LongTermRetentionBackup>;
  /** @deprecated use changeAccessTierByResourceGroup instead */
  beginChangeAccessTierByResourceGroup: (
    resourceGroupName: string,
    locationName: string,
    longTermRetentionServerName: string,
    longTermRetentionDatabaseName: string,
    backupName: string,
    parameters: ChangeLongTermRetentionBackupAccessTierParameters,
    options?: LongTermRetentionBackupsChangeAccessTierByResourceGroupOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<LongTermRetentionBackup>, LongTermRetentionBackup>>;
  /** @deprecated use changeAccessTierByResourceGroup instead */
  beginChangeAccessTierByResourceGroupAndWait: (
    resourceGroupName: string,
    locationName: string,
    longTermRetentionServerName: string,
    longTermRetentionDatabaseName: string,
    backupName: string,
    parameters: ChangeLongTermRetentionBackupAccessTierParameters,
    options?: LongTermRetentionBackupsChangeAccessTierByResourceGroupOptionalParams,
  ) => Promise<LongTermRetentionBackup>;
  /** Lists all long term retention backups for a database based on a particular resource group. */
  listByResourceGroupDatabase: (
    resourceGroupName: string,
    locationName: string,
    longTermRetentionServerName: string,
    longTermRetentionDatabaseName: string,
    options?: LongTermRetentionBackupsListByResourceGroupDatabaseOptionalParams,
  ) => PagedAsyncIterableIterator<LongTermRetentionBackup>;
  /** Deletes a long term retention backup. */
  deleteByResourceGroup: (
    resourceGroupName: string,
    locationName: string,
    longTermRetentionServerName: string,
    longTermRetentionDatabaseName: string,
    backupName: string,
    options?: LongTermRetentionBackupsDeleteByResourceGroupOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use deleteByResourceGroup instead */
  beginDeleteByResourceGroup: (
    resourceGroupName: string,
    locationName: string,
    longTermRetentionServerName: string,
    longTermRetentionDatabaseName: string,
    backupName: string,
    options?: LongTermRetentionBackupsDeleteByResourceGroupOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use deleteByResourceGroup instead */
  beginDeleteByResourceGroupAndWait: (
    resourceGroupName: string,
    locationName: string,
    longTermRetentionServerName: string,
    longTermRetentionDatabaseName: string,
    backupName: string,
    options?: LongTermRetentionBackupsDeleteByResourceGroupOptionalParams,
  ) => Promise<void>;
  /** Gets a long term retention backup. */
  getByResourceGroup: (
    resourceGroupName: string,
    locationName: string,
    longTermRetentionServerName: string,
    longTermRetentionDatabaseName: string,
    backupName: string,
    options?: LongTermRetentionBackupsGetByResourceGroupOptionalParams,
  ) => Promise<LongTermRetentionBackup>;
  /** Updates an existing long term retention backup. */
  update: (
    locationName: string,
    longTermRetentionServerName: string,
    longTermRetentionDatabaseName: string,
    backupName: string,
    parameters: UpdateLongTermRetentionBackupParameters,
    options?: LongTermRetentionBackupsUpdateOptionalParams,
  ) => PollerLike<
    OperationState<LongTermRetentionBackupOperationResult>,
    LongTermRetentionBackupOperationResult
  >;
  /** @deprecated use update instead */
  beginUpdate: (
    locationName: string,
    longTermRetentionServerName: string,
    longTermRetentionDatabaseName: string,
    backupName: string,
    parameters: UpdateLongTermRetentionBackupParameters,
    options?: LongTermRetentionBackupsUpdateOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<LongTermRetentionBackupOperationResult>,
      LongTermRetentionBackupOperationResult
    >
  >;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    locationName: string,
    longTermRetentionServerName: string,
    longTermRetentionDatabaseName: string,
    backupName: string,
    parameters: UpdateLongTermRetentionBackupParameters,
    options?: LongTermRetentionBackupsUpdateOptionalParams,
  ) => Promise<LongTermRetentionBackupOperationResult>;
  /** Set legal hold immutability of an existing long term retention backup. */
  setLegalHoldImmutability: (
    locationName: string,
    longTermRetentionServerName: string,
    longTermRetentionDatabaseName: string,
    backupName: string,
    options?: LongTermRetentionBackupsSetLegalHoldImmutabilityOptionalParams,
  ) => PollerLike<OperationState<LongTermRetentionBackup>, LongTermRetentionBackup>;
  /** @deprecated use setLegalHoldImmutability instead */
  beginSetLegalHoldImmutability: (
    locationName: string,
    longTermRetentionServerName: string,
    longTermRetentionDatabaseName: string,
    backupName: string,
    options?: LongTermRetentionBackupsSetLegalHoldImmutabilityOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<LongTermRetentionBackup>, LongTermRetentionBackup>>;
  /** @deprecated use setLegalHoldImmutability instead */
  beginSetLegalHoldImmutabilityAndWait: (
    locationName: string,
    longTermRetentionServerName: string,
    longTermRetentionDatabaseName: string,
    backupName: string,
    options?: LongTermRetentionBackupsSetLegalHoldImmutabilityOptionalParams,
  ) => Promise<LongTermRetentionBackup>;
  /** Remove time based immutability of an existing long term retention backup. */
  removeTimeBasedImmutability: (
    locationName: string,
    longTermRetentionServerName: string,
    longTermRetentionDatabaseName: string,
    backupName: string,
    options?: LongTermRetentionBackupsRemoveTimeBasedImmutabilityOptionalParams,
  ) => PollerLike<OperationState<LongTermRetentionBackup>, LongTermRetentionBackup>;
  /** @deprecated use removeTimeBasedImmutability instead */
  beginRemoveTimeBasedImmutability: (
    locationName: string,
    longTermRetentionServerName: string,
    longTermRetentionDatabaseName: string,
    backupName: string,
    options?: LongTermRetentionBackupsRemoveTimeBasedImmutabilityOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<LongTermRetentionBackup>, LongTermRetentionBackup>>;
  /** @deprecated use removeTimeBasedImmutability instead */
  beginRemoveTimeBasedImmutabilityAndWait: (
    locationName: string,
    longTermRetentionServerName: string,
    longTermRetentionDatabaseName: string,
    backupName: string,
    options?: LongTermRetentionBackupsRemoveTimeBasedImmutabilityOptionalParams,
  ) => Promise<LongTermRetentionBackup>;
  /** Remove legal hold immutability of an existing long term retention backup. */
  removeLegalHoldImmutability: (
    locationName: string,
    longTermRetentionServerName: string,
    longTermRetentionDatabaseName: string,
    backupName: string,
    options?: LongTermRetentionBackupsRemoveLegalHoldImmutabilityOptionalParams,
  ) => PollerLike<OperationState<LongTermRetentionBackup>, LongTermRetentionBackup>;
  /** @deprecated use removeLegalHoldImmutability instead */
  beginRemoveLegalHoldImmutability: (
    locationName: string,
    longTermRetentionServerName: string,
    longTermRetentionDatabaseName: string,
    backupName: string,
    options?: LongTermRetentionBackupsRemoveLegalHoldImmutabilityOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<LongTermRetentionBackup>, LongTermRetentionBackup>>;
  /** @deprecated use removeLegalHoldImmutability instead */
  beginRemoveLegalHoldImmutabilityAndWait: (
    locationName: string,
    longTermRetentionServerName: string,
    longTermRetentionDatabaseName: string,
    backupName: string,
    options?: LongTermRetentionBackupsRemoveLegalHoldImmutabilityOptionalParams,
  ) => Promise<LongTermRetentionBackup>;
  /** Lock time based immutability of an existing long term retention backup. */
  lockTimeBasedImmutability: (
    locationName: string,
    longTermRetentionServerName: string,
    longTermRetentionDatabaseName: string,
    backupName: string,
    options?: LongTermRetentionBackupsLockTimeBasedImmutabilityOptionalParams,
  ) => PollerLike<OperationState<LongTermRetentionBackup>, LongTermRetentionBackup>;
  /** @deprecated use lockTimeBasedImmutability instead */
  beginLockTimeBasedImmutability: (
    locationName: string,
    longTermRetentionServerName: string,
    longTermRetentionDatabaseName: string,
    backupName: string,
    options?: LongTermRetentionBackupsLockTimeBasedImmutabilityOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<LongTermRetentionBackup>, LongTermRetentionBackup>>;
  /** @deprecated use lockTimeBasedImmutability instead */
  beginLockTimeBasedImmutabilityAndWait: (
    locationName: string,
    longTermRetentionServerName: string,
    longTermRetentionDatabaseName: string,
    backupName: string,
    options?: LongTermRetentionBackupsLockTimeBasedImmutabilityOptionalParams,
  ) => Promise<LongTermRetentionBackup>;
  /** Copy an existing long term retention backup. */
  copy: (
    locationName: string,
    longTermRetentionServerName: string,
    longTermRetentionDatabaseName: string,
    backupName: string,
    parameters: CopyLongTermRetentionBackupParameters,
    options?: LongTermRetentionBackupsCopyOptionalParams,
  ) => PollerLike<
    OperationState<LongTermRetentionBackupOperationResult>,
    LongTermRetentionBackupOperationResult
  >;
  /** @deprecated use copy instead */
  beginCopy: (
    locationName: string,
    longTermRetentionServerName: string,
    longTermRetentionDatabaseName: string,
    backupName: string,
    parameters: CopyLongTermRetentionBackupParameters,
    options?: LongTermRetentionBackupsCopyOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<LongTermRetentionBackupOperationResult>,
      LongTermRetentionBackupOperationResult
    >
  >;
  /** @deprecated use copy instead */
  beginCopyAndWait: (
    locationName: string,
    longTermRetentionServerName: string,
    longTermRetentionDatabaseName: string,
    backupName: string,
    parameters: CopyLongTermRetentionBackupParameters,
    options?: LongTermRetentionBackupsCopyOptionalParams,
  ) => Promise<LongTermRetentionBackupOperationResult>;
  /** Change a long term retention backup access tier. */
  changeAccessTier: (
    locationName: string,
    longTermRetentionServerName: string,
    longTermRetentionDatabaseName: string,
    backupName: string,
    parameters: ChangeLongTermRetentionBackupAccessTierParameters,
    options?: LongTermRetentionBackupsChangeAccessTierOptionalParams,
  ) => PollerLike<OperationState<LongTermRetentionBackup>, LongTermRetentionBackup>;
  /** @deprecated use changeAccessTier instead */
  beginChangeAccessTier: (
    locationName: string,
    longTermRetentionServerName: string,
    longTermRetentionDatabaseName: string,
    backupName: string,
    parameters: ChangeLongTermRetentionBackupAccessTierParameters,
    options?: LongTermRetentionBackupsChangeAccessTierOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<LongTermRetentionBackup>, LongTermRetentionBackup>>;
  /** @deprecated use changeAccessTier instead */
  beginChangeAccessTierAndWait: (
    locationName: string,
    longTermRetentionServerName: string,
    longTermRetentionDatabaseName: string,
    backupName: string,
    parameters: ChangeLongTermRetentionBackupAccessTierParameters,
    options?: LongTermRetentionBackupsChangeAccessTierOptionalParams,
  ) => Promise<LongTermRetentionBackup>;
  /** Lists all long term retention backups for a database. */
  listByDatabase: (
    locationName: string,
    longTermRetentionServerName: string,
    longTermRetentionDatabaseName: string,
    options?: LongTermRetentionBackupsListByDatabaseOptionalParams,
  ) => PagedAsyncIterableIterator<LongTermRetentionBackup>;
  /** Deletes a long term retention backup. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    locationName: string,
    longTermRetentionServerName: string,
    longTermRetentionDatabaseName: string,
    backupName: string,
    options?: LongTermRetentionBackupsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    locationName: string,
    longTermRetentionServerName: string,
    longTermRetentionDatabaseName: string,
    backupName: string,
    options?: LongTermRetentionBackupsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    locationName: string,
    longTermRetentionServerName: string,
    longTermRetentionDatabaseName: string,
    backupName: string,
    options?: LongTermRetentionBackupsDeleteOptionalParams,
  ) => Promise<void>;
  /** Gets a long term retention backup. */
  get: (
    locationName: string,
    longTermRetentionServerName: string,
    longTermRetentionDatabaseName: string,
    backupName: string,
    options?: LongTermRetentionBackupsGetOptionalParams,
  ) => Promise<LongTermRetentionBackup>;
}

function _getLongTermRetentionBackups(context: SqlContext) {
  return {
    listByResourceGroupServer: (
      resourceGroupName: string,
      locationName: string,
      longTermRetentionServerName: string,
      options?: LongTermRetentionBackupsListByResourceGroupServerOptionalParams,
    ) =>
      listByResourceGroupServer(
        context,
        resourceGroupName,
        locationName,
        longTermRetentionServerName,
        options,
      ),
    listByResourceGroupLocation: (
      resourceGroupName: string,
      locationName: string,
      options?: LongTermRetentionBackupsListByResourceGroupLocationOptionalParams,
    ) => listByResourceGroupLocation(context, resourceGroupName, locationName, options),
    listByServer: (
      locationName: string,
      longTermRetentionServerName: string,
      options?: LongTermRetentionBackupsListByServerOptionalParams,
    ) => listByServer(context, locationName, longTermRetentionServerName, options),
    listByLocation: (
      locationName: string,
      options?: LongTermRetentionBackupsListByLocationOptionalParams,
    ) => listByLocation(context, locationName, options),
    updateByResourceGroup: (
      resourceGroupName: string,
      locationName: string,
      longTermRetentionServerName: string,
      longTermRetentionDatabaseName: string,
      backupName: string,
      parameters: UpdateLongTermRetentionBackupParameters,
      options?: LongTermRetentionBackupsUpdateByResourceGroupOptionalParams,
    ) =>
      updateByResourceGroup(
        context,
        resourceGroupName,
        locationName,
        longTermRetentionServerName,
        longTermRetentionDatabaseName,
        backupName,
        parameters,
        options,
      ),
    beginUpdateByResourceGroup: async (
      resourceGroupName: string,
      locationName: string,
      longTermRetentionServerName: string,
      longTermRetentionDatabaseName: string,
      backupName: string,
      parameters: UpdateLongTermRetentionBackupParameters,
      options?: LongTermRetentionBackupsUpdateByResourceGroupOptionalParams,
    ) => {
      const poller = updateByResourceGroup(
        context,
        resourceGroupName,
        locationName,
        longTermRetentionServerName,
        longTermRetentionDatabaseName,
        backupName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateByResourceGroupAndWait: async (
      resourceGroupName: string,
      locationName: string,
      longTermRetentionServerName: string,
      longTermRetentionDatabaseName: string,
      backupName: string,
      parameters: UpdateLongTermRetentionBackupParameters,
      options?: LongTermRetentionBackupsUpdateByResourceGroupOptionalParams,
    ) => {
      return await updateByResourceGroup(
        context,
        resourceGroupName,
        locationName,
        longTermRetentionServerName,
        longTermRetentionDatabaseName,
        backupName,
        parameters,
        options,
      );
    },
    setLegalHoldImmutabilityByResourceGroup: (
      resourceGroupName: string,
      locationName: string,
      longTermRetentionServerName: string,
      longTermRetentionDatabaseName: string,
      backupName: string,
      options?: LongTermRetentionBackupsSetLegalHoldImmutabilityByResourceGroupOptionalParams,
    ) =>
      setLegalHoldImmutabilityByResourceGroup(
        context,
        resourceGroupName,
        locationName,
        longTermRetentionServerName,
        longTermRetentionDatabaseName,
        backupName,
        options,
      ),
    beginSetLegalHoldImmutabilityByResourceGroup: async (
      resourceGroupName: string,
      locationName: string,
      longTermRetentionServerName: string,
      longTermRetentionDatabaseName: string,
      backupName: string,
      options?: LongTermRetentionBackupsSetLegalHoldImmutabilityByResourceGroupOptionalParams,
    ) => {
      const poller = setLegalHoldImmutabilityByResourceGroup(
        context,
        resourceGroupName,
        locationName,
        longTermRetentionServerName,
        longTermRetentionDatabaseName,
        backupName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginSetLegalHoldImmutabilityByResourceGroupAndWait: async (
      resourceGroupName: string,
      locationName: string,
      longTermRetentionServerName: string,
      longTermRetentionDatabaseName: string,
      backupName: string,
      options?: LongTermRetentionBackupsSetLegalHoldImmutabilityByResourceGroupOptionalParams,
    ) => {
      return await setLegalHoldImmutabilityByResourceGroup(
        context,
        resourceGroupName,
        locationName,
        longTermRetentionServerName,
        longTermRetentionDatabaseName,
        backupName,
        options,
      );
    },
    removeTimeBasedImmutabilityByResourceGroup: (
      resourceGroupName: string,
      locationName: string,
      longTermRetentionServerName: string,
      longTermRetentionDatabaseName: string,
      backupName: string,
      options?: LongTermRetentionBackupsRemoveTimeBasedImmutabilityByResourceGroupOptionalParams,
    ) =>
      removeTimeBasedImmutabilityByResourceGroup(
        context,
        resourceGroupName,
        locationName,
        longTermRetentionServerName,
        longTermRetentionDatabaseName,
        backupName,
        options,
      ),
    beginRemoveTimeBasedImmutabilityByResourceGroup: async (
      resourceGroupName: string,
      locationName: string,
      longTermRetentionServerName: string,
      longTermRetentionDatabaseName: string,
      backupName: string,
      options?: LongTermRetentionBackupsRemoveTimeBasedImmutabilityByResourceGroupOptionalParams,
    ) => {
      const poller = removeTimeBasedImmutabilityByResourceGroup(
        context,
        resourceGroupName,
        locationName,
        longTermRetentionServerName,
        longTermRetentionDatabaseName,
        backupName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginRemoveTimeBasedImmutabilityByResourceGroupAndWait: async (
      resourceGroupName: string,
      locationName: string,
      longTermRetentionServerName: string,
      longTermRetentionDatabaseName: string,
      backupName: string,
      options?: LongTermRetentionBackupsRemoveTimeBasedImmutabilityByResourceGroupOptionalParams,
    ) => {
      return await removeTimeBasedImmutabilityByResourceGroup(
        context,
        resourceGroupName,
        locationName,
        longTermRetentionServerName,
        longTermRetentionDatabaseName,
        backupName,
        options,
      );
    },
    removeLegalHoldImmutabilityByResourceGroup: (
      resourceGroupName: string,
      locationName: string,
      longTermRetentionServerName: string,
      longTermRetentionDatabaseName: string,
      backupName: string,
      options?: LongTermRetentionBackupsRemoveLegalHoldImmutabilityByResourceGroupOptionalParams,
    ) =>
      removeLegalHoldImmutabilityByResourceGroup(
        context,
        resourceGroupName,
        locationName,
        longTermRetentionServerName,
        longTermRetentionDatabaseName,
        backupName,
        options,
      ),
    beginRemoveLegalHoldImmutabilityByResourceGroup: async (
      resourceGroupName: string,
      locationName: string,
      longTermRetentionServerName: string,
      longTermRetentionDatabaseName: string,
      backupName: string,
      options?: LongTermRetentionBackupsRemoveLegalHoldImmutabilityByResourceGroupOptionalParams,
    ) => {
      const poller = removeLegalHoldImmutabilityByResourceGroup(
        context,
        resourceGroupName,
        locationName,
        longTermRetentionServerName,
        longTermRetentionDatabaseName,
        backupName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginRemoveLegalHoldImmutabilityByResourceGroupAndWait: async (
      resourceGroupName: string,
      locationName: string,
      longTermRetentionServerName: string,
      longTermRetentionDatabaseName: string,
      backupName: string,
      options?: LongTermRetentionBackupsRemoveLegalHoldImmutabilityByResourceGroupOptionalParams,
    ) => {
      return await removeLegalHoldImmutabilityByResourceGroup(
        context,
        resourceGroupName,
        locationName,
        longTermRetentionServerName,
        longTermRetentionDatabaseName,
        backupName,
        options,
      );
    },
    lockTimeBasedImmutabilityByResourceGroup: (
      resourceGroupName: string,
      locationName: string,
      longTermRetentionServerName: string,
      longTermRetentionDatabaseName: string,
      backupName: string,
      options?: LongTermRetentionBackupsLockTimeBasedImmutabilityByResourceGroupOptionalParams,
    ) =>
      lockTimeBasedImmutabilityByResourceGroup(
        context,
        resourceGroupName,
        locationName,
        longTermRetentionServerName,
        longTermRetentionDatabaseName,
        backupName,
        options,
      ),
    beginLockTimeBasedImmutabilityByResourceGroup: async (
      resourceGroupName: string,
      locationName: string,
      longTermRetentionServerName: string,
      longTermRetentionDatabaseName: string,
      backupName: string,
      options?: LongTermRetentionBackupsLockTimeBasedImmutabilityByResourceGroupOptionalParams,
    ) => {
      const poller = lockTimeBasedImmutabilityByResourceGroup(
        context,
        resourceGroupName,
        locationName,
        longTermRetentionServerName,
        longTermRetentionDatabaseName,
        backupName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginLockTimeBasedImmutabilityByResourceGroupAndWait: async (
      resourceGroupName: string,
      locationName: string,
      longTermRetentionServerName: string,
      longTermRetentionDatabaseName: string,
      backupName: string,
      options?: LongTermRetentionBackupsLockTimeBasedImmutabilityByResourceGroupOptionalParams,
    ) => {
      return await lockTimeBasedImmutabilityByResourceGroup(
        context,
        resourceGroupName,
        locationName,
        longTermRetentionServerName,
        longTermRetentionDatabaseName,
        backupName,
        options,
      );
    },
    copyByResourceGroup: (
      resourceGroupName: string,
      locationName: string,
      longTermRetentionServerName: string,
      longTermRetentionDatabaseName: string,
      backupName: string,
      parameters: CopyLongTermRetentionBackupParameters,
      options?: LongTermRetentionBackupsCopyByResourceGroupOptionalParams,
    ) =>
      copyByResourceGroup(
        context,
        resourceGroupName,
        locationName,
        longTermRetentionServerName,
        longTermRetentionDatabaseName,
        backupName,
        parameters,
        options,
      ),
    beginCopyByResourceGroup: async (
      resourceGroupName: string,
      locationName: string,
      longTermRetentionServerName: string,
      longTermRetentionDatabaseName: string,
      backupName: string,
      parameters: CopyLongTermRetentionBackupParameters,
      options?: LongTermRetentionBackupsCopyByResourceGroupOptionalParams,
    ) => {
      const poller = copyByResourceGroup(
        context,
        resourceGroupName,
        locationName,
        longTermRetentionServerName,
        longTermRetentionDatabaseName,
        backupName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCopyByResourceGroupAndWait: async (
      resourceGroupName: string,
      locationName: string,
      longTermRetentionServerName: string,
      longTermRetentionDatabaseName: string,
      backupName: string,
      parameters: CopyLongTermRetentionBackupParameters,
      options?: LongTermRetentionBackupsCopyByResourceGroupOptionalParams,
    ) => {
      return await copyByResourceGroup(
        context,
        resourceGroupName,
        locationName,
        longTermRetentionServerName,
        longTermRetentionDatabaseName,
        backupName,
        parameters,
        options,
      );
    },
    changeAccessTierByResourceGroup: (
      resourceGroupName: string,
      locationName: string,
      longTermRetentionServerName: string,
      longTermRetentionDatabaseName: string,
      backupName: string,
      parameters: ChangeLongTermRetentionBackupAccessTierParameters,
      options?: LongTermRetentionBackupsChangeAccessTierByResourceGroupOptionalParams,
    ) =>
      changeAccessTierByResourceGroup(
        context,
        resourceGroupName,
        locationName,
        longTermRetentionServerName,
        longTermRetentionDatabaseName,
        backupName,
        parameters,
        options,
      ),
    beginChangeAccessTierByResourceGroup: async (
      resourceGroupName: string,
      locationName: string,
      longTermRetentionServerName: string,
      longTermRetentionDatabaseName: string,
      backupName: string,
      parameters: ChangeLongTermRetentionBackupAccessTierParameters,
      options?: LongTermRetentionBackupsChangeAccessTierByResourceGroupOptionalParams,
    ) => {
      const poller = changeAccessTierByResourceGroup(
        context,
        resourceGroupName,
        locationName,
        longTermRetentionServerName,
        longTermRetentionDatabaseName,
        backupName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginChangeAccessTierByResourceGroupAndWait: async (
      resourceGroupName: string,
      locationName: string,
      longTermRetentionServerName: string,
      longTermRetentionDatabaseName: string,
      backupName: string,
      parameters: ChangeLongTermRetentionBackupAccessTierParameters,
      options?: LongTermRetentionBackupsChangeAccessTierByResourceGroupOptionalParams,
    ) => {
      return await changeAccessTierByResourceGroup(
        context,
        resourceGroupName,
        locationName,
        longTermRetentionServerName,
        longTermRetentionDatabaseName,
        backupName,
        parameters,
        options,
      );
    },
    listByResourceGroupDatabase: (
      resourceGroupName: string,
      locationName: string,
      longTermRetentionServerName: string,
      longTermRetentionDatabaseName: string,
      options?: LongTermRetentionBackupsListByResourceGroupDatabaseOptionalParams,
    ) =>
      listByResourceGroupDatabase(
        context,
        resourceGroupName,
        locationName,
        longTermRetentionServerName,
        longTermRetentionDatabaseName,
        options,
      ),
    deleteByResourceGroup: (
      resourceGroupName: string,
      locationName: string,
      longTermRetentionServerName: string,
      longTermRetentionDatabaseName: string,
      backupName: string,
      options?: LongTermRetentionBackupsDeleteByResourceGroupOptionalParams,
    ) =>
      deleteByResourceGroup(
        context,
        resourceGroupName,
        locationName,
        longTermRetentionServerName,
        longTermRetentionDatabaseName,
        backupName,
        options,
      ),
    beginDeleteByResourceGroup: async (
      resourceGroupName: string,
      locationName: string,
      longTermRetentionServerName: string,
      longTermRetentionDatabaseName: string,
      backupName: string,
      options?: LongTermRetentionBackupsDeleteByResourceGroupOptionalParams,
    ) => {
      const poller = deleteByResourceGroup(
        context,
        resourceGroupName,
        locationName,
        longTermRetentionServerName,
        longTermRetentionDatabaseName,
        backupName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteByResourceGroupAndWait: async (
      resourceGroupName: string,
      locationName: string,
      longTermRetentionServerName: string,
      longTermRetentionDatabaseName: string,
      backupName: string,
      options?: LongTermRetentionBackupsDeleteByResourceGroupOptionalParams,
    ) => {
      return await deleteByResourceGroup(
        context,
        resourceGroupName,
        locationName,
        longTermRetentionServerName,
        longTermRetentionDatabaseName,
        backupName,
        options,
      );
    },
    getByResourceGroup: (
      resourceGroupName: string,
      locationName: string,
      longTermRetentionServerName: string,
      longTermRetentionDatabaseName: string,
      backupName: string,
      options?: LongTermRetentionBackupsGetByResourceGroupOptionalParams,
    ) =>
      getByResourceGroup(
        context,
        resourceGroupName,
        locationName,
        longTermRetentionServerName,
        longTermRetentionDatabaseName,
        backupName,
        options,
      ),
    update: (
      locationName: string,
      longTermRetentionServerName: string,
      longTermRetentionDatabaseName: string,
      backupName: string,
      parameters: UpdateLongTermRetentionBackupParameters,
      options?: LongTermRetentionBackupsUpdateOptionalParams,
    ) =>
      update(
        context,
        locationName,
        longTermRetentionServerName,
        longTermRetentionDatabaseName,
        backupName,
        parameters,
        options,
      ),
    beginUpdate: async (
      locationName: string,
      longTermRetentionServerName: string,
      longTermRetentionDatabaseName: string,
      backupName: string,
      parameters: UpdateLongTermRetentionBackupParameters,
      options?: LongTermRetentionBackupsUpdateOptionalParams,
    ) => {
      const poller = update(
        context,
        locationName,
        longTermRetentionServerName,
        longTermRetentionDatabaseName,
        backupName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      locationName: string,
      longTermRetentionServerName: string,
      longTermRetentionDatabaseName: string,
      backupName: string,
      parameters: UpdateLongTermRetentionBackupParameters,
      options?: LongTermRetentionBackupsUpdateOptionalParams,
    ) => {
      return await update(
        context,
        locationName,
        longTermRetentionServerName,
        longTermRetentionDatabaseName,
        backupName,
        parameters,
        options,
      );
    },
    setLegalHoldImmutability: (
      locationName: string,
      longTermRetentionServerName: string,
      longTermRetentionDatabaseName: string,
      backupName: string,
      options?: LongTermRetentionBackupsSetLegalHoldImmutabilityOptionalParams,
    ) =>
      setLegalHoldImmutability(
        context,
        locationName,
        longTermRetentionServerName,
        longTermRetentionDatabaseName,
        backupName,
        options,
      ),
    beginSetLegalHoldImmutability: async (
      locationName: string,
      longTermRetentionServerName: string,
      longTermRetentionDatabaseName: string,
      backupName: string,
      options?: LongTermRetentionBackupsSetLegalHoldImmutabilityOptionalParams,
    ) => {
      const poller = setLegalHoldImmutability(
        context,
        locationName,
        longTermRetentionServerName,
        longTermRetentionDatabaseName,
        backupName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginSetLegalHoldImmutabilityAndWait: async (
      locationName: string,
      longTermRetentionServerName: string,
      longTermRetentionDatabaseName: string,
      backupName: string,
      options?: LongTermRetentionBackupsSetLegalHoldImmutabilityOptionalParams,
    ) => {
      return await setLegalHoldImmutability(
        context,
        locationName,
        longTermRetentionServerName,
        longTermRetentionDatabaseName,
        backupName,
        options,
      );
    },
    removeTimeBasedImmutability: (
      locationName: string,
      longTermRetentionServerName: string,
      longTermRetentionDatabaseName: string,
      backupName: string,
      options?: LongTermRetentionBackupsRemoveTimeBasedImmutabilityOptionalParams,
    ) =>
      removeTimeBasedImmutability(
        context,
        locationName,
        longTermRetentionServerName,
        longTermRetentionDatabaseName,
        backupName,
        options,
      ),
    beginRemoveTimeBasedImmutability: async (
      locationName: string,
      longTermRetentionServerName: string,
      longTermRetentionDatabaseName: string,
      backupName: string,
      options?: LongTermRetentionBackupsRemoveTimeBasedImmutabilityOptionalParams,
    ) => {
      const poller = removeTimeBasedImmutability(
        context,
        locationName,
        longTermRetentionServerName,
        longTermRetentionDatabaseName,
        backupName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginRemoveTimeBasedImmutabilityAndWait: async (
      locationName: string,
      longTermRetentionServerName: string,
      longTermRetentionDatabaseName: string,
      backupName: string,
      options?: LongTermRetentionBackupsRemoveTimeBasedImmutabilityOptionalParams,
    ) => {
      return await removeTimeBasedImmutability(
        context,
        locationName,
        longTermRetentionServerName,
        longTermRetentionDatabaseName,
        backupName,
        options,
      );
    },
    removeLegalHoldImmutability: (
      locationName: string,
      longTermRetentionServerName: string,
      longTermRetentionDatabaseName: string,
      backupName: string,
      options?: LongTermRetentionBackupsRemoveLegalHoldImmutabilityOptionalParams,
    ) =>
      removeLegalHoldImmutability(
        context,
        locationName,
        longTermRetentionServerName,
        longTermRetentionDatabaseName,
        backupName,
        options,
      ),
    beginRemoveLegalHoldImmutability: async (
      locationName: string,
      longTermRetentionServerName: string,
      longTermRetentionDatabaseName: string,
      backupName: string,
      options?: LongTermRetentionBackupsRemoveLegalHoldImmutabilityOptionalParams,
    ) => {
      const poller = removeLegalHoldImmutability(
        context,
        locationName,
        longTermRetentionServerName,
        longTermRetentionDatabaseName,
        backupName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginRemoveLegalHoldImmutabilityAndWait: async (
      locationName: string,
      longTermRetentionServerName: string,
      longTermRetentionDatabaseName: string,
      backupName: string,
      options?: LongTermRetentionBackupsRemoveLegalHoldImmutabilityOptionalParams,
    ) => {
      return await removeLegalHoldImmutability(
        context,
        locationName,
        longTermRetentionServerName,
        longTermRetentionDatabaseName,
        backupName,
        options,
      );
    },
    lockTimeBasedImmutability: (
      locationName: string,
      longTermRetentionServerName: string,
      longTermRetentionDatabaseName: string,
      backupName: string,
      options?: LongTermRetentionBackupsLockTimeBasedImmutabilityOptionalParams,
    ) =>
      lockTimeBasedImmutability(
        context,
        locationName,
        longTermRetentionServerName,
        longTermRetentionDatabaseName,
        backupName,
        options,
      ),
    beginLockTimeBasedImmutability: async (
      locationName: string,
      longTermRetentionServerName: string,
      longTermRetentionDatabaseName: string,
      backupName: string,
      options?: LongTermRetentionBackupsLockTimeBasedImmutabilityOptionalParams,
    ) => {
      const poller = lockTimeBasedImmutability(
        context,
        locationName,
        longTermRetentionServerName,
        longTermRetentionDatabaseName,
        backupName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginLockTimeBasedImmutabilityAndWait: async (
      locationName: string,
      longTermRetentionServerName: string,
      longTermRetentionDatabaseName: string,
      backupName: string,
      options?: LongTermRetentionBackupsLockTimeBasedImmutabilityOptionalParams,
    ) => {
      return await lockTimeBasedImmutability(
        context,
        locationName,
        longTermRetentionServerName,
        longTermRetentionDatabaseName,
        backupName,
        options,
      );
    },
    copy: (
      locationName: string,
      longTermRetentionServerName: string,
      longTermRetentionDatabaseName: string,
      backupName: string,
      parameters: CopyLongTermRetentionBackupParameters,
      options?: LongTermRetentionBackupsCopyOptionalParams,
    ) =>
      copy(
        context,
        locationName,
        longTermRetentionServerName,
        longTermRetentionDatabaseName,
        backupName,
        parameters,
        options,
      ),
    beginCopy: async (
      locationName: string,
      longTermRetentionServerName: string,
      longTermRetentionDatabaseName: string,
      backupName: string,
      parameters: CopyLongTermRetentionBackupParameters,
      options?: LongTermRetentionBackupsCopyOptionalParams,
    ) => {
      const poller = copy(
        context,
        locationName,
        longTermRetentionServerName,
        longTermRetentionDatabaseName,
        backupName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCopyAndWait: async (
      locationName: string,
      longTermRetentionServerName: string,
      longTermRetentionDatabaseName: string,
      backupName: string,
      parameters: CopyLongTermRetentionBackupParameters,
      options?: LongTermRetentionBackupsCopyOptionalParams,
    ) => {
      return await copy(
        context,
        locationName,
        longTermRetentionServerName,
        longTermRetentionDatabaseName,
        backupName,
        parameters,
        options,
      );
    },
    changeAccessTier: (
      locationName: string,
      longTermRetentionServerName: string,
      longTermRetentionDatabaseName: string,
      backupName: string,
      parameters: ChangeLongTermRetentionBackupAccessTierParameters,
      options?: LongTermRetentionBackupsChangeAccessTierOptionalParams,
    ) =>
      changeAccessTier(
        context,
        locationName,
        longTermRetentionServerName,
        longTermRetentionDatabaseName,
        backupName,
        parameters,
        options,
      ),
    beginChangeAccessTier: async (
      locationName: string,
      longTermRetentionServerName: string,
      longTermRetentionDatabaseName: string,
      backupName: string,
      parameters: ChangeLongTermRetentionBackupAccessTierParameters,
      options?: LongTermRetentionBackupsChangeAccessTierOptionalParams,
    ) => {
      const poller = changeAccessTier(
        context,
        locationName,
        longTermRetentionServerName,
        longTermRetentionDatabaseName,
        backupName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginChangeAccessTierAndWait: async (
      locationName: string,
      longTermRetentionServerName: string,
      longTermRetentionDatabaseName: string,
      backupName: string,
      parameters: ChangeLongTermRetentionBackupAccessTierParameters,
      options?: LongTermRetentionBackupsChangeAccessTierOptionalParams,
    ) => {
      return await changeAccessTier(
        context,
        locationName,
        longTermRetentionServerName,
        longTermRetentionDatabaseName,
        backupName,
        parameters,
        options,
      );
    },
    listByDatabase: (
      locationName: string,
      longTermRetentionServerName: string,
      longTermRetentionDatabaseName: string,
      options?: LongTermRetentionBackupsListByDatabaseOptionalParams,
    ) =>
      listByDatabase(
        context,
        locationName,
        longTermRetentionServerName,
        longTermRetentionDatabaseName,
        options,
      ),
    delete: (
      locationName: string,
      longTermRetentionServerName: string,
      longTermRetentionDatabaseName: string,
      backupName: string,
      options?: LongTermRetentionBackupsDeleteOptionalParams,
    ) =>
      $delete(
        context,
        locationName,
        longTermRetentionServerName,
        longTermRetentionDatabaseName,
        backupName,
        options,
      ),
    beginDelete: async (
      locationName: string,
      longTermRetentionServerName: string,
      longTermRetentionDatabaseName: string,
      backupName: string,
      options?: LongTermRetentionBackupsDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        locationName,
        longTermRetentionServerName,
        longTermRetentionDatabaseName,
        backupName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      locationName: string,
      longTermRetentionServerName: string,
      longTermRetentionDatabaseName: string,
      backupName: string,
      options?: LongTermRetentionBackupsDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        locationName,
        longTermRetentionServerName,
        longTermRetentionDatabaseName,
        backupName,
        options,
      );
    },
    get: (
      locationName: string,
      longTermRetentionServerName: string,
      longTermRetentionDatabaseName: string,
      backupName: string,
      options?: LongTermRetentionBackupsGetOptionalParams,
    ) =>
      get(
        context,
        locationName,
        longTermRetentionServerName,
        longTermRetentionDatabaseName,
        backupName,
        options,
      ),
  };
}

export function _getLongTermRetentionBackupsOperations(
  context: SqlContext,
): LongTermRetentionBackupsOperations {
  return {
    ..._getLongTermRetentionBackups(context),
  };
}

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SiteRecoveryManagementContext } from "../../api/siteRecoveryManagementContext.js";
import {
  list,
  testMigrateCleanup,
  testMigrate,
  resync,
  resumeReplication,
  pauseReplication,
  migrate,
  listByReplicationProtectionContainers,
  $delete,
  update,
  create,
  get,
} from "../../api/replicationMigrationItems/operations.js";
import type {
  ReplicationMigrationItemsListOptionalParams,
  ReplicationMigrationItemsTestMigrateCleanupOptionalParams,
  ReplicationMigrationItemsTestMigrateOptionalParams,
  ReplicationMigrationItemsResyncOptionalParams,
  ReplicationMigrationItemsResumeReplicationOptionalParams,
  ReplicationMigrationItemsPauseReplicationOptionalParams,
  ReplicationMigrationItemsMigrateOptionalParams,
  ReplicationMigrationItemsListByReplicationProtectionContainersOptionalParams,
  ReplicationMigrationItemsDeleteOptionalParams,
  ReplicationMigrationItemsUpdateOptionalParams,
  ReplicationMigrationItemsCreateOptionalParams,
  ReplicationMigrationItemsGetOptionalParams,
} from "../../api/replicationMigrationItems/options.js";
import type {
  MigrationItem,
  EnableMigrationInput,
  UpdateMigrationItemInput,
  MigrateInput,
  PauseReplicationInput,
  ResumeReplicationInput,
  ResyncInput,
  TestMigrateInput,
  TestMigrateCleanupInput,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ReplicationMigrationItems operations. */
export interface ReplicationMigrationItemsOperations {
  /** Gets the list of migration items in the vault. */
  list: (
    resourceGroupName: string,
    resourceName: string,
    options?: ReplicationMigrationItemsListOptionalParams,
  ) => PagedAsyncIterableIterator<MigrationItem>;
  /** The operation to initiate test migrate cleanup. */
  testMigrateCleanup: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    migrationItemName: string,
    testMigrateCleanupInput: TestMigrateCleanupInput,
    options?: ReplicationMigrationItemsTestMigrateCleanupOptionalParams,
  ) => PollerLike<OperationState<MigrationItem>, MigrationItem>;
  /** @deprecated use testMigrateCleanup instead */
  beginTestMigrateCleanup: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    migrationItemName: string,
    testMigrateCleanupInput: TestMigrateCleanupInput,
    options?: ReplicationMigrationItemsTestMigrateCleanupOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<MigrationItem>, MigrationItem>>;
  /** @deprecated use testMigrateCleanup instead */
  beginTestMigrateCleanupAndWait: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    migrationItemName: string,
    testMigrateCleanupInput: TestMigrateCleanupInput,
    options?: ReplicationMigrationItemsTestMigrateCleanupOptionalParams,
  ) => Promise<MigrationItem>;
  /** The operation to initiate test migration of the item. */
  testMigrate: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    migrationItemName: string,
    testMigrateInput: TestMigrateInput,
    options?: ReplicationMigrationItemsTestMigrateOptionalParams,
  ) => PollerLike<OperationState<MigrationItem>, MigrationItem>;
  /** @deprecated use testMigrate instead */
  beginTestMigrate: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    migrationItemName: string,
    testMigrateInput: TestMigrateInput,
    options?: ReplicationMigrationItemsTestMigrateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<MigrationItem>, MigrationItem>>;
  /** @deprecated use testMigrate instead */
  beginTestMigrateAndWait: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    migrationItemName: string,
    testMigrateInput: TestMigrateInput,
    options?: ReplicationMigrationItemsTestMigrateOptionalParams,
  ) => Promise<MigrationItem>;
  /** The operation to resynchronize replication of an ASR migration item. */
  resync: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    migrationItemName: string,
    input: ResyncInput,
    options?: ReplicationMigrationItemsResyncOptionalParams,
  ) => PollerLike<OperationState<MigrationItem>, MigrationItem>;
  /** @deprecated use resync instead */
  beginResync: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    migrationItemName: string,
    input: ResyncInput,
    options?: ReplicationMigrationItemsResyncOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<MigrationItem>, MigrationItem>>;
  /** @deprecated use resync instead */
  beginResyncAndWait: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    migrationItemName: string,
    input: ResyncInput,
    options?: ReplicationMigrationItemsResyncOptionalParams,
  ) => Promise<MigrationItem>;
  /** The operation to initiate resume replication of the item. */
  resumeReplication: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    migrationItemName: string,
    resumeReplicationInput: ResumeReplicationInput,
    options?: ReplicationMigrationItemsResumeReplicationOptionalParams,
  ) => PollerLike<OperationState<MigrationItem>, MigrationItem>;
  /** @deprecated use resumeReplication instead */
  beginResumeReplication: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    migrationItemName: string,
    resumeReplicationInput: ResumeReplicationInput,
    options?: ReplicationMigrationItemsResumeReplicationOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<MigrationItem>, MigrationItem>>;
  /** @deprecated use resumeReplication instead */
  beginResumeReplicationAndWait: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    migrationItemName: string,
    resumeReplicationInput: ResumeReplicationInput,
    options?: ReplicationMigrationItemsResumeReplicationOptionalParams,
  ) => Promise<MigrationItem>;
  /** The operation to initiate pause replication of the item. */
  pauseReplication: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    migrationItemName: string,
    pauseReplicationInput: PauseReplicationInput,
    options?: ReplicationMigrationItemsPauseReplicationOptionalParams,
  ) => PollerLike<OperationState<MigrationItem>, MigrationItem>;
  /** @deprecated use pauseReplication instead */
  beginPauseReplication: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    migrationItemName: string,
    pauseReplicationInput: PauseReplicationInput,
    options?: ReplicationMigrationItemsPauseReplicationOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<MigrationItem>, MigrationItem>>;
  /** @deprecated use pauseReplication instead */
  beginPauseReplicationAndWait: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    migrationItemName: string,
    pauseReplicationInput: PauseReplicationInput,
    options?: ReplicationMigrationItemsPauseReplicationOptionalParams,
  ) => Promise<MigrationItem>;
  /** The operation to initiate migration of the item. */
  migrate: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    migrationItemName: string,
    migrateInput: MigrateInput,
    options?: ReplicationMigrationItemsMigrateOptionalParams,
  ) => PollerLike<OperationState<MigrationItem>, MigrationItem>;
  /** @deprecated use migrate instead */
  beginMigrate: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    migrationItemName: string,
    migrateInput: MigrateInput,
    options?: ReplicationMigrationItemsMigrateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<MigrationItem>, MigrationItem>>;
  /** @deprecated use migrate instead */
  beginMigrateAndWait: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    migrationItemName: string,
    migrateInput: MigrateInput,
    options?: ReplicationMigrationItemsMigrateOptionalParams,
  ) => Promise<MigrationItem>;
  /** Gets the list of ASR migration items in the protection container. */
  listByReplicationProtectionContainers: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    options?: ReplicationMigrationItemsListByReplicationProtectionContainersOptionalParams,
  ) => PagedAsyncIterableIterator<MigrationItem>;
  /** The operation to delete an ASR migration item. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    migrationItemName: string,
    options?: ReplicationMigrationItemsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    migrationItemName: string,
    options?: ReplicationMigrationItemsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    migrationItemName: string,
    options?: ReplicationMigrationItemsDeleteOptionalParams,
  ) => Promise<void>;
  /** The operation to update the recovery settings of an ASR migration item. */
  update: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    migrationItemName: string,
    input: UpdateMigrationItemInput,
    options?: ReplicationMigrationItemsUpdateOptionalParams,
  ) => PollerLike<OperationState<MigrationItem>, MigrationItem>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    migrationItemName: string,
    input: UpdateMigrationItemInput,
    options?: ReplicationMigrationItemsUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<MigrationItem>, MigrationItem>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    migrationItemName: string,
    input: UpdateMigrationItemInput,
    options?: ReplicationMigrationItemsUpdateOptionalParams,
  ) => Promise<MigrationItem>;
  /** The operation to create an ASR migration item (enable migration). */
  create: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    migrationItemName: string,
    input: EnableMigrationInput,
    options?: ReplicationMigrationItemsCreateOptionalParams,
  ) => PollerLike<OperationState<MigrationItem>, MigrationItem>;
  /** @deprecated use create instead */
  beginCreate: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    migrationItemName: string,
    input: EnableMigrationInput,
    options?: ReplicationMigrationItemsCreateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<MigrationItem>, MigrationItem>>;
  /** @deprecated use create instead */
  beginCreateAndWait: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    migrationItemName: string,
    input: EnableMigrationInput,
    options?: ReplicationMigrationItemsCreateOptionalParams,
  ) => Promise<MigrationItem>;
  /** Gets the details of a migration item. */
  get: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    migrationItemName: string,
    options?: ReplicationMigrationItemsGetOptionalParams,
  ) => Promise<MigrationItem>;
}

function _getReplicationMigrationItems(context: SiteRecoveryManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      resourceName: string,
      options?: ReplicationMigrationItemsListOptionalParams,
    ) => list(context, resourceGroupName, resourceName, options),
    testMigrateCleanup: (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      protectionContainerName: string,
      migrationItemName: string,
      testMigrateCleanupInput: TestMigrateCleanupInput,
      options?: ReplicationMigrationItemsTestMigrateCleanupOptionalParams,
    ) =>
      testMigrateCleanup(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        migrationItemName,
        testMigrateCleanupInput,
        options,
      ),
    beginTestMigrateCleanup: async (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      protectionContainerName: string,
      migrationItemName: string,
      testMigrateCleanupInput: TestMigrateCleanupInput,
      options?: ReplicationMigrationItemsTestMigrateCleanupOptionalParams,
    ) => {
      const poller = testMigrateCleanup(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        migrationItemName,
        testMigrateCleanupInput,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginTestMigrateCleanupAndWait: async (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      protectionContainerName: string,
      migrationItemName: string,
      testMigrateCleanupInput: TestMigrateCleanupInput,
      options?: ReplicationMigrationItemsTestMigrateCleanupOptionalParams,
    ) => {
      return await testMigrateCleanup(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        migrationItemName,
        testMigrateCleanupInput,
        options,
      );
    },
    testMigrate: (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      protectionContainerName: string,
      migrationItemName: string,
      testMigrateInput: TestMigrateInput,
      options?: ReplicationMigrationItemsTestMigrateOptionalParams,
    ) =>
      testMigrate(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        migrationItemName,
        testMigrateInput,
        options,
      ),
    beginTestMigrate: async (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      protectionContainerName: string,
      migrationItemName: string,
      testMigrateInput: TestMigrateInput,
      options?: ReplicationMigrationItemsTestMigrateOptionalParams,
    ) => {
      const poller = testMigrate(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        migrationItemName,
        testMigrateInput,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginTestMigrateAndWait: async (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      protectionContainerName: string,
      migrationItemName: string,
      testMigrateInput: TestMigrateInput,
      options?: ReplicationMigrationItemsTestMigrateOptionalParams,
    ) => {
      return await testMigrate(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        migrationItemName,
        testMigrateInput,
        options,
      );
    },
    resync: (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      protectionContainerName: string,
      migrationItemName: string,
      input: ResyncInput,
      options?: ReplicationMigrationItemsResyncOptionalParams,
    ) =>
      resync(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        migrationItemName,
        input,
        options,
      ),
    beginResync: async (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      protectionContainerName: string,
      migrationItemName: string,
      input: ResyncInput,
      options?: ReplicationMigrationItemsResyncOptionalParams,
    ) => {
      const poller = resync(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        migrationItemName,
        input,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginResyncAndWait: async (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      protectionContainerName: string,
      migrationItemName: string,
      input: ResyncInput,
      options?: ReplicationMigrationItemsResyncOptionalParams,
    ) => {
      return await resync(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        migrationItemName,
        input,
        options,
      );
    },
    resumeReplication: (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      protectionContainerName: string,
      migrationItemName: string,
      resumeReplicationInput: ResumeReplicationInput,
      options?: ReplicationMigrationItemsResumeReplicationOptionalParams,
    ) =>
      resumeReplication(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        migrationItemName,
        resumeReplicationInput,
        options,
      ),
    beginResumeReplication: async (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      protectionContainerName: string,
      migrationItemName: string,
      resumeReplicationInput: ResumeReplicationInput,
      options?: ReplicationMigrationItemsResumeReplicationOptionalParams,
    ) => {
      const poller = resumeReplication(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        migrationItemName,
        resumeReplicationInput,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginResumeReplicationAndWait: async (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      protectionContainerName: string,
      migrationItemName: string,
      resumeReplicationInput: ResumeReplicationInput,
      options?: ReplicationMigrationItemsResumeReplicationOptionalParams,
    ) => {
      return await resumeReplication(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        migrationItemName,
        resumeReplicationInput,
        options,
      );
    },
    pauseReplication: (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      protectionContainerName: string,
      migrationItemName: string,
      pauseReplicationInput: PauseReplicationInput,
      options?: ReplicationMigrationItemsPauseReplicationOptionalParams,
    ) =>
      pauseReplication(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        migrationItemName,
        pauseReplicationInput,
        options,
      ),
    beginPauseReplication: async (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      protectionContainerName: string,
      migrationItemName: string,
      pauseReplicationInput: PauseReplicationInput,
      options?: ReplicationMigrationItemsPauseReplicationOptionalParams,
    ) => {
      const poller = pauseReplication(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        migrationItemName,
        pauseReplicationInput,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginPauseReplicationAndWait: async (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      protectionContainerName: string,
      migrationItemName: string,
      pauseReplicationInput: PauseReplicationInput,
      options?: ReplicationMigrationItemsPauseReplicationOptionalParams,
    ) => {
      return await pauseReplication(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        migrationItemName,
        pauseReplicationInput,
        options,
      );
    },
    migrate: (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      protectionContainerName: string,
      migrationItemName: string,
      migrateInput: MigrateInput,
      options?: ReplicationMigrationItemsMigrateOptionalParams,
    ) =>
      migrate(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        migrationItemName,
        migrateInput,
        options,
      ),
    beginMigrate: async (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      protectionContainerName: string,
      migrationItemName: string,
      migrateInput: MigrateInput,
      options?: ReplicationMigrationItemsMigrateOptionalParams,
    ) => {
      const poller = migrate(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        migrationItemName,
        migrateInput,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginMigrateAndWait: async (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      protectionContainerName: string,
      migrationItemName: string,
      migrateInput: MigrateInput,
      options?: ReplicationMigrationItemsMigrateOptionalParams,
    ) => {
      return await migrate(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        migrationItemName,
        migrateInput,
        options,
      );
    },
    listByReplicationProtectionContainers: (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      protectionContainerName: string,
      options?: ReplicationMigrationItemsListByReplicationProtectionContainersOptionalParams,
    ) =>
      listByReplicationProtectionContainers(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        options,
      ),
    delete: (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      protectionContainerName: string,
      migrationItemName: string,
      options?: ReplicationMigrationItemsDeleteOptionalParams,
    ) =>
      $delete(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        migrationItemName,
        options,
      ),
    beginDelete: async (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      protectionContainerName: string,
      migrationItemName: string,
      options?: ReplicationMigrationItemsDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        migrationItemName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      protectionContainerName: string,
      migrationItemName: string,
      options?: ReplicationMigrationItemsDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        migrationItemName,
        options,
      );
    },
    update: (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      protectionContainerName: string,
      migrationItemName: string,
      input: UpdateMigrationItemInput,
      options?: ReplicationMigrationItemsUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        migrationItemName,
        input,
        options,
      ),
    beginUpdate: async (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      protectionContainerName: string,
      migrationItemName: string,
      input: UpdateMigrationItemInput,
      options?: ReplicationMigrationItemsUpdateOptionalParams,
    ) => {
      const poller = update(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        migrationItemName,
        input,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      protectionContainerName: string,
      migrationItemName: string,
      input: UpdateMigrationItemInput,
      options?: ReplicationMigrationItemsUpdateOptionalParams,
    ) => {
      return await update(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        migrationItemName,
        input,
        options,
      );
    },
    create: (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      protectionContainerName: string,
      migrationItemName: string,
      input: EnableMigrationInput,
      options?: ReplicationMigrationItemsCreateOptionalParams,
    ) =>
      create(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        migrationItemName,
        input,
        options,
      ),
    beginCreate: async (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      protectionContainerName: string,
      migrationItemName: string,
      input: EnableMigrationInput,
      options?: ReplicationMigrationItemsCreateOptionalParams,
    ) => {
      const poller = create(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        migrationItemName,
        input,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateAndWait: async (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      protectionContainerName: string,
      migrationItemName: string,
      input: EnableMigrationInput,
      options?: ReplicationMigrationItemsCreateOptionalParams,
    ) => {
      return await create(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        migrationItemName,
        input,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      protectionContainerName: string,
      migrationItemName: string,
      options?: ReplicationMigrationItemsGetOptionalParams,
    ) =>
      get(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        migrationItemName,
        options,
      ),
  };
}

export function _getReplicationMigrationItemsOperations(
  context: SiteRecoveryManagementContext,
): ReplicationMigrationItemsOperations {
  return {
    ..._getReplicationMigrationItems(context),
  };
}

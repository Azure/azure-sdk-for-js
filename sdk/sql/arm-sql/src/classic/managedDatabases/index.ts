// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlManagementContext } from "../../api/sqlManagementContext.js";
import {
  listInaccessibleByInstance,
  startMove,
  reevaluateInaccessibleDatabaseState,
  completeRestore,
  completeMove,
  cancelMove,
  listByInstance,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/managedDatabases/operations.js";
import type {
  ManagedDatabasesListInaccessibleByInstanceOptionalParams,
  ManagedDatabasesStartMoveOptionalParams,
  ManagedDatabasesReevaluateInaccessibleDatabaseStateOptionalParams,
  ManagedDatabasesCompleteRestoreOptionalParams,
  ManagedDatabasesCompleteMoveOptionalParams,
  ManagedDatabasesCancelMoveOptionalParams,
  ManagedDatabasesListByInstanceOptionalParams,
  ManagedDatabasesDeleteOptionalParams,
  ManagedDatabasesUpdateOptionalParams,
  ManagedDatabasesCreateOrUpdateOptionalParams,
  ManagedDatabasesGetOptionalParams,
} from "../../api/managedDatabases/options.js";
import type {
  ManagedDatabase,
  ManagedDatabaseUpdate,
  ManagedDatabaseMoveDefinition,
  CompleteDatabaseRestoreDefinition,
  ManagedDatabaseStartMoveDefinition,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ManagedDatabases operations. */
export interface ManagedDatabasesOperations {
  /** Gets a list of inaccessible managed databases in a managed instance */
  listInaccessibleByInstance: (
    resourceGroupName: string,
    managedInstanceName: string,
    options?: ManagedDatabasesListInaccessibleByInstanceOptionalParams,
  ) => PagedAsyncIterableIterator<ManagedDatabase>;
  /** Starts a managed database move operation. */
  startMove: (
    resourceGroupName: string,
    managedInstanceName: string,
    databaseName: string,
    parameters: ManagedDatabaseStartMoveDefinition,
    options?: ManagedDatabasesStartMoveOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use startMove instead */
  beginStartMove: (
    resourceGroupName: string,
    managedInstanceName: string,
    databaseName: string,
    parameters: ManagedDatabaseStartMoveDefinition,
    options?: ManagedDatabasesStartMoveOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use startMove instead */
  beginStartMoveAndWait: (
    resourceGroupName: string,
    managedInstanceName: string,
    databaseName: string,
    parameters: ManagedDatabaseStartMoveDefinition,
    options?: ManagedDatabasesStartMoveOptionalParams,
  ) => Promise<void>;
  /** Reevaluates the inaccessibility state of a managed database. */
  reevaluateInaccessibleDatabaseState: (
    resourceGroupName: string,
    managedInstanceName: string,
    databaseName: string,
    options?: ManagedDatabasesReevaluateInaccessibleDatabaseStateOptionalParams,
  ) => PollerLike<OperationState<ManagedDatabase>, ManagedDatabase>;
  /** @deprecated use reevaluateInaccessibleDatabaseState instead */
  beginReevaluateInaccessibleDatabaseState: (
    resourceGroupName: string,
    managedInstanceName: string,
    databaseName: string,
    options?: ManagedDatabasesReevaluateInaccessibleDatabaseStateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<ManagedDatabase>, ManagedDatabase>>;
  /** @deprecated use reevaluateInaccessibleDatabaseState instead */
  beginReevaluateInaccessibleDatabaseStateAndWait: (
    resourceGroupName: string,
    managedInstanceName: string,
    databaseName: string,
    options?: ManagedDatabasesReevaluateInaccessibleDatabaseStateOptionalParams,
  ) => Promise<ManagedDatabase>;
  /** Completes the restore operation on a managed database. */
  completeRestore: (
    resourceGroupName: string,
    managedInstanceName: string,
    databaseName: string,
    parameters: CompleteDatabaseRestoreDefinition,
    options?: ManagedDatabasesCompleteRestoreOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use completeRestore instead */
  beginCompleteRestore: (
    resourceGroupName: string,
    managedInstanceName: string,
    databaseName: string,
    parameters: CompleteDatabaseRestoreDefinition,
    options?: ManagedDatabasesCompleteRestoreOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use completeRestore instead */
  beginCompleteRestoreAndWait: (
    resourceGroupName: string,
    managedInstanceName: string,
    databaseName: string,
    parameters: CompleteDatabaseRestoreDefinition,
    options?: ManagedDatabasesCompleteRestoreOptionalParams,
  ) => Promise<void>;
  /** Completes a managed database move operation. */
  completeMove: (
    resourceGroupName: string,
    managedInstanceName: string,
    databaseName: string,
    parameters: ManagedDatabaseMoveDefinition,
    options?: ManagedDatabasesCompleteMoveOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use completeMove instead */
  beginCompleteMove: (
    resourceGroupName: string,
    managedInstanceName: string,
    databaseName: string,
    parameters: ManagedDatabaseMoveDefinition,
    options?: ManagedDatabasesCompleteMoveOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use completeMove instead */
  beginCompleteMoveAndWait: (
    resourceGroupName: string,
    managedInstanceName: string,
    databaseName: string,
    parameters: ManagedDatabaseMoveDefinition,
    options?: ManagedDatabasesCompleteMoveOptionalParams,
  ) => Promise<void>;
  /** Cancels a managed database move operation. */
  cancelMove: (
    resourceGroupName: string,
    managedInstanceName: string,
    databaseName: string,
    parameters: ManagedDatabaseMoveDefinition,
    options?: ManagedDatabasesCancelMoveOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use cancelMove instead */
  beginCancelMove: (
    resourceGroupName: string,
    managedInstanceName: string,
    databaseName: string,
    parameters: ManagedDatabaseMoveDefinition,
    options?: ManagedDatabasesCancelMoveOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use cancelMove instead */
  beginCancelMoveAndWait: (
    resourceGroupName: string,
    managedInstanceName: string,
    databaseName: string,
    parameters: ManagedDatabaseMoveDefinition,
    options?: ManagedDatabasesCancelMoveOptionalParams,
  ) => Promise<void>;
  /** Gets a list of managed databases. */
  listByInstance: (
    resourceGroupName: string,
    managedInstanceName: string,
    options?: ManagedDatabasesListByInstanceOptionalParams,
  ) => PagedAsyncIterableIterator<ManagedDatabase>;
  /** Deletes a managed database. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    managedInstanceName: string,
    databaseName: string,
    options?: ManagedDatabasesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    managedInstanceName: string,
    databaseName: string,
    options?: ManagedDatabasesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    managedInstanceName: string,
    databaseName: string,
    options?: ManagedDatabasesDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates an existing database. */
  update: (
    resourceGroupName: string,
    managedInstanceName: string,
    databaseName: string,
    parameters: ManagedDatabaseUpdate,
    options?: ManagedDatabasesUpdateOptionalParams,
  ) => PollerLike<OperationState<ManagedDatabase>, ManagedDatabase>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    managedInstanceName: string,
    databaseName: string,
    parameters: ManagedDatabaseUpdate,
    options?: ManagedDatabasesUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<ManagedDatabase>, ManagedDatabase>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    managedInstanceName: string,
    databaseName: string,
    parameters: ManagedDatabaseUpdate,
    options?: ManagedDatabasesUpdateOptionalParams,
  ) => Promise<ManagedDatabase>;
  /** Creates a new database or updates an existing database. */
  createOrUpdate: (
    resourceGroupName: string,
    managedInstanceName: string,
    databaseName: string,
    parameters: ManagedDatabase,
    options?: ManagedDatabasesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<ManagedDatabase>, ManagedDatabase>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    managedInstanceName: string,
    databaseName: string,
    parameters: ManagedDatabase,
    options?: ManagedDatabasesCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<ManagedDatabase>, ManagedDatabase>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    managedInstanceName: string,
    databaseName: string,
    parameters: ManagedDatabase,
    options?: ManagedDatabasesCreateOrUpdateOptionalParams,
  ) => Promise<ManagedDatabase>;
  /** Gets a managed database. */
  get: (
    resourceGroupName: string,
    managedInstanceName: string,
    databaseName: string,
    options?: ManagedDatabasesGetOptionalParams,
  ) => Promise<ManagedDatabase>;
}

function _getManagedDatabases(context: SqlManagementContext) {
  return {
    listInaccessibleByInstance: (
      resourceGroupName: string,
      managedInstanceName: string,
      options?: ManagedDatabasesListInaccessibleByInstanceOptionalParams,
    ) => listInaccessibleByInstance(context, resourceGroupName, managedInstanceName, options),
    startMove: (
      resourceGroupName: string,
      managedInstanceName: string,
      databaseName: string,
      parameters: ManagedDatabaseStartMoveDefinition,
      options?: ManagedDatabasesStartMoveOptionalParams,
    ) =>
      startMove(context, resourceGroupName, managedInstanceName, databaseName, parameters, options),
    beginStartMove: async (
      resourceGroupName: string,
      managedInstanceName: string,
      databaseName: string,
      parameters: ManagedDatabaseStartMoveDefinition,
      options?: ManagedDatabasesStartMoveOptionalParams,
    ) => {
      const poller = startMove(
        context,
        resourceGroupName,
        managedInstanceName,
        databaseName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginStartMoveAndWait: async (
      resourceGroupName: string,
      managedInstanceName: string,
      databaseName: string,
      parameters: ManagedDatabaseStartMoveDefinition,
      options?: ManagedDatabasesStartMoveOptionalParams,
    ) => {
      return await startMove(
        context,
        resourceGroupName,
        managedInstanceName,
        databaseName,
        parameters,
        options,
      );
    },
    reevaluateInaccessibleDatabaseState: (
      resourceGroupName: string,
      managedInstanceName: string,
      databaseName: string,
      options?: ManagedDatabasesReevaluateInaccessibleDatabaseStateOptionalParams,
    ) =>
      reevaluateInaccessibleDatabaseState(
        context,
        resourceGroupName,
        managedInstanceName,
        databaseName,
        options,
      ),
    beginReevaluateInaccessibleDatabaseState: async (
      resourceGroupName: string,
      managedInstanceName: string,
      databaseName: string,
      options?: ManagedDatabasesReevaluateInaccessibleDatabaseStateOptionalParams,
    ) => {
      const poller = reevaluateInaccessibleDatabaseState(
        context,
        resourceGroupName,
        managedInstanceName,
        databaseName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginReevaluateInaccessibleDatabaseStateAndWait: async (
      resourceGroupName: string,
      managedInstanceName: string,
      databaseName: string,
      options?: ManagedDatabasesReevaluateInaccessibleDatabaseStateOptionalParams,
    ) => {
      return await reevaluateInaccessibleDatabaseState(
        context,
        resourceGroupName,
        managedInstanceName,
        databaseName,
        options,
      );
    },
    completeRestore: (
      resourceGroupName: string,
      managedInstanceName: string,
      databaseName: string,
      parameters: CompleteDatabaseRestoreDefinition,
      options?: ManagedDatabasesCompleteRestoreOptionalParams,
    ) =>
      completeRestore(
        context,
        resourceGroupName,
        managedInstanceName,
        databaseName,
        parameters,
        options,
      ),
    beginCompleteRestore: async (
      resourceGroupName: string,
      managedInstanceName: string,
      databaseName: string,
      parameters: CompleteDatabaseRestoreDefinition,
      options?: ManagedDatabasesCompleteRestoreOptionalParams,
    ) => {
      const poller = completeRestore(
        context,
        resourceGroupName,
        managedInstanceName,
        databaseName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCompleteRestoreAndWait: async (
      resourceGroupName: string,
      managedInstanceName: string,
      databaseName: string,
      parameters: CompleteDatabaseRestoreDefinition,
      options?: ManagedDatabasesCompleteRestoreOptionalParams,
    ) => {
      return await completeRestore(
        context,
        resourceGroupName,
        managedInstanceName,
        databaseName,
        parameters,
        options,
      );
    },
    completeMove: (
      resourceGroupName: string,
      managedInstanceName: string,
      databaseName: string,
      parameters: ManagedDatabaseMoveDefinition,
      options?: ManagedDatabasesCompleteMoveOptionalParams,
    ) =>
      completeMove(
        context,
        resourceGroupName,
        managedInstanceName,
        databaseName,
        parameters,
        options,
      ),
    beginCompleteMove: async (
      resourceGroupName: string,
      managedInstanceName: string,
      databaseName: string,
      parameters: ManagedDatabaseMoveDefinition,
      options?: ManagedDatabasesCompleteMoveOptionalParams,
    ) => {
      const poller = completeMove(
        context,
        resourceGroupName,
        managedInstanceName,
        databaseName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCompleteMoveAndWait: async (
      resourceGroupName: string,
      managedInstanceName: string,
      databaseName: string,
      parameters: ManagedDatabaseMoveDefinition,
      options?: ManagedDatabasesCompleteMoveOptionalParams,
    ) => {
      return await completeMove(
        context,
        resourceGroupName,
        managedInstanceName,
        databaseName,
        parameters,
        options,
      );
    },
    cancelMove: (
      resourceGroupName: string,
      managedInstanceName: string,
      databaseName: string,
      parameters: ManagedDatabaseMoveDefinition,
      options?: ManagedDatabasesCancelMoveOptionalParams,
    ) =>
      cancelMove(
        context,
        resourceGroupName,
        managedInstanceName,
        databaseName,
        parameters,
        options,
      ),
    beginCancelMove: async (
      resourceGroupName: string,
      managedInstanceName: string,
      databaseName: string,
      parameters: ManagedDatabaseMoveDefinition,
      options?: ManagedDatabasesCancelMoveOptionalParams,
    ) => {
      const poller = cancelMove(
        context,
        resourceGroupName,
        managedInstanceName,
        databaseName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCancelMoveAndWait: async (
      resourceGroupName: string,
      managedInstanceName: string,
      databaseName: string,
      parameters: ManagedDatabaseMoveDefinition,
      options?: ManagedDatabasesCancelMoveOptionalParams,
    ) => {
      return await cancelMove(
        context,
        resourceGroupName,
        managedInstanceName,
        databaseName,
        parameters,
        options,
      );
    },
    listByInstance: (
      resourceGroupName: string,
      managedInstanceName: string,
      options?: ManagedDatabasesListByInstanceOptionalParams,
    ) => listByInstance(context, resourceGroupName, managedInstanceName, options),
    delete: (
      resourceGroupName: string,
      managedInstanceName: string,
      databaseName: string,
      options?: ManagedDatabasesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, managedInstanceName, databaseName, options),
    beginDelete: async (
      resourceGroupName: string,
      managedInstanceName: string,
      databaseName: string,
      options?: ManagedDatabasesDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        managedInstanceName,
        databaseName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      managedInstanceName: string,
      databaseName: string,
      options?: ManagedDatabasesDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, managedInstanceName, databaseName, options);
    },
    update: (
      resourceGroupName: string,
      managedInstanceName: string,
      databaseName: string,
      parameters: ManagedDatabaseUpdate,
      options?: ManagedDatabasesUpdateOptionalParams,
    ) => update(context, resourceGroupName, managedInstanceName, databaseName, parameters, options),
    beginUpdate: async (
      resourceGroupName: string,
      managedInstanceName: string,
      databaseName: string,
      parameters: ManagedDatabaseUpdate,
      options?: ManagedDatabasesUpdateOptionalParams,
    ) => {
      const poller = update(
        context,
        resourceGroupName,
        managedInstanceName,
        databaseName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      managedInstanceName: string,
      databaseName: string,
      parameters: ManagedDatabaseUpdate,
      options?: ManagedDatabasesUpdateOptionalParams,
    ) => {
      return await update(
        context,
        resourceGroupName,
        managedInstanceName,
        databaseName,
        parameters,
        options,
      );
    },
    createOrUpdate: (
      resourceGroupName: string,
      managedInstanceName: string,
      databaseName: string,
      parameters: ManagedDatabase,
      options?: ManagedDatabasesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        managedInstanceName,
        databaseName,
        parameters,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      managedInstanceName: string,
      databaseName: string,
      parameters: ManagedDatabase,
      options?: ManagedDatabasesCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        managedInstanceName,
        databaseName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      managedInstanceName: string,
      databaseName: string,
      parameters: ManagedDatabase,
      options?: ManagedDatabasesCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        managedInstanceName,
        databaseName,
        parameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      managedInstanceName: string,
      databaseName: string,
      options?: ManagedDatabasesGetOptionalParams,
    ) => get(context, resourceGroupName, managedInstanceName, databaseName, options),
  };
}

export function _getManagedDatabasesOperations(
  context: SqlManagementContext,
): ManagedDatabasesOperations {
  return {
    ..._getManagedDatabases(context),
  };
}

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlManagementContext } from "../../api/sqlManagementContext.js";
import {
  suspend,
  resume,
  listByDatabase,
  createOrUpdate,
  get,
} from "../../api/transparentDataEncryptions/operations.js";
import type {
  TransparentDataEncryptionsSuspendOptionalParams,
  TransparentDataEncryptionsResumeOptionalParams,
  TransparentDataEncryptionsListByDatabaseOptionalParams,
  TransparentDataEncryptionsCreateOrUpdateOptionalParams,
  TransparentDataEncryptionsGetOptionalParams,
} from "../../api/transparentDataEncryptions/options.js";
import type {
  TransparentDataEncryptionName,
  LogicalDatabaseTransparentDataEncryption,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a TransparentDataEncryptions operations. */
export interface TransparentDataEncryptionsOperations {
  /** Suspend ongoing logical database's Transparent Data Encryption scan configuration. */
  suspend: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    tdeName: TransparentDataEncryptionName,
    options?: TransparentDataEncryptionsSuspendOptionalParams,
  ) => PollerLike<
    OperationState<LogicalDatabaseTransparentDataEncryption>,
    LogicalDatabaseTransparentDataEncryption
  >;
  /** @deprecated use suspend instead */
  beginSuspend: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    tdeName: TransparentDataEncryptionName,
    options?: TransparentDataEncryptionsSuspendOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<LogicalDatabaseTransparentDataEncryption>,
      LogicalDatabaseTransparentDataEncryption
    >
  >;
  /** @deprecated use suspend instead */
  beginSuspendAndWait: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    tdeName: TransparentDataEncryptionName,
    options?: TransparentDataEncryptionsSuspendOptionalParams,
  ) => Promise<LogicalDatabaseTransparentDataEncryption>;
  /** Resume ongoing logical database's Transparent Data Encryption scan configuration. */
  resume: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    tdeName: TransparentDataEncryptionName,
    options?: TransparentDataEncryptionsResumeOptionalParams,
  ) => PollerLike<
    OperationState<LogicalDatabaseTransparentDataEncryption>,
    LogicalDatabaseTransparentDataEncryption
  >;
  /** @deprecated use resume instead */
  beginResume: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    tdeName: TransparentDataEncryptionName,
    options?: TransparentDataEncryptionsResumeOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<LogicalDatabaseTransparentDataEncryption>,
      LogicalDatabaseTransparentDataEncryption
    >
  >;
  /** @deprecated use resume instead */
  beginResumeAndWait: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    tdeName: TransparentDataEncryptionName,
    options?: TransparentDataEncryptionsResumeOptionalParams,
  ) => Promise<LogicalDatabaseTransparentDataEncryption>;
  /** Gets a list of the logical database's transparent data encryption. */
  listByDatabase: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    options?: TransparentDataEncryptionsListByDatabaseOptionalParams,
  ) => PagedAsyncIterableIterator<LogicalDatabaseTransparentDataEncryption>;
  /** Updates a logical database's transparent data encryption configuration. */
  createOrUpdate: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    tdeName: TransparentDataEncryptionName,
    parameters: LogicalDatabaseTransparentDataEncryption,
    options?: TransparentDataEncryptionsCreateOrUpdateOptionalParams,
  ) => PollerLike<
    OperationState<LogicalDatabaseTransparentDataEncryption>,
    LogicalDatabaseTransparentDataEncryption
  >;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    tdeName: TransparentDataEncryptionName,
    parameters: LogicalDatabaseTransparentDataEncryption,
    options?: TransparentDataEncryptionsCreateOrUpdateOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<LogicalDatabaseTransparentDataEncryption>,
      LogicalDatabaseTransparentDataEncryption
    >
  >;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    tdeName: TransparentDataEncryptionName,
    parameters: LogicalDatabaseTransparentDataEncryption,
    options?: TransparentDataEncryptionsCreateOrUpdateOptionalParams,
  ) => Promise<LogicalDatabaseTransparentDataEncryption>;
  /** Gets a logical database's transparent data encryption. */
  get: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    tdeName: TransparentDataEncryptionName,
    options?: TransparentDataEncryptionsGetOptionalParams,
  ) => Promise<LogicalDatabaseTransparentDataEncryption>;
}

function _getTransparentDataEncryptions(context: SqlManagementContext) {
  return {
    suspend: (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      tdeName: TransparentDataEncryptionName,
      options?: TransparentDataEncryptionsSuspendOptionalParams,
    ) => suspend(context, resourceGroupName, serverName, databaseName, tdeName, options),
    beginSuspend: async (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      tdeName: TransparentDataEncryptionName,
      options?: TransparentDataEncryptionsSuspendOptionalParams,
    ) => {
      const poller = suspend(
        context,
        resourceGroupName,
        serverName,
        databaseName,
        tdeName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginSuspendAndWait: async (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      tdeName: TransparentDataEncryptionName,
      options?: TransparentDataEncryptionsSuspendOptionalParams,
    ) => {
      return await suspend(context, resourceGroupName, serverName, databaseName, tdeName, options);
    },
    resume: (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      tdeName: TransparentDataEncryptionName,
      options?: TransparentDataEncryptionsResumeOptionalParams,
    ) => resume(context, resourceGroupName, serverName, databaseName, tdeName, options),
    beginResume: async (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      tdeName: TransparentDataEncryptionName,
      options?: TransparentDataEncryptionsResumeOptionalParams,
    ) => {
      const poller = resume(context, resourceGroupName, serverName, databaseName, tdeName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginResumeAndWait: async (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      tdeName: TransparentDataEncryptionName,
      options?: TransparentDataEncryptionsResumeOptionalParams,
    ) => {
      return await resume(context, resourceGroupName, serverName, databaseName, tdeName, options);
    },
    listByDatabase: (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      options?: TransparentDataEncryptionsListByDatabaseOptionalParams,
    ) => listByDatabase(context, resourceGroupName, serverName, databaseName, options),
    createOrUpdate: (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      tdeName: TransparentDataEncryptionName,
      parameters: LogicalDatabaseTransparentDataEncryption,
      options?: TransparentDataEncryptionsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        serverName,
        databaseName,
        tdeName,
        parameters,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      tdeName: TransparentDataEncryptionName,
      parameters: LogicalDatabaseTransparentDataEncryption,
      options?: TransparentDataEncryptionsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        serverName,
        databaseName,
        tdeName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      tdeName: TransparentDataEncryptionName,
      parameters: LogicalDatabaseTransparentDataEncryption,
      options?: TransparentDataEncryptionsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        serverName,
        databaseName,
        tdeName,
        parameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      tdeName: TransparentDataEncryptionName,
      options?: TransparentDataEncryptionsGetOptionalParams,
    ) => get(context, resourceGroupName, serverName, databaseName, tdeName, options),
  };
}

export function _getTransparentDataEncryptionsOperations(
  context: SqlManagementContext,
): TransparentDataEncryptionsOperations {
  return {
    ..._getTransparentDataEncryptions(context),
  };
}

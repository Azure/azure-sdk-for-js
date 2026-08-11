// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlManagementContext } from "../../api/sqlManagementContext.js";
import {
  disable,
  listByDatabase,
  createOrUpdate,
  get,
} from "../../api/ledgerDigestUploadsOperations/operations.js";
import type {
  LedgerDigestUploadsOperationsDisableOptionalParams,
  LedgerDigestUploadsOperationsListByDatabaseOptionalParams,
  LedgerDigestUploadsOperationsCreateOrUpdateOptionalParams,
  LedgerDigestUploadsOperationsGetOptionalParams,
} from "../../api/ledgerDigestUploadsOperations/options.js";
import type { LedgerDigestUploads, LedgerDigestUploadsName } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a LedgerDigestUploadsOperations operations. */
export interface LedgerDigestUploadsOperationsOperations {
  /** Disables uploading ledger digests to an Azure Storage account or an Azure Confidential Ledger instance. */
  disable: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    ledgerDigestUploads: LedgerDigestUploadsName,
    options?: LedgerDigestUploadsOperationsDisableOptionalParams,
  ) => PollerLike<OperationState<LedgerDigestUploads>, LedgerDigestUploads>;
  /** @deprecated use disable instead */
  beginDisable: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    ledgerDigestUploads: LedgerDigestUploadsName,
    options?: LedgerDigestUploadsOperationsDisableOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<LedgerDigestUploads>, LedgerDigestUploads>>;
  /** @deprecated use disable instead */
  beginDisableAndWait: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    ledgerDigestUploads: LedgerDigestUploadsName,
    options?: LedgerDigestUploadsOperationsDisableOptionalParams,
  ) => Promise<LedgerDigestUploads>;
  /** Gets all ledger digest upload settings on a database. */
  listByDatabase: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    options?: LedgerDigestUploadsOperationsListByDatabaseOptionalParams,
  ) => PagedAsyncIterableIterator<LedgerDigestUploads>;
  /** Enables upload ledger digests to an Azure Storage account or an Azure Confidential Ledger instance. */
  createOrUpdate: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    ledgerDigestUploads: LedgerDigestUploadsName,
    parameters: LedgerDigestUploads,
    options?: LedgerDigestUploadsOperationsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<LedgerDigestUploads>, LedgerDigestUploads>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    ledgerDigestUploads: LedgerDigestUploadsName,
    parameters: LedgerDigestUploads,
    options?: LedgerDigestUploadsOperationsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<LedgerDigestUploads>, LedgerDigestUploads>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    ledgerDigestUploads: LedgerDigestUploadsName,
    parameters: LedgerDigestUploads,
    options?: LedgerDigestUploadsOperationsCreateOrUpdateOptionalParams,
  ) => Promise<LedgerDigestUploads>;
  /** Gets the current ledger digest upload configuration for a database. */
  get: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    ledgerDigestUploads: LedgerDigestUploadsName,
    options?: LedgerDigestUploadsOperationsGetOptionalParams,
  ) => Promise<LedgerDigestUploads>;
}

function _getLedgerDigestUploadsOperations(context: SqlManagementContext) {
  return {
    disable: (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      ledgerDigestUploads: LedgerDigestUploadsName,
      options?: LedgerDigestUploadsOperationsDisableOptionalParams,
    ) =>
      disable(context, resourceGroupName, serverName, databaseName, ledgerDigestUploads, options),
    beginDisable: async (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      ledgerDigestUploads: LedgerDigestUploadsName,
      options?: LedgerDigestUploadsOperationsDisableOptionalParams,
    ) => {
      const poller = disable(
        context,
        resourceGroupName,
        serverName,
        databaseName,
        ledgerDigestUploads,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDisableAndWait: async (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      ledgerDigestUploads: LedgerDigestUploadsName,
      options?: LedgerDigestUploadsOperationsDisableOptionalParams,
    ) => {
      return await disable(
        context,
        resourceGroupName,
        serverName,
        databaseName,
        ledgerDigestUploads,
        options,
      );
    },
    listByDatabase: (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      options?: LedgerDigestUploadsOperationsListByDatabaseOptionalParams,
    ) => listByDatabase(context, resourceGroupName, serverName, databaseName, options),
    createOrUpdate: (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      ledgerDigestUploads: LedgerDigestUploadsName,
      parameters: LedgerDigestUploads,
      options?: LedgerDigestUploadsOperationsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        serverName,
        databaseName,
        ledgerDigestUploads,
        parameters,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      ledgerDigestUploads: LedgerDigestUploadsName,
      parameters: LedgerDigestUploads,
      options?: LedgerDigestUploadsOperationsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        serverName,
        databaseName,
        ledgerDigestUploads,
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
      ledgerDigestUploads: LedgerDigestUploadsName,
      parameters: LedgerDigestUploads,
      options?: LedgerDigestUploadsOperationsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        serverName,
        databaseName,
        ledgerDigestUploads,
        parameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      ledgerDigestUploads: LedgerDigestUploadsName,
      options?: LedgerDigestUploadsOperationsGetOptionalParams,
    ) => get(context, resourceGroupName, serverName, databaseName, ledgerDigestUploads, options),
  };
}

export function _getLedgerDigestUploadsOperationsOperations(
  context: SqlManagementContext,
): LedgerDigestUploadsOperationsOperations {
  return {
    ..._getLedgerDigestUploadsOperations(context),
  };
}

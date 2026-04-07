// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlContext } from "../../api/sqlContext.js";
import {
  disable,
  listByDatabase,
  createOrUpdate,
  get,
} from "../../api/ledgerDigestUploads/operations.js";
import type {
  LedgerDigestUploadsDisableOptionalParams,
  LedgerDigestUploadsListByDatabaseOptionalParams,
  LedgerDigestUploadsCreateOrUpdateOptionalParams,
  LedgerDigestUploadsGetOptionalParams,
} from "../../api/ledgerDigestUploads/options.js";
import type { LedgerDigestUploads, LedgerDigestUploadsName } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a LedgerDigestUploads operations. */
export interface LedgerDigestUploadsOperations {
  /** Disables uploading ledger digests to an Azure Storage account or an Azure Confidential Ledger instance. */
  disable: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    ledgerDigestUploads: LedgerDigestUploadsName,
    options?: LedgerDigestUploadsDisableOptionalParams,
  ) => PollerLike<OperationState<LedgerDigestUploads>, LedgerDigestUploads>;
  /** @deprecated use disable instead */
  beginDisable: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    ledgerDigestUploads: LedgerDigestUploadsName,
    options?: LedgerDigestUploadsDisableOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<LedgerDigestUploads>, LedgerDigestUploads>>;
  /** @deprecated use disable instead */
  beginDisableAndWait: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    ledgerDigestUploads: LedgerDigestUploadsName,
    options?: LedgerDigestUploadsDisableOptionalParams,
  ) => Promise<LedgerDigestUploads>;
  /** Gets all ledger digest upload settings on a database. */
  listByDatabase: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    options?: LedgerDigestUploadsListByDatabaseOptionalParams,
  ) => PagedAsyncIterableIterator<LedgerDigestUploads>;
  /** Enables upload ledger digests to an Azure Storage account or an Azure Confidential Ledger instance. */
  createOrUpdate: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    ledgerDigestUploads: LedgerDigestUploadsName,
    parameters: LedgerDigestUploads,
    options?: LedgerDigestUploadsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<LedgerDigestUploads>, LedgerDigestUploads>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    ledgerDigestUploads: LedgerDigestUploadsName,
    parameters: LedgerDigestUploads,
    options?: LedgerDigestUploadsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<LedgerDigestUploads>, LedgerDigestUploads>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    ledgerDigestUploads: LedgerDigestUploadsName,
    parameters: LedgerDigestUploads,
    options?: LedgerDigestUploadsCreateOrUpdateOptionalParams,
  ) => Promise<LedgerDigestUploads>;
  /** Gets the current ledger digest upload configuration for a database. */
  get: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    ledgerDigestUploads: LedgerDigestUploadsName,
    options?: LedgerDigestUploadsGetOptionalParams,
  ) => Promise<LedgerDigestUploads>;
}

function _getLedgerDigestUploads(context: SqlContext) {
  return {
    disable: (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      ledgerDigestUploads: LedgerDigestUploadsName,
      options?: LedgerDigestUploadsDisableOptionalParams,
    ) =>
      disable(context, resourceGroupName, serverName, databaseName, ledgerDigestUploads, options),
    beginDisable: async (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      ledgerDigestUploads: LedgerDigestUploadsName,
      options?: LedgerDigestUploadsDisableOptionalParams,
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
      options?: LedgerDigestUploadsDisableOptionalParams,
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
      options?: LedgerDigestUploadsListByDatabaseOptionalParams,
    ) => listByDatabase(context, resourceGroupName, serverName, databaseName, options),
    createOrUpdate: (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      ledgerDigestUploads: LedgerDigestUploadsName,
      parameters: LedgerDigestUploads,
      options?: LedgerDigestUploadsCreateOrUpdateOptionalParams,
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
      options?: LedgerDigestUploadsCreateOrUpdateOptionalParams,
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
      options?: LedgerDigestUploadsCreateOrUpdateOptionalParams,
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
      options?: LedgerDigestUploadsGetOptionalParams,
    ) => get(context, resourceGroupName, serverName, databaseName, ledgerDigestUploads, options),
  };
}

export function _getLedgerDigestUploadsOperations(
  context: SqlContext,
): LedgerDigestUploadsOperations {
  return {
    ..._getLedgerDigestUploads(context),
  };
}

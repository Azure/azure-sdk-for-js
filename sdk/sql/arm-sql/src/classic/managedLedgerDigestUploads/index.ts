// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlManagementContext } from "../../api/sqlManagementContext.js";
import {
  disable,
  listByDatabase,
  createOrUpdate,
  get,
} from "../../api/managedLedgerDigestUploads/operations.js";
import type {
  ManagedLedgerDigestUploadsDisableOptionalParams,
  ManagedLedgerDigestUploadsListByDatabaseOptionalParams,
  ManagedLedgerDigestUploadsCreateOrUpdateOptionalParams,
  ManagedLedgerDigestUploadsGetOptionalParams,
} from "../../api/managedLedgerDigestUploads/options.js";
import type {
  ManagedLedgerDigestUploads,
  ManagedLedgerDigestUploadsName,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ManagedLedgerDigestUploads operations. */
export interface ManagedLedgerDigestUploadsOperations {
  /** Disables uploading ledger digests to an Azure Storage account or an Azure Confidential Ledger instance. */
  disable: (
    resourceGroupName: string,
    managedInstanceName: string,
    databaseName: string,
    ledgerDigestUploads: ManagedLedgerDigestUploadsName,
    options?: ManagedLedgerDigestUploadsDisableOptionalParams,
  ) => PollerLike<OperationState<ManagedLedgerDigestUploads>, ManagedLedgerDigestUploads>;
  /** @deprecated use disable instead */
  beginDisable: (
    resourceGroupName: string,
    managedInstanceName: string,
    databaseName: string,
    ledgerDigestUploads: ManagedLedgerDigestUploadsName,
    options?: ManagedLedgerDigestUploadsDisableOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<ManagedLedgerDigestUploads>, ManagedLedgerDigestUploads>
  >;
  /** @deprecated use disable instead */
  beginDisableAndWait: (
    resourceGroupName: string,
    managedInstanceName: string,
    databaseName: string,
    ledgerDigestUploads: ManagedLedgerDigestUploadsName,
    options?: ManagedLedgerDigestUploadsDisableOptionalParams,
  ) => Promise<ManagedLedgerDigestUploads>;
  /** Gets all ledger digest upload settings on a database. */
  listByDatabase: (
    resourceGroupName: string,
    managedInstanceName: string,
    databaseName: string,
    options?: ManagedLedgerDigestUploadsListByDatabaseOptionalParams,
  ) => PagedAsyncIterableIterator<ManagedLedgerDigestUploads>;
  /** Enables upload ledger digests to an Azure Storage account or an Azure Confidential Ledger instance. */
  createOrUpdate: (
    resourceGroupName: string,
    managedInstanceName: string,
    databaseName: string,
    ledgerDigestUploads: ManagedLedgerDigestUploadsName,
    parameters: ManagedLedgerDigestUploads,
    options?: ManagedLedgerDigestUploadsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<ManagedLedgerDigestUploads>, ManagedLedgerDigestUploads>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    managedInstanceName: string,
    databaseName: string,
    ledgerDigestUploads: ManagedLedgerDigestUploadsName,
    parameters: ManagedLedgerDigestUploads,
    options?: ManagedLedgerDigestUploadsCreateOrUpdateOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<ManagedLedgerDigestUploads>, ManagedLedgerDigestUploads>
  >;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    managedInstanceName: string,
    databaseName: string,
    ledgerDigestUploads: ManagedLedgerDigestUploadsName,
    parameters: ManagedLedgerDigestUploads,
    options?: ManagedLedgerDigestUploadsCreateOrUpdateOptionalParams,
  ) => Promise<ManagedLedgerDigestUploads>;
  /** Gets the current ledger digest upload configuration for a database. */
  get: (
    resourceGroupName: string,
    managedInstanceName: string,
    databaseName: string,
    ledgerDigestUploads: ManagedLedgerDigestUploadsName,
    options?: ManagedLedgerDigestUploadsGetOptionalParams,
  ) => Promise<ManagedLedgerDigestUploads>;
}

function _getManagedLedgerDigestUploads(context: SqlManagementContext) {
  return {
    disable: (
      resourceGroupName: string,
      managedInstanceName: string,
      databaseName: string,
      ledgerDigestUploads: ManagedLedgerDigestUploadsName,
      options?: ManagedLedgerDigestUploadsDisableOptionalParams,
    ) =>
      disable(
        context,
        resourceGroupName,
        managedInstanceName,
        databaseName,
        ledgerDigestUploads,
        options,
      ),
    beginDisable: async (
      resourceGroupName: string,
      managedInstanceName: string,
      databaseName: string,
      ledgerDigestUploads: ManagedLedgerDigestUploadsName,
      options?: ManagedLedgerDigestUploadsDisableOptionalParams,
    ) => {
      const poller = disable(
        context,
        resourceGroupName,
        managedInstanceName,
        databaseName,
        ledgerDigestUploads,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDisableAndWait: async (
      resourceGroupName: string,
      managedInstanceName: string,
      databaseName: string,
      ledgerDigestUploads: ManagedLedgerDigestUploadsName,
      options?: ManagedLedgerDigestUploadsDisableOptionalParams,
    ) => {
      return await disable(
        context,
        resourceGroupName,
        managedInstanceName,
        databaseName,
        ledgerDigestUploads,
        options,
      );
    },
    listByDatabase: (
      resourceGroupName: string,
      managedInstanceName: string,
      databaseName: string,
      options?: ManagedLedgerDigestUploadsListByDatabaseOptionalParams,
    ) => listByDatabase(context, resourceGroupName, managedInstanceName, databaseName, options),
    createOrUpdate: (
      resourceGroupName: string,
      managedInstanceName: string,
      databaseName: string,
      ledgerDigestUploads: ManagedLedgerDigestUploadsName,
      parameters: ManagedLedgerDigestUploads,
      options?: ManagedLedgerDigestUploadsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        managedInstanceName,
        databaseName,
        ledgerDigestUploads,
        parameters,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      managedInstanceName: string,
      databaseName: string,
      ledgerDigestUploads: ManagedLedgerDigestUploadsName,
      parameters: ManagedLedgerDigestUploads,
      options?: ManagedLedgerDigestUploadsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        managedInstanceName,
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
      managedInstanceName: string,
      databaseName: string,
      ledgerDigestUploads: ManagedLedgerDigestUploadsName,
      parameters: ManagedLedgerDigestUploads,
      options?: ManagedLedgerDigestUploadsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        managedInstanceName,
        databaseName,
        ledgerDigestUploads,
        parameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      managedInstanceName: string,
      databaseName: string,
      ledgerDigestUploads: ManagedLedgerDigestUploadsName,
      options?: ManagedLedgerDigestUploadsGetOptionalParams,
    ) =>
      get(
        context,
        resourceGroupName,
        managedInstanceName,
        databaseName,
        ledgerDigestUploads,
        options,
      ),
  };
}

export function _getManagedLedgerDigestUploadsOperations(
  context: SqlManagementContext,
): ManagedLedgerDigestUploadsOperations {
  return {
    ..._getManagedLedgerDigestUploads(context),
  };
}

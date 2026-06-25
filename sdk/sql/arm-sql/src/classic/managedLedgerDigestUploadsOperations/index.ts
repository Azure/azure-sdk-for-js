// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlManagementContext } from "../../api/sqlManagementContext.js";
import {
  disable,
  listByDatabase,
  createOrUpdate,
  get,
} from "../../api/managedLedgerDigestUploadsOperations/operations.js";
import {
  ManagedLedgerDigestUploadsOperationsDisableOptionalParams,
  ManagedLedgerDigestUploadsOperationsListByDatabaseOptionalParams,
  ManagedLedgerDigestUploadsOperationsCreateOrUpdateOptionalParams,
  ManagedLedgerDigestUploadsOperationsGetOptionalParams,
} from "../../api/managedLedgerDigestUploadsOperations/options.js";
import { ManagedLedgerDigestUploads, ManagedLedgerDigestUploadsName } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ManagedLedgerDigestUploadsOperations operations. */
export interface ManagedLedgerDigestUploadsOperationsOperations {
  /** Disables uploading ledger digests to an Azure Storage account or an Azure Confidential Ledger instance. */
  disable: (
    resourceGroupName: string,
    managedInstanceName: string,
    databaseName: string,
    ledgerDigestUploads: ManagedLedgerDigestUploadsName,
    options?: ManagedLedgerDigestUploadsOperationsDisableOptionalParams,
  ) => PollerLike<OperationState<ManagedLedgerDigestUploads>, ManagedLedgerDigestUploads>;
  /** @deprecated use disable instead */
  beginDisable: (
    resourceGroupName: string,
    managedInstanceName: string,
    databaseName: string,
    ledgerDigestUploads: ManagedLedgerDigestUploadsName,
    options?: ManagedLedgerDigestUploadsOperationsDisableOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<ManagedLedgerDigestUploads>, ManagedLedgerDigestUploads>
  >;
  /** @deprecated use disable instead */
  beginDisableAndWait: (
    resourceGroupName: string,
    managedInstanceName: string,
    databaseName: string,
    ledgerDigestUploads: ManagedLedgerDigestUploadsName,
    options?: ManagedLedgerDigestUploadsOperationsDisableOptionalParams,
  ) => Promise<ManagedLedgerDigestUploads>;
  /** Gets all ledger digest upload settings on a database. */
  listByDatabase: (
    resourceGroupName: string,
    managedInstanceName: string,
    databaseName: string,
    options?: ManagedLedgerDigestUploadsOperationsListByDatabaseOptionalParams,
  ) => PagedAsyncIterableIterator<ManagedLedgerDigestUploads>;
  /** Enables upload ledger digests to an Azure Storage account or an Azure Confidential Ledger instance. */
  createOrUpdate: (
    resourceGroupName: string,
    managedInstanceName: string,
    databaseName: string,
    ledgerDigestUploads: ManagedLedgerDigestUploadsName,
    parameters: ManagedLedgerDigestUploads,
    options?: ManagedLedgerDigestUploadsOperationsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<ManagedLedgerDigestUploads>, ManagedLedgerDigestUploads>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    managedInstanceName: string,
    databaseName: string,
    ledgerDigestUploads: ManagedLedgerDigestUploadsName,
    parameters: ManagedLedgerDigestUploads,
    options?: ManagedLedgerDigestUploadsOperationsCreateOrUpdateOptionalParams,
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
    options?: ManagedLedgerDigestUploadsOperationsCreateOrUpdateOptionalParams,
  ) => Promise<ManagedLedgerDigestUploads>;
  /** Gets the current ledger digest upload configuration for a database. */
  get: (
    resourceGroupName: string,
    managedInstanceName: string,
    databaseName: string,
    ledgerDigestUploads: ManagedLedgerDigestUploadsName,
    options?: ManagedLedgerDigestUploadsOperationsGetOptionalParams,
  ) => Promise<ManagedLedgerDigestUploads>;
}

function _getManagedLedgerDigestUploadsOperations(context: SqlManagementContext) {
  return {
    disable: (
      resourceGroupName: string,
      managedInstanceName: string,
      databaseName: string,
      ledgerDigestUploads: ManagedLedgerDigestUploadsName,
      options?: ManagedLedgerDigestUploadsOperationsDisableOptionalParams,
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
      options?: ManagedLedgerDigestUploadsOperationsDisableOptionalParams,
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
      options?: ManagedLedgerDigestUploadsOperationsDisableOptionalParams,
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
      options?: ManagedLedgerDigestUploadsOperationsListByDatabaseOptionalParams,
    ) => listByDatabase(context, resourceGroupName, managedInstanceName, databaseName, options),
    createOrUpdate: (
      resourceGroupName: string,
      managedInstanceName: string,
      databaseName: string,
      ledgerDigestUploads: ManagedLedgerDigestUploadsName,
      parameters: ManagedLedgerDigestUploads,
      options?: ManagedLedgerDigestUploadsOperationsCreateOrUpdateOptionalParams,
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
      options?: ManagedLedgerDigestUploadsOperationsCreateOrUpdateOptionalParams,
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
      options?: ManagedLedgerDigestUploadsOperationsCreateOrUpdateOptionalParams,
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
      options?: ManagedLedgerDigestUploadsOperationsGetOptionalParams,
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

export function _getManagedLedgerDigestUploadsOperationsOperations(
  context: SqlManagementContext,
): ManagedLedgerDigestUploadsOperationsOperations {
  return {
    ..._getManagedLedgerDigestUploadsOperations(context),
  };
}

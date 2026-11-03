// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ConfidentialLedgerContext } from "../../api/confidentialLedgerContext.js";
import {
  filesExport,
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  create,
  get,
} from "../../api/ledger/operations.js";
import {
  LedgerFilesExportOptionalParams,
  LedgerListBySubscriptionOptionalParams,
  LedgerListByResourceGroupOptionalParams,
  LedgerDeleteOptionalParams,
  LedgerUpdateOptionalParams,
  LedgerCreateOptionalParams,
  LedgerGetOptionalParams,
} from "../../api/ledger/options.js";
import {
  ConfidentialLedger,
  ConfidentialLedgerFilesExport,
  ConfidentialLedgerFilesExportResponse,
} from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Ledger operations. */
export interface LedgerOperations {
  /** Copies the ledger files and the service certificate to a customer's storage account of choice. */
  filesExport: (
    resourceGroupName: string,
    ledgerName: string,
    confidentialLedger: ConfidentialLedgerFilesExport,
    options?: LedgerFilesExportOptionalParams,
  ) => PollerLike<
    OperationState<ConfidentialLedgerFilesExportResponse>,
    ConfidentialLedgerFilesExportResponse
  >;
  /** @deprecated use filesExport instead */
  beginFilesExport: (
    resourceGroupName: string,
    ledgerName: string,
    confidentialLedger: ConfidentialLedgerFilesExport,
    options?: LedgerFilesExportOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<ConfidentialLedgerFilesExportResponse>,
      ConfidentialLedgerFilesExportResponse
    >
  >;
  /** @deprecated use filesExport instead */
  beginFilesExportAndWait: (
    resourceGroupName: string,
    ledgerName: string,
    confidentialLedger: ConfidentialLedgerFilesExport,
    options?: LedgerFilesExportOptionalParams,
  ) => Promise<ConfidentialLedgerFilesExportResponse>;
  /** Retrieves the properties of all Confidential Ledgers. */
  listBySubscription: (
    options?: LedgerListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<ConfidentialLedger>;
  /** Retrieves the properties of all Confidential Ledgers. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: LedgerListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<ConfidentialLedger>;
  /** Deletes an existing Confidential Ledger. */
  delete: (
    resourceGroupName: string,
    ledgerName: string,
    options?: LedgerDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    ledgerName: string,
    options?: LedgerDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    ledgerName: string,
    options?: LedgerDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates properties of Confidential Ledger */
  update: (
    resourceGroupName: string,
    ledgerName: string,
    confidentialLedger: ConfidentialLedger,
    options?: LedgerUpdateOptionalParams,
  ) => PollerLike<OperationState<ConfidentialLedger>, ConfidentialLedger>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    ledgerName: string,
    confidentialLedger: ConfidentialLedger,
    options?: LedgerUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<ConfidentialLedger>, ConfidentialLedger>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    ledgerName: string,
    confidentialLedger: ConfidentialLedger,
    options?: LedgerUpdateOptionalParams,
  ) => Promise<ConfidentialLedger>;
  /** Creates a  Confidential Ledger with the specified ledger parameters. */
  create: (
    resourceGroupName: string,
    ledgerName: string,
    confidentialLedger: ConfidentialLedger,
    options?: LedgerCreateOptionalParams,
  ) => PollerLike<OperationState<ConfidentialLedger>, ConfidentialLedger>;
  /** @deprecated use create instead */
  beginCreate: (
    resourceGroupName: string,
    ledgerName: string,
    confidentialLedger: ConfidentialLedger,
    options?: LedgerCreateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<ConfidentialLedger>, ConfidentialLedger>>;
  /** @deprecated use create instead */
  beginCreateAndWait: (
    resourceGroupName: string,
    ledgerName: string,
    confidentialLedger: ConfidentialLedger,
    options?: LedgerCreateOptionalParams,
  ) => Promise<ConfidentialLedger>;
  /** Retrieves the properties of a Confidential Ledger. */
  get: (
    resourceGroupName: string,
    ledgerName: string,
    options?: LedgerGetOptionalParams,
  ) => Promise<ConfidentialLedger>;
}

function _getLedger(context: ConfidentialLedgerContext) {
  return {
    filesExport: (
      resourceGroupName: string,
      ledgerName: string,
      confidentialLedger: ConfidentialLedgerFilesExport,
      options?: LedgerFilesExportOptionalParams,
    ) => filesExport(context, resourceGroupName, ledgerName, confidentialLedger, options),
    beginFilesExport: async (
      resourceGroupName: string,
      ledgerName: string,
      confidentialLedger: ConfidentialLedgerFilesExport,
      options?: LedgerFilesExportOptionalParams,
    ) => {
      const poller = filesExport(
        context,
        resourceGroupName,
        ledgerName,
        confidentialLedger,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginFilesExportAndWait: async (
      resourceGroupName: string,
      ledgerName: string,
      confidentialLedger: ConfidentialLedgerFilesExport,
      options?: LedgerFilesExportOptionalParams,
    ) => {
      return await filesExport(context, resourceGroupName, ledgerName, confidentialLedger, options);
    },
    listBySubscription: (options?: LedgerListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: LedgerListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (resourceGroupName: string, ledgerName: string, options?: LedgerDeleteOptionalParams) =>
      $delete(context, resourceGroupName, ledgerName, options),
    beginDelete: async (
      resourceGroupName: string,
      ledgerName: string,
      options?: LedgerDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, ledgerName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      ledgerName: string,
      options?: LedgerDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, ledgerName, options);
    },
    update: (
      resourceGroupName: string,
      ledgerName: string,
      confidentialLedger: ConfidentialLedger,
      options?: LedgerUpdateOptionalParams,
    ) => update(context, resourceGroupName, ledgerName, confidentialLedger, options),
    beginUpdate: async (
      resourceGroupName: string,
      ledgerName: string,
      confidentialLedger: ConfidentialLedger,
      options?: LedgerUpdateOptionalParams,
    ) => {
      const poller = update(context, resourceGroupName, ledgerName, confidentialLedger, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      ledgerName: string,
      confidentialLedger: ConfidentialLedger,
      options?: LedgerUpdateOptionalParams,
    ) => {
      return await update(context, resourceGroupName, ledgerName, confidentialLedger, options);
    },
    create: (
      resourceGroupName: string,
      ledgerName: string,
      confidentialLedger: ConfidentialLedger,
      options?: LedgerCreateOptionalParams,
    ) => create(context, resourceGroupName, ledgerName, confidentialLedger, options),
    beginCreate: async (
      resourceGroupName: string,
      ledgerName: string,
      confidentialLedger: ConfidentialLedger,
      options?: LedgerCreateOptionalParams,
    ) => {
      const poller = create(context, resourceGroupName, ledgerName, confidentialLedger, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateAndWait: async (
      resourceGroupName: string,
      ledgerName: string,
      confidentialLedger: ConfidentialLedger,
      options?: LedgerCreateOptionalParams,
    ) => {
      return await create(context, resourceGroupName, ledgerName, confidentialLedger, options);
    },
    get: (resourceGroupName: string, ledgerName: string, options?: LedgerGetOptionalParams) =>
      get(context, resourceGroupName, ledgerName, options),
  };
}

export function _getLedgerOperations(context: ConfidentialLedgerContext): LedgerOperations {
  return {
    ..._getLedger(context),
  };
}

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { BillingManagementContext } from "../../api/billingManagementContext.js";
import {
  downloadDocumentsByBillingSubscription,
  get,
  downloadByBillingSubscription,
  listByBillingSubscription,
  getByBillingSubscription,
  listByBillingProfile,
  downloadDocumentsByBillingAccount,
  downloadSummaryByBillingAccount,
  downloadByBillingAccount,
  amend,
  listByBillingAccount,
  getByBillingAccount,
} from "../../api/invoices/operations.js";
import type {
  InvoicesDownloadDocumentsByBillingSubscriptionOptionalParams,
  InvoicesGetOptionalParams,
  InvoicesDownloadByBillingSubscriptionOptionalParams,
  InvoicesListByBillingSubscriptionOptionalParams,
  InvoicesGetByBillingSubscriptionOptionalParams,
  InvoicesListByBillingProfileOptionalParams,
  InvoicesDownloadDocumentsByBillingAccountOptionalParams,
  InvoicesDownloadSummaryByBillingAccountOptionalParams,
  InvoicesDownloadByBillingAccountOptionalParams,
  InvoicesAmendOptionalParams,
  InvoicesListByBillingAccountOptionalParams,
  InvoicesGetByBillingAccountOptionalParams,
} from "../../api/invoices/options.js";
import type {
  Invoice,
  DocumentDownloadResult,
  DocumentDownloadRequest,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Invoices operations. */
export interface InvoicesOperations {
  /** Gets a URL to download multiple invoice documents (invoice pdf, tax receipts, credit notes) as a zip file. The operation is supported for billing accounts with agreement type Microsoft Partner Agreement or Microsoft Customer Agreement. */
  downloadDocumentsByBillingSubscription: (
    parameters: DocumentDownloadRequest[],
    options?: InvoicesDownloadDocumentsByBillingSubscriptionOptionalParams,
  ) => PollerLike<OperationState<DocumentDownloadResult>, DocumentDownloadResult>;
  /** @deprecated use downloadDocumentsByBillingSubscription instead */
  beginDownloadDocumentsByBillingSubscription: (
    parameters: DocumentDownloadRequest[],
    options?: InvoicesDownloadDocumentsByBillingSubscriptionOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<DocumentDownloadResult>, DocumentDownloadResult>>;
  /** @deprecated use downloadDocumentsByBillingSubscription instead */
  beginDownloadDocumentsByBillingSubscriptionAndWait: (
    parameters: DocumentDownloadRequest[],
    options?: InvoicesDownloadDocumentsByBillingSubscriptionOptionalParams,
  ) => Promise<DocumentDownloadResult>;
  /** Gets an invoice by ID. The operation is supported for billing accounts with agreement type Microsoft Partner Agreement or Microsoft Customer Agreement. */
  get: (invoiceName: string, options?: InvoicesGetOptionalParams) => Promise<Invoice>;
  /** Gets a URL to download an invoice by billing subscription. The operation is supported for billing accounts with agreement type Microsoft Partner Agreement or Microsoft Customer Agreement. */
  downloadByBillingSubscription: (
    invoiceName: string,
    options?: InvoicesDownloadByBillingSubscriptionOptionalParams,
  ) => PollerLike<OperationState<DocumentDownloadResult>, DocumentDownloadResult>;
  /** @deprecated use downloadByBillingSubscription instead */
  beginDownloadByBillingSubscription: (
    invoiceName: string,
    options?: InvoicesDownloadByBillingSubscriptionOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<DocumentDownloadResult>, DocumentDownloadResult>>;
  /** @deprecated use downloadByBillingSubscription instead */
  beginDownloadByBillingSubscriptionAndWait: (
    invoiceName: string,
    options?: InvoicesDownloadByBillingSubscriptionOptionalParams,
  ) => Promise<DocumentDownloadResult>;
  /** Lists the invoices for a subscription. The operation is supported for billing accounts with agreement type Microsoft Partner Agreement or Microsoft Customer Agreement. */
  listByBillingSubscription: (
    options?: InvoicesListByBillingSubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<Invoice>;
  /** Gets an invoice by subscription ID and invoice ID. The operation is supported for billing accounts with agreement type Microsoft Partner Agreement or Microsoft Customer Agreement. */
  getByBillingSubscription: (
    invoiceName: string,
    options?: InvoicesGetByBillingSubscriptionOptionalParams,
  ) => Promise<Invoice>;
  /** Lists the invoices for a billing profile for a given start date and end date. The operation is supported for billing accounts with agreement type Microsoft Partner Agreement or Microsoft Customer Agreement. */
  listByBillingProfile: (
    billingAccountName: string,
    billingProfileName: string,
    options?: InvoicesListByBillingProfileOptionalParams,
  ) => PagedAsyncIterableIterator<Invoice>;
  /** Gets a URL to download multiple invoice documents (invoice pdf, tax receipts, credit notes) as a zip file. The operation is supported for billing accounts with agreement type Microsoft Partner Agreement or Microsoft Customer Agreement. */
  downloadDocumentsByBillingAccount: (
    billingAccountName: string,
    parameters: DocumentDownloadRequest[],
    options?: InvoicesDownloadDocumentsByBillingAccountOptionalParams,
  ) => PollerLike<OperationState<DocumentDownloadResult>, DocumentDownloadResult>;
  /** @deprecated use downloadDocumentsByBillingAccount instead */
  beginDownloadDocumentsByBillingAccount: (
    billingAccountName: string,
    parameters: DocumentDownloadRequest[],
    options?: InvoicesDownloadDocumentsByBillingAccountOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<DocumentDownloadResult>, DocumentDownloadResult>>;
  /** @deprecated use downloadDocumentsByBillingAccount instead */
  beginDownloadDocumentsByBillingAccountAndWait: (
    billingAccountName: string,
    parameters: DocumentDownloadRequest[],
    options?: InvoicesDownloadDocumentsByBillingAccountOptionalParams,
  ) => Promise<DocumentDownloadResult>;
  /** Gets a URL to download the summary document for an invoice. The operation is supported for billing accounts with agreement type Enterprise Agreement. */
  downloadSummaryByBillingAccount: (
    billingAccountName: string,
    invoiceName: string,
    options?: InvoicesDownloadSummaryByBillingAccountOptionalParams,
  ) => PollerLike<OperationState<DocumentDownloadResult>, DocumentDownloadResult>;
  /** @deprecated use downloadSummaryByBillingAccount instead */
  beginDownloadSummaryByBillingAccount: (
    billingAccountName: string,
    invoiceName: string,
    options?: InvoicesDownloadSummaryByBillingAccountOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<DocumentDownloadResult>, DocumentDownloadResult>>;
  /** @deprecated use downloadSummaryByBillingAccount instead */
  beginDownloadSummaryByBillingAccountAndWait: (
    billingAccountName: string,
    invoiceName: string,
    options?: InvoicesDownloadSummaryByBillingAccountOptionalParams,
  ) => Promise<DocumentDownloadResult>;
  /** Gets a URL to download an invoice document. The operation is supported for billing accounts with agreement type Microsoft Partner Agreement, Microsoft Customer Agreement or Enterprise Agreement. */
  downloadByBillingAccount: (
    billingAccountName: string,
    invoiceName: string,
    options?: InvoicesDownloadByBillingAccountOptionalParams,
  ) => PollerLike<OperationState<DocumentDownloadResult>, DocumentDownloadResult>;
  /** @deprecated use downloadByBillingAccount instead */
  beginDownloadByBillingAccount: (
    billingAccountName: string,
    invoiceName: string,
    options?: InvoicesDownloadByBillingAccountOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<DocumentDownloadResult>, DocumentDownloadResult>>;
  /** @deprecated use downloadByBillingAccount instead */
  beginDownloadByBillingAccountAndWait: (
    billingAccountName: string,
    invoiceName: string,
    options?: InvoicesDownloadByBillingAccountOptionalParams,
  ) => Promise<DocumentDownloadResult>;
  /** Regenerate an invoice by billing account name and invoice name. The operation is supported for billing accounts with agreement type Microsoft Customer Agreement. */
  amend: (
    billingAccountName: string,
    invoiceName: string,
    options?: InvoicesAmendOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use amend instead */
  beginAmend: (
    billingAccountName: string,
    invoiceName: string,
    options?: InvoicesAmendOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use amend instead */
  beginAmendAndWait: (
    billingAccountName: string,
    invoiceName: string,
    options?: InvoicesAmendOptionalParams,
  ) => Promise<void>;
  /** Lists the invoices for a billing account for a given start date and end date. The operation is supported for all billing account types. */
  listByBillingAccount: (
    billingAccountName: string,
    options?: InvoicesListByBillingAccountOptionalParams,
  ) => PagedAsyncIterableIterator<Invoice>;
  /** Gets an invoice by billing account name and ID. The operation is supported for all billing account types. */
  getByBillingAccount: (
    billingAccountName: string,
    invoiceName: string,
    options?: InvoicesGetByBillingAccountOptionalParams,
  ) => Promise<Invoice>;
}

function _getInvoices(context: BillingManagementContext) {
  return {
    downloadDocumentsByBillingSubscription: (
      parameters: DocumentDownloadRequest[],
      options?: InvoicesDownloadDocumentsByBillingSubscriptionOptionalParams,
    ) => downloadDocumentsByBillingSubscription(context, parameters, options),
    beginDownloadDocumentsByBillingSubscription: async (
      parameters: DocumentDownloadRequest[],
      options?: InvoicesDownloadDocumentsByBillingSubscriptionOptionalParams,
    ) => {
      const poller = downloadDocumentsByBillingSubscription(context, parameters, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDownloadDocumentsByBillingSubscriptionAndWait: async (
      parameters: DocumentDownloadRequest[],
      options?: InvoicesDownloadDocumentsByBillingSubscriptionOptionalParams,
    ) => {
      return await downloadDocumentsByBillingSubscription(context, parameters, options);
    },
    get: (invoiceName: string, options?: InvoicesGetOptionalParams) =>
      get(context, invoiceName, options),
    downloadByBillingSubscription: (
      invoiceName: string,
      options?: InvoicesDownloadByBillingSubscriptionOptionalParams,
    ) => downloadByBillingSubscription(context, invoiceName, options),
    beginDownloadByBillingSubscription: async (
      invoiceName: string,
      options?: InvoicesDownloadByBillingSubscriptionOptionalParams,
    ) => {
      const poller = downloadByBillingSubscription(context, invoiceName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDownloadByBillingSubscriptionAndWait: async (
      invoiceName: string,
      options?: InvoicesDownloadByBillingSubscriptionOptionalParams,
    ) => {
      return await downloadByBillingSubscription(context, invoiceName, options);
    },
    listByBillingSubscription: (options?: InvoicesListByBillingSubscriptionOptionalParams) =>
      listByBillingSubscription(context, options),
    getByBillingSubscription: (
      invoiceName: string,
      options?: InvoicesGetByBillingSubscriptionOptionalParams,
    ) => getByBillingSubscription(context, invoiceName, options),
    listByBillingProfile: (
      billingAccountName: string,
      billingProfileName: string,
      options?: InvoicesListByBillingProfileOptionalParams,
    ) => listByBillingProfile(context, billingAccountName, billingProfileName, options),
    downloadDocumentsByBillingAccount: (
      billingAccountName: string,
      parameters: DocumentDownloadRequest[],
      options?: InvoicesDownloadDocumentsByBillingAccountOptionalParams,
    ) => downloadDocumentsByBillingAccount(context, billingAccountName, parameters, options),
    beginDownloadDocumentsByBillingAccount: async (
      billingAccountName: string,
      parameters: DocumentDownloadRequest[],
      options?: InvoicesDownloadDocumentsByBillingAccountOptionalParams,
    ) => {
      const poller = downloadDocumentsByBillingAccount(
        context,
        billingAccountName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDownloadDocumentsByBillingAccountAndWait: async (
      billingAccountName: string,
      parameters: DocumentDownloadRequest[],
      options?: InvoicesDownloadDocumentsByBillingAccountOptionalParams,
    ) => {
      return await downloadDocumentsByBillingAccount(
        context,
        billingAccountName,
        parameters,
        options,
      );
    },
    downloadSummaryByBillingAccount: (
      billingAccountName: string,
      invoiceName: string,
      options?: InvoicesDownloadSummaryByBillingAccountOptionalParams,
    ) => downloadSummaryByBillingAccount(context, billingAccountName, invoiceName, options),
    beginDownloadSummaryByBillingAccount: async (
      billingAccountName: string,
      invoiceName: string,
      options?: InvoicesDownloadSummaryByBillingAccountOptionalParams,
    ) => {
      const poller = downloadSummaryByBillingAccount(
        context,
        billingAccountName,
        invoiceName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDownloadSummaryByBillingAccountAndWait: async (
      billingAccountName: string,
      invoiceName: string,
      options?: InvoicesDownloadSummaryByBillingAccountOptionalParams,
    ) => {
      return await downloadSummaryByBillingAccount(
        context,
        billingAccountName,
        invoiceName,
        options,
      );
    },
    downloadByBillingAccount: (
      billingAccountName: string,
      invoiceName: string,
      options?: InvoicesDownloadByBillingAccountOptionalParams,
    ) => downloadByBillingAccount(context, billingAccountName, invoiceName, options),
    beginDownloadByBillingAccount: async (
      billingAccountName: string,
      invoiceName: string,
      options?: InvoicesDownloadByBillingAccountOptionalParams,
    ) => {
      const poller = downloadByBillingAccount(context, billingAccountName, invoiceName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDownloadByBillingAccountAndWait: async (
      billingAccountName: string,
      invoiceName: string,
      options?: InvoicesDownloadByBillingAccountOptionalParams,
    ) => {
      return await downloadByBillingAccount(context, billingAccountName, invoiceName, options);
    },
    amend: (
      billingAccountName: string,
      invoiceName: string,
      options?: InvoicesAmendOptionalParams,
    ) => amend(context, billingAccountName, invoiceName, options),
    beginAmend: async (
      billingAccountName: string,
      invoiceName: string,
      options?: InvoicesAmendOptionalParams,
    ) => {
      const poller = amend(context, billingAccountName, invoiceName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginAmendAndWait: async (
      billingAccountName: string,
      invoiceName: string,
      options?: InvoicesAmendOptionalParams,
    ) => {
      return await amend(context, billingAccountName, invoiceName, options);
    },
    listByBillingAccount: (
      billingAccountName: string,
      options?: InvoicesListByBillingAccountOptionalParams,
    ) => listByBillingAccount(context, billingAccountName, options),
    getByBillingAccount: (
      billingAccountName: string,
      invoiceName: string,
      options?: InvoicesGetByBillingAccountOptionalParams,
    ) => getByBillingAccount(context, billingAccountName, invoiceName, options),
  };
}

export function _getInvoicesOperations(context: BillingManagementContext): InvoicesOperations {
  return {
    ..._getInvoices(context),
  };
}

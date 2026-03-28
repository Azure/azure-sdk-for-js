// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { BillingManagementContext } from "../../api/billingManagementContext.js";
import {
  validateDeleteEligibility,
  listByBillingProfile,
  $delete,
  createOrUpdate,
  get,
} from "../../api/invoiceSections/operations.js";
import type {
  InvoiceSectionsValidateDeleteEligibilityOptionalParams,
  InvoiceSectionsListByBillingProfileOptionalParams,
  InvoiceSectionsDeleteOptionalParams,
  InvoiceSectionsCreateOrUpdateOptionalParams,
  InvoiceSectionsGetOptionalParams,
} from "../../api/invoiceSections/options.js";
import type { InvoiceSection, DeleteInvoiceSectionEligibilityResult } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a InvoiceSections operations. */
export interface InvoiceSectionsOperations {
  /** Validates if the invoice section can be deleted. The operation is supported for billing accounts with agreement type Microsoft Customer Agreement. */
  validateDeleteEligibility: (
    billingAccountName: string,
    billingProfileName: string,
    invoiceSectionName: string,
    options?: InvoiceSectionsValidateDeleteEligibilityOptionalParams,
  ) => Promise<DeleteInvoiceSectionEligibilityResult>;
  /** Lists the invoice sections that a user has access to. The operation is supported only for billing accounts with agreement type Microsoft Customer Agreement. */
  listByBillingProfile: (
    billingAccountName: string,
    billingProfileName: string,
    options?: InvoiceSectionsListByBillingProfileOptionalParams,
  ) => PagedAsyncIterableIterator<InvoiceSection>;
  /** Deletes an invoice section. The operation is supported for billing accounts with agreement type Microsoft Customer Agreement. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    billingAccountName: string,
    billingProfileName: string,
    invoiceSectionName: string,
    options?: InvoiceSectionsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    billingAccountName: string,
    billingProfileName: string,
    invoiceSectionName: string,
    options?: InvoiceSectionsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    billingAccountName: string,
    billingProfileName: string,
    invoiceSectionName: string,
    options?: InvoiceSectionsDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates an invoice section. The operation is supported only for billing accounts with agreement type Microsoft Customer Agreement. */
  createOrUpdate: (
    billingAccountName: string,
    billingProfileName: string,
    invoiceSectionName: string,
    parameters: InvoiceSection,
    options?: InvoiceSectionsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<InvoiceSection>, InvoiceSection>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    billingAccountName: string,
    billingProfileName: string,
    invoiceSectionName: string,
    parameters: InvoiceSection,
    options?: InvoiceSectionsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<InvoiceSection>, InvoiceSection>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    billingAccountName: string,
    billingProfileName: string,
    invoiceSectionName: string,
    parameters: InvoiceSection,
    options?: InvoiceSectionsCreateOrUpdateOptionalParams,
  ) => Promise<InvoiceSection>;
  /** Gets an invoice section by its ID. The operation is supported only for billing accounts with agreement type Microsoft Customer Agreement. */
  get: (
    billingAccountName: string,
    billingProfileName: string,
    invoiceSectionName: string,
    options?: InvoiceSectionsGetOptionalParams,
  ) => Promise<InvoiceSection>;
}

function _getInvoiceSections(context: BillingManagementContext) {
  return {
    validateDeleteEligibility: (
      billingAccountName: string,
      billingProfileName: string,
      invoiceSectionName: string,
      options?: InvoiceSectionsValidateDeleteEligibilityOptionalParams,
    ) =>
      validateDeleteEligibility(
        context,
        billingAccountName,
        billingProfileName,
        invoiceSectionName,
        options,
      ),
    listByBillingProfile: (
      billingAccountName: string,
      billingProfileName: string,
      options?: InvoiceSectionsListByBillingProfileOptionalParams,
    ) => listByBillingProfile(context, billingAccountName, billingProfileName, options),
    delete: (
      billingAccountName: string,
      billingProfileName: string,
      invoiceSectionName: string,
      options?: InvoiceSectionsDeleteOptionalParams,
    ) => $delete(context, billingAccountName, billingProfileName, invoiceSectionName, options),
    beginDelete: async (
      billingAccountName: string,
      billingProfileName: string,
      invoiceSectionName: string,
      options?: InvoiceSectionsDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        billingAccountName,
        billingProfileName,
        invoiceSectionName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      billingAccountName: string,
      billingProfileName: string,
      invoiceSectionName: string,
      options?: InvoiceSectionsDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        billingAccountName,
        billingProfileName,
        invoiceSectionName,
        options,
      );
    },
    createOrUpdate: (
      billingAccountName: string,
      billingProfileName: string,
      invoiceSectionName: string,
      parameters: InvoiceSection,
      options?: InvoiceSectionsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        billingAccountName,
        billingProfileName,
        invoiceSectionName,
        parameters,
        options,
      ),
    beginCreateOrUpdate: async (
      billingAccountName: string,
      billingProfileName: string,
      invoiceSectionName: string,
      parameters: InvoiceSection,
      options?: InvoiceSectionsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        billingAccountName,
        billingProfileName,
        invoiceSectionName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      billingAccountName: string,
      billingProfileName: string,
      invoiceSectionName: string,
      parameters: InvoiceSection,
      options?: InvoiceSectionsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        billingAccountName,
        billingProfileName,
        invoiceSectionName,
        parameters,
        options,
      );
    },
    get: (
      billingAccountName: string,
      billingProfileName: string,
      invoiceSectionName: string,
      options?: InvoiceSectionsGetOptionalParams,
    ) => get(context, billingAccountName, billingProfileName, invoiceSectionName, options),
  };
}

export function _getInvoiceSectionsOperations(
  context: BillingManagementContext,
): InvoiceSectionsOperations {
  return {
    ..._getInvoiceSections(context),
  };
}

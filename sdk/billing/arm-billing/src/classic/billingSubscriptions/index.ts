// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { BillingManagementContext } from "../../api/billingManagementContext.js";
import {
  listByInvoiceSection,
  listByEnrollmentAccount,
  listByCustomerAtBillingAccount,
  listByCustomer,
  validateMoveEligibility,
  split,
  move,
  merge,
  cancel,
  listByBillingAccount,
  $delete,
  update,
  get,
  listByBillingProfile,
  getByBillingProfile,
} from "../../api/billingSubscriptions/operations.js";
import type {
  BillingSubscriptionsListByInvoiceSectionOptionalParams,
  BillingSubscriptionsListByEnrollmentAccountOptionalParams,
  BillingSubscriptionsListByCustomerAtBillingAccountOptionalParams,
  BillingSubscriptionsListByCustomerOptionalParams,
  BillingSubscriptionsValidateMoveEligibilityOptionalParams,
  BillingSubscriptionsSplitOptionalParams,
  BillingSubscriptionsMoveOptionalParams,
  BillingSubscriptionsMergeOptionalParams,
  BillingSubscriptionsCancelOptionalParams,
  BillingSubscriptionsListByBillingAccountOptionalParams,
  BillingSubscriptionsDeleteOptionalParams,
  BillingSubscriptionsUpdateOptionalParams,
  BillingSubscriptionsGetOptionalParams,
  BillingSubscriptionsListByBillingProfileOptionalParams,
  BillingSubscriptionsGetByBillingProfileOptionalParams,
} from "../../api/billingSubscriptions/options.js";
import type {
  BillingSubscription,
  BillingSubscriptionPatch,
  CancelSubscriptionRequest,
  BillingSubscriptionMergeRequest,
  MoveBillingSubscriptionRequest,
  BillingSubscriptionSplitRequest,
  MoveBillingSubscriptionEligibilityResult,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a BillingSubscriptions operations. */
export interface BillingSubscriptionsOperations {
  /** Lists the subscriptions that are billed to an invoice section. The operation is supported only for billing accounts with agreement type Microsoft Customer Agreement. */
  listByInvoiceSection: (
    billingAccountName: string,
    billingProfileName: string,
    invoiceSectionName: string,
    options?: BillingSubscriptionsListByInvoiceSectionOptionalParams,
  ) => PagedAsyncIterableIterator<BillingSubscription>;
  /** Lists the subscriptions for an enrollment account. The operation is supported for billing accounts with agreement type Enterprise Agreement. */
  listByEnrollmentAccount: (
    billingAccountName: string,
    enrollmentAccountName: string,
    options?: BillingSubscriptionsListByEnrollmentAccountOptionalParams,
  ) => PagedAsyncIterableIterator<BillingSubscription>;
  /** Lists the subscriptions for a customer at billing account level. The operation is supported only for billing accounts with agreement type Microsoft Partner Agreement. */
  listByCustomerAtBillingAccount: (
    billingAccountName: string,
    customerName: string,
    options?: BillingSubscriptionsListByCustomerAtBillingAccountOptionalParams,
  ) => PagedAsyncIterableIterator<BillingSubscription>;
  /** Lists the subscriptions for a customer. The operation is supported only for billing accounts with agreement type Microsoft Partner Agreement. */
  listByCustomer: (
    billingAccountName: string,
    billingProfileName: string,
    customerName: string,
    options?: BillingSubscriptionsListByCustomerOptionalParams,
  ) => PagedAsyncIterableIterator<BillingSubscription>;
  /** Validates if charges for a subscription can be moved to a new invoice section. This operation is supported for billing accounts with agreement type Microsoft Customer Agreement. */
  validateMoveEligibility: (
    billingAccountName: string,
    billingSubscriptionName: string,
    parameters: MoveBillingSubscriptionRequest,
    options?: BillingSubscriptionsValidateMoveEligibilityOptionalParams,
  ) => Promise<MoveBillingSubscriptionEligibilityResult>;
  /** Splits a subscription into a new subscription with quantity less than current subscription quantity and not equal to 0. */
  split: (
    billingAccountName: string,
    billingSubscriptionName: string,
    parameters: BillingSubscriptionSplitRequest,
    options?: BillingSubscriptionsSplitOptionalParams,
  ) => PollerLike<OperationState<BillingSubscription>, BillingSubscription>;
  /** @deprecated use split instead */
  beginSplit: (
    billingAccountName: string,
    billingSubscriptionName: string,
    parameters: BillingSubscriptionSplitRequest,
    options?: BillingSubscriptionsSplitOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<BillingSubscription>, BillingSubscription>>;
  /** @deprecated use split instead */
  beginSplitAndWait: (
    billingAccountName: string,
    billingSubscriptionName: string,
    parameters: BillingSubscriptionSplitRequest,
    options?: BillingSubscriptionsSplitOptionalParams,
  ) => Promise<BillingSubscription>;
  /** Moves charges for a subscription to a new invoice section. The new invoice section must belong to the same billing profile as the existing invoice section. This operation is supported for billing accounts with agreement type Microsoft Customer Agreement. */
  move: (
    billingAccountName: string,
    billingSubscriptionName: string,
    parameters: MoveBillingSubscriptionRequest,
    options?: BillingSubscriptionsMoveOptionalParams,
  ) => PollerLike<OperationState<BillingSubscription>, BillingSubscription>;
  /** @deprecated use move instead */
  beginMove: (
    billingAccountName: string,
    billingSubscriptionName: string,
    parameters: MoveBillingSubscriptionRequest,
    options?: BillingSubscriptionsMoveOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<BillingSubscription>, BillingSubscription>>;
  /** @deprecated use move instead */
  beginMoveAndWait: (
    billingAccountName: string,
    billingSubscriptionName: string,
    parameters: MoveBillingSubscriptionRequest,
    options?: BillingSubscriptionsMoveOptionalParams,
  ) => Promise<BillingSubscription>;
  /** Merges the billing subscription provided in the request with a target billing subscription. */
  merge: (
    billingAccountName: string,
    billingSubscriptionName: string,
    parameters: BillingSubscriptionMergeRequest,
    options?: BillingSubscriptionsMergeOptionalParams,
  ) => PollerLike<OperationState<BillingSubscription>, BillingSubscription>;
  /** @deprecated use merge instead */
  beginMerge: (
    billingAccountName: string,
    billingSubscriptionName: string,
    parameters: BillingSubscriptionMergeRequest,
    options?: BillingSubscriptionsMergeOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<BillingSubscription>, BillingSubscription>>;
  /** @deprecated use merge instead */
  beginMergeAndWait: (
    billingAccountName: string,
    billingSubscriptionName: string,
    parameters: BillingSubscriptionMergeRequest,
    options?: BillingSubscriptionsMergeOptionalParams,
  ) => Promise<BillingSubscription>;
  /** Cancels a usage-based subscription. This operation is supported only for billing accounts of type Microsoft Partner Agreement. */
  cancel: (
    billingAccountName: string,
    billingSubscriptionName: string,
    parameters: CancelSubscriptionRequest,
    options?: BillingSubscriptionsCancelOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use cancel instead */
  beginCancel: (
    billingAccountName: string,
    billingSubscriptionName: string,
    parameters: CancelSubscriptionRequest,
    options?: BillingSubscriptionsCancelOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use cancel instead */
  beginCancelAndWait: (
    billingAccountName: string,
    billingSubscriptionName: string,
    parameters: CancelSubscriptionRequest,
    options?: BillingSubscriptionsCancelOptionalParams,
  ) => Promise<void>;
  /** Lists the subscriptions for a billing account. */
  listByBillingAccount: (
    billingAccountName: string,
    options?: BillingSubscriptionsListByBillingAccountOptionalParams,
  ) => PagedAsyncIterableIterator<BillingSubscription>;
  /** Cancels a billing subscription. This operation is supported only for billing accounts of type Microsoft Partner Agreement or Microsoft Customer Agreement. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    billingAccountName: string,
    billingSubscriptionName: string,
    options?: BillingSubscriptionsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    billingAccountName: string,
    billingSubscriptionName: string,
    options?: BillingSubscriptionsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    billingAccountName: string,
    billingSubscriptionName: string,
    options?: BillingSubscriptionsDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates the properties of a billing subscription. */
  update: (
    billingAccountName: string,
    billingSubscriptionName: string,
    parameters: BillingSubscriptionPatch,
    options?: BillingSubscriptionsUpdateOptionalParams,
  ) => PollerLike<OperationState<BillingSubscription>, BillingSubscription>;
  /** @deprecated use update instead */
  beginUpdate: (
    billingAccountName: string,
    billingSubscriptionName: string,
    parameters: BillingSubscriptionPatch,
    options?: BillingSubscriptionsUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<BillingSubscription>, BillingSubscription>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    billingAccountName: string,
    billingSubscriptionName: string,
    parameters: BillingSubscriptionPatch,
    options?: BillingSubscriptionsUpdateOptionalParams,
  ) => Promise<BillingSubscription>;
  /** Gets a subscription by its ID. The operation is supported for billing accounts with agreement type Microsoft Customer Agreement,  Microsoft Partner Agreement, and Enterprise Agreement. */
  get: (
    billingAccountName: string,
    billingSubscriptionName: string,
    options?: BillingSubscriptionsGetOptionalParams,
  ) => Promise<BillingSubscription>;
  /** Lists the subscriptions that are billed to a billing profile. The operation is supported for billing accounts with agreement type Microsoft Customer Agreement or Microsoft Partner Agreement. */
  listByBillingProfile: (
    billingAccountName: string,
    billingProfileName: string,
    options?: BillingSubscriptionsListByBillingProfileOptionalParams,
  ) => PagedAsyncIterableIterator<BillingSubscription>;
  /** Gets a subscription by its billing profile and ID. The operation is supported for billing accounts with agreement type Enterprise Agreement. */
  getByBillingProfile: (
    billingAccountName: string,
    billingProfileName: string,
    billingSubscriptionName: string,
    options?: BillingSubscriptionsGetByBillingProfileOptionalParams,
  ) => Promise<BillingSubscription>;
}

function _getBillingSubscriptions(context: BillingManagementContext) {
  return {
    listByInvoiceSection: (
      billingAccountName: string,
      billingProfileName: string,
      invoiceSectionName: string,
      options?: BillingSubscriptionsListByInvoiceSectionOptionalParams,
    ) =>
      listByInvoiceSection(
        context,
        billingAccountName,
        billingProfileName,
        invoiceSectionName,
        options,
      ),
    listByEnrollmentAccount: (
      billingAccountName: string,
      enrollmentAccountName: string,
      options?: BillingSubscriptionsListByEnrollmentAccountOptionalParams,
    ) => listByEnrollmentAccount(context, billingAccountName, enrollmentAccountName, options),
    listByCustomerAtBillingAccount: (
      billingAccountName: string,
      customerName: string,
      options?: BillingSubscriptionsListByCustomerAtBillingAccountOptionalParams,
    ) => listByCustomerAtBillingAccount(context, billingAccountName, customerName, options),
    listByCustomer: (
      billingAccountName: string,
      billingProfileName: string,
      customerName: string,
      options?: BillingSubscriptionsListByCustomerOptionalParams,
    ) => listByCustomer(context, billingAccountName, billingProfileName, customerName, options),
    validateMoveEligibility: (
      billingAccountName: string,
      billingSubscriptionName: string,
      parameters: MoveBillingSubscriptionRequest,
      options?: BillingSubscriptionsValidateMoveEligibilityOptionalParams,
    ) =>
      validateMoveEligibility(
        context,
        billingAccountName,
        billingSubscriptionName,
        parameters,
        options,
      ),
    split: (
      billingAccountName: string,
      billingSubscriptionName: string,
      parameters: BillingSubscriptionSplitRequest,
      options?: BillingSubscriptionsSplitOptionalParams,
    ) => split(context, billingAccountName, billingSubscriptionName, parameters, options),
    beginSplit: async (
      billingAccountName: string,
      billingSubscriptionName: string,
      parameters: BillingSubscriptionSplitRequest,
      options?: BillingSubscriptionsSplitOptionalParams,
    ) => {
      const poller = split(
        context,
        billingAccountName,
        billingSubscriptionName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginSplitAndWait: async (
      billingAccountName: string,
      billingSubscriptionName: string,
      parameters: BillingSubscriptionSplitRequest,
      options?: BillingSubscriptionsSplitOptionalParams,
    ) => {
      return await split(context, billingAccountName, billingSubscriptionName, parameters, options);
    },
    move: (
      billingAccountName: string,
      billingSubscriptionName: string,
      parameters: MoveBillingSubscriptionRequest,
      options?: BillingSubscriptionsMoveOptionalParams,
    ) => move(context, billingAccountName, billingSubscriptionName, parameters, options),
    beginMove: async (
      billingAccountName: string,
      billingSubscriptionName: string,
      parameters: MoveBillingSubscriptionRequest,
      options?: BillingSubscriptionsMoveOptionalParams,
    ) => {
      const poller = move(
        context,
        billingAccountName,
        billingSubscriptionName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginMoveAndWait: async (
      billingAccountName: string,
      billingSubscriptionName: string,
      parameters: MoveBillingSubscriptionRequest,
      options?: BillingSubscriptionsMoveOptionalParams,
    ) => {
      return await move(context, billingAccountName, billingSubscriptionName, parameters, options);
    },
    merge: (
      billingAccountName: string,
      billingSubscriptionName: string,
      parameters: BillingSubscriptionMergeRequest,
      options?: BillingSubscriptionsMergeOptionalParams,
    ) => merge(context, billingAccountName, billingSubscriptionName, parameters, options),
    beginMerge: async (
      billingAccountName: string,
      billingSubscriptionName: string,
      parameters: BillingSubscriptionMergeRequest,
      options?: BillingSubscriptionsMergeOptionalParams,
    ) => {
      const poller = merge(
        context,
        billingAccountName,
        billingSubscriptionName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginMergeAndWait: async (
      billingAccountName: string,
      billingSubscriptionName: string,
      parameters: BillingSubscriptionMergeRequest,
      options?: BillingSubscriptionsMergeOptionalParams,
    ) => {
      return await merge(context, billingAccountName, billingSubscriptionName, parameters, options);
    },
    cancel: (
      billingAccountName: string,
      billingSubscriptionName: string,
      parameters: CancelSubscriptionRequest,
      options?: BillingSubscriptionsCancelOptionalParams,
    ) => cancel(context, billingAccountName, billingSubscriptionName, parameters, options),
    beginCancel: async (
      billingAccountName: string,
      billingSubscriptionName: string,
      parameters: CancelSubscriptionRequest,
      options?: BillingSubscriptionsCancelOptionalParams,
    ) => {
      const poller = cancel(
        context,
        billingAccountName,
        billingSubscriptionName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCancelAndWait: async (
      billingAccountName: string,
      billingSubscriptionName: string,
      parameters: CancelSubscriptionRequest,
      options?: BillingSubscriptionsCancelOptionalParams,
    ) => {
      return await cancel(
        context,
        billingAccountName,
        billingSubscriptionName,
        parameters,
        options,
      );
    },
    listByBillingAccount: (
      billingAccountName: string,
      options?: BillingSubscriptionsListByBillingAccountOptionalParams,
    ) => listByBillingAccount(context, billingAccountName, options),
    delete: (
      billingAccountName: string,
      billingSubscriptionName: string,
      options?: BillingSubscriptionsDeleteOptionalParams,
    ) => $delete(context, billingAccountName, billingSubscriptionName, options),
    beginDelete: async (
      billingAccountName: string,
      billingSubscriptionName: string,
      options?: BillingSubscriptionsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, billingAccountName, billingSubscriptionName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      billingAccountName: string,
      billingSubscriptionName: string,
      options?: BillingSubscriptionsDeleteOptionalParams,
    ) => {
      return await $delete(context, billingAccountName, billingSubscriptionName, options);
    },
    update: (
      billingAccountName: string,
      billingSubscriptionName: string,
      parameters: BillingSubscriptionPatch,
      options?: BillingSubscriptionsUpdateOptionalParams,
    ) => update(context, billingAccountName, billingSubscriptionName, parameters, options),
    beginUpdate: async (
      billingAccountName: string,
      billingSubscriptionName: string,
      parameters: BillingSubscriptionPatch,
      options?: BillingSubscriptionsUpdateOptionalParams,
    ) => {
      const poller = update(
        context,
        billingAccountName,
        billingSubscriptionName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      billingAccountName: string,
      billingSubscriptionName: string,
      parameters: BillingSubscriptionPatch,
      options?: BillingSubscriptionsUpdateOptionalParams,
    ) => {
      return await update(
        context,
        billingAccountName,
        billingSubscriptionName,
        parameters,
        options,
      );
    },
    get: (
      billingAccountName: string,
      billingSubscriptionName: string,
      options?: BillingSubscriptionsGetOptionalParams,
    ) => get(context, billingAccountName, billingSubscriptionName, options),
    listByBillingProfile: (
      billingAccountName: string,
      billingProfileName: string,
      options?: BillingSubscriptionsListByBillingProfileOptionalParams,
    ) => listByBillingProfile(context, billingAccountName, billingProfileName, options),
    getByBillingProfile: (
      billingAccountName: string,
      billingProfileName: string,
      billingSubscriptionName: string,
      options?: BillingSubscriptionsGetByBillingProfileOptionalParams,
    ) =>
      getByBillingProfile(
        context,
        billingAccountName,
        billingProfileName,
        billingSubscriptionName,
        options,
      ),
  };
}

export function _getBillingSubscriptionsOperations(
  context: BillingManagementContext,
): BillingSubscriptionsOperations {
  return {
    ..._getBillingSubscriptions(context),
  };
}

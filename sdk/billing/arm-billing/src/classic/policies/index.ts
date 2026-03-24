// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { BillingManagementContext } from "../../api/billingManagementContext.js";
import {
  getBySubscription,
  createOrUpdateByBillingAccount,
  getByBillingAccount,
  createOrUpdateByBillingProfile,
  getByBillingProfile,
  getByCustomer,
  createOrUpdateByCustomer,
  createOrUpdateByCustomerAtBillingAccount,
  getByCustomerAtBillingAccount,
} from "../../api/policies/operations.js";
import type {
  PoliciesGetBySubscriptionOptionalParams,
  PoliciesCreateOrUpdateByBillingAccountOptionalParams,
  PoliciesGetByBillingAccountOptionalParams,
  PoliciesCreateOrUpdateByBillingProfileOptionalParams,
  PoliciesGetByBillingProfileOptionalParams,
  PoliciesGetByCustomerOptionalParams,
  PoliciesCreateOrUpdateByCustomerOptionalParams,
  PoliciesCreateOrUpdateByCustomerAtBillingAccountOptionalParams,
  PoliciesGetByCustomerAtBillingAccountOptionalParams,
} from "../../api/policies/options.js";
import type {
  CustomerPolicy,
  ServiceDefinedResourceName,
  BillingProfilePolicy,
  BillingAccountPolicy,
  SubscriptionPolicy,
} from "../../models/models.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Policies operations. */
export interface PoliciesOperations {
  /** Lists the policies that are managed by the Billing Admin for the defined subscriptions. This is supported for Microsoft Online Services Program, Microsoft Customer Agreement and Microsoft Partner Agreement. */
  getBySubscription: (
    options?: PoliciesGetBySubscriptionOptionalParams,
  ) => Promise<SubscriptionPolicy>;
  /** Update the policies for a billing account of Enterprise Agreement type. */
  createOrUpdateByBillingAccount: (
    billingAccountName: string,
    parameters: BillingAccountPolicy,
    options?: PoliciesCreateOrUpdateByBillingAccountOptionalParams,
  ) => PollerLike<OperationState<BillingAccountPolicy>, BillingAccountPolicy>;
  /** @deprecated use createOrUpdateByBillingAccount instead */
  beginCreateOrUpdateByBillingAccount: (
    billingAccountName: string,
    parameters: BillingAccountPolicy,
    options?: PoliciesCreateOrUpdateByBillingAccountOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<BillingAccountPolicy>, BillingAccountPolicy>>;
  /** @deprecated use createOrUpdateByBillingAccount instead */
  beginCreateOrUpdateByBillingAccountAndWait: (
    billingAccountName: string,
    parameters: BillingAccountPolicy,
    options?: PoliciesCreateOrUpdateByBillingAccountOptionalParams,
  ) => Promise<BillingAccountPolicy>;
  /** Get the policies for a billing account of Enterprise Agreement type. */
  getByBillingAccount: (
    billingAccountName: string,
    options?: PoliciesGetByBillingAccountOptionalParams,
  ) => Promise<BillingAccountPolicy>;
  /** Updates the policies for a billing profile. This operation is supported only for billing accounts with agreement type Microsoft Customer Agreement. */
  createOrUpdateByBillingProfile: (
    billingAccountName: string,
    billingProfileName: string,
    parameters: BillingProfilePolicy,
    options?: PoliciesCreateOrUpdateByBillingProfileOptionalParams,
  ) => PollerLike<OperationState<BillingProfilePolicy>, BillingProfilePolicy>;
  /** @deprecated use createOrUpdateByBillingProfile instead */
  beginCreateOrUpdateByBillingProfile: (
    billingAccountName: string,
    billingProfileName: string,
    parameters: BillingProfilePolicy,
    options?: PoliciesCreateOrUpdateByBillingProfileOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<BillingProfilePolicy>, BillingProfilePolicy>>;
  /** @deprecated use createOrUpdateByBillingProfile instead */
  beginCreateOrUpdateByBillingProfileAndWait: (
    billingAccountName: string,
    billingProfileName: string,
    parameters: BillingProfilePolicy,
    options?: PoliciesCreateOrUpdateByBillingProfileOptionalParams,
  ) => Promise<BillingProfilePolicy>;
  /** Lists the policies for a billing profile. This operation is supported only for billing accounts with agreement type Microsoft Customer Agreement. */
  getByBillingProfile: (
    billingAccountName: string,
    billingProfileName: string,
    options?: PoliciesGetByBillingProfileOptionalParams,
  ) => Promise<BillingProfilePolicy>;
  /** Lists the policies for a customer. This operation is supported only for billing accounts with agreement type Microsoft Partner Agreement. */
  getByCustomer: (
    billingAccountName: string,
    billingProfileName: string,
    customerName: string,
    policyName: ServiceDefinedResourceName,
    options?: PoliciesGetByCustomerOptionalParams,
  ) => Promise<CustomerPolicy>;
  /** Updates the policies for a customer. This operation is supported only for billing accounts with agreement type Microsoft Partner Agreement. */
  createOrUpdateByCustomer: (
    billingAccountName: string,
    billingProfileName: string,
    customerName: string,
    parameters: CustomerPolicy,
    options?: PoliciesCreateOrUpdateByCustomerOptionalParams,
  ) => PollerLike<OperationState<CustomerPolicy>, CustomerPolicy>;
  /** @deprecated use createOrUpdateByCustomer instead */
  beginCreateOrUpdateByCustomer: (
    billingAccountName: string,
    billingProfileName: string,
    customerName: string,
    parameters: CustomerPolicy,
    options?: PoliciesCreateOrUpdateByCustomerOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<CustomerPolicy>, CustomerPolicy>>;
  /** @deprecated use createOrUpdateByCustomer instead */
  beginCreateOrUpdateByCustomerAndWait: (
    billingAccountName: string,
    billingProfileName: string,
    customerName: string,
    parameters: CustomerPolicy,
    options?: PoliciesCreateOrUpdateByCustomerOptionalParams,
  ) => Promise<CustomerPolicy>;
  /** Updates the policies for a customer at billing account scope. This operation is supported only for billing accounts with agreement type Microsoft Partner Agreement. */
  createOrUpdateByCustomerAtBillingAccount: (
    billingAccountName: string,
    customerName: string,
    parameters: CustomerPolicy,
    options?: PoliciesCreateOrUpdateByCustomerAtBillingAccountOptionalParams,
  ) => PollerLike<OperationState<CustomerPolicy>, CustomerPolicy>;
  /** @deprecated use createOrUpdateByCustomerAtBillingAccount instead */
  beginCreateOrUpdateByCustomerAtBillingAccount: (
    billingAccountName: string,
    customerName: string,
    parameters: CustomerPolicy,
    options?: PoliciesCreateOrUpdateByCustomerAtBillingAccountOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<CustomerPolicy>, CustomerPolicy>>;
  /** @deprecated use createOrUpdateByCustomerAtBillingAccount instead */
  beginCreateOrUpdateByCustomerAtBillingAccountAndWait: (
    billingAccountName: string,
    customerName: string,
    parameters: CustomerPolicy,
    options?: PoliciesCreateOrUpdateByCustomerAtBillingAccountOptionalParams,
  ) => Promise<CustomerPolicy>;
  /** Lists the policies for a customer at billing account scope. This operation is supported only for billing accounts with agreement type Microsoft Partner Agreement. */
  getByCustomerAtBillingAccount: (
    billingAccountName: string,
    customerName: string,
    options?: PoliciesGetByCustomerAtBillingAccountOptionalParams,
  ) => Promise<CustomerPolicy>;
}

function _getPolicies(context: BillingManagementContext) {
  return {
    getBySubscription: (options?: PoliciesGetBySubscriptionOptionalParams) =>
      getBySubscription(context, options),
    createOrUpdateByBillingAccount: (
      billingAccountName: string,
      parameters: BillingAccountPolicy,
      options?: PoliciesCreateOrUpdateByBillingAccountOptionalParams,
    ) => createOrUpdateByBillingAccount(context, billingAccountName, parameters, options),
    beginCreateOrUpdateByBillingAccount: async (
      billingAccountName: string,
      parameters: BillingAccountPolicy,
      options?: PoliciesCreateOrUpdateByBillingAccountOptionalParams,
    ) => {
      const poller = createOrUpdateByBillingAccount(
        context,
        billingAccountName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateByBillingAccountAndWait: async (
      billingAccountName: string,
      parameters: BillingAccountPolicy,
      options?: PoliciesCreateOrUpdateByBillingAccountOptionalParams,
    ) => {
      return await createOrUpdateByBillingAccount(context, billingAccountName, parameters, options);
    },
    getByBillingAccount: (
      billingAccountName: string,
      options?: PoliciesGetByBillingAccountOptionalParams,
    ) => getByBillingAccount(context, billingAccountName, options),
    createOrUpdateByBillingProfile: (
      billingAccountName: string,
      billingProfileName: string,
      parameters: BillingProfilePolicy,
      options?: PoliciesCreateOrUpdateByBillingProfileOptionalParams,
    ) =>
      createOrUpdateByBillingProfile(
        context,
        billingAccountName,
        billingProfileName,
        parameters,
        options,
      ),
    beginCreateOrUpdateByBillingProfile: async (
      billingAccountName: string,
      billingProfileName: string,
      parameters: BillingProfilePolicy,
      options?: PoliciesCreateOrUpdateByBillingProfileOptionalParams,
    ) => {
      const poller = createOrUpdateByBillingProfile(
        context,
        billingAccountName,
        billingProfileName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateByBillingProfileAndWait: async (
      billingAccountName: string,
      billingProfileName: string,
      parameters: BillingProfilePolicy,
      options?: PoliciesCreateOrUpdateByBillingProfileOptionalParams,
    ) => {
      return await createOrUpdateByBillingProfile(
        context,
        billingAccountName,
        billingProfileName,
        parameters,
        options,
      );
    },
    getByBillingProfile: (
      billingAccountName: string,
      billingProfileName: string,
      options?: PoliciesGetByBillingProfileOptionalParams,
    ) => getByBillingProfile(context, billingAccountName, billingProfileName, options),
    getByCustomer: (
      billingAccountName: string,
      billingProfileName: string,
      customerName: string,
      policyName: ServiceDefinedResourceName,
      options?: PoliciesGetByCustomerOptionalParams,
    ) =>
      getByCustomer(
        context,
        billingAccountName,
        billingProfileName,
        customerName,
        policyName,
        options,
      ),
    createOrUpdateByCustomer: (
      billingAccountName: string,
      billingProfileName: string,
      customerName: string,
      parameters: CustomerPolicy,
      options?: PoliciesCreateOrUpdateByCustomerOptionalParams,
    ) =>
      createOrUpdateByCustomer(
        context,
        billingAccountName,
        billingProfileName,
        customerName,
        parameters,
        options,
      ),
    beginCreateOrUpdateByCustomer: async (
      billingAccountName: string,
      billingProfileName: string,
      customerName: string,
      parameters: CustomerPolicy,
      options?: PoliciesCreateOrUpdateByCustomerOptionalParams,
    ) => {
      const poller = createOrUpdateByCustomer(
        context,
        billingAccountName,
        billingProfileName,
        customerName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateByCustomerAndWait: async (
      billingAccountName: string,
      billingProfileName: string,
      customerName: string,
      parameters: CustomerPolicy,
      options?: PoliciesCreateOrUpdateByCustomerOptionalParams,
    ) => {
      return await createOrUpdateByCustomer(
        context,
        billingAccountName,
        billingProfileName,
        customerName,
        parameters,
        options,
      );
    },
    createOrUpdateByCustomerAtBillingAccount: (
      billingAccountName: string,
      customerName: string,
      parameters: CustomerPolicy,
      options?: PoliciesCreateOrUpdateByCustomerAtBillingAccountOptionalParams,
    ) =>
      createOrUpdateByCustomerAtBillingAccount(
        context,
        billingAccountName,
        customerName,
        parameters,
        options,
      ),
    beginCreateOrUpdateByCustomerAtBillingAccount: async (
      billingAccountName: string,
      customerName: string,
      parameters: CustomerPolicy,
      options?: PoliciesCreateOrUpdateByCustomerAtBillingAccountOptionalParams,
    ) => {
      const poller = createOrUpdateByCustomerAtBillingAccount(
        context,
        billingAccountName,
        customerName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateByCustomerAtBillingAccountAndWait: async (
      billingAccountName: string,
      customerName: string,
      parameters: CustomerPolicy,
      options?: PoliciesCreateOrUpdateByCustomerAtBillingAccountOptionalParams,
    ) => {
      return await createOrUpdateByCustomerAtBillingAccount(
        context,
        billingAccountName,
        customerName,
        parameters,
        options,
      );
    },
    getByCustomerAtBillingAccount: (
      billingAccountName: string,
      customerName: string,
      options?: PoliciesGetByCustomerAtBillingAccountOptionalParams,
    ) => getByCustomerAtBillingAccount(context, billingAccountName, customerName, options),
  };
}

export function _getPoliciesOperations(context: BillingManagementContext): PoliciesOperations {
  return {
    ..._getPolicies(context),
  };
}

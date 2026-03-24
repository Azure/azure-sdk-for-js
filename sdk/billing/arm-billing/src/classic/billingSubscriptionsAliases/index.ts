// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { BillingManagementContext } from "../../api/billingManagementContext.js";
import {
  listByBillingAccount,
  createOrUpdate,
  get,
} from "../../api/billingSubscriptionsAliases/operations.js";
import type {
  BillingSubscriptionsAliasesListByBillingAccountOptionalParams,
  BillingSubscriptionsAliasesCreateOrUpdateOptionalParams,
  BillingSubscriptionsAliasesGetOptionalParams,
} from "../../api/billingSubscriptionsAliases/options.js";
import type { BillingSubscriptionAlias } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a BillingSubscriptionsAliases operations. */
export interface BillingSubscriptionsAliasesOperations {
  /** Lists the subscription aliases for a billing account. The operation is supported for seat based billing subscriptions. */
  listByBillingAccount: (
    billingAccountName: string,
    options?: BillingSubscriptionsAliasesListByBillingAccountOptionalParams,
  ) => PagedAsyncIterableIterator<BillingSubscriptionAlias>;
  /** Creates or updates a billing subscription by its alias ID.  The operation is supported for seat based billing subscriptions. */
  createOrUpdate: (
    billingAccountName: string,
    aliasName: string,
    parameters: BillingSubscriptionAlias,
    options?: BillingSubscriptionsAliasesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<BillingSubscriptionAlias>, BillingSubscriptionAlias>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    billingAccountName: string,
    aliasName: string,
    parameters: BillingSubscriptionAlias,
    options?: BillingSubscriptionsAliasesCreateOrUpdateOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<BillingSubscriptionAlias>, BillingSubscriptionAlias>
  >;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    billingAccountName: string,
    aliasName: string,
    parameters: BillingSubscriptionAlias,
    options?: BillingSubscriptionsAliasesCreateOrUpdateOptionalParams,
  ) => Promise<BillingSubscriptionAlias>;
  /** Gets a subscription by its alias ID.  The operation is supported for seat based billing subscriptions. */
  get: (
    billingAccountName: string,
    aliasName: string,
    options?: BillingSubscriptionsAliasesGetOptionalParams,
  ) => Promise<BillingSubscriptionAlias>;
}

function _getBillingSubscriptionsAliases(context: BillingManagementContext) {
  return {
    listByBillingAccount: (
      billingAccountName: string,
      options?: BillingSubscriptionsAliasesListByBillingAccountOptionalParams,
    ) => listByBillingAccount(context, billingAccountName, options),
    createOrUpdate: (
      billingAccountName: string,
      aliasName: string,
      parameters: BillingSubscriptionAlias,
      options?: BillingSubscriptionsAliasesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, billingAccountName, aliasName, parameters, options),
    beginCreateOrUpdate: async (
      billingAccountName: string,
      aliasName: string,
      parameters: BillingSubscriptionAlias,
      options?: BillingSubscriptionsAliasesCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(context, billingAccountName, aliasName, parameters, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      billingAccountName: string,
      aliasName: string,
      parameters: BillingSubscriptionAlias,
      options?: BillingSubscriptionsAliasesCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(context, billingAccountName, aliasName, parameters, options);
    },
    get: (
      billingAccountName: string,
      aliasName: string,
      options?: BillingSubscriptionsAliasesGetOptionalParams,
    ) => get(context, billingAccountName, aliasName, options),
  };
}

export function _getBillingSubscriptionsAliasesOperations(
  context: BillingManagementContext,
): BillingSubscriptionsAliasesOperations {
  return {
    ..._getBillingSubscriptionsAliases(context),
  };
}

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SubscriptionContext } from "../../api/subscriptionContext.js";
import {
  listPolicyForTenant,
  addUpdatePolicyForTenant,
  getPolicyForTenant,
} from "../../api/subscriptionPolicy/operations.js";
import type {
  SubscriptionPolicyListPolicyForTenantOptionalParams,
  SubscriptionPolicyAddUpdatePolicyForTenantOptionalParams,
  SubscriptionPolicyGetPolicyForTenantOptionalParams,
} from "../../api/subscriptionPolicy/options.js";
import type {
  GetTenantPolicyResponse,
  PutTenantPolicyRequestProperties,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a SubscriptionPolicy operations. */
export interface SubscriptionPolicyOperations {
  /** Get the subscription tenant policy for the user's tenant. */
  listPolicyForTenant: (
    options?: SubscriptionPolicyListPolicyForTenantOptionalParams,
  ) => PagedAsyncIterableIterator<GetTenantPolicyResponse>;
  /** Create or Update Subscription tenant policy for user's tenant. */
  addUpdatePolicyForTenant: (
    body: PutTenantPolicyRequestProperties,
    options?: SubscriptionPolicyAddUpdatePolicyForTenantOptionalParams,
  ) => Promise<GetTenantPolicyResponse>;
  /** Get the subscription tenant policy for the user's tenant. */
  getPolicyForTenant: (
    options?: SubscriptionPolicyGetPolicyForTenantOptionalParams,
  ) => Promise<GetTenantPolicyResponse>;
}

function _getSubscriptionPolicy(context: SubscriptionContext) {
  return {
    listPolicyForTenant: (options?: SubscriptionPolicyListPolicyForTenantOptionalParams) =>
      listPolicyForTenant(context, options),
    addUpdatePolicyForTenant: (
      body: PutTenantPolicyRequestProperties,
      options?: SubscriptionPolicyAddUpdatePolicyForTenantOptionalParams,
    ) => addUpdatePolicyForTenant(context, body, options),
    getPolicyForTenant: (options?: SubscriptionPolicyGetPolicyForTenantOptionalParams) =>
      getPolicyForTenant(context, options),
  };
}

export function _getSubscriptionPolicyOperations(
  context: SubscriptionContext,
): SubscriptionPolicyOperations {
  return {
    ..._getSubscriptionPolicy(context),
  };
}

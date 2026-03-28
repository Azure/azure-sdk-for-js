// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SubscriptionContext } from "../../api/subscriptionContext.js";
import { list } from "../../api/tenants/operations.js";
import type { TenantsListOptionalParams } from "../../api/tenants/options.js";
import type { TenantIdDescription } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Tenants operations. */
export interface TenantsOperations {
  /** Gets the tenants for your account. */
  list: (options?: TenantsListOptionalParams) => PagedAsyncIterableIterator<TenantIdDescription>;
}

function _getTenants(context: SubscriptionContext) {
  return {
    list: (options?: TenantsListOptionalParams) => list(context, options),
  };
}

export function _getTenantsOperations(context: SubscriptionContext): TenantsOperations {
  return {
    ..._getTenants(context),
  };
}

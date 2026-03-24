// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { BillingManagementContext } from "../../api/billingManagementContext.js";
import {
  listByBillingAccount,
  $delete,
  createOrUpdate,
  get,
} from "../../api/associatedTenants/operations.js";
import type {
  AssociatedTenantsListByBillingAccountOptionalParams,
  AssociatedTenantsDeleteOptionalParams,
  AssociatedTenantsCreateOrUpdateOptionalParams,
  AssociatedTenantsGetOptionalParams,
} from "../../api/associatedTenants/options.js";
import type { AssociatedTenant } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a AssociatedTenants operations. */
export interface AssociatedTenantsOperations {
  /** Lists the associated tenants that can collaborate with the billing account on commerce activities like viewing and downloading invoices, managing payments, making purchases, and managing or provisioning licenses. */
  listByBillingAccount: (
    billingAccountName: string,
    options?: AssociatedTenantsListByBillingAccountOptionalParams,
  ) => PagedAsyncIterableIterator<AssociatedTenant>;
  /** Deletes an associated tenant for a billing account. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    billingAccountName: string,
    associatedTenantName: string,
    options?: AssociatedTenantsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    billingAccountName: string,
    associatedTenantName: string,
    options?: AssociatedTenantsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    billingAccountName: string,
    associatedTenantName: string,
    options?: AssociatedTenantsDeleteOptionalParams,
  ) => Promise<void>;
  /** Create or update an associated tenant for the billing account. */
  createOrUpdate: (
    billingAccountName: string,
    associatedTenantName: string,
    parameters: AssociatedTenant,
    options?: AssociatedTenantsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<AssociatedTenant>, AssociatedTenant>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    billingAccountName: string,
    associatedTenantName: string,
    parameters: AssociatedTenant,
    options?: AssociatedTenantsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<AssociatedTenant>, AssociatedTenant>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    billingAccountName: string,
    associatedTenantName: string,
    parameters: AssociatedTenant,
    options?: AssociatedTenantsCreateOrUpdateOptionalParams,
  ) => Promise<AssociatedTenant>;
  /** Gets an associated tenant by ID. */
  get: (
    billingAccountName: string,
    associatedTenantName: string,
    options?: AssociatedTenantsGetOptionalParams,
  ) => Promise<AssociatedTenant>;
}

function _getAssociatedTenants(context: BillingManagementContext) {
  return {
    listByBillingAccount: (
      billingAccountName: string,
      options?: AssociatedTenantsListByBillingAccountOptionalParams,
    ) => listByBillingAccount(context, billingAccountName, options),
    delete: (
      billingAccountName: string,
      associatedTenantName: string,
      options?: AssociatedTenantsDeleteOptionalParams,
    ) => $delete(context, billingAccountName, associatedTenantName, options),
    beginDelete: async (
      billingAccountName: string,
      associatedTenantName: string,
      options?: AssociatedTenantsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, billingAccountName, associatedTenantName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      billingAccountName: string,
      associatedTenantName: string,
      options?: AssociatedTenantsDeleteOptionalParams,
    ) => {
      return await $delete(context, billingAccountName, associatedTenantName, options);
    },
    createOrUpdate: (
      billingAccountName: string,
      associatedTenantName: string,
      parameters: AssociatedTenant,
      options?: AssociatedTenantsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, billingAccountName, associatedTenantName, parameters, options),
    beginCreateOrUpdate: async (
      billingAccountName: string,
      associatedTenantName: string,
      parameters: AssociatedTenant,
      options?: AssociatedTenantsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        billingAccountName,
        associatedTenantName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      billingAccountName: string,
      associatedTenantName: string,
      parameters: AssociatedTenant,
      options?: AssociatedTenantsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        billingAccountName,
        associatedTenantName,
        parameters,
        options,
      );
    },
    get: (
      billingAccountName: string,
      associatedTenantName: string,
      options?: AssociatedTenantsGetOptionalParams,
    ) => get(context, billingAccountName, associatedTenantName, options),
  };
}

export function _getAssociatedTenantsOperations(
  context: BillingManagementContext,
): AssociatedTenantsOperations {
  return {
    ..._getAssociatedTenants(context),
  };
}

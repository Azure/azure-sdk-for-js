// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { BillingManagementContext } from "../../api/billingManagementContext.js";
import {
  validateDeleteEligibility,
  listByBillingAccount,
  $delete,
  createOrUpdate,
  get,
} from "../../api/billingProfiles/operations.js";
import type {
  BillingProfilesValidateDeleteEligibilityOptionalParams,
  BillingProfilesListByBillingAccountOptionalParams,
  BillingProfilesDeleteOptionalParams,
  BillingProfilesCreateOrUpdateOptionalParams,
  BillingProfilesGetOptionalParams,
} from "../../api/billingProfiles/options.js";
import type { BillingProfile, DeleteBillingProfileEligibilityResult } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a BillingProfiles operations. */
export interface BillingProfilesOperations {
  /** Validates if the billing profile can be deleted. The operation is supported for billing accounts with agreement type Microsoft Customer Agreement and Microsoft Partner Agreement. */
  validateDeleteEligibility: (
    billingAccountName: string,
    billingProfileName: string,
    options?: BillingProfilesValidateDeleteEligibilityOptionalParams,
  ) => Promise<DeleteBillingProfileEligibilityResult>;
  /** Lists the billing profiles that a user has access to. The operation is supported for billing accounts with agreement of type Microsoft Customer Agreement and Microsoft Partner Agreement. */
  listByBillingAccount: (
    billingAccountName: string,
    options?: BillingProfilesListByBillingAccountOptionalParams,
  ) => PagedAsyncIterableIterator<BillingProfile>;
  /** Deletes a billing profile. The operation is supported for billing accounts with agreement type Microsoft Customer Agreement and Microsoft Partner Agreement. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    billingAccountName: string,
    billingProfileName: string,
    options?: BillingProfilesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    billingAccountName: string,
    billingProfileName: string,
    options?: BillingProfilesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    billingAccountName: string,
    billingProfileName: string,
    options?: BillingProfilesDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates a billing profile. The operation is supported for billing accounts with agreement type Microsoft Customer Agreement and Microsoft Partner Agreement. If you are a MCA Individual (Pay-as-you-go) customer, then please use the Azure portal experience to create the billing profile. */
  createOrUpdate: (
    billingAccountName: string,
    billingProfileName: string,
    parameters: BillingProfile,
    options?: BillingProfilesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<BillingProfile>, BillingProfile>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    billingAccountName: string,
    billingProfileName: string,
    parameters: BillingProfile,
    options?: BillingProfilesCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<BillingProfile>, BillingProfile>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    billingAccountName: string,
    billingProfileName: string,
    parameters: BillingProfile,
    options?: BillingProfilesCreateOrUpdateOptionalParams,
  ) => Promise<BillingProfile>;
  /** Gets a billing profile by its ID. The operation is supported for billing accounts with agreement type Microsoft Customer Agreement and Microsoft Partner Agreement. */
  get: (
    billingAccountName: string,
    billingProfileName: string,
    options?: BillingProfilesGetOptionalParams,
  ) => Promise<BillingProfile>;
}

function _getBillingProfiles(context: BillingManagementContext) {
  return {
    validateDeleteEligibility: (
      billingAccountName: string,
      billingProfileName: string,
      options?: BillingProfilesValidateDeleteEligibilityOptionalParams,
    ) => validateDeleteEligibility(context, billingAccountName, billingProfileName, options),
    listByBillingAccount: (
      billingAccountName: string,
      options?: BillingProfilesListByBillingAccountOptionalParams,
    ) => listByBillingAccount(context, billingAccountName, options),
    delete: (
      billingAccountName: string,
      billingProfileName: string,
      options?: BillingProfilesDeleteOptionalParams,
    ) => $delete(context, billingAccountName, billingProfileName, options),
    beginDelete: async (
      billingAccountName: string,
      billingProfileName: string,
      options?: BillingProfilesDeleteOptionalParams,
    ) => {
      const poller = $delete(context, billingAccountName, billingProfileName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      billingAccountName: string,
      billingProfileName: string,
      options?: BillingProfilesDeleteOptionalParams,
    ) => {
      return await $delete(context, billingAccountName, billingProfileName, options);
    },
    createOrUpdate: (
      billingAccountName: string,
      billingProfileName: string,
      parameters: BillingProfile,
      options?: BillingProfilesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, billingAccountName, billingProfileName, parameters, options),
    beginCreateOrUpdate: async (
      billingAccountName: string,
      billingProfileName: string,
      parameters: BillingProfile,
      options?: BillingProfilesCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        billingAccountName,
        billingProfileName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      billingAccountName: string,
      billingProfileName: string,
      parameters: BillingProfile,
      options?: BillingProfilesCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        billingAccountName,
        billingProfileName,
        parameters,
        options,
      );
    },
    get: (
      billingAccountName: string,
      billingProfileName: string,
      options?: BillingProfilesGetOptionalParams,
    ) => get(context, billingAccountName, billingProfileName, options),
  };
}

export function _getBillingProfilesOperations(
  context: BillingManagementContext,
): BillingProfilesOperations {
  return {
    ..._getBillingProfiles(context),
  };
}

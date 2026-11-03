// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BillingBenefitsRPContext } from "../../api/billingBenefitsRPContext.js";
import {
  listFromApplicableConditionalCredit,
  listFromPrimary,
  getFromPrimary,
} from "../../api/conditionalCreditContributors/operations.js";
import {
  ConditionalCreditContributorsListFromApplicableConditionalCreditOptionalParams,
  ConditionalCreditContributorsListFromPrimaryOptionalParams,
  ConditionalCreditContributorsGetFromPrimaryOptionalParams,
} from "../../api/conditionalCreditContributors/options.js";
import { ConditionalCreditContributor } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ConditionalCreditContributors operations. */
export interface ConditionalCreditContributorsOperations {
  /** List contributors under applicable conditional credits for a given billing account. */
  listFromApplicableConditionalCredit: (
    billingAccountId: string,
    systemId: string,
    options?: ConditionalCreditContributorsListFromApplicableConditionalCreditOptionalParams,
  ) => PagedAsyncIterableIterator<ConditionalCreditContributor>;
  /** List contributors under a primary conditional credit for primary service admin */
  listFromPrimary: (
    resourceGroupName: string,
    conditionalCreditName: string,
    options?: ConditionalCreditContributorsListFromPrimaryOptionalParams,
  ) => PagedAsyncIterableIterator<ConditionalCreditContributor>;
  /** Get a conditional credit contributor for primary service admin */
  getFromPrimary: (
    resourceGroupName: string,
    conditionalCreditName: string,
    contributorName: string,
    options?: ConditionalCreditContributorsGetFromPrimaryOptionalParams,
  ) => Promise<ConditionalCreditContributor>;
}

function _getConditionalCreditContributors(context: BillingBenefitsRPContext) {
  return {
    listFromApplicableConditionalCredit: (
      billingAccountId: string,
      systemId: string,
      options?: ConditionalCreditContributorsListFromApplicableConditionalCreditOptionalParams,
    ) => listFromApplicableConditionalCredit(context, billingAccountId, systemId, options),
    listFromPrimary: (
      resourceGroupName: string,
      conditionalCreditName: string,
      options?: ConditionalCreditContributorsListFromPrimaryOptionalParams,
    ) => listFromPrimary(context, resourceGroupName, conditionalCreditName, options),
    getFromPrimary: (
      resourceGroupName: string,
      conditionalCreditName: string,
      contributorName: string,
      options?: ConditionalCreditContributorsGetFromPrimaryOptionalParams,
    ) =>
      getFromPrimary(context, resourceGroupName, conditionalCreditName, contributorName, options),
  };
}

export function _getConditionalCreditContributorsOperations(
  context: BillingBenefitsRPContext,
): ConditionalCreditContributorsOperations {
  return {
    ..._getConditionalCreditContributors(context),
  };
}

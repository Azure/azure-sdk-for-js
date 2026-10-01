// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BillingBenefitsRPContext } from "../../api/billingBenefitsRPContext.js";
import {
  listFromApplicableMacc,
  listFromPrimary,
  getFromPrimary,
} from "../../api/contributors/operations.js";
import {
  ContributorsListFromApplicableMaccOptionalParams,
  ContributorsListFromPrimaryOptionalParams,
  ContributorsGetFromPrimaryOptionalParams,
} from "../../api/contributors/options.js";
import { Contributor } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Contributors operations. */
export interface ContributorsOperations {
  /** List contributors under applicable MACCs for a given billing account. */
  listFromApplicableMacc: (
    billingAccountId: string,
    systemId: string,
    options?: ContributorsListFromApplicableMaccOptionalParams,
  ) => PagedAsyncIterableIterator<Contributor>;
  /** List contributors under a MACC for primary service admin */
  listFromPrimary: (
    resourceGroupName: string,
    maccName: string,
    options?: ContributorsListFromPrimaryOptionalParams,
  ) => PagedAsyncIterableIterator<Contributor>;
  /** Get a contributor for primary service admin */
  getFromPrimary: (
    resourceGroupName: string,
    maccName: string,
    contributorName: string,
    options?: ContributorsGetFromPrimaryOptionalParams,
  ) => Promise<Contributor>;
}

function _getContributors(context: BillingBenefitsRPContext) {
  return {
    listFromApplicableMacc: (
      billingAccountId: string,
      systemId: string,
      options?: ContributorsListFromApplicableMaccOptionalParams,
    ) => listFromApplicableMacc(context, billingAccountId, systemId, options),
    listFromPrimary: (
      resourceGroupName: string,
      maccName: string,
      options?: ContributorsListFromPrimaryOptionalParams,
    ) => listFromPrimary(context, resourceGroupName, maccName, options),
    getFromPrimary: (
      resourceGroupName: string,
      maccName: string,
      contributorName: string,
      options?: ContributorsGetFromPrimaryOptionalParams,
    ) => getFromPrimary(context, resourceGroupName, maccName, contributorName, options),
  };
}

export function _getContributorsOperations(
  context: BillingBenefitsRPContext,
): ContributorsOperations {
  return {
    ..._getContributors(context),
  };
}

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CdnManagementContext } from "../../api/cdnManagementContext.js";
import {
  listResourceUsage,
  listByProfile,
  $delete,
  create,
  get,
} from "../../api/ruleSets/operations.js";
import type {
  RuleSetsListResourceUsageOptionalParams,
  RuleSetsListByProfileOptionalParams,
  RuleSetsDeleteOptionalParams,
  RuleSetsCreateOptionalParams,
  RuleSetsGetOptionalParams,
} from "../../api/ruleSets/options.js";
import type { Usage, RuleSet } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a RuleSets operations. */
export interface RuleSetsOperations {
  /** Checks the quota and actual usage of endpoints under the given Azure Front Door profile. */
  listResourceUsage: (
    resourceGroupName: string,
    profileName: string,
    ruleSetName: string,
    options?: RuleSetsListResourceUsageOptionalParams,
  ) => PagedAsyncIterableIterator<Usage>;
  /** Lists existing AzureFrontDoor rule sets within a profile. */
  listByProfile: (
    resourceGroupName: string,
    profileName: string,
    options?: RuleSetsListByProfileOptionalParams,
  ) => PagedAsyncIterableIterator<RuleSet>;
  /** Deletes an existing AzureFrontDoor rule set with the specified rule set name under the specified subscription, resource group and profile. */
  delete: (
    resourceGroupName: string,
    profileName: string,
    ruleSetName: string,
    options?: RuleSetsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Creates or update a batch rule set within the specified profile along with the rules associate to it. */
  create: (
    resourceGroupName: string,
    profileName: string,
    ruleSetName: string,
    options?: RuleSetsCreateOptionalParams,
  ) => PollerLike<OperationState<RuleSet>, RuleSet>;
  /** Gets an existing AzureFrontDoor rule set with the specified rule set name under the specified subscription, resource group and profile. */
  get: (
    resourceGroupName: string,
    profileName: string,
    ruleSetName: string,
    options?: RuleSetsGetOptionalParams,
  ) => Promise<RuleSet>;
}

function _getRuleSets(context: CdnManagementContext) {
  return {
    listResourceUsage: (
      resourceGroupName: string,
      profileName: string,
      ruleSetName: string,
      options?: RuleSetsListResourceUsageOptionalParams,
    ) => listResourceUsage(context, resourceGroupName, profileName, ruleSetName, options),
    listByProfile: (
      resourceGroupName: string,
      profileName: string,
      options?: RuleSetsListByProfileOptionalParams,
    ) => listByProfile(context, resourceGroupName, profileName, options),
    delete: (
      resourceGroupName: string,
      profileName: string,
      ruleSetName: string,
      options?: RuleSetsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, profileName, ruleSetName, options),
    create: (
      resourceGroupName: string,
      profileName: string,
      ruleSetName: string,
      options?: RuleSetsCreateOptionalParams,
    ) => create(context, resourceGroupName, profileName, ruleSetName, options),
    get: (
      resourceGroupName: string,
      profileName: string,
      ruleSetName: string,
      options?: RuleSetsGetOptionalParams,
    ) => get(context, resourceGroupName, profileName, ruleSetName, options),
  };
}

export function _getRuleSetsOperations(context: CdnManagementContext): RuleSetsOperations {
  return {
    ..._getRuleSets(context),
  };
}

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CostManagementContext } from "../../api/costManagementContext.js";
import {
  checkNameAvailability,
  list,
  $delete,
  createOrUpdate,
  get,
} from "../../api/costAllocationRules/operations.js";
import {
  CostAllocationRulesCheckNameAvailabilityOptionalParams,
  CostAllocationRulesListOptionalParams,
  CostAllocationRulesDeleteOptionalParams,
  CostAllocationRulesCreateOrUpdateOptionalParams,
  CostAllocationRulesGetOptionalParams,
} from "../../api/costAllocationRules/options.js";
import {
  CostAllocationRuleDefinition,
  CostAllocationRuleCheckNameAvailabilityRequest,
  CostAllocationRuleCheckNameAvailabilityResponse,
} from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a CostAllocationRules operations. */
export interface CostAllocationRulesOperations {
  /** Checks availability and correctness of a name for a cost allocation rule */
  checkNameAvailability: (
    billingAccountId: string,
    costAllocationRuleCheckNameAvailabilityRequest: CostAllocationRuleCheckNameAvailabilityRequest,
    options?: CostAllocationRulesCheckNameAvailabilityOptionalParams,
  ) => Promise<CostAllocationRuleCheckNameAvailabilityResponse>;
  /** Get the list of all cost allocation rules for a billing account or enterprise enrollment. */
  list: (
    billingAccountId: string,
    options?: CostAllocationRulesListOptionalParams,
  ) => PagedAsyncIterableIterator<CostAllocationRuleDefinition>;
  /** Delete cost allocation rule for billing account or enterprise enrollment. */
  delete: (
    billingAccountId: string,
    ruleName: string,
    options?: CostAllocationRulesDeleteOptionalParams,
  ) => Promise<void>;
  /** Create/Update a rule to allocate cost between different resources within a billing account or enterprise enrollment. */
  createOrUpdate: (
    billingAccountId: string,
    ruleName: string,
    costAllocationRule: CostAllocationRuleDefinition,
    options?: CostAllocationRulesCreateOrUpdateOptionalParams,
  ) => Promise<CostAllocationRuleDefinition>;
  /** Get a cost allocation rule by rule name and billing account or enterprise enrollment. */
  get: (
    billingAccountId: string,
    ruleName: string,
    options?: CostAllocationRulesGetOptionalParams,
  ) => Promise<CostAllocationRuleDefinition>;
}

function _getCostAllocationRules(context: CostManagementContext) {
  return {
    checkNameAvailability: (
      billingAccountId: string,
      costAllocationRuleCheckNameAvailabilityRequest: CostAllocationRuleCheckNameAvailabilityRequest,
      options?: CostAllocationRulesCheckNameAvailabilityOptionalParams,
    ) =>
      checkNameAvailability(
        context,
        billingAccountId,
        costAllocationRuleCheckNameAvailabilityRequest,
        options,
      ),
    list: (billingAccountId: string, options?: CostAllocationRulesListOptionalParams) =>
      list(context, billingAccountId, options),
    delete: (
      billingAccountId: string,
      ruleName: string,
      options?: CostAllocationRulesDeleteOptionalParams,
    ) => $delete(context, billingAccountId, ruleName, options),
    createOrUpdate: (
      billingAccountId: string,
      ruleName: string,
      costAllocationRule: CostAllocationRuleDefinition,
      options?: CostAllocationRulesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, billingAccountId, ruleName, costAllocationRule, options),
    get: (
      billingAccountId: string,
      ruleName: string,
      options?: CostAllocationRulesGetOptionalParams,
    ) => get(context, billingAccountId, ruleName, options),
  };
}

export function _getCostAllocationRulesOperations(
  context: CostManagementContext,
): CostAllocationRulesOperations {
  return {
    ..._getCostAllocationRules(context),
  };
}

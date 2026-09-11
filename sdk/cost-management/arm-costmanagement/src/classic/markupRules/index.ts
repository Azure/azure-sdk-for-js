// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CostManagementContext } from "../../api/costManagementContext.js";
import { list, $delete, createOrUpdate, get } from "../../api/markupRules/operations.js";
import type {
  MarkupRulesListOptionalParams,
  MarkupRulesDeleteOptionalParams,
  MarkupRulesCreateOrUpdateOptionalParams,
  MarkupRulesGetOptionalParams,
} from "../../api/markupRules/options.js";
import type { MarkupRule } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a MarkupRules operations. */
export interface MarkupRulesOperations {
  /** List all markup rules for a billing account and billing profile. */
  list: (
    billingAccountId: string,
    billingProfileId: string,
    options?: MarkupRulesListOptionalParams,
  ) => PagedAsyncIterableIterator<MarkupRule>;
  /** Delete a markup rule for a billing account and billing profile. */
  delete: (
    billingAccountId: string,
    billingProfileId: string,
    ruleName: string,
    options?: MarkupRulesDeleteOptionalParams,
  ) => Promise<void>;
  /** Create or update a markup rule for a billing account and billing profile. */
  createOrUpdate: (
    billingAccountId: string,
    billingProfileId: string,
    ruleName: string,
    resource: MarkupRule,
    options?: MarkupRulesCreateOrUpdateOptionalParams,
  ) => Promise<MarkupRule>;
  /** Get a markup rule by name for a billing account and billing profile. */
  get: (
    billingAccountId: string,
    billingProfileId: string,
    ruleName: string,
    options?: MarkupRulesGetOptionalParams,
  ) => Promise<MarkupRule>;
}
function _getMarkupRules(context: CostManagementContext) {
  return {
    list: (
      billingAccountId: string,
      billingProfileId: string,
      options?: MarkupRulesListOptionalParams,
    ) => list(context, billingAccountId, billingProfileId, options),
    delete: (
      billingAccountId: string,
      billingProfileId: string,
      ruleName: string,
      options?: MarkupRulesDeleteOptionalParams,
    ) => $delete(context, billingAccountId, billingProfileId, ruleName, options),
    createOrUpdate: (
      billingAccountId: string,
      billingProfileId: string,
      ruleName: string,
      resource: MarkupRule,
      options?: MarkupRulesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, billingAccountId, billingProfileId, ruleName, resource, options),
    get: (
      billingAccountId: string,
      billingProfileId: string,
      ruleName: string,
      options?: MarkupRulesGetOptionalParams,
    ) => get(context, billingAccountId, billingProfileId, ruleName, options),
  };
}
export function _getMarkupRulesOperations(context: CostManagementContext): MarkupRulesOperations {
  return {
    ..._getMarkupRules(context),
  };
}

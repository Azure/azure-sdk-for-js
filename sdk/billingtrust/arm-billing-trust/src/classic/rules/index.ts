// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { BillingTrustContext } from "../../api/billingTrustContext.js";
import { update, createOrUpdate, list, get } from "../../api/rules/operations.js";
import type {
  RulesUpdateOptionalParams,
  RulesCreateOrUpdateOptionalParams,
  RulesListOptionalParams,
  RulesGetOptionalParams,
} from "../../api/rules/options.js";
import type { Rule, RulePatchPropertiesUnion } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Rules operations. */
export interface RulesOperations {
  /** Update a Rule. The PATCH body is discriminated by `kind` and must match the existing rule's kind. For `eduQualification` rules, only `supplementalDocuments` is patchable, and only when `evaluationState == actionRequired`. For `businessVerification` rules, the patchable fields are `supplementalDocuments` and `externalId`, and only when `evaluationState` is `pending` or `actionRequired`. All other field/state combinations are rejected with 400 InvalidParameterValue or 409 RuleNotActionable. */
  update: (
    resourceUri: string,
    ruleName: string,
    properties: RulePatchPropertiesUnion,
    options?: RulesUpdateOptionalParams,
  ) => Promise<Rule>;
  /**
   * Create or update a Rule. **This operation is required for RPaaS tracked-resource
   * cache population and MUST remain in the public spec.** Rules are created by the
   * service when the parent assessment is created; they are not directly creatable
   * by end users. All customer PUT calls are rejected at runtime with
   * `OperationNotAllowed` via the RPaaS ResourceCreationValidate extension.
   * Use PATCH to modify rule fields that the customer is authorized to change.
   * Peer RPs with the same topology (extension singleton parent + proxy child)
   * declare an identical public PUT for the same RPaaS cache-population reason:
   * Microsoft.ScVmm/virtualMachineInstances/guestAgents,
   * Microsoft.ConnectedVMwarevSphere/virtualMachineInstances/guestAgents.
   */
  createOrUpdate: (
    resourceUri: string,
    ruleName: string,
    resource: Rule,
    options?: RulesCreateOrUpdateOptionalParams,
  ) => Promise<Rule>;
  /** List Rule resources by Assessment */
  list: (
    resourceUri: string,
    options?: RulesListOptionalParams,
  ) => PagedAsyncIterableIterator<Rule>;
  /** Get a Rule */
  get: (resourceUri: string, ruleName: string, options?: RulesGetOptionalParams) => Promise<Rule>;
}

function _getRules(context: BillingTrustContext) {
  return {
    update: (
      resourceUri: string,
      ruleName: string,
      properties: RulePatchPropertiesUnion,
      options?: RulesUpdateOptionalParams,
    ) => update(context, resourceUri, ruleName, properties, options),
    createOrUpdate: (
      resourceUri: string,
      ruleName: string,
      resource: Rule,
      options?: RulesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceUri, ruleName, resource, options),
    list: (resourceUri: string, options?: RulesListOptionalParams) =>
      list(context, resourceUri, options),
    get: (resourceUri: string, ruleName: string, options?: RulesGetOptionalParams) =>
      get(context, resourceUri, ruleName, options),
  };
}

export function _getRulesOperations(context: BillingTrustContext): RulesOperations {
  return {
    ..._getRules(context),
  };
}

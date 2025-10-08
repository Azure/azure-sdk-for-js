// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DnsResolverManagementContext } from "../../api/dnsResolverManagementContext.js";
import {
  list,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/forwardingRules/operations.js";
import type {
  ForwardingRulesListOptionalParams,
  ForwardingRulesDeleteOptionalParams,
  ForwardingRulesUpdateOptionalParams,
  ForwardingRulesCreateOrUpdateOptionalParams,
  ForwardingRulesGetOptionalParams,
} from "../../api/forwardingRules/options.js";
import type { ForwardingRule, ForwardingRulePatch } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ForwardingRules operations. */
export interface ForwardingRulesOperations {
  /** Lists forwarding rules in a DNS forwarding ruleset. */
  list: (
    resourceGroupName: string,
    dnsForwardingRulesetName: string,
    options?: ForwardingRulesListOptionalParams,
  ) => PagedAsyncIterableIterator<ForwardingRule>;
  /** Deletes a forwarding rule in a DNS forwarding ruleset. WARNING: This operation cannot be undone. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    dnsForwardingRulesetName: string,
    forwardingRuleName: string,
    options?: ForwardingRulesDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates a forwarding rule in a DNS forwarding ruleset. */
  update: (
    resourceGroupName: string,
    dnsForwardingRulesetName: string,
    forwardingRuleName: string,
    parameters: ForwardingRulePatch,
    options?: ForwardingRulesUpdateOptionalParams,
  ) => Promise<ForwardingRule>;
  /** Creates or updates a forwarding rule in a DNS forwarding ruleset. */
  createOrUpdate: (
    resourceGroupName: string,
    dnsForwardingRulesetName: string,
    forwardingRuleName: string,
    parameters: ForwardingRule,
    options?: ForwardingRulesCreateOrUpdateOptionalParams,
  ) => Promise<ForwardingRule>;
  /** Gets properties of a forwarding rule in a DNS forwarding ruleset. */
  get: (
    resourceGroupName: string,
    dnsForwardingRulesetName: string,
    forwardingRuleName: string,
    options?: ForwardingRulesGetOptionalParams,
  ) => Promise<ForwardingRule>;
}

function _getForwardingRules(context: DnsResolverManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      dnsForwardingRulesetName: string,
      options?: ForwardingRulesListOptionalParams,
    ) => list(context, resourceGroupName, dnsForwardingRulesetName, options),
    delete: (
      resourceGroupName: string,
      dnsForwardingRulesetName: string,
      forwardingRuleName: string,
      options?: ForwardingRulesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, dnsForwardingRulesetName, forwardingRuleName, options),
    update: (
      resourceGroupName: string,
      dnsForwardingRulesetName: string,
      forwardingRuleName: string,
      parameters: ForwardingRulePatch,
      options?: ForwardingRulesUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        dnsForwardingRulesetName,
        forwardingRuleName,
        parameters,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      dnsForwardingRulesetName: string,
      forwardingRuleName: string,
      parameters: ForwardingRule,
      options?: ForwardingRulesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        dnsForwardingRulesetName,
        forwardingRuleName,
        parameters,
        options,
      ),
    get: (
      resourceGroupName: string,
      dnsForwardingRulesetName: string,
      forwardingRuleName: string,
      options?: ForwardingRulesGetOptionalParams,
    ) => get(context, resourceGroupName, dnsForwardingRulesetName, forwardingRuleName, options),
  };
}

export function _getForwardingRulesOperations(
  context: DnsResolverManagementContext,
): ForwardingRulesOperations {
  return {
    ..._getForwardingRules(context),
  };
}

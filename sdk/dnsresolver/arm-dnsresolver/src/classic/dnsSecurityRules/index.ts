// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DnsResolverManagementContext } from "../../api/dnsResolverManagementContext.js";
import {
  list,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/dnsSecurityRules/operations.js";
import type {
  DnsSecurityRulesListOptionalParams,
  DnsSecurityRulesDeleteOptionalParams,
  DnsSecurityRulesUpdateOptionalParams,
  DnsSecurityRulesCreateOrUpdateOptionalParams,
  DnsSecurityRulesGetOptionalParams,
} from "../../api/dnsSecurityRules/options.js";
import type { DnsSecurityRule, DnsSecurityRulePatch } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a DnsSecurityRules operations. */
export interface DnsSecurityRulesOperations {
  /** Lists DNS security rules for a DNS resolver policy. */
  list: (
    resourceGroupName: string,
    dnsResolverPolicyName: string,
    options?: DnsSecurityRulesListOptionalParams,
  ) => PagedAsyncIterableIterator<DnsSecurityRule>;
  /** Deletes a DNS security rule for a DNS resolver policy. WARNING: This operation cannot be undone. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    dnsResolverPolicyName: string,
    dnsSecurityRuleName: string,
    options?: DnsSecurityRulesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Updates a DNS security rule. */
  update: (
    resourceGroupName: string,
    dnsResolverPolicyName: string,
    dnsSecurityRuleName: string,
    parameters: DnsSecurityRulePatch,
    options?: DnsSecurityRulesUpdateOptionalParams,
  ) => PollerLike<OperationState<DnsSecurityRule>, DnsSecurityRule>;
  /** Creates or updates a DNS security rule for a DNS resolver policy. */
  createOrUpdate: (
    resourceGroupName: string,
    dnsResolverPolicyName: string,
    dnsSecurityRuleName: string,
    parameters: DnsSecurityRule,
    options?: DnsSecurityRulesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<DnsSecurityRule>, DnsSecurityRule>;
  /** Gets properties of a DNS security rule for a DNS resolver policy. */
  get: (
    resourceGroupName: string,
    dnsResolverPolicyName: string,
    dnsSecurityRuleName: string,
    options?: DnsSecurityRulesGetOptionalParams,
  ) => Promise<DnsSecurityRule>;
}

function _getDnsSecurityRules(context: DnsResolverManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      dnsResolverPolicyName: string,
      options?: DnsSecurityRulesListOptionalParams,
    ) => list(context, resourceGroupName, dnsResolverPolicyName, options),
    delete: (
      resourceGroupName: string,
      dnsResolverPolicyName: string,
      dnsSecurityRuleName: string,
      options?: DnsSecurityRulesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, dnsResolverPolicyName, dnsSecurityRuleName, options),
    update: (
      resourceGroupName: string,
      dnsResolverPolicyName: string,
      dnsSecurityRuleName: string,
      parameters: DnsSecurityRulePatch,
      options?: DnsSecurityRulesUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        dnsResolverPolicyName,
        dnsSecurityRuleName,
        parameters,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      dnsResolverPolicyName: string,
      dnsSecurityRuleName: string,
      parameters: DnsSecurityRule,
      options?: DnsSecurityRulesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        dnsResolverPolicyName,
        dnsSecurityRuleName,
        parameters,
        options,
      ),
    get: (
      resourceGroupName: string,
      dnsResolverPolicyName: string,
      dnsSecurityRuleName: string,
      options?: DnsSecurityRulesGetOptionalParams,
    ) => get(context, resourceGroupName, dnsResolverPolicyName, dnsSecurityRuleName, options),
  };
}

export function _getDnsSecurityRulesOperations(
  context: DnsResolverManagementContext,
): DnsSecurityRulesOperations {
  return {
    ..._getDnsSecurityRules(context),
  };
}

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DnsResolverManagementContext } from "../../api/dnsResolverManagementContext.js";
import {
  list,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/dnsSecurityRules/operations.js";
import {
  DnsSecurityRulesListOptionalParams,
  DnsSecurityRulesDeleteOptionalParams,
  DnsSecurityRulesUpdateOptionalParams,
  DnsSecurityRulesCreateOrUpdateOptionalParams,
  DnsSecurityRulesGetOptionalParams,
} from "../../api/dnsSecurityRules/options.js";
import { DnsSecurityRule, DnsSecurityRulePatch } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a DnsSecurityRules operations. */
export interface DnsSecurityRulesOperations {
  /** Lists DNS security rules for a DNS resolver policy. */
  list: (
    resourceGroupName: string,
    dnsResolverPolicyName: string,
    options?: DnsSecurityRulesListOptionalParams,
  ) => PagedAsyncIterableIterator<DnsSecurityRule>;
  /** Deletes a DNS security rule for a DNS resolver policy. WARNING: This operation cannot be undone. */
  delete: (
    resourceGroupName: string,
    dnsResolverPolicyName: string,
    dnsSecurityRuleName: string,
    options?: DnsSecurityRulesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    dnsResolverPolicyName: string,
    dnsSecurityRuleName: string,
    options?: DnsSecurityRulesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    dnsResolverPolicyName: string,
    dnsSecurityRuleName: string,
    options?: DnsSecurityRulesDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates a DNS security rule. */
  update: (
    resourceGroupName: string,
    dnsResolverPolicyName: string,
    dnsSecurityRuleName: string,
    parameters: DnsSecurityRulePatch,
    options?: DnsSecurityRulesUpdateOptionalParams,
  ) => PollerLike<OperationState<DnsSecurityRule>, DnsSecurityRule>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    dnsResolverPolicyName: string,
    dnsSecurityRuleName: string,
    parameters: DnsSecurityRulePatch,
    options?: DnsSecurityRulesUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<DnsSecurityRule>, DnsSecurityRule>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    dnsResolverPolicyName: string,
    dnsSecurityRuleName: string,
    parameters: DnsSecurityRulePatch,
    options?: DnsSecurityRulesUpdateOptionalParams,
  ) => Promise<DnsSecurityRule>;
  /** Creates or updates a DNS security rule for a DNS resolver policy. */
  createOrUpdate: (
    resourceGroupName: string,
    dnsResolverPolicyName: string,
    dnsSecurityRuleName: string,
    parameters: DnsSecurityRule,
    options?: DnsSecurityRulesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<DnsSecurityRule>, DnsSecurityRule>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    dnsResolverPolicyName: string,
    dnsSecurityRuleName: string,
    parameters: DnsSecurityRule,
    options?: DnsSecurityRulesCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<DnsSecurityRule>, DnsSecurityRule>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    dnsResolverPolicyName: string,
    dnsSecurityRuleName: string,
    parameters: DnsSecurityRule,
    options?: DnsSecurityRulesCreateOrUpdateOptionalParams,
  ) => Promise<DnsSecurityRule>;
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
    beginDelete: async (
      resourceGroupName: string,
      dnsResolverPolicyName: string,
      dnsSecurityRuleName: string,
      options?: DnsSecurityRulesDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        dnsResolverPolicyName,
        dnsSecurityRuleName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      dnsResolverPolicyName: string,
      dnsSecurityRuleName: string,
      options?: DnsSecurityRulesDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        dnsResolverPolicyName,
        dnsSecurityRuleName,
        options,
      );
    },
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
    beginUpdate: async (
      resourceGroupName: string,
      dnsResolverPolicyName: string,
      dnsSecurityRuleName: string,
      parameters: DnsSecurityRulePatch,
      options?: DnsSecurityRulesUpdateOptionalParams,
    ) => {
      const poller = update(
        context,
        resourceGroupName,
        dnsResolverPolicyName,
        dnsSecurityRuleName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      dnsResolverPolicyName: string,
      dnsSecurityRuleName: string,
      parameters: DnsSecurityRulePatch,
      options?: DnsSecurityRulesUpdateOptionalParams,
    ) => {
      return await update(
        context,
        resourceGroupName,
        dnsResolverPolicyName,
        dnsSecurityRuleName,
        parameters,
        options,
      );
    },
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
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      dnsResolverPolicyName: string,
      dnsSecurityRuleName: string,
      parameters: DnsSecurityRule,
      options?: DnsSecurityRulesCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        dnsResolverPolicyName,
        dnsSecurityRuleName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      dnsResolverPolicyName: string,
      dnsSecurityRuleName: string,
      parameters: DnsSecurityRule,
      options?: DnsSecurityRulesCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        dnsResolverPolicyName,
        dnsSecurityRuleName,
        parameters,
        options,
      );
    },
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

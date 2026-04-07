// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlContext } from "../../api/sqlContext.js";
import {
  listByServer,
  $delete,
  createOrUpdate,
  get,
} from "../../api/outboundFirewallRules/operations.js";
import type {
  OutboundFirewallRulesListByServerOptionalParams,
  OutboundFirewallRulesDeleteOptionalParams,
  OutboundFirewallRulesCreateOrUpdateOptionalParams,
  OutboundFirewallRulesGetOptionalParams,
} from "../../api/outboundFirewallRules/options.js";
import type { OutboundFirewallRule } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a OutboundFirewallRules operations. */
export interface OutboundFirewallRulesOperations {
  /** Gets all outbound firewall rules on a server. */
  listByServer: (
    resourceGroupName: string,
    serverName: string,
    options?: OutboundFirewallRulesListByServerOptionalParams,
  ) => PagedAsyncIterableIterator<OutboundFirewallRule>;
  /** Deletes a outbound firewall rule with a given name. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    serverName: string,
    outboundRuleFqdn: string,
    options?: OutboundFirewallRulesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    serverName: string,
    outboundRuleFqdn: string,
    options?: OutboundFirewallRulesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    serverName: string,
    outboundRuleFqdn: string,
    options?: OutboundFirewallRulesDeleteOptionalParams,
  ) => Promise<void>;
  /** Create a outbound firewall rule with a given name. */
  createOrUpdate: (
    resourceGroupName: string,
    serverName: string,
    outboundRuleFqdn: string,
    options?: OutboundFirewallRulesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<OutboundFirewallRule>, OutboundFirewallRule>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    serverName: string,
    outboundRuleFqdn: string,
    options?: OutboundFirewallRulesCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<OutboundFirewallRule>, OutboundFirewallRule>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    serverName: string,
    outboundRuleFqdn: string,
    options?: OutboundFirewallRulesCreateOrUpdateOptionalParams,
  ) => Promise<OutboundFirewallRule>;
  /** Gets an outbound firewall rule. */
  get: (
    resourceGroupName: string,
    serverName: string,
    outboundRuleFqdn: string,
    options?: OutboundFirewallRulesGetOptionalParams,
  ) => Promise<OutboundFirewallRule>;
}

function _getOutboundFirewallRules(context: SqlContext) {
  return {
    listByServer: (
      resourceGroupName: string,
      serverName: string,
      options?: OutboundFirewallRulesListByServerOptionalParams,
    ) => listByServer(context, resourceGroupName, serverName, options),
    delete: (
      resourceGroupName: string,
      serverName: string,
      outboundRuleFqdn: string,
      options?: OutboundFirewallRulesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, serverName, outboundRuleFqdn, options),
    beginDelete: async (
      resourceGroupName: string,
      serverName: string,
      outboundRuleFqdn: string,
      options?: OutboundFirewallRulesDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, serverName, outboundRuleFqdn, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      serverName: string,
      outboundRuleFqdn: string,
      options?: OutboundFirewallRulesDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, serverName, outboundRuleFqdn, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      serverName: string,
      outboundRuleFqdn: string,
      options?: OutboundFirewallRulesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, serverName, outboundRuleFqdn, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      serverName: string,
      outboundRuleFqdn: string,
      options?: OutboundFirewallRulesCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        serverName,
        outboundRuleFqdn,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      serverName: string,
      outboundRuleFqdn: string,
      options?: OutboundFirewallRulesCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        serverName,
        outboundRuleFqdn,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      serverName: string,
      outboundRuleFqdn: string,
      options?: OutboundFirewallRulesGetOptionalParams,
    ) => get(context, resourceGroupName, serverName, outboundRuleFqdn, options),
  };
}

export function _getOutboundFirewallRulesOperations(
  context: SqlContext,
): OutboundFirewallRulesOperations {
  return {
    ..._getOutboundFirewallRules(context),
  };
}

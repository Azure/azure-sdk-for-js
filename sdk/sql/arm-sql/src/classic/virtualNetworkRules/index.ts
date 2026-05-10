// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlManagementContext } from "../../api/sqlManagementContext.js";
import {
  listByServer,
  $delete,
  createOrUpdate,
  get,
} from "../../api/virtualNetworkRules/operations.js";
import {
  VirtualNetworkRulesListByServerOptionalParams,
  VirtualNetworkRulesDeleteOptionalParams,
  VirtualNetworkRulesCreateOrUpdateOptionalParams,
  VirtualNetworkRulesGetOptionalParams,
} from "../../api/virtualNetworkRules/options.js";
import { VirtualNetworkRule } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a VirtualNetworkRules operations. */
export interface VirtualNetworkRulesOperations {
  /** Gets a list of virtual network rules in a server. */
  listByServer: (
    resourceGroupName: string,
    serverName: string,
    options?: VirtualNetworkRulesListByServerOptionalParams,
  ) => PagedAsyncIterableIterator<VirtualNetworkRule>;
  /** Deletes the virtual network rule with the given name. */
  delete: (
    resourceGroupName: string,
    serverName: string,
    virtualNetworkRuleName: string,
    options?: VirtualNetworkRulesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    serverName: string,
    virtualNetworkRuleName: string,
    options?: VirtualNetworkRulesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    serverName: string,
    virtualNetworkRuleName: string,
    options?: VirtualNetworkRulesDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates an existing virtual network rule. */
  createOrUpdate: (
    resourceGroupName: string,
    serverName: string,
    virtualNetworkRuleName: string,
    parameters: VirtualNetworkRule,
    options?: VirtualNetworkRulesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<VirtualNetworkRule>, VirtualNetworkRule>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    serverName: string,
    virtualNetworkRuleName: string,
    parameters: VirtualNetworkRule,
    options?: VirtualNetworkRulesCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<VirtualNetworkRule>, VirtualNetworkRule>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    serverName: string,
    virtualNetworkRuleName: string,
    parameters: VirtualNetworkRule,
    options?: VirtualNetworkRulesCreateOrUpdateOptionalParams,
  ) => Promise<VirtualNetworkRule>;
  /** Gets a virtual network rule. */
  get: (
    resourceGroupName: string,
    serverName: string,
    virtualNetworkRuleName: string,
    options?: VirtualNetworkRulesGetOptionalParams,
  ) => Promise<VirtualNetworkRule>;
}

function _getVirtualNetworkRules(context: SqlManagementContext) {
  return {
    listByServer: (
      resourceGroupName: string,
      serverName: string,
      options?: VirtualNetworkRulesListByServerOptionalParams,
    ) => listByServer(context, resourceGroupName, serverName, options),
    delete: (
      resourceGroupName: string,
      serverName: string,
      virtualNetworkRuleName: string,
      options?: VirtualNetworkRulesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, serverName, virtualNetworkRuleName, options),
    beginDelete: async (
      resourceGroupName: string,
      serverName: string,
      virtualNetworkRuleName: string,
      options?: VirtualNetworkRulesDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        serverName,
        virtualNetworkRuleName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      serverName: string,
      virtualNetworkRuleName: string,
      options?: VirtualNetworkRulesDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, serverName, virtualNetworkRuleName, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      serverName: string,
      virtualNetworkRuleName: string,
      parameters: VirtualNetworkRule,
      options?: VirtualNetworkRulesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        serverName,
        virtualNetworkRuleName,
        parameters,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      serverName: string,
      virtualNetworkRuleName: string,
      parameters: VirtualNetworkRule,
      options?: VirtualNetworkRulesCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        serverName,
        virtualNetworkRuleName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      serverName: string,
      virtualNetworkRuleName: string,
      parameters: VirtualNetworkRule,
      options?: VirtualNetworkRulesCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        serverName,
        virtualNetworkRuleName,
        parameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      serverName: string,
      virtualNetworkRuleName: string,
      options?: VirtualNetworkRulesGetOptionalParams,
    ) => get(context, resourceGroupName, serverName, virtualNetworkRuleName, options),
  };
}

export function _getVirtualNetworkRulesOperations(
  context: SqlManagementContext,
): VirtualNetworkRulesOperations {
  return {
    ..._getVirtualNetworkRules(context),
  };
}

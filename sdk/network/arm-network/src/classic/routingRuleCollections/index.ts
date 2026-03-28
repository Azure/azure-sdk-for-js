// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext } from "../../api/networkManagementContext.js";
import { list, $delete, createOrUpdate, get } from "../../api/routingRuleCollections/operations.js";
import type {
  RoutingRuleCollectionsListOptionalParams,
  RoutingRuleCollectionsDeleteOptionalParams,
  RoutingRuleCollectionsCreateOrUpdateOptionalParams,
  RoutingRuleCollectionsGetOptionalParams,
} from "../../api/routingRuleCollections/options.js";
import type { RoutingRuleCollection } from "../../models/microsoft/network/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a RoutingRuleCollections operations. */
export interface RoutingRuleCollectionsOperations {
  /** Lists all the rule collections in a routing configuration, in a paginated format. */
  list: (
    resourceGroupName: string,
    networkManagerName: string,
    configurationName: string,
    options?: RoutingRuleCollectionsListOptionalParams,
  ) => PagedAsyncIterableIterator<RoutingRuleCollection>;
  /** Deletes an routing rule collection. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    networkManagerName: string,
    configurationName: string,
    ruleCollectionName: string,
    options?: RoutingRuleCollectionsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    networkManagerName: string,
    configurationName: string,
    ruleCollectionName: string,
    options?: RoutingRuleCollectionsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    networkManagerName: string,
    configurationName: string,
    ruleCollectionName: string,
    options?: RoutingRuleCollectionsDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates a routing rule collection. */
  createOrUpdate: (
    resourceGroupName: string,
    networkManagerName: string,
    configurationName: string,
    ruleCollectionName: string,
    ruleCollection: RoutingRuleCollection,
    options?: RoutingRuleCollectionsCreateOrUpdateOptionalParams,
  ) => Promise<RoutingRuleCollection>;
  /** Gets a network manager routing configuration rule collection. */
  get: (
    resourceGroupName: string,
    networkManagerName: string,
    configurationName: string,
    ruleCollectionName: string,
    options?: RoutingRuleCollectionsGetOptionalParams,
  ) => Promise<RoutingRuleCollection>;
}

function _getRoutingRuleCollections(context: NetworkManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      networkManagerName: string,
      configurationName: string,
      options?: RoutingRuleCollectionsListOptionalParams,
    ) => list(context, resourceGroupName, networkManagerName, configurationName, options),
    delete: (
      resourceGroupName: string,
      networkManagerName: string,
      configurationName: string,
      ruleCollectionName: string,
      options?: RoutingRuleCollectionsDeleteOptionalParams,
    ) =>
      $delete(
        context,
        resourceGroupName,
        networkManagerName,
        configurationName,
        ruleCollectionName,
        options,
      ),
    beginDelete: async (
      resourceGroupName: string,
      networkManagerName: string,
      configurationName: string,
      ruleCollectionName: string,
      options?: RoutingRuleCollectionsDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        networkManagerName,
        configurationName,
        ruleCollectionName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      networkManagerName: string,
      configurationName: string,
      ruleCollectionName: string,
      options?: RoutingRuleCollectionsDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        networkManagerName,
        configurationName,
        ruleCollectionName,
        options,
      );
    },
    createOrUpdate: (
      resourceGroupName: string,
      networkManagerName: string,
      configurationName: string,
      ruleCollectionName: string,
      ruleCollection: RoutingRuleCollection,
      options?: RoutingRuleCollectionsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        networkManagerName,
        configurationName,
        ruleCollectionName,
        ruleCollection,
        options,
      ),
    get: (
      resourceGroupName: string,
      networkManagerName: string,
      configurationName: string,
      ruleCollectionName: string,
      options?: RoutingRuleCollectionsGetOptionalParams,
    ) =>
      get(
        context,
        resourceGroupName,
        networkManagerName,
        configurationName,
        ruleCollectionName,
        options,
      ),
  };
}

export function _getRoutingRuleCollectionsOperations(
  context: NetworkManagementContext,
): RoutingRuleCollectionsOperations {
  return {
    ..._getRoutingRuleCollections(context),
  };
}

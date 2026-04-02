// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext } from "../../api/networkManagementContext.js";
import { list, $delete, createOrUpdate, get } from "../../api/adminRuleCollections/operations.js";
import type {
  AdminRuleCollectionsListOptionalParams,
  AdminRuleCollectionsDeleteOptionalParams,
  AdminRuleCollectionsCreateOrUpdateOptionalParams,
  AdminRuleCollectionsGetOptionalParams,
} from "../../api/adminRuleCollections/options.js";
import type { AdminRuleCollection } from "../../models/microsoft/network/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a AdminRuleCollections operations. */
export interface AdminRuleCollectionsOperations {
  /** Lists all the rule collections in a security admin configuration, in a paginated format. */
  list: (
    resourceGroupName: string,
    networkManagerName: string,
    configurationName: string,
    options?: AdminRuleCollectionsListOptionalParams,
  ) => PagedAsyncIterableIterator<AdminRuleCollection>;
  /** Deletes an admin rule collection. */
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
    options?: AdminRuleCollectionsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    networkManagerName: string,
    configurationName: string,
    ruleCollectionName: string,
    options?: AdminRuleCollectionsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    networkManagerName: string,
    configurationName: string,
    ruleCollectionName: string,
    options?: AdminRuleCollectionsDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates an admin rule collection. */
  createOrUpdate: (
    resourceGroupName: string,
    networkManagerName: string,
    configurationName: string,
    ruleCollectionName: string,
    ruleCollection: AdminRuleCollection,
    options?: AdminRuleCollectionsCreateOrUpdateOptionalParams,
  ) => Promise<AdminRuleCollection>;
  /** Gets a network manager security admin configuration rule collection. */
  get: (
    resourceGroupName: string,
    networkManagerName: string,
    configurationName: string,
    ruleCollectionName: string,
    options?: AdminRuleCollectionsGetOptionalParams,
  ) => Promise<AdminRuleCollection>;
}

function _getAdminRuleCollections(context: NetworkManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      networkManagerName: string,
      configurationName: string,
      options?: AdminRuleCollectionsListOptionalParams,
    ) => list(context, resourceGroupName, networkManagerName, configurationName, options),
    delete: (
      resourceGroupName: string,
      networkManagerName: string,
      configurationName: string,
      ruleCollectionName: string,
      options?: AdminRuleCollectionsDeleteOptionalParams,
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
      options?: AdminRuleCollectionsDeleteOptionalParams,
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
      options?: AdminRuleCollectionsDeleteOptionalParams,
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
      ruleCollection: AdminRuleCollection,
      options?: AdminRuleCollectionsCreateOrUpdateOptionalParams,
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
      options?: AdminRuleCollectionsGetOptionalParams,
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

export function _getAdminRuleCollectionsOperations(
  context: NetworkManagementContext,
): AdminRuleCollectionsOperations {
  return {
    ..._getAdminRuleCollections(context),
  };
}

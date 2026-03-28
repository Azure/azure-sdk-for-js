// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext } from "../../api/networkManagementContext.js";
import {
  list,
  $delete,
  createOrUpdate,
  get,
} from "../../api/securityUserRuleCollections/operations.js";
import type {
  SecurityUserRuleCollectionsListOptionalParams,
  SecurityUserRuleCollectionsDeleteOptionalParams,
  SecurityUserRuleCollectionsCreateOrUpdateOptionalParams,
  SecurityUserRuleCollectionsGetOptionalParams,
} from "../../api/securityUserRuleCollections/options.js";
import type { SecurityUserRuleCollection } from "../../models/microsoft/network/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a SecurityUserRuleCollections operations. */
export interface SecurityUserRuleCollectionsOperations {
  /** Lists all the security user rule collections in a security configuration, in a paginated format. */
  list: (
    resourceGroupName: string,
    networkManagerName: string,
    configurationName: string,
    options?: SecurityUserRuleCollectionsListOptionalParams,
  ) => PagedAsyncIterableIterator<SecurityUserRuleCollection>;
  /** Deletes a Security User Rule collection. */
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
    options?: SecurityUserRuleCollectionsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    networkManagerName: string,
    configurationName: string,
    ruleCollectionName: string,
    options?: SecurityUserRuleCollectionsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    networkManagerName: string,
    configurationName: string,
    ruleCollectionName: string,
    options?: SecurityUserRuleCollectionsDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates a security user rule collection. */
  createOrUpdate: (
    resourceGroupName: string,
    networkManagerName: string,
    configurationName: string,
    ruleCollectionName: string,
    securityUserRuleCollection: SecurityUserRuleCollection,
    options?: SecurityUserRuleCollectionsCreateOrUpdateOptionalParams,
  ) => Promise<SecurityUserRuleCollection>;
  /** Gets a network manager security user configuration rule collection. */
  get: (
    resourceGroupName: string,
    networkManagerName: string,
    configurationName: string,
    ruleCollectionName: string,
    options?: SecurityUserRuleCollectionsGetOptionalParams,
  ) => Promise<SecurityUserRuleCollection>;
}

function _getSecurityUserRuleCollections(context: NetworkManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      networkManagerName: string,
      configurationName: string,
      options?: SecurityUserRuleCollectionsListOptionalParams,
    ) => list(context, resourceGroupName, networkManagerName, configurationName, options),
    delete: (
      resourceGroupName: string,
      networkManagerName: string,
      configurationName: string,
      ruleCollectionName: string,
      options?: SecurityUserRuleCollectionsDeleteOptionalParams,
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
      options?: SecurityUserRuleCollectionsDeleteOptionalParams,
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
      options?: SecurityUserRuleCollectionsDeleteOptionalParams,
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
      securityUserRuleCollection: SecurityUserRuleCollection,
      options?: SecurityUserRuleCollectionsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        networkManagerName,
        configurationName,
        ruleCollectionName,
        securityUserRuleCollection,
        options,
      ),
    get: (
      resourceGroupName: string,
      networkManagerName: string,
      configurationName: string,
      ruleCollectionName: string,
      options?: SecurityUserRuleCollectionsGetOptionalParams,
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

export function _getSecurityUserRuleCollectionsOperations(
  context: NetworkManagementContext,
): SecurityUserRuleCollectionsOperations {
  return {
    ..._getSecurityUserRuleCollections(context),
  };
}

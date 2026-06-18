// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerRegistryManagementContext } from "../../api/containerRegistryManagementContext.js";
import { list, $delete, update, create, get } from "../../api/cacheRules/operations.js";
import {
  CacheRulesListOptionalParams,
  CacheRulesDeleteOptionalParams,
  CacheRulesUpdateOptionalParams,
  CacheRulesCreateOptionalParams,
  CacheRulesGetOptionalParams,
} from "../../api/cacheRules/options.js";
import { CacheRule, CacheRuleUpdateParameters } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a CacheRules operations. */
export interface CacheRulesOperations {
  /** Lists all cache rule resources for the specified container registry. */
  list: (
    resourceGroupName: string,
    registryName: string,
    options?: CacheRulesListOptionalParams,
  ) => PagedAsyncIterableIterator<CacheRule>;
  /** Deletes a cache rule resource from a container registry. */
  delete: (
    resourceGroupName: string,
    registryName: string,
    cacheRuleName: string,
    options?: CacheRulesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    registryName: string,
    cacheRuleName: string,
    options?: CacheRulesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    registryName: string,
    cacheRuleName: string,
    options?: CacheRulesDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates a cache rule for a container registry with the specified parameters. */
  update: (
    resourceGroupName: string,
    registryName: string,
    cacheRuleName: string,
    cacheRuleUpdateParameters: CacheRuleUpdateParameters,
    options?: CacheRulesUpdateOptionalParams,
  ) => PollerLike<OperationState<CacheRule>, CacheRule>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    registryName: string,
    cacheRuleName: string,
    cacheRuleUpdateParameters: CacheRuleUpdateParameters,
    options?: CacheRulesUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<CacheRule>, CacheRule>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    registryName: string,
    cacheRuleName: string,
    cacheRuleUpdateParameters: CacheRuleUpdateParameters,
    options?: CacheRulesUpdateOptionalParams,
  ) => Promise<CacheRule>;
  /** Creates a cache rule for a container registry with the specified parameters. */
  create: (
    resourceGroupName: string,
    registryName: string,
    cacheRuleName: string,
    cacheRuleCreateParameters: CacheRule,
    options?: CacheRulesCreateOptionalParams,
  ) => PollerLike<OperationState<CacheRule>, CacheRule>;
  /** @deprecated use create instead */
  beginCreate: (
    resourceGroupName: string,
    registryName: string,
    cacheRuleName: string,
    cacheRuleCreateParameters: CacheRule,
    options?: CacheRulesCreateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<CacheRule>, CacheRule>>;
  /** @deprecated use create instead */
  beginCreateAndWait: (
    resourceGroupName: string,
    registryName: string,
    cacheRuleName: string,
    cacheRuleCreateParameters: CacheRule,
    options?: CacheRulesCreateOptionalParams,
  ) => Promise<CacheRule>;
  /** Gets the properties of the specified cache rule resource. */
  get: (
    resourceGroupName: string,
    registryName: string,
    cacheRuleName: string,
    options?: CacheRulesGetOptionalParams,
  ) => Promise<CacheRule>;
}

function _getCacheRules(context: ContainerRegistryManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      registryName: string,
      options?: CacheRulesListOptionalParams,
    ) => list(context, resourceGroupName, registryName, options),
    delete: (
      resourceGroupName: string,
      registryName: string,
      cacheRuleName: string,
      options?: CacheRulesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, registryName, cacheRuleName, options),
    beginDelete: async (
      resourceGroupName: string,
      registryName: string,
      cacheRuleName: string,
      options?: CacheRulesDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, registryName, cacheRuleName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      registryName: string,
      cacheRuleName: string,
      options?: CacheRulesDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, registryName, cacheRuleName, options);
    },
    update: (
      resourceGroupName: string,
      registryName: string,
      cacheRuleName: string,
      cacheRuleUpdateParameters: CacheRuleUpdateParameters,
      options?: CacheRulesUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        registryName,
        cacheRuleName,
        cacheRuleUpdateParameters,
        options,
      ),
    beginUpdate: async (
      resourceGroupName: string,
      registryName: string,
      cacheRuleName: string,
      cacheRuleUpdateParameters: CacheRuleUpdateParameters,
      options?: CacheRulesUpdateOptionalParams,
    ) => {
      const poller = update(
        context,
        resourceGroupName,
        registryName,
        cacheRuleName,
        cacheRuleUpdateParameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      registryName: string,
      cacheRuleName: string,
      cacheRuleUpdateParameters: CacheRuleUpdateParameters,
      options?: CacheRulesUpdateOptionalParams,
    ) => {
      return await update(
        context,
        resourceGroupName,
        registryName,
        cacheRuleName,
        cacheRuleUpdateParameters,
        options,
      );
    },
    create: (
      resourceGroupName: string,
      registryName: string,
      cacheRuleName: string,
      cacheRuleCreateParameters: CacheRule,
      options?: CacheRulesCreateOptionalParams,
    ) =>
      create(
        context,
        resourceGroupName,
        registryName,
        cacheRuleName,
        cacheRuleCreateParameters,
        options,
      ),
    beginCreate: async (
      resourceGroupName: string,
      registryName: string,
      cacheRuleName: string,
      cacheRuleCreateParameters: CacheRule,
      options?: CacheRulesCreateOptionalParams,
    ) => {
      const poller = create(
        context,
        resourceGroupName,
        registryName,
        cacheRuleName,
        cacheRuleCreateParameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateAndWait: async (
      resourceGroupName: string,
      registryName: string,
      cacheRuleName: string,
      cacheRuleCreateParameters: CacheRule,
      options?: CacheRulesCreateOptionalParams,
    ) => {
      return await create(
        context,
        resourceGroupName,
        registryName,
        cacheRuleName,
        cacheRuleCreateParameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      registryName: string,
      cacheRuleName: string,
      options?: CacheRulesGetOptionalParams,
    ) => get(context, resourceGroupName, registryName, cacheRuleName, options),
  };
}

export function _getCacheRulesOperations(
  context: ContainerRegistryManagementContext,
): CacheRulesOperations {
  return {
    ..._getCacheRules(context),
  };
}

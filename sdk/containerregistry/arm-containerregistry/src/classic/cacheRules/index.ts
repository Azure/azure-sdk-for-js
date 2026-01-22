// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ContainerRegistryManagementContext } from "../../api/containerRegistryManagementContext.js";
import { list, $delete, update, create, get } from "../../api/cacheRules/operations.js";
import type {
  CacheRulesListOptionalParams,
  CacheRulesDeleteOptionalParams,
  CacheRulesUpdateOptionalParams,
  CacheRulesCreateOptionalParams,
  CacheRulesGetOptionalParams,
} from "../../api/cacheRules/options.js";
import type { CacheRule, CacheRuleUpdateParameters } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a CacheRules operations. */
export interface CacheRulesOperations {
  /** Lists all cache rule resources for the specified container registry. */
  list: (
    resourceGroupName: string,
    registryName: string,
    options?: CacheRulesListOptionalParams,
  ) => PagedAsyncIterableIterator<CacheRule>;
  /** Deletes a cache rule resource from a container registry. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    registryName: string,
    cacheRuleName: string,
    options?: CacheRulesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Updates a cache rule for a container registry with the specified parameters. */
  update: (
    resourceGroupName: string,
    registryName: string,
    cacheRuleName: string,
    cacheRuleUpdateParameters: CacheRuleUpdateParameters,
    options?: CacheRulesUpdateOptionalParams,
  ) => PollerLike<OperationState<CacheRule>, CacheRule>;
  /** Creates a cache rule for a container registry with the specified parameters. */
  create: (
    resourceGroupName: string,
    registryName: string,
    cacheRuleName: string,
    cacheRuleCreateParameters: CacheRule,
    options?: CacheRulesCreateOptionalParams,
  ) => PollerLike<OperationState<CacheRule>, CacheRule>;
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

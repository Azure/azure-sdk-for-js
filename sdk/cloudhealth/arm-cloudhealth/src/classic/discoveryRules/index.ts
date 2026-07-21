// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CloudHealthContext } from "../../api/cloudHealthContext.js";
import {
  listByHealthModel,
  $delete,
  createOrUpdate,
  get,
} from "../../api/discoveryRules/operations.js";
import type {
  DiscoveryRulesListByHealthModelOptionalParams,
  DiscoveryRulesDeleteOptionalParams,
  DiscoveryRulesCreateOrUpdateOptionalParams,
  DiscoveryRulesGetOptionalParams,
} from "../../api/discoveryRules/options.js";
import type { DiscoveryRule, DiscoveryRuleResourceCreate } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a DiscoveryRules operations. */
export interface DiscoveryRulesOperations {
  /** List DiscoveryRule resources by HealthModel */
  listByHealthModel: (
    resourceGroupName: string,
    healthModelName: string,
    options?: DiscoveryRulesListByHealthModelOptionalParams,
  ) => PagedAsyncIterableIterator<DiscoveryRule>;
  /** Delete a DiscoveryRule */
  delete: (
    resourceGroupName: string,
    healthModelName: string,
    discoveryRuleName: string,
    options?: DiscoveryRulesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Create a DiscoveryRule */
  createOrUpdate: (
    resourceGroupName: string,
    healthModelName: string,
    discoveryRuleName: string,
    resource: DiscoveryRuleResourceCreate,
    options?: DiscoveryRulesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<DiscoveryRule>, DiscoveryRule>;
  /** Get a DiscoveryRule */
  get: (
    resourceGroupName: string,
    healthModelName: string,
    discoveryRuleName: string,
    options?: DiscoveryRulesGetOptionalParams,
  ) => Promise<DiscoveryRule>;
}

function _getDiscoveryRules(context: CloudHealthContext) {
  return {
    listByHealthModel: (
      resourceGroupName: string,
      healthModelName: string,
      options?: DiscoveryRulesListByHealthModelOptionalParams,
    ) => listByHealthModel(context, resourceGroupName, healthModelName, options),
    delete: (
      resourceGroupName: string,
      healthModelName: string,
      discoveryRuleName: string,
      options?: DiscoveryRulesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, healthModelName, discoveryRuleName, options),
    createOrUpdate: (
      resourceGroupName: string,
      healthModelName: string,
      discoveryRuleName: string,
      resource: DiscoveryRuleResourceCreate,
      options?: DiscoveryRulesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        healthModelName,
        discoveryRuleName,
        resource,
        options,
      ),
    get: (
      resourceGroupName: string,
      healthModelName: string,
      discoveryRuleName: string,
      options?: DiscoveryRulesGetOptionalParams,
    ) => get(context, resourceGroupName, healthModelName, discoveryRuleName, options),
  };
}

export function _getDiscoveryRulesOperations(
  context: CloudHealthContext,
): DiscoveryRulesOperations {
  return {
    ..._getDiscoveryRules(context),
  };
}

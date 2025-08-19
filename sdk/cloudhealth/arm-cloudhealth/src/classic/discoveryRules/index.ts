// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CloudHealthContext } from "../../api/cloudHealthContext.js";
import { DiscoveryRule } from "../../models/models.js";
import {
  DiscoveryRulesListByHealthModelOptionalParams,
  DiscoveryRulesDeleteOptionalParams,
  DiscoveryRulesCreateOrUpdateOptionalParams,
  DiscoveryRulesGetOptionalParams,
} from "../../api/discoveryRules/options.js";
import {
  listByHealthModel,
  $delete,
  createOrUpdate,
  get,
} from "../../api/discoveryRules/operations.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a DiscoveryRules operations. */
export interface DiscoveryRulesOperations {
  /** List DiscoveryRule resources by HealthModel */
  listByHealthModel: (
    resourceGroupName: string,
    healthModelName: string,
    options?: DiscoveryRulesListByHealthModelOptionalParams,
  ) => PagedAsyncIterableIterator<DiscoveryRule>;
  /** Delete a DiscoveryRule */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    healthModelName: string,
    discoveryRuleName: string,
    options?: DiscoveryRulesDeleteOptionalParams,
  ) => Promise<void>;
  /** Create a DiscoveryRule */
  createOrUpdate: (
    resourceGroupName: string,
    healthModelName: string,
    discoveryRuleName: string,
    resource: DiscoveryRule,
    options?: DiscoveryRulesCreateOrUpdateOptionalParams,
  ) => Promise<DiscoveryRule>;
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
      resource: DiscoveryRule,
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

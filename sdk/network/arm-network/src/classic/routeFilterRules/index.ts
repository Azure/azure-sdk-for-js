// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext } from "../../api/networkManagementContext.js";
import {
  listByRouteFilter,
  createOrUpdate,
  get,
  $delete,
} from "../../api/routeFilterRules/operations.js";
import type {
  RouteFilterRulesListByRouteFilterOptionalParams,
  RouteFilterRulesCreateOrUpdateOptionalParams,
  RouteFilterRulesGetOptionalParams,
  RouteFilterRulesDeleteOptionalParams,
} from "../../api/routeFilterRules/options.js";
import type { RouteFilterRule } from "../../models/microsoft/network/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a RouteFilterRules operations. */
export interface RouteFilterRulesOperations {
  /** Gets all RouteFilterRules in a route filter. */
  listByRouteFilter: (
    resourceGroupName: string,
    routeFilterName: string,
    options?: RouteFilterRulesListByRouteFilterOptionalParams,
  ) => PagedAsyncIterableIterator<RouteFilterRule>;
  /** Creates or updates a route in the specified route filter. */
  createOrUpdate: (
    resourceGroupName: string,
    routeFilterName: string,
    ruleName: string,
    routeFilterRuleParameters: RouteFilterRule,
    options?: RouteFilterRulesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<RouteFilterRule>, RouteFilterRule>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    routeFilterName: string,
    ruleName: string,
    routeFilterRuleParameters: RouteFilterRule,
    options?: RouteFilterRulesCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<RouteFilterRule>, RouteFilterRule>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    routeFilterName: string,
    ruleName: string,
    routeFilterRuleParameters: RouteFilterRule,
    options?: RouteFilterRulesCreateOrUpdateOptionalParams,
  ) => Promise<RouteFilterRule>;
  /** Gets the specified rule from a route filter. */
  get: (
    resourceGroupName: string,
    routeFilterName: string,
    ruleName: string,
    options?: RouteFilterRulesGetOptionalParams,
  ) => Promise<RouteFilterRule>;
  /** Deletes the specified rule from a route filter. */
  /**
   *  @fixme Delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    routeFilterName: string,
    ruleName: string,
    options?: RouteFilterRulesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    routeFilterName: string,
    ruleName: string,
    options?: RouteFilterRulesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    routeFilterName: string,
    ruleName: string,
    options?: RouteFilterRulesDeleteOptionalParams,
  ) => Promise<void>;
}

function _getRouteFilterRules(context: NetworkManagementContext) {
  return {
    listByRouteFilter: (
      resourceGroupName: string,
      routeFilterName: string,
      options?: RouteFilterRulesListByRouteFilterOptionalParams,
    ) => listByRouteFilter(context, resourceGroupName, routeFilterName, options),
    createOrUpdate: (
      resourceGroupName: string,
      routeFilterName: string,
      ruleName: string,
      routeFilterRuleParameters: RouteFilterRule,
      options?: RouteFilterRulesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        routeFilterName,
        ruleName,
        routeFilterRuleParameters,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      routeFilterName: string,
      ruleName: string,
      routeFilterRuleParameters: RouteFilterRule,
      options?: RouteFilterRulesCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        routeFilterName,
        ruleName,
        routeFilterRuleParameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      routeFilterName: string,
      ruleName: string,
      routeFilterRuleParameters: RouteFilterRule,
      options?: RouteFilterRulesCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        routeFilterName,
        ruleName,
        routeFilterRuleParameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      routeFilterName: string,
      ruleName: string,
      options?: RouteFilterRulesGetOptionalParams,
    ) => get(context, resourceGroupName, routeFilterName, ruleName, options),
    delete: (
      resourceGroupName: string,
      routeFilterName: string,
      ruleName: string,
      options?: RouteFilterRulesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, routeFilterName, ruleName, options),
    beginDelete: async (
      resourceGroupName: string,
      routeFilterName: string,
      ruleName: string,
      options?: RouteFilterRulesDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, routeFilterName, ruleName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      routeFilterName: string,
      ruleName: string,
      options?: RouteFilterRulesDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, routeFilterName, ruleName, options);
    },
  };
}

export function _getRouteFilterRulesOperations(
  context: NetworkManagementContext,
): RouteFilterRulesOperations {
  return {
    ..._getRouteFilterRules(context),
  };
}

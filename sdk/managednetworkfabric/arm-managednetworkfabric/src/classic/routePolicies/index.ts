// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ManagedNetworkFabricContext } from "../../api/managedNetworkFabricContext.js";
import {
  commitConfiguration,
  validateConfiguration,
  updateAdministrativeState,
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  create,
  get,
} from "../../api/routePolicies/operations.js";
import type {
  RoutePoliciesCommitConfigurationOptionalParams,
  RoutePoliciesValidateConfigurationOptionalParams,
  RoutePoliciesUpdateAdministrativeStateOptionalParams,
  RoutePoliciesListBySubscriptionOptionalParams,
  RoutePoliciesListByResourceGroupOptionalParams,
  RoutePoliciesDeleteOptionalParams,
  RoutePoliciesUpdateOptionalParams,
  RoutePoliciesCreateOptionalParams,
  RoutePoliciesGetOptionalParams,
} from "../../api/routePolicies/options.js";
import type {
  UpdateAdministrativeState,
  CommonPostActionResponseForStateUpdate,
  ValidateConfigurationResponse,
  CommonPostActionResponseForDeviceUpdate,
  RoutePolicy,
  RoutePolicyPatch,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a RoutePolicies operations. */
export interface RoutePoliciesOperations {
  /** Commits the configuration of the given resources. */
  commitConfiguration: (
    resourceGroupName: string,
    routePolicyName: string,
    options?: RoutePoliciesCommitConfigurationOptionalParams,
  ) => PollerLike<
    OperationState<CommonPostActionResponseForStateUpdate>,
    CommonPostActionResponseForStateUpdate
  >;
  /** Validates the configuration of the resources. */
  validateConfiguration: (
    resourceGroupName: string,
    routePolicyName: string,
    options?: RoutePoliciesValidateConfigurationOptionalParams,
  ) => PollerLike<OperationState<ValidateConfigurationResponse>, ValidateConfigurationResponse>;
  /** Updated the admin state for this Route Policy. */
  updateAdministrativeState: (
    resourceGroupName: string,
    routePolicyName: string,
    body: UpdateAdministrativeState,
    options?: RoutePoliciesUpdateAdministrativeStateOptionalParams,
  ) => PollerLike<
    OperationState<CommonPostActionResponseForDeviceUpdate>,
    CommonPostActionResponseForDeviceUpdate
  >;
  /** Implements RoutePolicies list by subscription GET method. */
  listBySubscription: (
    options?: RoutePoliciesListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<RoutePolicy>;
  /** Implements RoutePolicies list by resource group GET method. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: RoutePoliciesListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<RoutePolicy>;
  /** Implements Route Policy DELETE method. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    routePolicyName: string,
    options?: RoutePoliciesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** API to update certain properties of the Route Policy resource. */
  update: (
    resourceGroupName: string,
    routePolicyName: string,
    properties: RoutePolicyPatch,
    options?: RoutePoliciesUpdateOptionalParams,
  ) => PollerLike<OperationState<RoutePolicy>, RoutePolicy>;
  /** Implements Route Policy PUT method. */
  create: (
    resourceGroupName: string,
    routePolicyName: string,
    resource: RoutePolicy,
    options?: RoutePoliciesCreateOptionalParams,
  ) => PollerLike<OperationState<RoutePolicy>, RoutePolicy>;
  /** Implements Route Policy GET method. */
  get: (
    resourceGroupName: string,
    routePolicyName: string,
    options?: RoutePoliciesGetOptionalParams,
  ) => Promise<RoutePolicy>;
}

function _getRoutePolicies(context: ManagedNetworkFabricContext) {
  return {
    commitConfiguration: (
      resourceGroupName: string,
      routePolicyName: string,
      options?: RoutePoliciesCommitConfigurationOptionalParams,
    ) => commitConfiguration(context, resourceGroupName, routePolicyName, options),
    validateConfiguration: (
      resourceGroupName: string,
      routePolicyName: string,
      options?: RoutePoliciesValidateConfigurationOptionalParams,
    ) => validateConfiguration(context, resourceGroupName, routePolicyName, options),
    updateAdministrativeState: (
      resourceGroupName: string,
      routePolicyName: string,
      body: UpdateAdministrativeState,
      options?: RoutePoliciesUpdateAdministrativeStateOptionalParams,
    ) => updateAdministrativeState(context, resourceGroupName, routePolicyName, body, options),
    listBySubscription: (options?: RoutePoliciesListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: RoutePoliciesListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      routePolicyName: string,
      options?: RoutePoliciesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, routePolicyName, options),
    update: (
      resourceGroupName: string,
      routePolicyName: string,
      properties: RoutePolicyPatch,
      options?: RoutePoliciesUpdateOptionalParams,
    ) => update(context, resourceGroupName, routePolicyName, properties, options),
    create: (
      resourceGroupName: string,
      routePolicyName: string,
      resource: RoutePolicy,
      options?: RoutePoliciesCreateOptionalParams,
    ) => create(context, resourceGroupName, routePolicyName, resource, options),
    get: (
      resourceGroupName: string,
      routePolicyName: string,
      options?: RoutePoliciesGetOptionalParams,
    ) => get(context, resourceGroupName, routePolicyName, options),
  };
}

export function _getRoutePoliciesOperations(
  context: ManagedNetworkFabricContext,
): RoutePoliciesOperations {
  return {
    ..._getRoutePolicies(context),
  };
}

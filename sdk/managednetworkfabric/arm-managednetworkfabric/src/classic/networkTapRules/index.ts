// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ManagedNetworkFabricContext } from "../../api/managedNetworkFabricContext.js";
import {
  validateConfiguration,
  resync,
  updateAdministrativeState,
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  create,
  get,
} from "../../api/networkTapRules/operations.js";
import type {
  NetworkTapRulesValidateConfigurationOptionalParams,
  NetworkTapRulesResyncOptionalParams,
  NetworkTapRulesUpdateAdministrativeStateOptionalParams,
  NetworkTapRulesListBySubscriptionOptionalParams,
  NetworkTapRulesListByResourceGroupOptionalParams,
  NetworkTapRulesDeleteOptionalParams,
  NetworkTapRulesUpdateOptionalParams,
  NetworkTapRulesCreateOptionalParams,
  NetworkTapRulesGetOptionalParams,
} from "../../api/networkTapRules/options.js";
import type {
  UpdateAdministrativeState,
  CommonPostActionResponseForStateUpdate,
  ValidateConfigurationResponse,
  NetworkTapRule,
  NetworkTapRulePatch,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a NetworkTapRules operations. */
export interface NetworkTapRulesOperations {
  /** Implements the operation to the underlying resources. */
  validateConfiguration: (
    resourceGroupName: string,
    networkTapRuleName: string,
    options?: NetworkTapRulesValidateConfigurationOptionalParams,
  ) => PollerLike<OperationState<ValidateConfigurationResponse>, ValidateConfigurationResponse>;
  /** Implements the operation to the underlying resources. */
  resync: (
    resourceGroupName: string,
    networkTapRuleName: string,
    options?: NetworkTapRulesResyncOptionalParams,
  ) => PollerLike<
    OperationState<CommonPostActionResponseForStateUpdate>,
    CommonPostActionResponseForStateUpdate
  >;
  /** Implements the operation to the underlying resources. */
  updateAdministrativeState: (
    resourceGroupName: string,
    networkTapRuleName: string,
    body: UpdateAdministrativeState,
    options?: NetworkTapRulesUpdateAdministrativeStateOptionalParams,
  ) => PollerLike<
    OperationState<CommonPostActionResponseForStateUpdate>,
    CommonPostActionResponseForStateUpdate
  >;
  /** List all the Network Tap Rule resources in the given subscription. */
  listBySubscription: (
    options?: NetworkTapRulesListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<NetworkTapRule>;
  /** List all the Network Tap Rule resources in the given resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: NetworkTapRulesListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<NetworkTapRule>;
  /** Delete Network Tap Rule resource. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    networkTapRuleName: string,
    options?: NetworkTapRulesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update certain properties of the Network Tap Rule resource. */
  update: (
    resourceGroupName: string,
    networkTapRuleName: string,
    properties: NetworkTapRulePatch,
    options?: NetworkTapRulesUpdateOptionalParams,
  ) => PollerLike<OperationState<NetworkTapRule>, NetworkTapRule>;
  /** Create Network Tap Rule resource. */
  create: (
    resourceGroupName: string,
    networkTapRuleName: string,
    resource: NetworkTapRule,
    options?: NetworkTapRulesCreateOptionalParams,
  ) => PollerLike<OperationState<NetworkTapRule>, NetworkTapRule>;
  /** Get Network Tap Rule resource details. */
  get: (
    resourceGroupName: string,
    networkTapRuleName: string,
    options?: NetworkTapRulesGetOptionalParams,
  ) => Promise<NetworkTapRule>;
}

function _getNetworkTapRules(context: ManagedNetworkFabricContext) {
  return {
    validateConfiguration: (
      resourceGroupName: string,
      networkTapRuleName: string,
      options?: NetworkTapRulesValidateConfigurationOptionalParams,
    ) => validateConfiguration(context, resourceGroupName, networkTapRuleName, options),
    resync: (
      resourceGroupName: string,
      networkTapRuleName: string,
      options?: NetworkTapRulesResyncOptionalParams,
    ) => resync(context, resourceGroupName, networkTapRuleName, options),
    updateAdministrativeState: (
      resourceGroupName: string,
      networkTapRuleName: string,
      body: UpdateAdministrativeState,
      options?: NetworkTapRulesUpdateAdministrativeStateOptionalParams,
    ) => updateAdministrativeState(context, resourceGroupName, networkTapRuleName, body, options),
    listBySubscription: (options?: NetworkTapRulesListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: NetworkTapRulesListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      networkTapRuleName: string,
      options?: NetworkTapRulesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, networkTapRuleName, options),
    update: (
      resourceGroupName: string,
      networkTapRuleName: string,
      properties: NetworkTapRulePatch,
      options?: NetworkTapRulesUpdateOptionalParams,
    ) => update(context, resourceGroupName, networkTapRuleName, properties, options),
    create: (
      resourceGroupName: string,
      networkTapRuleName: string,
      resource: NetworkTapRule,
      options?: NetworkTapRulesCreateOptionalParams,
    ) => create(context, resourceGroupName, networkTapRuleName, resource, options),
    get: (
      resourceGroupName: string,
      networkTapRuleName: string,
      options?: NetworkTapRulesGetOptionalParams,
    ) => get(context, resourceGroupName, networkTapRuleName, options),
  };
}

export function _getNetworkTapRulesOperations(
  context: ManagedNetworkFabricContext,
): NetworkTapRulesOperations {
  return {
    ..._getNetworkTapRules(context),
  };
}

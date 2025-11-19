// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ManagedNetworkFabricContext } from "../../api/managedNetworkFabricContext.js";
import {
  resync,
  updateAdministrativeState,
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  create,
  get,
} from "../../api/networkTaps/operations.js";
import type {
  NetworkTapsResyncOptionalParams,
  NetworkTapsUpdateAdministrativeStateOptionalParams,
  NetworkTapsListBySubscriptionOptionalParams,
  NetworkTapsListByResourceGroupOptionalParams,
  NetworkTapsDeleteOptionalParams,
  NetworkTapsUpdateOptionalParams,
  NetworkTapsCreateOptionalParams,
  NetworkTapsGetOptionalParams,
} from "../../api/networkTaps/options.js";
import type {
  UpdateAdministrativeState,
  CommonPostActionResponseForStateUpdate,
  CommonPostActionResponseForDeviceUpdate,
  NetworkTap,
  NetworkTapPatch,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a NetworkTaps operations. */
export interface NetworkTapsOperations {
  /** Implements the operation to the underlying resources. */
  resync: (
    resourceGroupName: string,
    networkTapName: string,
    options?: NetworkTapsResyncOptionalParams,
  ) => PollerLike<
    OperationState<CommonPostActionResponseForStateUpdate>,
    CommonPostActionResponseForStateUpdate
  >;
  /** Implements the operation to the underlying resources. */
  updateAdministrativeState: (
    resourceGroupName: string,
    networkTapName: string,
    body: UpdateAdministrativeState,
    options?: NetworkTapsUpdateAdministrativeStateOptionalParams,
  ) => PollerLike<
    OperationState<CommonPostActionResponseForDeviceUpdate>,
    CommonPostActionResponseForDeviceUpdate
  >;
  /** Displays Network Taps list by subscription GET method. */
  listBySubscription: (
    options?: NetworkTapsListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<NetworkTap>;
  /** Displays Network Taps list by resource group GET method. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: NetworkTapsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<NetworkTap>;
  /** Deletes Network Tap. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    networkTapName: string,
    options?: NetworkTapsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** API to update certain properties of the Network Tap resource. */
  update: (
    resourceGroupName: string,
    networkTapName: string,
    properties: NetworkTapPatch,
    options?: NetworkTapsUpdateOptionalParams,
  ) => PollerLike<OperationState<NetworkTap>, NetworkTap>;
  /** Creates a Network Tap. */
  create: (
    resourceGroupName: string,
    networkTapName: string,
    resource: NetworkTap,
    options?: NetworkTapsCreateOptionalParams,
  ) => PollerLike<OperationState<NetworkTap>, NetworkTap>;
  /** Retrieves details of this Network Tap. */
  get: (
    resourceGroupName: string,
    networkTapName: string,
    options?: NetworkTapsGetOptionalParams,
  ) => Promise<NetworkTap>;
}

function _getNetworkTaps(context: ManagedNetworkFabricContext) {
  return {
    resync: (
      resourceGroupName: string,
      networkTapName: string,
      options?: NetworkTapsResyncOptionalParams,
    ) => resync(context, resourceGroupName, networkTapName, options),
    updateAdministrativeState: (
      resourceGroupName: string,
      networkTapName: string,
      body: UpdateAdministrativeState,
      options?: NetworkTapsUpdateAdministrativeStateOptionalParams,
    ) => updateAdministrativeState(context, resourceGroupName, networkTapName, body, options),
    listBySubscription: (options?: NetworkTapsListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: NetworkTapsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      networkTapName: string,
      options?: NetworkTapsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, networkTapName, options),
    update: (
      resourceGroupName: string,
      networkTapName: string,
      properties: NetworkTapPatch,
      options?: NetworkTapsUpdateOptionalParams,
    ) => update(context, resourceGroupName, networkTapName, properties, options),
    create: (
      resourceGroupName: string,
      networkTapName: string,
      resource: NetworkTap,
      options?: NetworkTapsCreateOptionalParams,
    ) => create(context, resourceGroupName, networkTapName, resource, options),
    get: (
      resourceGroupName: string,
      networkTapName: string,
      options?: NetworkTapsGetOptionalParams,
    ) => get(context, resourceGroupName, networkTapName, options),
  };
}

export function _getNetworkTapsOperations(
  context: ManagedNetworkFabricContext,
): NetworkTapsOperations {
  return {
    ..._getNetworkTaps(context),
  };
}

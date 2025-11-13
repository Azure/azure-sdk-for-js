// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ManagedNetworkFabricContext } from "../../api/managedNetworkFabricContext.js";
import {
  updateBfdAdministrativeState,
  updateAdministrativeState,
  listByNetworkFabric,
  $delete,
  update,
  create,
  get,
} from "../../api/networkToNetworkInterconnects/operations.js";
import type {
  NetworkToNetworkInterconnectsUpdateBfdAdministrativeStateOptionalParams,
  NetworkToNetworkInterconnectsUpdateAdministrativeStateOptionalParams,
  NetworkToNetworkInterconnectsListByNetworkFabricOptionalParams,
  NetworkToNetworkInterconnectsDeleteOptionalParams,
  NetworkToNetworkInterconnectsUpdateOptionalParams,
  NetworkToNetworkInterconnectsCreateOptionalParams,
  NetworkToNetworkInterconnectsGetOptionalParams,
} from "../../api/networkToNetworkInterconnects/options.js";
import type {
  UpdateAdministrativeState,
  CommonPostActionResponseForStateUpdate,
  NetworkToNetworkInterconnect,
  NetworkToNetworkInterconnectPatch,
  NniBfdAdministrativeStateRequest,
  NniBfdAdministrativeStateResponse,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a NetworkToNetworkInterconnects operations. */
export interface NetworkToNetworkInterconnectsOperations {
  /** Updates the Admin State. */
  updateBfdAdministrativeState: (
    resourceGroupName: string,
    networkFabricName: string,
    networkToNetworkInterconnectName: string,
    body: NniBfdAdministrativeStateRequest,
    options?: NetworkToNetworkInterconnectsUpdateBfdAdministrativeStateOptionalParams,
  ) => PollerLike<
    OperationState<NniBfdAdministrativeStateResponse>,
    NniBfdAdministrativeStateResponse
  >;
  /** Updates the Admin State. */
  updateAdministrativeState: (
    resourceGroupName: string,
    networkFabricName: string,
    networkToNetworkInterconnectName: string,
    body: UpdateAdministrativeState,
    options?: NetworkToNetworkInterconnectsUpdateAdministrativeStateOptionalParams,
  ) => PollerLike<
    OperationState<CommonPostActionResponseForStateUpdate>,
    CommonPostActionResponseForStateUpdate
  >;
  /** Implements Network To Network Interconnects list by Network Fabric GET method. */
  listByNetworkFabric: (
    resourceGroupName: string,
    networkFabricName: string,
    options?: NetworkToNetworkInterconnectsListByNetworkFabricOptionalParams,
  ) => PagedAsyncIterableIterator<NetworkToNetworkInterconnect>;
  /** Implements NetworkToNetworkInterconnects DELETE method. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    networkFabricName: string,
    networkToNetworkInterconnectName: string,
    options?: NetworkToNetworkInterconnectsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update certain properties of the Network To NetworkInterconnects resource. */
  update: (
    resourceGroupName: string,
    networkFabricName: string,
    networkToNetworkInterconnectName: string,
    properties: NetworkToNetworkInterconnectPatch,
    options?: NetworkToNetworkInterconnectsUpdateOptionalParams,
  ) => PollerLike<OperationState<NetworkToNetworkInterconnect>, NetworkToNetworkInterconnect>;
  /** Configuration used to setup CE-PE connectivity PUT Method. */
  create: (
    resourceGroupName: string,
    networkFabricName: string,
    networkToNetworkInterconnectName: string,
    resource: NetworkToNetworkInterconnect,
    options?: NetworkToNetworkInterconnectsCreateOptionalParams,
  ) => PollerLike<OperationState<NetworkToNetworkInterconnect>, NetworkToNetworkInterconnect>;
  /** Implements NetworkToNetworkInterconnects GET method. */
  get: (
    resourceGroupName: string,
    networkFabricName: string,
    networkToNetworkInterconnectName: string,
    options?: NetworkToNetworkInterconnectsGetOptionalParams,
  ) => Promise<NetworkToNetworkInterconnect>;
}

function _getNetworkToNetworkInterconnects(context: ManagedNetworkFabricContext) {
  return {
    updateBfdAdministrativeState: (
      resourceGroupName: string,
      networkFabricName: string,
      networkToNetworkInterconnectName: string,
      body: NniBfdAdministrativeStateRequest,
      options?: NetworkToNetworkInterconnectsUpdateBfdAdministrativeStateOptionalParams,
    ) =>
      updateBfdAdministrativeState(
        context,
        resourceGroupName,
        networkFabricName,
        networkToNetworkInterconnectName,
        body,
        options,
      ),
    updateAdministrativeState: (
      resourceGroupName: string,
      networkFabricName: string,
      networkToNetworkInterconnectName: string,
      body: UpdateAdministrativeState,
      options?: NetworkToNetworkInterconnectsUpdateAdministrativeStateOptionalParams,
    ) =>
      updateAdministrativeState(
        context,
        resourceGroupName,
        networkFabricName,
        networkToNetworkInterconnectName,
        body,
        options,
      ),
    listByNetworkFabric: (
      resourceGroupName: string,
      networkFabricName: string,
      options?: NetworkToNetworkInterconnectsListByNetworkFabricOptionalParams,
    ) => listByNetworkFabric(context, resourceGroupName, networkFabricName, options),
    delete: (
      resourceGroupName: string,
      networkFabricName: string,
      networkToNetworkInterconnectName: string,
      options?: NetworkToNetworkInterconnectsDeleteOptionalParams,
    ) =>
      $delete(
        context,
        resourceGroupName,
        networkFabricName,
        networkToNetworkInterconnectName,
        options,
      ),
    update: (
      resourceGroupName: string,
      networkFabricName: string,
      networkToNetworkInterconnectName: string,
      properties: NetworkToNetworkInterconnectPatch,
      options?: NetworkToNetworkInterconnectsUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        networkFabricName,
        networkToNetworkInterconnectName,
        properties,
        options,
      ),
    create: (
      resourceGroupName: string,
      networkFabricName: string,
      networkToNetworkInterconnectName: string,
      resource: NetworkToNetworkInterconnect,
      options?: NetworkToNetworkInterconnectsCreateOptionalParams,
    ) =>
      create(
        context,
        resourceGroupName,
        networkFabricName,
        networkToNetworkInterconnectName,
        resource,
        options,
      ),
    get: (
      resourceGroupName: string,
      networkFabricName: string,
      networkToNetworkInterconnectName: string,
      options?: NetworkToNetworkInterconnectsGetOptionalParams,
    ) =>
      get(context, resourceGroupName, networkFabricName, networkToNetworkInterconnectName, options),
  };
}

export function _getNetworkToNetworkInterconnectsOperations(
  context: ManagedNetworkFabricContext,
): NetworkToNetworkInterconnectsOperations {
  return {
    ..._getNetworkToNetworkInterconnects(context),
  };
}

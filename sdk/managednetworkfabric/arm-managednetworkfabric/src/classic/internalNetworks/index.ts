// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ManagedNetworkFabricContext } from "../../api/managedNetworkFabricContext.js";
import {
  updateBfdAdministrativeState,
  updateBgpAdministrativeState,
  updateAdministrativeState,
  listByL3IsolationDomain,
  $delete,
  update,
  create,
  get,
} from "../../api/internalNetworks/operations.js";
import type {
  InternalNetworksUpdateBfdAdministrativeStateOptionalParams,
  InternalNetworksUpdateBgpAdministrativeStateOptionalParams,
  InternalNetworksUpdateAdministrativeStateOptionalParams,
  InternalNetworksListByL3IsolationDomainOptionalParams,
  InternalNetworksDeleteOptionalParams,
  InternalNetworksUpdateOptionalParams,
  InternalNetworksCreateOptionalParams,
  InternalNetworksGetOptionalParams,
} from "../../api/internalNetworks/options.js";
import type {
  UpdateAdministrativeState,
  CommonPostActionResponseForStateUpdate,
  InternalNetwork,
  InternalNetworkPatch,
  InternalNetworkBgpAdministrativeStateRequest,
  InternalNetworkBgpAdministrativeStateResponse,
  InternalNetworkBfdAdministrativeStateRequest,
  InternalNetworkBfdAdministrativeStateResponse,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a InternalNetworks operations. */
export interface InternalNetworksOperations {
  /** BFD administrative state for either static or bgp for internalNetwork. */
  updateBfdAdministrativeState: (
    resourceGroupName: string,
    l3IsolationDomainName: string,
    internalNetworkName: string,
    body: InternalNetworkBfdAdministrativeStateRequest,
    options?: InternalNetworksUpdateBfdAdministrativeStateOptionalParams,
  ) => PollerLike<
    OperationState<InternalNetworkBfdAdministrativeStateResponse>,
    InternalNetworkBfdAdministrativeStateResponse
  >;
  /** Update BGP state for internalNetwork. Allowed only on edge devices. */
  updateBgpAdministrativeState: (
    resourceGroupName: string,
    l3IsolationDomainName: string,
    internalNetworkName: string,
    body: InternalNetworkBgpAdministrativeStateRequest,
    options?: InternalNetworksUpdateBgpAdministrativeStateOptionalParams,
  ) => PollerLike<
    OperationState<InternalNetworkBgpAdministrativeStateResponse>,
    InternalNetworkBgpAdministrativeStateResponse
  >;
  /** Update Administrative state of  InternalNetworks on resources referred by their resource ids. */
  updateAdministrativeState: (
    resourceGroupName: string,
    l3IsolationDomainName: string,
    internalNetworkName: string,
    body: UpdateAdministrativeState,
    options?: InternalNetworksUpdateAdministrativeStateOptionalParams,
  ) => PollerLike<
    OperationState<CommonPostActionResponseForStateUpdate>,
    CommonPostActionResponseForStateUpdate
  >;
  /** Displays InternalNetworks list by resource group GET method. */
  listByL3IsolationDomain: (
    resourceGroupName: string,
    l3IsolationDomainName: string,
    options?: InternalNetworksListByL3IsolationDomainOptionalParams,
  ) => PagedAsyncIterableIterator<InternalNetwork>;
  /** Implements InternalNetworks DELETE method. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    l3IsolationDomainName: string,
    internalNetworkName: string,
    options?: InternalNetworksDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Updates a InternalNetworks. */
  update: (
    resourceGroupName: string,
    l3IsolationDomainName: string,
    internalNetworkName: string,
    properties: InternalNetworkPatch,
    options?: InternalNetworksUpdateOptionalParams,
  ) => PollerLike<OperationState<InternalNetwork>, InternalNetwork>;
  /** Creates InternalNetwork PUT method. */
  create: (
    resourceGroupName: string,
    l3IsolationDomainName: string,
    internalNetworkName: string,
    resource: InternalNetwork,
    options?: InternalNetworksCreateOptionalParams,
  ) => PollerLike<OperationState<InternalNetwork>, InternalNetwork>;
  /** Gets a InternalNetworks. */
  get: (
    resourceGroupName: string,
    l3IsolationDomainName: string,
    internalNetworkName: string,
    options?: InternalNetworksGetOptionalParams,
  ) => Promise<InternalNetwork>;
}

function _getInternalNetworks(context: ManagedNetworkFabricContext) {
  return {
    updateBfdAdministrativeState: (
      resourceGroupName: string,
      l3IsolationDomainName: string,
      internalNetworkName: string,
      body: InternalNetworkBfdAdministrativeStateRequest,
      options?: InternalNetworksUpdateBfdAdministrativeStateOptionalParams,
    ) =>
      updateBfdAdministrativeState(
        context,
        resourceGroupName,
        l3IsolationDomainName,
        internalNetworkName,
        body,
        options,
      ),
    updateBgpAdministrativeState: (
      resourceGroupName: string,
      l3IsolationDomainName: string,
      internalNetworkName: string,
      body: InternalNetworkBgpAdministrativeStateRequest,
      options?: InternalNetworksUpdateBgpAdministrativeStateOptionalParams,
    ) =>
      updateBgpAdministrativeState(
        context,
        resourceGroupName,
        l3IsolationDomainName,
        internalNetworkName,
        body,
        options,
      ),
    updateAdministrativeState: (
      resourceGroupName: string,
      l3IsolationDomainName: string,
      internalNetworkName: string,
      body: UpdateAdministrativeState,
      options?: InternalNetworksUpdateAdministrativeStateOptionalParams,
    ) =>
      updateAdministrativeState(
        context,
        resourceGroupName,
        l3IsolationDomainName,
        internalNetworkName,
        body,
        options,
      ),
    listByL3IsolationDomain: (
      resourceGroupName: string,
      l3IsolationDomainName: string,
      options?: InternalNetworksListByL3IsolationDomainOptionalParams,
    ) => listByL3IsolationDomain(context, resourceGroupName, l3IsolationDomainName, options),
    delete: (
      resourceGroupName: string,
      l3IsolationDomainName: string,
      internalNetworkName: string,
      options?: InternalNetworksDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, l3IsolationDomainName, internalNetworkName, options),
    update: (
      resourceGroupName: string,
      l3IsolationDomainName: string,
      internalNetworkName: string,
      properties: InternalNetworkPatch,
      options?: InternalNetworksUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        l3IsolationDomainName,
        internalNetworkName,
        properties,
        options,
      ),
    create: (
      resourceGroupName: string,
      l3IsolationDomainName: string,
      internalNetworkName: string,
      resource: InternalNetwork,
      options?: InternalNetworksCreateOptionalParams,
    ) =>
      create(
        context,
        resourceGroupName,
        l3IsolationDomainName,
        internalNetworkName,
        resource,
        options,
      ),
    get: (
      resourceGroupName: string,
      l3IsolationDomainName: string,
      internalNetworkName: string,
      options?: InternalNetworksGetOptionalParams,
    ) => get(context, resourceGroupName, l3IsolationDomainName, internalNetworkName, options),
  };
}

export function _getInternalNetworksOperations(
  context: ManagedNetworkFabricContext,
): InternalNetworksOperations {
  return {
    ..._getInternalNetworks(context),
  };
}

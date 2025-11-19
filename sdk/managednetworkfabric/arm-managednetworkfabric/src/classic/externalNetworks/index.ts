// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ManagedNetworkFabricContext } from "../../api/managedNetworkFabricContext.js";
import {
  updateBfdAdministrativeState,
  updateAdministrativeState,
  listByL3IsolationDomain,
  $delete,
  update,
  create,
  get,
} from "../../api/externalNetworks/operations.js";
import type {
  ExternalNetworksUpdateBfdAdministrativeStateOptionalParams,
  ExternalNetworksUpdateAdministrativeStateOptionalParams,
  ExternalNetworksListByL3IsolationDomainOptionalParams,
  ExternalNetworksDeleteOptionalParams,
  ExternalNetworksUpdateOptionalParams,
  ExternalNetworksCreateOptionalParams,
  ExternalNetworksGetOptionalParams,
} from "../../api/externalNetworks/options.js";
import type {
  UpdateAdministrativeState,
  CommonPostActionResponseForStateUpdate,
  ExternalNetwork,
  ExternalNetworkPatch,
  ExternalNetworkBfdAdministrativeStateRequest,
  ExternalNetworkBfdAdministrativeStateResponse,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ExternalNetworks operations. */
export interface ExternalNetworksOperations {
  /** BFD administrative state for either static or bgp for internalNetwork. */
  updateBfdAdministrativeState: (
    resourceGroupName: string,
    l3IsolationDomainName: string,
    externalNetworkName: string,
    body: ExternalNetworkBfdAdministrativeStateRequest,
    options?: ExternalNetworksUpdateBfdAdministrativeStateOptionalParams,
  ) => PollerLike<
    OperationState<ExternalNetworkBfdAdministrativeStateResponse>,
    ExternalNetworkBfdAdministrativeStateResponse
  >;
  /** Executes update operation to enable or disable administrative State for externalNetwork. */
  updateAdministrativeState: (
    resourceGroupName: string,
    l3IsolationDomainName: string,
    externalNetworkName: string,
    body: UpdateAdministrativeState,
    options?: ExternalNetworksUpdateAdministrativeStateOptionalParams,
  ) => PollerLike<
    OperationState<CommonPostActionResponseForStateUpdate>,
    CommonPostActionResponseForStateUpdate
  >;
  /** Implements External Networks list by resource group GET method. */
  listByL3IsolationDomain: (
    resourceGroupName: string,
    l3IsolationDomainName: string,
    options?: ExternalNetworksListByL3IsolationDomainOptionalParams,
  ) => PagedAsyncIterableIterator<ExternalNetwork>;
  /** Implements ExternalNetworks DELETE method. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    l3IsolationDomainName: string,
    externalNetworkName: string,
    options?: ExternalNetworksDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** API to update certain properties of the ExternalNetworks resource. */
  update: (
    resourceGroupName: string,
    l3IsolationDomainName: string,
    externalNetworkName: string,
    properties: ExternalNetworkPatch,
    options?: ExternalNetworksUpdateOptionalParams,
  ) => PollerLike<OperationState<ExternalNetwork>, ExternalNetwork>;
  /** Creates ExternalNetwork PUT method. */
  create: (
    resourceGroupName: string,
    l3IsolationDomainName: string,
    externalNetworkName: string,
    resource: ExternalNetwork,
    options?: ExternalNetworksCreateOptionalParams,
  ) => PollerLike<OperationState<ExternalNetwork>, ExternalNetwork>;
  /** Implements ExternalNetworks GET method. */
  get: (
    resourceGroupName: string,
    l3IsolationDomainName: string,
    externalNetworkName: string,
    options?: ExternalNetworksGetOptionalParams,
  ) => Promise<ExternalNetwork>;
}

function _getExternalNetworks(context: ManagedNetworkFabricContext) {
  return {
    updateBfdAdministrativeState: (
      resourceGroupName: string,
      l3IsolationDomainName: string,
      externalNetworkName: string,
      body: ExternalNetworkBfdAdministrativeStateRequest,
      options?: ExternalNetworksUpdateBfdAdministrativeStateOptionalParams,
    ) =>
      updateBfdAdministrativeState(
        context,
        resourceGroupName,
        l3IsolationDomainName,
        externalNetworkName,
        body,
        options,
      ),
    updateAdministrativeState: (
      resourceGroupName: string,
      l3IsolationDomainName: string,
      externalNetworkName: string,
      body: UpdateAdministrativeState,
      options?: ExternalNetworksUpdateAdministrativeStateOptionalParams,
    ) =>
      updateAdministrativeState(
        context,
        resourceGroupName,
        l3IsolationDomainName,
        externalNetworkName,
        body,
        options,
      ),
    listByL3IsolationDomain: (
      resourceGroupName: string,
      l3IsolationDomainName: string,
      options?: ExternalNetworksListByL3IsolationDomainOptionalParams,
    ) => listByL3IsolationDomain(context, resourceGroupName, l3IsolationDomainName, options),
    delete: (
      resourceGroupName: string,
      l3IsolationDomainName: string,
      externalNetworkName: string,
      options?: ExternalNetworksDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, l3IsolationDomainName, externalNetworkName, options),
    update: (
      resourceGroupName: string,
      l3IsolationDomainName: string,
      externalNetworkName: string,
      properties: ExternalNetworkPatch,
      options?: ExternalNetworksUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        l3IsolationDomainName,
        externalNetworkName,
        properties,
        options,
      ),
    create: (
      resourceGroupName: string,
      l3IsolationDomainName: string,
      externalNetworkName: string,
      resource: ExternalNetwork,
      options?: ExternalNetworksCreateOptionalParams,
    ) =>
      create(
        context,
        resourceGroupName,
        l3IsolationDomainName,
        externalNetworkName,
        resource,
        options,
      ),
    get: (
      resourceGroupName: string,
      l3IsolationDomainName: string,
      externalNetworkName: string,
      options?: ExternalNetworksGetOptionalParams,
    ) => get(context, resourceGroupName, l3IsolationDomainName, externalNetworkName, options),
  };
}

export function _getExternalNetworksOperations(
  context: ManagedNetworkFabricContext,
): ExternalNetworksOperations {
  return {
    ..._getExternalNetworks(context),
  };
}

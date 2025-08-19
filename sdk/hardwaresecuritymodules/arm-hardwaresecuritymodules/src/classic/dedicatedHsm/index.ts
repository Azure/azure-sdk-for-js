// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureDedicatedHSMResourceProviderContext } from "../../api/azureDedicatedHSMResourceProviderContext.js";
import {
  listOutboundNetworkDependenciesEndpoints,
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/dedicatedHsm/operations.js";
import {
  DedicatedHsmListOutboundNetworkDependenciesEndpointsOptionalParams,
  DedicatedHsmListBySubscriptionOptionalParams,
  DedicatedHsmListByResourceGroupOptionalParams,
  DedicatedHsmDeleteOptionalParams,
  DedicatedHsmUpdateOptionalParams,
  DedicatedHsmCreateOrUpdateOptionalParams,
  DedicatedHsmGetOptionalParams,
} from "../../api/dedicatedHsm/options.js";
import {
  DedicatedHsm,
  DedicatedHsmPatchParameters,
  OutboundEnvironmentEndpoint,
} from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a DedicatedHsm operations. */
export interface DedicatedHsmOperations {
  /** Gets a list of egress endpoints (network endpoints of all outbound dependencies) in the specified dedicated hsm resource. The operation returns properties of each egress endpoint. */
  listOutboundNetworkDependenciesEndpoints: (
    resourceGroupName: string,
    name: string,
    options?: DedicatedHsmListOutboundNetworkDependenciesEndpointsOptionalParams,
  ) => PagedAsyncIterableIterator<OutboundEnvironmentEndpoint>;
  /** The List operation gets information about the dedicated HSMs associated with the subscription. */
  listBySubscription: (
    options?: DedicatedHsmListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<DedicatedHsm>;
  /** The List operation gets information about the dedicated HSMs associated with the subscription and within the specified resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: DedicatedHsmListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<DedicatedHsm>;
  /** Deletes the specified Azure Dedicated HSM. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    name: string,
    options?: DedicatedHsmDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update a dedicated HSM in the specified subscription. */
  update: (
    resourceGroupName: string,
    name: string,
    parameters: DedicatedHsmPatchParameters,
    options?: DedicatedHsmUpdateOptionalParams,
  ) => PollerLike<OperationState<DedicatedHsm>, DedicatedHsm>;
  /** Create or Update a dedicated HSM in the specified subscription. */
  createOrUpdate: (
    resourceGroupName: string,
    name: string,
    parameters: DedicatedHsm,
    options?: DedicatedHsmCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<DedicatedHsm>, DedicatedHsm>;
  /** Gets the specified Azure dedicated HSM. */
  get: (
    resourceGroupName: string,
    name: string,
    options?: DedicatedHsmGetOptionalParams,
  ) => Promise<DedicatedHsm>;
}

function _getDedicatedHsm(context: AzureDedicatedHSMResourceProviderContext) {
  return {
    listOutboundNetworkDependenciesEndpoints: (
      resourceGroupName: string,
      name: string,
      options?: DedicatedHsmListOutboundNetworkDependenciesEndpointsOptionalParams,
    ) => listOutboundNetworkDependenciesEndpoints(context, resourceGroupName, name, options),
    listBySubscription: (options?: DedicatedHsmListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: DedicatedHsmListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (resourceGroupName: string, name: string, options?: DedicatedHsmDeleteOptionalParams) =>
      $delete(context, resourceGroupName, name, options),
    update: (
      resourceGroupName: string,
      name: string,
      parameters: DedicatedHsmPatchParameters,
      options?: DedicatedHsmUpdateOptionalParams,
    ) => update(context, resourceGroupName, name, parameters, options),
    createOrUpdate: (
      resourceGroupName: string,
      name: string,
      parameters: DedicatedHsm,
      options?: DedicatedHsmCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, name, parameters, options),
    get: (resourceGroupName: string, name: string, options?: DedicatedHsmGetOptionalParams) =>
      get(context, resourceGroupName, name, options),
  };
}

export function _getDedicatedHsmOperations(
  context: AzureDedicatedHSMResourceProviderContext,
): DedicatedHsmOperations {
  return {
    ..._getDedicatedHsm(context),
  };
}

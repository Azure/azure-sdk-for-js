// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkContext } from "../../api/networkContext.js";
import { PrivateZone } from "../../models/models.js";
import {
  PrivateZonesListOptionalParams,
  PrivateZonesListByResourceGroupOptionalParams,
  PrivateZonesDeleteOptionalParams,
  PrivateZonesUpdateOptionalParams,
  PrivateZonesCreateOrUpdateOptionalParams,
  PrivateZonesGetOptionalParams,
} from "../../api/privateZones/options.js";
import {
  list,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/privateZones/operations.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a PrivateZones operations. */
export interface PrivateZonesOperations {
  /** Lists the Private DNS zones in all resource groups in a subscription. */
  list: (options?: PrivateZonesListOptionalParams) => PagedAsyncIterableIterator<PrivateZone>;
  /** Lists the Private DNS zones within a resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: PrivateZonesListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<PrivateZone>;
  /** Deletes a Private DNS zone. WARNING: All DNS records in the zone will also be deleted. This operation cannot be undone. Private DNS zone cannot be deleted unless all virtual network links to it are removed. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    privateZoneName: string,
    options?: PrivateZonesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Updates a Private DNS zone. Does not modify virtual network links or DNS records within the zone. */
  update: (
    resourceGroupName: string,
    privateZoneName: string,
    parameters: PrivateZone,
    options?: PrivateZonesUpdateOptionalParams,
  ) => PollerLike<OperationState<PrivateZone>, PrivateZone>;
  /** Creates or updates a Private DNS zone. Does not modify Links to virtual networks or DNS records within the zone. */
  createOrUpdate: (
    resourceGroupName: string,
    privateZoneName: string,
    parameters: PrivateZone,
    options?: PrivateZonesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<PrivateZone>, PrivateZone>;
  /** Gets a Private DNS zone. Retrieves the zone properties, but not the virtual networks links or the record sets within the zone. */
  get: (
    resourceGroupName: string,
    privateZoneName: string,
    options?: PrivateZonesGetOptionalParams,
  ) => Promise<PrivateZone>;
}

function _getPrivateZones(context: NetworkContext) {
  return {
    list: (options?: PrivateZonesListOptionalParams) => list(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: PrivateZonesListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      privateZoneName: string,
      options?: PrivateZonesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, privateZoneName, options),
    update: (
      resourceGroupName: string,
      privateZoneName: string,
      parameters: PrivateZone,
      options?: PrivateZonesUpdateOptionalParams,
    ) => update(context, resourceGroupName, privateZoneName, parameters, options),
    createOrUpdate: (
      resourceGroupName: string,
      privateZoneName: string,
      parameters: PrivateZone,
      options?: PrivateZonesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, privateZoneName, parameters, options),
    get: (
      resourceGroupName: string,
      privateZoneName: string,
      options?: PrivateZonesGetOptionalParams,
    ) => get(context, resourceGroupName, privateZoneName, options),
  };
}

export function _getPrivateZonesOperations(context: NetworkContext): PrivateZonesOperations {
  return {
    ..._getPrivateZones(context),
  };
}

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkContext } from "../../api/networkContext.js";
import { Zone, ZoneUpdate } from "../../models/models.js";
import {
  ZonesListOptionalParams,
  ZonesListByResourceGroupOptionalParams,
  ZonesDeleteOptionalParams,
  ZonesUpdateOptionalParams,
  ZonesCreateOrUpdateOptionalParams,
  ZonesGetOptionalParams,
} from "../../api/zones/options.js";
import {
  list,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/zones/operations.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Zones operations. */
export interface ZonesOperations {
  /** Lists the DNS zones in all resource groups in a subscription. */
  list: (options?: ZonesListOptionalParams) => PagedAsyncIterableIterator<Zone>;
  /** Lists the DNS zones within a resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: ZonesListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<Zone>;
  /** Deletes a DNS zone. WARNING: All DNS records in the zone will also be deleted. This operation cannot be undone. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    zoneName: string,
    options?: ZonesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Updates a DNS zone. Does not modify DNS records within the zone. */
  update: (
    resourceGroupName: string,
    zoneName: string,
    parameters: ZoneUpdate,
    options?: ZonesUpdateOptionalParams,
  ) => Promise<Zone>;
  /** Creates or updates a DNS zone. Does not modify DNS records within the zone. */
  createOrUpdate: (
    resourceGroupName: string,
    zoneName: string,
    parameters: Zone,
    options?: ZonesCreateOrUpdateOptionalParams,
  ) => Promise<Zone>;
  /** Gets a DNS zone. Retrieves the zone properties, but not the record sets within the zone. */
  get: (
    resourceGroupName: string,
    zoneName: string,
    options?: ZonesGetOptionalParams,
  ) => Promise<Zone>;
}

function _getZones(context: NetworkContext) {
  return {
    list: (options?: ZonesListOptionalParams) => list(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: ZonesListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (resourceGroupName: string, zoneName: string, options?: ZonesDeleteOptionalParams) =>
      $delete(context, resourceGroupName, zoneName, options),
    update: (
      resourceGroupName: string,
      zoneName: string,
      parameters: ZoneUpdate,
      options?: ZonesUpdateOptionalParams,
    ) => update(context, resourceGroupName, zoneName, parameters, options),
    createOrUpdate: (
      resourceGroupName: string,
      zoneName: string,
      parameters: Zone,
      options?: ZonesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, zoneName, parameters, options),
    get: (resourceGroupName: string, zoneName: string, options?: ZonesGetOptionalParams) =>
      get(context, resourceGroupName, zoneName, options),
  };
}

export function _getZonesOperations(context: NetworkContext): ZonesOperations {
  return {
    ..._getZones(context),
  };
}

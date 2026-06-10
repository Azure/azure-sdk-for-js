// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PrivateDnsManagementContext } from "../../api/privateDnsManagementContext.js";
import {
  list,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/privateZones/operations.js";
import type {
  PrivateZonesListOptionalParams,
  PrivateZonesListByResourceGroupOptionalParams,
  PrivateZonesDeleteOptionalParams,
  PrivateZonesUpdateOptionalParams,
  PrivateZonesCreateOrUpdateOptionalParams,
  PrivateZonesGetOptionalParams,
} from "../../api/privateZones/options.js";
import type { PrivateZone } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

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
  delete: (
    resourceGroupName: string,
    privateZoneName: string,
    options?: PrivateZonesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    privateZoneName: string,
    options?: PrivateZonesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    privateZoneName: string,
    options?: PrivateZonesDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates a Private DNS zone. Does not modify virtual network links or DNS records within the zone. */
  update: (
    resourceGroupName: string,
    privateZoneName: string,
    parameters: PrivateZone,
    options?: PrivateZonesUpdateOptionalParams,
  ) => PollerLike<OperationState<PrivateZone>, PrivateZone>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    privateZoneName: string,
    parameters: PrivateZone,
    options?: PrivateZonesUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<PrivateZone>, PrivateZone>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    privateZoneName: string,
    parameters: PrivateZone,
    options?: PrivateZonesUpdateOptionalParams,
  ) => Promise<PrivateZone>;
  /** Creates or updates a Private DNS zone. Does not modify Links to virtual networks or DNS records within the zone. */
  createOrUpdate: (
    resourceGroupName: string,
    privateZoneName: string,
    parameters: PrivateZone,
    options?: PrivateZonesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<PrivateZone>, PrivateZone>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    privateZoneName: string,
    parameters: PrivateZone,
    options?: PrivateZonesCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<PrivateZone>, PrivateZone>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    privateZoneName: string,
    parameters: PrivateZone,
    options?: PrivateZonesCreateOrUpdateOptionalParams,
  ) => Promise<PrivateZone>;
  /** Gets a Private DNS zone. Retrieves the zone properties, but not the virtual networks links or the record sets within the zone. */
  get: (
    resourceGroupName: string,
    privateZoneName: string,
    options?: PrivateZonesGetOptionalParams,
  ) => Promise<PrivateZone>;
}

function _getPrivateZones(context: PrivateDnsManagementContext) {
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
    beginDelete: async (
      resourceGroupName: string,
      privateZoneName: string,
      options?: PrivateZonesDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, privateZoneName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      privateZoneName: string,
      options?: PrivateZonesDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, privateZoneName, options);
    },
    update: (
      resourceGroupName: string,
      privateZoneName: string,
      parameters: PrivateZone,
      options?: PrivateZonesUpdateOptionalParams,
    ) => update(context, resourceGroupName, privateZoneName, parameters, options),
    beginUpdate: async (
      resourceGroupName: string,
      privateZoneName: string,
      parameters: PrivateZone,
      options?: PrivateZonesUpdateOptionalParams,
    ) => {
      const poller = update(context, resourceGroupName, privateZoneName, parameters, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      privateZoneName: string,
      parameters: PrivateZone,
      options?: PrivateZonesUpdateOptionalParams,
    ) => {
      return await update(context, resourceGroupName, privateZoneName, parameters, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      privateZoneName: string,
      parameters: PrivateZone,
      options?: PrivateZonesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, privateZoneName, parameters, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      privateZoneName: string,
      parameters: PrivateZone,
      options?: PrivateZonesCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        privateZoneName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      privateZoneName: string,
      parameters: PrivateZone,
      options?: PrivateZonesCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(context, resourceGroupName, privateZoneName, parameters, options);
    },
    get: (
      resourceGroupName: string,
      privateZoneName: string,
      options?: PrivateZonesGetOptionalParams,
    ) => get(context, resourceGroupName, privateZoneName, options),
  };
}

export function _getPrivateZonesOperations(
  context: PrivateDnsManagementContext,
): PrivateZonesOperations {
  return {
    ..._getPrivateZones(context),
  };
}

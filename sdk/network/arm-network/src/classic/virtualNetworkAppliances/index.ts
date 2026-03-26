// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext } from "../../api/networkManagementContext.js";
import {
  listAll,
  list,
  $delete,
  updateTags,
  createOrUpdate,
  get,
} from "../../api/virtualNetworkAppliances/operations.js";
import type {
  VirtualNetworkAppliancesListAllOptionalParams,
  VirtualNetworkAppliancesListOptionalParams,
  VirtualNetworkAppliancesDeleteOptionalParams,
  VirtualNetworkAppliancesUpdateTagsOptionalParams,
  VirtualNetworkAppliancesCreateOrUpdateOptionalParams,
  VirtualNetworkAppliancesGetOptionalParams,
} from "../../api/virtualNetworkAppliances/options.js";
import type { TagsObject, VirtualNetworkAppliance } from "../../models/microsoft/network/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a VirtualNetworkAppliances operations. */
export interface VirtualNetworkAppliancesOperations {
  /** Gets all virtual network appliances in a subscription. */
  listAll: (
    options?: VirtualNetworkAppliancesListAllOptionalParams,
  ) => PagedAsyncIterableIterator<VirtualNetworkAppliance>;
  /** Gets all virtual network appliances in a resource group. */
  list: (
    resourceGroupName: string,
    options?: VirtualNetworkAppliancesListOptionalParams,
  ) => PagedAsyncIterableIterator<VirtualNetworkAppliance>;
  /** Deletes the specified virtual network appliance. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    virtualNetworkApplianceName: string,
    options?: VirtualNetworkAppliancesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    virtualNetworkApplianceName: string,
    options?: VirtualNetworkAppliancesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    virtualNetworkApplianceName: string,
    options?: VirtualNetworkAppliancesDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates a virtual network appliance tags. */
  updateTags: (
    resourceGroupName: string,
    virtualNetworkApplianceName: string,
    parameters: TagsObject,
    options?: VirtualNetworkAppliancesUpdateTagsOptionalParams,
  ) => Promise<VirtualNetworkAppliance>;
  /** Creates or updates a virtual network appliance. */
  createOrUpdate: (
    resourceGroupName: string,
    virtualNetworkApplianceName: string,
    parameters: VirtualNetworkAppliance,
    options?: VirtualNetworkAppliancesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<VirtualNetworkAppliance>, VirtualNetworkAppliance>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    virtualNetworkApplianceName: string,
    parameters: VirtualNetworkAppliance,
    options?: VirtualNetworkAppliancesCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<VirtualNetworkAppliance>, VirtualNetworkAppliance>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    virtualNetworkApplianceName: string,
    parameters: VirtualNetworkAppliance,
    options?: VirtualNetworkAppliancesCreateOrUpdateOptionalParams,
  ) => Promise<VirtualNetworkAppliance>;
  /** Gets information about the specified virtual network appliance. */
  get: (
    resourceGroupName: string,
    virtualNetworkApplianceName: string,
    options?: VirtualNetworkAppliancesGetOptionalParams,
  ) => Promise<VirtualNetworkAppliance>;
}

function _getVirtualNetworkAppliances(context: NetworkManagementContext) {
  return {
    listAll: (options?: VirtualNetworkAppliancesListAllOptionalParams) => listAll(context, options),
    list: (resourceGroupName: string, options?: VirtualNetworkAppliancesListOptionalParams) =>
      list(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      virtualNetworkApplianceName: string,
      options?: VirtualNetworkAppliancesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, virtualNetworkApplianceName, options),
    beginDelete: async (
      resourceGroupName: string,
      virtualNetworkApplianceName: string,
      options?: VirtualNetworkAppliancesDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, virtualNetworkApplianceName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      virtualNetworkApplianceName: string,
      options?: VirtualNetworkAppliancesDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, virtualNetworkApplianceName, options);
    },
    updateTags: (
      resourceGroupName: string,
      virtualNetworkApplianceName: string,
      parameters: TagsObject,
      options?: VirtualNetworkAppliancesUpdateTagsOptionalParams,
    ) => updateTags(context, resourceGroupName, virtualNetworkApplianceName, parameters, options),
    createOrUpdate: (
      resourceGroupName: string,
      virtualNetworkApplianceName: string,
      parameters: VirtualNetworkAppliance,
      options?: VirtualNetworkAppliancesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(context, resourceGroupName, virtualNetworkApplianceName, parameters, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      virtualNetworkApplianceName: string,
      parameters: VirtualNetworkAppliance,
      options?: VirtualNetworkAppliancesCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        virtualNetworkApplianceName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      virtualNetworkApplianceName: string,
      parameters: VirtualNetworkAppliance,
      options?: VirtualNetworkAppliancesCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        virtualNetworkApplianceName,
        parameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      virtualNetworkApplianceName: string,
      options?: VirtualNetworkAppliancesGetOptionalParams,
    ) => get(context, resourceGroupName, virtualNetworkApplianceName, options),
  };
}

export function _getVirtualNetworkAppliancesOperations(
  context: NetworkManagementContext,
): VirtualNetworkAppliancesOperations {
  return {
    ..._getVirtualNetworkAppliances(context),
  };
}

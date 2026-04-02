// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext } from "../../api/networkManagementContext.js";
import { list, $delete, createOrUpdate, get } from "../../api/virtualApplianceSites/operations.js";
import type {
  VirtualApplianceSitesListOptionalParams,
  VirtualApplianceSitesDeleteOptionalParams,
  VirtualApplianceSitesCreateOrUpdateOptionalParams,
  VirtualApplianceSitesGetOptionalParams,
} from "../../api/virtualApplianceSites/options.js";
import type { VirtualApplianceSite } from "../../models/microsoft/network/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a VirtualApplianceSites operations. */
export interface VirtualApplianceSitesOperations {
  /** Lists all Network Virtual Appliance Sites in a Network Virtual Appliance resource. */
  list: (
    resourceGroupName: string,
    networkVirtualApplianceName: string,
    options?: VirtualApplianceSitesListOptionalParams,
  ) => PagedAsyncIterableIterator<VirtualApplianceSite>;
  /** Deletes the specified site from a Virtual Appliance. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    networkVirtualApplianceName: string,
    siteName: string,
    options?: VirtualApplianceSitesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    networkVirtualApplianceName: string,
    siteName: string,
    options?: VirtualApplianceSitesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    networkVirtualApplianceName: string,
    siteName: string,
    options?: VirtualApplianceSitesDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates the specified Network Virtual Appliance Site. */
  createOrUpdate: (
    resourceGroupName: string,
    networkVirtualApplianceName: string,
    siteName: string,
    parameters: VirtualApplianceSite,
    options?: VirtualApplianceSitesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<VirtualApplianceSite>, VirtualApplianceSite>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    networkVirtualApplianceName: string,
    siteName: string,
    parameters: VirtualApplianceSite,
    options?: VirtualApplianceSitesCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<VirtualApplianceSite>, VirtualApplianceSite>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    networkVirtualApplianceName: string,
    siteName: string,
    parameters: VirtualApplianceSite,
    options?: VirtualApplianceSitesCreateOrUpdateOptionalParams,
  ) => Promise<VirtualApplianceSite>;
  /** Gets the specified Virtual Appliance Site. */
  get: (
    resourceGroupName: string,
    networkVirtualApplianceName: string,
    siteName: string,
    options?: VirtualApplianceSitesGetOptionalParams,
  ) => Promise<VirtualApplianceSite>;
}

function _getVirtualApplianceSites(context: NetworkManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      networkVirtualApplianceName: string,
      options?: VirtualApplianceSitesListOptionalParams,
    ) => list(context, resourceGroupName, networkVirtualApplianceName, options),
    delete: (
      resourceGroupName: string,
      networkVirtualApplianceName: string,
      siteName: string,
      options?: VirtualApplianceSitesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, networkVirtualApplianceName, siteName, options),
    beginDelete: async (
      resourceGroupName: string,
      networkVirtualApplianceName: string,
      siteName: string,
      options?: VirtualApplianceSitesDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        networkVirtualApplianceName,
        siteName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      networkVirtualApplianceName: string,
      siteName: string,
      options?: VirtualApplianceSitesDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        networkVirtualApplianceName,
        siteName,
        options,
      );
    },
    createOrUpdate: (
      resourceGroupName: string,
      networkVirtualApplianceName: string,
      siteName: string,
      parameters: VirtualApplianceSite,
      options?: VirtualApplianceSitesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        networkVirtualApplianceName,
        siteName,
        parameters,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      networkVirtualApplianceName: string,
      siteName: string,
      parameters: VirtualApplianceSite,
      options?: VirtualApplianceSitesCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        networkVirtualApplianceName,
        siteName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      networkVirtualApplianceName: string,
      siteName: string,
      parameters: VirtualApplianceSite,
      options?: VirtualApplianceSitesCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        networkVirtualApplianceName,
        siteName,
        parameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      networkVirtualApplianceName: string,
      siteName: string,
      options?: VirtualApplianceSitesGetOptionalParams,
    ) => get(context, resourceGroupName, networkVirtualApplianceName, siteName, options),
  };
}

export function _getVirtualApplianceSitesOperations(
  context: NetworkManagementContext,
): VirtualApplianceSitesOperations {
  return {
    ..._getVirtualApplianceSites(context),
  };
}

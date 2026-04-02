// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext } from "../../api/networkManagementContext.js";
import {
  list,
  listByResourceGroup,
  $delete,
  updateTags,
  createOrUpdate,
  get,
} from "../../api/vpnSites/operations.js";
import type {
  VpnSitesListOptionalParams,
  VpnSitesListByResourceGroupOptionalParams,
  VpnSitesDeleteOptionalParams,
  VpnSitesUpdateTagsOptionalParams,
  VpnSitesCreateOrUpdateOptionalParams,
  VpnSitesGetOptionalParams,
} from "../../api/vpnSites/options.js";
import type { TagsObject, VpnSite } from "../../models/microsoft/network/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a VpnSites operations. */
export interface VpnSitesOperations {
  /** Lists all the VpnSites in a subscription. */
  list: (options?: VpnSitesListOptionalParams) => PagedAsyncIterableIterator<VpnSite>;
  /** Lists all the vpnSites in a resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: VpnSitesListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<VpnSite>;
  /** Deletes a VpnSite. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    vpnSiteName: string,
    options?: VpnSitesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    vpnSiteName: string,
    options?: VpnSitesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    vpnSiteName: string,
    options?: VpnSitesDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates VpnSite tags. */
  updateTags: (
    resourceGroupName: string,
    vpnSiteName: string,
    vpnSiteParameters: TagsObject,
    options?: VpnSitesUpdateTagsOptionalParams,
  ) => Promise<VpnSite>;
  /** Creates a VpnSite resource if it doesn't exist else updates the existing VpnSite. */
  createOrUpdate: (
    resourceGroupName: string,
    vpnSiteName: string,
    vpnSiteParameters: VpnSite,
    options?: VpnSitesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<VpnSite>, VpnSite>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    vpnSiteName: string,
    vpnSiteParameters: VpnSite,
    options?: VpnSitesCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<VpnSite>, VpnSite>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    vpnSiteName: string,
    vpnSiteParameters: VpnSite,
    options?: VpnSitesCreateOrUpdateOptionalParams,
  ) => Promise<VpnSite>;
  /** Retrieves the details of a VPN site. */
  get: (
    resourceGroupName: string,
    vpnSiteName: string,
    options?: VpnSitesGetOptionalParams,
  ) => Promise<VpnSite>;
}

function _getVpnSites(context: NetworkManagementContext) {
  return {
    list: (options?: VpnSitesListOptionalParams) => list(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: VpnSitesListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      vpnSiteName: string,
      options?: VpnSitesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, vpnSiteName, options),
    beginDelete: async (
      resourceGroupName: string,
      vpnSiteName: string,
      options?: VpnSitesDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, vpnSiteName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      vpnSiteName: string,
      options?: VpnSitesDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, vpnSiteName, options);
    },
    updateTags: (
      resourceGroupName: string,
      vpnSiteName: string,
      vpnSiteParameters: TagsObject,
      options?: VpnSitesUpdateTagsOptionalParams,
    ) => updateTags(context, resourceGroupName, vpnSiteName, vpnSiteParameters, options),
    createOrUpdate: (
      resourceGroupName: string,
      vpnSiteName: string,
      vpnSiteParameters: VpnSite,
      options?: VpnSitesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, vpnSiteName, vpnSiteParameters, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      vpnSiteName: string,
      vpnSiteParameters: VpnSite,
      options?: VpnSitesCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        vpnSiteName,
        vpnSiteParameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      vpnSiteName: string,
      vpnSiteParameters: VpnSite,
      options?: VpnSitesCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        vpnSiteName,
        vpnSiteParameters,
        options,
      );
    },
    get: (resourceGroupName: string, vpnSiteName: string, options?: VpnSitesGetOptionalParams) =>
      get(context, resourceGroupName, vpnSiteName, options),
  };
}

export function _getVpnSitesOperations(context: NetworkManagementContext): VpnSitesOperations {
  return {
    ..._getVpnSites(context),
  };
}

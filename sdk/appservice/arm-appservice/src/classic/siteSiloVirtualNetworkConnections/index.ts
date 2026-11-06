// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { WebSiteManagementContext } from "../../api/webSiteManagementContext.js";
import {
  deleteSiteSiloVnetConnection,
  updateSiteSiloVnetConnection,
  createOrUpdateSiteSiloVnetConnection,
  getSiteSiloVnetConnection,
  listSiteSiloVnetConnections,
} from "../../api/siteSiloVirtualNetworkConnections/operations.js";
import type {
  SiteSiloVirtualNetworkConnectionsDeleteSiteSiloVnetConnectionOptionalParams,
  SiteSiloVirtualNetworkConnectionsUpdateSiteSiloVnetConnectionOptionalParams,
  SiteSiloVirtualNetworkConnectionsCreateOrUpdateSiteSiloVnetConnectionOptionalParams,
  SiteSiloVirtualNetworkConnectionsGetSiteSiloVnetConnectionOptionalParams,
  SiteSiloVirtualNetworkConnectionsListSiteSiloVnetConnectionsOptionalParams,
} from "../../api/siteSiloVirtualNetworkConnections/options.js";
import type { SwiftVirtualNetwork } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a SiteSiloVirtualNetworkConnections operations. */
export interface SiteSiloVirtualNetworkConnectionsOperations {
  /** Deletes the virtual network connection from a silo. */
  deleteSiteSiloVnetConnection: (
    resourceGroupName: string,
    name: string,
    siloName: string,
    options?: SiteSiloVirtualNetworkConnectionsDeleteSiteSiloVnetConnectionOptionalParams,
  ) => Promise<void>;
  /** Updates the properties of a virtual network connection on a silo. */
  updateSiteSiloVnetConnection: (
    resourceGroupName: string,
    name: string,
    siloName: string,
    properties: SwiftVirtualNetwork,
    options?: SiteSiloVirtualNetworkConnectionsUpdateSiteSiloVnetConnectionOptionalParams,
  ) => Promise<SwiftVirtualNetwork>;
  /** Adds a virtual network connection to a silo, or updates the connection properties. */
  createOrUpdateSiteSiloVnetConnection: (
    resourceGroupName: string,
    name: string,
    siloName: string,
    resource: SwiftVirtualNetwork,
    options?: SiteSiloVirtualNetworkConnectionsCreateOrUpdateSiteSiloVnetConnectionOptionalParams,
  ) => Promise<SwiftVirtualNetwork>;
  /** Gets the virtual network the silo is connected to. */
  getSiteSiloVnetConnection: (
    resourceGroupName: string,
    name: string,
    siloName: string,
    options?: SiteSiloVirtualNetworkConnectionsGetSiteSiloVnetConnectionOptionalParams,
  ) => Promise<SwiftVirtualNetwork>;
  /** Lists the virtual network connections of a Web App silo. Returns the singleton virtualNetwork connection when configured, or an empty collection otherwise. */
  listSiteSiloVnetConnections: (
    resourceGroupName: string,
    name: string,
    siloName: string,
    options?: SiteSiloVirtualNetworkConnectionsListSiteSiloVnetConnectionsOptionalParams,
  ) => PagedAsyncIterableIterator<SwiftVirtualNetwork>;
}

function _getSiteSiloVirtualNetworkConnections(context: WebSiteManagementContext) {
  return {
    deleteSiteSiloVnetConnection: (
      resourceGroupName: string,
      name: string,
      siloName: string,
      options?: SiteSiloVirtualNetworkConnectionsDeleteSiteSiloVnetConnectionOptionalParams,
    ) => deleteSiteSiloVnetConnection(context, resourceGroupName, name, siloName, options),
    updateSiteSiloVnetConnection: (
      resourceGroupName: string,
      name: string,
      siloName: string,
      properties: SwiftVirtualNetwork,
      options?: SiteSiloVirtualNetworkConnectionsUpdateSiteSiloVnetConnectionOptionalParams,
    ) =>
      updateSiteSiloVnetConnection(context, resourceGroupName, name, siloName, properties, options),
    createOrUpdateSiteSiloVnetConnection: (
      resourceGroupName: string,
      name: string,
      siloName: string,
      resource: SwiftVirtualNetwork,
      options?: SiteSiloVirtualNetworkConnectionsCreateOrUpdateSiteSiloVnetConnectionOptionalParams,
    ) =>
      createOrUpdateSiteSiloVnetConnection(
        context,
        resourceGroupName,
        name,
        siloName,
        resource,
        options,
      ),
    getSiteSiloVnetConnection: (
      resourceGroupName: string,
      name: string,
      siloName: string,
      options?: SiteSiloVirtualNetworkConnectionsGetSiteSiloVnetConnectionOptionalParams,
    ) => getSiteSiloVnetConnection(context, resourceGroupName, name, siloName, options),
    listSiteSiloVnetConnections: (
      resourceGroupName: string,
      name: string,
      siloName: string,
      options?: SiteSiloVirtualNetworkConnectionsListSiteSiloVnetConnectionsOptionalParams,
    ) => listSiteSiloVnetConnections(context, resourceGroupName, name, siloName, options),
  };
}

export function _getSiteSiloVirtualNetworkConnectionsOperations(
  context: WebSiteManagementContext,
): SiteSiloVirtualNetworkConnectionsOperations {
  return {
    ..._getSiteSiloVirtualNetworkConnections(context),
  };
}

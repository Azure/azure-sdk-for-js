// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementContext } from "../../api/webSiteManagementContext.js";
import {
  getNetworkSecurityPerimeterConfiguration,
  listNetworkSecurityPerimeterConfigurations,
} from "../../api/sites/operations.js";
import {
  SitesGetNetworkSecurityPerimeterConfigurationOptionalParams,
  SitesListNetworkSecurityPerimeterConfigurationsOptionalParams,
} from "../../api/sites/options.js";
import { NetworkSecurityPerimeterConfiguration } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Sites operations. */
export interface SitesOperations {
  /** Description for Gets the Network Security Perimeter Association Configuration for the site for the specified Network Security Perimeter Association reference. */
  getNetworkSecurityPerimeterConfiguration: (
    resourceGroupName: string,
    name: string,
    networkSecurityPerimeterReference: string,
    options?: SitesGetNetworkSecurityPerimeterConfigurationOptionalParams,
  ) => Promise<NetworkSecurityPerimeterConfiguration>;
  /** Description for Gets all Network Security Perimeter Association Configurations for the site. */
  listNetworkSecurityPerimeterConfigurations: (
    resourceGroupName: string,
    name: string,
    options?: SitesListNetworkSecurityPerimeterConfigurationsOptionalParams,
  ) => PagedAsyncIterableIterator<NetworkSecurityPerimeterConfiguration>;
}

function _getSites(context: WebSiteManagementContext) {
  return {
    getNetworkSecurityPerimeterConfiguration: (
      resourceGroupName: string,
      name: string,
      networkSecurityPerimeterReference: string,
      options?: SitesGetNetworkSecurityPerimeterConfigurationOptionalParams,
    ) =>
      getNetworkSecurityPerimeterConfiguration(
        context,
        resourceGroupName,
        name,
        networkSecurityPerimeterReference,
        options,
      ),
    listNetworkSecurityPerimeterConfigurations: (
      resourceGroupName: string,
      name: string,
      options?: SitesListNetworkSecurityPerimeterConfigurationsOptionalParams,
    ) => listNetworkSecurityPerimeterConfigurations(context, resourceGroupName, name, options),
  };
}

export function _getSitesOperations(context: WebSiteManagementContext): SitesOperations {
  return {
    ..._getSites(context),
  };
}

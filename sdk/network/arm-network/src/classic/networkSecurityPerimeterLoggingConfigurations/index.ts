// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementContext } from "../../api/networkManagementContext.js";
import {
  list,
  $delete,
  createOrUpdate,
  get,
} from "../../api/networkSecurityPerimeterLoggingConfigurations/operations.js";
import {
  NetworkSecurityPerimeterLoggingConfigurationsListOptionalParams,
  NetworkSecurityPerimeterLoggingConfigurationsDeleteOptionalParams,
  NetworkSecurityPerimeterLoggingConfigurationsCreateOrUpdateOptionalParams,
  NetworkSecurityPerimeterLoggingConfigurationsGetOptionalParams,
} from "../../api/networkSecurityPerimeterLoggingConfigurations/options.js";
import { NspLoggingConfiguration } from "../../models/microsoft/network/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a NetworkSecurityPerimeterLoggingConfigurations operations. */
export interface NetworkSecurityPerimeterLoggingConfigurationsOperations {
  /** Lists the NSP logging configuration. */
  list: (
    resourceGroupName: string,
    networkSecurityPerimeterName: string,
    options?: NetworkSecurityPerimeterLoggingConfigurationsListOptionalParams,
  ) => PagedAsyncIterableIterator<NspLoggingConfiguration>;
  /** Deletes an NSP Logging configuration. */
  delete: (
    resourceGroupName: string,
    networkSecurityPerimeterName: string,
    loggingConfigurationName: string,
    options?: NetworkSecurityPerimeterLoggingConfigurationsDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates NSP logging configuration. */
  createOrUpdate: (
    resourceGroupName: string,
    networkSecurityPerimeterName: string,
    loggingConfigurationName: string,
    parameters: NspLoggingConfiguration,
    options?: NetworkSecurityPerimeterLoggingConfigurationsCreateOrUpdateOptionalParams,
  ) => Promise<NspLoggingConfiguration>;
  /** Gets the NSP logging configuration. */
  get: (
    resourceGroupName: string,
    networkSecurityPerimeterName: string,
    loggingConfigurationName: string,
    options?: NetworkSecurityPerimeterLoggingConfigurationsGetOptionalParams,
  ) => Promise<NspLoggingConfiguration>;
}

function _getNetworkSecurityPerimeterLoggingConfigurations(context: NetworkManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      networkSecurityPerimeterName: string,
      options?: NetworkSecurityPerimeterLoggingConfigurationsListOptionalParams,
    ) => list(context, resourceGroupName, networkSecurityPerimeterName, options),
    delete: (
      resourceGroupName: string,
      networkSecurityPerimeterName: string,
      loggingConfigurationName: string,
      options?: NetworkSecurityPerimeterLoggingConfigurationsDeleteOptionalParams,
    ) =>
      $delete(
        context,
        resourceGroupName,
        networkSecurityPerimeterName,
        loggingConfigurationName,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      networkSecurityPerimeterName: string,
      loggingConfigurationName: string,
      parameters: NspLoggingConfiguration,
      options?: NetworkSecurityPerimeterLoggingConfigurationsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        networkSecurityPerimeterName,
        loggingConfigurationName,
        parameters,
        options,
      ),
    get: (
      resourceGroupName: string,
      networkSecurityPerimeterName: string,
      loggingConfigurationName: string,
      options?: NetworkSecurityPerimeterLoggingConfigurationsGetOptionalParams,
    ) =>
      get(
        context,
        resourceGroupName,
        networkSecurityPerimeterName,
        loggingConfigurationName,
        options,
      ),
  };
}

export function _getNetworkSecurityPerimeterLoggingConfigurationsOperations(
  context: NetworkManagementContext,
): NetworkSecurityPerimeterLoggingConfigurationsOperations {
  return {
    ..._getNetworkSecurityPerimeterLoggingConfigurations(context),
  };
}

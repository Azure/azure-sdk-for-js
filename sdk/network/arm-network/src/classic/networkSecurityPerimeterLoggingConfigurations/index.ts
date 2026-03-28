// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext } from "../../api/networkManagementContext.js";
import {
  list,
  $delete,
  createOrUpdate,
  get,
} from "../../api/networkSecurityPerimeterLoggingConfigurations/operations.js";
import type {
  NetworkSecurityPerimeterLoggingConfigurationsListOptionalParams,
  NetworkSecurityPerimeterLoggingConfigurationsDeleteOptionalParams,
  NetworkSecurityPerimeterLoggingConfigurationsCreateOrUpdateOptionalParams,
  NetworkSecurityPerimeterLoggingConfigurationsGetOptionalParams,
} from "../../api/networkSecurityPerimeterLoggingConfigurations/options.js";
import type { NspLoggingConfiguration } from "../../models/microsoft/network/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a NetworkSecurityPerimeterLoggingConfigurations operations. */
export interface NetworkSecurityPerimeterLoggingConfigurationsOperations {
  /** Lists the NSP logging configuration. */
  list: (
    resourceGroupName: string,
    networkSecurityPerimeterName: string,
    options?: NetworkSecurityPerimeterLoggingConfigurationsListOptionalParams,
  ) => PagedAsyncIterableIterator<NspLoggingConfiguration>;
  /** Deletes an NSP Logging configuration. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
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

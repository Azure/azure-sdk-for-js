// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AdvisorManagementContext } from "../../api/advisorManagementContext.js";
import {
  createInResourceGroup,
  listByResourceGroup,
  createInSubscription,
  listBySubscription,
} from "../../api/configurations/operations.js";
import {
  ConfigurationsCreateInResourceGroupOptionalParams,
  ConfigurationsListByResourceGroupOptionalParams,
  ConfigurationsCreateInSubscriptionOptionalParams,
  ConfigurationsListBySubscriptionOptionalParams,
} from "../../api/configurations/options.js";
import { ConfigData, ConfigurationName } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Configurations operations. */
export interface ConfigurationsOperations {
  /** Create/Overwrite Azure Advisor configuration. */
  createInResourceGroup: (
    configurationName: ConfigurationName,
    resourceGroup: string,
    configContract: ConfigData,
    options?: ConfigurationsCreateInResourceGroupOptionalParams,
  ) => Promise<ConfigData>;
  /** Retrieve Azure Advisor configurations. */
  listByResourceGroup: (
    resourceGroup: string,
    options?: ConfigurationsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<ConfigData>;
  /** Create/Overwrite Azure Advisor configuration and also delete all configurations of contained resource groups. */
  createInSubscription: (
    configurationName: ConfigurationName,
    configContract: ConfigData,
    options?: ConfigurationsCreateInSubscriptionOptionalParams,
  ) => Promise<ConfigData>;
  /** Retrieve Azure Advisor configurations and also retrieve configurations of contained resource groups. */
  listBySubscription: (
    options?: ConfigurationsListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<ConfigData>;
}

function _getConfigurations(context: AdvisorManagementContext) {
  return {
    createInResourceGroup: (
      configurationName: ConfigurationName,
      resourceGroup: string,
      configContract: ConfigData,
      options?: ConfigurationsCreateInResourceGroupOptionalParams,
    ) => createInResourceGroup(context, configurationName, resourceGroup, configContract, options),
    listByResourceGroup: (
      resourceGroup: string,
      options?: ConfigurationsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroup, options),
    createInSubscription: (
      configurationName: ConfigurationName,
      configContract: ConfigData,
      options?: ConfigurationsCreateInSubscriptionOptionalParams,
    ) => createInSubscription(context, configurationName, configContract, options),
    listBySubscription: (options?: ConfigurationsListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
  };
}

export function _getConfigurationsOperations(
  context: AdvisorManagementContext,
): ConfigurationsOperations {
  return {
    ..._getConfigurations(context),
  };
}

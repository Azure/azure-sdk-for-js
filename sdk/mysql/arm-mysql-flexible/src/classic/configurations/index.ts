// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MySQLManagementFlexibleServerContext } from "../../api/mySQLManagementFlexibleServerContext.js";
import {
  batchUpdate,
  listByServer,
  update,
  createOrUpdate,
  get,
} from "../../api/configurations/operations.js";
import type {
  ConfigurationsBatchUpdateOptionalParams,
  ConfigurationsListByServerOptionalParams,
  ConfigurationsUpdateOptionalParams,
  ConfigurationsCreateOrUpdateOptionalParams,
  ConfigurationsGetOptionalParams,
} from "../../api/configurations/options.js";
import type {
  Configuration,
  _ConfigurationListResult,
  ConfigurationListForBatchUpdate,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Configurations operations. */
export interface ConfigurationsOperations {
  /** Update a list of configurations in a given server. */
  batchUpdate: (
    resourceGroupName: string,
    serverName: string,
    parameters: ConfigurationListForBatchUpdate,
    options?: ConfigurationsBatchUpdateOptionalParams,
  ) => PollerLike<OperationState<_ConfigurationListResult>, _ConfigurationListResult>;
  /** List all the configurations in a given server. */
  listByServer: (
    resourceGroupName: string,
    serverName: string,
    options?: ConfigurationsListByServerOptionalParams,
  ) => PagedAsyncIterableIterator<Configuration>;
  /** Updates a configuration of a server. */
  update: (
    resourceGroupName: string,
    serverName: string,
    configurationName: string,
    parameters: Configuration,
    options?: ConfigurationsUpdateOptionalParams,
  ) => PollerLike<OperationState<Configuration>, Configuration>;
  /** Updates a configuration of a server. */
  createOrUpdate: (
    resourceGroupName: string,
    serverName: string,
    configurationName: string,
    parameters: Configuration,
    options?: ConfigurationsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<Configuration>, Configuration>;
  /** Gets information about a configuration of server. */
  get: (
    resourceGroupName: string,
    serverName: string,
    configurationName: string,
    options?: ConfigurationsGetOptionalParams,
  ) => Promise<Configuration>;
}

function _getConfigurations(context: MySQLManagementFlexibleServerContext) {
  return {
    batchUpdate: (
      resourceGroupName: string,
      serverName: string,
      parameters: ConfigurationListForBatchUpdate,
      options?: ConfigurationsBatchUpdateOptionalParams,
    ) => batchUpdate(context, resourceGroupName, serverName, parameters, options),
    listByServer: (
      resourceGroupName: string,
      serverName: string,
      options?: ConfigurationsListByServerOptionalParams,
    ) => listByServer(context, resourceGroupName, serverName, options),
    update: (
      resourceGroupName: string,
      serverName: string,
      configurationName: string,
      parameters: Configuration,
      options?: ConfigurationsUpdateOptionalParams,
    ) => update(context, resourceGroupName, serverName, configurationName, parameters, options),
    createOrUpdate: (
      resourceGroupName: string,
      serverName: string,
      configurationName: string,
      parameters: Configuration,
      options?: ConfigurationsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        serverName,
        configurationName,
        parameters,
        options,
      ),
    get: (
      resourceGroupName: string,
      serverName: string,
      configurationName: string,
      options?: ConfigurationsGetOptionalParams,
    ) => get(context, resourceGroupName, serverName, configurationName, options),
  };
}

export function _getConfigurationsOperations(
  context: MySQLManagementFlexibleServerContext,
): ConfigurationsOperations {
  return {
    ..._getConfigurations(context),
  };
}

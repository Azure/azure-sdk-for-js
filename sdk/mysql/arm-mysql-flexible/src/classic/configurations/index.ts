// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MySQLManagementFlexibleServerContext } from "../../api/mySQLManagementFlexibleServerContext.js";
import {
  batchUpdate,
  listByServer,
  update,
  createOrUpdate,
  get,
} from "../../api/configurations/operations.js";
import {
  ConfigurationsBatchUpdateOptionalParams,
  ConfigurationsListByServerOptionalParams,
  ConfigurationsUpdateOptionalParams,
  ConfigurationsCreateOrUpdateOptionalParams,
  ConfigurationsGetOptionalParams,
} from "../../api/configurations/options.js";
import {
  Configuration,
  ConfigurationListResult,
  ConfigurationListForBatchUpdate,
} from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Configurations operations. */
export interface ConfigurationsOperations {
  /** Update a list of configurations in a given server. */
  batchUpdate: (
    resourceGroupName: string,
    serverName: string,
    parameters: ConfigurationListForBatchUpdate,
    options?: ConfigurationsBatchUpdateOptionalParams,
  ) => PollerLike<OperationState<ConfigurationListResult>, ConfigurationListResult>;
  /** @deprecated use batchUpdate instead */
  beginBatchUpdate: (
    resourceGroupName: string,
    serverName: string,
    parameters: ConfigurationListForBatchUpdate,
    options?: ConfigurationsBatchUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<ConfigurationListResult>, ConfigurationListResult>>;
  /** @deprecated use batchUpdate instead */
  beginBatchUpdateAndWait: (
    resourceGroupName: string,
    serverName: string,
    parameters: ConfigurationListForBatchUpdate,
    options?: ConfigurationsBatchUpdateOptionalParams,
  ) => Promise<ConfigurationListResult>;
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
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    serverName: string,
    configurationName: string,
    parameters: Configuration,
    options?: ConfigurationsUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Configuration>, Configuration>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    serverName: string,
    configurationName: string,
    parameters: Configuration,
    options?: ConfigurationsUpdateOptionalParams,
  ) => Promise<Configuration>;
  /** Updates a configuration of a server. */
  createOrUpdate: (
    resourceGroupName: string,
    serverName: string,
    configurationName: string,
    parameters: Configuration,
    options?: ConfigurationsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<Configuration>, Configuration>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    serverName: string,
    configurationName: string,
    parameters: Configuration,
    options?: ConfigurationsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Configuration>, Configuration>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    serverName: string,
    configurationName: string,
    parameters: Configuration,
    options?: ConfigurationsCreateOrUpdateOptionalParams,
  ) => Promise<Configuration>;
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
    beginBatchUpdate: async (
      resourceGroupName: string,
      serverName: string,
      parameters: ConfigurationListForBatchUpdate,
      options?: ConfigurationsBatchUpdateOptionalParams,
    ) => {
      const poller = batchUpdate(context, resourceGroupName, serverName, parameters, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginBatchUpdateAndWait: async (
      resourceGroupName: string,
      serverName: string,
      parameters: ConfigurationListForBatchUpdate,
      options?: ConfigurationsBatchUpdateOptionalParams,
    ) => {
      return await batchUpdate(context, resourceGroupName, serverName, parameters, options);
    },
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
    beginUpdate: async (
      resourceGroupName: string,
      serverName: string,
      configurationName: string,
      parameters: Configuration,
      options?: ConfigurationsUpdateOptionalParams,
    ) => {
      const poller = update(
        context,
        resourceGroupName,
        serverName,
        configurationName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      serverName: string,
      configurationName: string,
      parameters: Configuration,
      options?: ConfigurationsUpdateOptionalParams,
    ) => {
      return await update(
        context,
        resourceGroupName,
        serverName,
        configurationName,
        parameters,
        options,
      );
    },
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
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      serverName: string,
      configurationName: string,
      parameters: Configuration,
      options?: ConfigurationsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        serverName,
        configurationName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      serverName: string,
      configurationName: string,
      parameters: Configuration,
      options?: ConfigurationsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        serverName,
        configurationName,
        parameters,
        options,
      );
    },
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

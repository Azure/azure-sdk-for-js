// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PostgreSQLManagementFlexibleServerContext } from "../../api/postgreSQLManagementFlexibleServerContext.js";
import { listByServer, update, put, get } from "../../api/configurations/operations.js";
import type {
  ConfigurationsListByServerOptionalParams,
  ConfigurationsUpdateOptionalParams,
  ConfigurationsPutOptionalParams,
  ConfigurationsGetOptionalParams,
} from "../../api/configurations/options.js";
import type { Configuration, ConfigurationForUpdate } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Configurations operations. */
export interface ConfigurationsOperations {
  /** Lists all configurations (also known as server parameters) of a server. */
  listByServer: (
    resourceGroupName: string,
    serverName: string,
    options?: ConfigurationsListByServerOptionalParams,
  ) => PagedAsyncIterableIterator<Configuration>;
  /** Updates the value assigned to a specific modifiable configuration (also known as server parameter) of a server. */
  update: (
    resourceGroupName: string,
    serverName: string,
    configurationName: string,
    parameters: ConfigurationForUpdate,
    options?: ConfigurationsUpdateOptionalParams,
  ) => PollerLike<OperationState<Configuration>, Configuration>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    serverName: string,
    configurationName: string,
    parameters: ConfigurationForUpdate,
    options?: ConfigurationsUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Configuration>, Configuration>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    serverName: string,
    configurationName: string,
    parameters: ConfigurationForUpdate,
    options?: ConfigurationsUpdateOptionalParams,
  ) => Promise<Configuration>;
  /** Updates, using Put verb, the value assigned to a specific modifiable configuration (also known as server parameter) of a server. */
  put: (
    resourceGroupName: string,
    serverName: string,
    configurationName: string,
    parameters: ConfigurationForUpdate,
    options?: ConfigurationsPutOptionalParams,
  ) => PollerLike<OperationState<Configuration>, Configuration>;
  /** @deprecated use put instead */
  beginPut: (
    resourceGroupName: string,
    serverName: string,
    configurationName: string,
    parameters: ConfigurationForUpdate,
    options?: ConfigurationsPutOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Configuration>, Configuration>>;
  /** @deprecated use put instead */
  beginPutAndWait: (
    resourceGroupName: string,
    serverName: string,
    configurationName: string,
    parameters: ConfigurationForUpdate,
    options?: ConfigurationsPutOptionalParams,
  ) => Promise<Configuration>;
  /** Gets information about a specific configuration (also known as server parameter) of a server. */
  get: (
    resourceGroupName: string,
    serverName: string,
    configurationName: string,
    options?: ConfigurationsGetOptionalParams,
  ) => Promise<Configuration>;
}

function _getConfigurations(context: PostgreSQLManagementFlexibleServerContext) {
  return {
    listByServer: (
      resourceGroupName: string,
      serverName: string,
      options?: ConfigurationsListByServerOptionalParams,
    ) => listByServer(context, resourceGroupName, serverName, options),
    update: (
      resourceGroupName: string,
      serverName: string,
      configurationName: string,
      parameters: ConfigurationForUpdate,
      options?: ConfigurationsUpdateOptionalParams,
    ) => update(context, resourceGroupName, serverName, configurationName, parameters, options),
    beginUpdate: async (
      resourceGroupName: string,
      serverName: string,
      configurationName: string,
      parameters: ConfigurationForUpdate,
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
      parameters: ConfigurationForUpdate,
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
    put: (
      resourceGroupName: string,
      serverName: string,
      configurationName: string,
      parameters: ConfigurationForUpdate,
      options?: ConfigurationsPutOptionalParams,
    ) => put(context, resourceGroupName, serverName, configurationName, parameters, options),
    beginPut: async (
      resourceGroupName: string,
      serverName: string,
      configurationName: string,
      parameters: ConfigurationForUpdate,
      options?: ConfigurationsPutOptionalParams,
    ) => {
      const poller = put(
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
    beginPutAndWait: async (
      resourceGroupName: string,
      serverName: string,
      configurationName: string,
      parameters: ConfigurationForUpdate,
      options?: ConfigurationsPutOptionalParams,
    ) => {
      return await put(
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
  context: PostgreSQLManagementFlexibleServerContext,
): ConfigurationsOperations {
  return {
    ..._getConfigurations(context),
  };
}

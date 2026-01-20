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
  /** Updates, using Put verb, the value assigned to a specific modifiable configuration (also known as server parameter) of a server. */
  put: (
    resourceGroupName: string,
    serverName: string,
    configurationName: string,
    parameters: ConfigurationForUpdate,
    options?: ConfigurationsPutOptionalParams,
  ) => PollerLike<OperationState<Configuration>, Configuration>;
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
    put: (
      resourceGroupName: string,
      serverName: string,
      configurationName: string,
      parameters: ConfigurationForUpdate,
      options?: ConfigurationsPutOptionalParams,
    ) => put(context, resourceGroupName, serverName, configurationName, parameters, options),
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

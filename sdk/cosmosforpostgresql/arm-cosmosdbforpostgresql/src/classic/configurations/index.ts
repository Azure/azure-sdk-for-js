// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosDBForPostgreSQLContext } from "../../api/cosmosDBForPostgreSQLContext.js";
import {
  updateOnCoordinator,
  getCoordinator,
  updateOnNode,
  getNode,
  listByServer,
  listByCluster,
  get,
} from "../../api/configurations/operations.js";
import {
  ConfigurationsUpdateOnCoordinatorOptionalParams,
  ConfigurationsGetCoordinatorOptionalParams,
  ConfigurationsUpdateOnNodeOptionalParams,
  ConfigurationsGetNodeOptionalParams,
  ConfigurationsListByServerOptionalParams,
  ConfigurationsListByClusterOptionalParams,
  ConfigurationsGetOptionalParams,
} from "../../api/configurations/options.js";
import { Configuration, ServerConfiguration } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Configurations operations. */
export interface ConfigurationsOperations {
  /** Updates configuration of coordinator in a cluster */
  updateOnCoordinator: (
    resourceGroupName: string,
    clusterName: string,
    configurationName: string,
    parameters: ServerConfiguration,
    options?: ConfigurationsUpdateOnCoordinatorOptionalParams,
  ) => PollerLike<OperationState<ServerConfiguration>, ServerConfiguration>;
  /** @deprecated use updateOnCoordinator instead */
  beginUpdateOnCoordinator: (
    resourceGroupName: string,
    clusterName: string,
    configurationName: string,
    parameters: ServerConfiguration,
    options?: ConfigurationsUpdateOnCoordinatorOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<ServerConfiguration>, ServerConfiguration>>;
  /** @deprecated use updateOnCoordinator instead */
  beginUpdateOnCoordinatorAndWait: (
    resourceGroupName: string,
    clusterName: string,
    configurationName: string,
    parameters: ServerConfiguration,
    options?: ConfigurationsUpdateOnCoordinatorOptionalParams,
  ) => Promise<ServerConfiguration>;
  /** Gets information of a configuration for coordinator. */
  getCoordinator: (
    resourceGroupName: string,
    clusterName: string,
    configurationName: string,
    options?: ConfigurationsGetCoordinatorOptionalParams,
  ) => Promise<ServerConfiguration>;
  /** Updates configuration of worker nodes in a cluster */
  updateOnNode: (
    resourceGroupName: string,
    clusterName: string,
    configurationName: string,
    parameters: ServerConfiguration,
    options?: ConfigurationsUpdateOnNodeOptionalParams,
  ) => PollerLike<OperationState<ServerConfiguration>, ServerConfiguration>;
  /** @deprecated use updateOnNode instead */
  beginUpdateOnNode: (
    resourceGroupName: string,
    clusterName: string,
    configurationName: string,
    parameters: ServerConfiguration,
    options?: ConfigurationsUpdateOnNodeOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<ServerConfiguration>, ServerConfiguration>>;
  /** @deprecated use updateOnNode instead */
  beginUpdateOnNodeAndWait: (
    resourceGroupName: string,
    clusterName: string,
    configurationName: string,
    parameters: ServerConfiguration,
    options?: ConfigurationsUpdateOnNodeOptionalParams,
  ) => Promise<ServerConfiguration>;
  /** Gets information of a configuration for worker nodes. */
  getNode: (
    resourceGroupName: string,
    clusterName: string,
    configurationName: string,
    options?: ConfigurationsGetNodeOptionalParams,
  ) => Promise<ServerConfiguration>;
  /** List all the configurations of a server in cluster. */
  listByServer: (
    resourceGroupName: string,
    clusterName: string,
    serverName: string,
    options?: ConfigurationsListByServerOptionalParams,
  ) => PagedAsyncIterableIterator<ServerConfiguration>;
  /** List all the configurations of a cluster. */
  listByCluster: (
    resourceGroupName: string,
    clusterName: string,
    options?: ConfigurationsListByClusterOptionalParams,
  ) => PagedAsyncIterableIterator<Configuration>;
  /** Gets information of a configuration for coordinator and nodes. */
  get: (
    resourceGroupName: string,
    clusterName: string,
    configurationName: string,
    options?: ConfigurationsGetOptionalParams,
  ) => Promise<Configuration>;
}

function _getConfigurations(context: CosmosDBForPostgreSQLContext) {
  return {
    updateOnCoordinator: (
      resourceGroupName: string,
      clusterName: string,
      configurationName: string,
      parameters: ServerConfiguration,
      options?: ConfigurationsUpdateOnCoordinatorOptionalParams,
    ) =>
      updateOnCoordinator(
        context,
        resourceGroupName,
        clusterName,
        configurationName,
        parameters,
        options,
      ),
    beginUpdateOnCoordinator: async (
      resourceGroupName: string,
      clusterName: string,
      configurationName: string,
      parameters: ServerConfiguration,
      options?: ConfigurationsUpdateOnCoordinatorOptionalParams,
    ) => {
      const poller = updateOnCoordinator(
        context,
        resourceGroupName,
        clusterName,
        configurationName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateOnCoordinatorAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      configurationName: string,
      parameters: ServerConfiguration,
      options?: ConfigurationsUpdateOnCoordinatorOptionalParams,
    ) => {
      return await updateOnCoordinator(
        context,
        resourceGroupName,
        clusterName,
        configurationName,
        parameters,
        options,
      );
    },
    getCoordinator: (
      resourceGroupName: string,
      clusterName: string,
      configurationName: string,
      options?: ConfigurationsGetCoordinatorOptionalParams,
    ) => getCoordinator(context, resourceGroupName, clusterName, configurationName, options),
    updateOnNode: (
      resourceGroupName: string,
      clusterName: string,
      configurationName: string,
      parameters: ServerConfiguration,
      options?: ConfigurationsUpdateOnNodeOptionalParams,
    ) =>
      updateOnNode(context, resourceGroupName, clusterName, configurationName, parameters, options),
    beginUpdateOnNode: async (
      resourceGroupName: string,
      clusterName: string,
      configurationName: string,
      parameters: ServerConfiguration,
      options?: ConfigurationsUpdateOnNodeOptionalParams,
    ) => {
      const poller = updateOnNode(
        context,
        resourceGroupName,
        clusterName,
        configurationName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateOnNodeAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      configurationName: string,
      parameters: ServerConfiguration,
      options?: ConfigurationsUpdateOnNodeOptionalParams,
    ) => {
      return await updateOnNode(
        context,
        resourceGroupName,
        clusterName,
        configurationName,
        parameters,
        options,
      );
    },
    getNode: (
      resourceGroupName: string,
      clusterName: string,
      configurationName: string,
      options?: ConfigurationsGetNodeOptionalParams,
    ) => getNode(context, resourceGroupName, clusterName, configurationName, options),
    listByServer: (
      resourceGroupName: string,
      clusterName: string,
      serverName: string,
      options?: ConfigurationsListByServerOptionalParams,
    ) => listByServer(context, resourceGroupName, clusterName, serverName, options),
    listByCluster: (
      resourceGroupName: string,
      clusterName: string,
      options?: ConfigurationsListByClusterOptionalParams,
    ) => listByCluster(context, resourceGroupName, clusterName, options),
    get: (
      resourceGroupName: string,
      clusterName: string,
      configurationName: string,
      options?: ConfigurationsGetOptionalParams,
    ) => get(context, resourceGroupName, clusterName, configurationName, options),
  };
}

export function _getConfigurationsOperations(
  context: CosmosDBForPostgreSQLContext,
): ConfigurationsOperations {
  return {
    ..._getConfigurations(context),
  };
}

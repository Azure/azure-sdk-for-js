// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlContext } from "../../api/sqlContext.js";
import {
  listByManagedInstance,
  createOrUpdate,
  get,
} from "../../api/serverConfigurationOptions/operations.js";
import type {
  ServerConfigurationOptionsListByManagedInstanceOptionalParams,
  ServerConfigurationOptionsCreateOrUpdateOptionalParams,
  ServerConfigurationOptionsGetOptionalParams,
} from "../../api/serverConfigurationOptions/options.js";
import type {
  ServerConfigurationOption,
  ServerConfigurationOptionName,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ServerConfigurationOptions operations. */
export interface ServerConfigurationOptionsOperations {
  /** Gets a list of managed instance server configuration options. */
  listByManagedInstance: (
    resourceGroupName: string,
    managedInstanceName: string,
    options?: ServerConfigurationOptionsListByManagedInstanceOptionalParams,
  ) => PagedAsyncIterableIterator<ServerConfigurationOption>;
  /** Updates managed instance server configuration option. */
  createOrUpdate: (
    resourceGroupName: string,
    managedInstanceName: string,
    serverConfigurationOptionName: ServerConfigurationOptionName,
    parameters: ServerConfigurationOption,
    options?: ServerConfigurationOptionsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<ServerConfigurationOption>, ServerConfigurationOption>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    managedInstanceName: string,
    serverConfigurationOptionName: ServerConfigurationOptionName,
    parameters: ServerConfigurationOption,
    options?: ServerConfigurationOptionsCreateOrUpdateOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<ServerConfigurationOption>, ServerConfigurationOption>
  >;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    managedInstanceName: string,
    serverConfigurationOptionName: ServerConfigurationOptionName,
    parameters: ServerConfigurationOption,
    options?: ServerConfigurationOptionsCreateOrUpdateOptionalParams,
  ) => Promise<ServerConfigurationOption>;
  /** Gets managed instance server configuration option. */
  get: (
    resourceGroupName: string,
    managedInstanceName: string,
    serverConfigurationOptionName: ServerConfigurationOptionName,
    options?: ServerConfigurationOptionsGetOptionalParams,
  ) => Promise<ServerConfigurationOption>;
}

function _getServerConfigurationOptions(context: SqlContext) {
  return {
    listByManagedInstance: (
      resourceGroupName: string,
      managedInstanceName: string,
      options?: ServerConfigurationOptionsListByManagedInstanceOptionalParams,
    ) => listByManagedInstance(context, resourceGroupName, managedInstanceName, options),
    createOrUpdate: (
      resourceGroupName: string,
      managedInstanceName: string,
      serverConfigurationOptionName: ServerConfigurationOptionName,
      parameters: ServerConfigurationOption,
      options?: ServerConfigurationOptionsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        managedInstanceName,
        serverConfigurationOptionName,
        parameters,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      managedInstanceName: string,
      serverConfigurationOptionName: ServerConfigurationOptionName,
      parameters: ServerConfigurationOption,
      options?: ServerConfigurationOptionsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        managedInstanceName,
        serverConfigurationOptionName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      managedInstanceName: string,
      serverConfigurationOptionName: ServerConfigurationOptionName,
      parameters: ServerConfigurationOption,
      options?: ServerConfigurationOptionsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        managedInstanceName,
        serverConfigurationOptionName,
        parameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      managedInstanceName: string,
      serverConfigurationOptionName: ServerConfigurationOptionName,
      options?: ServerConfigurationOptionsGetOptionalParams,
    ) =>
      get(context, resourceGroupName, managedInstanceName, serverConfigurationOptionName, options),
  };
}

export function _getServerConfigurationOptionsOperations(
  context: SqlContext,
): ServerConfigurationOptionsOperations {
  return {
    ..._getServerConfigurationOptions(context),
  };
}

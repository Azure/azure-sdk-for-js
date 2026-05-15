// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementContext } from "../../api/networkManagementContext.js";
import {
  list,
  $delete,
  createOrUpdate,
  get,
} from "../../api/securityAdminConfigurations/operations.js";
import {
  SecurityAdminConfigurationsListOptionalParams,
  SecurityAdminConfigurationsDeleteOptionalParams,
  SecurityAdminConfigurationsCreateOrUpdateOptionalParams,
  SecurityAdminConfigurationsGetOptionalParams,
} from "../../api/securityAdminConfigurations/options.js";
import { SecurityAdminConfiguration } from "../../models/microsoft/network/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a SecurityAdminConfigurations operations. */
export interface SecurityAdminConfigurationsOperations {
  /** Lists all the network manager security admin configurations in a network manager, in a paginated format. */
  list: (
    resourceGroupName: string,
    networkManagerName: string,
    options?: SecurityAdminConfigurationsListOptionalParams,
  ) => PagedAsyncIterableIterator<SecurityAdminConfiguration>;
  /** Deletes a network manager security admin configuration. */
  delete: (
    resourceGroupName: string,
    networkManagerName: string,
    configurationName: string,
    options?: SecurityAdminConfigurationsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    networkManagerName: string,
    configurationName: string,
    options?: SecurityAdminConfigurationsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    networkManagerName: string,
    configurationName: string,
    options?: SecurityAdminConfigurationsDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates a network manager security admin configuration. */
  createOrUpdate: (
    resourceGroupName: string,
    networkManagerName: string,
    configurationName: string,
    securityAdminConfiguration: SecurityAdminConfiguration,
    options?: SecurityAdminConfigurationsCreateOrUpdateOptionalParams,
  ) => Promise<SecurityAdminConfiguration>;
  /** Retrieves a network manager security admin configuration. */
  get: (
    resourceGroupName: string,
    networkManagerName: string,
    configurationName: string,
    options?: SecurityAdminConfigurationsGetOptionalParams,
  ) => Promise<SecurityAdminConfiguration>;
}

function _getSecurityAdminConfigurations(context: NetworkManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      networkManagerName: string,
      options?: SecurityAdminConfigurationsListOptionalParams,
    ) => list(context, resourceGroupName, networkManagerName, options),
    delete: (
      resourceGroupName: string,
      networkManagerName: string,
      configurationName: string,
      options?: SecurityAdminConfigurationsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, networkManagerName, configurationName, options),
    beginDelete: async (
      resourceGroupName: string,
      networkManagerName: string,
      configurationName: string,
      options?: SecurityAdminConfigurationsDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        networkManagerName,
        configurationName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      networkManagerName: string,
      configurationName: string,
      options?: SecurityAdminConfigurationsDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        networkManagerName,
        configurationName,
        options,
      );
    },
    createOrUpdate: (
      resourceGroupName: string,
      networkManagerName: string,
      configurationName: string,
      securityAdminConfiguration: SecurityAdminConfiguration,
      options?: SecurityAdminConfigurationsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        networkManagerName,
        configurationName,
        securityAdminConfiguration,
        options,
      ),
    get: (
      resourceGroupName: string,
      networkManagerName: string,
      configurationName: string,
      options?: SecurityAdminConfigurationsGetOptionalParams,
    ) => get(context, resourceGroupName, networkManagerName, configurationName, options),
  };
}

export function _getSecurityAdminConfigurationsOperations(
  context: NetworkManagementContext,
): SecurityAdminConfigurationsOperations {
  return {
    ..._getSecurityAdminConfigurations(context),
  };
}

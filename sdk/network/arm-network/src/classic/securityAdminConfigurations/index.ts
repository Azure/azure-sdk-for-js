// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext } from "../../api/networkManagementContext.js";
import {
  list,
  $delete,
  createOrUpdate,
  get,
} from "../../api/securityAdminConfigurations/operations.js";
import type {
  SecurityAdminConfigurationsListOptionalParams,
  SecurityAdminConfigurationsDeleteOptionalParams,
  SecurityAdminConfigurationsCreateOrUpdateOptionalParams,
  SecurityAdminConfigurationsGetOptionalParams,
} from "../../api/securityAdminConfigurations/options.js";
import type { SecurityAdminConfiguration } from "../../models/microsoft/network/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a SecurityAdminConfigurations operations. */
export interface SecurityAdminConfigurationsOperations {
  /** Lists all the network manager security admin configurations in a network manager, in a paginated format. */
  list: (
    resourceGroupName: string,
    networkManagerName: string,
    options?: SecurityAdminConfigurationsListOptionalParams,
  ) => PagedAsyncIterableIterator<SecurityAdminConfiguration>;
  /** Deletes a network manager security admin configuration. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
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

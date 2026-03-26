// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext } from "../../api/networkManagementContext.js";
import {
  list,
  $delete,
  createOrUpdate,
  get,
} from "../../api/securityUserConfigurations/operations.js";
import type {
  SecurityUserConfigurationsListOptionalParams,
  SecurityUserConfigurationsDeleteOptionalParams,
  SecurityUserConfigurationsCreateOrUpdateOptionalParams,
  SecurityUserConfigurationsGetOptionalParams,
} from "../../api/securityUserConfigurations/options.js";
import type { SecurityUserConfiguration } from "../../models/microsoft/network/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a SecurityUserConfigurations operations. */
export interface SecurityUserConfigurationsOperations {
  /** Lists all the network manager security user configurations in a network manager, in a paginated format. */
  list: (
    resourceGroupName: string,
    networkManagerName: string,
    options?: SecurityUserConfigurationsListOptionalParams,
  ) => PagedAsyncIterableIterator<SecurityUserConfiguration>;
  /** Deletes a network manager security user configuration. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    networkManagerName: string,
    configurationName: string,
    options?: SecurityUserConfigurationsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    networkManagerName: string,
    configurationName: string,
    options?: SecurityUserConfigurationsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    networkManagerName: string,
    configurationName: string,
    options?: SecurityUserConfigurationsDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates a network manager security user configuration. */
  createOrUpdate: (
    resourceGroupName: string,
    networkManagerName: string,
    configurationName: string,
    securityUserConfiguration: SecurityUserConfiguration,
    options?: SecurityUserConfigurationsCreateOrUpdateOptionalParams,
  ) => Promise<SecurityUserConfiguration>;
  /** Retrieves a network manager security user configuration. */
  get: (
    resourceGroupName: string,
    networkManagerName: string,
    configurationName: string,
    options?: SecurityUserConfigurationsGetOptionalParams,
  ) => Promise<SecurityUserConfiguration>;
}

function _getSecurityUserConfigurations(context: NetworkManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      networkManagerName: string,
      options?: SecurityUserConfigurationsListOptionalParams,
    ) => list(context, resourceGroupName, networkManagerName, options),
    delete: (
      resourceGroupName: string,
      networkManagerName: string,
      configurationName: string,
      options?: SecurityUserConfigurationsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, networkManagerName, configurationName, options),
    beginDelete: async (
      resourceGroupName: string,
      networkManagerName: string,
      configurationName: string,
      options?: SecurityUserConfigurationsDeleteOptionalParams,
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
      options?: SecurityUserConfigurationsDeleteOptionalParams,
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
      securityUserConfiguration: SecurityUserConfiguration,
      options?: SecurityUserConfigurationsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        networkManagerName,
        configurationName,
        securityUserConfiguration,
        options,
      ),
    get: (
      resourceGroupName: string,
      networkManagerName: string,
      configurationName: string,
      options?: SecurityUserConfigurationsGetOptionalParams,
    ) => get(context, resourceGroupName, networkManagerName, configurationName, options),
  };
}

export function _getSecurityUserConfigurationsOperations(
  context: NetworkManagementContext,
): SecurityUserConfigurationsOperations {
  return {
    ..._getSecurityUserConfigurations(context),
  };
}

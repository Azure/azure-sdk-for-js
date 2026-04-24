// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityCenterContext } from "../../api/securityCenterContext.js";
import {
  list,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/devOpsConfigurations/operations.js";
import type {
  DevOpsConfigurationsListOptionalParams,
  DevOpsConfigurationsDeleteOptionalParams,
  DevOpsConfigurationsUpdateOptionalParams,
  DevOpsConfigurationsCreateOrUpdateOptionalParams,
  DevOpsConfigurationsGetOptionalParams,
} from "../../api/devOpsConfigurations/options.js";
import type { SecurityConnectorsDevOpsAPIDevOpsConfiguration } from "../../models/securityConnectorsDevOpsAPI/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a DevOpsConfigurations operations. */
export interface DevOpsConfigurationsOperations {
  /** List DevOps Configurations. */
  list: (
    resourceGroupName: string,
    securityConnectorName: string,
    options?: DevOpsConfigurationsListOptionalParams,
  ) => PagedAsyncIterableIterator<SecurityConnectorsDevOpsAPIDevOpsConfiguration>;
  /** Deletes a DevOps Connector. */
  delete: (
    resourceGroupName: string,
    securityConnectorName: string,
    options?: DevOpsConfigurationsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    securityConnectorName: string,
    options?: DevOpsConfigurationsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    securityConnectorName: string,
    options?: DevOpsConfigurationsDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates a DevOps Configuration. */
  update: (
    resourceGroupName: string,
    securityConnectorName: string,
    devOpsConfiguration: SecurityConnectorsDevOpsAPIDevOpsConfiguration,
    options?: DevOpsConfigurationsUpdateOptionalParams,
  ) => PollerLike<
    OperationState<SecurityConnectorsDevOpsAPIDevOpsConfiguration>,
    SecurityConnectorsDevOpsAPIDevOpsConfiguration
  >;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    securityConnectorName: string,
    devOpsConfiguration: SecurityConnectorsDevOpsAPIDevOpsConfiguration,
    options?: DevOpsConfigurationsUpdateOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<SecurityConnectorsDevOpsAPIDevOpsConfiguration>,
      SecurityConnectorsDevOpsAPIDevOpsConfiguration
    >
  >;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    securityConnectorName: string,
    devOpsConfiguration: SecurityConnectorsDevOpsAPIDevOpsConfiguration,
    options?: DevOpsConfigurationsUpdateOptionalParams,
  ) => Promise<SecurityConnectorsDevOpsAPIDevOpsConfiguration>;
  /** Creates or updates a DevOps Configuration. */
  createOrUpdate: (
    resourceGroupName: string,
    securityConnectorName: string,
    devOpsConfiguration: SecurityConnectorsDevOpsAPIDevOpsConfiguration,
    options?: DevOpsConfigurationsCreateOrUpdateOptionalParams,
  ) => PollerLike<
    OperationState<SecurityConnectorsDevOpsAPIDevOpsConfiguration>,
    SecurityConnectorsDevOpsAPIDevOpsConfiguration
  >;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    securityConnectorName: string,
    devOpsConfiguration: SecurityConnectorsDevOpsAPIDevOpsConfiguration,
    options?: DevOpsConfigurationsCreateOrUpdateOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<SecurityConnectorsDevOpsAPIDevOpsConfiguration>,
      SecurityConnectorsDevOpsAPIDevOpsConfiguration
    >
  >;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    securityConnectorName: string,
    devOpsConfiguration: SecurityConnectorsDevOpsAPIDevOpsConfiguration,
    options?: DevOpsConfigurationsCreateOrUpdateOptionalParams,
  ) => Promise<SecurityConnectorsDevOpsAPIDevOpsConfiguration>;
  /** Gets a DevOps Configuration. */
  get: (
    resourceGroupName: string,
    securityConnectorName: string,
    options?: DevOpsConfigurationsGetOptionalParams,
  ) => Promise<SecurityConnectorsDevOpsAPIDevOpsConfiguration>;
}

function _getDevOpsConfigurations(context: SecurityCenterContext) {
  return {
    list: (
      resourceGroupName: string,
      securityConnectorName: string,
      options?: DevOpsConfigurationsListOptionalParams,
    ) => list(context, resourceGroupName, securityConnectorName, options),
    delete: (
      resourceGroupName: string,
      securityConnectorName: string,
      options?: DevOpsConfigurationsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, securityConnectorName, options),
    beginDelete: async (
      resourceGroupName: string,
      securityConnectorName: string,
      options?: DevOpsConfigurationsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, securityConnectorName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      securityConnectorName: string,
      options?: DevOpsConfigurationsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, securityConnectorName, options);
    },
    update: (
      resourceGroupName: string,
      securityConnectorName: string,
      devOpsConfiguration: SecurityConnectorsDevOpsAPIDevOpsConfiguration,
      options?: DevOpsConfigurationsUpdateOptionalParams,
    ) => update(context, resourceGroupName, securityConnectorName, devOpsConfiguration, options),
    beginUpdate: async (
      resourceGroupName: string,
      securityConnectorName: string,
      devOpsConfiguration: SecurityConnectorsDevOpsAPIDevOpsConfiguration,
      options?: DevOpsConfigurationsUpdateOptionalParams,
    ) => {
      const poller = update(
        context,
        resourceGroupName,
        securityConnectorName,
        devOpsConfiguration,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      securityConnectorName: string,
      devOpsConfiguration: SecurityConnectorsDevOpsAPIDevOpsConfiguration,
      options?: DevOpsConfigurationsUpdateOptionalParams,
    ) => {
      return await update(
        context,
        resourceGroupName,
        securityConnectorName,
        devOpsConfiguration,
        options,
      );
    },
    createOrUpdate: (
      resourceGroupName: string,
      securityConnectorName: string,
      devOpsConfiguration: SecurityConnectorsDevOpsAPIDevOpsConfiguration,
      options?: DevOpsConfigurationsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        securityConnectorName,
        devOpsConfiguration,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      securityConnectorName: string,
      devOpsConfiguration: SecurityConnectorsDevOpsAPIDevOpsConfiguration,
      options?: DevOpsConfigurationsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        securityConnectorName,
        devOpsConfiguration,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      securityConnectorName: string,
      devOpsConfiguration: SecurityConnectorsDevOpsAPIDevOpsConfiguration,
      options?: DevOpsConfigurationsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        securityConnectorName,
        devOpsConfiguration,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      securityConnectorName: string,
      options?: DevOpsConfigurationsGetOptionalParams,
    ) => get(context, resourceGroupName, securityConnectorName, options),
  };
}

export function _getDevOpsConfigurationsOperations(
  context: SecurityCenterContext,
): DevOpsConfigurationsOperations {
  return {
    ..._getDevOpsConfigurations(context),
  };
}

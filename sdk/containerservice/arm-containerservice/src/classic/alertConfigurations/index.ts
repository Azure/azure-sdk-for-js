// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ContainerServiceContext } from "../../api/containerServiceContext.js";
import {
  listByManagedCluster,
  $delete,
  createOrUpdate,
  get,
} from "../../api/alertConfigurations/operations.js";
import type {
  AlertConfigurationsListByManagedClusterOptionalParams,
  AlertConfigurationsDeleteOptionalParams,
  AlertConfigurationsCreateOrUpdateOptionalParams,
  AlertConfigurationsGetOptionalParams,
} from "../../api/alertConfigurations/options.js";
import type { AlertConfiguration } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a AlertConfigurations operations. */
export interface AlertConfigurationsOperations {
  /** Gets a list of alert configurations in the specified managed cluster. */
  listByManagedCluster: (
    resourceGroupName: string,
    resourceName: string,
    options?: AlertConfigurationsListByManagedClusterOptionalParams,
  ) => PagedAsyncIterableIterator<AlertConfiguration>;
  /** Deletes an alert configuration. */
  delete: (
    resourceGroupName: string,
    resourceName: string,
    configurationName: string,
    options?: AlertConfigurationsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    resourceName: string,
    configurationName: string,
    options?: AlertConfigurationsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    resourceName: string,
    configurationName: string,
    options?: AlertConfigurationsDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates an alert configuration in the specified managed cluster. */
  createOrUpdate: (
    resourceGroupName: string,
    resourceName: string,
    configurationName: string,
    resource: AlertConfiguration,
    options?: AlertConfigurationsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<AlertConfiguration>, AlertConfiguration>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    resourceName: string,
    configurationName: string,
    resource: AlertConfiguration,
    options?: AlertConfigurationsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<AlertConfiguration>, AlertConfiguration>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    resourceName: string,
    configurationName: string,
    resource: AlertConfiguration,
    options?: AlertConfigurationsCreateOrUpdateOptionalParams,
  ) => Promise<AlertConfiguration>;
  /** Gets the specified alert configuration of a managed cluster. */
  get: (
    resourceGroupName: string,
    resourceName: string,
    configurationName: string,
    options?: AlertConfigurationsGetOptionalParams,
  ) => Promise<AlertConfiguration>;
}
function _getAlertConfigurations(context: ContainerServiceContext) {
  return {
    listByManagedCluster: (
      resourceGroupName: string,
      resourceName: string,
      options?: AlertConfigurationsListByManagedClusterOptionalParams,
    ) => listByManagedCluster(context, resourceGroupName, resourceName, options),
    delete: (
      resourceGroupName: string,
      resourceName: string,
      configurationName: string,
      options?: AlertConfigurationsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, resourceName, configurationName, options),
    beginDelete: async (
      resourceGroupName: string,
      resourceName: string,
      configurationName: string,
      options?: AlertConfigurationsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, resourceName, configurationName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      resourceName: string,
      configurationName: string,
      options?: AlertConfigurationsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, resourceName, configurationName, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      resourceName: string,
      configurationName: string,
      resource: AlertConfiguration,
      options?: AlertConfigurationsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        resourceName,
        configurationName,
        resource,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      resourceName: string,
      configurationName: string,
      resource: AlertConfiguration,
      options?: AlertConfigurationsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        resourceName,
        configurationName,
        resource,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      resourceName: string,
      configurationName: string,
      resource: AlertConfiguration,
      options?: AlertConfigurationsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        resourceName,
        configurationName,
        resource,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      resourceName: string,
      configurationName: string,
      options?: AlertConfigurationsGetOptionalParams,
    ) => get(context, resourceGroupName, resourceName, configurationName, options),
  };
}
export function _getAlertConfigurationsOperations(
  context: ContainerServiceContext,
): AlertConfigurationsOperations {
  return {
    ..._getAlertConfigurations(context),
  };
}

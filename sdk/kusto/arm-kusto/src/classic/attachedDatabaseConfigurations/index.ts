// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { KustoManagementContext } from "../../api/kustoManagementContext.js";
import {
  checkNameAvailability,
  listByCluster,
  $delete,
  createOrUpdate,
  get,
} from "../../api/attachedDatabaseConfigurations/operations.js";
import type {
  AttachedDatabaseConfigurationsCheckNameAvailabilityOptionalParams,
  AttachedDatabaseConfigurationsListByClusterOptionalParams,
  AttachedDatabaseConfigurationsDeleteOptionalParams,
  AttachedDatabaseConfigurationsCreateOrUpdateOptionalParams,
  AttachedDatabaseConfigurationsGetOptionalParams,
} from "../../api/attachedDatabaseConfigurations/options.js";
import type {
  CheckNameResult,
  AttachedDatabaseConfiguration,
  AttachedDatabaseConfigurationsCheckNameRequest,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a AttachedDatabaseConfigurations operations. */
export interface AttachedDatabaseConfigurationsOperations {
  /** Checks that the attached database configuration resource name is valid and is not already in use. */
  checkNameAvailability: (
    resourceGroupName: string,
    clusterName: string,
    resourceName: AttachedDatabaseConfigurationsCheckNameRequest,
    options?: AttachedDatabaseConfigurationsCheckNameAvailabilityOptionalParams,
  ) => Promise<CheckNameResult>;
  /** Returns the list of attached database configurations of the given Kusto cluster. */
  listByCluster: (
    resourceGroupName: string,
    clusterName: string,
    options?: AttachedDatabaseConfigurationsListByClusterOptionalParams,
  ) => PagedAsyncIterableIterator<AttachedDatabaseConfiguration>;
  /** Deletes the attached database configuration with the given name. */
  delete: (
    resourceGroupName: string,
    clusterName: string,
    attachedDatabaseConfigurationName: string,
    options?: AttachedDatabaseConfigurationsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    clusterName: string,
    attachedDatabaseConfigurationName: string,
    options?: AttachedDatabaseConfigurationsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    clusterName: string,
    attachedDatabaseConfigurationName: string,
    options?: AttachedDatabaseConfigurationsDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates an attached database configuration. */
  createOrUpdate: (
    resourceGroupName: string,
    clusterName: string,
    attachedDatabaseConfigurationName: string,
    parameters: AttachedDatabaseConfiguration,
    options?: AttachedDatabaseConfigurationsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<AttachedDatabaseConfiguration>, AttachedDatabaseConfiguration>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    clusterName: string,
    attachedDatabaseConfigurationName: string,
    parameters: AttachedDatabaseConfiguration,
    options?: AttachedDatabaseConfigurationsCreateOrUpdateOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<AttachedDatabaseConfiguration>, AttachedDatabaseConfiguration>
  >;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    clusterName: string,
    attachedDatabaseConfigurationName: string,
    parameters: AttachedDatabaseConfiguration,
    options?: AttachedDatabaseConfigurationsCreateOrUpdateOptionalParams,
  ) => Promise<AttachedDatabaseConfiguration>;
  /** Returns an attached database configuration. */
  get: (
    resourceGroupName: string,
    clusterName: string,
    attachedDatabaseConfigurationName: string,
    options?: AttachedDatabaseConfigurationsGetOptionalParams,
  ) => Promise<AttachedDatabaseConfiguration>;
}

function _getAttachedDatabaseConfigurations(context: KustoManagementContext) {
  return {
    checkNameAvailability: (
      resourceGroupName: string,
      clusterName: string,
      resourceName: AttachedDatabaseConfigurationsCheckNameRequest,
      options?: AttachedDatabaseConfigurationsCheckNameAvailabilityOptionalParams,
    ) => checkNameAvailability(context, resourceGroupName, clusterName, resourceName, options),
    listByCluster: (
      resourceGroupName: string,
      clusterName: string,
      options?: AttachedDatabaseConfigurationsListByClusterOptionalParams,
    ) => listByCluster(context, resourceGroupName, clusterName, options),
    delete: (
      resourceGroupName: string,
      clusterName: string,
      attachedDatabaseConfigurationName: string,
      options?: AttachedDatabaseConfigurationsDeleteOptionalParams,
    ) =>
      $delete(context, resourceGroupName, clusterName, attachedDatabaseConfigurationName, options),
    beginDelete: async (
      resourceGroupName: string,
      clusterName: string,
      attachedDatabaseConfigurationName: string,
      options?: AttachedDatabaseConfigurationsDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        clusterName,
        attachedDatabaseConfigurationName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      attachedDatabaseConfigurationName: string,
      options?: AttachedDatabaseConfigurationsDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        clusterName,
        attachedDatabaseConfigurationName,
        options,
      );
    },
    createOrUpdate: (
      resourceGroupName: string,
      clusterName: string,
      attachedDatabaseConfigurationName: string,
      parameters: AttachedDatabaseConfiguration,
      options?: AttachedDatabaseConfigurationsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        clusterName,
        attachedDatabaseConfigurationName,
        parameters,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      clusterName: string,
      attachedDatabaseConfigurationName: string,
      parameters: AttachedDatabaseConfiguration,
      options?: AttachedDatabaseConfigurationsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        clusterName,
        attachedDatabaseConfigurationName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      attachedDatabaseConfigurationName: string,
      parameters: AttachedDatabaseConfiguration,
      options?: AttachedDatabaseConfigurationsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        clusterName,
        attachedDatabaseConfigurationName,
        parameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      clusterName: string,
      attachedDatabaseConfigurationName: string,
      options?: AttachedDatabaseConfigurationsGetOptionalParams,
    ) => get(context, resourceGroupName, clusterName, attachedDatabaseConfigurationName, options),
  };
}

export function _getAttachedDatabaseConfigurationsOperations(
  context: KustoManagementContext,
): AttachedDatabaseConfigurationsOperations {
  return {
    ..._getAttachedDatabaseConfigurations(context),
  };
}

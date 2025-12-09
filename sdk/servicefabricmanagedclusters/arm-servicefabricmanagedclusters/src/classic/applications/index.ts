// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ServiceFabricManagedClustersManagementContext } from "../../api/serviceFabricManagedClustersManagementContext.js";
import {
  restartDeployedCodePackage,
  fetchHealth,
  updateUpgrade,
  startRollback,
  resumeUpgrade,
  readUpgrade,
  list,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/applications/operations.js";
import type {
  ApplicationsRestartDeployedCodePackageOptionalParams,
  ApplicationsFetchHealthOptionalParams,
  ApplicationsUpdateUpgradeOptionalParams,
  ApplicationsStartRollbackOptionalParams,
  ApplicationsResumeUpgradeOptionalParams,
  ApplicationsReadUpgradeOptionalParams,
  ApplicationsListOptionalParams,
  ApplicationsDeleteOptionalParams,
  ApplicationsUpdateOptionalParams,
  ApplicationsCreateOrUpdateOptionalParams,
  ApplicationsGetOptionalParams,
} from "../../api/applications/options.js";
import type {
  ApplicationResource,
  ApplicationUpdateParameters,
  RuntimeResumeApplicationUpgradeParameters,
  RuntimeUpdateApplicationUpgradeParameters,
  ApplicationFetchHealthRequest,
  RestartDeployedCodePackageRequest,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Applications operations. */
export interface ApplicationsOperations {
  /** Restart a code package instance of a service replica or instance. This is a potentially destabilizing operation that should be used with immense care. */
  restartDeployedCodePackage: (
    resourceGroupName: string,
    clusterName: string,
    applicationName: string,
    parameters: RestartDeployedCodePackageRequest,
    options?: ApplicationsRestartDeployedCodePackageOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Get the status of the deployed application health. It will query the cluster to find the health of the deployed application. */
  fetchHealth: (
    resourceGroupName: string,
    clusterName: string,
    applicationName: string,
    parameters: ApplicationFetchHealthRequest,
    options?: ApplicationsFetchHealthOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Send a request to update the current application upgrade. */
  updateUpgrade: (
    resourceGroupName: string,
    clusterName: string,
    applicationName: string,
    parameters: RuntimeUpdateApplicationUpgradeParameters,
    options?: ApplicationsUpdateUpgradeOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Send a request to start a rollback of the current application upgrade. This will start rolling back the application to the previous version. */
  startRollback: (
    resourceGroupName: string,
    clusterName: string,
    applicationName: string,
    options?: ApplicationsStartRollbackOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Send a request to resume the current application upgrade. This will resume the application upgrade from where it was paused. */
  resumeUpgrade: (
    resourceGroupName: string,
    clusterName: string,
    applicationName: string,
    parameters: RuntimeResumeApplicationUpgradeParameters,
    options?: ApplicationsResumeUpgradeOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Get the status of the latest application upgrade. It will query the cluster to find the status of the latest application upgrade. */
  readUpgrade: (
    resourceGroupName: string,
    clusterName: string,
    applicationName: string,
    options?: ApplicationsReadUpgradeOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Gets all managed application resources created or in the process of being created in the Service Fabric cluster resource. */
  list: (
    resourceGroupName: string,
    clusterName: string,
    options?: ApplicationsListOptionalParams,
  ) => PagedAsyncIterableIterator<ApplicationResource>;
  /** Delete a Service Fabric managed application resource with the specified name. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    clusterName: string,
    applicationName: string,
    options?: ApplicationsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Updates an application resource of a given managed cluster. */
  update: (
    resourceGroupName: string,
    clusterName: string,
    applicationName: string,
    parameters: ApplicationUpdateParameters,
    options?: ApplicationsUpdateOptionalParams,
  ) => PollerLike<OperationState<ApplicationResource>, ApplicationResource>;
  /** Create or update a Service Fabric managed application resource with the specified name. */
  createOrUpdate: (
    resourceGroupName: string,
    clusterName: string,
    applicationName: string,
    parameters: ApplicationResource,
    options?: ApplicationsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<ApplicationResource>, ApplicationResource>;
  /** Get a Service Fabric managed application resource created or in the process of being created in the Service Fabric cluster resource. */
  get: (
    resourceGroupName: string,
    clusterName: string,
    applicationName: string,
    options?: ApplicationsGetOptionalParams,
  ) => Promise<ApplicationResource>;
}

function _getApplications(context: ServiceFabricManagedClustersManagementContext) {
  return {
    restartDeployedCodePackage: (
      resourceGroupName: string,
      clusterName: string,
      applicationName: string,
      parameters: RestartDeployedCodePackageRequest,
      options?: ApplicationsRestartDeployedCodePackageOptionalParams,
    ) =>
      restartDeployedCodePackage(
        context,
        resourceGroupName,
        clusterName,
        applicationName,
        parameters,
        options,
      ),
    fetchHealth: (
      resourceGroupName: string,
      clusterName: string,
      applicationName: string,
      parameters: ApplicationFetchHealthRequest,
      options?: ApplicationsFetchHealthOptionalParams,
    ) => fetchHealth(context, resourceGroupName, clusterName, applicationName, parameters, options),
    updateUpgrade: (
      resourceGroupName: string,
      clusterName: string,
      applicationName: string,
      parameters: RuntimeUpdateApplicationUpgradeParameters,
      options?: ApplicationsUpdateUpgradeOptionalParams,
    ) =>
      updateUpgrade(context, resourceGroupName, clusterName, applicationName, parameters, options),
    startRollback: (
      resourceGroupName: string,
      clusterName: string,
      applicationName: string,
      options?: ApplicationsStartRollbackOptionalParams,
    ) => startRollback(context, resourceGroupName, clusterName, applicationName, options),
    resumeUpgrade: (
      resourceGroupName: string,
      clusterName: string,
      applicationName: string,
      parameters: RuntimeResumeApplicationUpgradeParameters,
      options?: ApplicationsResumeUpgradeOptionalParams,
    ) =>
      resumeUpgrade(context, resourceGroupName, clusterName, applicationName, parameters, options),
    readUpgrade: (
      resourceGroupName: string,
      clusterName: string,
      applicationName: string,
      options?: ApplicationsReadUpgradeOptionalParams,
    ) => readUpgrade(context, resourceGroupName, clusterName, applicationName, options),
    list: (
      resourceGroupName: string,
      clusterName: string,
      options?: ApplicationsListOptionalParams,
    ) => list(context, resourceGroupName, clusterName, options),
    delete: (
      resourceGroupName: string,
      clusterName: string,
      applicationName: string,
      options?: ApplicationsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, clusterName, applicationName, options),
    update: (
      resourceGroupName: string,
      clusterName: string,
      applicationName: string,
      parameters: ApplicationUpdateParameters,
      options?: ApplicationsUpdateOptionalParams,
    ) => update(context, resourceGroupName, clusterName, applicationName, parameters, options),
    createOrUpdate: (
      resourceGroupName: string,
      clusterName: string,
      applicationName: string,
      parameters: ApplicationResource,
      options?: ApplicationsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(context, resourceGroupName, clusterName, applicationName, parameters, options),
    get: (
      resourceGroupName: string,
      clusterName: string,
      applicationName: string,
      options?: ApplicationsGetOptionalParams,
    ) => get(context, resourceGroupName, clusterName, applicationName, options),
  };
}

export function _getApplicationsOperations(
  context: ServiceFabricManagedClustersManagementContext,
): ApplicationsOperations {
  return {
    ..._getApplications(context),
  };
}

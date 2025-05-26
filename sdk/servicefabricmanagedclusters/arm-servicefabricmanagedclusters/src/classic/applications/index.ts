// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ServiceFabricContext } from "../../api/serviceFabricContext.js";
import {
  ApplicationResource,
  ApplicationUpdateParameters,
  RuntimeResumeApplicationUpgradeParameters,
} from "../../models/models.js";
import {
  ApplicationsStartRollbackOptionalParams,
  ApplicationsResumeUpgradeOptionalParams,
  ApplicationsReadUpgradeOptionalParams,
  ApplicationsListOptionalParams,
  ApplicationsDeleteOptionalParams,
  ApplicationsUpdateOptionalParams,
  ApplicationsCreateOrUpdateOptionalParams,
  ApplicationsGetOptionalParams,
} from "../../api/applications/options.js";
import {
  startRollback,
  resumeUpgrade,
  readUpgrade,
  list,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/applications/operations.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Applications operations. */
export interface ApplicationsOperations {
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
  /** Updates the tags of an application resource of a given managed cluster. */
  update: (
    resourceGroupName: string,
    clusterName: string,
    applicationName: string,
    parameters: ApplicationUpdateParameters,
    options?: ApplicationsUpdateOptionalParams,
  ) => Promise<ApplicationResource>;
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

function _getApplications(context: ServiceFabricContext) {
  return {
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

export function _getApplicationsOperations(context: ServiceFabricContext): ApplicationsOperations {
  return {
    ..._getApplications(context),
  };
}

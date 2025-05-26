// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ServiceFabricContext } from "../../api/serviceFabricContext.js";
import { ServiceResource, ServiceUpdateParameters } from "../../models/models.js";
import {
  ServicesListByApplicationsOptionalParams,
  ServicesDeleteOptionalParams,
  ServicesUpdateOptionalParams,
  ServicesCreateOrUpdateOptionalParams,
  ServicesGetOptionalParams,
} from "../../api/services/options.js";
import {
  listByApplications,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/services/operations.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Services operations. */
export interface ServicesOperations {
  /** Gets all service resources created or in the process of being created in the Service Fabric managed application resource. */
  listByApplications: (
    resourceGroupName: string,
    clusterName: string,
    applicationName: string,
    options?: ServicesListByApplicationsOptionalParams,
  ) => PagedAsyncIterableIterator<ServiceResource>;
  /** Delete a Service Fabric managed service resource with the specified name. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    clusterName: string,
    applicationName: string,
    serviceName: string,
    options?: ServicesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Updates the tags of a service resource of a given managed cluster. */
  update: (
    resourceGroupName: string,
    clusterName: string,
    applicationName: string,
    serviceName: string,
    parameters: ServiceUpdateParameters,
    options?: ServicesUpdateOptionalParams,
  ) => Promise<ServiceResource>;
  /** Create or update a Service Fabric managed service resource with the specified name. */
  createOrUpdate: (
    resourceGroupName: string,
    clusterName: string,
    applicationName: string,
    serviceName: string,
    parameters: ServiceResource,
    options?: ServicesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<ServiceResource>, ServiceResource>;
  /** Get a Service Fabric service resource created or in the process of being created in the Service Fabric managed application resource. */
  get: (
    resourceGroupName: string,
    clusterName: string,
    applicationName: string,
    serviceName: string,
    options?: ServicesGetOptionalParams,
  ) => Promise<ServiceResource>;
}

function _getServices(context: ServiceFabricContext) {
  return {
    listByApplications: (
      resourceGroupName: string,
      clusterName: string,
      applicationName: string,
      options?: ServicesListByApplicationsOptionalParams,
    ) => listByApplications(context, resourceGroupName, clusterName, applicationName, options),
    delete: (
      resourceGroupName: string,
      clusterName: string,
      applicationName: string,
      serviceName: string,
      options?: ServicesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, clusterName, applicationName, serviceName, options),
    update: (
      resourceGroupName: string,
      clusterName: string,
      applicationName: string,
      serviceName: string,
      parameters: ServiceUpdateParameters,
      options?: ServicesUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        clusterName,
        applicationName,
        serviceName,
        parameters,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      clusterName: string,
      applicationName: string,
      serviceName: string,
      parameters: ServiceResource,
      options?: ServicesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        clusterName,
        applicationName,
        serviceName,
        parameters,
        options,
      ),
    get: (
      resourceGroupName: string,
      clusterName: string,
      applicationName: string,
      serviceName: string,
      options?: ServicesGetOptionalParams,
    ) => get(context, resourceGroupName, clusterName, applicationName, serviceName, options),
  };
}

export function _getServicesOperations(context: ServiceFabricContext): ServicesOperations {
  return {
    ..._getServices(context),
  };
}

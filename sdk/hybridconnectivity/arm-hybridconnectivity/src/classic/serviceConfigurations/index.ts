// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HybridConnectivityManagementAPIContext } from "../../api/hybridConnectivityManagementAPIContext.js";
import {
  ServiceConfigurationResource,
  ServiceConfigurationResourcePatch,
} from "../../models/models.js";
import {
  ServiceConfigurationsListByEndpointResourceOptionalParams,
  ServiceConfigurationsDeleteOptionalParams,
  ServiceConfigurationsUpdateOptionalParams,
  ServiceConfigurationsCreateOrupdateOptionalParams,
  ServiceConfigurationsGetOptionalParams,
} from "../../api/serviceConfigurations/options.js";
import {
  listByEndpointResource,
  $delete,
  update,
  createOrupdate,
  get,
} from "../../api/serviceConfigurations/operations.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ServiceConfigurations operations. */
export interface ServiceConfigurationsOperations {
  /** API to enumerate registered services in service configurations under a Endpoint Resource */
  listByEndpointResource: (
    resourceUri: string,
    endpointName: string,
    options?: ServiceConfigurationsListByEndpointResourceOptionalParams,
  ) => PagedAsyncIterableIterator<ServiceConfigurationResource>;
  /** Deletes the service details to the target resource. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceUri: string,
    endpointName: string,
    serviceConfigurationName: string,
    options?: ServiceConfigurationsDeleteOptionalParams,
  ) => Promise<void>;
  /** Update the service details in the service configurations of the target resource. */
  update: (
    resourceUri: string,
    endpointName: string,
    serviceConfigurationName: string,
    serviceConfigurationResource: ServiceConfigurationResourcePatch,
    options?: ServiceConfigurationsUpdateOptionalParams,
  ) => Promise<ServiceConfigurationResource>;
  /** Create or update a service in serviceConfiguration for the endpoint resource. */
  createOrupdate: (
    resourceUri: string,
    endpointName: string,
    serviceConfigurationName: string,
    serviceConfigurationResource: ServiceConfigurationResource,
    options?: ServiceConfigurationsCreateOrupdateOptionalParams,
  ) => Promise<ServiceConfigurationResource>;
  /** Gets the details about the service to the resource. */
  get: (
    resourceUri: string,
    endpointName: string,
    serviceConfigurationName: string,
    options?: ServiceConfigurationsGetOptionalParams,
  ) => Promise<ServiceConfigurationResource>;
}

function _getServiceConfigurations(context: HybridConnectivityManagementAPIContext) {
  return {
    listByEndpointResource: (
      resourceUri: string,
      endpointName: string,
      options?: ServiceConfigurationsListByEndpointResourceOptionalParams,
    ) => listByEndpointResource(context, resourceUri, endpointName, options),
    delete: (
      resourceUri: string,
      endpointName: string,
      serviceConfigurationName: string,
      options?: ServiceConfigurationsDeleteOptionalParams,
    ) => $delete(context, resourceUri, endpointName, serviceConfigurationName, options),
    update: (
      resourceUri: string,
      endpointName: string,
      serviceConfigurationName: string,
      serviceConfigurationResource: ServiceConfigurationResourcePatch,
      options?: ServiceConfigurationsUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceUri,
        endpointName,
        serviceConfigurationName,
        serviceConfigurationResource,
        options,
      ),
    createOrupdate: (
      resourceUri: string,
      endpointName: string,
      serviceConfigurationName: string,
      serviceConfigurationResource: ServiceConfigurationResource,
      options?: ServiceConfigurationsCreateOrupdateOptionalParams,
    ) =>
      createOrupdate(
        context,
        resourceUri,
        endpointName,
        serviceConfigurationName,
        serviceConfigurationResource,
        options,
      ),
    get: (
      resourceUri: string,
      endpointName: string,
      serviceConfigurationName: string,
      options?: ServiceConfigurationsGetOptionalParams,
    ) => get(context, resourceUri, endpointName, serviceConfigurationName, options),
  };
}

export function _getServiceConfigurationsOperations(
  context: HybridConnectivityManagementAPIContext,
): ServiceConfigurationsOperations {
  return {
    ..._getServiceConfigurations(context),
  };
}

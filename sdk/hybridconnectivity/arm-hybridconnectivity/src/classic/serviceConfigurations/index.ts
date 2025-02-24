// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HybridConnectivityManagementAPIContext } from "../../api/hybridConnectivityManagementAPIContext.js";
import {
  ServiceConfigurationsListByEndpointResourceOptionalParams,
  ServiceConfigurationsDeleteOptionalParams,
  ServiceConfigurationsUpdateOptionalParams,
  ServiceConfigurationsCreateOrupdateOptionalParams,
  ServiceConfigurationsGetOptionalParams,
} from "../../api/options.js";
import {
  serviceConfigurationsListByEndpointResource,
  serviceConfigurationsDelete,
  serviceConfigurationsUpdate,
  serviceConfigurationsCreateOrupdate,
  serviceConfigurationsGet,
} from "../../api/serviceConfigurations/index.js";
import {
  ServiceConfigurationResource,
  ServiceConfigurationResourcePatch,
} from "../../models/models.js";
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
    ) => serviceConfigurationsListByEndpointResource(context, resourceUri, endpointName, options),
    delete: (
      resourceUri: string,
      endpointName: string,
      serviceConfigurationName: string,
      options?: ServiceConfigurationsDeleteOptionalParams,
    ) =>
      serviceConfigurationsDelete(
        context,
        resourceUri,
        endpointName,
        serviceConfigurationName,
        options,
      ),
    update: (
      resourceUri: string,
      endpointName: string,
      serviceConfigurationName: string,
      serviceConfigurationResource: ServiceConfigurationResourcePatch,
      options?: ServiceConfigurationsUpdateOptionalParams,
    ) =>
      serviceConfigurationsUpdate(
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
      serviceConfigurationsCreateOrupdate(
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
    ) =>
      serviceConfigurationsGet(
        context,
        resourceUri,
        endpointName,
        serviceConfigurationName,
        options,
      ),
  };
}

export function _getServiceConfigurationsOperations(
  context: HybridConnectivityManagementAPIContext,
): ServiceConfigurationsOperations {
  return {
    ..._getServiceConfigurations(context),
  };
}

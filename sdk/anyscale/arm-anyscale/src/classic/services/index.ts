// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PlatformContext } from "../../api/platformContext.js";
import {
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/services/operations.js";
import type {
  ServicesListByResourceGroupOptionalParams,
  ServicesDeleteOptionalParams,
  ServicesUpdateOptionalParams,
  ServicesCreateOrUpdateOptionalParams,
  ServicesGetOptionalParams,
} from "../../api/services/options.js";
import type { Service, ServiceUpdate } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Services operations. */
export interface ServicesOperations {
  /** Lists services in a project. */
  listByResourceGroup: (
    resourceGroupName: string,
    cloudName: string,
    projectName: string,
    options?: ServicesListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<Service>;
  /** Deletes a service. */
  delete: (
    resourceGroupName: string,
    cloudName: string,
    projectName: string,
    serviceName: string,
    options?: ServicesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Updates a service. */
  update: (
    resourceGroupName: string,
    cloudName: string,
    projectName: string,
    serviceName: string,
    properties: ServiceUpdate,
    options?: ServicesUpdateOptionalParams,
  ) => Promise<Service>;
  /** Creates or updates a service. */
  createOrUpdate: (
    resourceGroupName: string,
    cloudName: string,
    projectName: string,
    serviceName: string,
    resource: Service,
    options?: ServicesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<Service>, Service>;
  /** Gets a service. */
  get: (
    resourceGroupName: string,
    cloudName: string,
    projectName: string,
    serviceName: string,
    options?: ServicesGetOptionalParams,
  ) => Promise<Service>;
}

function _getServices(context: PlatformContext) {
  return {
    listByResourceGroup: (
      resourceGroupName: string,
      cloudName: string,
      projectName: string,
      options?: ServicesListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, cloudName, projectName, options),
    delete: (
      resourceGroupName: string,
      cloudName: string,
      projectName: string,
      serviceName: string,
      options?: ServicesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, cloudName, projectName, serviceName, options),
    update: (
      resourceGroupName: string,
      cloudName: string,
      projectName: string,
      serviceName: string,
      properties: ServiceUpdate,
      options?: ServicesUpdateOptionalParams,
    ) =>
      update(context, resourceGroupName, cloudName, projectName, serviceName, properties, options),
    createOrUpdate: (
      resourceGroupName: string,
      cloudName: string,
      projectName: string,
      serviceName: string,
      resource: Service,
      options?: ServicesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        cloudName,
        projectName,
        serviceName,
        resource,
        options,
      ),
    get: (
      resourceGroupName: string,
      cloudName: string,
      projectName: string,
      serviceName: string,
      options?: ServicesGetOptionalParams,
    ) => get(context, resourceGroupName, cloudName, projectName, serviceName, options),
  };
}

export function _getServicesOperations(context: PlatformContext): ServicesOperations {
  return {
    ..._getServices(context),
  };
}

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ServiceFabricManagementContext } from "../../api/serviceFabricManagementContext.js";
import { list, $delete, update, createOrUpdate, get } from "../../api/services/operations.js";
import type {
  ServicesListOptionalParams,
  ServicesDeleteOptionalParams,
  ServicesUpdateOptionalParams,
  ServicesCreateOrUpdateOptionalParams,
  ServicesGetOptionalParams,
} from "../../api/services/options.js";
import type { ServiceResource, ServiceResourceUpdate } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Services operations. */
export interface ServicesOperations {
  /** Gets all service resources created or in the process of being created in the Service Fabric application resource. */
  list: (
    resourceGroupName: string,
    clusterName: string,
    applicationName: string,
    options?: ServicesListOptionalParams,
  ) => PagedAsyncIterableIterator<ServiceResource>;
  /** Delete a Service Fabric service resource with the specified name. */
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
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    clusterName: string,
    applicationName: string,
    serviceName: string,
    options?: ServicesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    clusterName: string,
    applicationName: string,
    serviceName: string,
    options?: ServicesDeleteOptionalParams,
  ) => Promise<void>;
  /** Update a Service Fabric service resource with the specified name. */
  update: (
    resourceGroupName: string,
    clusterName: string,
    applicationName: string,
    serviceName: string,
    parameters: ServiceResourceUpdate,
    options?: ServicesUpdateOptionalParams,
  ) => PollerLike<OperationState<ServiceResource>, ServiceResource>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    clusterName: string,
    applicationName: string,
    serviceName: string,
    parameters: ServiceResourceUpdate,
    options?: ServicesUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<ServiceResource>, ServiceResource>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    clusterName: string,
    applicationName: string,
    serviceName: string,
    parameters: ServiceResourceUpdate,
    options?: ServicesUpdateOptionalParams,
  ) => Promise<ServiceResource>;
  /** Create or update a Service Fabric service resource with the specified name. */
  createOrUpdate: (
    resourceGroupName: string,
    clusterName: string,
    applicationName: string,
    serviceName: string,
    parameters: ServiceResource,
    options?: ServicesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<ServiceResource>, ServiceResource>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    clusterName: string,
    applicationName: string,
    serviceName: string,
    parameters: ServiceResource,
    options?: ServicesCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<ServiceResource>, ServiceResource>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    clusterName: string,
    applicationName: string,
    serviceName: string,
    parameters: ServiceResource,
    options?: ServicesCreateOrUpdateOptionalParams,
  ) => Promise<ServiceResource>;
  /** Get a Service Fabric service resource created or in the process of being created in the Service Fabric application resource. */
  get: (
    resourceGroupName: string,
    clusterName: string,
    applicationName: string,
    serviceName: string,
    options?: ServicesGetOptionalParams,
  ) => Promise<ServiceResource>;
}

function _getServices(context: ServiceFabricManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      clusterName: string,
      applicationName: string,
      options?: ServicesListOptionalParams,
    ) => list(context, resourceGroupName, clusterName, applicationName, options),
    delete: (
      resourceGroupName: string,
      clusterName: string,
      applicationName: string,
      serviceName: string,
      options?: ServicesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, clusterName, applicationName, serviceName, options),
    beginDelete: async (
      resourceGroupName: string,
      clusterName: string,
      applicationName: string,
      serviceName: string,
      options?: ServicesDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        clusterName,
        applicationName,
        serviceName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      applicationName: string,
      serviceName: string,
      options?: ServicesDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        clusterName,
        applicationName,
        serviceName,
        options,
      );
    },
    update: (
      resourceGroupName: string,
      clusterName: string,
      applicationName: string,
      serviceName: string,
      parameters: ServiceResourceUpdate,
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
    beginUpdate: async (
      resourceGroupName: string,
      clusterName: string,
      applicationName: string,
      serviceName: string,
      parameters: ServiceResourceUpdate,
      options?: ServicesUpdateOptionalParams,
    ) => {
      const poller = update(
        context,
        resourceGroupName,
        clusterName,
        applicationName,
        serviceName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      applicationName: string,
      serviceName: string,
      parameters: ServiceResourceUpdate,
      options?: ServicesUpdateOptionalParams,
    ) => {
      return await update(
        context,
        resourceGroupName,
        clusterName,
        applicationName,
        serviceName,
        parameters,
        options,
      );
    },
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
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      clusterName: string,
      applicationName: string,
      serviceName: string,
      parameters: ServiceResource,
      options?: ServicesCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        clusterName,
        applicationName,
        serviceName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      applicationName: string,
      serviceName: string,
      parameters: ServiceResource,
      options?: ServicesCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        clusterName,
        applicationName,
        serviceName,
        parameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      clusterName: string,
      applicationName: string,
      serviceName: string,
      options?: ServicesGetOptionalParams,
    ) => get(context, resourceGroupName, clusterName, applicationName, serviceName, options),
  };
}

export function _getServicesOperations(
  context: ServiceFabricManagementContext,
): ServicesOperations {
  return {
    ..._getServices(context),
  };
}

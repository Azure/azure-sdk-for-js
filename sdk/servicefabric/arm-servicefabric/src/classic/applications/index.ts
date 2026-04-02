// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ServiceFabricManagementContext } from "../../api/serviceFabricManagementContext.js";
import { list, $delete, update, createOrUpdate, get } from "../../api/applications/operations.js";
import type {
  ApplicationsListOptionalParams,
  ApplicationsDeleteOptionalParams,
  ApplicationsUpdateOptionalParams,
  ApplicationsCreateOrUpdateOptionalParams,
  ApplicationsGetOptionalParams,
} from "../../api/applications/options.js";
import type { ApplicationResource, ApplicationResourceUpdate } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Applications operations. */
export interface ApplicationsOperations {
  /** Gets all application resources created or in the process of being created in the Service Fabric cluster resource. */
  list: (
    resourceGroupName: string,
    clusterName: string,
    options?: ApplicationsListOptionalParams,
  ) => PagedAsyncIterableIterator<ApplicationResource>;
  /** Delete a Service Fabric application resource with the specified name. */
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
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    clusterName: string,
    applicationName: string,
    options?: ApplicationsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    clusterName: string,
    applicationName: string,
    options?: ApplicationsDeleteOptionalParams,
  ) => Promise<void>;
  /** Update a Service Fabric application resource with the specified name. */
  update: (
    resourceGroupName: string,
    clusterName: string,
    applicationName: string,
    parameters: ApplicationResourceUpdate,
    options?: ApplicationsUpdateOptionalParams,
  ) => PollerLike<OperationState<ApplicationResource>, ApplicationResource>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    clusterName: string,
    applicationName: string,
    parameters: ApplicationResourceUpdate,
    options?: ApplicationsUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<ApplicationResource>, ApplicationResource>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    clusterName: string,
    applicationName: string,
    parameters: ApplicationResourceUpdate,
    options?: ApplicationsUpdateOptionalParams,
  ) => Promise<ApplicationResource>;
  /** Create or update a Service Fabric application resource with the specified name. */
  createOrUpdate: (
    resourceGroupName: string,
    clusterName: string,
    applicationName: string,
    parameters: ApplicationResource,
    options?: ApplicationsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<ApplicationResource>, ApplicationResource>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    clusterName: string,
    applicationName: string,
    parameters: ApplicationResource,
    options?: ApplicationsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<ApplicationResource>, ApplicationResource>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    clusterName: string,
    applicationName: string,
    parameters: ApplicationResource,
    options?: ApplicationsCreateOrUpdateOptionalParams,
  ) => Promise<ApplicationResource>;
  /** Get a Service Fabric application resource created or in the process of being created in the Service Fabric cluster resource. */
  get: (
    resourceGroupName: string,
    clusterName: string,
    applicationName: string,
    options?: ApplicationsGetOptionalParams,
  ) => Promise<ApplicationResource>;
}

function _getApplications(context: ServiceFabricManagementContext) {
  return {
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
    beginDelete: async (
      resourceGroupName: string,
      clusterName: string,
      applicationName: string,
      options?: ApplicationsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, clusterName, applicationName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      applicationName: string,
      options?: ApplicationsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, clusterName, applicationName, options);
    },
    update: (
      resourceGroupName: string,
      clusterName: string,
      applicationName: string,
      parameters: ApplicationResourceUpdate,
      options?: ApplicationsUpdateOptionalParams,
    ) => update(context, resourceGroupName, clusterName, applicationName, parameters, options),
    beginUpdate: async (
      resourceGroupName: string,
      clusterName: string,
      applicationName: string,
      parameters: ApplicationResourceUpdate,
      options?: ApplicationsUpdateOptionalParams,
    ) => {
      const poller = update(
        context,
        resourceGroupName,
        clusterName,
        applicationName,
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
      parameters: ApplicationResourceUpdate,
      options?: ApplicationsUpdateOptionalParams,
    ) => {
      return await update(
        context,
        resourceGroupName,
        clusterName,
        applicationName,
        parameters,
        options,
      );
    },
    createOrUpdate: (
      resourceGroupName: string,
      clusterName: string,
      applicationName: string,
      parameters: ApplicationResource,
      options?: ApplicationsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(context, resourceGroupName, clusterName, applicationName, parameters, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      clusterName: string,
      applicationName: string,
      parameters: ApplicationResource,
      options?: ApplicationsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        clusterName,
        applicationName,
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
      parameters: ApplicationResource,
      options?: ApplicationsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        clusterName,
        applicationName,
        parameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      clusterName: string,
      applicationName: string,
      options?: ApplicationsGetOptionalParams,
    ) => get(context, resourceGroupName, clusterName, applicationName, options),
  };
}

export function _getApplicationsOperations(
  context: ServiceFabricManagementContext,
): ApplicationsOperations {
  return {
    ..._getApplications(context),
  };
}

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ServiceFabricManagementContext } from "../../api/serviceFabricManagementContext.js";
import {
  list,
  $delete,
  createOrUpdate,
  get,
} from "../../api/applicationTypeVersions/operations.js";
import type {
  ApplicationTypeVersionsListOptionalParams,
  ApplicationTypeVersionsDeleteOptionalParams,
  ApplicationTypeVersionsCreateOrUpdateOptionalParams,
  ApplicationTypeVersionsGetOptionalParams,
} from "../../api/applicationTypeVersions/options.js";
import type { ApplicationTypeVersionResource } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ApplicationTypeVersions operations. */
export interface ApplicationTypeVersionsOperations {
  /** Gets all application type version resources created or in the process of being created in the Service Fabric application type name resource. */
  list: (
    resourceGroupName: string,
    clusterName: string,
    applicationTypeName: string,
    options?: ApplicationTypeVersionsListOptionalParams,
  ) => PagedAsyncIterableIterator<ApplicationTypeVersionResource>;
  /** Delete a Service Fabric application type version resource with the specified name. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    clusterName: string,
    applicationTypeName: string,
    version: string,
    options?: ApplicationTypeVersionsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    clusterName: string,
    applicationTypeName: string,
    version: string,
    options?: ApplicationTypeVersionsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    clusterName: string,
    applicationTypeName: string,
    version: string,
    options?: ApplicationTypeVersionsDeleteOptionalParams,
  ) => Promise<void>;
  /** Create or update a Service Fabric application type version resource with the specified name. */
  createOrUpdate: (
    resourceGroupName: string,
    clusterName: string,
    applicationTypeName: string,
    version: string,
    parameters: ApplicationTypeVersionResource,
    options?: ApplicationTypeVersionsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<ApplicationTypeVersionResource>, ApplicationTypeVersionResource>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    clusterName: string,
    applicationTypeName: string,
    version: string,
    parameters: ApplicationTypeVersionResource,
    options?: ApplicationTypeVersionsCreateOrUpdateOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<ApplicationTypeVersionResource>, ApplicationTypeVersionResource>
  >;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    clusterName: string,
    applicationTypeName: string,
    version: string,
    parameters: ApplicationTypeVersionResource,
    options?: ApplicationTypeVersionsCreateOrUpdateOptionalParams,
  ) => Promise<ApplicationTypeVersionResource>;
  /** Get a Service Fabric application type version resource created or in the process of being created in the Service Fabric application type name resource. */
  get: (
    resourceGroupName: string,
    clusterName: string,
    applicationTypeName: string,
    version: string,
    options?: ApplicationTypeVersionsGetOptionalParams,
  ) => Promise<ApplicationTypeVersionResource>;
}

function _getApplicationTypeVersions(context: ServiceFabricManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      clusterName: string,
      applicationTypeName: string,
      options?: ApplicationTypeVersionsListOptionalParams,
    ) => list(context, resourceGroupName, clusterName, applicationTypeName, options),
    delete: (
      resourceGroupName: string,
      clusterName: string,
      applicationTypeName: string,
      version: string,
      options?: ApplicationTypeVersionsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, clusterName, applicationTypeName, version, options),
    beginDelete: async (
      resourceGroupName: string,
      clusterName: string,
      applicationTypeName: string,
      version: string,
      options?: ApplicationTypeVersionsDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        clusterName,
        applicationTypeName,
        version,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      applicationTypeName: string,
      version: string,
      options?: ApplicationTypeVersionsDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        clusterName,
        applicationTypeName,
        version,
        options,
      );
    },
    createOrUpdate: (
      resourceGroupName: string,
      clusterName: string,
      applicationTypeName: string,
      version: string,
      parameters: ApplicationTypeVersionResource,
      options?: ApplicationTypeVersionsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        clusterName,
        applicationTypeName,
        version,
        parameters,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      clusterName: string,
      applicationTypeName: string,
      version: string,
      parameters: ApplicationTypeVersionResource,
      options?: ApplicationTypeVersionsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        clusterName,
        applicationTypeName,
        version,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      applicationTypeName: string,
      version: string,
      parameters: ApplicationTypeVersionResource,
      options?: ApplicationTypeVersionsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        clusterName,
        applicationTypeName,
        version,
        parameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      clusterName: string,
      applicationTypeName: string,
      version: string,
      options?: ApplicationTypeVersionsGetOptionalParams,
    ) => get(context, resourceGroupName, clusterName, applicationTypeName, version, options),
  };
}

export function _getApplicationTypeVersionsOperations(
  context: ServiceFabricManagementContext,
): ApplicationTypeVersionsOperations {
  return {
    ..._getApplicationTypeVersions(context),
  };
}

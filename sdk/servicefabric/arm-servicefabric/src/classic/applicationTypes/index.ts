// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ServiceFabricManagementContext } from "../../api/serviceFabricManagementContext.js";
import { list, $delete, createOrUpdate, get } from "../../api/applicationTypes/operations.js";
import type {
  ApplicationTypesListOptionalParams,
  ApplicationTypesDeleteOptionalParams,
  ApplicationTypesCreateOrUpdateOptionalParams,
  ApplicationTypesGetOptionalParams,
} from "../../api/applicationTypes/options.js";
import type { ApplicationTypeResource } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ApplicationTypes operations. */
export interface ApplicationTypesOperations {
  /** Gets all application type name resources created or in the process of being created in the Service Fabric cluster resource. */
  list: (
    resourceGroupName: string,
    clusterName: string,
    options?: ApplicationTypesListOptionalParams,
  ) => PagedAsyncIterableIterator<ApplicationTypeResource>;
  /** Delete a Service Fabric application type name resource with the specified name. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    clusterName: string,
    applicationTypeName: string,
    options?: ApplicationTypesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    clusterName: string,
    applicationTypeName: string,
    options?: ApplicationTypesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    clusterName: string,
    applicationTypeName: string,
    options?: ApplicationTypesDeleteOptionalParams,
  ) => Promise<void>;
  /** Create or update a Service Fabric application type name resource with the specified name. */
  createOrUpdate: (
    resourceGroupName: string,
    clusterName: string,
    applicationTypeName: string,
    parameters: ApplicationTypeResource,
    options?: ApplicationTypesCreateOrUpdateOptionalParams,
  ) => Promise<ApplicationTypeResource>;
  /** Get a Service Fabric application type name resource created or in the process of being created in the Service Fabric cluster resource. */
  get: (
    resourceGroupName: string,
    clusterName: string,
    applicationTypeName: string,
    options?: ApplicationTypesGetOptionalParams,
  ) => Promise<ApplicationTypeResource>;
}

function _getApplicationTypes(context: ServiceFabricManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      clusterName: string,
      options?: ApplicationTypesListOptionalParams,
    ) => list(context, resourceGroupName, clusterName, options),
    delete: (
      resourceGroupName: string,
      clusterName: string,
      applicationTypeName: string,
      options?: ApplicationTypesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, clusterName, applicationTypeName, options),
    beginDelete: async (
      resourceGroupName: string,
      clusterName: string,
      applicationTypeName: string,
      options?: ApplicationTypesDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, clusterName, applicationTypeName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      applicationTypeName: string,
      options?: ApplicationTypesDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, clusterName, applicationTypeName, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      clusterName: string,
      applicationTypeName: string,
      parameters: ApplicationTypeResource,
      options?: ApplicationTypesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        clusterName,
        applicationTypeName,
        parameters,
        options,
      ),
    get: (
      resourceGroupName: string,
      clusterName: string,
      applicationTypeName: string,
      options?: ApplicationTypesGetOptionalParams,
    ) => get(context, resourceGroupName, clusterName, applicationTypeName, options),
  };
}

export function _getApplicationTypesOperations(
  context: ServiceFabricManagementContext,
): ApplicationTypesOperations {
  return {
    ..._getApplicationTypes(context),
  };
}

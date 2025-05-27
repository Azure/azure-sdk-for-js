// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ServiceFabricContext } from "../../api/serviceFabricContext.js";
import {
  ApplicationTypeVersionResource,
  ApplicationTypeVersionUpdateParameters,
} from "../../models/models.js";
import {
  ApplicationTypeVersionsListByApplicationTypesOptionalParams,
  ApplicationTypeVersionsDeleteOptionalParams,
  ApplicationTypeVersionsUpdateOptionalParams,
  ApplicationTypeVersionsCreateOrUpdateOptionalParams,
  ApplicationTypeVersionsGetOptionalParams,
} from "../../api/applicationTypeVersions/options.js";
import {
  listByApplicationTypes,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/applicationTypeVersions/operations.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ApplicationTypeVersions operations. */
export interface ApplicationTypeVersionsOperations {
  /** Gets all application type version resources created or in the process of being created in the Service Fabric managed application type name resource. */
  listByApplicationTypes: (
    resourceGroupName: string,
    clusterName: string,
    applicationTypeName: string,
    options?: ApplicationTypeVersionsListByApplicationTypesOptionalParams,
  ) => PagedAsyncIterableIterator<ApplicationTypeVersionResource>;
  /** Delete a Service Fabric managed application type version resource with the specified name. */
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
  /** Updates the tags of an application type version resource of a given managed cluster. */
  update: (
    resourceGroupName: string,
    clusterName: string,
    applicationTypeName: string,
    version: string,
    parameters: ApplicationTypeVersionUpdateParameters,
    options?: ApplicationTypeVersionsUpdateOptionalParams,
  ) => Promise<ApplicationTypeVersionResource>;
  /** Create or update a Service Fabric managed application type version resource with the specified name. */
  createOrUpdate: (
    resourceGroupName: string,
    clusterName: string,
    applicationTypeName: string,
    version: string,
    parameters: ApplicationTypeVersionResource,
    options?: ApplicationTypeVersionsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<ApplicationTypeVersionResource>, ApplicationTypeVersionResource>;
  /** Get a Service Fabric managed application type version resource created or in the process of being created in the Service Fabric managed application type name resource. */
  get: (
    resourceGroupName: string,
    clusterName: string,
    applicationTypeName: string,
    version: string,
    options?: ApplicationTypeVersionsGetOptionalParams,
  ) => Promise<ApplicationTypeVersionResource>;
}

function _getApplicationTypeVersions(context: ServiceFabricContext) {
  return {
    listByApplicationTypes: (
      resourceGroupName: string,
      clusterName: string,
      applicationTypeName: string,
      options?: ApplicationTypeVersionsListByApplicationTypesOptionalParams,
    ) =>
      listByApplicationTypes(context, resourceGroupName, clusterName, applicationTypeName, options),
    delete: (
      resourceGroupName: string,
      clusterName: string,
      applicationTypeName: string,
      version: string,
      options?: ApplicationTypeVersionsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, clusterName, applicationTypeName, version, options),
    update: (
      resourceGroupName: string,
      clusterName: string,
      applicationTypeName: string,
      version: string,
      parameters: ApplicationTypeVersionUpdateParameters,
      options?: ApplicationTypeVersionsUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        clusterName,
        applicationTypeName,
        version,
        parameters,
        options,
      ),
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
  context: ServiceFabricContext,
): ApplicationTypeVersionsOperations {
  return {
    ..._getApplicationTypeVersions(context),
  };
}

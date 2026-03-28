// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext } from "../../api/apiManagementContext.js";
import {
  listByService,
  $delete,
  update,
  createOrUpdate,
  getEntityTag,
  get,
} from "../../api/workspaceApiVersionSet/operations.js";
import type {
  WorkspaceApiVersionSetListByServiceOptionalParams,
  WorkspaceApiVersionSetDeleteOptionalParams,
  WorkspaceApiVersionSetUpdateOptionalParams,
  WorkspaceApiVersionSetCreateOrUpdateOptionalParams,
  WorkspaceApiVersionSetGetEntityTagOptionalParams,
  WorkspaceApiVersionSetGetOptionalParams,
} from "../../api/workspaceApiVersionSet/options.js";
import type { ApiVersionSetContract, ApiVersionSetUpdateParameters } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a WorkspaceApiVersionSet operations. */
export interface WorkspaceApiVersionSetOperations {
  /** Lists a collection of API Version Sets in the specified workspace with a service instance. */
  listByService: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    options?: WorkspaceApiVersionSetListByServiceOptionalParams,
  ) => PagedAsyncIterableIterator<ApiVersionSetContract>;
  /** Deletes specific Api Version Set. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    versionSetId: string,
    ifMatch: string,
    options?: WorkspaceApiVersionSetDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates the details of the Api VersionSet specified by its identifier. */
  update: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    versionSetId: string,
    ifMatch: string,
    parameters: ApiVersionSetUpdateParameters,
    options?: WorkspaceApiVersionSetUpdateOptionalParams,
  ) => Promise<ApiVersionSetContract>;
  /** Creates or Updates a Api Version Set. */
  createOrUpdate: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    versionSetId: string,
    parameters: ApiVersionSetContract,
    options?: WorkspaceApiVersionSetCreateOrUpdateOptionalParams,
  ) => Promise<ApiVersionSetContract>;
  /** Gets the entity state (Etag) version of the Api Version Set specified by its identifier. */
  getEntityTag: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    versionSetId: string,
    options?: WorkspaceApiVersionSetGetEntityTagOptionalParams,
  ) => Promise<void>;
  /** Gets the details of the Api Version Set specified by its identifier. */
  get: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    versionSetId: string,
    options?: WorkspaceApiVersionSetGetOptionalParams,
  ) => Promise<ApiVersionSetContract>;
}

function _getWorkspaceApiVersionSet(context: ApiManagementContext) {
  return {
    listByService: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      options?: WorkspaceApiVersionSetListByServiceOptionalParams,
    ) => listByService(context, resourceGroupName, serviceName, workspaceId, options),
    delete: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      versionSetId: string,
      ifMatch: string,
      options?: WorkspaceApiVersionSetDeleteOptionalParams,
    ) =>
      $delete(context, resourceGroupName, serviceName, workspaceId, versionSetId, ifMatch, options),
    update: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      versionSetId: string,
      ifMatch: string,
      parameters: ApiVersionSetUpdateParameters,
      options?: WorkspaceApiVersionSetUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        serviceName,
        workspaceId,
        versionSetId,
        ifMatch,
        parameters,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      versionSetId: string,
      parameters: ApiVersionSetContract,
      options?: WorkspaceApiVersionSetCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        serviceName,
        workspaceId,
        versionSetId,
        parameters,
        options,
      ),
    getEntityTag: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      versionSetId: string,
      options?: WorkspaceApiVersionSetGetEntityTagOptionalParams,
    ) => getEntityTag(context, resourceGroupName, serviceName, workspaceId, versionSetId, options),
    get: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      versionSetId: string,
      options?: WorkspaceApiVersionSetGetOptionalParams,
    ) => get(context, resourceGroupName, serviceName, workspaceId, versionSetId, options),
  };
}

export function _getWorkspaceApiVersionSetOperations(
  context: ApiManagementContext,
): WorkspaceApiVersionSetOperations {
  return {
    ..._getWorkspaceApiVersionSet(context),
  };
}

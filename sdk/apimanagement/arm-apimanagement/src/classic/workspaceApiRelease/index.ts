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
} from "../../api/workspaceApiRelease/operations.js";
import type {
  WorkspaceApiReleaseListByServiceOptionalParams,
  WorkspaceApiReleaseDeleteOptionalParams,
  WorkspaceApiReleaseUpdateOptionalParams,
  WorkspaceApiReleaseCreateOrUpdateOptionalParams,
  WorkspaceApiReleaseGetEntityTagOptionalParams,
  WorkspaceApiReleaseGetOptionalParams,
} from "../../api/workspaceApiRelease/options.js";
import type { ApiReleaseContract } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a WorkspaceApiRelease operations. */
export interface WorkspaceApiReleaseOperations {
  /** Lists all releases of an API. An API release is created when making an API Revision current. Releases are also used to rollback to previous revisions. Results will be paged and can be constrained by the $top and $skip parameters. */
  listByService: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    apiId: string,
    options?: WorkspaceApiReleaseListByServiceOptionalParams,
  ) => PagedAsyncIterableIterator<ApiReleaseContract>;
  /** Deletes the specified release in the API. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    apiId: string,
    releaseId: string,
    ifMatch: string,
    options?: WorkspaceApiReleaseDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates the details of the release of the API specified by its identifier. */
  update: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    apiId: string,
    releaseId: string,
    ifMatch: string,
    parameters: ApiReleaseContract,
    options?: WorkspaceApiReleaseUpdateOptionalParams,
  ) => Promise<ApiReleaseContract>;
  /** Creates a new Release for the API. */
  createOrUpdate: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    apiId: string,
    releaseId: string,
    parameters: ApiReleaseContract,
    options?: WorkspaceApiReleaseCreateOrUpdateOptionalParams,
  ) => Promise<ApiReleaseContract>;
  /** Returns the etag of an API release. */
  getEntityTag: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    apiId: string,
    releaseId: string,
    options?: WorkspaceApiReleaseGetEntityTagOptionalParams,
  ) => Promise<void>;
  /** Returns the details of an API release. */
  get: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    apiId: string,
    releaseId: string,
    options?: WorkspaceApiReleaseGetOptionalParams,
  ) => Promise<ApiReleaseContract>;
}

function _getWorkspaceApiRelease(context: ApiManagementContext) {
  return {
    listByService: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      apiId: string,
      options?: WorkspaceApiReleaseListByServiceOptionalParams,
    ) => listByService(context, resourceGroupName, serviceName, workspaceId, apiId, options),
    delete: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      apiId: string,
      releaseId: string,
      ifMatch: string,
      options?: WorkspaceApiReleaseDeleteOptionalParams,
    ) =>
      $delete(
        context,
        resourceGroupName,
        serviceName,
        workspaceId,
        apiId,
        releaseId,
        ifMatch,
        options,
      ),
    update: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      apiId: string,
      releaseId: string,
      ifMatch: string,
      parameters: ApiReleaseContract,
      options?: WorkspaceApiReleaseUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        serviceName,
        workspaceId,
        apiId,
        releaseId,
        ifMatch,
        parameters,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      apiId: string,
      releaseId: string,
      parameters: ApiReleaseContract,
      options?: WorkspaceApiReleaseCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        serviceName,
        workspaceId,
        apiId,
        releaseId,
        parameters,
        options,
      ),
    getEntityTag: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      apiId: string,
      releaseId: string,
      options?: WorkspaceApiReleaseGetEntityTagOptionalParams,
    ) =>
      getEntityTag(context, resourceGroupName, serviceName, workspaceId, apiId, releaseId, options),
    get: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      apiId: string,
      releaseId: string,
      options?: WorkspaceApiReleaseGetOptionalParams,
    ) => get(context, resourceGroupName, serviceName, workspaceId, apiId, releaseId, options),
  };
}

export function _getWorkspaceApiReleaseOperations(
  context: ApiManagementContext,
): WorkspaceApiReleaseOperations {
  return {
    ..._getWorkspaceApiRelease(context),
  };
}

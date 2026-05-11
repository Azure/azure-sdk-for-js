// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementContext } from "../../api/apiManagementContext.js";
import {
  listByService,
  $delete,
  update,
  createOrUpdate,
  getEntityTag,
  get,
} from "../../api/workspaceApi/operations.js";
import {
  WorkspaceApiListByServiceOptionalParams,
  WorkspaceApiDeleteOptionalParams,
  WorkspaceApiUpdateOptionalParams,
  WorkspaceApiCreateOrUpdateOptionalParams,
  WorkspaceApiGetEntityTagOptionalParams,
  WorkspaceApiGetOptionalParams,
} from "../../api/workspaceApi/options.js";
import { ApiContract, ApiCreateOrUpdateParameter, ApiUpdateContract } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a WorkspaceApi operations. */
export interface WorkspaceApiOperations {
  /** Lists all APIs of the workspace in an API Management service instance. */
  listByService: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    options?: WorkspaceApiListByServiceOptionalParams,
  ) => PagedAsyncIterableIterator<ApiContract>;
  /** Deletes the specified API of the workspace in an API Management service instance. */
  delete: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    apiId: string,
    ifMatch: string,
    options?: WorkspaceApiDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates the specified API of the workspace in an API Management service instance. */
  update: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    apiId: string,
    ifMatch: string,
    parameters: ApiUpdateContract,
    options?: WorkspaceApiUpdateOptionalParams,
  ) => Promise<ApiContract>;
  /** Creates new or updates existing specified API of the workspace in an API Management service instance. */
  createOrUpdate: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    apiId: string,
    parameters: ApiCreateOrUpdateParameter,
    options?: WorkspaceApiCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<ApiContract>, ApiContract>;
  /** Gets the entity state (Etag) version of the API specified by its identifier. */
  getEntityTag: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    apiId: string,
    options?: WorkspaceApiGetEntityTagOptionalParams,
  ) => Promise<void>;
  /** Gets the details of the API specified by its identifier. */
  get: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    apiId: string,
    options?: WorkspaceApiGetOptionalParams,
  ) => Promise<ApiContract>;
}

function _getWorkspaceApi(context: ApiManagementContext) {
  return {
    listByService: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      options?: WorkspaceApiListByServiceOptionalParams,
    ) => listByService(context, resourceGroupName, serviceName, workspaceId, options),
    delete: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      apiId: string,
      ifMatch: string,
      options?: WorkspaceApiDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, serviceName, workspaceId, apiId, ifMatch, options),
    update: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      apiId: string,
      ifMatch: string,
      parameters: ApiUpdateContract,
      options?: WorkspaceApiUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        serviceName,
        workspaceId,
        apiId,
        ifMatch,
        parameters,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      apiId: string,
      parameters: ApiCreateOrUpdateParameter,
      options?: WorkspaceApiCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        serviceName,
        workspaceId,
        apiId,
        parameters,
        options,
      ),
    getEntityTag: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      apiId: string,
      options?: WorkspaceApiGetEntityTagOptionalParams,
    ) => getEntityTag(context, resourceGroupName, serviceName, workspaceId, apiId, options),
    get: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      apiId: string,
      options?: WorkspaceApiGetOptionalParams,
    ) => get(context, resourceGroupName, serviceName, workspaceId, apiId, options),
  };
}

export function _getWorkspaceApiOperations(context: ApiManagementContext): WorkspaceApiOperations {
  return {
    ..._getWorkspaceApi(context),
  };
}

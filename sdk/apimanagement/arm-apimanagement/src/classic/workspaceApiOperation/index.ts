// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext } from "../../api/apiManagementContext.js";
import {
  listByApi,
  $delete,
  update,
  createOrUpdate,
  getEntityTag,
  get,
} from "../../api/workspaceApiOperation/operations.js";
import type {
  WorkspaceApiOperationListByApiOptionalParams,
  WorkspaceApiOperationDeleteOptionalParams,
  WorkspaceApiOperationUpdateOptionalParams,
  WorkspaceApiOperationCreateOrUpdateOptionalParams,
  WorkspaceApiOperationGetEntityTagOptionalParams,
  WorkspaceApiOperationGetOptionalParams,
} from "../../api/workspaceApiOperation/options.js";
import type { OperationContract, OperationUpdateContract } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a WorkspaceApiOperation operations. */
export interface WorkspaceApiOperationOperations {
  /** Lists a collection of the operations for the specified API. */
  listByApi: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    apiId: string,
    options?: WorkspaceApiOperationListByApiOptionalParams,
  ) => PagedAsyncIterableIterator<OperationContract>;
  /** Deletes the specified operation in the API. */
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
    operationId: string,
    ifMatch: string,
    options?: WorkspaceApiOperationDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates the details of the operation in the API specified by its identifier. */
  update: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    apiId: string,
    operationId: string,
    ifMatch: string,
    parameters: OperationUpdateContract,
    options?: WorkspaceApiOperationUpdateOptionalParams,
  ) => Promise<OperationContract>;
  /** Creates a new operation in the API or updates an existing one. */
  createOrUpdate: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    apiId: string,
    operationId: string,
    parameters: OperationContract,
    options?: WorkspaceApiOperationCreateOrUpdateOptionalParams,
  ) => Promise<OperationContract>;
  /** Gets the entity state (Etag) version of the API operation specified by its identifier. */
  getEntityTag: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    apiId: string,
    operationId: string,
    options?: WorkspaceApiOperationGetEntityTagOptionalParams,
  ) => Promise<void>;
  /** Gets the details of the API Operation specified by its identifier. */
  get: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    apiId: string,
    operationId: string,
    options?: WorkspaceApiOperationGetOptionalParams,
  ) => Promise<OperationContract>;
}

function _getWorkspaceApiOperation(context: ApiManagementContext) {
  return {
    listByApi: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      apiId: string,
      options?: WorkspaceApiOperationListByApiOptionalParams,
    ) => listByApi(context, resourceGroupName, serviceName, workspaceId, apiId, options),
    delete: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      apiId: string,
      operationId: string,
      ifMatch: string,
      options?: WorkspaceApiOperationDeleteOptionalParams,
    ) =>
      $delete(
        context,
        resourceGroupName,
        serviceName,
        workspaceId,
        apiId,
        operationId,
        ifMatch,
        options,
      ),
    update: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      apiId: string,
      operationId: string,
      ifMatch: string,
      parameters: OperationUpdateContract,
      options?: WorkspaceApiOperationUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        serviceName,
        workspaceId,
        apiId,
        operationId,
        ifMatch,
        parameters,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      apiId: string,
      operationId: string,
      parameters: OperationContract,
      options?: WorkspaceApiOperationCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        serviceName,
        workspaceId,
        apiId,
        operationId,
        parameters,
        options,
      ),
    getEntityTag: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      apiId: string,
      operationId: string,
      options?: WorkspaceApiOperationGetEntityTagOptionalParams,
    ) =>
      getEntityTag(
        context,
        resourceGroupName,
        serviceName,
        workspaceId,
        apiId,
        operationId,
        options,
      ),
    get: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      apiId: string,
      operationId: string,
      options?: WorkspaceApiOperationGetOptionalParams,
    ) => get(context, resourceGroupName, serviceName, workspaceId, apiId, operationId, options),
  };
}

export function _getWorkspaceApiOperationOperations(
  context: ApiManagementContext,
): WorkspaceApiOperationOperations {
  return {
    ..._getWorkspaceApiOperation(context),
  };
}

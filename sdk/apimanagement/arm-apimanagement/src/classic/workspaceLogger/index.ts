// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementContext } from "../../api/apiManagementContext.js";
import {
  listByWorkspace,
  $delete,
  update,
  createOrUpdate,
  getEntityTag,
  get,
} from "../../api/workspaceLogger/operations.js";
import {
  WorkspaceLoggerListByWorkspaceOptionalParams,
  WorkspaceLoggerDeleteOptionalParams,
  WorkspaceLoggerUpdateOptionalParams,
  WorkspaceLoggerCreateOrUpdateOptionalParams,
  WorkspaceLoggerGetEntityTagOptionalParams,
  WorkspaceLoggerGetOptionalParams,
} from "../../api/workspaceLogger/options.js";
import { LoggerContract, LoggerUpdateContract } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a WorkspaceLogger operations. */
export interface WorkspaceLoggerOperations {
  /** Lists a collection of loggers in the specified workspace. */
  listByWorkspace: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    options?: WorkspaceLoggerListByWorkspaceOptionalParams,
  ) => PagedAsyncIterableIterator<LoggerContract>;
  /** Deletes the specified logger. */
  delete: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    loggerId: string,
    ifMatch: string,
    options?: WorkspaceLoggerDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates an existing logger. */
  update: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    loggerId: string,
    ifMatch: string,
    parameters: LoggerUpdateContract,
    options?: WorkspaceLoggerUpdateOptionalParams,
  ) => Promise<LoggerContract>;
  /** Creates or Updates a logger. */
  createOrUpdate: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    loggerId: string,
    parameters: LoggerContract,
    options?: WorkspaceLoggerCreateOrUpdateOptionalParams,
  ) => Promise<LoggerContract>;
  /** Gets the entity state (Etag) version of the logger specified by its identifier. */
  getEntityTag: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    loggerId: string,
    options?: WorkspaceLoggerGetEntityTagOptionalParams,
  ) => Promise<void>;
  /** Gets the details of the logger specified by its identifier. */
  get: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    loggerId: string,
    options?: WorkspaceLoggerGetOptionalParams,
  ) => Promise<LoggerContract>;
}

function _getWorkspaceLogger(context: ApiManagementContext) {
  return {
    listByWorkspace: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      options?: WorkspaceLoggerListByWorkspaceOptionalParams,
    ) => listByWorkspace(context, resourceGroupName, serviceName, workspaceId, options),
    delete: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      loggerId: string,
      ifMatch: string,
      options?: WorkspaceLoggerDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, serviceName, workspaceId, loggerId, ifMatch, options),
    update: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      loggerId: string,
      ifMatch: string,
      parameters: LoggerUpdateContract,
      options?: WorkspaceLoggerUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        serviceName,
        workspaceId,
        loggerId,
        ifMatch,
        parameters,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      loggerId: string,
      parameters: LoggerContract,
      options?: WorkspaceLoggerCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        serviceName,
        workspaceId,
        loggerId,
        parameters,
        options,
      ),
    getEntityTag: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      loggerId: string,
      options?: WorkspaceLoggerGetEntityTagOptionalParams,
    ) => getEntityTag(context, resourceGroupName, serviceName, workspaceId, loggerId, options),
    get: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      loggerId: string,
      options?: WorkspaceLoggerGetOptionalParams,
    ) => get(context, resourceGroupName, serviceName, workspaceId, loggerId, options),
  };
}

export function _getWorkspaceLoggerOperations(
  context: ApiManagementContext,
): WorkspaceLoggerOperations {
  return {
    ..._getWorkspaceLogger(context),
  };
}

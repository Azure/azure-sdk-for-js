// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiCenterContext } from "../../api/apiCenterContext.js";
import { list, $delete, createOrUpdate, head, get } from "../../api/workspaces/operations.js";
import type {
  WorkspacesListOptionalParams,
  WorkspacesDeleteOptionalParams,
  WorkspacesCreateOrUpdateOptionalParams,
  WorkspacesHeadOptionalParams,
  WorkspacesGetOptionalParams,
} from "../../api/workspaces/options.js";
import type { Workspace } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Workspaces operations. */
export interface WorkspacesOperations {
  /** Returns a collection of workspaces. */
  list: (
    resourceGroupName: string,
    serviceName: string,
    options?: WorkspacesListOptionalParams,
  ) => PagedAsyncIterableIterator<Workspace>;
  /** Deletes specified workspace. */
  delete: (
    resourceGroupName: string,
    serviceName: string,
    workspaceName: string,
    options?: WorkspacesDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates new or updates existing workspace. */
  createOrUpdate: (
    resourceGroupName: string,
    serviceName: string,
    workspaceName: string,
    payload: Workspace,
    options?: WorkspacesCreateOrUpdateOptionalParams,
  ) => Promise<Workspace>;
  /** Checks if specified workspace exists. */
  head: (
    resourceGroupName: string,
    serviceName: string,
    workspaceName: string,
    options?: WorkspacesHeadOptionalParams,
  ) => Promise<void>;
  /** Returns details of the workspace. */
  get: (
    resourceGroupName: string,
    serviceName: string,
    workspaceName: string,
    options?: WorkspacesGetOptionalParams,
  ) => Promise<Workspace>;
}

function _getWorkspaces(context: ApiCenterContext) {
  return {
    list: (
      resourceGroupName: string,
      serviceName: string,
      options?: WorkspacesListOptionalParams,
    ) => list(context, resourceGroupName, serviceName, options),
    delete: (
      resourceGroupName: string,
      serviceName: string,
      workspaceName: string,
      options?: WorkspacesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, serviceName, workspaceName, options),
    createOrUpdate: (
      resourceGroupName: string,
      serviceName: string,
      workspaceName: string,
      payload: Workspace,
      options?: WorkspacesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, serviceName, workspaceName, payload, options),
    head: (
      resourceGroupName: string,
      serviceName: string,
      workspaceName: string,
      options?: WorkspacesHeadOptionalParams,
    ) => head(context, resourceGroupName, serviceName, workspaceName, options),
    get: (
      resourceGroupName: string,
      serviceName: string,
      workspaceName: string,
      options?: WorkspacesGetOptionalParams,
    ) => get(context, resourceGroupName, serviceName, workspaceName, options),
  };
}

export function _getWorkspacesOperations(context: ApiCenterContext): WorkspacesOperations {
  return {
    ..._getWorkspaces(context),
  };
}

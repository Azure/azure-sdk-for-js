// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IoTFirmwareDefenseContext } from "../../api/ioTFirmwareDefenseContext.js";
import {
  Workspace,
  WorkspaceUpdate,
  GenerateUploadUrlRequest,
  UrlToken,
} from "../../models/models.js";
import {
  WorkspacesGenerateUploadUrlOptionalParams,
  WorkspacesListBySubscriptionOptionalParams,
  WorkspacesListByResourceGroupOptionalParams,
  WorkspacesDeleteOptionalParams,
  WorkspacesUpdateOptionalParams,
  WorkspacesCreateOptionalParams,
  WorkspacesGetOptionalParams,
} from "../../api/workspaces/options.js";
import {
  generateUploadUrl,
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  create,
  get,
} from "../../api/workspaces/operations.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Workspaces operations. */
export interface WorkspacesOperations {
  /** Generate a URL for uploading a firmware image. */
  generateUploadUrl: (
    resourceGroupName: string,
    workspaceName: string,
    body: GenerateUploadUrlRequest,
    options?: WorkspacesGenerateUploadUrlOptionalParams,
  ) => Promise<UrlToken>;
  /** Lists all of the firmware analysis workspaces in the specified subscription. */
  listBySubscription: (
    options?: WorkspacesListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<Workspace>;
  /** Lists all of the firmware analysis workspaces in the specified resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: WorkspacesListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<Workspace>;
  /** The operation to delete a firmware analysis workspace. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    workspaceName: string,
    options?: WorkspacesDeleteOptionalParams,
  ) => Promise<void>;
  /** The operation to update a firmware analysis workspaces. */
  update: (
    resourceGroupName: string,
    workspaceName: string,
    properties: WorkspaceUpdate,
    options?: WorkspacesUpdateOptionalParams,
  ) => Promise<Workspace>;
  /** The operation to create or update a firmware analysis workspace. */
  create: (
    resourceGroupName: string,
    workspaceName: string,
    resource: Workspace,
    options?: WorkspacesCreateOptionalParams,
  ) => Promise<Workspace>;
  /** Get firmware analysis workspace. */
  get: (
    resourceGroupName: string,
    workspaceName: string,
    options?: WorkspacesGetOptionalParams,
  ) => Promise<Workspace>;
}

function _getWorkspaces(context: IoTFirmwareDefenseContext) {
  return {
    generateUploadUrl: (
      resourceGroupName: string,
      workspaceName: string,
      body: GenerateUploadUrlRequest,
      options?: WorkspacesGenerateUploadUrlOptionalParams,
    ) => generateUploadUrl(context, resourceGroupName, workspaceName, body, options),
    listBySubscription: (options?: WorkspacesListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: WorkspacesListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      workspaceName: string,
      options?: WorkspacesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, workspaceName, options),
    update: (
      resourceGroupName: string,
      workspaceName: string,
      properties: WorkspaceUpdate,
      options?: WorkspacesUpdateOptionalParams,
    ) => update(context, resourceGroupName, workspaceName, properties, options),
    create: (
      resourceGroupName: string,
      workspaceName: string,
      resource: Workspace,
      options?: WorkspacesCreateOptionalParams,
    ) => create(context, resourceGroupName, workspaceName, resource, options),
    get: (
      resourceGroupName: string,
      workspaceName: string,
      options?: WorkspacesGetOptionalParams,
    ) => get(context, resourceGroupName, workspaceName, options),
  };
}

export function _getWorkspacesOperations(context: IoTFirmwareDefenseContext): WorkspacesOperations {
  return {
    ..._getWorkspaces(context),
  };
}

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DiscoveryContext } from "../../api/discoveryContext.js";
import {
  listByWorkspace,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/chatModelDeployments/operations.js";
import type {
  ChatModelDeploymentsListByWorkspaceOptionalParams,
  ChatModelDeploymentsDeleteOptionalParams,
  ChatModelDeploymentsUpdateOptionalParams,
  ChatModelDeploymentsCreateOrUpdateOptionalParams,
  ChatModelDeploymentsGetOptionalParams,
} from "../../api/chatModelDeployments/options.js";
import type { ChatModelDeployment, ChatModelDeploymentUpdate } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ChatModelDeployments operations. */
export interface ChatModelDeploymentsOperations {
  /** List ChatModelDeployment resources by Workspace */
  listByWorkspace: (
    resourceGroupName: string,
    workspaceName: string,
    options?: ChatModelDeploymentsListByWorkspaceOptionalParams,
  ) => PagedAsyncIterableIterator<ChatModelDeployment>;
  /** Delete a ChatModelDeployment */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    workspaceName: string,
    chatModelDeploymentName: string,
    options?: ChatModelDeploymentsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update a ChatModelDeployment */
  update: (
    resourceGroupName: string,
    workspaceName: string,
    chatModelDeploymentName: string,
    properties: ChatModelDeploymentUpdate,
    options?: ChatModelDeploymentsUpdateOptionalParams,
  ) => PollerLike<OperationState<ChatModelDeployment>, ChatModelDeployment>;
  /** Create a ChatModelDeployment */
  createOrUpdate: (
    resourceGroupName: string,
    workspaceName: string,
    chatModelDeploymentName: string,
    resource: ChatModelDeployment,
    options?: ChatModelDeploymentsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<ChatModelDeployment>, ChatModelDeployment>;
  /** Get a ChatModelDeployment */
  get: (
    resourceGroupName: string,
    workspaceName: string,
    chatModelDeploymentName: string,
    options?: ChatModelDeploymentsGetOptionalParams,
  ) => Promise<ChatModelDeployment>;
}

function _getChatModelDeployments(context: DiscoveryContext) {
  return {
    listByWorkspace: (
      resourceGroupName: string,
      workspaceName: string,
      options?: ChatModelDeploymentsListByWorkspaceOptionalParams,
    ) => listByWorkspace(context, resourceGroupName, workspaceName, options),
    delete: (
      resourceGroupName: string,
      workspaceName: string,
      chatModelDeploymentName: string,
      options?: ChatModelDeploymentsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, workspaceName, chatModelDeploymentName, options),
    update: (
      resourceGroupName: string,
      workspaceName: string,
      chatModelDeploymentName: string,
      properties: ChatModelDeploymentUpdate,
      options?: ChatModelDeploymentsUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        workspaceName,
        chatModelDeploymentName,
        properties,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      workspaceName: string,
      chatModelDeploymentName: string,
      resource: ChatModelDeployment,
      options?: ChatModelDeploymentsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        workspaceName,
        chatModelDeploymentName,
        resource,
        options,
      ),
    get: (
      resourceGroupName: string,
      workspaceName: string,
      chatModelDeploymentName: string,
      options?: ChatModelDeploymentsGetOptionalParams,
    ) => get(context, resourceGroupName, workspaceName, chatModelDeploymentName, options),
  };
}

export function _getChatModelDeploymentsOperations(
  context: DiscoveryContext,
): ChatModelDeploymentsOperations {
  return {
    ..._getChatModelDeployments(context),
  };
}

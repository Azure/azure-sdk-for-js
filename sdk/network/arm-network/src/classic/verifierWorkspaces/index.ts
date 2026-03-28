// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext } from "../../api/networkManagementContext.js";
import { list, $delete, update, create, get } from "../../api/verifierWorkspaces/operations.js";
import type {
  VerifierWorkspacesListOptionalParams,
  VerifierWorkspacesDeleteOptionalParams,
  VerifierWorkspacesUpdateOptionalParams,
  VerifierWorkspacesCreateOptionalParams,
  VerifierWorkspacesGetOptionalParams,
} from "../../api/verifierWorkspaces/options.js";
import type { VerifierWorkspace } from "../../models/microsoft/network/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a VerifierWorkspaces operations. */
export interface VerifierWorkspacesOperations {
  /** Gets list of Verifier Workspaces. */
  list: (
    resourceGroupName: string,
    networkManagerName: string,
    options?: VerifierWorkspacesListOptionalParams,
  ) => PagedAsyncIterableIterator<VerifierWorkspace>;
  /** Deletes Verifier Workspace. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    networkManagerName: string,
    workspaceName: string,
    options?: VerifierWorkspacesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    networkManagerName: string,
    workspaceName: string,
    options?: VerifierWorkspacesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    networkManagerName: string,
    workspaceName: string,
    options?: VerifierWorkspacesDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates Verifier Workspace. */
  update: (
    resourceGroupName: string,
    networkManagerName: string,
    workspaceName: string,
    options?: VerifierWorkspacesUpdateOptionalParams,
  ) => Promise<VerifierWorkspace>;
  /** Creates Verifier Workspace. */
  create: (
    resourceGroupName: string,
    networkManagerName: string,
    workspaceName: string,
    body: VerifierWorkspace,
    options?: VerifierWorkspacesCreateOptionalParams,
  ) => Promise<VerifierWorkspace>;
  /** Gets Verifier Workspace. */
  get: (
    resourceGroupName: string,
    networkManagerName: string,
    workspaceName: string,
    options?: VerifierWorkspacesGetOptionalParams,
  ) => Promise<VerifierWorkspace>;
}

function _getVerifierWorkspaces(context: NetworkManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      networkManagerName: string,
      options?: VerifierWorkspacesListOptionalParams,
    ) => list(context, resourceGroupName, networkManagerName, options),
    delete: (
      resourceGroupName: string,
      networkManagerName: string,
      workspaceName: string,
      options?: VerifierWorkspacesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, networkManagerName, workspaceName, options),
    beginDelete: async (
      resourceGroupName: string,
      networkManagerName: string,
      workspaceName: string,
      options?: VerifierWorkspacesDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        networkManagerName,
        workspaceName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      networkManagerName: string,
      workspaceName: string,
      options?: VerifierWorkspacesDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, networkManagerName, workspaceName, options);
    },
    update: (
      resourceGroupName: string,
      networkManagerName: string,
      workspaceName: string,
      options?: VerifierWorkspacesUpdateOptionalParams,
    ) => update(context, resourceGroupName, networkManagerName, workspaceName, options),
    create: (
      resourceGroupName: string,
      networkManagerName: string,
      workspaceName: string,
      body: VerifierWorkspace,
      options?: VerifierWorkspacesCreateOptionalParams,
    ) => create(context, resourceGroupName, networkManagerName, workspaceName, body, options),
    get: (
      resourceGroupName: string,
      networkManagerName: string,
      workspaceName: string,
      options?: VerifierWorkspacesGetOptionalParams,
    ) => get(context, resourceGroupName, networkManagerName, workspaceName, options),
  };
}

export function _getVerifierWorkspacesOperations(
  context: NetworkManagementContext,
): VerifierWorkspacesOperations {
  return {
    ..._getVerifierWorkspaces(context),
  };
}

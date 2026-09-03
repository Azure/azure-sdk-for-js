// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext } from "../../api/apiManagementContext.js";
import {
  listReferences,
  listByService,
  $delete,
  createOrUpdate,
  getEntityTag,
  get,
} from "../../api/workspacePolicyFragment/operations.js";
import type {
  WorkspacePolicyFragmentListReferencesOptionalParams,
  WorkspacePolicyFragmentListByServiceOptionalParams,
  WorkspacePolicyFragmentDeleteOptionalParams,
  WorkspacePolicyFragmentCreateOrUpdateOptionalParams,
  WorkspacePolicyFragmentGetEntityTagOptionalParams,
  WorkspacePolicyFragmentGetOptionalParams,
} from "../../api/workspacePolicyFragment/options.js";
import type { PolicyFragmentContract, ResourceCollection } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a WorkspacePolicyFragment operations. */
export interface WorkspacePolicyFragmentOperations {
  /** Lists policy resources that reference the policy fragment. */
  listReferences: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    id: string,
    options?: WorkspacePolicyFragmentListReferencesOptionalParams,
  ) => Promise<ResourceCollection>;
  /** Gets all policy fragments defined within a workspace. */
  listByService: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    options?: WorkspacePolicyFragmentListByServiceOptionalParams,
  ) => PagedAsyncIterableIterator<PolicyFragmentContract>;
  /** Deletes a policy fragment. */
  delete: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    id: string,
    ifMatch: string,
    options?: WorkspacePolicyFragmentDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates a policy fragment. */
  createOrUpdate: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    id: string,
    parameters: PolicyFragmentContract,
    options?: WorkspacePolicyFragmentCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<PolicyFragmentContract>, PolicyFragmentContract>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    id: string,
    parameters: PolicyFragmentContract,
    options?: WorkspacePolicyFragmentCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<PolicyFragmentContract>, PolicyFragmentContract>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    id: string,
    parameters: PolicyFragmentContract,
    options?: WorkspacePolicyFragmentCreateOrUpdateOptionalParams,
  ) => Promise<PolicyFragmentContract>;
  /** Gets the entity state (Etag) version of a policy fragment. */
  getEntityTag: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    id: string,
    options?: WorkspacePolicyFragmentGetEntityTagOptionalParams,
  ) => Promise<void>;
  /** Gets a policy fragment. */
  get: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    id: string,
    options?: WorkspacePolicyFragmentGetOptionalParams,
  ) => Promise<PolicyFragmentContract>;
}

function _getWorkspacePolicyFragment(context: ApiManagementContext) {
  return {
    listReferences: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      id: string,
      options?: WorkspacePolicyFragmentListReferencesOptionalParams,
    ) => listReferences(context, resourceGroupName, serviceName, workspaceId, id, options),
    listByService: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      options?: WorkspacePolicyFragmentListByServiceOptionalParams,
    ) => listByService(context, resourceGroupName, serviceName, workspaceId, options),
    delete: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      id: string,
      ifMatch: string,
      options?: WorkspacePolicyFragmentDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, serviceName, workspaceId, id, ifMatch, options),
    createOrUpdate: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      id: string,
      parameters: PolicyFragmentContract,
      options?: WorkspacePolicyFragmentCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(context, resourceGroupName, serviceName, workspaceId, id, parameters, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      id: string,
      parameters: PolicyFragmentContract,
      options?: WorkspacePolicyFragmentCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        serviceName,
        workspaceId,
        id,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      id: string,
      parameters: PolicyFragmentContract,
      options?: WorkspacePolicyFragmentCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        serviceName,
        workspaceId,
        id,
        parameters,
        options,
      );
    },
    getEntityTag: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      id: string,
      options?: WorkspacePolicyFragmentGetEntityTagOptionalParams,
    ) => getEntityTag(context, resourceGroupName, serviceName, workspaceId, id, options),
    get: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      id: string,
      options?: WorkspacePolicyFragmentGetOptionalParams,
    ) => get(context, resourceGroupName, serviceName, workspaceId, id, options),
  };
}

export function _getWorkspacePolicyFragmentOperations(
  context: ApiManagementContext,
): WorkspacePolicyFragmentOperations {
  return {
    ..._getWorkspacePolicyFragment(context),
  };
}

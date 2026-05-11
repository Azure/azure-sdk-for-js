// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementContext } from "../../api/apiManagementContext.js";
import {
  listByApi,
  $delete,
  createOrUpdate,
  getEntityTag,
  get,
} from "../../api/workspacePolicy/operations.js";
import {
  WorkspacePolicyListByApiOptionalParams,
  WorkspacePolicyDeleteOptionalParams,
  WorkspacePolicyCreateOrUpdateOptionalParams,
  WorkspacePolicyGetEntityTagOptionalParams,
  WorkspacePolicyGetOptionalParams,
} from "../../api/workspacePolicy/options.js";
import { PolicyContract, PolicyIdName } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a WorkspacePolicy operations. */
export interface WorkspacePolicyOperations {
  /** Get the policy configuration at the workspace level. */
  listByApi: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    options?: WorkspacePolicyListByApiOptionalParams,
  ) => PagedAsyncIterableIterator<PolicyContract>;
  /** Deletes the policy configuration at the workspace. */
  delete: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    policyId: PolicyIdName,
    ifMatch: string,
    options?: WorkspacePolicyDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates policy configuration for the workspace. */
  createOrUpdate: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    policyId: PolicyIdName,
    parameters: PolicyContract,
    options?: WorkspacePolicyCreateOrUpdateOptionalParams,
  ) => Promise<PolicyContract>;
  /** Gets the entity state (Etag) version of the workspace policy specified by its identifier. */
  getEntityTag: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    policyId: PolicyIdName,
    options?: WorkspacePolicyGetEntityTagOptionalParams,
  ) => Promise<void>;
  /** Get the policy configuration at the API level. */
  get: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    policyId: PolicyIdName,
    options?: WorkspacePolicyGetOptionalParams,
  ) => Promise<PolicyContract>;
}

function _getWorkspacePolicy(context: ApiManagementContext) {
  return {
    listByApi: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      options?: WorkspacePolicyListByApiOptionalParams,
    ) => listByApi(context, resourceGroupName, serviceName, workspaceId, options),
    delete: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      policyId: PolicyIdName,
      ifMatch: string,
      options?: WorkspacePolicyDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, serviceName, workspaceId, policyId, ifMatch, options),
    createOrUpdate: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      policyId: PolicyIdName,
      parameters: PolicyContract,
      options?: WorkspacePolicyCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        serviceName,
        workspaceId,
        policyId,
        parameters,
        options,
      ),
    getEntityTag: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      policyId: PolicyIdName,
      options?: WorkspacePolicyGetEntityTagOptionalParams,
    ) => getEntityTag(context, resourceGroupName, serviceName, workspaceId, policyId, options),
    get: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      policyId: PolicyIdName,
      options?: WorkspacePolicyGetOptionalParams,
    ) => get(context, resourceGroupName, serviceName, workspaceId, policyId, options),
  };
}

export function _getWorkspacePolicyOperations(
  context: ApiManagementContext,
): WorkspacePolicyOperations {
  return {
    ..._getWorkspacePolicy(context),
  };
}

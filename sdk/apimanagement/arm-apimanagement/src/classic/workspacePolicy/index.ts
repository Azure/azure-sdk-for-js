// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext } from "../../api/apiManagementContext.js";
import {
  listByApi,
  $delete,
  createOrUpdate,
  getEntityTag,
  get,
} from "../../api/workspacePolicy/operations.js";
import type {
  WorkspacePolicyListByApiOptionalParams,
  WorkspacePolicyDeleteOptionalParams,
  WorkspacePolicyCreateOrUpdateOptionalParams,
  WorkspacePolicyGetEntityTagOptionalParams,
  WorkspacePolicyGetOptionalParams,
} from "../../api/workspacePolicy/options.js";
import type { PolicyContract, PolicyIdName } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

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
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
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

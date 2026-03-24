// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext } from "../../api/apiManagementContext.js";
import {
  listByApi,
  $delete,
  createOrUpdate,
  getEntityTag,
  get,
} from "../../api/workspaceApiPolicy/operations.js";
import type {
  WorkspaceApiPolicyListByApiOptionalParams,
  WorkspaceApiPolicyDeleteOptionalParams,
  WorkspaceApiPolicyCreateOrUpdateOptionalParams,
  WorkspaceApiPolicyGetEntityTagOptionalParams,
  WorkspaceApiPolicyGetOptionalParams,
} from "../../api/workspaceApiPolicy/options.js";
import type { PolicyContract, PolicyIdName } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a WorkspaceApiPolicy operations. */
export interface WorkspaceApiPolicyOperations {
  /** Get the policy configuration at the API level. */
  listByApi: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    apiId: string,
    options?: WorkspaceApiPolicyListByApiOptionalParams,
  ) => PagedAsyncIterableIterator<PolicyContract>;
  /** Deletes the policy configuration at the Api. */
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
    policyId: PolicyIdName,
    ifMatch: string,
    options?: WorkspaceApiPolicyDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates policy configuration for the API. */
  createOrUpdate: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    apiId: string,
    policyId: PolicyIdName,
    parameters: PolicyContract,
    options?: WorkspaceApiPolicyCreateOrUpdateOptionalParams,
  ) => Promise<PolicyContract>;
  /** Gets the entity state (Etag) version of the API policy specified by its identifier. */
  getEntityTag: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    apiId: string,
    policyId: PolicyIdName,
    options?: WorkspaceApiPolicyGetEntityTagOptionalParams,
  ) => Promise<void>;
  /** Get the policy configuration at the API level. */
  get: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    apiId: string,
    policyId: PolicyIdName,
    options?: WorkspaceApiPolicyGetOptionalParams,
  ) => Promise<PolicyContract>;
}

function _getWorkspaceApiPolicy(context: ApiManagementContext) {
  return {
    listByApi: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      apiId: string,
      options?: WorkspaceApiPolicyListByApiOptionalParams,
    ) => listByApi(context, resourceGroupName, serviceName, workspaceId, apiId, options),
    delete: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      apiId: string,
      policyId: PolicyIdName,
      ifMatch: string,
      options?: WorkspaceApiPolicyDeleteOptionalParams,
    ) =>
      $delete(
        context,
        resourceGroupName,
        serviceName,
        workspaceId,
        apiId,
        policyId,
        ifMatch,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      apiId: string,
      policyId: PolicyIdName,
      parameters: PolicyContract,
      options?: WorkspaceApiPolicyCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        serviceName,
        workspaceId,
        apiId,
        policyId,
        parameters,
        options,
      ),
    getEntityTag: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      apiId: string,
      policyId: PolicyIdName,
      options?: WorkspaceApiPolicyGetEntityTagOptionalParams,
    ) =>
      getEntityTag(context, resourceGroupName, serviceName, workspaceId, apiId, policyId, options),
    get: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      apiId: string,
      policyId: PolicyIdName,
      options?: WorkspaceApiPolicyGetOptionalParams,
    ) => get(context, resourceGroupName, serviceName, workspaceId, apiId, policyId, options),
  };
}

export function _getWorkspaceApiPolicyOperations(
  context: ApiManagementContext,
): WorkspaceApiPolicyOperations {
  return {
    ..._getWorkspaceApiPolicy(context),
  };
}

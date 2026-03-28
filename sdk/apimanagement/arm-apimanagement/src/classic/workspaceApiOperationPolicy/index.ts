// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext } from "../../api/apiManagementContext.js";
import {
  listByOperation,
  $delete,
  createOrUpdate,
  getEntityTag,
  get,
} from "../../api/workspaceApiOperationPolicy/operations.js";
import type {
  WorkspaceApiOperationPolicyListByOperationOptionalParams,
  WorkspaceApiOperationPolicyDeleteOptionalParams,
  WorkspaceApiOperationPolicyCreateOrUpdateOptionalParams,
  WorkspaceApiOperationPolicyGetEntityTagOptionalParams,
  WorkspaceApiOperationPolicyGetOptionalParams,
} from "../../api/workspaceApiOperationPolicy/options.js";
import type { PolicyContract, PolicyIdName } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a WorkspaceApiOperationPolicy operations. */
export interface WorkspaceApiOperationPolicyOperations {
  /** Get the list of policy configuration at the API Operation level. */
  listByOperation: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    apiId: string,
    operationId: string,
    options?: WorkspaceApiOperationPolicyListByOperationOptionalParams,
  ) => PagedAsyncIterableIterator<PolicyContract>;
  /** Deletes the policy configuration at the Api Operation. */
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
    policyId: PolicyIdName,
    ifMatch: string,
    options?: WorkspaceApiOperationPolicyDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates policy configuration for the API Operation level. */
  createOrUpdate: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    apiId: string,
    operationId: string,
    policyId: PolicyIdName,
    parameters: PolicyContract,
    options?: WorkspaceApiOperationPolicyCreateOrUpdateOptionalParams,
  ) => Promise<PolicyContract>;
  /** Gets the entity state (Etag) version of the API operation policy specified by its identifier. */
  getEntityTag: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    apiId: string,
    operationId: string,
    policyId: PolicyIdName,
    options?: WorkspaceApiOperationPolicyGetEntityTagOptionalParams,
  ) => Promise<void>;
  /** Get the policy configuration at the API Operation level. */
  get: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    apiId: string,
    operationId: string,
    policyId: PolicyIdName,
    options?: WorkspaceApiOperationPolicyGetOptionalParams,
  ) => Promise<PolicyContract>;
}

function _getWorkspaceApiOperationPolicy(context: ApiManagementContext) {
  return {
    listByOperation: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      apiId: string,
      operationId: string,
      options?: WorkspaceApiOperationPolicyListByOperationOptionalParams,
    ) =>
      listByOperation(
        context,
        resourceGroupName,
        serviceName,
        workspaceId,
        apiId,
        operationId,
        options,
      ),
    delete: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      apiId: string,
      operationId: string,
      policyId: PolicyIdName,
      ifMatch: string,
      options?: WorkspaceApiOperationPolicyDeleteOptionalParams,
    ) =>
      $delete(
        context,
        resourceGroupName,
        serviceName,
        workspaceId,
        apiId,
        operationId,
        policyId,
        ifMatch,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      apiId: string,
      operationId: string,
      policyId: PolicyIdName,
      parameters: PolicyContract,
      options?: WorkspaceApiOperationPolicyCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        serviceName,
        workspaceId,
        apiId,
        operationId,
        policyId,
        parameters,
        options,
      ),
    getEntityTag: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      apiId: string,
      operationId: string,
      policyId: PolicyIdName,
      options?: WorkspaceApiOperationPolicyGetEntityTagOptionalParams,
    ) =>
      getEntityTag(
        context,
        resourceGroupName,
        serviceName,
        workspaceId,
        apiId,
        operationId,
        policyId,
        options,
      ),
    get: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      apiId: string,
      operationId: string,
      policyId: PolicyIdName,
      options?: WorkspaceApiOperationPolicyGetOptionalParams,
    ) =>
      get(
        context,
        resourceGroupName,
        serviceName,
        workspaceId,
        apiId,
        operationId,
        policyId,
        options,
      ),
  };
}

export function _getWorkspaceApiOperationPolicyOperations(
  context: ApiManagementContext,
): WorkspaceApiOperationPolicyOperations {
  return {
    ..._getWorkspaceApiOperationPolicy(context),
  };
}

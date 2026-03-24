// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext } from "../../api/apiManagementContext.js";
import {
  listByProduct,
  $delete,
  createOrUpdate,
  getEntityTag,
  get,
} from "../../api/workspaceProductPolicy/operations.js";
import type {
  WorkspaceProductPolicyListByProductOptionalParams,
  WorkspaceProductPolicyDeleteOptionalParams,
  WorkspaceProductPolicyCreateOrUpdateOptionalParams,
  WorkspaceProductPolicyGetEntityTagOptionalParams,
  WorkspaceProductPolicyGetOptionalParams,
} from "../../api/workspaceProductPolicy/options.js";
import type { PolicyContract, PolicyIdName, _PolicyCollection } from "../../models/models.js";

/** Interface representing a WorkspaceProductPolicy operations. */
export interface WorkspaceProductPolicyOperations {
  /** Get the policy configuration at the Product level. */
  listByProduct: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    productId: string,
    options?: WorkspaceProductPolicyListByProductOptionalParams,
  ) => Promise<_PolicyCollection>;
  /** Deletes the policy configuration at the Product. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    productId: string,
    policyId: PolicyIdName,
    ifMatch: string,
    options?: WorkspaceProductPolicyDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates policy configuration for the Product. */
  createOrUpdate: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    productId: string,
    policyId: PolicyIdName,
    parameters: PolicyContract,
    options?: WorkspaceProductPolicyCreateOrUpdateOptionalParams,
  ) => Promise<PolicyContract>;
  /** Get the ETag of the policy configuration at the Product level. */
  getEntityTag: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    productId: string,
    policyId: PolicyIdName,
    options?: WorkspaceProductPolicyGetEntityTagOptionalParams,
  ) => Promise<void>;
  /** Get the policy configuration at the Product level. */
  get: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    productId: string,
    policyId: PolicyIdName,
    options?: WorkspaceProductPolicyGetOptionalParams,
  ) => Promise<PolicyContract>;
}

function _getWorkspaceProductPolicy(context: ApiManagementContext) {
  return {
    listByProduct: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      productId: string,
      options?: WorkspaceProductPolicyListByProductOptionalParams,
    ) => listByProduct(context, resourceGroupName, serviceName, workspaceId, productId, options),
    delete: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      productId: string,
      policyId: PolicyIdName,
      ifMatch: string,
      options?: WorkspaceProductPolicyDeleteOptionalParams,
    ) =>
      $delete(
        context,
        resourceGroupName,
        serviceName,
        workspaceId,
        productId,
        policyId,
        ifMatch,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      productId: string,
      policyId: PolicyIdName,
      parameters: PolicyContract,
      options?: WorkspaceProductPolicyCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        serviceName,
        workspaceId,
        productId,
        policyId,
        parameters,
        options,
      ),
    getEntityTag: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      productId: string,
      policyId: PolicyIdName,
      options?: WorkspaceProductPolicyGetEntityTagOptionalParams,
    ) =>
      getEntityTag(
        context,
        resourceGroupName,
        serviceName,
        workspaceId,
        productId,
        policyId,
        options,
      ),
    get: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      productId: string,
      policyId: PolicyIdName,
      options?: WorkspaceProductPolicyGetOptionalParams,
    ) => get(context, resourceGroupName, serviceName, workspaceId, productId, policyId, options),
  };
}

export function _getWorkspaceProductPolicyOperations(
  context: ApiManagementContext,
): WorkspaceProductPolicyOperations {
  return {
    ..._getWorkspaceProductPolicy(context),
  };
}

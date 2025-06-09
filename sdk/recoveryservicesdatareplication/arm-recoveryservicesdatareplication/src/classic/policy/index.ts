// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureSiteRecoveryManagementServiceAPIContext } from "../../api/azureSiteRecoveryManagementServiceAPIContext.js";
import { PolicyModel } from "../../models/models.js";
import {
  PolicyListOptionalParams,
  PolicyDeleteOptionalParams,
  PolicyCreateOptionalParams,
  PolicyGetOptionalParams,
} from "../../api/policy/options.js";
import { list, $delete, create, get } from "../../api/policy/operations.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Policy operations. */
export interface PolicyOperations {
  /** Gets the list of policies in the given vault. */
  list: (
    resourceGroupName: string,
    vaultName: string,
    options?: PolicyListOptionalParams,
  ) => PagedAsyncIterableIterator<PolicyModel>;
  /** Removes the policy. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    vaultName: string,
    policyName: string,
    options?: PolicyDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Creates the policy. */
  create: (
    resourceGroupName: string,
    vaultName: string,
    policyName: string,
    resource: PolicyModel,
    options?: PolicyCreateOptionalParams,
  ) => PollerLike<OperationState<PolicyModel>, PolicyModel>;
  /** Gets the details of the policy. */
  get: (
    resourceGroupName: string,
    vaultName: string,
    policyName: string,
    options?: PolicyGetOptionalParams,
  ) => Promise<PolicyModel>;
}

function _getPolicy(context: AzureSiteRecoveryManagementServiceAPIContext) {
  return {
    list: (resourceGroupName: string, vaultName: string, options?: PolicyListOptionalParams) =>
      list(context, resourceGroupName, vaultName, options),
    delete: (
      resourceGroupName: string,
      vaultName: string,
      policyName: string,
      options?: PolicyDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, vaultName, policyName, options),
    create: (
      resourceGroupName: string,
      vaultName: string,
      policyName: string,
      resource: PolicyModel,
      options?: PolicyCreateOptionalParams,
    ) => create(context, resourceGroupName, vaultName, policyName, resource, options),
    get: (
      resourceGroupName: string,
      vaultName: string,
      policyName: string,
      options?: PolicyGetOptionalParams,
    ) => get(context, resourceGroupName, vaultName, policyName, options),
  };
}

export function _getPolicyOperations(
  context: AzureSiteRecoveryManagementServiceAPIContext,
): PolicyOperations {
  return {
    ..._getPolicy(context),
  };
}

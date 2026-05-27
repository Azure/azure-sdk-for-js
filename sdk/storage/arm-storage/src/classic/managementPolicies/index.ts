// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { StorageManagementContext } from "../../api/storageManagementContext.js";
import { $delete, createOrUpdate, get } from "../../api/managementPolicies/operations.js";
import type {
  ManagementPoliciesDeleteOptionalParams,
  ManagementPoliciesCreateOrUpdateOptionalParams,
  ManagementPoliciesGetOptionalParams,
} from "../../api/managementPolicies/options.js";
import type { ManagementPolicy, ManagementPolicyName } from "../../models/models.js";

/** Interface representing a ManagementPolicies operations. */
export interface ManagementPoliciesOperations {
  /** Deletes the managementpolicy associated with the specified storage account. */
  delete: (
    resourceGroupName: string,
    accountName: string,
    managementPolicyName: ManagementPolicyName,
    options?: ManagementPoliciesDeleteOptionalParams,
  ) => Promise<void>;
  /** Sets the managementpolicy to the specified storage account. */
  createOrUpdate: (
    resourceGroupName: string,
    accountName: string,
    managementPolicyName: ManagementPolicyName,
    properties: ManagementPolicy,
    options?: ManagementPoliciesCreateOrUpdateOptionalParams,
  ) => Promise<ManagementPolicy>;
  /** Gets the managementpolicy associated with the specified storage account. */
  get: (
    resourceGroupName: string,
    accountName: string,
    managementPolicyName: ManagementPolicyName,
    options?: ManagementPoliciesGetOptionalParams,
  ) => Promise<ManagementPolicy>;
}

function _getManagementPolicies(context: StorageManagementContext) {
  return {
    delete: (
      resourceGroupName: string,
      accountName: string,
      managementPolicyName: ManagementPolicyName,
      options?: ManagementPoliciesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, accountName, managementPolicyName, options),
    createOrUpdate: (
      resourceGroupName: string,
      accountName: string,
      managementPolicyName: ManagementPolicyName,
      properties: ManagementPolicy,
      options?: ManagementPoliciesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        accountName,
        managementPolicyName,
        properties,
        options,
      ),
    get: (
      resourceGroupName: string,
      accountName: string,
      managementPolicyName: ManagementPolicyName,
      options?: ManagementPoliciesGetOptionalParams,
    ) => get(context, resourceGroupName, accountName, managementPolicyName, options),
  };
}

export function _getManagementPoliciesOperations(
  context: StorageManagementContext,
): ManagementPoliciesOperations {
  return {
    ..._getManagementPolicies(context),
  };
}

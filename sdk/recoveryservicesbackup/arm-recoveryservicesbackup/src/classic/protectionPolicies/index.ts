// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RecoveryServicesBackupContext } from "../../api/recoveryServicesBackupContext.js";
import { $delete, createOrUpdate, get } from "../../api/protectionPolicies/operations.js";
import type {
  ProtectionPoliciesDeleteOptionalParams,
  ProtectionPoliciesCreateOrUpdateOptionalParams,
  ProtectionPoliciesGetOptionalParams,
} from "../../api/protectionPolicies/options.js";
import type { ProtectionPolicyResource } from "../../models/models.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ProtectionPolicies operations. */
export interface ProtectionPoliciesOperations {
  /**
   * Deletes specified backup policy from your Recovery Services Vault. This is an asynchronous operation. Status of the
   * operation can be fetched using GetProtectionPolicyOperationResult API.
   */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    vaultName: string,
    resourceGroupName: string,
    policyName: string,
    options?: ProtectionPoliciesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /**
   * Creates or modifies a backup policy. This is an asynchronous operation. Status of the operation can be fetched
   * using GetPolicyOperationResult API.
   */
  createOrUpdate: (
    vaultName: string,
    resourceGroupName: string,
    policyName: string,
    parameters: ProtectionPolicyResource,
    options?: ProtectionPoliciesCreateOrUpdateOptionalParams,
  ) => Promise<ProtectionPolicyResource>;
  /**
   * Provides the details of the backup policies associated to Recovery Services Vault. This is an asynchronous
   * operation. Status of the operation can be fetched using GetPolicyOperationResult API.
   */
  get: (
    vaultName: string,
    resourceGroupName: string,
    policyName: string,
    options?: ProtectionPoliciesGetOptionalParams,
  ) => Promise<ProtectionPolicyResource>;
}

function _getProtectionPolicies(context: RecoveryServicesBackupContext) {
  return {
    delete: (
      vaultName: string,
      resourceGroupName: string,
      policyName: string,
      options?: ProtectionPoliciesDeleteOptionalParams,
    ) => $delete(context, vaultName, resourceGroupName, policyName, options),
    createOrUpdate: (
      vaultName: string,
      resourceGroupName: string,
      policyName: string,
      parameters: ProtectionPolicyResource,
      options?: ProtectionPoliciesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, vaultName, resourceGroupName, policyName, parameters, options),
    get: (
      vaultName: string,
      resourceGroupName: string,
      policyName: string,
      options?: ProtectionPoliciesGetOptionalParams,
    ) => get(context, vaultName, resourceGroupName, policyName, options),
  };
}

export function _getProtectionPoliciesOperations(
  context: RecoveryServicesBackupContext,
): ProtectionPoliciesOperations {
  return {
    ..._getProtectionPolicies(context),
  };
}

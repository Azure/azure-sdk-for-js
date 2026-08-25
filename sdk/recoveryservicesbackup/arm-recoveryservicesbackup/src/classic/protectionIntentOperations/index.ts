// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RecoveryServicesBackupContext } from "../../api/recoveryServicesBackupContext.js";
import {
  validate,
  $delete,
  createOrUpdate,
  get,
} from "../../api/protectionIntentOperations/operations.js";
import type {
  ProtectionIntentOperationsValidateOptionalParams,
  ProtectionIntentOperationsDeleteOptionalParams,
  ProtectionIntentOperationsCreateOrUpdateOptionalParams,
  ProtectionIntentOperationsGetOptionalParams,
} from "../../api/protectionIntentOperations/options.js";
import type {
  ProtectionIntentResource,
  PreValidateEnableBackupRequest,
  PreValidateEnableBackupResponse,
} from "../../models/models.js";

/** Interface representing a ProtectionIntentOperations operations. */
export interface ProtectionIntentOperationsOperations {
  /**
   * It will validate followings
   * 1. Vault capacity
   * 2. VM is already protected
   * 3. Any VM related configuration passed in properties.
   */
  validate: (
    azureRegion: string,
    parameters: PreValidateEnableBackupRequest,
    options?: ProtectionIntentOperationsValidateOptionalParams,
  ) => Promise<PreValidateEnableBackupResponse>;
  /** Used to remove intent from an item */
  delete: (
    vaultName: string,
    resourceGroupName: string,
    fabricName: string,
    intentObjectName: string,
    options?: ProtectionIntentOperationsDeleteOptionalParams,
  ) => Promise<void>;
  /** Create Intent for Enabling backup of an item. This is a synchronous operation. */
  createOrUpdate: (
    vaultName: string,
    resourceGroupName: string,
    fabricName: string,
    intentObjectName: string,
    parameters: ProtectionIntentResource,
    options?: ProtectionIntentOperationsCreateOrUpdateOptionalParams,
  ) => Promise<ProtectionIntentResource>;
  /**
   * Provides the details of the protection intent up item. This is an asynchronous operation. To know the status of the operation,
   * call the GetItemOperationResult API.
   */
  get: (
    vaultName: string,
    resourceGroupName: string,
    fabricName: string,
    intentObjectName: string,
    options?: ProtectionIntentOperationsGetOptionalParams,
  ) => Promise<ProtectionIntentResource>;
}

function _getProtectionIntentOperations(context: RecoveryServicesBackupContext) {
  return {
    validate: (
      azureRegion: string,
      parameters: PreValidateEnableBackupRequest,
      options?: ProtectionIntentOperationsValidateOptionalParams,
    ) => validate(context, azureRegion, parameters, options),
    delete: (
      vaultName: string,
      resourceGroupName: string,
      fabricName: string,
      intentObjectName: string,
      options?: ProtectionIntentOperationsDeleteOptionalParams,
    ) => $delete(context, vaultName, resourceGroupName, fabricName, intentObjectName, options),
    createOrUpdate: (
      vaultName: string,
      resourceGroupName: string,
      fabricName: string,
      intentObjectName: string,
      parameters: ProtectionIntentResource,
      options?: ProtectionIntentOperationsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        vaultName,
        resourceGroupName,
        fabricName,
        intentObjectName,
        parameters,
        options,
      ),
    get: (
      vaultName: string,
      resourceGroupName: string,
      fabricName: string,
      intentObjectName: string,
      options?: ProtectionIntentOperationsGetOptionalParams,
    ) => get(context, vaultName, resourceGroupName, fabricName, intentObjectName, options),
  };
}

export function _getProtectionIntentOperationsOperations(
  context: RecoveryServicesBackupContext,
): ProtectionIntentOperationsOperations {
  return {
    ..._getProtectionIntentOperations(context),
  };
}

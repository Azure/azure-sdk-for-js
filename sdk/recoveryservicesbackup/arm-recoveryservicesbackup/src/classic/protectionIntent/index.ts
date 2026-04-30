// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RecoveryServicesBackupContext } from "../../api/recoveryServicesBackupContext.js";
import { validate, $delete, createOrUpdate, get } from "../../api/protectionIntent/operations.js";
import type {
  ProtectionIntentValidateOptionalParams,
  ProtectionIntentDeleteOptionalParams,
  ProtectionIntentCreateOrUpdateOptionalParams,
  ProtectionIntentGetOptionalParams,
} from "../../api/protectionIntent/options.js";
import type {
  ProtectionIntentResource,
  PreValidateEnableBackupRequest,
  PreValidateEnableBackupResponse,
} from "../../models/models.js";

/** Interface representing a ProtectionIntent operations. */
export interface ProtectionIntentOperations {
  /**
   * It will validate followings
   * 1. Vault capacity
   * 2. VM is already protected
   * 3. Any VM related configuration passed in properties.
   */
  validate: (
    azureRegion: string,
    parameters: PreValidateEnableBackupRequest,
    options?: ProtectionIntentValidateOptionalParams,
  ) => Promise<PreValidateEnableBackupResponse>;
  /** Used to remove intent from an item */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    vaultName: string,
    resourceGroupName: string,
    fabricName: string,
    intentObjectName: string,
    options?: ProtectionIntentDeleteOptionalParams,
  ) => Promise<void>;
  /** Create Intent for Enabling backup of an item. This is a synchronous operation. */
  createOrUpdate: (
    vaultName: string,
    resourceGroupName: string,
    fabricName: string,
    intentObjectName: string,
    parameters: ProtectionIntentResource,
    options?: ProtectionIntentCreateOrUpdateOptionalParams,
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
    options?: ProtectionIntentGetOptionalParams,
  ) => Promise<ProtectionIntentResource>;
}

function _getProtectionIntent(context: RecoveryServicesBackupContext) {
  return {
    validate: (
      azureRegion: string,
      parameters: PreValidateEnableBackupRequest,
      options?: ProtectionIntentValidateOptionalParams,
    ) => validate(context, azureRegion, parameters, options),
    delete: (
      vaultName: string,
      resourceGroupName: string,
      fabricName: string,
      intentObjectName: string,
      options?: ProtectionIntentDeleteOptionalParams,
    ) => $delete(context, vaultName, resourceGroupName, fabricName, intentObjectName, options),
    createOrUpdate: (
      vaultName: string,
      resourceGroupName: string,
      fabricName: string,
      intentObjectName: string,
      parameters: ProtectionIntentResource,
      options?: ProtectionIntentCreateOrUpdateOptionalParams,
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
      options?: ProtectionIntentGetOptionalParams,
    ) => get(context, vaultName, resourceGroupName, fabricName, intentObjectName, options),
  };
}

export function _getProtectionIntentOperations(
  context: RecoveryServicesBackupContext,
): ProtectionIntentOperations {
  return {
    ..._getProtectionIntent(context),
  };
}

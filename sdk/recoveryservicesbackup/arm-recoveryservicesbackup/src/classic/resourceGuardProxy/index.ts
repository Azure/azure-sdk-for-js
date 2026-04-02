// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RecoveryServicesBackupContext } from "../../api/recoveryServicesBackupContext.js";
import { unlockDelete, $delete, put, get } from "../../api/resourceGuardProxy/operations.js";
import type {
  ResourceGuardProxyUnlockDeleteOptionalParams,
  ResourceGuardProxyDeleteOptionalParams,
  ResourceGuardProxyPutOptionalParams,
  ResourceGuardProxyGetOptionalParams,
} from "../../api/resourceGuardProxy/options.js";
import type {
  ResourceGuardProxyBaseResource,
  UnlockDeleteRequest,
  UnlockDeleteResponse,
} from "../../models/models.js";

/** Interface representing a ResourceGuardProxy operations. */
export interface ResourceGuardProxyOperations {
  /** Secures delete ResourceGuardProxy operations. */
  unlockDelete: (
    vaultName: string,
    resourceGroupName: string,
    resourceGuardProxyName: string,
    parameters: UnlockDeleteRequest,
    options?: ResourceGuardProxyUnlockDeleteOptionalParams,
  ) => Promise<UnlockDeleteResponse>;
  /** Delete ResourceGuardProxy under vault */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    vaultName: string,
    resourceGroupName: string,
    resourceGuardProxyName: string,
    options?: ResourceGuardProxyDeleteOptionalParams,
  ) => Promise<void>;
  /**
   * Add or Update ResourceGuardProxy under vault
   * Secures vault critical operations
   */
  put: (
    vaultName: string,
    resourceGroupName: string,
    resourceGuardProxyName: string,
    parameters: ResourceGuardProxyBaseResource,
    options?: ResourceGuardProxyPutOptionalParams,
  ) => Promise<ResourceGuardProxyBaseResource>;
  /** Returns ResourceGuardProxy under vault and with the name referenced in request */
  get: (
    vaultName: string,
    resourceGroupName: string,
    resourceGuardProxyName: string,
    options?: ResourceGuardProxyGetOptionalParams,
  ) => Promise<ResourceGuardProxyBaseResource>;
}

function _getResourceGuardProxy(context: RecoveryServicesBackupContext) {
  return {
    unlockDelete: (
      vaultName: string,
      resourceGroupName: string,
      resourceGuardProxyName: string,
      parameters: UnlockDeleteRequest,
      options?: ResourceGuardProxyUnlockDeleteOptionalParams,
    ) =>
      unlockDelete(
        context,
        vaultName,
        resourceGroupName,
        resourceGuardProxyName,
        parameters,
        options,
      ),
    delete: (
      vaultName: string,
      resourceGroupName: string,
      resourceGuardProxyName: string,
      options?: ResourceGuardProxyDeleteOptionalParams,
    ) => $delete(context, vaultName, resourceGroupName, resourceGuardProxyName, options),
    put: (
      vaultName: string,
      resourceGroupName: string,
      resourceGuardProxyName: string,
      parameters: ResourceGuardProxyBaseResource,
      options?: ResourceGuardProxyPutOptionalParams,
    ) => put(context, vaultName, resourceGroupName, resourceGuardProxyName, parameters, options),
    get: (
      vaultName: string,
      resourceGroupName: string,
      resourceGuardProxyName: string,
      options?: ResourceGuardProxyGetOptionalParams,
    ) => get(context, vaultName, resourceGroupName, resourceGuardProxyName, options),
  };
}

export function _getResourceGuardProxyOperations(
  context: RecoveryServicesBackupContext,
): ResourceGuardProxyOperations {
  return {
    ..._getResourceGuardProxy(context),
  };
}

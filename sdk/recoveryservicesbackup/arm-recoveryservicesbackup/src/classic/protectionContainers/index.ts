// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RecoveryServicesBackupContext } from "../../api/recoveryServicesBackupContext.js";
import {
  refresh,
  inquire,
  unregister,
  register,
  get,
} from "../../api/protectionContainers/operations.js";
import type {
  ProtectionContainersRefreshOptionalParams,
  ProtectionContainersInquireOptionalParams,
  ProtectionContainersUnregisterOptionalParams,
  ProtectionContainersRegisterOptionalParams,
  ProtectionContainersGetOptionalParams,
} from "../../api/protectionContainers/options.js";
import type { ProtectionContainerResource } from "../../models/models.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ProtectionContainers operations. */
export interface ProtectionContainersOperations {
  /**
   * Discovers all the containers in the subscription that can be backed up to Recovery Services Vault. This is an
   * asynchronous operation. To know the status of the operation, call GetRefreshOperationResult API.
   */
  refresh: (
    vaultName: string,
    resourceGroupName: string,
    fabricName: string,
    options?: ProtectionContainersRefreshOptionalParams,
  ) => Promise<void>;
  /** This is an async operation and the results should be tracked using location header or Azure-async-url. */
  inquire: (
    vaultName: string,
    resourceGroupName: string,
    fabricName: string,
    containerName: string,
    options?: ProtectionContainersInquireOptionalParams,
  ) => Promise<void>;
  /**
   * Unregisters the given container from your Recovery Services Vault. This is an asynchronous operation. To determine
   * whether the backend service has finished processing the request, call Get Container Operation Result API.
   */
  unregister: (
    vaultName: string,
    resourceGroupName: string,
    fabricName: string,
    containerName: string,
    options?: ProtectionContainersUnregisterOptionalParams,
  ) => Promise<void>;
  /**
   * Registers the container with Recovery Services vault.
   * This is an asynchronous operation. To track the operation status, use location header to call get latest status of
   * the operation.
   */
  register: (
    vaultName: string,
    resourceGroupName: string,
    fabricName: string,
    containerName: string,
    parameters: ProtectionContainerResource,
    options?: ProtectionContainersRegisterOptionalParams,
  ) => PollerLike<OperationState<ProtectionContainerResource>, ProtectionContainerResource>;
  /** Gets details of the specific container registered to your Recovery Services Vault. */
  get: (
    vaultName: string,
    resourceGroupName: string,
    fabricName: string,
    containerName: string,
    options?: ProtectionContainersGetOptionalParams,
  ) => Promise<ProtectionContainerResource>;
}

function _getProtectionContainers(context: RecoveryServicesBackupContext) {
  return {
    refresh: (
      vaultName: string,
      resourceGroupName: string,
      fabricName: string,
      options?: ProtectionContainersRefreshOptionalParams,
    ) => refresh(context, vaultName, resourceGroupName, fabricName, options),
    inquire: (
      vaultName: string,
      resourceGroupName: string,
      fabricName: string,
      containerName: string,
      options?: ProtectionContainersInquireOptionalParams,
    ) => inquire(context, vaultName, resourceGroupName, fabricName, containerName, options),
    unregister: (
      vaultName: string,
      resourceGroupName: string,
      fabricName: string,
      containerName: string,
      options?: ProtectionContainersUnregisterOptionalParams,
    ) => unregister(context, vaultName, resourceGroupName, fabricName, containerName, options),
    register: (
      vaultName: string,
      resourceGroupName: string,
      fabricName: string,
      containerName: string,
      parameters: ProtectionContainerResource,
      options?: ProtectionContainersRegisterOptionalParams,
    ) =>
      register(
        context,
        vaultName,
        resourceGroupName,
        fabricName,
        containerName,
        parameters,
        options,
      ),
    get: (
      vaultName: string,
      resourceGroupName: string,
      fabricName: string,
      containerName: string,
      options?: ProtectionContainersGetOptionalParams,
    ) => get(context, vaultName, resourceGroupName, fabricName, containerName, options),
  };
}

export function _getProtectionContainersOperations(
  context: RecoveryServicesBackupContext,
): ProtectionContainersOperations {
  return {
    ..._getProtectionContainers(context),
  };
}

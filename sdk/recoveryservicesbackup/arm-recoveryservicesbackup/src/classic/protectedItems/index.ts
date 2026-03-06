// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RecoveryServicesBackupContext } from "../../api/recoveryServicesBackupContext.js";
import { $delete, createOrUpdate, get } from "../../api/protectedItems/operations.js";
import type {
  ProtectedItemsDeleteOptionalParams,
  ProtectedItemsCreateOrUpdateOptionalParams,
  ProtectedItemsGetOptionalParams,
} from "../../api/protectedItems/options.js";
import type { ProtectedItemResource } from "../../models/models.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ProtectedItems operations. */
export interface ProtectedItemsOperations {
  /**
   * Used to disable backup of an item within a container. This is an asynchronous operation. To know the status of the
   * request, call the GetItemOperationResult API.
   */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    vaultName: string,
    resourceGroupName: string,
    fabricName: string,
    containerName: string,
    protectedItemName: string,
    options?: ProtectedItemsDeleteOptionalParams,
  ) => Promise<void>;
  /**
   * Enables backup of an item or to modifies the backup policy information of an already backed up item. This is an
   * asynchronous operation. To know the status of the operation, call the GetItemOperationResult API.
   */
  createOrUpdate: (
    vaultName: string,
    resourceGroupName: string,
    fabricName: string,
    containerName: string,
    protectedItemName: string,
    parameters: ProtectedItemResource,
    options?: ProtectedItemsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<ProtectedItemResource>, ProtectedItemResource>;
  /**
   * Provides the details of the backed up item. This is an asynchronous operation. To know the status of the operation,
   * call the GetItemOperationResult API.
   */
  get: (
    vaultName: string,
    resourceGroupName: string,
    fabricName: string,
    containerName: string,
    protectedItemName: string,
    options?: ProtectedItemsGetOptionalParams,
  ) => Promise<ProtectedItemResource>;
}

function _getProtectedItems(context: RecoveryServicesBackupContext) {
  return {
    delete: (
      vaultName: string,
      resourceGroupName: string,
      fabricName: string,
      containerName: string,
      protectedItemName: string,
      options?: ProtectedItemsDeleteOptionalParams,
    ) =>
      $delete(
        context,
        vaultName,
        resourceGroupName,
        fabricName,
        containerName,
        protectedItemName,
        options,
      ),
    createOrUpdate: (
      vaultName: string,
      resourceGroupName: string,
      fabricName: string,
      containerName: string,
      protectedItemName: string,
      parameters: ProtectedItemResource,
      options?: ProtectedItemsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        vaultName,
        resourceGroupName,
        fabricName,
        containerName,
        protectedItemName,
        parameters,
        options,
      ),
    get: (
      vaultName: string,
      resourceGroupName: string,
      fabricName: string,
      containerName: string,
      protectedItemName: string,
      options?: ProtectedItemsGetOptionalParams,
    ) =>
      get(
        context,
        vaultName,
        resourceGroupName,
        fabricName,
        containerName,
        protectedItemName,
        options,
      ),
  };
}

export function _getProtectedItemsOperations(
  context: RecoveryServicesBackupContext,
): ProtectedItemsOperations {
  return {
    ..._getProtectedItems(context),
  };
}

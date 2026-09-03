// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RecoveryServicesBackupContext } from "../../api/recoveryServicesBackupContext.js";
import { trigger } from "../../api/restores/operations.js";
import type { RestoresTriggerOptionalParams } from "../../api/restores/options.js";
import type { RestoreRequestResource } from "../../models/models.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Restores operations. */
export interface RestoresOperations {
  /**
   * Restores the specified backed up data. This is an asynchronous operation. To know the status of this API call, use
   * GetProtectedItemOperationResult API.
   */
  trigger: (
    vaultName: string,
    resourceGroupName: string,
    fabricName: string,
    containerName: string,
    protectedItemName: string,
    recoveryPointId: string,
    parameters: RestoreRequestResource,
    options?: RestoresTriggerOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use trigger instead */
  beginTrigger: (
    vaultName: string,
    resourceGroupName: string,
    fabricName: string,
    containerName: string,
    protectedItemName: string,
    recoveryPointId: string,
    parameters: RestoreRequestResource,
    options?: RestoresTriggerOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use trigger instead */
  beginTriggerAndWait: (
    vaultName: string,
    resourceGroupName: string,
    fabricName: string,
    containerName: string,
    protectedItemName: string,
    recoveryPointId: string,
    parameters: RestoreRequestResource,
    options?: RestoresTriggerOptionalParams,
  ) => Promise<void>;
}

function _getRestores(context: RecoveryServicesBackupContext) {
  return {
    trigger: (
      vaultName: string,
      resourceGroupName: string,
      fabricName: string,
      containerName: string,
      protectedItemName: string,
      recoveryPointId: string,
      parameters: RestoreRequestResource,
      options?: RestoresTriggerOptionalParams,
    ) =>
      trigger(
        context,
        vaultName,
        resourceGroupName,
        fabricName,
        containerName,
        protectedItemName,
        recoveryPointId,
        parameters,
        options,
      ),
    beginTrigger: async (
      vaultName: string,
      resourceGroupName: string,
      fabricName: string,
      containerName: string,
      protectedItemName: string,
      recoveryPointId: string,
      parameters: RestoreRequestResource,
      options?: RestoresTriggerOptionalParams,
    ) => {
      const poller = trigger(
        context,
        vaultName,
        resourceGroupName,
        fabricName,
        containerName,
        protectedItemName,
        recoveryPointId,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginTriggerAndWait: async (
      vaultName: string,
      resourceGroupName: string,
      fabricName: string,
      containerName: string,
      protectedItemName: string,
      recoveryPointId: string,
      parameters: RestoreRequestResource,
      options?: RestoresTriggerOptionalParams,
    ) => {
      return await trigger(
        context,
        vaultName,
        resourceGroupName,
        fabricName,
        containerName,
        protectedItemName,
        recoveryPointId,
        parameters,
        options,
      );
    },
  };
}

export function _getRestoresOperations(context: RecoveryServicesBackupContext): RestoresOperations {
  return {
    ..._getRestores(context),
  };
}

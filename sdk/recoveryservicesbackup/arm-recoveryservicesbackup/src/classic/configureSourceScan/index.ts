// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RecoveryServicesBackupContext } from "../../api/recoveryServicesBackupContext.js";
import { execute } from "../../api/configureSourceScan/operations.js";
import type { ConfigureSourceScanExecuteOptionalParams } from "../../api/configureSourceScan/options.js";
import type { ProtectedItemConfigureSourceScanRequest } from "../../models/models.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ConfigureSourceScan operations. */
export interface ConfigureSourceScanOperations {
  /**
   * Configures source scan for a protected item. This is an asynchronous operation. To know the status of the
   * operation, call GetProtectedItemOperationResult API.
   */
  execute: (
    resourceGroupName: string,
    vaultName: string,
    fabricName: string,
    containerName: string,
    protectedItemName: string,
    body: ProtectedItemConfigureSourceScanRequest,
    options?: ConfigureSourceScanExecuteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use execute instead */
  beginExecute: (
    resourceGroupName: string,
    vaultName: string,
    fabricName: string,
    containerName: string,
    protectedItemName: string,
    body: ProtectedItemConfigureSourceScanRequest,
    options?: ConfigureSourceScanExecuteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use execute instead */
  beginExecuteAndWait: (
    resourceGroupName: string,
    vaultName: string,
    fabricName: string,
    containerName: string,
    protectedItemName: string,
    body: ProtectedItemConfigureSourceScanRequest,
    options?: ConfigureSourceScanExecuteOptionalParams,
  ) => Promise<void>;
}

function _getConfigureSourceScan(context: RecoveryServicesBackupContext) {
  return {
    execute: (
      resourceGroupName: string,
      vaultName: string,
      fabricName: string,
      containerName: string,
      protectedItemName: string,
      body: ProtectedItemConfigureSourceScanRequest,
      options?: ConfigureSourceScanExecuteOptionalParams,
    ) =>
      execute(
        context,
        resourceGroupName,
        vaultName,
        fabricName,
        containerName,
        protectedItemName,
        body,
        options,
      ),
    beginExecute: async (
      resourceGroupName: string,
      vaultName: string,
      fabricName: string,
      containerName: string,
      protectedItemName: string,
      body: ProtectedItemConfigureSourceScanRequest,
      options?: ConfigureSourceScanExecuteOptionalParams,
    ) => {
      const poller = execute(
        context,
        resourceGroupName,
        vaultName,
        fabricName,
        containerName,
        protectedItemName,
        body,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginExecuteAndWait: async (
      resourceGroupName: string,
      vaultName: string,
      fabricName: string,
      containerName: string,
      protectedItemName: string,
      body: ProtectedItemConfigureSourceScanRequest,
      options?: ConfigureSourceScanExecuteOptionalParams,
    ) => {
      return await execute(
        context,
        resourceGroupName,
        vaultName,
        fabricName,
        containerName,
        protectedItemName,
        body,
        options,
      );
    },
  };
}

export function _getConfigureSourceScanOperations(
  context: RecoveryServicesBackupContext,
): ConfigureSourceScanOperations {
  return {
    ..._getConfigureSourceScan(context),
  };
}

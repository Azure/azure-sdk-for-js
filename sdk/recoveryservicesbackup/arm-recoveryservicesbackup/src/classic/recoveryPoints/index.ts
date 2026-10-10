// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RecoveryServicesBackupContext } from "../../api/recoveryServicesBackupContext.js";
import {
  getRPExtendedInfoOperationResult,
  getRPExtendedInfo,
  list,
  get,
} from "../../api/recoveryPoints/operations.js";
import type {
  RecoveryPointsGetRPExtendedInfoOperationResultOptionalParams,
  RecoveryPointsGetRPExtendedInfoOptionalParams,
  RecoveryPointsListOptionalParams,
  RecoveryPointsGetOptionalParams,
} from "../../api/recoveryPoints/options.js";
import type {
  RecoveryPointResource,
  GetRPExtendedInfoRequestResource,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a RecoveryPoints operations. */
export interface RecoveryPointsOperations {
  /**
   * Returns the additional details of the recovery points fetched by a prior getRPExtendedInfo operation. Returns
   * 202 Accepted while the operation is still running.
   */
  getRPExtendedInfoOperationResult: (
    resourceGroupName: string,
    vaultName: string,
    fabricName: string,
    operationId: string,
    options?: RecoveryPointsGetRPExtendedInfoOperationResultOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use getRPExtendedInfoOperationResult instead */
  beginGetRPExtendedInfoOperationResult: (
    resourceGroupName: string,
    vaultName: string,
    fabricName: string,
    operationId: string,
    options?: RecoveryPointsGetRPExtendedInfoOperationResultOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use getRPExtendedInfoOperationResult instead */
  beginGetRPExtendedInfoOperationResultAndWait: (
    resourceGroupName: string,
    vaultName: string,
    fabricName: string,
    operationId: string,
    options?: RecoveryPointsGetRPExtendedInfoOperationResultOptionalParams,
  ) => Promise<void>;
  /**
   * Triggers fetching the additional details of a recovery point, which are not returned by the recovery point GET
   * API. This is an asynchronous operation. Returns tracking headers which can be tracked using the
   * GetRPExtendedInfoOperationResult API.
   */
  getRPExtendedInfo: (
    resourceGroupName: string,
    vaultName: string,
    fabricName: string,
    parameters: GetRPExtendedInfoRequestResource,
    options?: RecoveryPointsGetRPExtendedInfoOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use getRPExtendedInfo instead */
  beginGetRPExtendedInfo: (
    resourceGroupName: string,
    vaultName: string,
    fabricName: string,
    parameters: GetRPExtendedInfoRequestResource,
    options?: RecoveryPointsGetRPExtendedInfoOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use getRPExtendedInfo instead */
  beginGetRPExtendedInfoAndWait: (
    resourceGroupName: string,
    vaultName: string,
    fabricName: string,
    parameters: GetRPExtendedInfoRequestResource,
    options?: RecoveryPointsGetRPExtendedInfoOptionalParams,
  ) => Promise<void>;
  /** Lists the backup copies for the backed up item. */
  list: (
    vaultName: string,
    resourceGroupName: string,
    fabricName: string,
    containerName: string,
    protectedItemName: string,
    options?: RecoveryPointsListOptionalParams,
  ) => PagedAsyncIterableIterator<RecoveryPointResource>;
  /**
   * Provides the information of the backed up data identified using RecoveryPointID. This is an asynchronous operation.
   * To know the status of the operation, call the GetProtectedItemOperationResult API.
   */
  get: (
    vaultName: string,
    resourceGroupName: string,
    fabricName: string,
    containerName: string,
    protectedItemName: string,
    recoveryPointId: string,
    options?: RecoveryPointsGetOptionalParams,
  ) => Promise<RecoveryPointResource>;
}

function _getRecoveryPoints(context: RecoveryServicesBackupContext) {
  return {
    getRPExtendedInfoOperationResult: (
      resourceGroupName: string,
      vaultName: string,
      fabricName: string,
      operationId: string,
      options?: RecoveryPointsGetRPExtendedInfoOperationResultOptionalParams,
    ) =>
      getRPExtendedInfoOperationResult(
        context,
        resourceGroupName,
        vaultName,
        fabricName,
        operationId,
        options,
      ),
    beginGetRPExtendedInfoOperationResult: async (
      resourceGroupName: string,
      vaultName: string,
      fabricName: string,
      operationId: string,
      options?: RecoveryPointsGetRPExtendedInfoOperationResultOptionalParams,
    ) => {
      const poller = getRPExtendedInfoOperationResult(
        context,
        resourceGroupName,
        vaultName,
        fabricName,
        operationId,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginGetRPExtendedInfoOperationResultAndWait: async (
      resourceGroupName: string,
      vaultName: string,
      fabricName: string,
      operationId: string,
      options?: RecoveryPointsGetRPExtendedInfoOperationResultOptionalParams,
    ) => {
      return await getRPExtendedInfoOperationResult(
        context,
        resourceGroupName,
        vaultName,
        fabricName,
        operationId,
        options,
      );
    },
    getRPExtendedInfo: (
      resourceGroupName: string,
      vaultName: string,
      fabricName: string,
      parameters: GetRPExtendedInfoRequestResource,
      options?: RecoveryPointsGetRPExtendedInfoOptionalParams,
    ) => getRPExtendedInfo(context, resourceGroupName, vaultName, fabricName, parameters, options),
    beginGetRPExtendedInfo: async (
      resourceGroupName: string,
      vaultName: string,
      fabricName: string,
      parameters: GetRPExtendedInfoRequestResource,
      options?: RecoveryPointsGetRPExtendedInfoOptionalParams,
    ) => {
      const poller = getRPExtendedInfo(
        context,
        resourceGroupName,
        vaultName,
        fabricName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginGetRPExtendedInfoAndWait: async (
      resourceGroupName: string,
      vaultName: string,
      fabricName: string,
      parameters: GetRPExtendedInfoRequestResource,
      options?: RecoveryPointsGetRPExtendedInfoOptionalParams,
    ) => {
      return await getRPExtendedInfo(
        context,
        resourceGroupName,
        vaultName,
        fabricName,
        parameters,
        options,
      );
    },
    list: (
      vaultName: string,
      resourceGroupName: string,
      fabricName: string,
      containerName: string,
      protectedItemName: string,
      options?: RecoveryPointsListOptionalParams,
    ) =>
      list(
        context,
        vaultName,
        resourceGroupName,
        fabricName,
        containerName,
        protectedItemName,
        options,
      ),
    get: (
      vaultName: string,
      resourceGroupName: string,
      fabricName: string,
      containerName: string,
      protectedItemName: string,
      recoveryPointId: string,
      options?: RecoveryPointsGetOptionalParams,
    ) =>
      get(
        context,
        vaultName,
        resourceGroupName,
        fabricName,
        containerName,
        protectedItemName,
        recoveryPointId,
        options,
      ),
  };
}

export function _getRecoveryPointsOperations(
  context: RecoveryServicesBackupContext,
): RecoveryPointsOperations {
  return {
    ..._getRecoveryPoints(context),
  };
}

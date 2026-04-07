// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RecoveryServicesBackupContext } from "../../api/recoveryServicesBackupContext.js";
import { list } from "../../api/recoveryPointsRecommendedForMove/operations.js";
import type { RecoveryPointsRecommendedForMoveListOptionalParams } from "../../api/recoveryPointsRecommendedForMove/options.js";
import type {
  ListRecoveryPointsRecommendedForMoveRequest,
  RecoveryPointResource,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a RecoveryPointsRecommendedForMove operations. */
export interface RecoveryPointsRecommendedForMoveOperations {
  /** Lists the recovery points recommended for move to another tier */
  list: (
    vaultName: string,
    resourceGroupName: string,
    fabricName: string,
    containerName: string,
    protectedItemName: string,
    parameters: ListRecoveryPointsRecommendedForMoveRequest,
    options?: RecoveryPointsRecommendedForMoveListOptionalParams,
  ) => PagedAsyncIterableIterator<RecoveryPointResource>;
}

function _getRecoveryPointsRecommendedForMove(context: RecoveryServicesBackupContext) {
  return {
    list: (
      vaultName: string,
      resourceGroupName: string,
      fabricName: string,
      containerName: string,
      protectedItemName: string,
      parameters: ListRecoveryPointsRecommendedForMoveRequest,
      options?: RecoveryPointsRecommendedForMoveListOptionalParams,
    ) =>
      list(
        context,
        vaultName,
        resourceGroupName,
        fabricName,
        containerName,
        protectedItemName,
        parameters,
        options,
      ),
  };
}

export function _getRecoveryPointsRecommendedForMoveOperations(
  context: RecoveryServicesBackupContext,
): RecoveryPointsRecommendedForMoveOperations {
  return {
    ..._getRecoveryPointsRecommendedForMove(context),
  };
}

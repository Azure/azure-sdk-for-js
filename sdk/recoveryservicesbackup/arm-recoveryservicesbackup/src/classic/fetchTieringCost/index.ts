// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RecoveryServicesBackupContext } from "../../api/recoveryServicesBackupContext.js";
import { post } from "../../api/fetchTieringCost/operations.js";
import type { FetchTieringCostPostOptionalParams } from "../../api/fetchTieringCost/options.js";
import type {
  FetchTieringCostInfoRequestUnion,
  TieringCostInfoUnion,
} from "../../models/models.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a FetchTieringCost operations. */
export interface FetchTieringCostOperations {
  /**
   * Provides the details of the tiering related sizes and cost.
   * Status of the operation can be fetched using GetTieringCostOperationStatus API and result using GetTieringCostOperationResult API.
   */
  post: (
    resourceGroupName: string,
    vaultName: string,
    parameters: FetchTieringCostInfoRequestUnion,
    options?: FetchTieringCostPostOptionalParams,
  ) => PollerLike<OperationState<TieringCostInfoUnion>, TieringCostInfoUnion>;
}

function _getFetchTieringCost(context: RecoveryServicesBackupContext) {
  return {
    post: (
      resourceGroupName: string,
      vaultName: string,
      parameters: FetchTieringCostInfoRequestUnion,
      options?: FetchTieringCostPostOptionalParams,
    ) => post(context, resourceGroupName, vaultName, parameters, options),
  };
}

export function _getFetchTieringCostOperations(
  context: RecoveryServicesBackupContext,
): FetchTieringCostOperations {
  return {
    ..._getFetchTieringCost(context),
  };
}

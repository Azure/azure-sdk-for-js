// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlManagementContext } from "../../api/sqlManagementContext.js";
import { update } from "../../api/recommendedSensitivityLabels/operations.js";
import type { RecommendedSensitivityLabelsUpdateOptionalParams } from "../../api/recommendedSensitivityLabels/options.js";
import type { RecommendedSensitivityLabelUpdateList } from "../../models/models.js";

/** Interface representing a RecommendedSensitivityLabels operations. */
export interface RecommendedSensitivityLabelsOperations {
  /** Update recommended sensitivity labels states of a given database using an operations batch. */
  update: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    parameters: RecommendedSensitivityLabelUpdateList,
    options?: RecommendedSensitivityLabelsUpdateOptionalParams,
  ) => Promise<void>;
}

function _getRecommendedSensitivityLabels(context: SqlManagementContext) {
  return {
    update: (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      parameters: RecommendedSensitivityLabelUpdateList,
      options?: RecommendedSensitivityLabelsUpdateOptionalParams,
    ) => update(context, resourceGroupName, serverName, databaseName, parameters, options),
  };
}

export function _getRecommendedSensitivityLabelsOperations(
  context: SqlManagementContext,
): RecommendedSensitivityLabelsOperations {
  return {
    ..._getRecommendedSensitivityLabels(context),
  };
}

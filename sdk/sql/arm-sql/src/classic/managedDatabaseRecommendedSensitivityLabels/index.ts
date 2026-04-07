// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlContext } from "../../api/sqlContext.js";
import { update } from "../../api/managedDatabaseRecommendedSensitivityLabels/operations.js";
import type { ManagedDatabaseRecommendedSensitivityLabelsUpdateOptionalParams } from "../../api/managedDatabaseRecommendedSensitivityLabels/options.js";
import type { RecommendedSensitivityLabelUpdateList } from "../../models/models.js";

/** Interface representing a ManagedDatabaseRecommendedSensitivityLabels operations. */
export interface ManagedDatabaseRecommendedSensitivityLabelsOperations {
  /** Update recommended sensitivity labels states of a given database using an operations batch. */
  update: (
    resourceGroupName: string,
    managedInstanceName: string,
    databaseName: string,
    parameters: RecommendedSensitivityLabelUpdateList,
    options?: ManagedDatabaseRecommendedSensitivityLabelsUpdateOptionalParams,
  ) => Promise<void>;
}

function _getManagedDatabaseRecommendedSensitivityLabels(context: SqlContext) {
  return {
    update: (
      resourceGroupName: string,
      managedInstanceName: string,
      databaseName: string,
      parameters: RecommendedSensitivityLabelUpdateList,
      options?: ManagedDatabaseRecommendedSensitivityLabelsUpdateOptionalParams,
    ) => update(context, resourceGroupName, managedInstanceName, databaseName, parameters, options),
  };
}

export function _getManagedDatabaseRecommendedSensitivityLabelsOperations(
  context: SqlContext,
): ManagedDatabaseRecommendedSensitivityLabelsOperations {
  return {
    ..._getManagedDatabaseRecommendedSensitivityLabels(context),
  };
}

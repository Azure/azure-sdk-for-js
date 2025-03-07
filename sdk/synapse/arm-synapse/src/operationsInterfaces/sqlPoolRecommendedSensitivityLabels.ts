/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import {
  RecommendedSensitivityLabelUpdateList,
  SqlPoolRecommendedSensitivityLabelsUpdateOptionalParams
} from "../models/index.js";

/** Interface representing a SqlPoolRecommendedSensitivityLabels. */
export interface SqlPoolRecommendedSensitivityLabels {
  /**
   * Update recommended sensitivity labels states of a given SQL Pool using an operations batch.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param workspaceName The name of the workspace.
   * @param sqlPoolName SQL pool name
   * @param parameters A list of recommended sensitivity label update operations.
   * @param options The options parameters.
   */
  update(
    resourceGroupName: string,
    workspaceName: string,
    sqlPoolName: string,
    parameters: RecommendedSensitivityLabelUpdateList,
    options?: SqlPoolRecommendedSensitivityLabelsUpdateOptionalParams
  ): Promise<void>;
}

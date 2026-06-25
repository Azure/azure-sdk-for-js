// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureTerraformContext } from "../../api/azureTerraformContext.js";
import { exportTerraform } from "../../api/terraform/operations.js";
import { TerraformExportTerraformOptionalParams } from "../../api/terraform/options.js";
import { BaseExportModelUnion, TerraformOperationStatus } from "../../models/models.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Terraform operations. */
export interface TerraformOperations {
  /** Exports the Terraform configuration of the specified resource(s). */
  exportTerraform: (
    body: BaseExportModelUnion,
    options?: TerraformExportTerraformOptionalParams,
  ) => PollerLike<OperationState<TerraformOperationStatus>, TerraformOperationStatus>;
}

function _getTerraform(context: AzureTerraformContext) {
  return {
    exportTerraform: (
      body: BaseExportModelUnion,
      options?: TerraformExportTerraformOptionalParams,
    ) => exportTerraform(context, body, options),
  };
}

export function _getTerraformOperations(context: AzureTerraformContext): TerraformOperations {
  return {
    ..._getTerraform(context),
  };
}

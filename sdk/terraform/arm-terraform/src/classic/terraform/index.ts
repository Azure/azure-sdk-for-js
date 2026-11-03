// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureTerraformContext } from "../../api/azureTerraformContext.js";
import { exportTerraform } from "../../api/terraform/operations.js";
import type { TerraformExportTerraformOptionalParams } from "../../api/terraform/options.js";
import type { BaseExportModelUnion, TerraformOperationStatus } from "../../models/models.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

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

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureTerraformContext } from "../../api/azureTerraformContext.js";
import type { TerraformExportTerraformOptionalParams } from "../../api/options.js";
import { terraformExportTerraform } from "../../api/terraform/index.js";
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

export function getTerraform(context: AzureTerraformContext, subscriptionId: string) {
  return {
    exportTerraform: (
      body: BaseExportModelUnion,
      options?: TerraformExportTerraformOptionalParams,
    ) => terraformExportTerraform(context, subscriptionId, body, options),
  };
}

export function getTerraformOperations(
  context: AzureTerraformContext,
  subscriptionId: string,
): TerraformOperations {
  return {
    ...getTerraform(context, subscriptionId),
  };
}

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  AzureTerraformContext as Client,
  TerraformExportTerraformOptionalParams,
} from "../index.js";
import type {
  BaseExportModelUnion,
  TerraformOperationStatus} from "../../models/models.js";
import {
  baseExportModelUnionSerializer,
  terraformOperationStatusDeserializer,
} from "../../models/models.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import type {
  StreamableMethod,
  PathUncheckedResponse} from "@azure-rest/core-client";
import {
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _terraformExportTerraformSend(
  context: Client,
  subscriptionId: string,
  body: BaseExportModelUnion,
  options: TerraformExportTerraformOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/providers/Microsoft.AzureTerraform/exportTerraform",
      subscriptionId,
    )
    .post({
      ...operationOptionsToRequestParameters(options),
      body: baseExportModelUnionSerializer(body),
    });
}

export async function _terraformExportTerraformDeserialize(
  result: PathUncheckedResponse,
): Promise<TerraformOperationStatus> {
  const expectedStatuses = ["202", "200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return terraformOperationStatusDeserializer(result.body);
}

/** Exports the Terraform configuration of the specified resource(s). */
export function terraformExportTerraform(
  context: Client,
  subscriptionId: string,
  body: BaseExportModelUnion,
  options: TerraformExportTerraformOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<TerraformOperationStatus>, TerraformOperationStatus> {
  return getLongRunningPoller(context, _terraformExportTerraformDeserialize, ["202", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _terraformExportTerraformSend(context, subscriptionId, body, options),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<TerraformOperationStatus>, TerraformOperationStatus>;
}

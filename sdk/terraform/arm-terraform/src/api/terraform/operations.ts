// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureTerraformContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  baseExportModelUnionSerializer,
  BaseExportModelUnion,
  TerraformOperationStatus,
  terraformOperationStatusDeserializer,
} from "../../models/models.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import { TerraformExportTerraformOptionalParams } from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _exportTerraformSend(
  context: Client,
  body: BaseExportModelUnion,
  options: TerraformExportTerraformOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.AzureTerraform/exportTerraform{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2025-09-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: baseExportModelUnionSerializer(body),
    });
}

export async function _exportTerraformDeserialize(
  result: PathUncheckedResponse,
): Promise<TerraformOperationStatus> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return terraformOperationStatusDeserializer(result.body);
}

/** Exports the Terraform configuration of the specified resource(s). */
export function exportTerraform(
  context: Client,
  body: BaseExportModelUnion,
  options: TerraformExportTerraformOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<TerraformOperationStatus>, TerraformOperationStatus> {
  return getLongRunningPoller(context, _exportTerraformDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _exportTerraformSend(context, body, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2025-09-01-preview",
  }) as PollerLike<OperationState<TerraformOperationStatus>, TerraformOperationStatus>;
}

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlManagementContext as Client } from "../index.js";
import type { RecommendedSensitivityLabelUpdateList } from "../../models/models.js";
import {
  errorResponseDeserializer,
  recommendedSensitivityLabelUpdateListSerializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { RecommendedSensitivityLabelsUpdateOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  databaseName: string,
  parameters: RecommendedSensitivityLabelUpdateList,
  options: RecommendedSensitivityLabelsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/recommendedSensitivityLabels{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      databaseName: databaseName,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: recommendedSensitivityLabelUpdateListSerializer(parameters),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Update recommended sensitivity labels states of a given database using an operations batch. */
export async function update(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  databaseName: string,
  parameters: RecommendedSensitivityLabelUpdateList,
  options: RecommendedSensitivityLabelsUpdateOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _updateSend(
    context,
    resourceGroupName,
    serverName,
    databaseName,
    parameters,
    options,
  );
  return _updateDeserialize(result);
}

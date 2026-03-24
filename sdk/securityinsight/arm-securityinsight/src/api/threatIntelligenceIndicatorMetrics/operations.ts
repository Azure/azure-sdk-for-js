// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityInsightsContext as Client } from "../index.js";
import type { ThreatIntelligenceMetricsList } from "../../models/models.js";
import {
  cloudErrorDeserializer,
  threatIntelligenceMetricsListDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { ThreatIntelligenceIndicatorMetricsListOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  options: ThreatIntelligenceIndicatorMetricsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/threatIntelligence/main/metrics{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      "api%2Dversion": context.apiVersion ?? "2025-07-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<ThreatIntelligenceMetricsList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return threatIntelligenceMetricsListDeserializer(result.body);
}

/** Get threat intelligence indicators metrics (Indicators counts by Type, Threat Type, Source). */
export async function list(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  options: ThreatIntelligenceIndicatorMetricsListOptionalParams = { requestOptions: {} },
): Promise<ThreatIntelligenceMetricsList> {
  const result = await _listSend(context, resourceGroupName, workspaceName, options);
  return _listDeserialize(result);
}

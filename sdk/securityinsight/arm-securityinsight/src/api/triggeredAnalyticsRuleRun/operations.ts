// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityInsightsContext as Client } from "../index.js";
import {
  cloudErrorDeserializer,
  TriggeredAnalyticsRuleRun,
  triggeredAnalyticsRuleRunDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import { TriggeredAnalyticsRuleRunGetOptionalParams } from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _getSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  ruleRunId: string,
  options: TriggeredAnalyticsRuleRunGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/triggeredAnalyticsRuleRuns/{ruleRunId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      ruleRunId: ruleRunId,
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

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<TriggeredAnalyticsRuleRun> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return triggeredAnalyticsRuleRunDeserializer(result.body);
}

/** Gets the triggered analytics rule run. */
export async function get(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  ruleRunId: string,
  options: TriggeredAnalyticsRuleRunGetOptionalParams = { requestOptions: {} },
): Promise<TriggeredAnalyticsRuleRun> {
  const result = await _getSend(context, resourceGroupName, workspaceName, ruleRunId, options);
  return _getDeserialize(result);
}

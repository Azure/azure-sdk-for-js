// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityInsightsContext as Client } from "../index.js";
import {
  alertRuleUnionDeserializer,
  AlertRuleUnion,
  errorResponseDeserializer,
  AnalyticsRuleRunTrigger,
  analyticsRuleRunTriggerSerializer,
} from "../../models/models.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import { AlertRuleTriggerRuleRunOptionalParams } from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _triggerRuleRunSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  ruleId: string,
  analyticsRuleRunTriggerParameter: AnalyticsRuleRunTrigger,
  options: AlertRuleTriggerRuleRunOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/alertRules/{ruleId}/triggerRuleRun{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      ruleId: ruleId,
      "api%2Dversion": context.apiVersion ?? "2025-07-01-preview",
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
      body: analyticsRuleRunTriggerSerializer(analyticsRuleRunTriggerParameter),
    });
}

export async function _triggerRuleRunDeserialize(
  result: PathUncheckedResponse,
): Promise<AlertRuleUnion> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return alertRuleUnionDeserializer(result.body);
}

/** triggers analytics rule run */
export function triggerRuleRun(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  ruleId: string,
  analyticsRuleRunTriggerParameter: AnalyticsRuleRunTrigger,
  options: AlertRuleTriggerRuleRunOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<AlertRuleUnion>, AlertRuleUnion> {
  return getLongRunningPoller(context, _triggerRuleRunDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _triggerRuleRunSend(
        context,
        resourceGroupName,
        workspaceName,
        ruleId,
        analyticsRuleRunTriggerParameter,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-07-01-preview",
  }) as PollerLike<OperationState<AlertRuleUnion>, AlertRuleUnion>;
}

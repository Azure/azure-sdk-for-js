// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AutomationContext as Client } from "../index.js";
import type { RunbookGetContentResponse } from "../../models/models.js";
import { errorResponseDeserializer } from "../../models/models.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { RunbookGetContentOptionalParams, RunbookPublishOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _getContentSend(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  runbookName: string,
  options: RunbookGetContentOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/runbooks/{runbookName}/content{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      automationAccountName: automationAccountName,
      runbookName: runbookName,
      "api%2Dversion": context.apiVersion ?? "2024-10-23",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "text/plain", ...options.requestOptions?.headers },
  });
}

export async function _getContentDeserialize(
  result: PathUncheckedResponse,
): Promise<RunbookGetContentResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return { body: result.body };
}

/** Retrieve the content of runbook identified by runbook name. */
export async function getContent(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  runbookName: string,
  options: RunbookGetContentOptionalParams = { requestOptions: {} },
): Promise<RunbookGetContentResponse> {
  const result = await _getContentSend(
    context,
    resourceGroupName,
    automationAccountName,
    runbookName,
    options,
  );
  return _getContentDeserialize(result);
}

export function _publishSend(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  runbookName: string,
  options: RunbookPublishOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/runbooks/{runbookName}/publish{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      automationAccountName: automationAccountName,
      runbookName: runbookName,
      "api%2Dversion": context.apiVersion ?? "2024-10-23",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _publishDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Publish runbook draft. */
export function publish(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  runbookName: string,
  options: RunbookPublishOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _publishDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _publishSend(context, resourceGroupName, automationAccountName, runbookName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2024-10-23",
  }) as PollerLike<OperationState<void>, void>;
}

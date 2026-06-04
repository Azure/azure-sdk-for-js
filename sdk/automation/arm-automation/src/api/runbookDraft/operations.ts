// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AutomationContext as Client } from "../index.js";
import type {
  RunbookDraft,
  RunbookDraftUndoEditResult,
  RunbookDraftGetContentResponse,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  runbookDraftDeserializer,
  runbookDraftUndoEditResultDeserializer,
} from "../../models/models.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  RunbookDraftUndoEditOptionalParams,
  RunbookDraftGetOptionalParams,
  RunbookDraftReplaceContentOptionalParams,
  RunbookDraftGetContentOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _undoEditSend(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  runbookName: string,
  options: RunbookDraftUndoEditOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/runbooks/{runbookName}/draft/undoEdit{?api%2Dversion}",
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
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _undoEditDeserialize(
  result: PathUncheckedResponse,
): Promise<RunbookDraftUndoEditResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return runbookDraftUndoEditResultDeserializer(result.body);
}

/** Undo draft edit to last known published state identified by runbook name. */
export async function undoEdit(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  runbookName: string,
  options: RunbookDraftUndoEditOptionalParams = { requestOptions: {} },
): Promise<RunbookDraftUndoEditResult> {
  const result = await _undoEditSend(
    context,
    resourceGroupName,
    automationAccountName,
    runbookName,
    options,
  );
  return _undoEditDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  runbookName: string,
  options: RunbookDraftGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/runbooks/{runbookName}/draft{?api%2Dversion}",
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
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getDeserialize(result: PathUncheckedResponse): Promise<RunbookDraft> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return runbookDraftDeserializer(result.body);
}

/** Retrieve the runbook draft identified by runbook name. */
export async function get(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  runbookName: string,
  options: RunbookDraftGetOptionalParams = { requestOptions: {} },
): Promise<RunbookDraft> {
  const result = await _getSend(
    context,
    resourceGroupName,
    automationAccountName,
    runbookName,
    options,
  );
  return _getDeserialize(result);
}

export function _replaceContentSend(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  runbookName: string,
  runbookContent: string,
  options: RunbookDraftReplaceContentOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/runbooks/{runbookName}/draft/content{?api%2Dversion}",
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
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "text/plain",
    body: runbookContent,
  });
}

export async function _replaceContentDeserialize(result: PathUncheckedResponse): Promise<void> {
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

/** Replaces the runbook draft content. */
export function replaceContent(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  runbookName: string,
  runbookContent: string,
  options: RunbookDraftReplaceContentOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _replaceContentDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _replaceContentSend(
        context,
        resourceGroupName,
        automationAccountName,
        runbookName,
        runbookContent,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2024-10-23",
  }) as PollerLike<OperationState<void>, void>;
}

export function _getContentSend(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  runbookName: string,
  options: RunbookDraftGetContentOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/runbooks/{runbookName}/draft/content{?api%2Dversion}",
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
): Promise<RunbookDraftGetContentResponse> {
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

/** Retrieve the content of runbook draft identified by runbook name. */
export async function getContent(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  runbookName: string,
  options: RunbookDraftGetContentOptionalParams = { requestOptions: {} },
): Promise<RunbookDraftGetContentResponse> {
  const result = await _getContentSend(
    context,
    resourceGroupName,
    automationAccountName,
    runbookName,
    options,
  );
  return _getContentDeserialize(result);
}

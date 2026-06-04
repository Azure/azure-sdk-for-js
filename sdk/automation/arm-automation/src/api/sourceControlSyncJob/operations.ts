// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AutomationContext as Client } from "../index.js";
import type {
  SourceControlSyncJobCreateParameters,
  SourceControlSyncJob,
  SourceControlSyncJobById,
  _SourceControlSyncJobListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  sourceControlSyncJobCreateParametersSerializer,
  sourceControlSyncJobDeserializer,
  sourceControlSyncJobByIdDeserializer,
  _sourceControlSyncJobListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  SourceControlSyncJobListByAutomationAccountOptionalParams,
  SourceControlSyncJobGetOptionalParams,
  SourceControlSyncJobCreateOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listByAutomationAccountSend(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  sourceControlName: string,
  options: SourceControlSyncJobListByAutomationAccountOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/sourceControls/{sourceControlName}/sourceControlSyncJobs{?api%2Dversion,%24filter}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      automationAccountName: automationAccountName,
      sourceControlName: sourceControlName,
      "api%2Dversion": context.apiVersion ?? "2024-10-23",
      "%24filter": options?.filter,
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

export async function _listByAutomationAccountDeserialize(
  result: PathUncheckedResponse,
): Promise<_SourceControlSyncJobListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _sourceControlSyncJobListResultDeserializer(result.body);
}

/** Retrieve a list of source control sync jobs. */
export function listByAutomationAccount(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  sourceControlName: string,
  options: SourceControlSyncJobListByAutomationAccountOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SourceControlSyncJob> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listByAutomationAccountSend(
        context,
        resourceGroupName,
        automationAccountName,
        sourceControlName,
        options,
      ),
    _listByAutomationAccountDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2024-10-23" },
  );
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  sourceControlName: string,
  sourceControlSyncJobId: string,
  options: SourceControlSyncJobGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/sourceControls/{sourceControlName}/sourceControlSyncJobs/{sourceControlSyncJobId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      automationAccountName: automationAccountName,
      sourceControlName: sourceControlName,
      sourceControlSyncJobId: sourceControlSyncJobId,
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

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<SourceControlSyncJobById> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return sourceControlSyncJobByIdDeserializer(result.body);
}

/** Retrieve the source control sync job identified by job id. */
export async function get(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  sourceControlName: string,
  sourceControlSyncJobId: string,
  options: SourceControlSyncJobGetOptionalParams = { requestOptions: {} },
): Promise<SourceControlSyncJobById> {
  const result = await _getSend(
    context,
    resourceGroupName,
    automationAccountName,
    sourceControlName,
    sourceControlSyncJobId,
    options,
  );
  return _getDeserialize(result);
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  sourceControlName: string,
  sourceControlSyncJobId: string,
  parameters: SourceControlSyncJobCreateParameters,
  options: SourceControlSyncJobCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/sourceControls/{sourceControlName}/sourceControlSyncJobs/{sourceControlSyncJobId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      automationAccountName: automationAccountName,
      sourceControlName: sourceControlName,
      sourceControlSyncJobId: sourceControlSyncJobId,
      "api%2Dversion": context.apiVersion ?? "2024-10-23",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: sourceControlSyncJobCreateParametersSerializer(parameters),
  });
}

export async function _createDeserialize(
  result: PathUncheckedResponse,
): Promise<SourceControlSyncJob> {
  const expectedStatuses = ["201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return sourceControlSyncJobDeserializer(result.body);
}

/** Creates the sync job for a source control. */
export async function create(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  sourceControlName: string,
  sourceControlSyncJobId: string,
  parameters: SourceControlSyncJobCreateParameters,
  options: SourceControlSyncJobCreateOptionalParams = { requestOptions: {} },
): Promise<SourceControlSyncJob> {
  const result = await _createSend(
    context,
    resourceGroupName,
    automationAccountName,
    sourceControlName,
    sourceControlSyncJobId,
    parameters,
    options,
  );
  return _createDeserialize(result);
}

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureResilienceManagementContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  DrillRun,
  drillRunDeserializer,
  _DrillRunListResult,
  _drillRunListResultDeserializer,
  DrillRunFailoverRequest,
  drillRunFailoverRequestSerializer,
  DrillRunAddNotesRequest,
  drillRunAddNotesRequestSerializer,
  MarkAsCompleteRequest,
  markAsCompleteRequestSerializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  DrillRunsMarkAsCompleteOptionalParams,
  DrillRunsResumeOptionalParams,
  DrillRunsAddNotesOptionalParams,
  DrillRunsReprotectOptionalParams,
  DrillRunsFailOverOptionalParams,
  DrillRunsListOptionalParams,
  DrillRunsGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _markAsCompleteSend(
  context: Client,
  serviceGroupName: string,
  operationId: string,
  drillName: string,
  drillRunName: string,
  body: MarkAsCompleteRequest,
  options: DrillRunsMarkAsCompleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/serviceGroups/{serviceGroupName}/providers/Microsoft.AzureResilienceManagement/drills/{drillName}/drillRuns/{drillRunName}/markAsComplete{?api%2Dversion}",
    {
      serviceGroupName: serviceGroupName,
      drillName: drillName,
      drillRunName: drillRunName,
      "api%2Dversion": context.apiVersion ?? "2026-04-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      "operation-id": operationId,
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: markAsCompleteRequestSerializer(body),
  });
}

export async function _markAsCompleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** This enables the user to mark this stage as complete, disabling further retries on it. */
export function markAsComplete(
  context: Client,
  serviceGroupName: string,
  operationId: string,
  drillName: string,
  drillRunName: string,
  body: MarkAsCompleteRequest,
  options: DrillRunsMarkAsCompleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _markAsCompleteDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _markAsCompleteSend(
        context,
        serviceGroupName,
        operationId,
        drillName,
        drillRunName,
        body,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-04-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _resumeSend(
  context: Client,
  serviceGroupName: string,
  operationId: string,
  drillName: string,
  drillRunName: string,
  options: DrillRunsResumeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/serviceGroups/{serviceGroupName}/providers/Microsoft.AzureResilienceManagement/drills/{drillName}/drillRuns/{drillRunName}/resume{?api%2Dversion}",
    {
      serviceGroupName: serviceGroupName,
      drillName: drillName,
      drillRunName: drillRunName,
      "api%2Dversion": context.apiVersion ?? "2026-04-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: {
      "operation-id": operationId,
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _resumeDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** This unblocks a Failover workflow that is paused after the Fault stage, to proceed to the Failover stage. */
export function resume(
  context: Client,
  serviceGroupName: string,
  operationId: string,
  drillName: string,
  drillRunName: string,
  options: DrillRunsResumeOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _resumeDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _resumeSend(context, serviceGroupName, operationId, drillName, drillRunName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-04-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _addNotesSend(
  context: Client,
  serviceGroupName: string,
  operationId: string,
  drillName: string,
  drillRunName: string,
  body: DrillRunAddNotesRequest,
  options: DrillRunsAddNotesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/serviceGroups/{serviceGroupName}/providers/Microsoft.AzureResilienceManagement/drills/{drillName}/drillRuns/{drillRunName}/addNotes{?api%2Dversion}",
    {
      serviceGroupName: serviceGroupName,
      drillName: drillName,
      drillRunName: drillRunName,
      "api%2Dversion": context.apiVersion ?? "2026-04-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      "operation-id": operationId,
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: drillRunAddNotesRequestSerializer(body),
  });
}

export async function _addNotesDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** This enables the user to add notes on this Drill Run. */
export function addNotes(
  context: Client,
  serviceGroupName: string,
  operationId: string,
  drillName: string,
  drillRunName: string,
  body: DrillRunAddNotesRequest,
  options: DrillRunsAddNotesOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _addNotesDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _addNotesSend(context, serviceGroupName, operationId, drillName, drillRunName, body, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-04-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _reprotectSend(
  context: Client,
  serviceGroupName: string,
  operationId: string,
  drillName: string,
  drillRunName: string,
  options: DrillRunsReprotectOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/serviceGroups/{serviceGroupName}/providers/Microsoft.AzureResilienceManagement/drills/{drillName}/drillRuns/{drillRunName}/reprotect{?api%2Dversion}",
    {
      serviceGroupName: serviceGroupName,
      drillName: drillName,
      drillRunName: drillRunName,
      "api%2Dversion": context.apiVersion ?? "2026-04-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: {
      "operation-id": operationId,
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _reprotectDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** This initiates a new Reprotect operation on this Drill Run. */
export function reprotect(
  context: Client,
  serviceGroupName: string,
  operationId: string,
  drillName: string,
  drillRunName: string,
  options: DrillRunsReprotectOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _reprotectDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _reprotectSend(context, serviceGroupName, operationId, drillName, drillRunName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-04-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _failOverSend(
  context: Client,
  serviceGroupName: string,
  operationId: string,
  drillName: string,
  drillRunName: string,
  body: DrillRunFailoverRequest,
  options: DrillRunsFailOverOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/serviceGroups/{serviceGroupName}/providers/Microsoft.AzureResilienceManagement/drills/{drillName}/drillRuns/{drillRunName}/failOver{?api%2Dversion}",
    {
      serviceGroupName: serviceGroupName,
      drillName: drillName,
      drillRunName: drillRunName,
      "api%2Dversion": context.apiVersion ?? "2026-04-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      "operation-id": operationId,
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: drillRunFailoverRequestSerializer(body),
  });
}

export async function _failOverDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** This initiates a new Failover operation on this Drill Run. */
export function failOver(
  context: Client,
  serviceGroupName: string,
  operationId: string,
  drillName: string,
  drillRunName: string,
  body: DrillRunFailoverRequest,
  options: DrillRunsFailOverOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _failOverDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _failOverSend(context, serviceGroupName, operationId, drillName, drillRunName, body, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-04-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _listSend(
  context: Client,
  serviceGroupName: string,
  drillName: string,
  options: DrillRunsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/serviceGroups/{serviceGroupName}/providers/Microsoft.AzureResilienceManagement/drills/{drillName}/drillRuns{?api%2Dversion}",
    {
      serviceGroupName: serviceGroupName,
      drillName: drillName,
      "api%2Dversion": context.apiVersion ?? "2026-04-01-preview",
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
): Promise<_DrillRunListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _drillRunListResultDeserializer(result.body);
}

/** List DrillRun resources by Drill */
export function list(
  context: Client,
  serviceGroupName: string,
  drillName: string,
  options: DrillRunsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DrillRun> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, serviceGroupName, drillName, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-04-01-preview",
    },
  );
}

export function _getSend(
  context: Client,
  serviceGroupName: string,
  drillName: string,
  drillRunName: string,
  options: DrillRunsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/serviceGroups/{serviceGroupName}/providers/Microsoft.AzureResilienceManagement/drills/{drillName}/drillRuns/{drillRunName}{?api%2Dversion}",
    {
      serviceGroupName: serviceGroupName,
      drillName: drillName,
      drillRunName: drillRunName,
      "api%2Dversion": context.apiVersion ?? "2026-04-01-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<DrillRun> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return drillRunDeserializer(result.body);
}

/** Get a DrillRun */
export async function get(
  context: Client,
  serviceGroupName: string,
  drillName: string,
  drillRunName: string,
  options: DrillRunsGetOptionalParams = { requestOptions: {} },
): Promise<DrillRun> {
  const result = await _getSend(context, serviceGroupName, drillName, drillRunName, options);
  return _getDeserialize(result);
}

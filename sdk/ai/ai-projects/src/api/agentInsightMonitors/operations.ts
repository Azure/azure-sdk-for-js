// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AIProjectContext as Client } from "../index.js";
import { apiErrorResponseDeserializer, _agentsPagedResultAgentInsightMonitorListItemDeserializer, agentInsightMonitorDeserializer, agentInsightRunDeserializer, agentInsightRunResultDeserializer, _agentsPagedResultAgentInsightRunDeserializer, _agentsPagedResultAgentInsightDeserializer, agentInsightDeserializer, agentInsightPrioritiesSerializer } from "../../models/models.js";
import type { _AgentsPagedResultAgentInsightMonitorListItem, AgentInsightMonitorListItem, AgentInsightMonitor, AgentInsightRun, AgentInsightRunResult, _AgentsPagedResultAgentInsightRun, _AgentsPagedResultAgentInsight, AgentInsight } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "@azure/core-paging";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { AgentInsightMonitorsUpdateInsightOptionalParams, AgentInsightMonitorsGetInsightOptionalParams, AgentInsightMonitorsListInsightsOptionalParams, AgentInsightMonitorsCancelRunOptionalParams, AgentInsightMonitorsGetRunOptionalParams, AgentInsightMonitorsListRunsOptionalParams, AgentInsightMonitorsCreateRunOptionalParams, AgentInsightMonitorsResetOptionalParams, AgentInsightMonitorsUpdateOptionalParams, AgentInsightMonitorsDeleteOptionalParams, AgentInsightMonitorsGetOptionalParams, AgentInsightMonitorsCreateOptionalParams, AgentInsightMonitorsListOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { RunPoller } from "../../static-helpers/pollingHelpers.js";
import { getRunPoller } from "../../static-helpers/pollingHelpers.js";

export function _updateInsightSend(
  context: Client,
  monitorId: string,
  insightId: string,
  options: AgentInsightMonitorsUpdateInsightOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agent_insight_monitors/{monitor_id}/insights/{insight_id}{?api-version}",
    {
      monitor_id: monitorId,
      insight_id: insightId,
      "api-version": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .patch({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/merge-patch+json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: { status: options?.status },
    });
}

export async function _updateInsightDeserialize(
  result: PathUncheckedResponse,
): Promise<AgentInsight> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return agentInsightDeserializer(result.body);
}

/** Update the lifecycle status of an insight. */
export async function updateInsight(
  context: Client,
  monitorId: string,
  insightId: string,
  options: AgentInsightMonitorsUpdateInsightOptionalParams = { requestOptions: {} },
): Promise<AgentInsight> {
  const result = await _updateInsightSend(context, monitorId, insightId, options);
  return _updateInsightDeserialize(result);
}

export function _getInsightSend(
  context: Client,
  monitorId: string,
  insightId: string,
  options: AgentInsightMonitorsGetInsightOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agent_insight_monitors/{monitor_id}/insights/{insight_id}{?api-version,include_details}",
    {
      monitor_id: monitorId,
      insight_id: insightId,
      include_details: options?.includeDetails,
      "api-version": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _getInsightDeserialize(result: PathUncheckedResponse): Promise<AgentInsight> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return agentInsightDeserializer(result.body);
}

/** Get a full insight for an Agent Insights monitor. */
export async function getInsight(
  context: Client,
  monitorId: string,
  insightId: string,
  options: AgentInsightMonitorsGetInsightOptionalParams = { requestOptions: {} },
): Promise<AgentInsight> {
  const result = await _getInsightSend(context, monitorId, insightId, options);
  return _getInsightDeserialize(result);
}

export function _listInsightsSend(
  context: Client,
  monitorId: string,
  options: AgentInsightMonitorsListInsightsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agent_insight_monitors/{monitor_id}/insights{?after,api-version,before,categories,include_details,limit,order,severities,statuses}",
    {
      monitor_id: monitorId,
      after: options?.after,
      before: options?.before,
      limit: options?.limit,
      order: options?.order,
      categories: !options?.categories
        ? options?.categories
        : options?.categories.map((p: any) => {
            return p;
          }),
      severities: !options?.severities
        ? options?.severities
        : options?.severities.map((p: any) => {
            return p;
          }),
      statuses: !options?.statuses
        ? options?.statuses
        : options?.statuses.map((p: any) => {
            return p;
          }),
      include_details: options?.includeDetails,
      "api-version": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _listInsightsDeserialize(
  result: PathUncheckedResponse,
): Promise<_AgentsPagedResultAgentInsight> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _agentsPagedResultAgentInsightDeserializer(result.body);
}

/** List current insights for an Agent Insights monitor. */
export function listInsights(
  context: Client,
  monitorId: string,
  options: AgentInsightMonitorsListInsightsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<AgentInsight> {
  
  const requestParameters = operationOptionsToRequestParameters(options);
  return buildPagedAsyncIterator(
    context,
    () => _listInsightsSend(context, monitorId, options),
    _listInsightsDeserialize,
    ["200"],
    {
      itemName: "data",
      apiVersion: context.apiVersion ?? "v1",
      nextPageRequestOptions: {
        ...requestParameters,
        headers: { ...requestParameters.headers },
      },
      cursorFieldName: "last_id",
      hasMoreFieldName: "has_more",
    },
  );
}

export function _cancelRunSend(
  context: Client,
  monitorId: string,
  runId: string,
  options: AgentInsightMonitorsCancelRunOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agent_insight_monitors/{monitor_id}/runs/{run_id}:cancel{?api-version}",
    {
      monitor_id: monitorId,
      run_id: runId,
      "api-version": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _cancelRunDeserialize(
  result: PathUncheckedResponse,
): Promise<AgentInsightRun> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return agentInsightRunDeserializer(result.body);
}

/** Cancel an Agent Insights run. */
export async function cancelRun(
  context: Client,
  monitorId: string,
  runId: string,
  options: AgentInsightMonitorsCancelRunOptionalParams = { requestOptions: {} },
): Promise<AgentInsightRun> {
  const result = await _cancelRunSend(context, monitorId, runId, options);
  return _cancelRunDeserialize(result);
}

export function _getRunSend(
  context: Client,
  monitorId: string,
  runId: string,
  options: AgentInsightMonitorsGetRunOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agent_insight_monitors/{monitor_id}/runs/{run_id}{?api-version}",
    {
      monitor_id: monitorId,
      run_id: runId,
      "api-version": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _getRunDeserialize(result: PathUncheckedResponse): Promise<AgentInsightRun> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return agentInsightRunDeserializer(result.body);
}

/** Get an Agent Insights run. */
export async function getRun(
  context: Client,
  monitorId: string,
  runId: string,
  options: AgentInsightMonitorsGetRunOptionalParams = { requestOptions: {} },
): Promise<AgentInsightRun> {
  const result = await _getRunSend(context, monitorId, runId, options);
  return _getRunDeserialize(result);
}

export function _listRunsSend(
  context: Client,
  monitorId: string,
  options: AgentInsightMonitorsListRunsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agent_insight_monitors/{monitor_id}/runs{?after,api-version,before,limit,order,status,trigger}",
    {
      monitor_id: monitorId,
      after: options?.after,
      before: options?.before,
      limit: options?.limit,
      order: options?.order,
      status: options?.status,
      trigger: options?.trigger,
      "api-version": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _listRunsDeserialize(
  result: PathUncheckedResponse,
): Promise<_AgentsPagedResultAgentInsightRun> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _agentsPagedResultAgentInsightRunDeserializer(result.body);
}

/** List Agent Insights runs for a monitor. */
export function listRuns(
  context: Client,
  monitorId: string,
  options: AgentInsightMonitorsListRunsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<AgentInsightRun> {
  
  const requestParameters = operationOptionsToRequestParameters(options);
  return buildPagedAsyncIterator(
    context,
    () => _listRunsSend(context, monitorId, options),
    _listRunsDeserialize,
    ["200"],
    {
      itemName: "data",
      apiVersion: context.apiVersion ?? "v1",
      nextPageRequestOptions: {
        ...requestParameters,
        headers: { ...requestParameters.headers },
      },
      cursorFieldName: "last_id",
      hasMoreFieldName: "has_more",
    },
  );
}

export function _createRunSend(
  context: Client,
  monitorId: string,
  options: AgentInsightMonitorsCreateRunOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agent_insight_monitors/{monitor_id}/runs{?api-version}",
    {
      monitor_id: monitorId,
      "api-version": context.apiVersion ?? "v1",
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
      headers: {
        ...(options?.operationId !== undefined ? { "operation-id": options?.operationId } : {}),
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      body: { lookback_hours: options?.lookbackHours },
    });
}

export async function _createRunDeserialize(
  result: PathUncheckedResponse,
): Promise<AgentInsightRunResult> {
  const expectedStatuses = ["201", "200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  if (result?.body?.result === undefined) {
    throw createRestError(
      `Expected a result in the response at position "result.body.result"`,
      result,
    );
  }

  return agentInsightRunResultDeserializer(result.body.result);
}

/** Start an Agent Insights run for a monitor. The poller exposes the created run id. */
export function createRun(
  context: Client,
  monitorId: string,
  options: AgentInsightMonitorsCreateRunOptionalParams = { requestOptions: {} },
): RunPoller<AgentInsightRunResult> {
  
  // CUSTOMIZATION: SDK-IMPROVEMENT: the emitted result omits the created run id.
  return getRunPoller(context,
 _createRunDeserialize,
 ["201", "200", "202"],
 { updateIntervalInMs: options?.updateIntervalInMs, abortSignal: options?.abortSignal, getInitialResponse: () => _createRunSend(context, monitorId, options), resourceLocationConfig: "operation-location", apiVersion: context.apiVersion ?? "v1" });
}

export function _resetSend(
  context: Client,
  monitorId: string,
  options: AgentInsightMonitorsResetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agent_insight_monitors/{monitor_id}:reset{?api-version}",
    {
      monitor_id: monitorId,
      "api-version": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _resetDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Reset an Agent Insights monitor's overview, checkpoint, and active insight state. */
export async function reset(
  context: Client,
  monitorId: string,
  options: AgentInsightMonitorsResetOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _resetSend(context, monitorId, options);
  return _resetDeserialize(result);
}

export function _updateSend(
  context: Client,
  monitorId: string,
  options: AgentInsightMonitorsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agent_insight_monitors/{monitor_id}{?api-version}",
    {
      monitor_id: monitorId,
      "api-version": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .patch({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/merge-patch+json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: {
        enabled: options?.enabled,
        run_interval_hours: options?.runIntervalHours,
        model_deployment_name: options?.modelDeploymentName,
        priorities: !options?.priorities
          ? options?.priorities
          : agentInsightPrioritiesSerializer(options?.priorities),
      },
    });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<AgentInsightMonitor> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return agentInsightMonitorDeserializer(result.body);
}

/** Update an Agent Insights monitor. */
export async function update(
  context: Client,
  monitorId: string,
  options: AgentInsightMonitorsUpdateOptionalParams = { requestOptions: {} },
): Promise<AgentInsightMonitor> {
  const result = await _updateSend(context, monitorId, options);
  return _updateDeserialize(result);
}

export function _deleteAgentInsightMonitorSend(
  context: Client,
  monitorId: string,
  options: AgentInsightMonitorsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agent_insight_monitors/{monitor_id}{?api-version}",
    {
      monitor_id: monitorId,
      "api-version": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteAgentInsightMonitorDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Delete an Agent Insights monitor and all of its runs, insights, and state. */
export async function deleteAgentInsightMonitor(
  context: Client,
  monitorId: string,
  options: AgentInsightMonitorsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteAgentInsightMonitorSend(context, monitorId, options);
  return _deleteAgentInsightMonitorDeserialize(result);
}

export function _getSend(
  context: Client,
  monitorId: string,
  options: AgentInsightMonitorsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agent_insight_monitors/{monitor_id}{?api-version}",
    {
      monitor_id: monitorId,
      "api-version": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _getDeserialize(result: PathUncheckedResponse): Promise<AgentInsightMonitor> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return agentInsightMonitorDeserializer(result.body);
}

/** Get an Agent Insights monitor. */
export async function get(
  context: Client,
  monitorId: string,
  options: AgentInsightMonitorsGetOptionalParams = { requestOptions: {} },
): Promise<AgentInsightMonitor> {
  const result = await _getSend(context, monitorId, options);
  return _getDeserialize(result);
}

export function _createSend(
  context: Client,
  agentName: string,
  modelDeploymentName: string,
  options: AgentInsightMonitorsCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agent_insight_monitors{?api-version}",
    {
      "api-version": context.apiVersion ?? "v1",
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
      body: {
        agent_name: agentName,
        enabled: options?.enabled,
        run_interval_hours: options?.runIntervalHours,
        model_deployment_name: modelDeploymentName,
        priorities: !options?.priorities
          ? options?.priorities
          : agentInsightPrioritiesSerializer(options?.priorities),
      },
    });
}

export async function _createDeserialize(
  result: PathUncheckedResponse,
): Promise<AgentInsightMonitor> {
  const expectedStatuses = ["201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return agentInsightMonitorDeserializer(result.body);
}

/** Create an Agent Insights monitor for an agent. */
export async function create(
  context: Client,
  agentName: string,
  modelDeploymentName: string,
  options: AgentInsightMonitorsCreateOptionalParams = { requestOptions: {} },
): Promise<AgentInsightMonitor> {
  const result = await _createSend(context, agentName, modelDeploymentName, options);
  return _createDeserialize(result);
}

export function _listSend(
  context: Client,
  options: AgentInsightMonitorsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agent_insight_monitors{?after,agent_name,api-version,before,limit,order}",
    {
      after: options?.after,
      before: options?.before,
      limit: options?.limit,
      order: options?.order,
      agent_name: options?.agentName,
      "api-version": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_AgentsPagedResultAgentInsightMonitorListItem> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _agentsPagedResultAgentInsightMonitorListItemDeserializer(result.body);
}

/** List Agent Insights monitors, optionally filtered by agent name. */
export function list(
  context: Client,
  options: AgentInsightMonitorsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<AgentInsightMonitorListItem> {
  
  const requestParameters = operationOptionsToRequestParameters(options);
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "data",
      apiVersion: context.apiVersion ?? "v1",
      nextPageRequestOptions: {
        ...requestParameters,
        headers: { ...requestParameters.headers },
      },
      cursorFieldName: "last_id",
      hasMoreFieldName: "has_more",
    },
  );
}

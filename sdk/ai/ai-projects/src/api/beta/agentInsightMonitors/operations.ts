// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AIProjectContext as Client } from "../../index.js";
import {
  apiErrorResponseDeserializer,
  _AgentsPagedResultAgentInsightMonitorListItem,
  _agentsPagedResultAgentInsightMonitorListItemDeserializer,
  AgentInsightMonitorListItem,
  AgentInsightMonitorCreate,
  agentInsightMonitorCreateSerializer,
  AgentInsightMonitor,
  agentInsightMonitorDeserializer,
  AgentInsightMonitorUpdate,
  agentInsightMonitorUpdateSerializer,
  AgentInsightRunCreate,
  agentInsightRunCreateSerializer,
  AgentInsightRun,
  agentInsightRunDeserializer,
  AgentInsightRunResult,
  agentInsightRunResultDeserializer,
  _AgentsPagedResultAgentInsightRun,
  _agentsPagedResultAgentInsightRunDeserializer,
  _AgentsPagedResultAgentInsight,
  _agentsPagedResultAgentInsightDeserializer,
  AgentInsight,
  agentInsightDeserializer,
  AgentInsightUpdate,
  agentInsightUpdateSerializer,
} from "../../../models/models.js";
import { buildPagedAsyncIterator } from "../../../static-helpers/pagingHelpers.js";
import type { PagedAsyncIterableIterator } from "@azure/core-paging";
import { getLongRunningPoller } from "../../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../../static-helpers/urlTemplate.js";
import {
  BetaAgentInsightMonitorsUpdateInsightOptionalParams,
  BetaAgentInsightMonitorsGetInsightOptionalParams,
  BetaAgentInsightMonitorsListInsightsOptionalParams,
  BetaAgentInsightMonitorsCancelRunOptionalParams,
  BetaAgentInsightMonitorsGetRunOptionalParams,
  BetaAgentInsightMonitorsListRunsOptionalParams,
  BetaAgentInsightMonitorsCreateRunOptionalParams,
  BetaAgentInsightMonitorsResetOptionalParams,
  BetaAgentInsightMonitorsUpdateOptionalParams,
  BetaAgentInsightMonitorsDeleteOptionalParams,
  BetaAgentInsightMonitorsGetOptionalParams,
  BetaAgentInsightMonitorsCreateOptionalParams,
  BetaAgentInsightMonitorsListOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _updateInsightSend(
  context: Client,
  monitorId: string,
  insightId: string,
  update: AgentInsightUpdate,
  options: BetaAgentInsightMonitorsUpdateInsightOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agent_insight_monitors/{monitor_id}/insights/{insight_id}{?api%2Dversion}",
    {
      monitor_id: monitorId,
      insight_id: insightId,
      "api%2Dversion": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/merge-patch+json",
    headers: {
      ...(options?.foundryFeatures !== undefined
        ? { "foundry-features": options?.foundryFeatures }
        : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: agentInsightUpdateSerializer(update),
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
  update: AgentInsightUpdate,
  options: BetaAgentInsightMonitorsUpdateInsightOptionalParams = { requestOptions: {} },
): Promise<AgentInsight> {
  const result = await _updateInsightSend(context, monitorId, insightId, update, options);
  return _updateInsightDeserialize(result);
}

export function _getInsightSend(
  context: Client,
  monitorId: string,
  insightId: string,
  options: BetaAgentInsightMonitorsGetInsightOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agent_insight_monitors/{monitor_id}/insights/{insight_id}{?include_details,api%2Dversion}",
    {
      monitor_id: monitorId,
      insight_id: insightId,
      include_details: options?.includeDetails,
      "api%2Dversion": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.foundryFeatures !== undefined
        ? { "foundry-features": options?.foundryFeatures }
        : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
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
  options: BetaAgentInsightMonitorsGetInsightOptionalParams = { requestOptions: {} },
): Promise<AgentInsight> {
  const result = await _getInsightSend(context, monitorId, insightId, options);
  return _getInsightDeserialize(result);
}

export function _listInsightsSend(
  context: Client,
  monitorId: string,
  options: BetaAgentInsightMonitorsListInsightsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agent_insight_monitors/{monitor_id}/insights{?after,before,limit,order,category,severity,status,include_details,api%2Dversion}",
    {
      monitor_id: monitorId,
      after: options?.after,
      before: options?.before,
      limit: options?.limit,
      order: options?.order,
      category: options?.category,
      severity: options?.severity,
      status: options?.status,
      include_details: options?.includeDetails,
      "api%2Dversion": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.foundryFeatures !== undefined
        ? { "foundry-features": options?.foundryFeatures }
        : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
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
  options: BetaAgentInsightMonitorsListInsightsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<AgentInsight> {
  return buildPagedAsyncIterator(
    context,
    () => _listInsightsSend(context, monitorId, options),
    _listInsightsDeserialize,
    ["200"],
    { itemName: "data", apiVersion: context.apiVersion ?? "v1" },
  );
}

export function _cancelRunSend(
  context: Client,
  monitorId: string,
  runId: string,
  options: BetaAgentInsightMonitorsCancelRunOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agent_insight_monitors/{monitor_id}/runs/{run_id}:cancel{?api%2Dversion}",
    {
      monitor_id: monitorId,
      run_id: runId,
      "api%2Dversion": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.foundryFeatures !== undefined
        ? { "foundry-features": options?.foundryFeatures }
        : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
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
  options: BetaAgentInsightMonitorsCancelRunOptionalParams = { requestOptions: {} },
): Promise<AgentInsightRun> {
  const result = await _cancelRunSend(context, monitorId, runId, options);
  return _cancelRunDeserialize(result);
}

export function _getRunSend(
  context: Client,
  monitorId: string,
  runId: string,
  options: BetaAgentInsightMonitorsGetRunOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agent_insight_monitors/{monitor_id}/runs/{run_id}{?api%2Dversion}",
    {
      monitor_id: monitorId,
      run_id: runId,
      "api%2Dversion": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.foundryFeatures !== undefined
        ? { "foundry-features": options?.foundryFeatures }
        : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
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
  options: BetaAgentInsightMonitorsGetRunOptionalParams = { requestOptions: {} },
): Promise<AgentInsightRun> {
  const result = await _getRunSend(context, monitorId, runId, options);
  return _getRunDeserialize(result);
}

export function _listRunsSend(
  context: Client,
  monitorId: string,
  options: BetaAgentInsightMonitorsListRunsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agent_insight_monitors/{monitor_id}/runs{?after,before,limit,order,status,trigger,api%2Dversion}",
    {
      monitor_id: monitorId,
      after: options?.after,
      before: options?.before,
      limit: options?.limit,
      order: options?.order,
      status: options?.status,
      trigger: options?.trigger,
      "api%2Dversion": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.foundryFeatures !== undefined
        ? { "foundry-features": options?.foundryFeatures }
        : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
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
  options: BetaAgentInsightMonitorsListRunsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<AgentInsightRun> {
  return buildPagedAsyncIterator(
    context,
    () => _listRunsSend(context, monitorId, options),
    _listRunsDeserialize,
    ["200"],
    { itemName: "data", apiVersion: context.apiVersion ?? "v1" },
  );
}

export function _createRunSend(
  context: Client,
  monitorId: string,
  run: AgentInsightRunCreate,
  options: BetaAgentInsightMonitorsCreateRunOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agent_insight_monitors/{monitor_id}/runs{?api%2Dversion}",
    {
      monitor_id: monitorId,
      "api%2Dversion": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      ...(options?.foundryFeatures !== undefined
        ? { "foundry-features": options?.foundryFeatures }
        : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: agentInsightRunCreateSerializer(run),
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

/** Start an Agent Insights run for a monitor. */
export function createRun(
  context: Client,
  monitorId: string,
  run: AgentInsightRunCreate,
  options: BetaAgentInsightMonitorsCreateRunOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<AgentInsightRunResult>, AgentInsightRunResult> {
  return getLongRunningPoller(context, _createRunDeserialize, ["201", "200", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _createRunSend(context, monitorId, run, options),
    resourceLocationConfig: "operation-location",
    apiVersion: context.apiVersion ?? "v1",
  }) as PollerLike<OperationState<AgentInsightRunResult>, AgentInsightRunResult>;
}

export function _resetSend(
  context: Client,
  monitorId: string,
  options: BetaAgentInsightMonitorsResetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agent_insight_monitors/{monitor_id}:reset{?api%2Dversion}",
    {
      monitor_id: monitorId,
      "api%2Dversion": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.foundryFeatures !== undefined
        ? { "foundry-features": options?.foundryFeatures }
        : {}),
      ...options.requestOptions?.headers,
    },
  });
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
  options: BetaAgentInsightMonitorsResetOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _resetSend(context, monitorId, options);
  return _resetDeserialize(result);
}

export function _updateSend(
  context: Client,
  monitorId: string,
  monitor: AgentInsightMonitorUpdate,
  options: BetaAgentInsightMonitorsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agent_insight_monitors/{monitor_id}{?api%2Dversion}",
    {
      monitor_id: monitorId,
      "api%2Dversion": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/merge-patch+json",
    headers: {
      ...(options?.foundryFeatures !== undefined
        ? { "foundry-features": options?.foundryFeatures }
        : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: agentInsightMonitorUpdateSerializer(monitor),
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
  monitor: AgentInsightMonitorUpdate,
  options: BetaAgentInsightMonitorsUpdateOptionalParams = { requestOptions: {} },
): Promise<AgentInsightMonitor> {
  const result = await _updateSend(context, monitorId, monitor, options);
  return _updateDeserialize(result);
}

export function _deleteAgentInsightMonitorSend(
  context: Client,
  monitorId: string,
  options: BetaAgentInsightMonitorsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agent_insight_monitors/{monitor_id}{?api%2Dversion}",
    {
      monitor_id: monitorId,
      "api%2Dversion": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.foundryFeatures !== undefined
        ? { "foundry-features": options?.foundryFeatures }
        : {}),
      ...options.requestOptions?.headers,
    },
  });
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
  options: BetaAgentInsightMonitorsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteAgentInsightMonitorSend(context, monitorId, options);
  return _deleteAgentInsightMonitorDeserialize(result);
}

export function _getSend(
  context: Client,
  monitorId: string,
  options: BetaAgentInsightMonitorsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agent_insight_monitors/{monitor_id}{?api%2Dversion}",
    {
      monitor_id: monitorId,
      "api%2Dversion": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.foundryFeatures !== undefined
        ? { "foundry-features": options?.foundryFeatures }
        : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
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
  options: BetaAgentInsightMonitorsGetOptionalParams = { requestOptions: {} },
): Promise<AgentInsightMonitor> {
  const result = await _getSend(context, monitorId, options);
  return _getDeserialize(result);
}

export function _createSend(
  context: Client,
  monitor: AgentInsightMonitorCreate,
  options: BetaAgentInsightMonitorsCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agent_insight_monitors{?api%2Dversion}",
    {
      "api%2Dversion": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      ...(options?.foundryFeatures !== undefined
        ? { "foundry-features": options?.foundryFeatures }
        : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: agentInsightMonitorCreateSerializer(monitor),
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
  monitor: AgentInsightMonitorCreate,
  options: BetaAgentInsightMonitorsCreateOptionalParams = { requestOptions: {} },
): Promise<AgentInsightMonitor> {
  const result = await _createSend(context, monitor, options);
  return _createDeserialize(result);
}

export function _listSend(
  context: Client,
  options: BetaAgentInsightMonitorsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agent_insight_monitors{?after,before,limit,order,agent_name,api%2Dversion}",
    {
      after: options?.after,
      before: options?.before,
      limit: options?.limit,
      order: options?.order,
      agent_name: options?.agentName,
      "api%2Dversion": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.foundryFeatures !== undefined
        ? { "foundry-features": options?.foundryFeatures }
        : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
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
  options: BetaAgentInsightMonitorsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<AgentInsightMonitorListItem> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    { itemName: "data", apiVersion: context.apiVersion ?? "v1" },
  );
}

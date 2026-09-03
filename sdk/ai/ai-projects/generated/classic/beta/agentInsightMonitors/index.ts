// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AIProjectContext } from "../../../api/aiProjectContext.js";
import {
  updateInsight,
  getInsight,
  listInsights,
  cancelRun,
  getRun,
  listRuns,
  createRun,
  reset,
  update,
  $delete,
  get,
  create,
  list,
} from "../../../api/beta/agentInsightMonitors/operations.js";
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
} from "../../../api/beta/agentInsightMonitors/options.js";
import {
  AgentInsightMonitorListItem,
  AgentInsightMonitorCreate,
  AgentInsightMonitor,
  AgentInsightMonitorUpdate,
  AgentInsightRunCreate,
  AgentInsightRun,
  AgentInsightRunResult,
  AgentInsight,
  AgentInsightUpdate,
} from "../../../models/models.js";
import { PagedAsyncIterableIterator } from "../../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a BetaAgentInsightMonitors operations. */
export interface BetaAgentInsightMonitorsOperations {
  /** Update the lifecycle status of an insight. */
  updateInsight: (
    foundryFeatures: "AgentInsights=V1Preview",
    monitorId: string,
    insightId: string,
    update: AgentInsightUpdate,
    options?: BetaAgentInsightMonitorsUpdateInsightOptionalParams,
  ) => Promise<AgentInsight>;
  /** Get a full insight for an Agent Insights monitor. */
  getInsight: (
    foundryFeatures: "AgentInsights=V1Preview",
    monitorId: string,
    insightId: string,
    options?: BetaAgentInsightMonitorsGetInsightOptionalParams,
  ) => Promise<AgentInsight>;
  /** List current insights for an Agent Insights monitor. */
  listInsights: (
    foundryFeatures: "AgentInsights=V1Preview",
    monitorId: string,
    options?: BetaAgentInsightMonitorsListInsightsOptionalParams,
  ) => PagedAsyncIterableIterator<AgentInsight>;
  /** Cancel an Agent Insights run. */
  cancelRun: (
    foundryFeatures: "AgentInsights=V1Preview",
    monitorId: string,
    runId: string,
    options?: BetaAgentInsightMonitorsCancelRunOptionalParams,
  ) => Promise<AgentInsightRun>;
  /** Get an Agent Insights run. */
  getRun: (
    foundryFeatures: "AgentInsights=V1Preview",
    monitorId: string,
    runId: string,
    options?: BetaAgentInsightMonitorsGetRunOptionalParams,
  ) => Promise<AgentInsightRun>;
  /** List Agent Insights runs for a monitor. */
  listRuns: (
    foundryFeatures: "AgentInsights=V1Preview",
    monitorId: string,
    options?: BetaAgentInsightMonitorsListRunsOptionalParams,
  ) => PagedAsyncIterableIterator<AgentInsightRun>;
  /** Start an Agent Insights run for a monitor. */
  createRun: (
    foundryFeatures: "AgentInsights=V1Preview",
    monitorId: string,
    run: AgentInsightRunCreate,
    options?: BetaAgentInsightMonitorsCreateRunOptionalParams,
  ) => PollerLike<OperationState<AgentInsightRunResult>, AgentInsightRunResult>;
  /** Reset an Agent Insights monitor's overview, checkpoint, and active insight state. */
  reset: (
    foundryFeatures: "AgentInsights=V1Preview",
    monitorId: string,
    options?: BetaAgentInsightMonitorsResetOptionalParams,
  ) => Promise<void>;
  /** Update an Agent Insights monitor. */
  update: (
    foundryFeatures: "AgentInsights=V1Preview",
    monitorId: string,
    monitor: AgentInsightMonitorUpdate,
    options?: BetaAgentInsightMonitorsUpdateOptionalParams,
  ) => Promise<AgentInsightMonitor>;
  /** Delete an Agent Insights monitor and all of its runs, insights, and state. */
  delete: (
    foundryFeatures: "AgentInsights=V1Preview",
    monitorId: string,
    options?: BetaAgentInsightMonitorsDeleteOptionalParams,
  ) => Promise<void>;
  /** Get an Agent Insights monitor. */
  get: (
    foundryFeatures: "AgentInsights=V1Preview",
    monitorId: string,
    options?: BetaAgentInsightMonitorsGetOptionalParams,
  ) => Promise<AgentInsightMonitor>;
  /** Create an Agent Insights monitor for an agent. */
  create: (
    foundryFeatures: "AgentInsights=V1Preview",
    monitor: AgentInsightMonitorCreate,
    options?: BetaAgentInsightMonitorsCreateOptionalParams,
  ) => Promise<AgentInsightMonitor>;
  /** List Agent Insights monitors, optionally filtered by agent name. */
  list: (
    foundryFeatures: "AgentInsights=V1Preview",
    options?: BetaAgentInsightMonitorsListOptionalParams,
  ) => PagedAsyncIterableIterator<AgentInsightMonitorListItem>;
}

function _getBetaAgentInsightMonitors(context: AIProjectContext) {
  return {
    updateInsight: (
      foundryFeatures: "AgentInsights=V1Preview",
      monitorId: string,
      insightId: string,
      update: AgentInsightUpdate,
      options?: BetaAgentInsightMonitorsUpdateInsightOptionalParams,
    ) => updateInsight(context, foundryFeatures, monitorId, insightId, update, options),
    getInsight: (
      foundryFeatures: "AgentInsights=V1Preview",
      monitorId: string,
      insightId: string,
      options?: BetaAgentInsightMonitorsGetInsightOptionalParams,
    ) => getInsight(context, foundryFeatures, monitorId, insightId, options),
    listInsights: (
      foundryFeatures: "AgentInsights=V1Preview",
      monitorId: string,
      options?: BetaAgentInsightMonitorsListInsightsOptionalParams,
    ) => listInsights(context, foundryFeatures, monitorId, options),
    cancelRun: (
      foundryFeatures: "AgentInsights=V1Preview",
      monitorId: string,
      runId: string,
      options?: BetaAgentInsightMonitorsCancelRunOptionalParams,
    ) => cancelRun(context, foundryFeatures, monitorId, runId, options),
    getRun: (
      foundryFeatures: "AgentInsights=V1Preview",
      monitorId: string,
      runId: string,
      options?: BetaAgentInsightMonitorsGetRunOptionalParams,
    ) => getRun(context, foundryFeatures, monitorId, runId, options),
    listRuns: (
      foundryFeatures: "AgentInsights=V1Preview",
      monitorId: string,
      options?: BetaAgentInsightMonitorsListRunsOptionalParams,
    ) => listRuns(context, foundryFeatures, monitorId, options),
    createRun: (
      foundryFeatures: "AgentInsights=V1Preview",
      monitorId: string,
      run: AgentInsightRunCreate,
      options?: BetaAgentInsightMonitorsCreateRunOptionalParams,
    ) => createRun(context, foundryFeatures, monitorId, run, options),
    reset: (
      foundryFeatures: "AgentInsights=V1Preview",
      monitorId: string,
      options?: BetaAgentInsightMonitorsResetOptionalParams,
    ) => reset(context, foundryFeatures, monitorId, options),
    update: (
      foundryFeatures: "AgentInsights=V1Preview",
      monitorId: string,
      monitor: AgentInsightMonitorUpdate,
      options?: BetaAgentInsightMonitorsUpdateOptionalParams,
    ) => update(context, foundryFeatures, monitorId, monitor, options),
    delete: (
      foundryFeatures: "AgentInsights=V1Preview",
      monitorId: string,
      options?: BetaAgentInsightMonitorsDeleteOptionalParams,
    ) => $delete(context, foundryFeatures, monitorId, options),
    get: (
      foundryFeatures: "AgentInsights=V1Preview",
      monitorId: string,
      options?: BetaAgentInsightMonitorsGetOptionalParams,
    ) => get(context, foundryFeatures, monitorId, options),
    create: (
      foundryFeatures: "AgentInsights=V1Preview",
      monitor: AgentInsightMonitorCreate,
      options?: BetaAgentInsightMonitorsCreateOptionalParams,
    ) => create(context, foundryFeatures, monitor, options),
    list: (
      foundryFeatures: "AgentInsights=V1Preview",
      options?: BetaAgentInsightMonitorsListOptionalParams,
    ) => list(context, foundryFeatures, options),
  };
}

export function _getBetaAgentInsightMonitorsOperations(
  context: AIProjectContext,
): BetaAgentInsightMonitorsOperations {
  return {
    ..._getBetaAgentInsightMonitors(context),
  };
}

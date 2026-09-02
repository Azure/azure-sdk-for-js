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
    monitorId: string,
    insightId: string,
    update: AgentInsightUpdate,
    options?: BetaAgentInsightMonitorsUpdateInsightOptionalParams,
  ) => Promise<AgentInsight>;
  /** Get a full insight for an Agent Insights monitor. */
  getInsight: (
    monitorId: string,
    insightId: string,
    options?: BetaAgentInsightMonitorsGetInsightOptionalParams,
  ) => Promise<AgentInsight>;
  /** List current insights for an Agent Insights monitor. */
  listInsights: (
    monitorId: string,
    options?: BetaAgentInsightMonitorsListInsightsOptionalParams,
  ) => PagedAsyncIterableIterator<AgentInsight>;
  /** Cancel an Agent Insights run. */
  cancelRun: (
    monitorId: string,
    runId: string,
    options?: BetaAgentInsightMonitorsCancelRunOptionalParams,
  ) => Promise<AgentInsightRun>;
  /** Get an Agent Insights run. */
  getRun: (
    monitorId: string,
    runId: string,
    options?: BetaAgentInsightMonitorsGetRunOptionalParams,
  ) => Promise<AgentInsightRun>;
  /** List Agent Insights runs for a monitor. */
  listRuns: (
    monitorId: string,
    options?: BetaAgentInsightMonitorsListRunsOptionalParams,
  ) => PagedAsyncIterableIterator<AgentInsightRun>;
  /** Start an Agent Insights run for a monitor. */
  createRun: (
    monitorId: string,
    run: AgentInsightRunCreate,
    options?: BetaAgentInsightMonitorsCreateRunOptionalParams,
  ) => PollerLike<OperationState<AgentInsightRunResult>, AgentInsightRunResult>;
  /** Reset an Agent Insights monitor's overview, checkpoint, and active insight state. */
  reset: (
    monitorId: string,
    options?: BetaAgentInsightMonitorsResetOptionalParams,
  ) => Promise<void>;
  /** Update an Agent Insights monitor. */
  update: (
    monitorId: string,
    monitor: AgentInsightMonitorUpdate,
    options?: BetaAgentInsightMonitorsUpdateOptionalParams,
  ) => Promise<AgentInsightMonitor>;
  /** Delete an Agent Insights monitor and all of its runs, insights, and state. */
  delete: (
    monitorId: string,
    options?: BetaAgentInsightMonitorsDeleteOptionalParams,
  ) => Promise<void>;
  /** Get an Agent Insights monitor. */
  get: (
    monitorId: string,
    options?: BetaAgentInsightMonitorsGetOptionalParams,
  ) => Promise<AgentInsightMonitor>;
  /** Create an Agent Insights monitor for an agent. */
  create: (
    monitor: AgentInsightMonitorCreate,
    options?: BetaAgentInsightMonitorsCreateOptionalParams,
  ) => Promise<AgentInsightMonitor>;
  /** List Agent Insights monitors, optionally filtered by agent name. */
  list: (
    options?: BetaAgentInsightMonitorsListOptionalParams,
  ) => PagedAsyncIterableIterator<AgentInsightMonitorListItem>;
}

function _getBetaAgentInsightMonitors(context: AIProjectContext) {
  return {
    updateInsight: (
      monitorId: string,
      insightId: string,
      update: AgentInsightUpdate,
      options?: BetaAgentInsightMonitorsUpdateInsightOptionalParams,
    ) => updateInsight(context, monitorId, insightId, update, options),
    getInsight: (
      monitorId: string,
      insightId: string,
      options?: BetaAgentInsightMonitorsGetInsightOptionalParams,
    ) => getInsight(context, monitorId, insightId, options),
    listInsights: (
      monitorId: string,
      options?: BetaAgentInsightMonitorsListInsightsOptionalParams,
    ) => listInsights(context, monitorId, options),
    cancelRun: (
      monitorId: string,
      runId: string,
      options?: BetaAgentInsightMonitorsCancelRunOptionalParams,
    ) => cancelRun(context, monitorId, runId, options),
    getRun: (
      monitorId: string,
      runId: string,
      options?: BetaAgentInsightMonitorsGetRunOptionalParams,
    ) => getRun(context, monitorId, runId, options),
    listRuns: (monitorId: string, options?: BetaAgentInsightMonitorsListRunsOptionalParams) =>
      listRuns(context, monitorId, options),
    createRun: (
      monitorId: string,
      run: AgentInsightRunCreate,
      options?: BetaAgentInsightMonitorsCreateRunOptionalParams,
    ) => createRun(context, monitorId, run, options),
    reset: (monitorId: string, options?: BetaAgentInsightMonitorsResetOptionalParams) =>
      reset(context, monitorId, options),
    update: (
      monitorId: string,
      monitor: AgentInsightMonitorUpdate,
      options?: BetaAgentInsightMonitorsUpdateOptionalParams,
    ) => update(context, monitorId, monitor, options),
    delete: (monitorId: string, options?: BetaAgentInsightMonitorsDeleteOptionalParams) =>
      $delete(context, monitorId, options),
    get: (monitorId: string, options?: BetaAgentInsightMonitorsGetOptionalParams) =>
      get(context, monitorId, options),
    create: (
      monitor: AgentInsightMonitorCreate,
      options?: BetaAgentInsightMonitorsCreateOptionalParams,
    ) => create(context, monitor, options),
    list: (options?: BetaAgentInsightMonitorsListOptionalParams) => list(context, options),
  };
}

export function _getBetaAgentInsightMonitorsOperations(
  context: AIProjectContext,
): BetaAgentInsightMonitorsOperations {
  return {
    ..._getBetaAgentInsightMonitors(context),
  };
}

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AIProjectContext } from "../../api/aiProjectContext.js";
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
} from "../../api/agentInsightMonitors/operations.js";
import {
  AgentInsightMonitorsUpdateInsightOptionalParams,
  AgentInsightMonitorsGetInsightOptionalParams,
  AgentInsightMonitorsListInsightsOptionalParams,
  AgentInsightMonitorsCancelRunOptionalParams,
  AgentInsightMonitorsGetRunOptionalParams,
  AgentInsightMonitorsListRunsOptionalParams,
  AgentInsightMonitorsCreateRunOptionalParams,
  AgentInsightMonitorsResetOptionalParams,
  AgentInsightMonitorsUpdateOptionalParams,
  AgentInsightMonitorsDeleteOptionalParams,
  AgentInsightMonitorsGetOptionalParams,
  AgentInsightMonitorsCreateOptionalParams,
  AgentInsightMonitorsListOptionalParams,
} from "../../api/agentInsightMonitors/options.js";
import {
  AgentInsightMonitorListItem,
  AgentInsightMonitor,
  AgentInsightRun,
  AgentInsightRunResult,
  AgentInsight,
} from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a AgentInsightMonitors operations. */
export interface AgentInsightMonitorsOperations {
  /** Update the lifecycle status of an insight. */
  updateInsight: (
    monitorId: string,
    insightId: string,
    options?: AgentInsightMonitorsUpdateInsightOptionalParams,
  ) => Promise<AgentInsight>;
  /** Get a full insight for an Agent Insights monitor. */
  getInsight: (
    monitorId: string,
    insightId: string,
    options?: AgentInsightMonitorsGetInsightOptionalParams,
  ) => Promise<AgentInsight>;
  /** List current insights for a monitor. Filter types combine with AND; values within each list combine with OR. */
  listInsights: (
    monitorId: string,
    options?: AgentInsightMonitorsListInsightsOptionalParams,
  ) => PagedAsyncIterableIterator<AgentInsight>;
  /** Cancel an Agent Insights run. */
  cancelRun: (
    monitorId: string,
    runId: string,
    options?: AgentInsightMonitorsCancelRunOptionalParams,
  ) => Promise<AgentInsightRun>;
  /** Get an Agent Insights run. */
  getRun: (
    monitorId: string,
    runId: string,
    options?: AgentInsightMonitorsGetRunOptionalParams,
  ) => Promise<AgentInsightRun>;
  /** List Agent Insights runs for a monitor. */
  listRuns: (
    monitorId: string,
    options?: AgentInsightMonitorsListRunsOptionalParams,
  ) => PagedAsyncIterableIterator<AgentInsightRun>;
  /** Start an Agent Insights run for a monitor. */
  createRun: (
    monitorId: string,
    options?: AgentInsightMonitorsCreateRunOptionalParams,
  ) => PollerLike<OperationState<AgentInsightRunResult>, AgentInsightRunResult>;
  /** Reset an Agent Insights monitor's generated summary, checkpoint, and active insight state. */
  reset: (monitorId: string, options?: AgentInsightMonitorsResetOptionalParams) => Promise<void>;
  /** Update an Agent Insights monitor. */
  update: (
    monitorId: string,
    options?: AgentInsightMonitorsUpdateOptionalParams,
  ) => Promise<AgentInsightMonitor>;
  /** Delete an Agent Insights monitor and all of its runs, insights, and state. */
  delete: (monitorId: string, options?: AgentInsightMonitorsDeleteOptionalParams) => Promise<void>;
  /** Get an Agent Insights monitor. */
  get: (
    monitorId: string,
    options?: AgentInsightMonitorsGetOptionalParams,
  ) => Promise<AgentInsightMonitor>;
  /** Create an Agent Insights monitor for an agent. */
  create: (
    agentName: string,
    modelDeploymentName: string,
    options?: AgentInsightMonitorsCreateOptionalParams,
  ) => Promise<AgentInsightMonitor>;
  /** List Agent Insights monitors, optionally filtered by agent name. */
  list: (
    options?: AgentInsightMonitorsListOptionalParams,
  ) => PagedAsyncIterableIterator<AgentInsightMonitorListItem>;
}

function _getAgentInsightMonitors(context: AIProjectContext) {
  return {
    updateInsight: (
      monitorId: string,
      insightId: string,
      options?: AgentInsightMonitorsUpdateInsightOptionalParams,
    ) => updateInsight(context, monitorId, insightId, options),
    getInsight: (
      monitorId: string,
      insightId: string,
      options?: AgentInsightMonitorsGetInsightOptionalParams,
    ) => getInsight(context, monitorId, insightId, options),
    listInsights: (monitorId: string, options?: AgentInsightMonitorsListInsightsOptionalParams) =>
      listInsights(context, monitorId, options),
    cancelRun: (
      monitorId: string,
      runId: string,
      options?: AgentInsightMonitorsCancelRunOptionalParams,
    ) => cancelRun(context, monitorId, runId, options),
    getRun: (
      monitorId: string,
      runId: string,
      options?: AgentInsightMonitorsGetRunOptionalParams,
    ) => getRun(context, monitorId, runId, options),
    listRuns: (monitorId: string, options?: AgentInsightMonitorsListRunsOptionalParams) =>
      listRuns(context, monitorId, options),
    createRun: (monitorId: string, options?: AgentInsightMonitorsCreateRunOptionalParams) =>
      createRun(context, monitorId, options),
    reset: (monitorId: string, options?: AgentInsightMonitorsResetOptionalParams) =>
      reset(context, monitorId, options),
    update: (monitorId: string, options?: AgentInsightMonitorsUpdateOptionalParams) =>
      update(context, monitorId, options),
    delete: (monitorId: string, options?: AgentInsightMonitorsDeleteOptionalParams) =>
      $delete(context, monitorId, options),
    get: (monitorId: string, options?: AgentInsightMonitorsGetOptionalParams) =>
      get(context, monitorId, options),
    create: (
      agentName: string,
      modelDeploymentName: string,
      options?: AgentInsightMonitorsCreateOptionalParams,
    ) => create(context, agentName, modelDeploymentName, options),
    list: (options?: AgentInsightMonitorsListOptionalParams) => list(context, options),
  };
}

export function _getAgentInsightMonitorsOperations(
  context: AIProjectContext,
): AgentInsightMonitorsOperations {
  return {
    ..._getAgentInsightMonitors(context),
  };
}

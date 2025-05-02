// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AgentsContext } from "../../api/agentsContext.js";
import {
  ThreadRun,
  OpenAIPageableListOfThreadRun,
  ToolOutput,
} from "../../models/models.js";
import {
  RunsCancelRunOptionalParams,
  RunsSubmitToolOutputsToRunOptionalParams,
  RunsUpdateRunOptionalParams,
  RunsGetRunOptionalParams,
  RunsListRunsOptionalParams,
  RunsCreateRunOptionalParams,
} from "../../api/runs/options.js";
import {
  cancelRun,
  submitToolOutputsToRun,
  updateRun,
  getRun,
  listRuns,
  createRun,
} from "../../api/runs/operations.js";
import { AgentRunResponse } from "../../models/streamingModels.js";
import { createThreadAndRun } from "../../api/operations.js";

/** Interface representing a Runs operations. */
export interface RunsOperations {
  /** Cancels a run of an in‐progress thread. */
  cancelRun: (
    threadId: string,
    runId: string,
    options?: RunsCancelRunOptionalParams,
  ) => Promise<ThreadRun>;
  /** Submits outputs from tools as requested by tool calls in a run. */
  submitToolOutputsToRun: (
    threadId: string,
    runId: string,
    toolOutputs: ToolOutput[],
    options?: RunsSubmitToolOutputsToRunOptionalParams,
  ) => Promise<ThreadRun>;
  /** Modifies an existing thread run. */
  updateRun: (
    threadId: string,
    runId: string,
    options?: RunsUpdateRunOptionalParams,
  ) => Promise<ThreadRun>;
  /** Gets an existing run from an existing thread. */
  getRun: (
    threadId: string,
    runId: string,
    options?: RunsGetRunOptionalParams,
  ) => Promise<ThreadRun>;
  /** Gets a list of runs for a specified thread. */
  listRuns: (
    threadId: string,
    options?: RunsListRunsOptionalParams,
  ) => Promise<OpenAIPageableListOfThreadRun>;
  /** Creates a new run for an agent thread. */
  createRun: (
    threadId: string,
    assistantId: string,
    options?: RunsCreateRunOptionalParams,
  ) => AgentRunResponse;
  /** Creates a new thread and run for an agent. */
  createThreadAndRun: (
    assistantId: string,
    options?: RunsCreateRunOptionalParams,
  ) => AgentRunResponse;
}

function _getRuns(context: AgentsContext) {
  return {
    cancelRun: (
      threadId: string,
      runId: string,
      options?: RunsCancelRunOptionalParams,
    ) => cancelRun(context, threadId, runId, options),
    submitToolOutputsToRun: (
      threadId: string,
      runId: string,
      toolOutputs: ToolOutput[],
      options?: RunsSubmitToolOutputsToRunOptionalParams,
    ) => submitToolOutputsToRun(context, threadId, runId, toolOutputs, options),
    updateRun: (
      threadId: string,
      runId: string,
      options?: RunsUpdateRunOptionalParams,
    ) => updateRun(context, threadId, runId, options),
    getRun: (
      threadId: string,
      runId: string,
      options?: RunsGetRunOptionalParams,
    ) => getRun(context, threadId, runId, options),
    listRuns: (threadId: string, options?: RunsListRunsOptionalParams) =>
      listRuns(context, threadId, options),
    createRun: (
      threadId: string,
      assistantId: string,
      options?: RunsCreateRunOptionalParams,
    ) => createRun(context, threadId, assistantId, options),
    createThreadAndRun: (
      assistantId: string,
      options?: RunsCreateRunOptionalParams,
    ) => createThreadAndRun(context, assistantId, options),
  };
}

export function _getRunsOperations(context: AgentsContext): RunsOperations {
  return {
    ..._getRuns(context),
  };
}

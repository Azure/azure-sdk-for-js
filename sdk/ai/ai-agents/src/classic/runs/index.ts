// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AgentsContext } from "../../api/agentsContext.js";
import { ThreadRun, ToolOutput } from "../../models/models.js";
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
  createRunAndPoll,
} from "../../api/runs/operations.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { AgentRunResponse } from "../../models/streamingModels.js";
import { createThreadAndRun } from "../../api/operations.js";
import { CreateThreadAndRunOptionalParams } from "../../api/options.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Runs operations. */
export interface RunsOperations {
  /** Cancels a run of an in‐progress thread. */
  cancel: (
    threadId: string,
    runId: string,
    options?: RunsCancelRunOptionalParams,
  ) => Promise<ThreadRun>;
  /** Submits outputs from tools as requested by tool calls in a run. */
  submitToolOutputs: (
    threadId: string,
    runId: string,
    toolOutputs: ToolOutput[],
    options?: RunsSubmitToolOutputsToRunOptionalParams,
  ) => AgentRunResponse;
  /** Modifies an existing thread run. */
  update: (
    threadId: string,
    runId: string,
    options?: RunsUpdateRunOptionalParams,
  ) => Promise<ThreadRun>;
  /** Gets an existing run from an existing thread. */
  get: (threadId: string, runId: string, options?: RunsGetRunOptionalParams) => Promise<ThreadRun>;
  /** Gets a list of runs for a specified thread. */
  list: (
    threadId: string,
    options?: RunsListRunsOptionalParams,
  ) => PagedAsyncIterableIterator<ThreadRun>;
  /** Creates a new run for an agent thread. */
  create: (
    threadId: string,
    assistantId: string,
    options?: RunsCreateRunOptionalParams,
  ) => AgentRunResponse;
  /** Creates a new run for an agent thread with polling. */
  createAndPoll: (
    threadId: string,
    assistantId: string,
    options?: RunsCreateRunOptionalParams,
  ) => PollerLike<OperationState<ThreadRun>, ThreadRun>;
  /** Creates a new thread and run for an agent. */
  createThreadAndRun: (
    assistantId: string,
    options?: CreateThreadAndRunOptionalParams,
  ) => AgentRunResponse;
}

function _getRuns(context: AgentsContext) {
  return {
    cancel: (threadId: string, runId: string, options?: RunsCancelRunOptionalParams) =>
      cancelRun(context, threadId, runId, options),
    submitToolOutputs: (
      threadId: string,
      runId: string,
      toolOutputs: ToolOutput[],
      options?: RunsSubmitToolOutputsToRunOptionalParams,
    ) =>
      submitToolOutputsToRun(context, threadId, runId, {
        ...options,
        toolOutputs: toolOutputs ?? options?.toolOutputs,
      }),
    update: (threadId: string, runId: string, options?: RunsUpdateRunOptionalParams) =>
      updateRun(context, threadId, runId, options),
    get: (threadId: string, runId: string, options?: RunsGetRunOptionalParams) =>
      getRun(context, threadId, runId, options),
    list: (threadId: string, options?: RunsListRunsOptionalParams) =>
      listRuns(context, threadId, options),
    create: (threadId: string, assistantId: string, options?: RunsCreateRunOptionalParams) =>
      createRun(context, threadId, assistantId, options),
    createAndPoll: (threadId: string, assistantId: string, options?: RunsCreateRunOptionalParams) =>
      createRunAndPoll(context, threadId, assistantId, options),
    createThreadAndRun: (assistantId: string, options?: RunsCreateRunOptionalParams) =>
      createThreadAndRun(context, assistantId, options),
  };
}

export function _getRunsOperations(context: AgentsContext): RunsOperations {
  return {
    ..._getRuns(context),
  };
}

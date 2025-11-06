// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AgentsContext } from "../../api/agentsContext.js";
import {
  cancelRun,
  submitToolOutputsToRun,
  updateRun,
  getRun,
  listRuns,
  createRun,
} from "../../api/runs/operations.js";
import type {
  RunsCancelRunOptionalParams,
  RunsSubmitToolOutputsToRunOptionalParams,
  RunsUpdateRunOptionalParams,
  RunsGetRunOptionalParams,
  RunsListRunsOptionalParams,
  RunsCreateRunOptionalParams,
} from "../../api/runs/options.js";
import type { ThreadRun, StructuredToolOutputUnion } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

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
    toolOutputs: StructuredToolOutputUnion[],
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
  ) => PagedAsyncIterableIterator<ThreadRun>;
  /** Creates a new run for an agent thread. */
  createRun: (
    threadId: string,
    assistantId: string,
    options?: RunsCreateRunOptionalParams,
  ) => Promise<ThreadRun>;
}

function _getRuns(context: AgentsContext) {
  return {
    cancelRun: (threadId: string, runId: string, options?: RunsCancelRunOptionalParams) =>
      cancelRun(context, threadId, runId, options),
    submitToolOutputsToRun: (
      threadId: string,
      runId: string,
      toolOutputs: StructuredToolOutputUnion[],
      options?: RunsSubmitToolOutputsToRunOptionalParams,
    ) => submitToolOutputsToRun(context, threadId, runId, toolOutputs, options),
    updateRun: (threadId: string, runId: string, options?: RunsUpdateRunOptionalParams) =>
      updateRun(context, threadId, runId, options),
    getRun: (threadId: string, runId: string, options?: RunsGetRunOptionalParams) =>
      getRun(context, threadId, runId, options),
    listRuns: (threadId: string, options?: RunsListRunsOptionalParams) =>
      listRuns(context, threadId, options),
    createRun: (threadId: string, assistantId: string, options?: RunsCreateRunOptionalParams) =>
      createRun(context, threadId, assistantId, options),
  };
}

export function _getRunsOperations(context: AgentsContext): RunsOperations {
  return {
    ..._getRuns(context),
  };
}

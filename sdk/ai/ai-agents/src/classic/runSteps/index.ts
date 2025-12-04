// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AgentsContext } from "../../api/agentsContext.js";
import type { RunStep } from "../../models/models.js";
import type {
  RunStepsListRunStepsOptionalParams,
  RunStepsGetRunStepOptionalParams,
} from "../../api/runSteps/options.js";
import { listRunSteps, getRunStep } from "../../api/runSteps/operations.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a RunSteps operations. */
export interface RunStepsOperations {
  /** Gets a list of run steps from a thread run. */
  list: (
    threadId: string,
    runId: string,
    options?: RunStepsListRunStepsOptionalParams,
  ) => PagedAsyncIterableIterator<RunStep>;
  /** Retrieves a single run step from a thread run. */
  get: (
    threadId: string,
    runId: string,
    stepId: string,
    options?: RunStepsGetRunStepOptionalParams,
  ) => Promise<RunStep>;
}

function _getRunSteps(context: AgentsContext) {
  return {
    list: (threadId: string, runId: string, options?: RunStepsListRunStepsOptionalParams) =>
      listRunSteps(context, threadId, runId, options),
    get: (
      threadId: string,
      runId: string,
      stepId: string,
      options?: RunStepsGetRunStepOptionalParams,
    ) => getRunStep(context, threadId, runId, stepId, options),
  };
}

export function _getRunStepsOperations(context: AgentsContext): RunStepsOperations {
  return {
    ..._getRunSteps(context),
  };
}

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AssistantsContext } from "../../api/AssistantsContext.js";
import { ListResponseOf, RunStep } from "../../models/models.js";
import { retrieveRunStep, listRunSteps } from "../../api/runSteps/index.js";
import {
  RunStepsRetrieveRunStepOptions,
  RunStepsListRunStepsOptions,
} from "../../models/options.js";

export interface RunStepsOperations {
  retrieveRunStep: (
    threadId: string,
    runId: string,
    stepId: string,
    options?: RunStepsRetrieveRunStepOptions
  ) => Promise<RunStep>;
  listRunSteps: (
    threadId: string,
    runId: string,
    options?: RunStepsListRunStepsOptions
  ) => Promise<ListResponseOf>;
}

export function getRunSteps(context: AssistantsContext) {
  return {
    retrieveRunStep: (
      threadId: string,
      runId: string,
      stepId: string,
      options?: RunStepsRetrieveRunStepOptions
    ) => retrieveRunStep(context, threadId, runId, stepId, options),
    listRunSteps: (
      threadId: string,
      runId: string,
      options?: RunStepsListRunStepsOptions
    ) => listRunSteps(context, threadId, runId, options),
  };
}

export function getRunStepsOperations(
  context: AssistantsContext
): RunStepsOperations {
  return {
    ...getRunSteps(context),
  };
}

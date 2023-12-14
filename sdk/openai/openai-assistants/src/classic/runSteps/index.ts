// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * THIS IS AN AUTO-GENERATED FILE - DO NOT EDIT!
 *
 * Any changes you make here may be lost.
 *
 * If you need to make changes, please do so in the original source file, \{project-root\}/sources/custom
 */

import { AssistantsContext } from "../../api/AssistantsContext.js";
import { listRunSteps, retrieveRunStep } from "../../api/runSteps/index.js";
import { ListResponseOf, RunStep } from "../../models/models.js";
import {
  RunStepsListRunStepsOptions,
  RunStepsRetrieveRunStepOptions,
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
  ) => Promise<ListResponseOf<RunStep>>;
}

export function getRunSteps(context: AssistantsContext) {
  return {
    retrieveRunStep: (
      threadId: string,
      runId: string,
      stepId: string,
      options?: RunStepsRetrieveRunStepOptions
    ) => retrieveRunStep(context, threadId, runId, stepId, options),
    listRunSteps: (threadId: string, runId: string, options?: RunStepsListRunStepsOptions) =>
      listRunSteps(context, threadId, runId, options),
  };
}

export function getRunStepsOperations(context: AssistantsContext): RunStepsOperations {
  return {
    ...getRunSteps(context),
  };
}

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ListResponseOf } from "../../models/models.js";
import { RunStep } from "../../../generated/src/models/models.js";
import {
  RunStepsRetrieveRunStepOptions,
  RunStepsListRunStepsOptions,
} from "../../../generated/src/models/options.js";

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

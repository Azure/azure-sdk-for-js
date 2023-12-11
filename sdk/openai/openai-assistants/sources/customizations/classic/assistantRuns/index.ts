// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  ListResponseOf,
} from "../../models/models.js";
import {
  AssistantRun,
  ToolOutputSubmission,
  CreateAndRunThreadOptions,
} from "../../../generated/src/models/models.js";
import {
  AssistantRunsCreateRunOptions,
  AssistantRunsListRunsOptions,
  AssistantRunsRetrieveRunOptions,
  AssistantRunsModifyRunOptions,
  AssistantRunsSubmitRunToolOutputsOptions,
  AssistantRunsCancelRunOptions,
  AssistantRunsCreateThreadAndRunOptions,
} from "../../../generated/src/models/options.js";

export interface AssistantRunsOperations {
  createRun: (
    threadId: string,
    assistantId: string,
    options?: AssistantRunsCreateRunOptions
  ) => Promise<AssistantRun>;
  listRuns: (
    threadId: string,
    options?: AssistantRunsListRunsOptions
  ) => Promise<ListResponseOf<AssistantRun>>;
  retrieveRun: (
    threadId: string,
    runId: string,
    options?: AssistantRunsRetrieveRunOptions
  ) => Promise<AssistantRun>;
  modifyRun: (
    threadId: string,
    runId: string,
    options?: AssistantRunsModifyRunOptions
  ) => Promise<AssistantRun>;
  submitRunToolOutputs: (
    threadId: string,
    runId: string,
    toolOutputs: ToolOutputSubmission[],
    options?: AssistantRunsSubmitRunToolOutputsOptions
  ) => Promise<AssistantRun>;
  cancelRun: (
    threadId: string,
    runId: string,
    options?: AssistantRunsCancelRunOptions
  ) => Promise<AssistantRun>;
  createThreadAndRun: (
    body: CreateAndRunThreadOptions,
    options?: AssistantRunsCreateThreadAndRunOptions
  ) => Promise<AssistantRun>;
}

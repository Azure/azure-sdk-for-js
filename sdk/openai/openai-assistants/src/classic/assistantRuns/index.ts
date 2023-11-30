// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AssistantsContext } from "../../api/AssistantsContext.js";
import {
  ListResponseOf,
  AssistantRun,
  ToolOutputSubmission,
  CreateAndRunThreadOptions,
} from "../../models/models.js";
import {
  createRun,
  listRuns,
  retrieveRun,
  modifyRun,
  submitRunToolOutputs,
  cancelRun,
  createThreadAndRun,
} from "../../api/assistantRuns/index.js";
import {
  AssistantRunsCreateRunOptions,
  AssistantRunsListRunsOptions,
  AssistantRunsRetrieveRunOptions,
  AssistantRunsModifyRunOptions,
  AssistantRunsSubmitRunToolOutputsOptions,
  AssistantRunsCancelRunOptions,
  AssistantRunsCreateThreadAndRunOptions,
} from "../../models/options.js";

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

export function getAssistantRuns(context: AssistantsContext) {
  return {
    createRun: (
      threadId: string,
      assistantId: string,
      options?: AssistantRunsCreateRunOptions
    ) => createRun(context, threadId, assistantId, options),
    listRuns: (threadId: string, options?: AssistantRunsListRunsOptions) =>
      listRuns(context, threadId, options),
    retrieveRun: (
      threadId: string,
      runId: string,
      options?: AssistantRunsRetrieveRunOptions
    ) => retrieveRun(context, threadId, runId, options),
    modifyRun: (
      threadId: string,
      runId: string,
      options?: AssistantRunsModifyRunOptions
    ) => modifyRun(context, threadId, runId, options),
    submitRunToolOutputs: (
      threadId: string,
      runId: string,
      toolOutputs: ToolOutputSubmission[],
      options?: AssistantRunsSubmitRunToolOutputsOptions
    ) => submitRunToolOutputs(context, threadId, runId, toolOutputs, options),
    cancelRun: (
      threadId: string,
      runId: string,
      options?: AssistantRunsCancelRunOptions
    ) => cancelRun(context, threadId, runId, options),
    createThreadAndRun: (
      body: CreateAndRunThreadOptions,
      options?: AssistantRunsCreateThreadAndRunOptions
    ) => createThreadAndRun(context, body, options),
  };
}

export function getAssistantRunsOperations(
  context: AssistantsContext
): AssistantRunsOperations {
  return {
    ...getAssistantRuns(context),
  };
}

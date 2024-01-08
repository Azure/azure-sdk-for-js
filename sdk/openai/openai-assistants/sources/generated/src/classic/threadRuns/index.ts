// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AssistantsContext } from "../../api/AssistantsContext.js";
import {
  OpenAIPageableListOf,
  ThreadRun,
  ToolOutput,
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
} from "../../api/threadRuns/index.js";
import {
  ThreadRunsCreateRunOptions,
  ThreadRunsListRunsOptions,
  ThreadRunsRetrieveRunOptions,
  ThreadRunsModifyRunOptions,
  ThreadRunsSubmitRunToolOutputsOptions,
  ThreadRunsCancelRunOptions,
  ThreadRunsCreateThreadAndRunOptions,
} from "../../models/options.js";

export interface ThreadRunsOperations {
  createRun: (
    threadId: string,
    assistantId: string,
    options?: ThreadRunsCreateRunOptions
  ) => Promise<ThreadRun>;
  listRuns: (
    threadId: string,
    options?: ThreadRunsListRunsOptions
  ) => Promise<OpenAIPageableListOf>;
  retrieveRun: (
    threadId: string,
    runId: string,
    options?: ThreadRunsRetrieveRunOptions
  ) => Promise<ThreadRun>;
  modifyRun: (
    threadId: string,
    runId: string,
    options?: ThreadRunsModifyRunOptions
  ) => Promise<ThreadRun>;
  submitRunToolOutputs: (
    threadId: string,
    runId: string,
    toolOutputs: ToolOutput[],
    options?: ThreadRunsSubmitRunToolOutputsOptions
  ) => Promise<ThreadRun>;
  cancelRun: (
    threadId: string,
    runId: string,
    options?: ThreadRunsCancelRunOptions
  ) => Promise<ThreadRun>;
  createThreadAndRun: (
    body: CreateAndRunThreadOptions,
    options?: ThreadRunsCreateThreadAndRunOptions
  ) => Promise<ThreadRun>;
}

export function getThreadRuns(context: AssistantsContext) {
  return {
    createRun: (
      threadId: string,
      assistantId: string,
      options?: ThreadRunsCreateRunOptions
    ) => createRun(context, threadId, assistantId, options),
    listRuns: (threadId: string, options?: ThreadRunsListRunsOptions) =>
      listRuns(context, threadId, options),
    retrieveRun: (
      threadId: string,
      runId: string,
      options?: ThreadRunsRetrieveRunOptions
    ) => retrieveRun(context, threadId, runId, options),
    modifyRun: (
      threadId: string,
      runId: string,
      options?: ThreadRunsModifyRunOptions
    ) => modifyRun(context, threadId, runId, options),
    submitRunToolOutputs: (
      threadId: string,
      runId: string,
      toolOutputs: ToolOutput[],
      options?: ThreadRunsSubmitRunToolOutputsOptions
    ) => submitRunToolOutputs(context, threadId, runId, toolOutputs, options),
    cancelRun: (
      threadId: string,
      runId: string,
      options?: ThreadRunsCancelRunOptions
    ) => cancelRun(context, threadId, runId, options),
    createThreadAndRun: (
      body: CreateAndRunThreadOptions,
      options?: ThreadRunsCreateThreadAndRunOptions
    ) => createThreadAndRun(context, body, options),
  };
}

export function getThreadRunsOperations(
  context: AssistantsContext
): ThreadRunsOperations {
  return {
    ...getThreadRuns(context),
  };
}

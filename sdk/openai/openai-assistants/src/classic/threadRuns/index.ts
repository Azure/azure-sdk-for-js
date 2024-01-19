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
import {
  cancelRun,
  createRun,
  createThreadAndRun,
  listRuns,
  modifyRun,
  retrieveRun,
  submitRunToolOutputs,
} from "../../api/threadRuns/index.js";
import {
  CreateAndRunThreadOptions,
  ListResponseOf,
  ThreadRun,
  ToolOutput,
} from "../../models/models.js";
import {
  ThreadRunsCancelRunOptions,
  ThreadRunsCreateRunOptions,
  ThreadRunsCreateThreadAndRunOptions,
  ThreadRunsListRunsOptions,
  ThreadRunsModifyRunOptions,
  ThreadRunsRetrieveRunOptions,
  ThreadRunsSubmitRunToolOutputsOptions,
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
  ) => Promise<ListResponseOf<ThreadRun>>;
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

export function getThreadRuns(context: AssistantsContext): ThreadRunsOperations {
  return {
    createRun: (threadId: string, assistantId: string, options?: ThreadRunsCreateRunOptions) =>
      createRun(context, threadId, assistantId, options),
    listRuns: (threadId: string, options?: ThreadRunsListRunsOptions) =>
      listRuns(context, threadId, options),
    retrieveRun: (threadId: string, runId: string, options?: ThreadRunsRetrieveRunOptions) =>
      retrieveRun(context, threadId, runId, options),
    modifyRun: (threadId: string, runId: string, options?: ThreadRunsModifyRunOptions) =>
      modifyRun(context, threadId, runId, options),
    submitRunToolOutputs: (
      threadId: string,
      runId: string,
      toolOutputs: ToolOutput[],
      options?: ThreadRunsSubmitRunToolOutputsOptions
    ) => submitRunToolOutputs(context, threadId, runId, toolOutputs, options),
    cancelRun: (threadId: string, runId: string, options?: ThreadRunsCancelRunOptions) =>
      cancelRun(context, threadId, runId, options),
    createThreadAndRun: (
      body: CreateAndRunThreadOptions,
      options?: ThreadRunsCreateThreadAndRunOptions
    ) => createThreadAndRun(context, body, options),
  };
}

export function getThreadRunsOperations(context: AssistantsContext): ThreadRunsOperations {
  return {
    ...getThreadRuns(context),
  };
}

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ListResponseOf } from "../../models/models.js";
import {
  ThreadRun,
  ToolOutputSubmission,
  CreateAndRunThreadOptions,
} from "../../../generated/src/models/models.js";
import {
  ThreadRunsCreateRunOptions,
  ThreadRunsListRunsOptions,
  ThreadRunsRetrieveRunOptions,
  ThreadRunsModifyRunOptions,
  ThreadRunsSubmitRunToolOutputsOptions,
  ThreadRunsCancelRunOptions,
  ThreadRunsCreateThreadAndRunOptions,
} from "../../../generated/src/models/options.js";

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
    toolOutputs: ToolOutputSubmission[],
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

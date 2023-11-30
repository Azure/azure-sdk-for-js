// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AssistantsContext } from "../../api/AssistantsContext.js";
import {
  AssistantThreadCreationOptions,
  AssistantThread,
  ThreadDeletionStatus,
} from "../../models/models.js";
import {
  createThread,
  retrieveThread,
  modifyThread,
  deleteThread,
} from "../../api/assistantThreads/index.js";
import {
  AssistantThreadsCreateThreadOptions,
  AssistantThreadsRetrieveThreadOptions,
  AssistantThreadsModifyThreadOptions,
  AssistantThreadsDeleteThreadOptions,
} from "../../models/options.js";

export interface AssistantThreadsOperations {
  createThread: (
    body: AssistantThreadCreationOptions,
    options?: AssistantThreadsCreateThreadOptions
  ) => Promise<AssistantThread>;
  retrieveThread: (
    threadId: string,
    options?: AssistantThreadsRetrieveThreadOptions
  ) => Promise<AssistantThread>;
  modifyThread: (
    threadId: string,
    options?: AssistantThreadsModifyThreadOptions
  ) => Promise<AssistantThread>;
  deleteThread: (
    threadId: string,
    options?: AssistantThreadsDeleteThreadOptions
  ) => Promise<ThreadDeletionStatus>;
}

export function getAssistantThreads(context: AssistantsContext) {
  return {
    createThread: (
      body: AssistantThreadCreationOptions,
      options?: AssistantThreadsCreateThreadOptions
    ) => createThread(context, body, options),
    retrieveThread: (
      threadId: string,
      options?: AssistantThreadsRetrieveThreadOptions
    ) => retrieveThread(context, threadId, options),
    modifyThread: (
      threadId: string,
      options?: AssistantThreadsModifyThreadOptions
    ) => modifyThread(context, threadId, options),
    deleteThread: (
      threadId: string,
      options?: AssistantThreadsDeleteThreadOptions
    ) => deleteThread(context, threadId, options),
  };
}

export function getAssistantThreadsOperations(
  context: AssistantsContext
): AssistantThreadsOperations {
  return {
    ...getAssistantThreads(context),
  };
}

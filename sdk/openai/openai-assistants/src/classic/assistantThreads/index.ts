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

export function getAssistantThreads(context: AssistantsContext): AssistantThreadsOperations {
  return {
    createThread: (
      body: AssistantThreadCreationOptions,
      options?: AssistantThreadsCreateThreadOptions
    ) => createThread(context, body, options),
    retrieveThread: (threadId: string, options?: AssistantThreadsRetrieveThreadOptions) =>
      retrieveThread(context, threadId, options),
    modifyThread: (threadId: string, options?: AssistantThreadsModifyThreadOptions) =>
      modifyThread(context, threadId, options),
    deleteThread: (threadId: string, options?: AssistantThreadsDeleteThreadOptions) =>
      deleteThread(context, threadId, options),
  };
}

export function getAssistantThreadsOperations(
  context: AssistantsContext
): AssistantThreadsOperations {
  return {
    ...getAssistantThreads(context),
  };
}

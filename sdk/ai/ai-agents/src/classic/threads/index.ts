// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AgentsContext } from "../../api/agentsContext.js";
import type { AgentThread, ThreadDeletionStatus } from "../../models/models.js";
import type {
  ThreadsDeleteThreadOptionalParams,
  ThreadsUpdateThreadOptionalParams,
  ThreadsGetThreadOptionalParams,
  ThreadsListThreadsOptionalParams,
  ThreadsCreateThreadOptionalParams,
} from "../../api/threads/options.js";
import {
  deleteThread,
  updateThread,
  getThread,
  listThreads,
  createThread,
} from "../../api/threads/operations.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Threads operations. */
export interface ThreadsOperations {
  /** Deletes an existing thread. */
  delete: (
    threadId: string,
    options?: ThreadsDeleteThreadOptionalParams,
  ) => Promise<ThreadDeletionStatus>;
  /** Modifies an existing thread. */
  update: (threadId: string, options?: ThreadsUpdateThreadOptionalParams) => Promise<AgentThread>;
  /** Gets information about an existing thread. */
  get: (threadId: string, options?: ThreadsGetThreadOptionalParams) => Promise<AgentThread>;
  /** Gets a list of threads that were previously created. */
  list: (options?: ThreadsListThreadsOptionalParams) => PagedAsyncIterableIterator<AgentThread>;
  /** Creates a new thread. Threads contain messages and can be run by agents. */
  create: (options?: ThreadsCreateThreadOptionalParams) => Promise<AgentThread>;
}

function _getThreads(context: AgentsContext) {
  return {
    delete: (threadId: string, options?: ThreadsDeleteThreadOptionalParams) =>
      deleteThread(context, threadId, options),
    update: (threadId: string, options?: ThreadsUpdateThreadOptionalParams) =>
      updateThread(context, threadId, options),
    get: (threadId: string, options?: ThreadsGetThreadOptionalParams) =>
      getThread(context, threadId, options),
    list: (options?: ThreadsListThreadsOptionalParams) => listThreads(context, options),
    create: (options?: ThreadsCreateThreadOptionalParams) => createThread(context, options),
  };
}

export function _getThreadsOperations(context: AgentsContext): ThreadsOperations {
  return {
    ..._getThreads(context),
  };
}

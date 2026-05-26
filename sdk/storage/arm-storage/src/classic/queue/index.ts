// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { StorageManagementContext } from "../../api/storageManagementContext.js";
import { $delete, update, create, get, list } from "../../api/queue/operations.js";
import type {
  QueueDeleteOptionalParams,
  QueueUpdateOptionalParams,
  QueueCreateOptionalParams,
  QueueGetOptionalParams,
  QueueListOptionalParams,
} from "../../api/queue/options.js";
import type { ListQueue, StorageQueue } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Queue operations. */
export interface QueueOperations {
  /** Deletes the queue with the specified queue name, under the specified account if it exists. */
  delete: (
    resourceGroupName: string,
    accountName: string,
    queueName: string,
    options?: QueueDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates a new queue with the specified queue name, under the specified account. */
  update: (
    resourceGroupName: string,
    accountName: string,
    queueName: string,
    queue: StorageQueue,
    options?: QueueUpdateOptionalParams,
  ) => Promise<StorageQueue>;
  /** Creates a new queue with the specified queue name, under the specified account. */
  create: (
    resourceGroupName: string,
    accountName: string,
    queueName: string,
    queue: StorageQueue,
    options?: QueueCreateOptionalParams,
  ) => Promise<StorageQueue>;
  /** Gets the queue with the specified queue name, under the specified account if it exists. */
  get: (
    resourceGroupName: string,
    accountName: string,
    queueName: string,
    options?: QueueGetOptionalParams,
  ) => Promise<StorageQueue>;
  /** Gets a list of all the queues under the specified storage account */
  list: (
    resourceGroupName: string,
    accountName: string,
    options?: QueueListOptionalParams,
  ) => PagedAsyncIterableIterator<ListQueue>;
}

function _getQueue(context: StorageManagementContext) {
  return {
    delete: (
      resourceGroupName: string,
      accountName: string,
      queueName: string,
      options?: QueueDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, accountName, queueName, options),
    update: (
      resourceGroupName: string,
      accountName: string,
      queueName: string,
      queue: StorageQueue,
      options?: QueueUpdateOptionalParams,
    ) => update(context, resourceGroupName, accountName, queueName, queue, options),
    create: (
      resourceGroupName: string,
      accountName: string,
      queueName: string,
      queue: StorageQueue,
      options?: QueueCreateOptionalParams,
    ) => create(context, resourceGroupName, accountName, queueName, queue, options),
    get: (
      resourceGroupName: string,
      accountName: string,
      queueName: string,
      options?: QueueGetOptionalParams,
    ) => get(context, resourceGroupName, accountName, queueName, options),
    list: (resourceGroupName: string, accountName: string, options?: QueueListOptionalParams) =>
      list(context, resourceGroupName, accountName, options),
  };
}

export function _getQueueOperations(context: StorageManagementContext): QueueOperations {
  return {
    ..._getQueue(context),
  };
}

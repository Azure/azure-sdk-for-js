// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AbortSignalLike } from "@azure/abort-controller";
import type { AgentsUploadFileOptionalParams } from "../index.js";
import { ThreadRun } from "../../index.js";
import type { 
  AgentsCreateVectorStoreFileBatchOptionalParams, 
  AgentsCreateVectorStoreFileOptionalParams, 
  AgentsCreateVectorStoreOptionalParams 
} from "../options.js";

/**
 * Options for configuring polling behavior.
 */
export interface PollingOptions {
  /**
   * The interval, in milliseconds, to wait between polling attempts. If not specified, a default interval of 1000ms will be used.
   */
  sleepIntervalInMs?: number;

  /**
   * An AbortSignalLike object (as defined by \@azure/abort-controller) that can be used to cancel the polling operation.
   */
  abortSignal?: AbortSignalLike;
}

/**
 * Optional parameters configuring polling behavior.
 */
export interface PollingOptionsParams {
  /** Options for configuring polling behavior. */
  pollingOptions?: PollingOptions;
}

export interface AgentUploadFileWithPollingOptionalParams
  extends AgentsUploadFileOptionalParams,
  PollingOptionsParams { }

/**
 * Optional parameters for creating a vector store file batch with polling.
 */
export interface AgentsCreateVectorStoreFileBatchWithPollingOptionalParams
  extends AgentsCreateVectorStoreFileBatchOptionalParams,
  PollingOptionsParams { }

export interface AgentsCreateVectorStoreWithPollingOptionalParams extends
  AgentsCreateVectorStoreOptionalParams,
  PollingOptionsParams { }

export interface AgentsCreateVectorStoreFileWithPollingOptionalParams extends
  AgentsCreateVectorStoreFileOptionalParams,
  PollingOptionsParams { }
/** Run operation related streaming events */
export enum RunStreamEventEnum {
  /** Event sent when a new run is created. The data of this event is of type ThreadRun */
  ThreadRunCreated = "thread.run.created",

  /** Event sent when a run moves to `queued` status. The data of this event is of type ThreadRun */
  ThreadRunQueued = "thread.run.queued",

  /** Event sent when a run moves to `in_progress` status. The data of this event is of type ThreadRun */
  ThreadRunInProgress = "thread.run.in_progress",

  /** Event sent when a run moves to `requires_action` status. The data of this event is of type ThreadRun */
  ThreadRunRequiresAction = "thread.run.requires_action",

  /** Event sent when a run is completed. The data of this event is of type ThreadRun */
  ThreadRunCompleted = "thread.run.completed",

  /** Event sent when a run fails. The data of this event is of type ThreadRun */
  ThreadRunFailed = "thread.run.failed",

  /** Event sent when a run moves to `cancelling` status. The data of this event is of type ThreadRun */
  ThreadRunCancelling = "thread.run.cancelling",

  /** Event sent when a run is cancelled. The data of this event is of type ThreadRun */
  ThreadRunCancelled = "thread.run.cancelled",

  /** Event sent when a run is expired. The data of this event is of type ThreadRun */
  ThreadRunExpired = "thread.run.expired",
}

/** Message operation related streaming events */
export enum MessageStreamEventEnum {
  /** Event sent when a new message is created. The data of this event is of type ThreadMessage */
  ThreadMessageCreated = "thread.message.created",

  /** Event sent when a message moves to `in_progress` status. The data of this event is of type ThreadMessage */
  ThreadMessageInProgress = "thread.message.in_progress",

  /** Event sent when a message is being streamed. The data of this event is of type MessageDeltaChunk */
  ThreadMessageDelta = "thread.message.delta",

  /** Event sent when a message is completed. The data of this event is of type ThreadMessage */
  ThreadMessageCompleted = "thread.message.completed",

  /** Event sent before a message is completed. The data of this event is of type ThreadMessage */
  ThreadMessageIncomplete = "thread.message.incomplete",
}

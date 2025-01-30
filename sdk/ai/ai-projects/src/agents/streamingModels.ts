// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MessageDeltaChunk, RunStepDeltaChunk } from "../customization/streamingModels.js";
import type {
  AgentThreadOutput,
  RunStepOutput,
  ThreadMessageOutput,
  ThreadRunOutput,
} from "../customization/outputModels.js";

/**
Each event in a server-sent events stream has an `event` and `data` property:
*  
* @example
* ``` ts
*  event: thread.created
*  data: {"id": "thread_123", "object": "thread", ...}
* ``` 
* 
*  We emit events whenever a new object is created, transitions to a new state, or is being
*  streamed in parts (deltas). For example, we emit `thread.run.created` when a new run
*  is created, `thread.run.completed` when a run completes, and so on. When an Agent chooses
*  to create a message during a run, we emit a `thread.message.created event`, a
*  `thread.message.in_progress` event, many `thread.message.delta` events, and finally a
*  `thread.message.completed` event.
*  
*  We may add additional events over time, so we recommend handling unknown events gracefully
*  in your code.
**/
export interface AgentEventMessage {
  /** The data of the event. The data can be of type AgentThreadOutput, ThreadRunOutput, RunStepOutput, ThreadMessageOutput, MessageDeltaChunk,RunStepDeltaChunk  */
  data: AgentEventStreamDataOutput;
  /** The type of the event. */
  event: AgentStreamEventType | string;
}

/** Represents a stream event data in the agent. */
export type AgentEventStreamDataOutput =
  | AgentThreadOutput
  | ThreadRunOutput
  | RunStepOutput
  | ThreadMessageOutput
  | MessageDeltaChunk
  | RunStepDeltaChunk
  | string;

/** Thread operation related streaming events */
export enum ThreadStreamEvent {
  /** Event sent when a new thread is created. The data of this event is of type AgentThread */
  ThreadCreated = "thread.created",
}

/** Run operation related streaming events */
export enum RunStreamEvent {
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

/** Run step operation related streaming events */
export enum RunStepStreamEvent {
  /** Event sent when a new thread run step is created. The data of this event is of type RunStep */
  ThreadRunStepCreated = "thread.run.step.created",

  /** Event sent when a run step moves to `in_progress` status. The data of this event is of type RunStep */
  ThreadRunStepInProgress = "thread.run.step.in_progress",

  /** Event sent when a run step is being streamed. The data of this event is of type RunStepDeltaChunk */
  ThreadRunStepDelta = "thread.run.step.delta",

  /** Event sent when a run step is completed. The data of this event is of type RunStep */
  ThreadRunStepCompleted = "thread.run.step.completed",

  /** Event sent when a run step fails. The data of this event is of type RunStep */
  ThreadRunStepFailed = "thread.run.step.failed",

  /** Event sent when a run step is cancelled. The data of this event is of type RunStep */
  ThreadRunStepCancelled = "thread.run.step.cancelled",

  /** Event sent when a run step is expired. The data of this event is of type RunStep */
  ThreadRunStepExpired = "thread.run.step.expired",
}

/** Message operation related streaming events */
export enum MessageStreamEvent {
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

/** Terminal event indicating a server side error while streaming. */
export enum ErrorEvent {
  /** Event sent when an error occurs, such as an internal server error or a timeout. */
  Error = "error",
}

/** Terminal event indicating the successful end of a stream. */
export enum DoneEvent {
  /** Event sent when the stream is done. */
  Done = "done",
}

/**
  Represents the type of an agent stream event.
 */
export type AgentStreamEventType =
  | ThreadStreamEvent
  | RunStreamEvent
  | RunStepStreamEvent
  | MessageStreamEvent
  | ErrorEvent
  | DoneEvent;

/** Represents a stream of agent event message. */
export interface AgentEventMessageStream
  extends AsyncDisposable,
    AsyncIterable<AgentEventMessage> {}

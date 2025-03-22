// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { 
  AgentThread, 
  RunStreamEvent,
  MessageStreamEvent,
  RunStepStreamEvent,
  ErrorEvent,
  DoneEvent,
  ThreadRun, 
  RunStep, 
  ThreadMessage, 
  RunStepDeltaChunk,
  MessageDeltaChunk,
} from "../../models/agents/index.js";

/**
Each event in a server-sent events stream has an `event` and `data` property:
  
```
  event: thread.created
  data: {"id": "thread_123", "object": "thread", ...}
```
  
  We emit events whenever a new object is created, transitions to a new state, or is being
  streamed in parts (deltas). For example, we emit `thread.run.created` when a new run
  is created, `thread.run.completed` when a run completes, and so on. When an Agent chooses
  to create a message during a run, we emit a `thread.message.created event`, a
  `thread.message.in_progress` event, many `thread.message.delta` events, and finally a
  `thread.message.completed` event.
  
  We may add additional events over time, so we recommend handling unknown events gracefully
  in your code.**/
export interface AgentEventMessage {
  /** The data of the event. The data can be of type AgentThread, ThreadRun, RunStep, ThreadMessage, MessageDeltaChunk,RunStepDeltaChunk  */
  data: AgentEventStreamData;
  /** The type of the event. */
  event: AgentStreamEventType | string;
}

/** Represents a stream event data in the agent. */
export type AgentEventStreamData =
  | AgentThread
  | ThreadRun
  | RunStep
  | ThreadMessage
  | MessageDeltaChunk
  | RunStepDeltaChunk
  | string;

/** Thread operation related streaming events */
export enum ThreadStreamEvent {
  /** Event sent when a new thread is created. The data of this event is of type AgentThread */
  ThreadCreated = "thread.created",
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

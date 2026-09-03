// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  AgentStreamEvent,
  AgentThread,
  MessageDeltaChunk,
  RunStep,
  RunStepDeltaChunk,
  ThreadMessage,
  ThreadRun,
} from "./models.js";

/**
 * Each event in a server-sent events stream has an `event` and `data` property:
 *
 * @example
 * ```ts snippet:ignore
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
  data: AgentEventStreamData;
  /** The type of the event. */
  event: AgentStreamEvent | string;
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

/** Represents a stream of agent event message. */
export interface AgentEventMessageStream
  extends AsyncDisposable, AsyncIterable<AgentEventMessage> {}

/**
 * Agent run response with support to stream.
 */
export type AgentRunResponse = PromiseLike<ThreadRun> & {
  /**
   * Function to start streaming the agent event messages.
   * @returns A promise that resolves to an AgentEventMessageStream.
   */
  stream: () => Promise<AgentEventMessageStream>;
};

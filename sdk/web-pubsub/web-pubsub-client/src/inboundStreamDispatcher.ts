// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { logger } from "./logger.js";
import type {
  OnGroupStreamArgs,
  GroupStreamHandler,
  OnGroupStreamOptions,
  OnGroupStreamDataArgs,
  OnGroupStreamEndArgs,
} from "./models/index.js";
import type { GroupDataMessage, StreamDataError, StreamInfo } from "./models/messages.js";

const DEFAULT_IDLE_TIMEOUT_IN_MS = 300000;
const DEFAULT_HANDLE_FROM_START = false;

/**
 * Factory invoked once for every newly observed inbound stream. The returned
 * `GroupStreamHandler` is bound to that single stream's lifecycle.
 */
export type GroupStreamFactory = (args: OnGroupStreamArgs) => GroupStreamHandler;

/**
 * The session for a single `onGroupStream` registration. Owns its own options
 * and independent stream-tracking state, and encapsulates all per-handler
 * logic: starting or ignoring streams, emitting fragments and terminal events,
 * and enforcing the idle timeout. Each session observes streams in isolation,
 * so options like `idleTimeoutInMs` and `handleFromStart` only affect this handler.
 */
class GroupStreamSession {
  public readonly factory: GroupStreamFactory;
  private readonly _idleTimeoutInMs: number;
  private readonly _handleFromStart: boolean;
  // Active streams keyed by an encoded [group, streamId] tuple.
  private readonly _activeStreams = new Map<string, ActiveStream>();
  private readonly _activeTimeouts = new Map<string, ReturnType<typeof setTimeout>>();
  // Tracks streamIds skipped by handleFromStart=true, keyed by an encoded [group, streamId] tuple.
  private readonly _ignored = new Set<string>();

  constructor(factory: GroupStreamFactory, options?: OnGroupStreamOptions) {
    this.factory = factory;
    this._idleTimeoutInMs = options?.idleTimeoutInMs ?? DEFAULT_IDLE_TIMEOUT_IN_MS;
    this._handleFromStart = options?.handleFromStart ?? DEFAULT_HANDLE_FROM_START;
  }

  /**
   * Process a single group data message (guaranteed to carry stream metadata)
   * against this session's own state.
   */
  public handleMessage(message: GroupDataMessage, stream: StreamInfo): void {
    const key = this._buildKey(message.group, stream.streamId);

    // For handleFromStart=true, if we first observe a mid-stream fragment,
    // ignore that streamId until its terminal frame arrives.
    if (this._ignored.has(key)) {
      if (stream.endOfStream) {
        this._ignored.delete(key);
      }
      return;
    }

    let active = this._activeStreams.get(key);
    if (active == null) {
      if (this._handleFromStart && stream.streamSequenceId !== 1) {
        if (!stream.endOfStream) {
          this._ignored.add(key);
        }
        return;
      }

      const streamView: OnGroupStreamArgs = {
        group: message.group,
        streamId: stream.streamId,
      };
      const handler = this._invokeFactory(streamView);
      active = {
        key,
        group: message.group,
        streamId: stream.streamId,
        handler,
      };
      this._activeStreams.set(key, active);
    }

    this._resetActiveTimeout(active);

    const shouldEmitMessage = !stream.endOfStream || this._hasStreamPayload(message);
    if (shouldEmitMessage) {
      const onMessageArgs: OnGroupStreamDataArgs = {
        group: message.group,
        fromUserId: message.fromUserId,
        sequenceId: message.sequenceId,
        dataType: message.dataType,
        data: message.data,
        stream,
      };
      this._fireMessage(active.handler, onMessageArgs);
    }

    if (stream.endOfStream) {
      const terminalArgs: OnGroupStreamEndArgs = {
        streamId: stream.streamId,
        group: message.group,
        error: stream.error,
      };
      if (stream.error != null) {
        this._fireError(active.handler, terminalArgs);
      } else {
        this._fireComplete(active.handler, terminalArgs);
      }
      this._clearActiveTimeout(key);
      this._activeStreams.delete(key);
    }
  }

  /**
   * Cancel all pending timers and drop all in-flight stream state.
   */
  public clear(): void {
    this._activeTimeouts.forEach((timeout) => {
      clearTimeout(timeout);
    });
    this._activeTimeouts.clear();
    this._activeStreams.clear();
    this._ignored.clear();
  }

  private _invokeFactory(streamView: OnGroupStreamArgs): GroupStreamHandler {
    try {
      return this.factory(streamView);
    } catch (err) {
      logger.warning("group-stream factory threw.", err);
      // Return a no-op handler so the stream is still tracked and the factory
      // is not retried for subsequent fragments.
      return {};
    }
  }

  private _fireMessage(handler: GroupStreamHandler, args: OnGroupStreamDataArgs): void {
    if (handler.onMessage == null) return;
    try {
      handler.onMessage(args);
    } catch (err) {
      logger.warning("group-stream onMessage handler failed.", err);
    }
  }

  private _fireComplete(handler: GroupStreamHandler, args: OnGroupStreamEndArgs): void {
    if (handler.onComplete == null) return;
    try {
      handler.onComplete(args);
    } catch (err) {
      logger.warning("group-stream onComplete handler failed.", err);
    }
  }

  private _fireError(handler: GroupStreamHandler, args: OnGroupStreamEndArgs): void {
    if (handler.onError == null) return;
    try {
      handler.onError(args);
    } catch (err) {
      logger.warning("group-stream onError handler failed.", err);
    }
  }

  private _buildKey(groupName: string, streamId: string): string {
    return JSON.stringify([groupName, streamId]);
  }

  private _resetActiveTimeout(active: ActiveStream): void {
    this._clearActiveTimeout(active.key);
    const timeout = setTimeout(() => {
      const current = this._activeStreams.get(active.key);
      if (current == null || current !== active) {
        return;
      }

      const timeoutError: StreamDataError = {
        name: "IdleTimeout",
        message: "Stream idle timeout: no data received within idleTimeoutInMs in client registry.",
      };
      this._fireError(current.handler, {
        streamId: current.streamId,
        group: current.group,
        error: timeoutError,
      });
      this._activeStreams.delete(active.key);
      this._activeTimeouts.delete(active.key);
    }, this._idleTimeoutInMs);

    this._activeTimeouts.set(active.key, timeout);
  }

  private _clearActiveTimeout(key: string): void {
    const timer = this._activeTimeouts.get(key);
    if (timer != null) {
      clearTimeout(timer);
      this._activeTimeouts.delete(key);
    }
  }

  private _hasStreamPayload(message: GroupDataMessage): boolean {
    if (message.dataType == null) {
      return false;
    }

    if (message.dataType === "json") {
      return message.data !== undefined;
    }

    if (message.data == null) {
      return false;
    }

    if (message.dataType === "text") {
      return typeof message.data === "string" && message.data.length > 0;
    }

    if (message.dataType === "binary" || message.dataType === "protobuf") {
      return message.data instanceof ArrayBuffer && message.data.byteLength > 0;
    }

    return true;
  }
}

/**
 * Tracks `onGroupStream` registrations and dispatches each inbound group data
 * message to every live session. All per-handler stream logic lives in
 * {@link GroupStreamSession}; this class only owns the registry and routing.
 */
export class InboundStreamDispatcher {
  // Sessions are read at message-processing time so on/off mutations between
  // fragments are observed immediately.
  private readonly _sessions: GroupStreamSession[] = [];

  /**
   * Register a factory with its own per-handler options. The factory is invoked
   * once per newly observed stream for this session only.
   */
  public register(factory: GroupStreamFactory, options?: OnGroupStreamOptions): void {
    this._sessions.push(new GroupStreamSession(factory, options));
  }

  /**
   * Remove the first session created from the given factory reference and clear
   * its in-flight stream state.
   */
  public unregister(factory: GroupStreamFactory): void {
    const index = this._sessions.findIndex((s) => s.factory === factory);
    if (index >= 0) {
      const [session] = this._sessions.splice(index, 1);
      session.clear();
    }
  }

  public clearActiveHandlers(): void {
    for (const session of this._sessions) {
      session.clear();
    }
  }

  public handleGroupMessage(message: GroupDataMessage): void {
    const stream = message.stream;
    if (stream == null) {
      return;
    }

    if (this._sessions.length === 0) {
      // No session registered, do not allocate per-stream state.
      return;
    }

    // Snapshot so a handler callback that registers/unregisters during dispatch
    // does not disturb iteration over the sessions for this message.
    for (const session of [...this._sessions]) {
      // Honor an unregister() that happened earlier in this same dispatch cycle.
      if (this._sessions.includes(session)) {
        session.handleMessage(message, stream);
      }
    }
  }
}

interface ActiveStream {
  readonly key: string;
  readonly group: string;
  readonly streamId: string;
  readonly handler: GroupStreamHandler;
}

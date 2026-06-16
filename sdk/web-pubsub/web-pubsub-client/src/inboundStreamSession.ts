// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { logger } from "./logger.js";
import type {
  OnGroupStreamArgs,
  GroupStreamHandler,
  GroupStreamOptions,
  OnGroupStreamDataArgs,
  OnGroupStreamEndArgs,
} from "./models/index.js";
import type { GroupDataMessage, StreamDataError } from "./models/messages.js";

const DEFAULT_TTL_IN_MS = 300000;
const DEFAULT_HANDLE_FROM_START = false;

/**
 * Factory invoked once for every newly observed inbound stream. The returned
 * `GroupStreamHandler` is bound to that single stream's lifecycle.
 */
export type GroupStreamFactory = (args: OnGroupStreamArgs) => GroupStreamHandler;

/**
 * Provides the current set of registered factories. Read at message-processing
 * time so on/off mutations between fragments are observed immediately.
 */
export type GetGroupStreamFactoriesFn = () => readonly GroupStreamFactory[];

export class InboundStreamSession {
  private readonly _getFactories: GetGroupStreamFactoriesFn;
  private readonly _ttlInMs: number;
  private readonly _handleFromStart: boolean;

  // Active streams keyed by an encoded [group, streamId] tuple.
  private readonly _activeStreams: Map<string, ActiveStream>;
  private readonly _activeTimeouts: Map<string, ReturnType<typeof setTimeout>>;
  // Tracks streamIds skipped by handleFromStart=true, keyed by an encoded [group, streamId] tuple.
  private readonly _ignored: Set<string>;

  constructor(getFactories: GetGroupStreamFactoriesFn, options?: GroupStreamOptions) {
    this._getFactories = getFactories;
    this._ttlInMs = options?.ttlInMs ?? DEFAULT_TTL_IN_MS;
    this._handleFromStart = options?.handleFromStart ?? DEFAULT_HANDLE_FROM_START;
    this._activeStreams = new Map<string, ActiveStream>();
    this._activeTimeouts = new Map<string, ReturnType<typeof setTimeout>>();
    this._ignored = new Set<string>();
  }

  public clearActiveHandlers(): void {
    this._activeTimeouts.forEach((timeout) => {
      clearTimeout(timeout);
    });
    this._activeTimeouts.clear();
    this._activeStreams.clear();
    this._ignored.clear();
  }

  public handleGroupMessage(message: GroupDataMessage): void {
    const stream = message.stream;
    if (stream == null) {
      return;
    }

    const factories = this._getFactories();
    if (factories.length === 0) {
      // No factory registered, do not allocate per-stream state.
      return;
    }

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
      const handlers = this._invokeFactories(factories, streamView);
      active = {
        key,
        group: message.group,
        streamId: stream.streamId,
        ttlInMs: this._ttlInMs,
        handlers,
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
      this._fireMessage(active.handlers, onMessageArgs);
    }

    if (stream.endOfStream) {
      const terminalArgs: OnGroupStreamEndArgs = {
        streamId: stream.streamId,
        group: message.group,
        error: stream.error,
      };
      if (stream.error != null) {
        this._fireError(active.handlers, terminalArgs);
      } else {
        this._fireComplete(active.handlers, terminalArgs);
      }
      this._clearActiveTimeout(key);
      this._activeStreams.delete(key);
    }
  }

  private _invokeFactories(
    factories: readonly GroupStreamFactory[],
    streamView: OnGroupStreamArgs,
  ): GroupStreamHandler[] {
    const handlers: GroupStreamHandler[] = [];
    for (const factory of factories) {
      try {
        handlers.push(factory(streamView));
      } catch (err) {
        logger.warning("group-stream factory threw.", err);
      }
    }
    return handlers;
  }

  private _fireMessage(handlers: GroupStreamHandler[], args: OnGroupStreamDataArgs): void {
    for (const handler of handlers) {
      if (handler.onMessage == null) continue;
      try {
        handler.onMessage(args);
      } catch (err) {
        logger.warning("group-stream onMessage handler failed.", err);
      }
    }
  }

  private _fireComplete(handlers: GroupStreamHandler[], args: OnGroupStreamEndArgs): void {
    for (const handler of handlers) {
      if (handler.onComplete == null) continue;
      try {
        handler.onComplete(args);
      } catch (err) {
        logger.warning("group-stream onComplete handler failed.", err);
      }
    }
  }

  private _fireError(handlers: GroupStreamHandler[], args: OnGroupStreamEndArgs): void {
    for (const handler of handlers) {
      if (handler.onError == null) continue;
      try {
        handler.onError(args);
      } catch (err) {
        logger.warning("group-stream onError handler failed.", err);
      }
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
        message: "Stream idle timeout: no data received within ttlInMs in client registry.",
      };
      this._fireError(current.handlers, {
        streamId: current.streamId,
        group: current.group,
        error: timeoutError,
      });
      this._activeStreams.delete(active.key);
      this._clearActiveTimeout(active.key);
    }, active.ttlInMs);

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

interface ActiveStream {
  readonly key: string;
  readonly group: string;
  readonly streamId: string;
  readonly ttlInMs: number;
  readonly handlers: GroupStreamHandler[];
}

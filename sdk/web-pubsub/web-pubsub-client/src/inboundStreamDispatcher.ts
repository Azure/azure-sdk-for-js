// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { logger } from "./logger.js";
import type {
  GroupStream,
  GroupStreamMessage,
  GroupStreamSubscription,
  OnGroupStreamOptions,
} from "./models/index.js";
import type { GroupDataMessage, StreamDataError, StreamInfo } from "./models/messages.js";

const DEFAULT_IDLE_TIMEOUT_IN_MS = 300000;
const DEFAULT_HANDLE_FROM_START = false;

export type GroupStreamCallback = (stream: GroupStream) => void | Promise<void>;

class InboundGroupStream implements GroupStream {
  public readonly abortSignal: AbortSignal;
  private readonly _controller = new AbortController();
  private readonly _messages: GroupStreamMessage[] = [];
  private readonly _readers: Array<{
    resolve: (result: IteratorResult<GroupStreamMessage>) => void;
    reject: (reason: unknown) => void;
  }> = [];
  private _isDone = false;
  private _error: unknown;

  constructor(
    public readonly groupName: string,
    public readonly streamId: string,
  ) {
    this.abortSignal = this._controller.signal;
  }

  public [Symbol.asyncIterator](): AsyncIterator<GroupStreamMessage> {
    return {
      next: () => this._next(),
    };
  }

  public enqueue(message: GroupStreamMessage): void {
    if (this._isDone) {
      return;
    }

    const reader = this._readers.shift();
    if (reader == null) {
      this._messages.push(message);
      return;
    }

    reader.resolve({ done: false, value: message });
  }

  public complete(error?: unknown): void {
    if (this._isDone) {
      return;
    }

    this._isDone = true;
    this._error = error;
    if (!this._controller.signal.aborted) {
      this._controller.abort();
    }

    for (const reader of this._readers.splice(0)) {
      if (error == null) {
        reader.resolve({ done: true, value: undefined });
      } else {
        reader.reject(error);
      }
    }
  }

  private _next(): Promise<IteratorResult<GroupStreamMessage>> {
    const message = this._messages.shift();
    if (message != null) {
      return Promise.resolve({ done: false, value: message });
    }

    if (this._isDone) {
      if (this._error == null) {
        return Promise.resolve({ done: true, value: undefined });
      }
      return Promise.reject(this._error);
    }

    return new Promise<IteratorResult<GroupStreamMessage>>((resolve, reject) => {
      this._readers.push({ resolve, reject });
    });
  }
}

class GroupStreamSubscriptionImpl implements GroupStreamSubscription {
  private readonly _idleTimeoutInMs: number;
  private readonly _handleFromStart: boolean;
  private readonly _groupNames?: Set<string>;
  private readonly _activeStreams = new Map<string, ActiveStream>();
  private readonly _activeTimeouts = new Map<string, ReturnType<typeof setTimeout>>();
  private readonly _ignored = new Set<string>();
  private _isActive = true;

  constructor(
    private readonly _callback: GroupStreamCallback,
    private readonly _remove: (subscription: GroupStreamSubscriptionImpl) => void,
    options?: OnGroupStreamOptions,
  ) {
    this._idleTimeoutInMs = options?.idleTimeoutInMs ?? DEFAULT_IDLE_TIMEOUT_IN_MS;
    this._handleFromStart = options?.handleFromStart ?? DEFAULT_HANDLE_FROM_START;
    this._groupNames = options?.groupNames == null ? undefined : new Set(options.groupNames);
  }

  public get isActive(): boolean {
    return this._isActive;
  }

  public async close(): Promise<void> {
    if (!this._isActive) {
      return;
    }

    this._isActive = false;
    this._remove(this);
    this.clearActiveStreams();
  }

  public [Symbol.asyncDispose](): Promise<void> {
    return this.close();
  }

  public handleMessage(message: GroupDataMessage, stream: StreamInfo): void {
    if (!this._isActive || !this._shouldHandleGroup(message.group)) {
      return;
    }

    const key = this._buildKey(message.group, stream.streamId);

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

      const groupStream = new InboundGroupStream(message.group, stream.streamId);
      active = {
        key,
        groupStream,
      };
      this._activeStreams.set(key, active);
      if (!this._invokeCallback(groupStream)) {
        this._activeStreams.delete(key);
        return;
      }
    }

    this._resetActiveTimeout(active);

    if (!stream.endOfStream || this._hasStreamPayload(message)) {
      active.groupStream.enqueue({
        groupName: message.group,
        fromUserId: message.fromUserId,
        sequenceId: message.sequenceId,
        dataType: message.dataType,
        data: message.data,
        stream,
      });
    }

    if (stream.endOfStream) {
      this._clearActiveTimeout(key);
      this._activeStreams.delete(key);
      active.groupStream.complete(stream.error);
    }
  }

  public clearActiveStreams(error?: unknown): void {
    for (const timeout of this._activeTimeouts.values()) {
      clearTimeout(timeout);
    }
    this._activeTimeouts.clear();

    for (const active of this._activeStreams.values()) {
      active.groupStream.complete(error);
    }
    this._activeStreams.clear();
    this._ignored.clear();
  }

  private _invokeCallback(stream: GroupStream): boolean {
    try {
      void Promise.resolve(this._callback(stream)).catch((err) => {
        logger.warning("group-stream callback failed.", err);
      });
      return true;
    } catch (err) {
      logger.warning("group-stream callback failed.", err);
      if (stream instanceof InboundGroupStream) {
        stream.complete(err);
      }
      return false;
    }
  }

  private _shouldHandleGroup(groupName: string): boolean {
    return this._groupNames == null || this._groupNames.has(groupName);
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
      current.groupStream.complete(timeoutError);
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
 * Tracks `onGroupStream` subscriptions and dispatches each inbound group data
 * message to every live subscription.
 */
export class InboundStreamDispatcher {
  private readonly _subscriptions: GroupStreamSubscriptionImpl[] = [];

  public register(
    callback: GroupStreamCallback,
    options?: OnGroupStreamOptions,
  ): GroupStreamSubscription {
    const subscription = new GroupStreamSubscriptionImpl(
      callback,
      (current) => this._remove(current),
      options,
    );
    this._subscriptions.push(subscription);
    return subscription;
  }

  public clearActiveHandlers(error?: unknown): void {
    for (const subscription of this._subscriptions) {
      subscription.clearActiveStreams(error);
    }
  }

  public handleGroupMessage(message: GroupDataMessage): void {
    const stream = message.stream;
    if (stream == null || this._subscriptions.length === 0) {
      return;
    }

    for (const subscription of [...this._subscriptions]) {
      if (subscription.isActive) {
        subscription.handleMessage(message, stream);
      }
    }
  }

  private _remove(subscription: GroupStreamSubscriptionImpl): void {
    const index = this._subscriptions.indexOf(subscription);
    if (index >= 0) {
      this._subscriptions.splice(index, 1);
    }
  }
}

interface ActiveStream {
  readonly key: string;
  readonly groupStream: InboundGroupStream;
}

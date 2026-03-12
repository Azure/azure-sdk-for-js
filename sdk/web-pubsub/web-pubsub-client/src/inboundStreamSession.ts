// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { randomUUID } from "@azure/core-util";
import { logger } from "./logger.js";
import type {
  OnStreamDataArgs,
  OnStreamEndArgs,
  OnStreamOptions,
  StreamHandler,
  StreamSubscription,
} from "./models/index.js";
import type { GroupDataMessage, StreamDataError } from "./models/messages.js";

interface InboundStreamOptions {
  ttlInMs: number;
  handleFromStart: boolean;
}

export class InboundStreamSession {
  private readonly _subscriptionsByGroup: Map<string, Set<InboundStreamSubscription>>;
  // One active handler per (subscription, group, streamId).
  private readonly _activeHandlers: Map<string, ActiveStreamHandler>;
  private readonly _activeTimeouts: Map<string, ReturnType<typeof setTimeout>>;

  constructor() {
    this._subscriptionsByGroup = new Map<string, Set<InboundStreamSubscription>>();
    this._activeHandlers = new Map<string, ActiveStreamHandler>();
    this._activeTimeouts = new Map<string, ReturnType<typeof setTimeout>>();
  }

  public subscribe(
    groupName: string,
    handlerFactory: (streamId: string) => StreamHandler,
    options?: OnStreamOptions,
  ): StreamSubscription {
    const subscription = new InboundStreamSubscription(
      randomUUID(),
      groupName,
      {
        ttlInMs: options?.ttlInMs ?? 300000,
        handleFromStart: options?.handleFromStart ?? true,
      },
      handlerFactory,
    );

    let groupSubscriptions = this._subscriptionsByGroup.get(groupName);
    if (groupSubscriptions == null) {
      groupSubscriptions = new Set<InboundStreamSubscription>();
      this._subscriptionsByGroup.set(groupName, groupSubscriptions);
    }
    groupSubscriptions.add(subscription);

    return {
      close: () => {
        this._removeSubscription(subscription);
      },
    };
  }

  public clearActiveHandlers(): void {
    this._activeTimeouts.forEach((timeout) => {
      clearTimeout(timeout);
    });
    this._activeTimeouts.clear();
    this._activeHandlers.clear();
  }

  public handleGroupMessage(message: GroupDataMessage): void {
    const stream = message.stream;
    if (stream == null) {
      return;
    }

    const subscriptions = this._subscriptionsByGroup.get(message.group);
    if (subscriptions == null || subscriptions.size === 0) {
      return;
    }

    subscriptions.forEach((subscription) => {
      // For handleFromStart=false, if we first observe a mid-stream fragment,
      // ignore that streamId until its terminal frame arrives.
      if (subscription.ignoredStreamIds.has(stream.streamId)) {
        if (stream.endOfStream) {
          subscription.ignoredStreamIds.delete(stream.streamId);
        }
        return;
      }

      const key = this._buildHandlerKey(subscription.id, message.group, stream.streamId);
      let activeHandler = this._activeHandlers.get(key);
      if (activeHandler == null) {
        if (!subscription.options.handleFromStart && stream.streamSequenceId !== 1) {
          if (!stream.endOfStream) {
            subscription.ignoredStreamIds.add(stream.streamId);
          }
          return;
        }

        const handler = subscription.handlerFactory(stream.streamId);
        // A subscription can attach to many streamIds; each streamId gets its own active handler state.
        activeHandler = new ActiveStreamHandler(
          key,
          stream.streamId,
          message.group,
          handler,
          subscription.options.ttlInMs,
        );
        this._activeHandlers.set(key, activeHandler);
      }

      this._resetActiveTimeout(activeHandler);

      const shouldEmitMessage = !stream.endOfStream || this._hasStreamPayload(message);
      if (shouldEmitMessage) {
        const onMessageArgs: OnStreamDataArgs = {
          group: message.group,
          fromUserId: message.fromUserId,
          sequenceId: message.sequenceId,
          dataType: message.dataType,
          data: message.data,
          stream,
        };
        this._invokeOnMessage(activeHandler, onMessageArgs);
      }

      if (stream.endOfStream) {
        const terminalArgs: OnStreamEndArgs = {
          streamId: stream.streamId,
          group: message.group,
          error: stream.error,
        };
        if (stream.error != null) {
          this._invokeOnError(activeHandler, stream.error, terminalArgs);
        } else {
          this._invokeOnComplete(activeHandler, terminalArgs);
        }
        this._clearActiveTimeout(key);
        this._activeHandlers.delete(key);
      }
    });
  }

  private _removeSubscription(subscription: InboundStreamSubscription): void {
    const subscriptions = this._subscriptionsByGroup.get(subscription.groupName);
    if (subscriptions != null) {
      subscriptions.delete(subscription);
      if (subscriptions.size === 0) {
        this._subscriptionsByGroup.delete(subscription.groupName);
      }
    }

    const prefix = `${subscription.id}|`;
    const keysToRemove: string[] = [];
    // Handler keys are prefixed by subscription id, so one prefix scan removes
    // all active stream states created by this subscription.
    this._activeHandlers.forEach((_, key) => {
      if (key.startsWith(prefix)) {
        keysToRemove.push(key);
      }
    });

    keysToRemove.forEach((key) => {
      this._clearActiveTimeout(key);
      this._activeHandlers.delete(key);
    });
  }

  private _buildHandlerKey(subscriptionId: string, groupName: string, streamId: string): string {
    return `${subscriptionId}|${groupName}|${streamId}`;
  }

  private _invokeOnMessage(active: ActiveStreamHandler, args: OnStreamDataArgs): void {
    try {
      active.handler.onMessage?.(args);
    } catch (err) {
      logger.warning("Stream handler onMessage failed.", err);
    }
  }

  private _invokeOnComplete(active: ActiveStreamHandler, args: OnStreamEndArgs): void {
    try {
      active.handler.onComplete?.(args);
    } catch (err) {
      logger.warning("Stream handler onComplete failed.", err);
    }
  }

  private _invokeOnError(
    active: ActiveStreamHandler,
    error: StreamDataError,
    args?: OnStreamEndArgs,
  ): void {
    try {
      active.handler.onError?.(
        args ?? {
          streamId: active.streamId,
          group: active.group,
          error,
        },
      );
    } catch (err) {
      logger.warning("Stream handler onError failed.", err);
    }
  }

  private _resetActiveTimeout(active: ActiveStreamHandler): void {
    this._clearActiveTimeout(active.key);
    const timeout = setTimeout(() => {
      const current = this._activeHandlers.get(active.key);
      if (current == null || current !== active) {
        return;
      }

      const timeoutError: StreamDataError = {
        name: "IdleTimeout",
        message: "Stream handler idle timeout: no data received within ttlInMs in client registry.",
      };
      this._invokeOnError(current, timeoutError);
      this._activeHandlers.delete(active.key);
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

class InboundStreamSubscription {
  public readonly id: string;
  public readonly groupName: string;
  public readonly options: InboundStreamOptions;
  public readonly handlerFactory: (streamId: string) => StreamHandler;
  // Tracks streamIds currently skipped by handleFromStart=false.
  public readonly ignoredStreamIds: Set<string>;

  constructor(
    id: string,
    groupName: string,
    options: InboundStreamOptions,
    handlerFactory: (streamId: string) => StreamHandler,
  ) {
    this.id = id;
    this.groupName = groupName;
    this.options = options;
    this.handlerFactory = handlerFactory;
    this.ignoredStreamIds = new Set<string>();
  }
}

class ActiveStreamHandler {
  // Composite key: `${subscriptionId}|${groupName}|${streamId}`.
  public readonly key: string;
  public readonly streamId: string;
  public readonly group: string;
  public readonly handler: StreamHandler;
  private readonly _ttlInMs: number;

  constructor(
    key: string,
    streamId: string,
    group: string,
    handler: StreamHandler,
    ttlInMs: number,
  ) {
    this.key = key;
    this.streamId = streamId;
    this.group = group;
    this.handler = handler;
    this._ttlInMs = ttlInMs;
  }

  public get ttlInMs(): number {
    return this._ttlInMs;
  }
}

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AbortSignalLike } from "@azure/abort-controller";
import { delay } from "@azure/core-util";
import EventEmitter from "events";
import type { SendMessageErrorOptions } from "./errors/index.js";
import { InvocationError, SendMessageError } from "./errors/index.js";
import { logger } from "./logger.js";
import type {
  WebPubSubResult,
  JoinGroupOptions,
  LeaveGroupOptions,
  OnConnectedArgs,
  OnDisconnectedArgs,
  OnGroupDataMessageArgs,
  OnServerDataMessageArgs,
  OnStoppedArgs,
  WebPubSubRetryOptions,
  SendToGroupOptions,
  SendEventOptions,
  WebPubSubClientOptions,
  OnRejoinGroupFailedArgs,
  StartOptions,
  GetClientAccessUrlOptions,
  InvokeEventOptions,
  InvokeEventResult,
} from "./models/index.js";
import type {
  ConnectedMessage,
  CancelInvocationMessage,
  DisconnectedMessage,
  GroupDataMessage,
  InvokeMessage,
  InvokeResponseMessage,
  ServerDataMessage,
  WebPubSubDataType,
  WebPubSubMessage,
  JoinGroupMessage,
  LeaveGroupMessage,
  SendToGroupMessage,
  SendEventMessage,
  AckMessage,
  SequenceAckMessage,
  PingMessage,
} from "./models/messages.js";
import type { WebPubSubClientProtocol } from "./protocols/index.js";
import { WebPubSubJsonReliableProtocol } from "./protocols/index.js";
import type { WebPubSubClientCredential } from "./webPubSubClientCredential.js";
import { WebSocketClientFactory } from "./websocket/websocketClient.js";
import type {
  WebSocketClientFactoryLike,
  WebSocketClientLike,
} from "./websocket/websocketClientLike.js";
import { AckManager } from "./ackManager.js";
import { InvocationManager } from "./invocationManager.js";

enum WebPubSubClientState {
  Stopped = "Stopped",
  Disconnected = "Disconnected",
  Connecting = "Connecting",
  Connected = "Connected",
  Recovering = "Recovering",
}

/**
 * Types which can be serialized and sent as JSON.
 */
export type JSONTypes = string | number | boolean | object;

/**
 * The WebPubSub client
 */
export class WebPubSubClient {
  private readonly _protocol: WebPubSubClientProtocol;
  private readonly _credential: WebPubSubClientCredential;
  private readonly _options: WebPubSubClientOptions;
  private readonly _groupMap: Map<string, WebPubSubGroup>;
  private readonly _ackManager: AckManager;
  private readonly _invocationManager: InvocationManager;
  private readonly _sequenceId: SequenceId;
  private readonly _messageRetryPolicy: RetryPolicy;
  private readonly _reconnectRetryPolicy: RetryPolicy;
  private readonly _quickSequenceAckDiff = 300;
  // The timeout for keep alive
  private readonly _keepAliveTimeoutInMs: number;
  // The interval at which to send keep-alive ping messages to the runtime
  private readonly _keepAliveIntervalInMs: number;

  private readonly _emitter: EventEmitter = new EventEmitter();
  private _state: WebPubSubClientState;
  private _isStopping: boolean = false;
  private _pingKeepaliveTask: AbortableTask | undefined;
  private _timeoutMonitorTask: AbortableTask | undefined;

  // connection lifetime
  private _wsClient?: WebSocketClientLike;
  private _uri?: string;
  private _lastCloseEvent?: { code: number; reason: string };
  private _lastDisconnectedMessage?: DisconnectedMessage;
  private _connectionId?: string;
  private _reconnectionToken?: string;
  private _isInitialConnected = false;
  private _sequenceAckTask?: AbortableTask;

  private _lastMessageReceived: number = Date.now();

  /**
   * Create an instance of WebPubSubClient
   * @param clientAccessUrl - The uri to connect
   * @param options - The client options
   */
  constructor(clientAccessUrl: string, options?: WebPubSubClientOptions);
  /**
   * Create an instance of WebPubSubClient
   * @param credential - The credential to use when connecting
   * @param options - The client options
   */
  constructor(credential: WebPubSubClientCredential, options?: WebPubSubClientOptions);
  constructor(credential: string | WebPubSubClientCredential, options?: WebPubSubClientOptions) {
    if (typeof credential === "string") {
      this._credential = { getClientAccessUrl: credential } as WebPubSubClientCredential;
    } else {
      this._credential = credential;
    }

    if (options == null) {
      options = {};
    }
    this._buildDefaultOptions(options);
    this._options = options;

    this._messageRetryPolicy = new RetryPolicy(this._options.messageRetryOptions!);
    this._reconnectRetryPolicy = new RetryPolicy(this._options.reconnectRetryOptions!);

    this._protocol = this._options.protocol!;
    this._groupMap = new Map<string, WebPubSubGroup>();
    this._ackManager = new AckManager();
    this._invocationManager = new InvocationManager();
    this._sequenceId = new SequenceId();

    this._keepAliveTimeoutInMs = this._options.keepAliveTimeoutInMs ?? 120000;
    this._keepAliveIntervalInMs = this._options.keepAliveIntervalInMs ?? 20000;

    this._state = WebPubSubClientState.Stopped;
  }

  /**
   * Start to start to the service.
   * @param abortSignal - The abort signal
   */
  public async start(options?: StartOptions): Promise<void> {
    if (this._isStopping) {
      throw new Error("Can't start a client during stopping");
    }

    if (this._state !== WebPubSubClientState.Stopped) {
      throw new Error("Client can be only started when it's Stopped");
    }

    let abortSignal: AbortSignalLike | undefined;
    if (options) {
      abortSignal = options.abortSignal;
    }

    if (!this._pingKeepaliveTask && this._keepAliveIntervalInMs > 0) {
      this._pingKeepaliveTask = this._getPingKeepaliveTask();
    }
    if (!this._timeoutMonitorTask && this._keepAliveTimeoutInMs > 0) {
      this._timeoutMonitorTask = this._getTimeoutMonitorTask();
    }

    try {
      await this._startCore(abortSignal);
    } catch (err) {
      // this two sentense should be set together. Consider client.stop() is called during _startCore()
      this._changeState(WebPubSubClientState.Stopped);
      this._disposeKeepaliveTasks();
      this._isStopping = false;
      throw err;
    }
  }

  private async _startFromRestarting(abortSignal?: AbortSignalLike): Promise<void> {
    if (this._state !== WebPubSubClientState.Disconnected) {
      throw new Error("Client can be only restarted when it's Disconnected");
    }

    try {
      logger.verbose("Staring reconnecting.");
      await this._startCore(abortSignal);
    } catch (err) {
      this._changeState(WebPubSubClientState.Disconnected);
      throw err;
    }
  }

  private async _startCore(abortSignal?: AbortSignalLike): Promise<void> {
    this._changeState(WebPubSubClientState.Connecting);

    logger.info("Staring a new connection");
    // Reset before a pure new connection
    this._sequenceId.reset();
    this._isInitialConnected = false;
    this._lastCloseEvent = undefined;
    this._lastDisconnectedMessage = undefined;
    this._connectionId = undefined;
    this._reconnectionToken = undefined;
    this._uri = undefined;

    if (typeof this._credential.getClientAccessUrl === "string") {
      this._uri = this._credential.getClientAccessUrl;
    } else {
      this._uri = await this._credential.getClientAccessUrl({
        abortSignal: abortSignal,
      } as GetClientAccessUrlOptions);
    }

    if (typeof this._uri !== "string") {
      throw new Error(
        `The clientAccessUrl must be a string but currently it's ${typeof this._uri}`,
      );
    }
    await this._connectCore(this._uri);
  }

  /**
   * Stop the client.
   */
  public stop(): void {
    if (this._state === WebPubSubClientState.Stopped || this._isStopping) {
      return;
    }

    // TODO: Maybe we need a better logic for stopping control
    this._isStopping = true;
    if (this._wsClient && this._wsClient.isOpen()) {
      this._wsClient.close();
    } else {
      this._isStopping = false;
    }
    this._disposeKeepaliveTasks();
  }

  private _disposeKeepaliveTasks(): void {
    if (this._pingKeepaliveTask) {
      this._pingKeepaliveTask.abort();
      this._pingKeepaliveTask = undefined;
    }
    if (this._timeoutMonitorTask) {
      this._timeoutMonitorTask.abort();
      this._timeoutMonitorTask = undefined;
    }
  }

  /**
   * Add handler for connected event
   * @param event - The event name
   * @param listener - The handler
   */
  public on(event: "connected", listener: (e: OnConnectedArgs) => void): void;
  /**
   * Add handler for disconnected event
   * @param event - The event name
   * @param listener - The handler
   */
  public on(event: "disconnected", listener: (e: OnDisconnectedArgs) => void): void;
  /**
   * Add handler for stopped event
   * @param event - The event name
   * @param listener - The handler
   */
  public on(event: "stopped", listener: (e: OnStoppedArgs) => void): void;
  /**
   * Add handler for server messages
   * @param event - The event name
   * @param listener - The handler
   */
  public on(event: "server-message", listener: (e: OnServerDataMessageArgs) => void): void;
  /**
   * Add handler for group messags
   * @param event - The event name
   * @param listener - The handler
   */
  public on(event: "group-message", listener: (e: OnGroupDataMessageArgs) => void): void;
  /**
   * Add handler for rejoining group failed
   * @param event - The event name
   * @param listener - The handler
   */
  public on(event: "rejoin-group-failed", listener: (e: OnRejoinGroupFailedArgs) => void): void;
  public on(
    event:
      | "connected"
      | "disconnected"
      | "stopped"
      | "server-message"
      | "group-message"
      | "rejoin-group-failed",
    listener: (e: any) => void,
  ): void {
    this._emitter.on(event, listener);
  }

  /**
   * Remove handler for connected event
   * @param event - The event name
   * @param listener - The handler
   */
  public off(event: "connected", listener: (e: OnConnectedArgs) => void): void;
  /**
   * Remove handler for disconnected event
   * @param event - The event name
   * @param listener - The handler
   */
  public off(event: "disconnected", listener: (e: OnDisconnectedArgs) => void): void;
  /**
   * Remove handler for stopped event
   * @param event - The event name
   * @param listener - The handler
   */
  public off(event: "stopped", listener: (e: OnStoppedArgs) => void): void;
  /**
   * Remove handler for server message
   * @param event - The event name
   * @param listener - The handler
   */
  public off(event: "server-message", listener: (e: OnServerDataMessageArgs) => void): void;
  /**
   * Remove handler for group message
   * @param event - The event name
   * @param listener - The handler
   */
  public off(event: "group-message", listener: (e: OnGroupDataMessageArgs) => void): void;
  /**
   * Remove handler for rejoining group failed
   * @param event - The event name
   * @param listener - The handler
   */
  public off(event: "rejoin-group-failed", listener: (e: OnRejoinGroupFailedArgs) => void): void;
  public off(
    event:
      | "connected"
      | "disconnected"
      | "stopped"
      | "server-message"
      | "group-message"
      | "rejoin-group-failed",
    listener: (e: any) => void,
  ): void {
    this._emitter.removeListener(event, listener);
  }

  private _emitEvent(event: "connected", args: OnConnectedArgs): void;
  private _emitEvent(event: "disconnected", args: OnDisconnectedArgs): void;
  private _emitEvent(event: "stopped", args: OnStoppedArgs): void;
  private _emitEvent(event: "server-message", args: OnServerDataMessageArgs): void;
  private _emitEvent(event: "group-message", args: OnGroupDataMessageArgs): void;
  private _emitEvent(event: "rejoin-group-failed", args: OnRejoinGroupFailedArgs): void;
  private _emitEvent(
    event:
      | "connected"
      | "disconnected"
      | "stopped"
      | "server-message"
      | "group-message"
      | "rejoin-group-failed",
    args: any,
  ): void {
    this._emitter.emit(event, args);
  }

  /**
   * Send custom event to server.
   * @param eventName - The event name
   * @param content - The data content
   * @param dataType - The data type
   * @param options - The options
   * @param abortSignal - The abort signal
   */
  public async sendEvent(
    eventName: string,
    content: JSONTypes | ArrayBuffer,
    dataType: WebPubSubDataType,
    options?: SendEventOptions,
  ): Promise<WebPubSubResult> {
    return this._operationExecuteWithRetry(
      () => this._sendEventAttempt(eventName, content, dataType, options),
      options?.abortSignal,
    );
  }

  private async _sendEventAttempt(
    eventName: string,
    content: JSONTypes | ArrayBuffer,
    dataType: WebPubSubDataType,
    options?: SendEventOptions,
  ): Promise<WebPubSubResult> {
    const fireAndForget = options?.fireAndForget ?? false;
    if (!fireAndForget) {
      return this._sendMessageWithAckId(
        (id) => {
          return {
            kind: "sendEvent",
            dataType: dataType,
            data: content,
            ackId: id,
            event: eventName,
          } as SendEventMessage;
        },
        options?.ackId,
        options?.abortSignal,
      );
    }

    const message = {
      kind: "sendEvent",
      dataType: dataType,
      data: content,
      event: eventName,
    } as SendEventMessage;

    await this._sendMessage(message, options?.abortSignal);
    return { isDuplicated: false };
  }

  private async _invokeEventAttempt(
    eventName: string,
    content: JSONTypes | ArrayBuffer,
    dataType: WebPubSubDataType,
    options?: InvokeEventOptions,
  ): Promise<InvokeEventResult> {
    const invokeOptions = options ?? {};

    const { invocationId, wait } = this._invocationManager.registerInvocation(
      invokeOptions.invocationId,
    );

    const invokeMessage: InvokeMessage = {
      kind: "invoke",
      invocationId,
      target: "event",
      event: eventName,
      dataType,
      data: content,
    };

    const responsePromise = wait({
      abortSignal: invokeOptions.abortSignal,
    });

    try {
      await this._sendMessage(invokeMessage, invokeOptions.abortSignal);
    } catch (err) {
      const invocationError =
        err instanceof InvocationError
          ? err
          : new InvocationError(
              err instanceof Error ? err.message : "Failed to send invocation message.",
              {
                invocationId,
              },
            );

      this._invocationManager.rejectInvocation(invocationId, invocationError);
      void responsePromise.catch(() => {
        /** empty */
      });
      throw invocationError;
    }

    try {
      const response = await responsePromise;
      return this._mapInvokeResponse(response);
    } catch (err) {
      const shouldCancel =
        (err instanceof InvocationError && err.errorDetail == null) ||
        invokeOptions.abortSignal?.aborted === true;
      if (shouldCancel) {
        await this._sendCancelInvocation(invocationId).catch(() => {
          /** empty */
        });
      }
      throw err;
    } finally {
      this._invocationManager.discard(invocationId);
    }
  }

  /**
   * Invoke an upstream event and wait for the correlated response.
   * @param eventName - The event name
   * @param content - The payload
   * @param dataType - The payload type
   * @param options - Invoke options
   */
  public async invokeEvent(
    eventName: string,
    content: JSONTypes | ArrayBuffer,
    dataType: WebPubSubDataType,
    options?: InvokeEventOptions,
  ): Promise<InvokeEventResult> {
    return this._operationExecuteWithRetry(
      () => this._invokeEventAttempt(eventName, content, dataType, options),
      options?.abortSignal,
    );
  }

  /**
   * Join the client to group
   * @param groupName - The group name
   * @param options - The join group options
   */
  public async joinGroup(groupName: string, options?: JoinGroupOptions): Promise<WebPubSubResult> {
    return this._operationExecuteWithRetry(
      () => this._joinGroupAttempt(groupName, options),
      options?.abortSignal,
    );
  }

  private async _joinGroupAttempt(
    groupName: string,
    options?: JoinGroupOptions,
  ): Promise<WebPubSubResult> {
    const group = this._getOrAddGroup(groupName);
    const result = await this._joinGroupCore(groupName, options);
    group.isJoined = true;
    return result;
  }

  private async _joinGroupCore(
    groupName: string,
    options?: JoinGroupOptions,
  ): Promise<WebPubSubResult> {
    return this._sendMessageWithAckId(
      (id) => {
        return {
          group: groupName,
          ackId: id,
          kind: "joinGroup",
        } as JoinGroupMessage;
      },
      options?.ackId,
      options?.abortSignal,
    );
  }

  /**
   * Leave the client from group
   * @param groupName - The group name
   * @param ackId - The optional ackId. If not specified, client will generate one.
   * @param abortSignal - The abort signal
   */
  public async leaveGroup(
    groupName: string,
    options?: LeaveGroupOptions,
  ): Promise<WebPubSubResult> {
    return this._operationExecuteWithRetry(
      () => this._leaveGroupAttempt(groupName, options),
      options?.abortSignal,
    );
  }

  private async _leaveGroupAttempt(
    groupName: string,
    options?: LeaveGroupOptions,
  ): Promise<WebPubSubResult> {
    const group = this._getOrAddGroup(groupName);
    const result = await this._sendMessageWithAckId(
      (id) => {
        return {
          group: groupName,
          ackId: id,
          kind: "leaveGroup",
        } as LeaveGroupMessage;
      },
      options?.ackId,
      options?.abortSignal,
    );
    group.isJoined = false;
    return result;
  }

  /**
   * Send message to group.
   * @param groupName - The group name
   * @param content - The data content
   * @param dataType - The data type
   * @param options - The options
   * @param abortSignal - The abort signal
   */
  public async sendToGroup(
    groupName: string,
    content: JSONTypes | ArrayBuffer,
    dataType: WebPubSubDataType,
    options?: SendToGroupOptions,
  ): Promise<WebPubSubResult> {
    return this._operationExecuteWithRetry(
      () => this._sendToGroupAttempt(groupName, content, dataType, options),
      options?.abortSignal,
    );
  }

  private async _sendToGroupAttempt(
    groupName: string,
    content: JSONTypes | ArrayBuffer,
    dataType: WebPubSubDataType,
    options?: SendToGroupOptions,
  ): Promise<WebPubSubResult> {
    const fireAndForget = options?.fireAndForget ?? false;
    const noEcho = options?.noEcho ?? false;
    if (!fireAndForget) {
      return this._sendMessageWithAckId(
        (id) => {
          return {
            kind: "sendToGroup",
            group: groupName,
            dataType: dataType,
            data: content,
            ackId: id,
            noEcho: noEcho,
          } as SendToGroupMessage;
        },
        options?.ackId,
        options?.abortSignal,
      );
    }

    const message = {
      kind: "sendToGroup",
      group: groupName,
      dataType: dataType,
      data: content,
      noEcho: noEcho,
    } as SendToGroupMessage;

    await this._sendMessage(message, options?.abortSignal);
    return { isDuplicated: false };
  }

  private _getWebSocketClientFactory(): WebSocketClientFactoryLike {
    return new WebSocketClientFactory();
  }

  private async _trySendSequenceAck(): Promise<void> {
    if (!this._protocol.isReliableSubProtocol) {
      return;
    }
    const [isUpdated, seqId] = this._sequenceId.tryGetSequenceId();
    if (isUpdated && seqId !== null && seqId !== undefined) {
      // seqId can be 0
      const message: SequenceAckMessage = {
        kind: "sequenceAck",
        sequenceId: seqId!,
      };
      try {
        await this._sendMessage(message);
      } catch {
        this._sequenceId.tryUpdate(seqId!); // If sending failed, mark it as updated so that it can be sent again.
      }
    }
  }

  private _connectCore(uri: string): Promise<void> {
    if (this._isStopping) {
      throw new Error("Can't start a client during stopping");
    }

    return new Promise<void>((resolve, reject) => {
      // This part is executed sync
      const client = (this._wsClient = this._getWebSocketClientFactory().create(
        uri,
        this._protocol.name,
      ));
      client.onopen(() => {
        // There's a case that client called stop() before this method. We need to check and close it if it's the case.
        if (this._isStopping) {
          try {
            client.close();
          } catch {
            /** empty */
          }

          reject(new Error(`The client is stopped`));
        }
        logger.verbose("WebSocket connection has opened");
        this._lastMessageReceived = Date.now(); // reset last message received time to avoid immediate keepalive timeout after a longer reconnection
        this._changeState(WebPubSubClientState.Connected);
        if (this._protocol.isReliableSubProtocol) {
          if (this._sequenceAckTask != null) {
            this._sequenceAckTask.abort();
          }
          this._sequenceAckTask = new AbortableTask(async () => {
            await this._trySendSequenceAck();
          }, 1000);
        }

        resolve();
      });

      client.onerror((e) => {
        if (this._sequenceAckTask != null) {
          this._sequenceAckTask.abort();
        }
        reject(e);
      });

      client.onclose((code: number, reason: string) => {
        if (this._state === WebPubSubClientState.Connected) {
          logger.verbose("WebSocket closed after open");
          if (this._sequenceAckTask != null) {
            this._sequenceAckTask.abort();
          }
          logger.info(`WebSocket connection closed. Code: ${code}, Reason: ${reason}`);
          this._lastCloseEvent = { code: code, reason: reason };
          this._handleConnectionClose.call(this);
        } else {
          logger.verbose("WebSocket closed before open");
          reject(new Error(`Failed to start WebSocket: ${code}`));
        }
      });

      client.onmessage((data: any) => {
        const handleAckMessage = (message: AckMessage): void => {
          const isDuplicated: boolean = message.error != null && message.error.name === "Duplicate";
          if (message.success || isDuplicated) {
            this._ackManager.resolveAck(message.ackId, {
              ackId: message.ackId,
              isDuplicated: isDuplicated,
            } as WebPubSubResult);
          } else {
            this._ackManager.rejectAck(
              message.ackId,
              new SendMessageError("Failed to send message.", {
                ackId: message.ackId,
                errorDetail: message.error,
              } as SendMessageErrorOptions),
            );
          }
        };

        const handleConnectedMessage = async (message: ConnectedMessage): Promise<void> => {
          this._connectionId = message.connectionId;
          this._reconnectionToken = message.reconnectionToken;

          if (!this._isInitialConnected) {
            this._isInitialConnected = true;

            if (this._options.autoRejoinGroups) {
              const groupPromises: Promise<void>[] = [];
              this._groupMap.forEach((g) => {
                if (g.isJoined) {
                  groupPromises.push(
                    (async () => {
                      try {
                        await this._joinGroupCore(g.name);
                      } catch (err) {
                        this._safeEmitRejoinGroupFailed(g.name, err);
                      }
                    })(),
                  );
                }
              });

              await Promise.all(groupPromises).catch(() => {
                /** empty */
              });
            }

            this._safeEmitConnected(message.connectionId, message.userId);
          }
        };

        const handleDisconnectedMessage = (message: DisconnectedMessage): void => {
          this._lastDisconnectedMessage = message;
        };

        const handleGroupDataMessage = (message: GroupDataMessage): void => {
          if (message.sequenceId != null) {
            const diff = this._sequenceId.tryUpdate(message.sequenceId);
            if (diff === 0) {
              // drop duplicated message
              return;
            }

            // If the diff is larger than the threshold, we must ack quicker to avoid slow client drop.
            if (diff > this._quickSequenceAckDiff) {
              this._trySendSequenceAck();
            }
          }

          this._safeEmitGroupMessage(message);
        };

        const handleServerDataMessage = (message: ServerDataMessage): void => {
          if (message.sequenceId != null) {
            const diff = this._sequenceId.tryUpdate(message.sequenceId);
            if (diff === 0) {
              // drop duplicated message
              return;
            }

            // If the diff is larger than the threshold, we must ack quicker to avoid slow client drop.
            if (diff > this._quickSequenceAckDiff) {
              this._trySendSequenceAck();
            }
          }

          this._safeEmitServerMessage(message);
        };

        const handleInvokeResponseMessage = (message: InvokeResponseMessage): void => {
          const resolved = this._invocationManager.resolveInvocation(message);
          if (!resolved) {
            logger.verbose(
              `Received invokeResponse for unknown invocationId: ${message.invocationId}`,
            );
          }
        };

        this._lastMessageReceived = Date.now();

        let messages: WebPubSubMessage[] | WebPubSubMessage | null;
        try {
          let convertedData: Buffer | ArrayBuffer | string;
          if (Array.isArray(data)) {
            convertedData = Buffer.concat(data);
          } else {
            convertedData = data;
          }

          messages = this._protocol.parseMessages(convertedData);
          if (messages === null) {
            // null means the message is not recognized.
            return;
          }
        } catch (err) {
          logger.warning("An error occurred while parsing the message from service", err);
          throw err;
        }

        if (!Array.isArray(messages)) {
          messages = [messages];
        }

        messages.forEach((message) => {
          try {
            switch (message.kind) {
              case "pong": {
                // handled in _lastMessageReceived
                break;
              }
              case "ack": {
                handleAckMessage(message as AckMessage);
                break;
              }
              case "connected": {
                handleConnectedMessage(message as ConnectedMessage);
                break;
              }
              case "disconnected": {
                handleDisconnectedMessage(message as DisconnectedMessage);
                break;
              }
              case "groupData": {
                handleGroupDataMessage(message as GroupDataMessage);
                break;
              }
              case "serverData": {
                handleServerDataMessage(message as ServerDataMessage);
                break;
              }
              case "invokeResponse": {
                handleInvokeResponseMessage(message as InvokeResponseMessage);
                break;
              }
            }
          } catch (err) {
            logger.warning(
              `An error occurred while handling the message with kind: ${message.kind} from service`,
              err,
            );
          }
        });
      });
    });
  }

  private async _handleConnectionCloseAndNoRecovery(): Promise<void> {
    this._state = WebPubSubClientState.Disconnected;

    this._safeEmitDisconnected(this._connectionId, this._lastDisconnectedMessage);

    // Auto reconnect or stop
    if (this._options.autoReconnect) {
      await this._autoReconnect();
    } else {
      await this._handleConnectionStopped();
    }
  }

  private async _autoReconnect(): Promise<void> {
    let isSuccess = false;
    let attempt = 0;
    try {
      while (!this._isStopping) {
        try {
          await this._startFromRestarting();
          isSuccess = true;
          break;
        } catch (err) {
          logger.warning("An attempt to reconnect connection failed.", err);

          attempt++;
          const delayInMs = this._reconnectRetryPolicy.nextRetryDelayInMs(attempt);

          if (delayInMs == null) {
            break;
          }

          logger.verbose(`Delay time for reconnect attempt ${attempt}: ${delayInMs}`);
          await delay(delayInMs).catch(() => {
            /** empty */
          });
        }
      }
    } finally {
      if (!isSuccess) {
        this._handleConnectionStopped();
      }
    }
  }

  private _handleConnectionStopped(): void {
    this._isStopping = false;
    this._state = WebPubSubClientState.Stopped;
    this._disposeKeepaliveTasks();
    this._safeEmitStopped();
  }

  private async _trySendPing(): Promise<void> {
    // skip during reconnection
    if (this._state !== WebPubSubClientState.Connected || !this._wsClient?.isOpen()) {
      return;
    }

    const message: PingMessage = {
      kind: "ping",
    };
    try {
      await this._sendMessage(message);
    } catch {
      logger.warning("Failed to send keepalive message to the service");
    }
  }

  private async _checkKeepAliveTimeout(): Promise<void> {
    if (this._state !== WebPubSubClientState.Connected || !this._wsClient?.isOpen()) {
      return;
    }

    const now = Date.now();
    if (now - this._lastMessageReceived > this._keepAliveTimeoutInMs) {
      logger.warning(
        `No messages received for ${now - this._lastMessageReceived} ms. Closing. The keep alive timeout is set to ${this._keepAliveTimeoutInMs} ms.`,
      );
      this._wsClient?.close();
    }
  }

  private _getPingKeepaliveTask(): AbortableTask {
    return new AbortableTask(async () => {
      await this._trySendPing();
    }, this._keepAliveIntervalInMs);
  }

  private _getTimeoutMonitorTask(): AbortableTask {
    const timeout = this._keepAliveTimeoutInMs;
    const checkInterval = Math.floor(timeout / 3);
    return new AbortableTask(async () => {
      await this._checkKeepAliveTimeout();
    }, checkInterval);
  }

  private async _sendMessage(
    message: WebPubSubMessage,
    abortSignal?: AbortSignalLike,
  ): Promise<void> {
    if (!this._wsClient || !this._wsClient.isOpen()) {
      throw new Error("The connection is not connected.");
    }

    const payload = this._protocol.writeMessage(message);
    await this._wsClient!.send(payload, abortSignal);
  }

  private async _sendMessageWithAckId(
    messageProvider: (ackId: number) => WebPubSubMessage,
    ackId?: number,
    abortSignal?: AbortSignalLike,
  ): Promise<WebPubSubResult> {
    const { ackId: resolvedAckId, wait } = this._ackManager.registerAck(ackId);
    const message = messageProvider(resolvedAckId);

    try {
      await this._sendMessage(message, abortSignal);
    } catch (error) {
      this._ackManager.discard(resolvedAckId);

      let errorMessage: string = "";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      throw new SendMessageError(errorMessage, { ackId: resolvedAckId });
    }

    return wait(abortSignal);
  }

  private async _handleConnectionClose(): Promise<void> {
    // Clean ack cache
    this._ackManager.rejectAll((ackId) => {
      return new SendMessageError(
        "Connection is disconnected before receive ack from the service",
        {
          ackId,
        } as SendMessageErrorOptions,
      );
    });

    this._invocationManager.rejectAll((invocationId) => {
      return new InvocationError(
        "Connection is disconnected before receiving invoke response from the service",
        {
          invocationId,
        },
      );
    });

    if (this._isStopping) {
      logger.warning("The client is stopping state. Stop recovery.");
      this._handleConnectionCloseAndNoRecovery();
      return;
    }

    if (this._lastCloseEvent && this._lastCloseEvent.code === 1008) {
      logger.warning("The websocket close with status code 1008. Stop recovery.");
      this._handleConnectionCloseAndNoRecovery();
      return;
    }

    if (!this._protocol.isReliableSubProtocol) {
      logger.warning("The protocol is not reliable, recovery is not applicable");
      this._handleConnectionCloseAndNoRecovery();
      return;
    }

    // Build recovery uri
    const recoveryUri = this._buildRecoveryUri();
    if (!recoveryUri) {
      logger.warning("Connection id or reconnection token is not available");
      this._handleConnectionCloseAndNoRecovery();
      return;
    }

    // Try recover connection
    let recovered = false;
    this._state = WebPubSubClientState.Recovering;
    const abortSignal = AbortSignal.timeout(30 * 1000);
    try {
      while (!abortSignal.aborted || this._isStopping) {
        try {
          await this._connectCore.call(this, recoveryUri);
          recovered = true;
          return;
        } catch {
          await delay(1000);
        }
      }
    } finally {
      if (!recovered) {
        logger.warning("Recovery attempts failed more then 30 seconds or the client is stopping");
        this._handleConnectionCloseAndNoRecovery();
      }
    }
  }

  private _safeEmitConnected(connectionId: string, userId: string): void {
    this._emitEvent("connected", {
      connectionId: connectionId,
      userId: userId,
    } as OnConnectedArgs);
  }

  private _safeEmitDisconnected(
    connectionId: string | undefined,
    lastDisconnectedMessage: DisconnectedMessage | undefined,
  ): void {
    this._emitEvent("disconnected", {
      connectionId: connectionId,
      message: lastDisconnectedMessage,
    } as OnDisconnectedArgs);
  }

  private _safeEmitGroupMessage(message: GroupDataMessage): void {
    this._emitEvent("group-message", {
      message: message,
    } as OnGroupDataMessageArgs);
  }

  private _safeEmitServerMessage(message: ServerDataMessage): void {
    this._emitEvent("server-message", {
      message: message,
    } as OnServerDataMessageArgs);
  }

  private _safeEmitStopped(): void {
    this._emitEvent("stopped", {});
  }

  private _safeEmitRejoinGroupFailed(groupName: string, err: unknown): void {
    this._emitEvent("rejoin-group-failed", {
      group: groupName,
      error: err,
    } as OnRejoinGroupFailedArgs);
  }

  private _mapInvokeResponse(message: InvokeResponseMessage): InvokeEventResult {
    if (message.success !== true) {
      if (message.success === false) {
        throw new InvocationError(message.error?.message ?? "Invocation failed.", {
          invocationId: message.invocationId,
          errorDetail: message.error,
        });
      }

      throw new InvocationError("Unsupported invoke response frame.", {
        invocationId: message.invocationId,
      });
    }

    return {
      invocationId: message.invocationId,
      dataType: message.dataType,
      data: message.data,
    };
  }

  private async _sendCancelInvocation(invocationId: string): Promise<void> {
    const message: CancelInvocationMessage = {
      kind: "cancelInvocation",
      invocationId,
    };

    try {
      await this._sendMessage(message);
    } catch (err) {
      logger.verbose(`Failed to send cancelInvocation for ${invocationId}`, err);
    }
  }

  private _buildDefaultOptions(clientOptions: WebPubSubClientOptions): WebPubSubClientOptions {
    if (clientOptions.autoReconnect == null) {
      clientOptions.autoReconnect = true;
    }

    if (clientOptions.autoRejoinGroups == null) {
      clientOptions.autoRejoinGroups = true;
    }

    if (clientOptions.protocol == null) {
      clientOptions.protocol = WebPubSubJsonReliableProtocol();
    }

    if (clientOptions.keepAliveTimeoutInMs == null) {
      clientOptions.keepAliveTimeoutInMs = 120000; // 120 seconds
    }

    if (clientOptions.keepAliveTimeoutInMs < 0) {
      throw new RangeError("keepAliveTimeoutInMs must be greater than or equal to 0.");
    }

    if (clientOptions.keepAliveIntervalInMs == null) {
      clientOptions.keepAliveIntervalInMs = 20000; // 20 seconds
    }

    if (clientOptions.keepAliveIntervalInMs < 0) {
      throw new RangeError("keepAliveIntervalInMs must be greater than or equal to 0.");
    }

    this._buildMessageRetryOptions(clientOptions);
    this._buildReconnectRetryOptions(clientOptions);

    return clientOptions;
  }

  private _buildMessageRetryOptions(clientOptions: WebPubSubClientOptions): void {
    if (!clientOptions.messageRetryOptions) {
      clientOptions.messageRetryOptions = {};
    }

    if (
      clientOptions.messageRetryOptions.maxRetries == null ||
      clientOptions.messageRetryOptions.maxRetries < 0
    ) {
      clientOptions.messageRetryOptions.maxRetries = 3;
    }

    if (
      clientOptions.messageRetryOptions.retryDelayInMs == null ||
      clientOptions.messageRetryOptions.retryDelayInMs < 0
    ) {
      clientOptions.messageRetryOptions.retryDelayInMs = 1000;
    }

    if (
      clientOptions.messageRetryOptions.maxRetryDelayInMs == null ||
      clientOptions.messageRetryOptions.maxRetryDelayInMs < 0
    ) {
      clientOptions.messageRetryOptions.maxRetryDelayInMs = 30000;
    }

    if (clientOptions.messageRetryOptions.mode == null) {
      clientOptions.messageRetryOptions.mode = "Fixed";
    }
  }

  private _buildReconnectRetryOptions(clientOptions: WebPubSubClientOptions): void {
    if (!clientOptions.reconnectRetryOptions) {
      clientOptions.reconnectRetryOptions = {};
    }

    if (
      clientOptions.reconnectRetryOptions.maxRetries == null ||
      clientOptions.reconnectRetryOptions.maxRetries < 0
    ) {
      clientOptions.reconnectRetryOptions.maxRetries = Number.MAX_VALUE;
    }

    if (
      clientOptions.reconnectRetryOptions.retryDelayInMs == null ||
      clientOptions.reconnectRetryOptions.retryDelayInMs < 0
    ) {
      clientOptions.reconnectRetryOptions.retryDelayInMs = 1000;
    }

    if (
      clientOptions.reconnectRetryOptions.maxRetryDelayInMs == null ||
      clientOptions.reconnectRetryOptions.maxRetryDelayInMs < 0
    ) {
      clientOptions.reconnectRetryOptions.maxRetryDelayInMs = 30000;
    }

    if (clientOptions.reconnectRetryOptions.mode == null) {
      clientOptions.reconnectRetryOptions.mode = "Fixed";
    }
  }

  private _buildRecoveryUri(): string | null {
    if (this._connectionId && this._reconnectionToken && this._uri) {
      const url = new URL(this._uri);
      url.searchParams.append("awps_connection_id", this._connectionId);
      url.searchParams.append("awps_reconnection_token", this._reconnectionToken);
      return url.toString();
    }
    return null;
  }

  private _getOrAddGroup(name: string): WebPubSubGroup {
    if (!this._groupMap.has(name)) {
      this._groupMap.set(name, new WebPubSubGroup(name));
    }
    return this._groupMap.get(name) as WebPubSubGroup;
  }

  private _changeState(newState: WebPubSubClientState): void {
    logger.verbose(
      `The client state transfer from ${this._state.toString()} to ${newState.toString()}`,
    );
    this._state = newState;
  }

  private async _operationExecuteWithRetry<T>(
    inner: () => Promise<T>,
    signal?: AbortSignalLike,
  ): Promise<T> {
    let retryAttempt = 0;

    while (true) {
      try {
        return await inner.call(this);
      } catch (err) {
        if (err instanceof InvocationError) {
          throw err;
        }
        retryAttempt++;
        const delayInMs = this._messageRetryPolicy.nextRetryDelayInMs(retryAttempt);
        if (delayInMs == null) {
          throw err;
        }

        await delay(delayInMs);

        if (signal?.aborted) {
          throw err;
        }
      }
    }
  }
}

class RetryPolicy {
  private _retryOptions: WebPubSubRetryOptions;
  private _maxRetriesToGetMaxDelay: number;

  public constructor(retryOptions: WebPubSubRetryOptions) {
    this._retryOptions = retryOptions;
    this._maxRetriesToGetMaxDelay = Math.ceil(
      Math.log2(this._retryOptions.maxRetryDelayInMs!) -
        Math.log2(this._retryOptions.retryDelayInMs!) +
        1,
    );
  }

  public nextRetryDelayInMs(retryAttempt: number): number | null {
    if (retryAttempt > this._retryOptions.maxRetries!) {
      return null;
    } else {
      if (this._retryOptions.mode! === "Fixed") {
        return this._retryOptions.retryDelayInMs!;
      } else {
        return this._calculateExponentialDelay(retryAttempt);
      }
    }
  }

  private _calculateExponentialDelay(attempt: number): number {
    if (attempt >= this._maxRetriesToGetMaxDelay) {
      return this._retryOptions.maxRetryDelayInMs!;
    } else {
      return (1 << (attempt - 1)) * this._retryOptions.retryDelayInMs!;
    }
  }
}

class WebPubSubGroup {
  public readonly name: string;
  public isJoined = false;

  constructor(name: string) {
    this.name = name;
  }
}

class SequenceId {
  private _sequenceId: number;
  private _isUpdate: boolean;

  constructor() {
    this._sequenceId = 0;
    this._isUpdate = false;
  }

  public tryUpdate(sequenceId: number): number {
    this._isUpdate = true;
    if (sequenceId > this._sequenceId) {
      const diff = sequenceId - this._sequenceId;
      this._sequenceId = sequenceId;
      return diff;
    }
    return 0;
  }

  public tryGetSequenceId(): [boolean, number | null] {
    if (this._isUpdate) {
      this._isUpdate = false;
      return [true, this._sequenceId];
    }

    return [false, null];
  }

  public reset(): void {
    this._sequenceId = 0;
    this._isUpdate = false;
  }
}

class AbortableTask {
  private readonly _func: (obj?: any) => Promise<void>;
  private readonly _abortController: AbortController;
  private readonly _interval: number;
  private readonly _obj?: any;

  constructor(func: (obj?: any) => Promise<void>, interval: number, obj?: any) {
    this._func = func;
    this._abortController = new AbortController();
    this._interval = interval;
    this._obj = obj;
    this._start();
  }

  public abort(): void {
    try {
      this._abortController.abort();
    } catch {
      /** empty */
    }
  }

  private async _start(): Promise<void> {
    const signal = this._abortController.signal;
    while (!signal.aborted) {
      try {
        await this._func(this._obj);
      } catch {
        /** empty */
      } finally {
        await delay(this._interval);
      }
    }
  }
}

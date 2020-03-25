// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import {
  translate,
  Constants,
  MessagingError,
  retry,
  RetryOperationType,
  RetryConfig,
  ConditionErrorNameMapper,
  ErrorNameConditionMapper
} from "@azure/core-amqp";
import {
  Receiver,
  OnAmqpEvent,
  EventContext,
  ReceiverOptions,
  AmqpError,
  isAmqpError
} from "rhea-promise";
import * as log from "../log";
import { LinkEntity } from "./linkEntity";
import { ClientEntityContext } from "../clientEntityContext";
import { ServiceBusMessageImpl, DispositionType, ReceiveMode } from "../serviceBusMessage";
import { getUniqueName, calculateRenewAfterDuration } from "../util/utils";
import { MessageHandlerOptions } from "../models";

/**
 * @internal
 */
interface CreateReceiverOptions {
  onMessage: OnAmqpEventAsPromise;
  onClose: OnAmqpEventAsPromise;
  onSessionClose: OnAmqpEventAsPromise;
  onError: OnAmqpEvent;
  onSettled: OnAmqpEvent;
  onSessionError: OnAmqpEvent;
}

/**
 * @internal
 */
export interface OnAmqpEventAsPromise extends OnAmqpEvent {
  (context: EventContext): Promise<void>;
}

/**
 * @internal
 */
export interface PromiseLike {
  resolve: (value?: any) => void;
  reject: (reason?: any) => void;
  timer: NodeJS.Timer;
}

/**
 * @internal
 */
export interface DispositionOptions {
  propertiesToModify?: { [key: string]: any };
  error?: AmqpError;
}

/**
 * @internal
 */
export enum ReceiverType {
  batching = "batching",
  streaming = "streaming"
}

/**
 * @internal
 */
export interface ReceiveOptions extends MessageHandlerOptions {
  /**
   * @property {number} [receiveMode] The mode in which messages should be received.
   * Default: ReceiveMode.peekLock
   */
  receiveMode?: ReceiveMode;
}

/**
 * Describes the signature of the message handler passed to `registerMessageHandler` method.
 */
export interface OnMessage {
  /**
   * Handler for processing each incoming message.
   */
  (message: ServiceBusMessageImpl): Promise<void>;
}

/**
 * Describes the signature of the error handler passed to `registerMessageHandler` method.
 */
export interface OnError {
  /**
   * Handler for any error that occurs while receiving or processing messages.
   */
  (error: MessagingError | Error): void;
}

/**
 * @internal
 * Describes the MessageReceiver that will receive messages from ServiceBus.
 * @class MessageReceiver
 */
export class MessageReceiver extends LinkEntity {
  /**
   * @property {string} receiverType The type of receiver: "batching" or "streaming".
   */
  receiverType: ReceiverType;
  /**
   * @property {number} [maxConcurrentCalls] The maximum number of messages that should be
   * processed concurrently while in streaming mode. Once this limit has been reached, more
   * messages will not be received until the user's message handler has completed processing current message.
   * Default: 1
   */
  maxConcurrentCalls: number = 1;
  /**
   * @property {number} [receiveMode] The mode in which messages should be received.
   * Default: ReceiveMode.peekLock
   */
  receiveMode: ReceiveMode;
  /**
   * @property {boolean} autoComplete Indicates whether `Message.complete()` should be called
   * automatically after the message processing is complete while receiving messages with handlers.
   * Default: false.
   */
  autoComplete: boolean;
  /**
   * @property {number} maxAutoRenewDurationInSeconds The maximum duration within which the
   * lock will be renewed automatically. This value should be greater than the longest message
   * lock duration; for example, the `lockDuration` property on the received message.
   *
   * Default: `300` (5 minutes);
   */
  maxAutoRenewDurationInSeconds: number;
  /**
   * @property {number} [newMessageWaitTimeoutInSeconds] The maximum amount of idle time the
   * receiver will wait after a message has been received. If no messages are received by this
   * time then the receive operation will end.
   */
  newMessageWaitTimeoutInSeconds?: number;
  /**
   * @property {boolean} autoRenewLock Should lock renewal happen automatically.
   */
  autoRenewLock: boolean;
  /**
   * @property {Receiver} [_receiver] The AMQP receiver link.
   * @protected
   */
  protected _receiver?: Receiver;
  /**
   * @property {Map<number, Promise<any>>} _deliveryDispositionMap Maintains a map of deliveries that
   * are being actively disposed. It acts as a store for correlating the responses received for
   * active dispositions.
   */
  protected _deliveryDispositionMap: Map<number, PromiseLike> = new Map<number, PromiseLike>();
  /**
   * @property {OnMessage} _onMessage The message handler provided by the user that will be wrapped
   * inside _onAmqpMessage.
   * @protected
   */
  protected _onMessage!: OnMessage;
  /**
   * @property {OnMessage} _onError The error handler provided by the user that will be wrapped
   * inside _onAmqpError.
   * @protected
   */
  protected _onError?: OnError;
  /**
   * @property {OnAmqpEventAsPromise} _onAmqpMessage The message handler that will be set as the handler on the
   * underlying rhea receiver for the "message" event.
   * @protected
   */
  protected _onAmqpMessage: OnAmqpEventAsPromise;
  /**
   * @property {OnAmqpEventAsPromise} _onAmqpClose The message handler that will be set as the handler on the
   * underlying rhea receiver for the "receiver_close" event.
   * @protected
   */
  protected _onAmqpClose: OnAmqpEventAsPromise;
  /**
   * @property {OnAmqpEvent} _onSessionError The message handler that will be set as the handler on
   * the underlying rhea receiver's session for the "session_error" event.
   * @protected
   */
  protected _onSessionError: OnAmqpEvent;
  /**
   * @property {OnAmqpEventAsPromise} _onSessionClose The message handler that will be set as the handler on
   * the underlying rhea receiver's session for the "session_close" event.
   * @protected
   */
  protected _onSessionClose: OnAmqpEventAsPromise;
  /**
   * @property {OnAmqpEvent} _onAmqpError The message handler that will be set as the handler on the
   * underlying rhea receiver for the "receiver_error" event.
   * @protected
   */
  protected _onAmqpError: OnAmqpEvent;
  /**
   * @property {OnAmqpEvent} _onSettled The message handler that will be set as the handler on the
   * underlying rhea receiver for the "settled" event.
   * @protected
   */
  protected _onSettled: OnAmqpEvent;
  /**
   * @property {boolean} wasCloseInitiated Denotes if receiver was explicitly closed by user.
   * @protected
   */
  protected wasCloseInitiated?: boolean;
  /**
   * @property {Map<string, Function>} _messageRenewLockTimers Maintains a map of messages for which
   * the lock is automatically renewed.
   * @protected
   */
  protected _messageRenewLockTimers: Map<string, NodeJS.Timer | undefined> = new Map<
    string,
    NodeJS.Timer | undefined
  >();
  /**
   * @property {NodeJS.Timer} _newMessageReceivedTimer The timer that keeps track of time since the
   * last message was received.
   */
  protected _newMessageReceivedTimer?: NodeJS.Timer;
  /**
   * Resets the `_newMessageReceivedTimer` timer when a new message is received.
   */
  protected resetTimerOnNewMessageReceived: () => void;
  /**
   * @property {Function} _clearMessageLockRenewTimer Clears the message lock renew timer for a
   * specific messageId.
   * @protected
   */
  protected _clearMessageLockRenewTimer: (messageId: string) => void;
  /**
   * @property {Function} _clearMessageLockRenewTimer Clears the message lock renew timer for all
   * the active messages.
   * @protected
   */
  protected _clearAllMessageLockRenewTimers: () => void;
  constructor(context: ClientEntityContext, receiverType: ReceiverType, options?: ReceiveOptions) {
    super(context.entityPath, context, {
      address: context.entityPath,
      audience: `${context.namespace.config.endpoint}${context.entityPath}`
    });
    if (!options) options = {};
    this.wasCloseInitiated = false;
    this.receiverType = receiverType;
    this.receiveMode = options.receiveMode || ReceiveMode.peekLock;
    if (typeof options.maxConcurrentCalls === "number" && options.maxConcurrentCalls > 0) {
      this.maxConcurrentCalls = options.maxConcurrentCalls;
    }
    this.resetTimerOnNewMessageReceived = () => {
      /** */
    };
    // If explicitly set to false then autoComplete is false else true (default).
    this.autoComplete = options.autoComplete === false ? options.autoComplete : true;
    this.maxAutoRenewDurationInSeconds =
      options.maxMessageAutoRenewLockDurationInSeconds != null
        ? options.maxMessageAutoRenewLockDurationInSeconds
        : 300;
    this.autoRenewLock =
      this.maxAutoRenewDurationInSeconds > 0 && this.receiveMode === ReceiveMode.peekLock;
    this._clearMessageLockRenewTimer = (messageId: string) => {
      if (this._messageRenewLockTimers.has(messageId)) {
        clearTimeout(this._messageRenewLockTimers.get(messageId) as NodeJS.Timer);
        log.receiver(
          "[%s] Cleared the message renew lock timer for message with id '%s'.",
          this._context.namespace.connectionId,
          messageId
        );
        this._messageRenewLockTimers.delete(messageId);
      }
    };
    this._clearAllMessageLockRenewTimers = () => {
      log.receiver(
        "[%s] Clearing message renew lock timers for all the active messages.",
        this._context.namespace.connectionId
      );
      for (const messageId of this._messageRenewLockTimers.keys()) {
        this._clearMessageLockRenewTimer(messageId);
      }
    };
    // setting all the handlers
    this._onSettled = (context: EventContext) => {
      const connectionId = this._context.namespace.connectionId;
      const delivery = context.delivery;
      if (delivery) {
        const id = delivery.id;
        const state = delivery.remote_state;
        const settled = delivery.remote_settled;
        log.receiver(
          "[%s] Delivery with id %d, remote_settled: %s, remote_state: %o has been " + "received.",
          connectionId,
          id,
          settled,
          state && state.error ? state.error : state
        );
        if (settled && this._deliveryDispositionMap.has(id)) {
          const promise = this._deliveryDispositionMap.get(id) as PromiseLike;
          clearTimeout(promise.timer);
          log.receiver(
            "[%s] Found the delivery with id %d in the map and cleared the timer.",
            connectionId,
            id
          );
          const deleteResult = this._deliveryDispositionMap.delete(id);
          log.receiver(
            "[%s] Successfully deleted the delivery with id %d from the map.",
            connectionId,
            id,
            deleteResult
          );
          if (state && state.error && (state.error.condition || state.error.description)) {
            const error = translate(state.error);
            return promise.reject(error);
          }

          return promise.resolve();
        }
      }
    };

    this._onAmqpMessage = async (context: EventContext) => {
      // If the receiver got closed in PeekLock mode, avoid processing the message as we
      // cannot settle the message.
      if (
        this.receiveMode === ReceiveMode.peekLock &&
        (!this._receiver || !this._receiver.isOpen())
      ) {
        log.error(
          "[%s] Not calling the user's message handler for the current message " +
            "as the receiver '%s' is closed",
          this._context.namespace.connectionId,
          this.name
        );
        return;
      }

      this.resetTimerOnNewMessageReceived();
      const connectionId = this._context.namespace.connectionId;
      const bMessage: ServiceBusMessageImpl = new ServiceBusMessageImpl(
        this._context,
        context.message!,
        context.delivery!,
        true
      );

      if (this.autoRenewLock && bMessage.lockToken) {
        const lockToken = bMessage.lockToken;
        // - We need to renew locks before they expire by looking at bMessage.lockedUntilUtc.
        // - This autorenewal needs to happen **NO MORE** than maxAutoRenewDurationInSeconds
        // - We should be able to clear the renewal timer when the user's message handler
        // is done (whether it succeeds or fails).
        // Setting the messageId with undefined value in the _messageRenewockTimers Map because we
        // track state by checking the presence of messageId in the map. It is removed from the map
        // when an attempt is made to settle the message (either by the user or by the sdk) OR
        // when the execution of user's message handler completes.
        this._messageRenewLockTimers.set(bMessage.messageId as string, undefined);
        log.receiver(
          "[%s] message with id '%s' is locked until %s.",
          connectionId,
          bMessage.messageId,
          bMessage.lockedUntilUtc!.toString()
        );
        const totalAutoLockRenewDuration = Date.now() + this.maxAutoRenewDurationInSeconds * 1000;
        log.receiver(
          "[%s] Total autolockrenew duration for message with id '%s' is: ",
          connectionId,
          bMessage.messageId,
          new Date(totalAutoLockRenewDuration).toString()
        );
        const autoRenewLockTask = (): void => {
          if (
            new Date(totalAutoLockRenewDuration) > bMessage.lockedUntilUtc! &&
            Date.now() < totalAutoLockRenewDuration
          ) {
            if (this._messageRenewLockTimers.has(bMessage.messageId as string)) {
              // TODO: We can run into problems with clock skew between the client and the server.
              // It would be better to calculate the duration based on the "lockDuration" property
              // of the queue. However, we do not have the management plane of the client ready for
              // now. Hence we rely on the lockedUntilUtc property on the message set by ServiceBus.
              const amount = calculateRenewAfterDuration(bMessage.lockedUntilUtc!);
              log.receiver(
                "[%s] Sleeping for %d milliseconds while renewing the lock for " +
                  "message with id '%s' is: ",
                connectionId,
                amount,
                bMessage.messageId
              );
              // Setting the value of the messageId to the actual timer. This will be cleared when
              // an attempt is made to settle the message (either by the user or by the sdk) OR
              // when the execution of user's message handler completes.
              this._messageRenewLockTimers.set(
                bMessage.messageId as string,
                setTimeout(async () => {
                  try {
                    log.receiver(
                      "[%s] Attempting to renew the lock for message with id '%s'.",
                      connectionId,
                      bMessage.messageId
                    );
                    bMessage.lockedUntilUtc = await this._context.managementClient!.renewLock(
                      lockToken
                    );
                    log.receiver(
                      "[%s] Successfully renewed the lock for message with id '%s'.",
                      connectionId,
                      bMessage.messageId
                    );
                    log.receiver(
                      "[%s] Calling the autorenewlock task again for message with " + "id '%s'.",
                      connectionId,
                      bMessage.messageId
                    );
                    autoRenewLockTask();
                  } catch (err) {
                    log.error(
                      "[%s] An error occured while auto renewing the message lock '%s' " +
                        "for message with id '%s': %O.",
                      connectionId,
                      bMessage.lockToken,
                      bMessage.messageId,
                      err
                    );
                    // Let the user know that there was an error renewing the message lock.
                    this._onError!(err);
                  }
                }, amount)
              );
            } else {
              log.receiver(
                "[%s] Looks like the message lock renew timer has already been " +
                  "cleared for message with id '%s'.",
                connectionId,
                bMessage.messageId
              );
            }
          } else {
            log.receiver(
              "[%s] Current time %s exceeds the total autolockrenew duration %s for " +
                "message with messageId '%s'. Hence we will stop the autoLockRenewTask.",
              connectionId,
              new Date(Date.now()).toString(),
              new Date(totalAutoLockRenewDuration).toString(),
              bMessage.messageId
            );
            this._clearMessageLockRenewTimer(bMessage.messageId as string);
          }
        };
        // start
        autoRenewLockTask();
      }
      try {
        await this._onMessage(bMessage);
        this._clearMessageLockRenewTimer(bMessage.messageId as string);
      } catch (err) {
        // This ensures we call users' error handler when users' message handler throws.
        if (!isAmqpError(err)) {
          log.error(
            "[%s] An error occurred while running user's message handler for the message " +
              "with id '%s' on the receiver '%s': %O",
            connectionId,
            bMessage.messageId,
            this.name,
            err
          );
          this._onError!(err);
        }

        // Do not want renewLock to happen unnecessarily, while abandoning the message. Hence,
        // doing this here. Otherwise, this should be done in finally.
        this._clearMessageLockRenewTimer(bMessage.messageId as string);
        const error = translate(err) as MessagingError;
        // Nothing much to do if user's message handler throws. Let us try abandoning the message.
        if (
          !bMessage.delivery.remote_settled &&
          error.code !== ConditionErrorNameMapper["com.microsoft:message-lock-lost"] &&
          this.receiveMode === ReceiveMode.peekLock &&
          this.isOpen() // only try to abandon the messages if the connection is still open
        ) {
          try {
            log.error(
              "[%s] Abandoning the message with id '%s' on the receiver '%s' since " +
                "an error occured: %O.",
              connectionId,
              bMessage.messageId,
              this.name,
              error
            );
            await bMessage.abandon();
          } catch (abandonError) {
            const translatedError = translate(abandonError);
            log.error(
              "[%s] An error occurred while abandoning the message with id '%s' on the " +
                "receiver '%s': %O.",
              connectionId,
              bMessage.messageId,
              this.name,
              translatedError
            );
            this._onError!(translatedError);
          }
        }
        return;
      } finally {
        if (this._receiver) {
          this._receiver.addCredit(1);
        }
      }

      // If we've made it this far, then user's message handler completed fine. Let us try
      // completing the message.
      if (
        this.autoComplete &&
        this.receiveMode === ReceiveMode.peekLock &&
        !bMessage.delivery.remote_settled
      ) {
        try {
          log[this.receiverType](
            "[%s] Auto completing the message with id '%s' on " + "the receiver '%s'.",
            connectionId,
            bMessage.messageId,
            this.name
          );
          await bMessage.complete();
        } catch (completeError) {
          const translatedError = translate(completeError);
          log.error(
            "[%s] An error occurred while completing the message with id '%s' on the " +
              "receiver '%s': %O.",
            connectionId,
            bMessage.messageId,
            this.name,
            translatedError
          );
          this._onError!(translatedError);
        }
      }
    };

    this._onAmqpError = (context: EventContext) => {
      const connectionId = this._context.namespace.connectionId;
      const receiver = this._receiver || context.receiver!;
      const receiverError = context.receiver && context.receiver.error;
      if (receiverError) {
        const sbError = translate(receiverError) as MessagingError;
        log.error(
          "[%s] An error occurred for Receiver '%s': %O.",
          connectionId,
          this.name,
          sbError
        );
        if (!sbError.retryable) {
          if (receiver && !receiver.isItselfClosed()) {
            log.error(
              "[%s] Since the user did not close the receiver and the error is not " +
                "retryable, we let the user know about it by calling the user's error handler.",
              connectionId
            );
            this._onError!(sbError);
          } else {
            log.error(
              "[%s] The received error is not retryable. However, the receiver was " +
                "closed by the user. Hence not notifying the user's error handler.",
              connectionId
            );
          }
        } else {
          log.error(
            "[%s] Since received error is retryable, we will NOT notify the user's " +
              "error handler.",
            connectionId
          );
        }
      }
      if (this._newMessageReceivedTimer) {
        clearTimeout(this._newMessageReceivedTimer);
      }
    };

    this._onSessionError = (context: EventContext) => {
      const connectionId = this._context.namespace.connectionId;
      const receiver = this._receiver || context.receiver!;
      const sessionError = context.session && context.session.error;
      if (sessionError) {
        const sbError = translate(sessionError) as MessagingError;
        log.error(
          "[%s] An error occurred on the session for Receiver '%s': %O.",
          connectionId,
          this.name,
          sbError
        );
        if (receiver && !receiver.isSessionItselfClosed() && !sbError.retryable) {
          log.error(
            "[%s] Since the user did not close the receiver and the session error is not " +
              "retryable, we let the user know about it by calling the user's error handler.",
            connectionId
          );
          this._onError!(sbError);
        }
      }
      if (this._newMessageReceivedTimer) {
        clearTimeout(this._newMessageReceivedTimer);
      }
    };

    this._onAmqpClose = async (context: EventContext) => {
      const connectionId = this._context.namespace.connectionId;
      const receiverError = context.receiver && context.receiver.error;
      const receiver = this._receiver || context.receiver!;
      if (receiverError) {
        log.error(
          "[%s] 'receiver_close' event occurred for receiver '%s' with address '%s'. " +
            "The associated error is: %O",
          connectionId,
          this.name,
          this.address,
          receiverError
        );
      }
      this._clearAllMessageLockRenewTimers();
      if (receiver && !receiver.isItselfClosed()) {
        if (!this.isConnecting) {
          log.error(
            "[%s] 'receiver_close' event occurred on the receiver '%s' with address '%s' " +
              "and the sdk did not initiate this. The receiver is not reconnecting. Hence, calling " +
              "detached from the _onAmqpClose() handler.",
            connectionId,
            this.name,
            this.address
          );
          await this.onDetached(receiverError);
        } else {
          log.error(
            "[%s] 'receiver_close' event occurred on the receiver '%s' with address '%s' " +
              "and the sdk did not initate this. Moreover the receiver is already re-connecting. " +
              "Hence not calling detached from the _onAmqpClose() handler.",
            connectionId,
            this.name,
            this.address
          );
        }
      } else {
        log.error(
          "[%s] 'receiver_close' event occurred on the receiver '%s' with address '%s' " +
            "because the sdk initiated it. Hence not calling detached from the _onAmqpClose" +
            "() handler.",
          connectionId,
          this.name,
          this.address
        );
      }
    };

    this._onSessionClose = async (context: EventContext) => {
      const connectionId = this._context.namespace.connectionId;
      const receiver = this._receiver || context.receiver!;
      const sessionError = context.session && context.session.error;
      if (sessionError) {
        log.error(
          "[%s] 'session_close' event occurred for receiver '%s' with address '%s'. " +
            "The associated error is: %O",
          connectionId,
          this.name,
          this.address,
          sessionError
        );
      }
      this._clearAllMessageLockRenewTimers();
      if (receiver && !receiver.isSessionItselfClosed()) {
        if (!this.isConnecting) {
          log.error(
            "[%s] 'session_close' event occurred on the session of receiver '%s' with " +
              "address '%s' and the sdk did not initiate this. Hence calling detached from the " +
              "_onSessionClose() handler.",
            connectionId,
            this.name,
            this.address
          );
          await this.onDetached(sessionError);
        } else {
          log.error(
            "[%s] 'session_close' event occurred on the session of receiver '%s' with " +
              "address '%s' and the sdk did not initiate this. Moreover the receiver is already " +
              "re-connecting. Hence not calling detached from the _onSessionClose() handler.",
            connectionId,
            this.name,
            this.address
          );
        }
      } else {
        log.error(
          "[%s] 'session_close' event occurred on the session of receiver '%s' with address " +
            "'%s' because the sdk initiated it. Hence not calling detached from the _onSessionClose" +
            "() handler.",
          connectionId,
          this.name,
          this.address
        );
      }
    };
  }

  /**
   * Creates the options that need to be specified while creating an AMQP receiver link.
   */
  protected _createReceiverOptions(
    useNewName?: boolean,
    options?: CreateReceiverOptions
  ): ReceiverOptions {
    if (!options) {
      options = {
        onMessage: (context: EventContext) =>
          this._onAmqpMessage(context).catch(() => {
            /* */
          }),
        onClose: (context: EventContext) =>
          this._onAmqpClose(context).catch(() => {
            /* */
          }),
        onSessionClose: (context: EventContext) =>
          this._onSessionClose(context).catch(() => {
            /* */
          }),
        onError: this._onAmqpError,
        onSessionError: this._onSessionError,
        onSettled: this._onSettled
      };
    }
    const rcvrOptions: ReceiverOptions = {
      name: useNewName ? getUniqueName(this._context.entityPath) : this.name,
      autoaccept: this.receiveMode === ReceiveMode.receiveAndDelete ? true : false,
      // receiveAndDelete -> first(0), peekLock -> second (1)
      rcv_settle_mode: this.receiveMode === ReceiveMode.receiveAndDelete ? 0 : 1,
      // receiveAndDelete -> settled (1), peekLock -> unsettled (0)
      snd_settle_mode: this.receiveMode === ReceiveMode.receiveAndDelete ? 1 : 0,
      source: {
        address: this.address
      },
      credit_window: 0,
      ...options
    };

    return rcvrOptions;
  }

  /**
   * Creates a new AMQP receiver under a new AMQP session.
   * @protected
   *
   * @returns {Promise<void>} Promise<void>.
   */
  protected async _init(options?: ReceiverOptions): Promise<void> {
    const connectionId = this._context.namespace.connectionId;
    try {
      if (!this.isOpen() && !this.isConnecting) {
        log.error(
          "[%s] The receiver '%s' with address '%s' is not open and is not currently " +
            "establishing itself. Hence let's try to connect.",
          connectionId,
          this.name,
          this.address
        );

        if (options && options.name) {
          this.name = options.name;
        }

        this.isConnecting = true;
        await this._negotiateClaim();
        if (!options) {
          options = this._createReceiverOptions();
        }
        log.error(
          "[%s] Trying to create receiver '%s' with options %O",
          connectionId,
          this.name,
          options
        );

        this._receiver = await this._context.namespace.connection.createReceiver(options);
        this.isConnecting = false;
        log.error(
          "[%s] Receiver '%s' with address '%s' has established itself.",
          connectionId,
          this.name,
          this.address
        );
        log[this.receiverType](
          "Promise to create the receiver resolved. " + "Created receiver with name: ",
          this.name
        );
        log[this.receiverType](
          "[%s] Receiver '%s' created with receiver options: %O",
          connectionId,
          this.name,
          options
        );
        // It is possible for someone to close the receiver and then start it again.
        // Thus make sure that the receiver is present in the client cache.
        if (this.receiverType === ReceiverType.streaming && !this._context.streamingReceiver) {
          this._context.streamingReceiver = this as any;
        } else if (this.receiverType === ReceiverType.batching && !this._context.batchingReceiver) {
          this._context.batchingReceiver = this as any;
        }
        await this._ensureTokenRenewal();
      } else {
        log.error(
          "[%s] The receiver '%s' with address '%s' is open -> %s and is connecting " +
            "-> %s. Hence not reconnecting.",
          connectionId,
          this.name,
          this.address,
          this.isOpen(),
          this.isConnecting
        );
      }
    } catch (err) {
      this.isConnecting = false;
      err = translate(err);
      log.error(
        "[%s] An error occured while creating the receiver '%s': %O",
        this._context.namespace.connectionId,
        this.name,
        err
      );
      throw err;
    }
  }

  protected _deleteFromCache(): void {
    this._receiver = undefined;
    if (this.receiverType === ReceiverType.streaming) {
      this._context.streamingReceiver = undefined;
    } else if (this.receiverType === ReceiverType.batching) {
      this._context.batchingReceiver = undefined;
    }
    log.error(
      "[%s] Deleted the receiver '%s' from the client cache.",
      this._context.namespace.connectionId,
      this.name
    );
  }

  /**
   * Will reconnect the receiver link if necessary.
   * @param {AmqpError | Error} [receiverError] The receiver error if any.
   * @returns {Promise<void>} Promise<void>.
   */
  async onDetached(receiverError?: AmqpError | Error): Promise<void> {
    const connectionId = this._context.namespace.connectionId;
    try {
      // Local 'wasCloseInitiated' serves same purpose as {this.wasCloseInitiated}
      // but the condition is inferred based on state of receiver in context of network disconnect scenario
      const wasCloseInitiated = this._receiver && this._receiver.isItselfClosed();
      // Clears the token renewal timer. Closes the link and its session if they are open.
      // Removes the link and its session if they are present in rhea's cache.
      await this._closeLink(this._receiver);

      if (this.receiverType === ReceiverType.batching) {
        log.error(
          "[%s] Receiver '%s' with address '%s' is a Batching Receiver, so we will not be " +
            "re-establishing the receiver link.",
          connectionId,
          this.name,
          this.address
        );
        return;
      }

      // We should attempt to reopen only when the receiver(sdk) did not initiate the close
      let shouldReopen = false;
      if (receiverError && !wasCloseInitiated) {
        const translatedError = translate(receiverError) as MessagingError;
        if (translatedError.retryable) {
          shouldReopen = true;
          log.error(
            "[%s] close() method of Receiver '%s' with address '%s' was not called. There " +
              "was an accompanying error and it is retryable. This is a candidate for re-establishing " +
              "the receiver link.",
            connectionId,
            this.name,
            this.address
          );
        } else {
          log.error(
            "[%s] close() method of Receiver '%s' with address '%s' was not called. There " +
              "was an accompanying error and it is NOT retryable. Hence NOT re-establishing " +
              "the receiver link.",
            connectionId,
            this.name,
            this.address
          );
        }
      } else if (!wasCloseInitiated) {
        shouldReopen = true;
        log.error(
          "[%s] close() method of Receiver '%s' with address '%s' was not called. " +
            "There was no accompanying error as well. This is a candidate for re-establishing " +
            "the receiver link.",
          connectionId,
          this.name,
          this.address
        );
      } else {
        const state: any = {
          wasCloseInitiated: wasCloseInitiated,
          receiverError: receiverError,
          _receiver: this._receiver
        };
        log.error(
          "[%s] Something went wrong. State of Receiver '%s' with address '%s' is: %O",
          connectionId,
          this.name,
          this.address,
          state
        );
      }
      if (shouldReopen) {
        // provide a new name to the link while re-connecting it. This ensures that
        // the service does not send an error stating that the link is still open.
        const options: ReceiverOptions = this._createReceiverOptions(true);

        // shall retry forever at an interval of 15 seconds if the error is a retryable error
        // else bail out when the error is not retryable or the oepration succeeds.
        const config: RetryConfig<void> = {
          operation: () =>
            this._init(options).then(async () => {
              if (this.wasCloseInitiated) {
                log.error(
                  "[%s] close() method of Receiver '%s' with address '%s' was called. " +
                    "by the time the receiver finished getting created. Hence, disallowing messages from being received. ",
                  connectionId,
                  this.name,
                  this.address
                );
                await this.close();
              } else {
                if (this._receiver && this.receiverType === ReceiverType.streaming) {
                  this._receiver.addCredit(this.maxConcurrentCalls);
                }
              }
              return;
            }),
          connectionId: connectionId,
          operationType: RetryOperationType.receiverLink,
          retryOptions: {
            maxRetries: Constants.defaultMaxRetriesForConnection,
            retryDelayInMs: 15000
          },
          connectionHost: this._context.namespace.config.host
        };
        if (!this.wasCloseInitiated) {
          await retry<void>(config);
        }
      }
    } catch (err) {
      log.error(
        "[%s] An error occurred while processing detached() of Receiver '%s': %O ",
        connectionId,
        this.name,
        this.address,
        err
      );
      if (typeof this._onError === "function") {
        log.error(
          "[%s] Unable to automatically reconnect Receiver '%s' with address '%s'.",
          connectionId,
          this.name,
          this.address
        );
        try {
          this._onError(err);
        } catch (err) {
          log.error(
            "[%s] User-code error in error handler called after disconnect: %O",
            connectionId,
            err
          );
        }
      }
    }
  }

  /**
   * Closes the underlying AMQP receiver.
   * @return {Promise<void>} Promise<void>.
   */
  async close(): Promise<void> {
    this.wasCloseInitiated = true;
    log.receiver(
      "[%s] Closing the [%s]Receiver for entity '%s'.",
      this._context.namespace.connectionId,
      this.receiverType,
      this._context.entityPath
    );
    if (this._newMessageReceivedTimer) clearTimeout(this._newMessageReceivedTimer);
    this._clearAllMessageLockRenewTimers();
    if (this._receiver) {
      const receiverLink = this._receiver;
      this._deleteFromCache();
      await this._closeLink(receiverLink);
    }
  }

  /**
   * Settles the message with the specified disposition.
   * @param message The ServiceBus Message that needs to be settled.
   * @param operation The disposition type.
   * @param options Optional parameters that can be provided while disposing the message.
   */
  async settleMessage(
    message: ServiceBusMessageImpl,
    operation: DispositionType,
    options?: DispositionOptions
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!options) options = {};
      if (operation.match(/^(complete|abandon|defer|deadletter)$/) == null) {
        return reject(new Error(`operation: '${operation}' is not a valid operation.`));
      }
      this._clearMessageLockRenewTimer(message.messageId as string);
      const delivery = message.delivery;
      const timer = setTimeout(() => {
        this._deliveryDispositionMap.delete(delivery.id);

        log.receiver(
          "[%s] Disposition for delivery id: %d, did not complete in %d milliseconds. " +
            "Hence rejecting the promise with timeout error.",
          this._context.namespace.connectionId,
          delivery.id,
          Constants.defaultOperationTimeoutInMs
        );

        const e: AmqpError = {
          condition: ErrorNameConditionMapper.ServiceUnavailableError,
          description:
            "Operation to settle the message has timed out. The disposition of the " +
            "message may or may not be successful"
        };
        return reject(translate(e));
      }, Constants.defaultOperationTimeoutInMs);
      this._deliveryDispositionMap.set(delivery.id, {
        resolve: resolve,
        reject: reject,
        timer: timer
      });
      if (operation === DispositionType.complete) {
        delivery.accept();
      } else if (operation === DispositionType.abandon) {
        const params: any = {
          undeliverable_here: false
        };
        if (options.propertiesToModify) params.message_annotations = options.propertiesToModify;
        delivery.modified(params);
      } else if (operation === DispositionType.defer) {
        const params: any = {
          undeliverable_here: true
        };
        if (options.propertiesToModify) params.message_annotations = options.propertiesToModify;
        delivery.modified(params);
      } else if (operation === DispositionType.deadletter) {
        delivery.reject(options.error || {});
      }
    });
  }

  /**
   * Determines whether the AMQP receiver link is open. If open then returns true else returns false.
   * @return {boolean} boolean
   */
  isOpen(): boolean {
    const result: boolean = this._receiver! && this._receiver!.isOpen();
    log.error(
      "[%s] Receiver '%s' with address '%s' is open? -> %s",
      this._context.namespace.connectionId,
      this.name,
      this.address,
      result
    );
    return result;
  }
}

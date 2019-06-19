// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import uuid from "uuid/v4";
import * as log from "./log";
import {
  messageProperties,
  Sender,
  EventContext,
  OnAmqpEvent,
  SenderOptions as RheaSenderOptions,
  SenderEvents,
  message,
  AmqpError
} from "rhea-promise";
import {
  defaultLock,
  Func,
  retry,
  translate,
  AmqpMessage,
  ErrorNameConditionMapper,
  RetryConfig,
  RetryOperationType,
  Constants,
  randomNumberFromInterval
} from "@azure/core-amqp";
import { EventData, toAmqpMessage } from "./eventData";
import { ConnectionContext } from "./connectionContext";
import { LinkEntity } from "./linkEntity";
import { SendOptions, EventHubProducerOptions } from "./eventHubClient";
import { AbortSignalLike, AbortError } from "@azure/abort-controller";

interface CreateSenderOptions {
  newName?: boolean;
}

/**
 * Describes the EventHubSender that will send event data to EventHub.
 * @class EventHubSender
 * @ignore
 */
export class EventHubSender extends LinkEntity {
  /**
   * @property {string} senderLock The unqiue lock name per connection that is used to acquire the
   * lock for establishing a sender link by an entity on that connection.
   * @readonly
   */
  readonly senderLock: string = `sender-${uuid()}`;
  /**
   * @property {OnAmqpEvent} _onAmqpError The handler function to handle errors that happen on the
   * underlying sender.
   * @readonly
   */
  private readonly _onAmqpError: OnAmqpEvent;
  /**
   * @property {OnAmqpEvent} _onAmqpClose The handler function to handle "sender_close" event
   * that happens on the underlying sender.
   * @readonly
   */
  private readonly _onAmqpClose: OnAmqpEvent;
  /**
   * @property {OnAmqpEvent} _onSessionError The message handler that will be set as the handler on
   * the underlying rhea sender's session for the "session_error" event.
   * @private
   */
  private _onSessionError: OnAmqpEvent;
  /**
   * @property {OnAmqpEvent} _onSessionClose The message handler that will be set as the handler on
   * the underlying rhea sender's session for the "session_close" event.
   * @private
   */
  private _onSessionClose: OnAmqpEvent;
  /**
   * @property {Sender} [_sender] The AMQP sender link.
   * @private
   */
  private _sender?: Sender;

  /**
   * Creates a new EventHubSender instance.
   * @ignore
   * @constructor
   * @param {ConnectionContext} context The connection context.
   * @param {string|number} [partitionId] The EventHub partition id to which the sender
   * wants to send the event data.
   */
  constructor(context: ConnectionContext, partitionId?: string | number, name?: string) {
    super(context, {
      name: context.config.getSenderAddress(partitionId),
      partitionId: partitionId
    });
    this.address = context.config.getSenderAddress(partitionId);
    this.audience = context.config.getSenderAudience(partitionId);

    this._onAmqpError = (context: EventContext) => {
      const senderError = context.sender && context.sender.error;
      if (senderError) {
        const err = translate(senderError);
        log.error("[%s] An error occurred for sender '%s': %O.", this._context.connectionId, this.name, err);
      }
    };

    this._onSessionError = (context: EventContext) => {
      const sessionError = context.session && context.session.error;
      if (sessionError) {
        const err = translate(sessionError);
        log.error(
          "[%s] An error occurred on the session of sender '%s': %O.",
          this._context.connectionId,
          this.name,
          err
        );
      }
    };

    this._onAmqpClose = async (context: EventContext) => {
      const sender = this._sender || context.sender!;
      const senderError = context.sender && context.sender.error;
      if (senderError) {
        log.error(
          "[%s] 'sender_close' event occurred for sender '%s' with address '%s'. " + "The associated error is: %O",
          this._context.connectionId,
          this.name,
          this.address,
          senderError
        );
      }
      if (sender && !sender.isItselfClosed()) {
        if (!this.isConnecting) {
          log.error(
            "[%s] 'sender_close' event occurred on the sender '%s' with address '%s' " +
              "and the sdk did not initiate this. The sender is not reconnecting. Hence, calling " +
              "detached from the _onAmqpClose() handler.",
            this._context.connectionId,
            this.name,
            this.address
          );
          await this.detached(senderError);
        } else {
          log.error(
            "[%s] 'sender_close' event occurred on the sender '%s' with address '%s' " +
              "and the sdk did not initate this. Moreover the sender is already re-connecting. " +
              "Hence not calling detached from the _onAmqpClose() handler.",
            this._context.connectionId,
            this.name,
            this.address
          );
        }
      } else {
        log.error(
          "[%s] 'sender_close' event occurred on the sender '%s' with address '%s' " +
            "because the sdk initiated it. Hence not calling detached from the _onAmqpClose" +
            "() handler.",
          this._context.connectionId,
          this.name,
          this.address
        );
      }
    };

    this._onSessionClose = async (context: EventContext) => {
      const sender = this._sender || context.sender!;
      const sessionError = context.session && context.session.error;
      if (sessionError) {
        log.error(
          "[%s] 'session_close' event occurred for sender '%s' with address '%s'. " + "The associated error is: %O",
          this._context.connectionId,
          this.name,
          this.address,
          sessionError
        );
      }
      if (sender && !sender.isSessionItselfClosed()) {
        if (!this.isConnecting) {
          log.error(
            "[%s] 'session_close' event occurred on the session of sender '%s' with " +
              "address '%s' and the sdk did not initiate this. Hence calling detached from the " +
              "_onSessionClose() handler.",
            this._context.connectionId,
            this.name,
            this.address
          );
          await this.detached(sessionError);
        } else {
          log.error(
            "[%s] 'session_close' event occurred on the session of sender '%s' with " +
              "address '%s' and the sdk did not initiate this. Moreover the sender is already " +
              "re-connecting. Hence not calling detached from the _onSessionClose() handler.",
            this._context.connectionId,
            this.name,
            this.address
          );
        }
      } else {
        log.error(
          "[%s] 'session_close' event occurred on the session of sender '%s' with address " +
            "'%s' because the sdk initiated it. Hence not calling detached from the _onSessionClose" +
            "() handler.",
          this._context.connectionId,
          this.name,
          this.address
        );
      }
    };
  }

  /**
   * Will reconnect the sender link if necessary.
   * @ignore
   * @param {AmqpError | Error} [senderError] The sender error if any.
   * @returns {Promise<void>} Promise<void>.
   */
  async detached(senderError?: AmqpError | Error): Promise<void> {
    try {
      const wasCloseInitiated = this._sender && this._sender.isItselfClosed();
      // Clears the token renewal timer. Closes the link and its session if they are open.
      // Removes the link and its session if they are present in rhea's cache.
      await this._closeLink(this._sender);
      // We should attempt to reopen only when the sender(sdk) did not initiate the close
      let shouldReopen = false;
      if (senderError && !wasCloseInitiated) {
        const translatedError = translate(senderError);
        if (translatedError.retryable) {
          shouldReopen = true;
          log.error(
            "[%s] close() method of Sender '%s' with address '%s' was not called. There " +
              "was an accompanying error an it is retryable. This is a candidate for re-establishing " +
              "the sender link.",
            this._context.connectionId,
            this.name,
            this.address
          );
        } else {
          log.error(
            "[%s] close() method of Sender '%s' with address '%s' was not called. There " +
              "was an accompanying error and it is NOT retryable. Hence NOT re-establishing " +
              "the sender link.",
            this._context.connectionId,
            this.name,
            this.address
          );
        }
      } else if (!wasCloseInitiated) {
        shouldReopen = true;
        log.error(
          "[%s] close() method of Sender '%s' with address '%s' was not called. There " +
            "was no accompanying error as well. This is a candidate for re-establishing " +
            "the sender link.",
          this._context.connectionId,
          this.name,
          this.address
        );
      } else {
        const state: any = {
          wasCloseInitiated: wasCloseInitiated,
          senderError: senderError,
          _sender: this._sender
        };
        log.error(
          "[%s] Something went wrong. State of sender '%s' with address '%s' is: %O",
          this._context.connectionId,
          this.name,
          this.address,
          state
        );
      }
      if (shouldReopen) {
        await defaultLock.acquire(this.senderLock, () => {
          const options: RheaSenderOptions = this._createSenderOptions({
            newName: true
          });
          // shall retry forever at an interval of 15 seconds if the error is a retryable error
          // else bail out when the error is not retryable or the oepration succeeds.
          const config: RetryConfig<void> = {
            operation: () => this._init(options),
            connectionId: this._context.connectionId,
            operationType: RetryOperationType.senderLink,
            times: Constants.defaultConnectionRetryAttempts,
            connectionHost: this._context.config.host,
            delayInSeconds: 15
          };
          return retry<void>(config);
        });
      }
    } catch (err) {
      log.error(
        "[%s] An error occurred while processing detached() of Sender '%s' with address " + "'%s': %O",
        this._context.connectionId,
        this.name,
        this.address,
        err
      );
    }
  }

  /**
   * Deletes the sender fromt the context. Clears the token renewal timer. Closes the sender link.
   * @ignore
   * @return {Promise<void>} Promise<void>
   */
  async close(): Promise<void> {
    if (this._sender) {
      log.sender(
        "[%s] Closing the Sender for the entity '%s'.",
        this._context.connectionId,
        this._context.config.entityPath
      );
      const senderLink = this._sender;
      this._deleteFromCache();
      await this._closeLink(senderLink);
    }
  }

  /**
   * Determines whether the AMQP sender link is open. If open then returns true else returns false.
   * @ignore
   * @return {boolean} boolean
   */
  isOpen(): boolean {
    const result: boolean = this._sender! && this._sender!.isOpen();
    log.error(
      "[%s] Sender '%s' with address '%s' is open? -> %s",
      this._context.connectionId,
      this.name,
      this.address,
      result
    );
    return result;
  }

  /**
   * Send a batch of EventData to the EventHub. The "message_annotations",
   * "application_properties" and "properties" of the first message will be set as that
   * of the envelope (batch message).
   * @ignore
   * @param events  An array of EventData objects to be sent in a Batch message.
   * @param options Options to control the way the events are batched along with request options
   * @return Promise<void>
   */
  async send(events: EventData[], options?: SendOptions & EventHubProducerOptions): Promise<void> {
    try {
      if (!this.isOpen()) {
        log.sender(
          "Acquiring lock %s for initializing the session, sender and " + "possibly the connection.",
          this.senderLock
        );
        await defaultLock.acquire(this.senderLock, () => {
          return this._init();
        });
      }
      log.sender("[%s] Sender '%s', trying to send EventData[].", this._context.connectionId, this.name);
      const partitionKey = (options && options.partitionKey) || undefined;
      const messages: AmqpMessage[] = [];
      // Convert EventData to AmqpMessage.
      for (let i = 0; i < events.length; i++) {
        const message = toAmqpMessage(events[i], partitionKey);
        message.body = this._context.dataTransformer.encode(events[i].body);
        messages[i] = message;
      }
      // Encode every amqp message and then convert every encoded message to amqp data section
      const batchMessage: AmqpMessage = {
        body: message.data_sections(messages.map(message.encode))
      };
      // Set message_annotations, application_properties and properties of the first message as
      // that of the envelope (batch message).
      if (messages[0].message_annotations) {
        batchMessage.message_annotations = messages[0].message_annotations;
      }
      if (messages[0].application_properties) {
        batchMessage.application_properties = messages[0].application_properties;
      }
      for (const prop of messageProperties) {
        if ((messages[0] as any)[prop]) {
          (batchMessage as any)[prop] = (messages[0] as any)[prop];
        }
      }

      // Finally encode the envelope (batch message).
      const encodedBatchMessage = message.encode(batchMessage);
      log.sender(
        "[%s] Sender '%s', sending encoded batch message.",
        this._context.connectionId,
        this.name,
        encodedBatchMessage
      );
      return await this._trySendBatch(encodedBatchMessage, batchMessage.message_id, options);
    } catch (err) {
      log.error("An error occurred while sending the batch message %O", err);
      throw err;
    }
  }

  private _deleteFromCache(): void {
    this._sender = undefined;
    delete this._context.senders[this.name];
    log.error(
      "[%s] Deleted the sender '%s' with address '%s' from the client cache.",
      this._context.connectionId,
      this.name,
      this.address
    );
  }

  private _createSenderOptions(options: CreateSenderOptions): RheaSenderOptions {
    if (options.newName) this.name = `${uuid()}`;
    const srOptions: RheaSenderOptions = {
      name: this.name,
      target: {
        address: this.address
      },
      onError: this._onAmqpError,
      onClose: this._onAmqpClose,
      onSessionError: this._onSessionError,
      onSessionClose: this._onSessionClose
    };
    log.sender("Creating sender with options: %O", srOptions);
    return srOptions;
  }

  /**
   * Tries to send the message to EventHub if there is enough credit to send them
   * and the circular buffer has available space to settle the message after sending them.
   *
   * We have implemented a synchronous send over here in the sense that we shall be waiting
   * for the message to be accepted or rejected and accordingly resolve or reject the promise.
   * @ignore
   * @param message The message to be sent to EventHub.
   * @return {Promise<void>} Promise<void>
   */
  private _trySendBatch(
    message: AmqpMessage | Buffer,
    tag: any,
    options?: SendOptions & EventHubProducerOptions,
    format?: number
  ): Promise<void> {
    if (!options) {
      options = {};
    }

    const abortSignal: AbortSignalLike | undefined = options.abortSignal;
    const sendEventPromise = () =>
      new Promise<void>((resolve, reject) => {
        const rejectOnAbort = () => {
          const desc: string =
            `[${this._context.connectionId}] The send operation on the Sender "${this.name}" with ` +
            `address "${this.address}" has been cancelled by the user.`;
          log.error(desc);
          reject(new AbortError("The send operation has been cancelled by the user."));
        };

        if (abortSignal && abortSignal.aborted) {
          // operation has been cancelled, so exit quickly
          return rejectOnAbort();
        }

        let waitTimer: any;
        log.sender(
          "[%s] Sender '%s', credit: %d available: %d",
          this._context.connectionId,
          this.name,
          this._sender!.credit,
          this._sender!.session.outgoing.available()
        );
        if (this._sender!.sendable()) {
          log.sender(
            "[%s] Sender '%s', sending message with id '%s'.",
            this._context.connectionId,
            this.name,
            (Buffer.isBuffer(message) ? tag : message.message_id) || tag || "<not specified>"
          );
          let onRejected: Func<EventContext, void>;
          let onReleased: Func<EventContext, void>;
          let onModified: Func<EventContext, void>;
          let onAccepted: Func<EventContext, void>;
          let onAborted: () => void;

          const removeListeners = (): void => {
            clearTimeout(waitTimer);
            // When `removeListeners` is called on timeout, the sender might be closed and cleared
            // So, check if it exists, before removing listeners from it.
            if (abortSignal) {
              abortSignal.removeEventListener("abort", onAborted);
            }
            if (this._sender) {
              this._sender.removeListener(SenderEvents.rejected, onRejected);
              this._sender.removeListener(SenderEvents.accepted, onAccepted);
              this._sender.removeListener(SenderEvents.released, onReleased);
              this._sender.removeListener(SenderEvents.modified, onModified);
            }
          };

          onAborted = () => {
            removeListeners();
            rejectOnAbort();
          };
          onAccepted = (context: EventContext) => {
            // Since we will be adding listener for accepted and rejected event every time
            // we send a message, we need to remove listener for both the events.
            // This will ensure duplicate listeners are not added for the same event.
            removeListeners();
            log.sender("[%s] Sender '%s', got event accepted.", this._context.connectionId, this.name);
            resolve();
          };
          onRejected = (context: EventContext) => {
            removeListeners();
            log.error("[%s] Sender '%s', got event rejected.", this._context.connectionId, this.name);
            const err = translate(context!.delivery!.remote_state!.error);
            log.error(err);
            reject(err);
          };
          onReleased = (context: EventContext) => {
            removeListeners();
            log.error("[%s] Sender '%s', got event released.", this._context.connectionId, this.name);
            let err: Error;
            if (context!.delivery!.remote_state!.error) {
              err = translate(context!.delivery!.remote_state!.error);
            } else {
              err = new Error(
                `[${this._context.connectionId}] Sender '${this.name}', ` +
                  `received a release disposition.Hence we are rejecting the promise.`
              );
            }
            log.error(err);
            reject(err);
          };
          onModified = (context: EventContext) => {
            removeListeners();
            log.error("[%s] Sender '%s', got event modified.", this._context.connectionId, this.name);
            let err: Error;
            if (context!.delivery!.remote_state!.error) {
              err = translate(context!.delivery!.remote_state!.error);
            } else {
              err = new Error(
                `[${this._context.connectionId}] Sender "${this.name}", ` +
                  `received a modified disposition.Hence we are rejecting the promise.`
              );
            }
            log.error(err);
            reject(err);
          };

          const actionAfterTimeout = () => {
            removeListeners();
            const desc: string =
              `[${this._context.connectionId}] Sender "${this.name}" with ` +
              `address "${this.address}", was not able to send the message right now, due ` +
              `to operation timeout.`;
            log.error(desc);
            const e: AmqpError = {
              condition: ErrorNameConditionMapper.ServiceUnavailableError,
              description: desc
            };
            return reject(translate(e));
          };

          if (abortSignal) {
            abortSignal.addEventListener("abort", onAborted);
          }
          this._sender!.on(SenderEvents.accepted, onAccepted);
          this._sender!.on(SenderEvents.rejected, onRejected);
          this._sender!.on(SenderEvents.modified, onModified);
          this._sender!.on(SenderEvents.released, onReleased);
          waitTimer = setTimeout(actionAfterTimeout, Constants.defaultOperationTimeoutInSeconds * 1000);
          const delivery = this._sender!.send(message, tag, 0x80013700);
          log.sender(
            "[%s] Sender '%s', sent message with delivery id: %d and tag: %s",
            this._context.connectionId,
            this.name,
            delivery.id,
            delivery.tag.toString()
          );
        } else {
          // let us retry to send the message after some time.
          const msg =
            `[${this._context.connectionId}] Sender "${this.name}", ` +
            `cannot send the message right now. Please try later.`;
          log.error(msg);
          const amqpError: AmqpError = {
            condition: ErrorNameConditionMapper.SenderBusyError,
            description: msg
          };
          reject(translate(amqpError));
        }
      });

    const jitterInSeconds = randomNumberFromInterval(1, 4);
    const times =
      options.retryOptions && options.retryOptions.retryCount && options.retryOptions.retryCount > 0
        ? options.retryOptions.retryCount
        : Constants.defaultRetryAttempts;
    const delayInSeconds =
      options.retryOptions && options.retryOptions.retryInterval && options.retryOptions.retryInterval > 0
        ? options.retryOptions.retryInterval / 1000
        : Constants.defaultDelayBetweenOperationRetriesInSeconds;
    const config: RetryConfig<void> = {
      operation: sendEventPromise,
      connectionId: this._context.connectionId,
      operationType: RetryOperationType.sendMessage,
      times: times,
      delayInSeconds: delayInSeconds + jitterInSeconds
    };
    return retry<void>(config);
  }

  /**
   * Initializes the sender session on the connection.
   * @ignore
   * @returns {Promise<void>}
   */
  private async _init(options?: RheaSenderOptions): Promise<void> {
    try {
      // isOpen isConnecting  Should establish
      // true     false          No
      // true     true           No
      // false    true           No
      // false    false          Yes
      if (!this.isOpen() && !this.isConnecting) {
        log.error(
          "[%s] The sender '%s' with address '%s' is not open and is not currently " +
            "establishing itself. Hence let's try to connect.",
          this._context.connectionId,
          this.name,
          this.address
        );
        this.isConnecting = true;
        await this._negotiateClaim();
        log.error("[%s] Trying to create sender '%s'...", this._context.connectionId, this.name);
        if (!options) {
          options = this._createSenderOptions({});
        }
        this._sender = await this._context.connection.createSender(options);
        this.isConnecting = false;
        log.error(
          "[%s] Sender '%s' with address '%s' has established itself.",
          this._context.connectionId,
          this.name,
          this.address
        );
        this._sender.setMaxListeners(1000);
        log.error(
          "[%s] Promise to create the sender resolved. Created sender with name: %s",
          this._context.connectionId,
          this.name
        );
        log.error("[%s] Sender '%s' created with sender options: %O", this._context.connectionId, this.name, options);
        // It is possible for someone to close the sender and then start it again.
        // Thus make sure that the sender is present in the client cache.
        if (!this._context.senders[this.name]) this._context.senders[this.name] = this;
        await this._ensureTokenRenewal();
      } else {
        log.error(
          "[%s] The sender '%s' with address '%s' is open -> %s and is connecting " + "-> %s. Hence not reconnecting.",
          this._context.connectionId,
          this.name,
          this.address,
          this.isOpen(),
          this.isConnecting
        );
      }
    } catch (err) {
      this.isConnecting = false;
      err = translate(err);
      log.error("[%s] An error occurred while creating the sender %s", this._context.connectionId, this.name, err);
      throw err;
    }
  }

  /**
   * Creates a new sender to the given event hub, and optionally to a given partition if it is
   * not present in the context or returns the one present in the context.
   * @ignore
   * @static
   * @param {(string)} [partitionId] Partition ID to which it will send event data.
   * @returns {Promise<EventHubSender>}
   */
  static create(context: ConnectionContext, partitionId?: string): EventHubSender {
    const ehSender: EventHubSender = new EventHubSender(context, partitionId);
    if (!context.senders[ehSender.name]) {
      context.senders[ehSender.name] = ehSender;
    }
    return context.senders[ehSender.name];
  }
}

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import * as log from "../log";
import {
  messageProperties,
  Sender,
  EventContext,
  OnAmqpEvent,
  SenderOptions,
  Delivery,
  SenderEvents,
  message,
  AmqpError,
  generate_uuid
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
} from "@azure/amqp-common";
import { SendableMessageInfo } from "../serviceBusMessage";
import { ClientEntityContext } from "../clientEntityContext";
import { LinkEntity } from "./linkEntity";
import { getUniqueName } from "../util/utils";

/**
 * @ignore
 */
interface CreateSenderOptions {
  newName?: boolean;
}

/**
 * Describes the MessageSender that will send messages to ServiceBus.
 * @class MessageSender
 */
export class MessageSender extends LinkEntity {
  /**
   * @property {string} senderLock The unqiue lock name per connection that is used to acquire the
   * lock for establishing a sender link by an entity on that connection.
   * @readonly
   */
  readonly senderLock: string = `sender-${generate_uuid()}`;
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
   * Creates a new MessageSender instance.
   * @constructor
   * @param {ClientEntityContext} context The client entity context.
   */
  constructor(context: ClientEntityContext) {
    super(context.entityPath, context, {
      address: context.entityPath,
      audience: `${context.namespace.config.endpoint}${context.entityPath}`
    });
    this._onAmqpError = (context: EventContext) => {
      const senderError = context.sender && context.sender.error;
      if (senderError) {
        const err = translate(senderError);
        log.error(
          "[%s] An error occurred for sender '%s': %O.",
          this._context.namespace.connectionId,
          this.name,
          err
        );
      }
    };

    this._onSessionError = (context: EventContext) => {
      const sessionError = context.session && context.session.error;
      if (sessionError) {
        const err = translate(sessionError);
        log.error(
          "[%s] An error occurred on the session of sender '%s': %O.",
          this._context.namespace.connectionId,
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
          "[%s] 'sender_close' event occurred for sender '%s' with address '%s'. " +
            "The associated error is: %O",
          this._context.namespace.connectionId,
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
            this._context.namespace.connectionId,
            this.name,
            this.address
          );
          await this.detached(senderError);
        } else {
          log.error(
            "[%s] 'sender_close' event occurred on the sender '%s' with address '%s' " +
              "and the sdk did not initate this. Moreover the sender is already re-connecting. " +
              "Hence not calling detached from the _onAmqpClose() handler.",
            this._context.namespace.connectionId,
            this.name,
            this.address
          );
        }
      } else {
        log.error(
          "[%s] 'sender_close' event occurred on the sender '%s' with address '%s' " +
            "because the sdk initiated it. Hence not calling detached from the _onAmqpClose" +
            "() handler.",
          this._context.namespace.connectionId,
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
          "[%s] 'session_close' event occurred for sender '%s' with address '%s'. " +
            "The associated error is: %O",
          this._context.namespace.connectionId,
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
            this._context.namespace.connectionId,
            this.name,
            this.address
          );
          await this.detached(sessionError);
        } else {
          log.error(
            "[%s] 'session_close' event occurred on the session of sender '%s' with " +
              "address '%s' and the sdk did not initiate this. Moreover the sender is already " +
              "re-connecting. Hence not calling detached from the _onSessionClose() handler.",
            this._context.namespace.connectionId,
            this.name,
            this.address
          );
        }
      } else {
        log.error(
          "[%s] 'session_close' event occurred on the session of sender '%s' with address " +
            "'%s' because the sdk initiated it. Hence not calling detached from the _onSessionClose" +
            "() handler.",
          this._context.namespace.connectionId,
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
            this._context.namespace.connectionId,
            this.name,
            this.address
          );
        } else {
          log.error(
            "[%s] close() method of Sender '%s' with address '%s' was not called. There " +
              "was an accompanying error and it is NOT retryable. Hence NOT re-establishing " +
              "the sender link.",
            this._context.namespace.connectionId,
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
          this._context.namespace.connectionId,
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
          "[%s] Something is busted. State of sender '%s' with address '%s' is: %O",
          this._context.namespace.connectionId,
          this.name,
          this.address,
          state
        );
      }
      if (shouldReopen) {
        await defaultLock.acquire(this.senderLock, () => {
          const options: SenderOptions = this._createSenderOptions({
            newName: true
          });
          // shall retry forever at an interval of 15 seconds if the error is a retryable error
          // else bail out when the error is not retryable or the oepration succeeds.
          const config: RetryConfig<void> = {
            operation: () => this._init(options),
            connectionId: this._context.namespace.connectionId!,
            operationType: RetryOperationType.senderLink,
            times: Constants.defaultConnectionRetryAttempts,
            delayInSeconds: 15
          };
          return retry<void>(config);
        });
      }
    } catch (err) {
      log.error(
        "[%s] An error occurred while processing detached() of Sender '%s' with address " +
          "'%s': %O",
        this._context.namespace.connectionId,
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
      this._context.namespace.connectionId,
      this.name,
      this.address,
      result
    );
    return result;
  }

  /**
   * Sends the given message, with the given options on this link
   *
   * @param {any} data Message to send.  Will be sent as UTF8-encoded JSON string.
   * @returns {Promise<Delivery>} Promise<Delivery>
   */
  async send(data: SendableMessageInfo): Promise<Delivery> {
    try {
      if (!data || (data && typeof data !== "object")) {
        throw new Error("data is required and it must be of type object.");
      }

      if (!this.isOpen()) {
        log.sender(
          "Acquiring lock %s for initializing the session, sender and " +
            "possibly the connection.",
          this.senderLock
        );
        await defaultLock.acquire(this.senderLock, () => {
          return this._init();
        });
      }
      const message = SendableMessageInfo.toAmqpMessage(data);
      message.body = this._context.namespace.dataTransformer.encode(data.body);
      return await this._trySend(message);
    } catch (err) {
      log.error("An error occurred while sending the message %O", err);
      throw err;
    }
  }

  /**
   * Send a batch of Message to the ServiceBus. The "message_annotations",
   * "application_properties" and "properties" of the first message will be set as that
   * of the envelope (batch message).
   * @param {Array<Message>} datas  An array of Message objects to be sent in a
   * Batch message.
   * @return {Promise<Delivery>} Promise<Delivery>
   */
  async sendBatch(datas: SendableMessageInfo[]): Promise<Delivery> {
    try {
      if (!datas || (datas && !Array.isArray(datas))) {
        throw new Error("data is required and it must be an Array.");
      }

      if (!this.isOpen()) {
        log.sender(
          "Acquiring lock %s for initializing the session, sender and " +
            "possibly the connection.",
          this.senderLock
        );
        await defaultLock.acquire(this.senderLock, () => {
          return this._init();
        });
      }
      log.sender(
        "[%s] Sender '%s', trying to send Message[]: %O",
        this._context.namespace.connectionId,
        this.name,
        datas
      );
      const messages: AmqpMessage[] = [];
      // Convert Message to AmqpMessage.
      for (let i = 0; i < datas.length; i++) {
        const message = SendableMessageInfo.toAmqpMessage(datas[i]);
        message.body = this._context.namespace.dataTransformer.encode(datas[i].body);
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
        "[%s]Sender '%s', sending encoded batch message.",
        this._context.namespace.connectionId,
        this.name,
        encodedBatchMessage
      );
      return await this._trySend(encodedBatchMessage, undefined, 0x80013700);
    } catch (err) {
      log.error("An error occurred while sending the batch message %O", err);
      throw err;
    }
  }

  private _deleteFromCache(): void {
    this._sender = undefined;
    delete this._context.sender;
    log.error(
      "[%s] Deleted the sender '%s' with address '%s' from the client cache.",
      this._context.namespace.connectionId,
      this.name,
      this.address
    );
  }

  private _createSenderOptions(options: CreateSenderOptions): SenderOptions {
    if (options.newName) this.name = getUniqueName(this._context.entityPath);
    const srOptions: SenderOptions = {
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
   * Tries to send the message to ServiceBus if there is enough credit to send them
   * and the circular buffer has available space to settle the message after sending them.
   *
   * We have implemented a synchronous send over here in the sense that we shall be waiting
   * for the message to be accepted or rejected and accordingly resolve or reject the promise.
   *
   * @param message The message to be sent to ServiceBus.
   * @return {Promise<Delivery>} Promise<Delivery>
   */
  private _trySend(message: SendableMessageInfo, tag?: any, format?: number): Promise<Delivery> {
    const sendEventPromise = () =>
      new Promise<Delivery>((resolve, reject) => {
        let waitTimer: any;
        log.sender(
          "[%s] Sender '%s', credit: %d available: %d",
          this._context.namespace.connectionId,
          this.name,
          this._sender!.credit,
          this._sender!.session.outgoing.available()
        );
        if (this._sender!.sendable()) {
          log.sender(
            "[%s] Sender '%s', sending message: %O",
            this._context.namespace.connectionId,
            this.name,
            message
          );
          let onRejected: Func<EventContext, void>;
          let onReleased: Func<EventContext, void>;
          let onModified: Func<EventContext, void>;
          let onAccepted: Func<EventContext, void>;
          const removeListeners = (): void => {
            clearTimeout(waitTimer);
            this._sender!.removeListener(SenderEvents.rejected, onRejected);
            this._sender!.removeListener(SenderEvents.accepted, onAccepted);
            this._sender!.removeListener(SenderEvents.released, onReleased);
            this._sender!.removeListener(SenderEvents.modified, onModified);
          };

          onAccepted = (context: EventContext) => {
            // Since we will be adding listener for accepted and rejected event every time
            // we send a message, we need to remove listener for both the events.
            // This will ensure duplicate listeners are not added for the same event.
            removeListeners();
            log.sender(
              "[%s] Sender '%s', got event accepted.",
              this._context.namespace.connectionId,
              this.name
            );
            resolve(context.delivery);
          };
          onRejected = (context: EventContext) => {
            removeListeners();
            log.error(
              "[%s] Sender '%s', got event rejected.",
              this._context.namespace.connectionId,
              this.name
            );
            const err = translate(context!.delivery!.remote_state!.error);
            log.error(err);
            reject(err);
          };
          onReleased = (context: EventContext) => {
            removeListeners();
            log.error(
              "[%s] Sender '%s', got event released.",
              this._context.namespace.connectionId,
              this.name
            );
            let err: Error;
            if (context!.delivery!.remote_state!.error) {
              err = translate(context!.delivery!.remote_state!.error);
            } else {
              err = new Error(
                `[${this._context.namespace.connectionId}]Sender '${this.name}', ` +
                  `received a release disposition.Hence we are rejecting the promise.`
              );
            }
            log.error(err);
            reject(err);
          };
          onModified = (context: EventContext) => {
            removeListeners();
            log.error(
              "[%s] Sender '%s', got event modified.",
              this._context.namespace.connectionId,
              this.name
            );
            let err: Error;
            if (context!.delivery!.remote_state!.error) {
              err = translate(context!.delivery!.remote_state!.error);
            } else {
              err = new Error(
                `[${this._context.namespace.connectionId}]Sender "${this.name}", ` +
                  `received a modified disposition.Hence we are rejecting the promise.`
              );
            }
            log.error(err);
            reject(err);
          };

          const actionAfterTimeout = () => {
            removeListeners();
            const desc: string =
              `[${this._context.namespace.connectionId}] Sender "${this.name}" ` +
              `with address "${this.address}", was not able to send the message right now, due ` +
              `to operation timeout.`;
            log.error(desc);
            const e: AmqpError = {
              condition: ErrorNameConditionMapper.ServiceUnavailableError,
              description: desc
            };
            return reject(translate(e));
          };

          this._sender!.on(SenderEvents.accepted, onAccepted);
          this._sender!.on(SenderEvents.rejected, onRejected);
          this._sender!.on(SenderEvents.modified, onModified);
          this._sender!.on(SenderEvents.released, onReleased);
          waitTimer = setTimeout(
            actionAfterTimeout,
            Constants.defaultOperationTimeoutInSeconds * 1000
          );
          const delivery = this._sender!.send(message, tag, format);
          log.sender(
            "[%s] Sender '%s', sent message with delivery id: %d",
            this._context.namespace.connectionId,
            this.name,
            delivery.id
          );
        } else {
          // let us retry to send the message after some time.
          const msg =
            `[${this._context.namespace.connectionId}] Sender "${this.name}", ` +
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
    const config: RetryConfig<Delivery> = {
      operation: sendEventPromise,
      connectionId: this._context.namespace.connectionId!,
      operationType: RetryOperationType.sendMessage,
      times: Constants.defaultRetryAttempts,
      delayInSeconds: Constants.defaultDelayBetweenOperationRetriesInSeconds + jitterInSeconds
    };

    return retry<Delivery>(config);
  }

  /**
   * Initializes the sender session on the connection.
   */
  private async _init(options?: SenderOptions): Promise<void> {
    try {
      // isOpen isConnecting  Should establish
      // true     false          No
      // true     true           No
      // false    true           No
      // false    false          Yes
      if (!this.isOpen()) {
        log.error(
          "[%s] The sender '%s' with address '%s' is not open and is not currently " +
            "establishing itself. Hence let's try to connect.",
          this._context.namespace.connectionId,
          this.name,
          this.address
        );
        this.isConnecting = true;
        await this._negotiateClaim();
        log.error(
          "[%s] Trying to create sender '%s'...",
          this._context.namespace.connectionId,
          this.name
        );
        if (!options) {
          options = this._createSenderOptions({});
        }
        this._sender = await this._context.namespace.connection.createSender(options);
        this.isConnecting = false;
        log.error(
          "[%s] Sender '%s' with address '%s' has established itself.",
          this._context.namespace.connectionId,
          this.name,
          this.address
        );
        this._sender.setMaxListeners(1000);
        log.error(
          "[%s] Promise to create the sender resolved. Created sender with name: %s",
          this._context.namespace.connectionId,
          this.name
        );
        log.error(
          "[%s] Sender '%s' created with sender options: %O",
          this._context.namespace.connectionId,
          this.name,
          options
        );
        // It is possible for someone to close the sender and then start it again.
        // Thus make sure that the sender is present in the client cache.
        if (!this._sender) this._context.sender = this;
        await this._ensureTokenRenewal();
      }
    } catch (err) {
      err = translate(err);
      log.error(
        "[%s] An error occurred while creating the sender %s",
        this._context.namespace.connectionId,
        this.name,
        err
      );
      throw err;
    }
  }

  /**
   * Creates a new sender to the specifiec ServiceBus entity, and optionally to a given
   * partition if it is not present in the context or returns the one present in the context.
   * @static
   * @returns {Promise<MessageSender>}
   */
  static create(context: ClientEntityContext): MessageSender {
    if (!context.sender) {
      context.sender = new MessageSender(context);
    }
    return context.sender;
  }
}

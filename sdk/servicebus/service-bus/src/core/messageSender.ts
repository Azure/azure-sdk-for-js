// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import * as log from "../log";
import {
  messageProperties,
  AwaitableSender,
  AwaitableSenderOptions,
  EventContext,
  OnAmqpEvent,
  message as RheaMessageUtil,
  AmqpError,
  generate_uuid
} from "rhea-promise";
import {
  defaultLock,
  retry,
  translate,
  AmqpMessage,
  ErrorNameConditionMapper,
  RetryConfig,
  RetryOperationType,
  Constants,
  delay,
  MessagingError,
  RetryOptions
} from "@azure/core-amqp";
import {
  ServiceBusMessage,
  toAmqpMessage,
  getMessagePropertyTypeMismatchError
} from "../serviceBusMessage";
import { ClientEntityContext } from "../clientEntityContext";
import { LinkEntity } from "./linkEntity";
import { getUniqueName } from "../util/utils";
import { throwErrorIfConnectionClosed } from "../util/errors";
import { ServiceBusMessageBatch, ServiceBusMessageBatchImpl } from "../serviceBusMessageBatch";
import { CreateBatchOptions } from "../models";

/**
 * @internal
 * Describes the MessageSender that will send messages to ServiceBus.
 * @class MessageSender
 */
export class MessageSender extends LinkEntity {
  /**
   * @property {string} senderLock The unique lock name per connection that is used to acquire the
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
  private _sender?: AwaitableSender;

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
          await this.onDetached(senderError);
        } else {
          log.error(
            "[%s] 'sender_close' event occurred on the sender '%s' with address '%s' " +
              "and the sdk did not initiate this. Moreover the sender is already re-connecting. " +
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
          await this.onDetached(sessionError);
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

  private _createSenderOptions(timeoutInMs: number, newName?: boolean): AwaitableSenderOptions {
    if (newName) this.name = getUniqueName(this._context.entityPath);
    const srOptions: AwaitableSenderOptions = {
      name: this.name,
      target: {
        address: this.address
      },
      onError: this._onAmqpError,
      onClose: this._onAmqpClose,
      onSessionError: this._onSessionError,
      onSessionClose: this._onSessionClose,
      sendTimeoutInSeconds: timeoutInMs / 1000
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
   * @param encodedMessage The encoded message to be sent to ServiceBus.
   * @param sendBatch Boolean indicating whether the encoded message represents a batch of messages or not
   * @return {Promise<Delivery>} Promise<Delivery>
   */
  private _trySend(encodedMessage: Buffer, sendBatch?: boolean): Promise<void> {
    const sendEventPromise = () =>
      new Promise<void>(async (resolve, reject) => {
        log.sender(
          "[%s] Sender '%s', credit: %d available: %d",
          this._context.namespace.connectionId,
          this.name,
          this._sender!.credit,
          this._sender!.session.outgoing.available()
        );
        if (!this._sender!.sendable()) {
          log.sender(
            "[%s] Sender '%s', waiting for 1 second for sender to become sendable",
            this._context.namespace.connectionId,
            this.name
          );

          await delay(1000);

          log.sender(
            "[%s] Sender '%s' after waiting for a second, credit: %d available: %d",
            this._context.namespace.connectionId,
            this.name,
            this._sender!.credit,
            this._sender!.session.outgoing.available()
          );
        }
        if (this._sender!.sendable()) {
          const actionAfterTimeout = () => {
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

          const waitTimer = setTimeout(actionAfterTimeout, Constants.defaultOperationTimeoutInMs);
          try {
            const delivery = await this._sender!.send(
              encodedMessage,
              undefined,
              sendBatch ? 0x80013700 : 0
            );
            log.sender(
              "[%s] Sender '%s', sent message with delivery id: %d",
              this._context.namespace.connectionId,
              this.name,
              delivery.id
            );
            return resolve();
          } catch (error) {
            error = translate(error.innerError || error);
            log.error(
              "[%s] An error occurred while sending the message",
              this._context.namespace.connectionId,
              error
            );
            return reject(error);
          } finally {
            clearTimeout(waitTimer);
          }
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

    const config: RetryConfig<void> = {
      operation: sendEventPromise,
      connectionId: this._context.namespace.connectionId!,
      operationType: RetryOperationType.sendMessage,
      retryOptions: {
        maxRetries: Constants.defaultMaxRetries,
        retryDelayInMs: Constants.defaultDelayBetweenOperationRetriesInMs
      }
    };

    return retry<void>(config);
  }

  /**
   * Initializes the sender session on the connection.
   */
  private async _init(options?: AwaitableSenderOptions): Promise<void> {
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
          options = this._createSenderOptions(Constants.defaultOperationTimeoutInMs);
        }
        this._sender = await this._context.namespace.connection.createAwaitableSender(options);
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
   * Will reconnect the sender link if necessary.
   * @param {AmqpError | Error} [senderError] The sender error if any.
   * @returns {Promise<void>} Promise<void>.
   */
  async onDetached(senderError?: AmqpError | Error): Promise<void> {
    try {
      const wasCloseInitiated = this._sender && this._sender.isItselfClosed();
      // Clears the token renewal timer. Closes the link and its session if they are open.
      // Removes the link and its session if they are present in rhea's cache.
      await this._closeLink(this._sender);
      // We should attempt to reopen only when the sender(sdk) did not initiate the close
      let shouldReopen = false;
      if (senderError && !wasCloseInitiated) {
        const translatedError = translate(senderError) as MessagingError;
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
          "[%s] Something went wrong. State of sender '%s' with address '%s' is: %O",
          this._context.namespace.connectionId,
          this.name,
          this.address,
          state
        );
      }
      if (shouldReopen) {
        await defaultLock.acquire(this.senderLock, () => {
          const senderOptions = this._createSenderOptions(
            Constants.defaultOperationTimeoutInMs,
            true
          );
          // shall retry forever at an interval of 15 seconds if the error is a retryable error
          // else bail out when the error is not retryable or the operation succeeds.
          const config: RetryConfig<void> = {
            operation: () => this._init(senderOptions),
            connectionId: this._context.namespace.connectionId!,
            operationType: RetryOperationType.senderLink,
            retryOptions: {
              maxRetries: Constants.defaultMaxRetriesForConnection,
              retryDelayInMs: 15000
            },
            connectionHost: this._context.namespace.config.host
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
   * Deletes the sender from the context. Clears the token renewal timer. Closes the sender link.
   * @return {Promise<void>} Promise<void>
   */
  async close(): Promise<void> {
    if (this._sender) {
      log.sender(
        "[%s] Closing the Sender for the entity '%s'.",
        this._context.namespace.connectionId,
        this._context.entityPath
      );
      const senderLink = this._sender;
      this._deleteFromCache();
      await this._closeLink(senderLink);
    }
  }

  /**
   * Determines whether the AMQP sender link is open. If open then returns true else returns false.
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
   * @param {ServiceBusMessage} data Message to send.  Will be sent as UTF8-encoded JSON string.
   * @returns {Promise<void>}
   */
  async send(data: ServiceBusMessage): Promise<void> {
    throwErrorIfConnectionClosed(this._context.namespace);
    try {
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
      const amqpMessage = toAmqpMessage(data);
      amqpMessage.body = this._context.namespace.dataTransformer.encode(data.body);

      let encodedMessage;
      try {
        encodedMessage = RheaMessageUtil.encode(amqpMessage);
      } catch (error) {
        if (error instanceof TypeError || error.name === "TypeError") {
          // `RheaMessageUtil.encode` can fail if message properties are of invalid type
          // rhea throws errors with name `TypeError` but not an instance of `TypeError`, so catch them too
          // Errors in such cases do not have user-friendly message or call stack
          // So use `getMessagePropertyTypeMismatchError` to get a better error message
          throw getMessagePropertyTypeMismatchError(data) || error;
        }
        throw error;
      }
      log.sender(
        "[%s] Sender '%s', trying to send message: %O",
        this._context.namespace.connectionId,
        this.name,
        data
      );
      return await this._trySend(encodedMessage);
    } catch (err) {
      log.error(
        "[%s] Sender '%s': An error occurred while sending the message: %O\nError: %O",
        this._context.namespace.connectionId,
        this.name,
        data,
        err
      );
      throw err;
    }
  }

  // Not exposed to the users
  /**
   * Send a batch of Message to the ServiceBus in a single AMQP message. The "message_annotations",
   * "application_properties" and "properties" of the first message will be set as that
   * of the envelope (batch message).
   * @param {Array<Message>} inputMessages  An array of Message objects to be sent in a
   * Batch message.
   * @return {Promise<void>}
   */
  async sendMessages(inputMessages: ServiceBusMessage[]): Promise<void> {
    throwErrorIfConnectionClosed(this._context.namespace);
    try {
      if (!Array.isArray(inputMessages)) {
        inputMessages = [inputMessages];
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
        inputMessages
      );
      const amqpMessages: AmqpMessage[] = [];
      const encodedMessages = [];
      // Convert Message to AmqpMessage.
      for (let i = 0; i < inputMessages.length; i++) {
        const amqpMessage = toAmqpMessage(inputMessages[i]);
        amqpMessage.body = this._context.namespace.dataTransformer.encode(inputMessages[i].body);
        amqpMessages[i] = amqpMessage;
        try {
          encodedMessages[i] = RheaMessageUtil.encode(amqpMessage);
        } catch (error) {
          if (error instanceof TypeError || error.name === "TypeError") {
            throw getMessagePropertyTypeMismatchError(inputMessages[i]) || error;
          }
          throw error;
        }
      }

      // Convert every encoded message to amqp data section
      const batchMessage: AmqpMessage = {
        body: RheaMessageUtil.data_sections(encodedMessages)
      };
      // Set message_annotations, application_properties and properties of the first message as
      // that of the envelope (batch message).
      if (amqpMessages[0].message_annotations) {
        batchMessage.message_annotations = amqpMessages[0].message_annotations;
      }
      if (amqpMessages[0].application_properties) {
        batchMessage.application_properties = amqpMessages[0].application_properties;
      }
      for (const prop of messageProperties) {
        if ((amqpMessages[0] as any)[prop]) {
          (batchMessage as any)[prop] = (amqpMessages[0] as any)[prop];
        }
      }

      // Finally encode the envelope (batch message).
      const encodedBatchMessage = RheaMessageUtil.encode(batchMessage);

      log.sender(
        "[%s]Sender '%s', sending encoded batch message.",
        this._context.namespace.connectionId,
        this.name,
        encodedBatchMessage
      );
      return await this._trySend(encodedBatchMessage, true);
    } catch (err) {
      log.error(
        "[%s] Sender '%s': An error occurred while sending the messages: %O\nError: %O",
        this._context.namespace.connectionId,
        this.name,
        inputMessages,
        err
      );
      throw err;
    }
  }

  /**
   * Returns maximum message size on the AMQP sender link.
   *
   * Options to configure the `createBatch` method on the `Sender`.
   * - `maxSizeInBytes`: The upper limit for the size of batch.
   *
   * Example usage:
   * ```js
   * {
   *     retryOptions: { maxRetries: 5; timeoutInMs: 10 }
   * }
   * ```
   * @param {{retryOptions?: RetryOptions}} [options={}]
   * @returns {Promise<number>}
   * @memberof MessageSender
   */
  async getMaxMessageSize(
    options: {
      retryOptions?: RetryOptions;
    } = {}
  ): Promise<number> {
    const retryOptions = options.retryOptions || {};
    if (this.isOpen()) {
      return this._sender!.maxMessageSize;
    }
    return new Promise<number>(async (resolve, reject) => {
      try {
        const senderOptions = this._createSenderOptions(Constants.defaultOperationTimeoutInMs);
        await defaultLock.acquire(this.senderLock, () => {
          const config: RetryConfig<void> = {
            operation: () => this._init(senderOptions),
            connectionId: this._context.namespace.connectionId,
            operationType: RetryOperationType.senderLink,
            retryOptions: retryOptions
          };

          return retry<void>(config);
        });
        resolve(this._sender!.maxMessageSize);
      } catch (err) {
        reject(err);
      }
    });
  }

  async createBatch(options?: CreateBatchOptions): Promise<ServiceBusMessageBatch> {
    throwErrorIfConnectionClosed(this._context.namespace);
    if (!options) {
      options = {};
    }
    let maxMessageSize = await this.getMaxMessageSize({ retryOptions: options.retryOptions });
    if (options.maxSizeInBytes) {
      if (options.maxSizeInBytes > maxMessageSize!) {
        const error = new Error(
          `Max message size (${options.maxSizeInBytes} bytes) is greater than maximum message size (${maxMessageSize} bytes) on the AMQP sender link.`
        );
        throw error;
      }
      maxMessageSize = options.maxSizeInBytes;
    }
    return new ServiceBusMessageBatchImpl(this._context, maxMessageSize!);
  }

  async sendBatch(batchMessage: ServiceBusMessageBatch): Promise<void> {
    throwErrorIfConnectionClosed(this._context.namespace);
    try {
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
        "[%s]Sender '%s', sending encoded batch message.",
        this._context.namespace.connectionId,
        this.name,
        batchMessage
      );
      return await this._trySend(batchMessage._message!, true);
    } catch (err) {
      log.error(
        "[%s] Sender '%s': An error occurred while sending the messages: %O\nError: %O",
        this._context.namespace.connectionId,
        this.name,
        batchMessage,
        err
      );
      throw err;
    }
  }

  /**
   * Creates a new sender to the specific ServiceBus entity, and optionally to a given
   * partition if it is not present in the context or returns the one present in the context.
   * @static
   * @returns {Promise<MessageSender>}
   */
  static create(context: ClientEntityContext): MessageSender {
    throwErrorIfConnectionClosed(context.namespace);
    if (!context.sender) {
      context.sender = new MessageSender(context);
    }
    return context.sender;
  }
}

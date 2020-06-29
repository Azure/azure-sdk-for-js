// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AbortError, AbortSignalLike } from "@azure/abort-controller";
import { Constants } from "./util/constants";
import {
  AmqpError,
  Message as AmqpMessage,
  Connection,
  EventContext,
  Receiver,
  ReceiverEvents,
  ReceiverOptions,
  ReqResLink,
  Sender,
  SenderOptions,
  Session,
  generate_uuid
} from "rhea-promise";
import { ConditionStatusMapper, translate } from "./errors";
import { logErrorStackTrace, logger } from "./log";

/**
 * Describes the options that can be specified while sending a request.
 */
export interface SendRequestOptions {
  /**
   * @property {AbortSignalLike} [abortSignal] Cancels the operation.
   */
  abortSignal?: AbortSignalLike;
  /**
   * @property {number} [timeoutInMs] Max time to wait for the operation to complete.
   * Default: `60000 milliseconds`.
   */
  timeoutInMs?: number;
  /**
   * @property {string} [requestName] Name of the request being performed.
   */
  requestName?: string;
}

/**
 * Describes an amqp request(sender)-response(receiver) link that is created over an amqp session.
 * @class RequestResponseLink
 */
export class RequestResponseLink implements ReqResLink {
  /**
   * @constructor
   * @param {Session} session The amqp session.
   * @param {Sender} sender The amqp sender link.
   * @param {Receiver} receiver The amqp receiver link.
   */
  constructor(public session: Session, public sender: Sender, public receiver: Receiver) {
    this.session = session;
    this.sender = sender;
    this.receiver = receiver;
  }

  /**
   * Provides the underlying amqp connection object.
   * @returns {Connection} Connection.
   */
  get connection(): Connection {
    return this.session.connection;
  }

  /**
   * Indicates whether the session and the sender and receiver links are all open or closed.
   * @returns {boolean} boolean - `true` - `open`, `false` - `closed`.
   */
  isOpen(): boolean {
    return this.session.isOpen() && this.sender.isOpen() && this.receiver.isOpen();
  }

  /**
   * Sends the given request message and returns the received response. If the operation is not
   * completed in the provided timeout in milliseconds `default: 60000`, then `OperationTimeoutError` is thrown.
   *
   * @param {Message} request The AMQP (request) message.
   * @param {SendRequestOptions} [options] Options that can be provided while sending a request.
   * @returns {Promise<Message>} Promise<Message> The AMQP (response) message.
   */
  sendRequest(request: AmqpMessage, options: SendRequestOptions = {}): Promise<AmqpMessage> {
    const timeoutInMs = options.timeoutInMs || Constants.defaultOperationTimeoutInMs;

    const aborter: AbortSignalLike | undefined = options.abortSignal;

    // If message_id is not already set on the request, set it to a unique value
    // This helps in determining the right response for current request among multiple incoming messages
    if (!request.message_id) {
      request.message_id = generate_uuid();
    }

    return new Promise<AmqpMessage>((resolve: any, reject: any) => {
      let waitTimer: any = null;
      let timeOver: boolean = false;
      type NormalizedInfo = {
        statusCode: number;
        statusDescription: string;
        errorCondition: string;
      };

      const rejectOnAbort = (): void => {
        const address = this.receiver.address || "address";
        const requestName = options.requestName;
        const desc: string =
          `[${this.connection.id}] The request "${requestName}" ` +
          `to "${address}" has been cancelled by the user.`;
        // Cancellation is a user-intended action, so log to info instead of warning.
        logger.info(desc);
        const error = new AbortError(
          `The ${requestName ? requestName + " " : ""}operation has been cancelled by the user.`
        );

        reject(error);
      };

      const onAbort = (): void => {
        // remove the event listener as this will be registered next time someone makes a request.
        this.receiver.removeListener(ReceiverEvents.message, messageCallback);
        // safe to clear the timeout if it hasn't already occurred.
        if (!timeOver) {
          clearTimeout(waitTimer);
        }
        aborter!.removeEventListener("abort", onAbort);

        rejectOnAbort();
      };

      if (aborter) {
        // the aborter may have been triggered between request attempts
        // so check if it was triggered and reject if needed.
        if (aborter.aborted) {
          return rejectOnAbort();
        }
        aborter.addEventListener("abort", onAbort);
      }

      // Handle different variations of property names in responses emitted by EventHubs and ServiceBus.
      const getCodeDescriptionAndError = (props: any): NormalizedInfo => {
        if (!props) props = {};
        return {
          statusCode: (props[Constants.statusCode] || props.statusCode) as number,
          statusDescription: (props[Constants.statusDescription] ||
            props.statusDescription) as string,
          errorCondition: (props[Constants.errorCondition] || props.errorCondition) as string
        };
      };

      const messageCallback = (context: EventContext): void => {
        if (aborter) {
          aborter.removeEventListener("abort", onAbort);
        }
        const info = getCodeDescriptionAndError(context.message!.application_properties);
        const responseCorrelationId = context.message!.correlation_id;
        logger.verbose(
          "[%s] %s response: ",
          this.connection.id,
          request.to || "$management",
          context.message
        );
        if (request.message_id !== responseCorrelationId) {
          // do not remove message listener.
          // parallel requests listen on the same receiver, so continue waiting until response that matches
          // request via correlationId is found.
          logger.verbose(
            "[%s] request-messageId | '%s' != '%s' | response-correlationId. " +
              "Hence dropping this response and waiting for the next one.",
            this.connection.id,
            request.message_id,
            responseCorrelationId
          );
          return;
        }

        // remove the event listeners as they will be registered next time when someone makes a request.
        this.receiver.removeListener(ReceiverEvents.message, messageCallback);
        if (!timeOver) {
          clearTimeout(waitTimer);
        }
        if (info.statusCode > 199 && info.statusCode < 300) {
          logger.verbose(
            "[%s] request-messageId | '%s' == '%s' | response-correlationId.",
            this.connection.id,
            request.message_id,
            responseCorrelationId
          );
          return resolve(context.message);
        } else {
          const condition =
            info.errorCondition || ConditionStatusMapper[info.statusCode] || "amqp:internal-error";
          const e: AmqpError = {
            condition: condition,
            description: info.statusDescription
          };
          const error = translate(e);
          logger.warning(`${error?.name}: ${error?.message}`);
          logErrorStackTrace(error);
          return reject(error);
        }
      };

      const actionAfterTimeout = (): void => {
        timeOver = true;
        this.receiver.removeListener(ReceiverEvents.message, messageCallback);
        if (aborter) {
          aborter.removeEventListener("abort", onAbort);
        }
        const address = this.receiver.address || "address";
        const desc: string =
          `The request with message_id "${request.message_id}" to "${address}" ` +
          `endpoint timed out. Please try again later.`;
        const e: Error = {
          name: "OperationTimeoutError",
          message: desc
        };
        return reject(translate(e));
      };

      waitTimer = setTimeout(actionAfterTimeout, timeoutInMs);
      this.receiver.on(ReceiverEvents.message, messageCallback);

      logger.verbose(
        "[%s] %s request sent: %O",
        this.connection.id,
        request.to || "$management",
        request
      );
      this.sender.send(request);
    });
  }

  /**
   * Closes the sender, receiver link and the underlying session.
   * @returns {Promise<void>} Promise<void>
   */
  async close(): Promise<void> {
    await this.sender.close();
    await this.receiver.close();
    await this.session.close();
  }

  /**
   * Removes the sender, receiver link and it's underlying session.
   * @returns {void} void
   */
  remove(): void {
    this.sender.remove();
    this.receiver.remove();
    this.session.remove();
  }

  /**
   * Creates an amqp request/response link.
   *
   * @param {Connection} connection The amqp connection.
   * @param {SenderOptions} senderOptions Options that must be provided to create the sender link.
   * @param {ReceiverOptions} receiverOptions Options that must be provided to create the receiver link.
   * @returns {Promise<RequestResponseLink>} Promise<RequestResponseLink>
   */
  static async create(
    connection: Connection,
    senderOptions: SenderOptions,
    receiverOptions: ReceiverOptions
  ): Promise<RequestResponseLink> {
    const session = await connection.createSession();
    const sender = await session.createSender(senderOptions);
    const receiver = await session.createReceiver(receiverOptions);
    logger.verbose(
      "[%s] Successfully created the sender and receiver links on the same session.",
      connection.id
    );
    return new RequestResponseLink(session, sender, receiver);
  }
}

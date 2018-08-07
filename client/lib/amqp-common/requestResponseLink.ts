// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import * as uuid from "uuid/v4";
import * as Constants from "./util/constants";
import { retry, RetryConfig, RetryOperationType } from "./retry";
import {
  Session, Connection, Sender, Receiver, Message, EventContext, AmqpError, ReqResLink,
  SenderOptions, ReceiverOptions, ReceiverEvents
} from "../rhea-promise";
import { translate, ConditionStatusMapper } from "./errors";
import * as log from "./log";

/**
 * Describes the options that can be specified while sending a request.
 * @interface SendRequestOptions
 */
export interface SendRequestOptions {
  /**
   * @property {number} [timeoutInSeconds] Max time to wait for the operation to complete.
   * Default: `10 seconds`.
   */
  timeoutInSeconds?: number;
  /**
   * @property {number} [times] Number of times the operation needs to be retried in case
   * of error. Default: 3.
   */
  times?: number;
  /**
   * @property {number} [delayInSeconds] Amount of time to wait in seconds before making the
   * next attempt. Default: 15.
   */
  delayInSeconds?: number;
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
   * completed in the provided timeout in seconds `default: 10`, then the request will be retried
   * linearly for the provided number of times `default: 3` with the provided delay in seconds
   * `default: 15` between each attempt.
   *
   * @param {Message} request The AMQP message.
   * @param {SendRequestOptions} [options] Options that can be provided while sending a request.
   * @returns {Promise<T>} Promise<T>
   */
  sendRequest<T>(request: Message, options?: SendRequestOptions): Promise<T> {
    if (!request) {
      throw new Error("request is a required parameter and must be of type 'object'.");
    }

    if (!request.message_id) request.message_id = uuid();

    if (!options) options = {};

    if (!options.timeoutInSeconds) {
      options.timeoutInSeconds = 10;
    }

    const sendRequestPromise: Promise<T> = new Promise((resolve: any, reject: any) => {
      let waitTimer: any;
      let timeOver: boolean = false;

      const messageCallback = (context: EventContext) => {
        // remove the event listener as this will be registered next time when someone makes a request.
        this.receiver.removeHandler(ReceiverEvents.message, messageCallback);
        const code: number = context.message!.application_properties![Constants.statusCode];
        const desc: string = context.message!.application_properties![Constants.statusDescription];
        const errorCondition: string | undefined = context.message!.application_properties![Constants.errorCondition];
        const responseCorrelationId = context.message!.correlation_id;
        log.reqres("[%s] %s response: ", this.connection.id, request.to || "$management", context.message);
        if (code > 199 && code < 300) {
          if (request.message_id === responseCorrelationId || request.correlation_id === responseCorrelationId) {
            if (!timeOver) {
              clearTimeout(waitTimer);
            }
            log.reqres("[%s] request-messageId | '%s' == '%s' | response-correlationId.",
              this.connection.id, request.message_id, responseCorrelationId);
            return resolve(context.message!.body);
          } else {
            log.error("[%s] request-messageId | '%s' != '%s' | response-correlationId. " +
              "Hence dropping this response and waiting for the next one.",
              this.connection.id, request.message_id, responseCorrelationId);
          }
        } else {
          const condition = errorCondition || ConditionStatusMapper[code] || "amqp:internal-error";
          const e: AmqpError = {
            condition: condition,
            description: desc
          };
          const error = translate(e);
          log.error(error);
          return reject(error);
        }
      };

      const actionAfterTimeout = () => {
        timeOver = true;
        this.receiver.removeHandler(ReceiverEvents.message, messageCallback);
        const address = this.receiver.address || "address";
        const desc: string = `The request with message_id "${request.message_id}" to "${address}" ` +
          `endpoint timed out. Please try again later.`;
        const e: AmqpError = {
          condition: ConditionStatusMapper[408],
          description: desc
        };
        return reject(translate(e));
      };

      this.receiver.registerHandler(ReceiverEvents.message, messageCallback);
      waitTimer = setTimeout(actionAfterTimeout, options!.timeoutInSeconds! * 1000);
      log.reqres("[%s] %s request sent: %O", this.connection.id, request.to || "$managment", request);
      this.sender.send(request);
    });
    const config: RetryConfig<T> = {
      operation: () => sendRequestPromise,
      connectionId: this.connection.id,
      operationType: request.to && request.to === Constants.cbsEndpoint
        ? RetryOperationType.cbsAuth
        : RetryOperationType.management,
      delayInSeconds: options.delayInSeconds,
      times: options.times
    };
    return retry<T>(config);
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
   * Creates an amqp request/response link.
   *
   * @param {Connection} connection The amqp connection.
   * @param {SenderOptions} senderOptions Options that must be provided to create the sender link.
   * @param {ReceiverOptions} receiverOptions Options that must be provided to create the receiver link.
   * @returns {Promise<RequestResponseLink>} Promise<RequestResponseLink>
   */
  static async create(connection: Connection, senderOptions: SenderOptions, receiverOptions: ReceiverOptions): Promise<RequestResponseLink> {
    if (!connection) {
      throw new Error(`Please provide a connection to create the sender/receiver link on the same session.`);
    }
    if (!senderOptions) {
      throw new Error(`Please provide sender options.`);
    }
    if (!receiverOptions) {
      throw new Error(`Please provide receiver options.`);
    }
    const session = await connection.createSession();
    const sender = await session.createSender(senderOptions);
    const receiver = await session.createReceiver(receiverOptions);
    log.reqres("[%s] Successfully created the sender and receiver links on the same session.", connection.id);
    return new RequestResponseLink(session, sender, receiver);
  }
}

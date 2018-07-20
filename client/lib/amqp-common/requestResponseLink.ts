// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import * as uuid from "uuid/v4";
import * as Constants from "./util/constants";
import * as debugModule from "debug";
import { retry, RetryConfig, RetryOperationType } from "./retry";
import {
  Session, Connection, Sender, Receiver, Message, EventContext, AmqpError, ReqResLink,
  SenderOptions, ReceiverOptions, ReceiverEvents
} from "../rhea-promise";
import { translate, ConditionStatusMapper } from "./errors";

const debug = debugModule("azure:amqp-common:reqreslink");

export class RequestResponseLink implements ReqResLink {

  constructor(public session: Session, public sender: Sender, public receiver: Receiver) {
    this.session = session;
    this.sender = sender;
    this.receiver = receiver;
  }

  get connection(): Connection {
    return this.session.connection;
  }

  isOpen(): boolean {
    return this.session.isOpen() && this.sender.isOpen() && this.receiver.isOpen();
  }

  sendRequest<T>(request: Message, timeoutInSeconds?: number): Promise<T> {
    if (!request) {
      throw new Error("request is a required parameter and must be of type 'object'.");
    }

    if (!request.message_id) request.message_id = uuid();

    if (!timeoutInSeconds) {
      timeoutInSeconds = 10;
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
        debug("[%s] %s response: ", this.connection.id, request.to || "$management", context.message);
        if (code > 199 && code < 300) {
          if (request.message_id === responseCorrelationId || request.correlation_id === responseCorrelationId) {
            if (!timeOver) {
              clearTimeout(waitTimer);
            }
            debug("[%s] request-messageId | '%s' == '%s' | response-correlationId.",
              this.connection.id, request.message_id, responseCorrelationId);
            return resolve(context.message!.body);
          } else {
            debug("[%s] request-messageId | '%s' != '%s' | response-correlationId. " +
              "Hence dropping this response and waiting for the next one.",
              this.connection.id, request.message_id, responseCorrelationId);
          }
        } else {
          const condition = errorCondition || ConditionStatusMapper[code] || "amqp:internal-error";
          const e: AmqpError = {
            condition: condition,
            description: desc
          };
          return reject(translate(e));
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
      waitTimer = setTimeout(actionAfterTimeout, timeoutInSeconds! * 1000);
      debug("[%s] %s request sent: %O", this.connection.id, request.to || "$managment", request);
      this.sender.send(request);
    });
    const config: RetryConfig<T> = {
      operation: () => sendRequestPromise,
      connectionId: this.connection.id,
      operationType: request.to && request.to === Constants.cbsEndpoint
        ? RetryOperationType.cbsAuth
        : RetryOperationType.management
    };
    return retry<T>(config);
  }

  async close(): Promise<void> {
    await this.sender.close();
    await this.receiver.close();
    await this.session.close();
  }

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
    debug("[%s] Successfully created the sender and receiver links on the same session.", connection.id);
    return new RequestResponseLink(session, sender, receiver);
  }
}

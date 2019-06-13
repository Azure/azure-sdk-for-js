// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { TokenInfo } from "./auth/token";
import {
  EventContext,
  ReceiverOptions,
  Message as AmqpMessage,
  SenderEvents,
  ReceiverEvents,
  Connection,
  SenderOptions,
  generate_uuid
} from "rhea-promise";
import * as Constants from "./util/constants";
import * as log from "./log";
import { translate } from "./errors";
import { defaultLock } from "./util/utils";
import { RequestResponseLink } from "./requestResponseLink";

/**
 * Describes the CBS Response.
 * @interface CbsResponse
 */
export interface CbsResponse {
  correlationId: string;
  statusCode: string;
  satusDescription: string;
}

/**
 * @class CbsClient
 * Describes the EventHub/ServiceBus Cbs client that talks to the $cbs endopint over AMQP connection.
 */
export class CbsClient {
  /**
   * @property {string} endpoint CBS endpoint - "$cbs"
   */
  readonly endpoint: string = Constants.cbsEndpoint;
  /**
   * @property {string} replyTo CBS replyTo - The reciever link name that the service should reply to.
   */
  readonly replyTo: string = `${Constants.cbsReplyTo}-${generate_uuid()}`;
  /**
   * @property {string} cbsLock The unqiue lock name per $cbs session per connection that is used to
   * acquire the lock for establishing a cbs session if one does not exist for an aqmp connection.
   */
  readonly cbsLock: string = `${Constants.negotiateCbsKey}-${generate_uuid()}`;
  /**
   * @property {string} connectionLock The unqiue lock name per connection that is used to
   * acquire the lock for establishing an amqp connection if one does not exist.
   */
  readonly connectionLock: string;
  /**
   * @property {Connection} connection The AMQP connection.
   */
  connection: Connection;

  /**
   * CBS sender, receiver on the same session.
   * @private
   */
  private _cbsSenderReceiverLink?: RequestResponseLink;

  /**
   * @constructor
   * @param {Connection} connection The AMQP conection.
   * @param {string} connectionLock A unique string (usually a guid) per connection.
   */
  constructor(connection: Connection, connectionLock: string) {
    this.connection = connection;
    this.connectionLock = connectionLock;
  }

  /**
   * Creates a singleton instance of the CBS session if it hasn't been initialized previously on
   * the given connection.
   * @returns {Promise<void>} Promise<void>.
   */
  async init(): Promise<void> {
    try {
      // Acquire the lock and establish an amqp connection if it does not exist.
      if (!this.connection.isOpen()) {
        log.cbs("The CBS client is trying to establish an AMQP connection.");
        await defaultLock.acquire(this.connectionLock, () => {
          return this.connection.open();
        });
      }

      if (!this._isCbsSenderReceiverLinkOpen()) {
        const rxOpt: ReceiverOptions = {
          source: {
            address: this.endpoint
          },
          name: this.replyTo,
          onSessionError: (context: EventContext) => {
            const id = context.connection.options.id;
            const ehError = translate(context.session!.error!);
            log.error(
              "[%s] An error occurred on the session for request/response links " +
                "for $cbs: %O",
              id,
              ehError
            );
          }
        };
        const srOpt: SenderOptions = { target: { address: this.endpoint } };
        log.cbs(
          "[%s] Creating sender/receiver links on a session for $cbs endpoint.",
          this.connection.id
        );
        this._cbsSenderReceiverLink = await RequestResponseLink.create(
          this.connection,
          srOpt,
          rxOpt
        );
        this._cbsSenderReceiverLink.sender.on(
          SenderEvents.senderError,
          (context: EventContext) => {
            const id = context.connection.options.id;
            const ehError = translate(context.sender!.error!);
            log.error(
              "[%s] An error occurred on the cbs sender link.. %O",
              id,
              ehError
            );
          }
        );
        this._cbsSenderReceiverLink.receiver.on(
          ReceiverEvents.receiverError,
          (context: EventContext) => {
            const id = context.connection.options.id;
            const ehError = translate(context.receiver!.error!);
            log.error(
              "[%s] An error occurred on the cbs receiver link.. %O",
              id,
              ehError
            );
          }
        );
        log.cbs(
          "[%s] Successfully created the cbs sender '%s' and receiver '%s' " +
            "links over cbs session.",
          this.connection.id,
          this._cbsSenderReceiverLink.sender.name,
          this._cbsSenderReceiverLink.receiver.name
        );
      } else {
        log.cbs(
          "[%s] CBS session is already present. Reusing the cbs sender '%s' " +
            "and receiver '%s' links over cbs session.",
          this.connection.id,
          this._cbsSenderReceiverLink!.sender.name,
          this._cbsSenderReceiverLink!.receiver.name
        );
      }
    } catch (err) {
      err = translate(err);
      log.error(
        "[%s] An error occured while establishing the cbs links: %O",
        this.connection.id,
        err
      );
      throw err;
    }
  }

  /**
   * Negotiates the CBS claim with the EventHub/ServiceBus Service.
   * @param {string} audience The entity token audience for which the token is requested in one
   * of the following forms:
   *
   * - **ServiceBus**
   *    - **Sender**
   *        - `"sb://<yournamespace>.servicebus.windows.net/<queue-name>"`
   *        - `"sb://<yournamespace>.servicebus.windows.net/<topic-name>"`
   *
   *    - **Receiver**
   *         - `"sb://<yournamespace>.servicebus.windows.net/<queue-name>"`
   *         - `"sb://<yournamespace>.servicebus.windows.net/<topic-name>"`
   *
   *    - **ManagementClient**
   *         - `"sb://<your-namespace>.servicebus.windows.net/<queue-name>/$management"`.
   *         - `"sb://<your-namespace>.servicebus.windows.net/<topic-name>/$management"`.
   *
   * - **EventHubs**
   *     - **Sender**
   *          - `"sb://<yournamespace>.servicebus.windows.net/<hubName>"`
   *          - `"sb://<yournamespace>.servicebus.windows.net/<hubName>/Partitions/<partitionId>"`.
   *
   *     - **Receiver**
   *         - `"sb://<your-namespace>.servicebus.windows.net/<event-hub-name>/ConsumerGroups/<consumer-group-name>/Partitions/<partition-id>"`.
   *
   *     - **ManagementClient**
   *         - `"sb://<your-namespace>.servicebus.windows.net/<event-hub-name>/$management"`.
   * @param {TokenInfo} tokenObject The token object that needs to be sent in the put-token request.
   * @return {Promise<any>} Returns a Promise that resolves when $cbs authentication is successful
   * and rejects when an error occurs during $cbs authentication.
   */
  async negotiateClaim(
    audience: string,
    tokenObject: TokenInfo
  ): Promise<CbsResponse> {
    try {
      const request: AmqpMessage = {
        body: tokenObject.token,
        message_id: generate_uuid(),
        reply_to: this.replyTo,
        to: this.endpoint,
        application_properties: {
          operation: Constants.operationPutToken,
          name: audience,
          type: tokenObject.tokenType
        }
      };
      const responseMessage = await this._cbsSenderReceiverLink!.sendRequest(
        request
      );
      log.cbs(
        "[%s] The CBS response is: %O",
        this.connection.id,
        responseMessage
      );
      return this._fromAmqpMessageResponse(responseMessage);
    } catch (err) {
      log.error(
        "[%s] An error occurred while negotiating the cbs claim: %O",
        this.connection.id,
        err
      );
      throw err;
    }
  }

  /**
   * Closes the AMQP cbs session to the EventHub/ServiceBus for this client,
   * returning a promise that will be resolved when disconnection is completed.
   * @return {Promise<void>}
   */
  async close(): Promise<void> {
    try {
      if (this._isCbsSenderReceiverLinkOpen()) {
        const cbsLink = this._cbsSenderReceiverLink;
        this._cbsSenderReceiverLink = undefined;
        await cbsLink!.close();
        log.cbs(
          "[%s] Successfully closed the cbs session.",
          this.connection.id
        );
      }
    } catch (err) {
      const msg = `An error occurred while closing the cbs link: ${err.stack ||
        JSON.stringify(err)}.`;
      log.error("[%s] %s", this.connection.id, msg);
      throw new Error(msg);
    }
  }

  /**
   * Removes the AMQP cbs session to the EventHub/ServiceBus for this client,
   * @returns {void} void
   */
  remove(): void {
    try {
      if (this._cbsSenderReceiverLink) {
        const cbsLink = this._cbsSenderReceiverLink;
        this._cbsSenderReceiverLink = undefined;
        cbsLink!.remove();
        log.cbs(
          "[%s] Successfully removed the cbs session.",
          this.connection.id
        );
      }
    } catch (err) {
      const msg = `An error occurred while removing the cbs link: ${err.stack ||
        JSON.stringify(err)}.`;
      log.error("[%s] %s", this.connection.id, msg);
      throw new Error(msg);
    }
  }

  /**
   * Indicates whether the cbs sender receiver link is open or closed.
   * @private
   * @return {boolean} `true` open, `false` closed.
   */
  private _isCbsSenderReceiverLinkOpen(): boolean {
    return (
      this._cbsSenderReceiverLink! && this._cbsSenderReceiverLink!.isOpen()
    );
  }

  private _fromAmqpMessageResponse(msg: AmqpMessage): CbsResponse {
    const cbsResponse = {
      correlationId: msg.correlation_id! as string,
      statusCode: msg.application_properties
        ? msg.application_properties["status-code"]
        : "",
      satusDescription: msg.application_properties
        ? msg.application_properties["status-description"]
        : ""
    };
    log.cbs(
      "[%s] The deserialized CBS response is: %o",
      this.connection.id,
      cbsResponse
    );
    return cbsResponse;
  }
}

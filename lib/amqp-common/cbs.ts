// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { TokenInfo } from "./auth/token";
import {
  EventContext, ReceiverOptions, Message, SenderEvents, ReceiverEvents, Connection
} from "./rhea-promise";
import * as uuid from "uuid/v4";
import * as Constants from "./util/constants";
import * as debugModule from "debug";
import * as rpc from "./rpc";
import { ConnectionConfig } from "./connectionConfig";
import { translate } from "./errors";
import { defaultLock } from "./util/utils";
import { RequestResponseLink } from "./requestResponseLink";
import { SenderOptions } from "rhea";
const debug = debugModule("azure:amqp-common:cbs");

/**
 * @class CbsClient
 * Describes the EventHub Cbs client that talks to the $cbs endopint over AMQP connection.
 */
export class CbsClient {
  /**
   * @property {string} endpoint CBS endpoint - "$cbs"
   */
  readonly endpoint: string = Constants.cbsEndpoint;
  /**
   * @property {string} replyTo CBS replyTo - The reciever link name that the service should reply to.
   */
  readonly replyTo: string = `${Constants.cbsReplyTo}-${uuid()}`;

  /**
   * @property {string} cbsLock The unqiue lock name per $cbs session per connection that is used to
   * acquire the lock for establishing a cbs session if one does not exist for an aqmp connection.
   */
  readonly cbsLock: string = `${Constants.negotiateCbsKey}-${uuid()}`;

  /**
   * @property {string} connectionLock The unqiue lock name per connection that is used to
   * acquire the lock for establishing an amqp connection if one does not exist.
   */
  readonly connectionLock: string = `${Constants.establishConnection}-${uuid()}`;

  /**
   * @property {ConnectionConfig} config The connection config.
   */
  config: ConnectionConfig;

  /**
   * @property {string} userAgent The useragent string.
   */
  userAgent: string;

  /**
   * CBS sender, receiver on the same session.
   */
  private _cbsSenderReceiverLink?: RequestResponseLink;

  /**
   * The AMQP connection.
   */
  private _connection?: Connection;

  constructor(config: ConnectionConfig, userAgent?: string) {
    this.config = config;
    this.userAgent = userAgent || "/js-amqp-client";
  }

  /**
   * Creates a singleton instance of the CBS session if it hasn't been initialized previously on the given connection.
   * @param {any} connection The AMQP connection object on which the CBS session needs to be initialized.
   */
  async init(): Promise<void> {
    try {
      // Acquire the lock and establish an amqp connection if it does not exist.
      if (!this._isConnectionOpen()) {
        debug("The CBS client is trying to establish an AMQP connection.");
        const params: rpc.CreateConnectionPrameters = {
          config: this.config,
          userAgent: this.userAgent
        };
        this._connection = await defaultLock.acquire(this.connectionLock, () => { return rpc.open(params); });
      }

      if (!this._isCbsSenderReceiverLinkOpen()) {
        const rxOpt: ReceiverOptions = {
          source: {
            address: this.endpoint
          },
          name: this.replyTo
        };
        const srOpt: SenderOptions = { target: { address: this.endpoint } };
        this._cbsSenderReceiverLink = await RequestResponseLink.create(this._connection!, srOpt, rxOpt);
        this._cbsSenderReceiverLink.sender.registerHandler(SenderEvents.senderError, (context: EventContext) => {
          const ehError = translate(context.sender!.error!);
          debug("An error occurred on the cbs sender link.. %O", ehError);
        });
        this._cbsSenderReceiverLink.receiver.registerHandler(ReceiverEvents.receiverError, (context: EventContext) => {
          const ehError = translate(context.receiver!.error!);
          debug("An error occurred on the cbs receiver link.. %O", ehError);
        });
        debug("[%s] Successfully created the cbs sender '%s' and receiver '%s' links over cbs session.",
          this._connection!.id, this._cbsSenderReceiverLink.sender.name, this._cbsSenderReceiverLink.receiver.name);
      } else {
        debug("[%s] CBS session is already present. Reusing the cbs sender '%s' and receiver '%s' links over cbs session.",
          this._connection!.id, this._cbsSenderReceiverLink!.sender.name, this._cbsSenderReceiverLink!.receiver.name);
      }
    } catch (err) {
      err = translate(err);
      debug("[%s] An error occured while establishing the cbs links: %O", this._connection!.id, err);
      throw err;
    }
  }

  /**
   * Negotiates the CBS claim with the EventHub Service.
   * @param {string} audience The audience for which the token is requested.
   * @param {TokenInfo} tokenObject The token object that needs to be sent in the put-token request.
   * @return {Promise<any>} Returns a Promise that resolves when $cbs authentication is successful
   * and rejects when an error occurs during $cbs authentication.
   */
  async negotiateClaim(audience: string, tokenObject: TokenInfo): Promise<any> {
    try {
      const request: Message = {
        body: tokenObject.token,
        message_id: uuid(),
        reply_to: this.replyTo,
        to: this.endpoint,
        application_properties: {
          operation: Constants.operationPutToken,
          name: audience,
          type: tokenObject.tokenType
        }
      };
      const response = await this._cbsSenderReceiverLink!.sendRequest(request);
      return response;
    } catch (err) {
      debug("[%s] An error occurred while negotating the cbs claim: %O", this._connection!.id, err);
      throw err;
    }
  }

  /**
   * Closes the AMQP cbs session to the Event Hub for this client,
   * returning a promise that will be resolved when disconnection is completed.
   * @return {Promise<void>}
   */
  async close(): Promise<void> {
    try {
      if (this._cbsSenderReceiverLink) {
        await this._cbsSenderReceiverLink.close();
        debug("[%s] Successfully closed the cbs session.", this._connection!.id);
        this._cbsSenderReceiverLink = undefined;
      }
    } catch (err) {
      const msg = `An error occurred while closing the cbs link: ${err.stack || JSON.stringify(err)}.`;
      debug("[%s] %s", this._connection!.id, msg);
      throw new Error(msg);
    }
  }

  private _isCbsSenderReceiverLinkOpen(): boolean {
    return this._cbsSenderReceiverLink! && this._cbsSenderReceiverLink!.isOpen();
  }

  private _isConnectionOpen(): boolean {
    return this._connection! && this._connection!.isOpen();
  }
}

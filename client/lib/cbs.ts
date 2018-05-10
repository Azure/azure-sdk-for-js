// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { TokenInfo } from "./auth/token";
import { RequestResponseLink, createRequestResponseLink, sendRequest } from "./rpc";
import * as rheaPromise from "./rhea-promise";
import * as uuid from "uuid/v4";
import * as Constants from "./util/constants";
import * as debugModule from "debug";
import * as rpc from "./rpc";
import { AmqpMessage } from ".";
import { translate } from "./errors";
import { defaultLock } from "./util/utils";
import { ConnectionContext } from "./connectionContext";
const debug = debugModule("azure:event-hubs:cbs");

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
   * CBS sender, receiver on the same session.
   */
  private _cbsSenderReceiverLink?: RequestResponseLink;

  private _context: ConnectionContext;

  constructor(context: ConnectionContext) {
    this._context = context;
  }

  /**
   * Creates a singleton instance of the CBS session if it hasn't been initialized previously on the given connection.
   * @param {any} connection The AMQP connection object on which the CBS session needs to be initialized.
   */
  async init(): Promise<void> {
    try {
      // Acquire the lock and establish an amqp connection if it does not exist.
      if (!this._context.connection) {
        debug("[%s] The CBS client is trying to establish an AMQP connection.", this._context.connectionId);
        await defaultLock.acquire(this._context.connectionLock, () => { return rpc.open(this._context); });
      }

      if (!this._cbsSenderReceiverLink) {
        const rxOpt: rheaPromise.ReceiverOptions = {
          source: {
            address: this.endpoint
          },
          name: this.replyTo
        };
        this._cbsSenderReceiverLink = await createRequestResponseLink(this._context.connection, { target: { address: this.endpoint } }, rxOpt);
        this._cbsSenderReceiverLink.sender.on("sender_error", (context: rheaPromise.Context) => {
          const ehError = translate(context.sender.error);
          debug("An error occurred on the cbs sender link.. %O", ehError);
        });
        this._cbsSenderReceiverLink.receiver.on("receiver_error", (context: rheaPromise.Context) => {
          const ehError = translate(context.receiver.error);
          debug("An error occurred on the cbs receiver link.. %O", ehError);
        });
        debug("[%s] Successfully created the cbs sender '%s' and receiver '%s' links over cbs session.",
          this._context.connectionId, this._cbsSenderReceiverLink.sender.name, this._cbsSenderReceiverLink.receiver.name);
      } else {
        debug("[%s] CBS session is already present. Reusing the cbs sender '%s' and receiver '%s' links over cbs session.",
          this._context.connectionId, this._cbsSenderReceiverLink.sender.name, this._cbsSenderReceiverLink.receiver.name);
      }
    } catch (err) {
      err = translate(err);
      debug("[%s] An error occured while establishing the cbs links: %O",
        this._context.connectionId, err);
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
      const request: AmqpMessage = {
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
      const response = await sendRequest(this._context.connection, this._cbsSenderReceiverLink!, request);
      return response;
    } catch (err) {
      debug("[%s]An error occurred while negotating the cbs claim: %O", this._context.connectionId, err);
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
        await rheaPromise.closeSession(this._cbsSenderReceiverLink.session);
        debug("Successfully closed the cbs session.");
        this._cbsSenderReceiverLink = undefined;
      }
    } catch (err) {
      const msg = `An error occurred while closing the cbs session: ${JSON.stringify(err)} `;
      debug(msg);
      throw new Error(msg);
    }
  }
}

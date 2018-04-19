// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { TokenInfo } from "./auth/token";
import { RequestResponseLink, createRequestResponseLink, sendRequest } from "./rpc";
import * as rheaPromise from "./rhea-promise";
import * as uuid from "uuid/v4";
import * as Constants from "./util/constants";
import * as debugModule from "debug";
import { AmqpMessage } from ".";
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

  /**
   * Creates a singleton instance of the CBS session if it hasn't been initialized previously on the given connection.
   * @param {any} connection The AMQP connection object on which the CBS session needs to be initialized.
   */
  async init(connection: any): Promise<void> {
    if (!this._cbsSenderReceiverLink) {
      const rxOpt: rheaPromise.ReceiverOptions = {
        source: {
          address: this.endpoint
        },
        name: this.replyTo
      };
      this._cbsSenderReceiverLink = await createRequestResponseLink(connection, { target: { address: this.endpoint } }, rxOpt);
      debug(`[${connection.options.id}] Successfully created the cbs sender "${this._cbsSenderReceiverLink.sender.name}" ` +
        `and receiver "${this._cbsSenderReceiverLink.receiver.name}" links over cbs session.`);
    } else {
      debug(`[${connection.options.id}] CBS session is already present. Reusing the cbs sender ` +
        `"${this._cbsSenderReceiverLink.sender.name}" and receiver "${this._cbsSenderReceiverLink.receiver.name}" links over cbs session.`);
    }
  }

  /**
   * Negotiates the CBS claim with the EventHub Service.
   * @param {string} audience The audience for which the token is requested.
   * @param {any} connection The underlying AMQP connection.
   * @param {TokenInfo} tokenObject The token object that needs to be sent in the put-token request.
   * @return {Promise<any>} Returns a Promise that resolves when $cbs authentication is successful
   * and rejects when an error occurs during $cbs authentication.
   */
  async negotiateClaim(audience: string, connection: any, tokenObject: TokenInfo): Promise<any> {
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
      const response = await sendRequest(connection, this._cbsSenderReceiverLink!, request);
      return response;
    } catch (err) {
      debug(`[${connection.options.id}] An error occurred while negotating the cbs claim: \n`, err);
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
      const msg = `An error occurred while closing the cbs session: ${JSON.stringify(err)}`;
      debug(msg);
      throw new Error(msg);
    }
  }
}

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { TokenInfo } from "./auth/token";
import { RequestResponseLink, createRequestResponseLink } from "./rpc";
import * as rheaPromise from "./rhea-promise";
import * as uuid from "uuid/v4";
import * as Constants from "./util/constants";
import * as debugModule from "debug";
import { ConditionStatusMapper, translate } from "./errors";
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
      let rxOpt: rheaPromise.ReceiverOptions = {
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
  negotiateClaim(audience: string, connection: any, tokenObject: TokenInfo): Promise<any> {
    return new Promise(async (resolve: any, reject: any): Promise<void> => {
      try {
        const request = {
          body: tokenObject.token,
          properties: {
            message_id: uuid(),
            reply_to: this.replyTo,
            to: this.endpoint,
          },
          application_properties: {
            operation: Constants.operationPutToken,
            name: audience,
            type: tokenObject.tokenType
          }
        };
        const messageCallback = (result: any) => {
          // remove the event listener as this will be registered next time when someone makes a request.
          this._cbsSenderReceiverLink!.receiver.removeListener(Constants.message, messageCallback);
          const code: number = result.message.application_properties[Constants.statusCode];
          const desc: string = result.message.application_properties[Constants.statusDescription];
          let errorCondition: string | undefined = result.message.application_properties[Constants.errorCondition];
          debug(`[${connection.options.id}] $cbs request: \n`, request);
          debug(`[${connection.options.id}] $cbs response: \n`, result.message);
          if (code > 199 && code < 300) {
            resolve();
          } else {
            // Try to map the status code to error condition
            if (!errorCondition) {
              errorCondition = ConditionStatusMapper[code];
            }
            // If we still cannot find a suitable error condition then we default to "amqp:internal-error"
            if (!errorCondition) {
              errorCondition = "amqp:internal-error";
            }
            let e: rheaPromise.AmqpError = {
              condition: errorCondition,
              description: desc
            };
            reject(translate(e));
          }
        };
        this._cbsSenderReceiverLink!.receiver.on(Constants.message, messageCallback);
        this._cbsSenderReceiverLink!.sender.send(request);
      } catch (err) {
        debug(`[${connection.options.id}] An error occurred while negotating the cbs claim: \n`, err);
        reject(err);
      }
    });
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
      const msg = `An error occurred while closing the cbs session: ${err}`;
      debug(msg);
      return Promise.reject(msg);
    }
  }
}

"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
Object.defineProperty(exports, "__esModule", { value: true });
const rpc_1 = require("./rpc");
const rheaPromise = require("./rhea-promise");
const uuid = require("uuid/v4");
const Constants = require("./util/constants");
const debugModule = require("debug");
const errors_1 = require("./errors");
const debug = debugModule("azure:event-hubs:cbs");
/**
 * @class CbsClient
 * Describes the EventHub Cbs client that talks to the $cbs endopint over AMQP connection.
 */
class CbsClient {
    constructor() {
        /**
         * @property {string} endpoint CBS endpoint - "$cbs"
         */
        this.endpoint = Constants.cbsEndpoint;
        /**
         * @property {string} replyTo CBS replyTo - The reciever link name that the service should reply to.
         */
        this.replyTo = `${Constants.cbsReplyTo}-${uuid()}`;
        /**
         * @property {string} cbsLock The unqiue lock name per $cbs session per connection that is used to
         * acquire the lock for establishing a cbs session if one does not exist for an aqmp connection.
         */
        this.cbsLock = `${Constants.negotiateCbsKey}-${uuid()}`;
    }
    /**
     * Creates a singleton instance of the CBS session if it hasn't been initialized previously on the given connection.
     * @param {any} connection The AMQP connection object on which the CBS session needs to be initialized.
     */
    async init(connection) {
        if (!this._cbsSenderReceiverLink) {
            let rxOpt = {
                source: {
                    address: this.endpoint
                },
                name: this.replyTo
            };
            this._cbsSenderReceiverLink = await rpc_1.createRequestResponseLink(connection, { target: { address: this.endpoint } }, rxOpt);
            debug(`[${connection.options.id}] Successfully created the cbs sender "${this._cbsSenderReceiverLink.sender.name}" ` +
                `and receiver "${this._cbsSenderReceiverLink.receiver.name}" links over cbs session.`);
        }
        else {
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
    negotiateClaim(audience, connection, tokenObject) {
        return new Promise(async (resolve, reject) => {
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
                const messageCallback = (result) => {
                    // remove the event listener as this will be registered next time when someone makes a request.
                    this._cbsSenderReceiverLink.receiver.removeListener(Constants.message, messageCallback);
                    const code = result.message.application_properties[Constants.statusCode];
                    const desc = result.message.application_properties[Constants.statusDescription];
                    let errorCondition = result.message.application_properties[Constants.errorCondition];
                    debug(`[${connection.options.id}] $cbs request: \n`, request);
                    debug(`[${connection.options.id}] $cbs response: \n`, result.message);
                    if (code > 199 && code < 300) {
                        resolve();
                    }
                    else {
                        // Try to map the status code to error condition
                        if (!errorCondition) {
                            errorCondition = errors_1.ConditionStatusMapper[code];
                        }
                        // If we still cannot find a suitable error condition then we default to "amqp:internal-error"
                        if (!errorCondition) {
                            errorCondition = "amqp:internal-error";
                        }
                        let e = {
                            condition: errorCondition,
                            description: desc
                        };
                        reject(errors_1.translate(e));
                    }
                };
                this._cbsSenderReceiverLink.receiver.on(Constants.message, messageCallback);
                this._cbsSenderReceiverLink.sender.send(request);
            }
            catch (err) {
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
    async close() {
        try {
            if (this._cbsSenderReceiverLink) {
                await rheaPromise.closeSession(this._cbsSenderReceiverLink.session);
                debug("Successfully closed the cbs session.");
                this._cbsSenderReceiverLink = undefined;
            }
        }
        catch (err) {
            const msg = `An error occurred while closing the cbs session: ${err}`;
            debug(msg);
            return Promise.reject(msg);
        }
    }
}
exports.CbsClient = CbsClient;
//# sourceMappingURL=cbs.js.map
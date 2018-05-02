"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    init(connection) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._cbsSenderReceiverLink) {
                const rxOpt = {
                    source: {
                        address: this.endpoint
                    },
                    name: this.replyTo
                };
                this._cbsSenderReceiverLink = yield rpc_1.createRequestResponseLink(connection, { target: { address: this.endpoint } }, rxOpt);
                this._cbsSenderReceiverLink.sender.on("sender_error", (context) => {
                    const ehError = errors_1.translate(context.sender.error);
                    debug("An error occurred on the cbs sender link.. %O", ehError);
                });
                this._cbsSenderReceiverLink.receiver.on("receiver_error", (context) => {
                    const ehError = errors_1.translate(context.receiver.error);
                    debug("An error occurred on the cbs receiver link.. %O", ehError);
                });
                debug("[%s] Successfully created the cbs sender '%s' and receiver '%s' links over cbs session.", connection.options.id, this._cbsSenderReceiverLink.sender.name, this._cbsSenderReceiverLink.receiver.name);
            }
            else {
                debug("[%s] CBS session is already present. Reusing the cbs sender '%s' and receiver '%s' links over cbs session.", connection.options.id, this._cbsSenderReceiverLink.sender.name, this._cbsSenderReceiverLink.receiver.name);
            }
        });
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
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = {
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
                const response = yield rpc_1.sendRequest(connection, this._cbsSenderReceiverLink, request);
                return response;
            }
            catch (err) {
                debug("[%s]An error occurred while negotating the cbs claim: %O", connection.options.id, err);
                throw err;
            }
        });
    }
    /**
     * Closes the AMQP cbs session to the Event Hub for this client,
     * returning a promise that will be resolved when disconnection is completed.
     * @return {Promise<void>}
     */
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (this._cbsSenderReceiverLink) {
                    yield rheaPromise.closeSession(this._cbsSenderReceiverLink.session);
                    debug("Successfully closed the cbs session.");
                    this._cbsSenderReceiverLink = undefined;
                }
            }
            catch (err) {
                const msg = `An error occurred while closing the cbs session: ${JSON.stringify(err)} `;
                debug(msg);
                throw new Error(msg);
            }
        });
    }
}
exports.CbsClient = CbsClient;

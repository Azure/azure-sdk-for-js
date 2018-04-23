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
const os = require("os");
const process = require("process");
const debugModule = require("debug");
const uuid = require("uuid/v4");
const utils_1 = require("./util/utils");
const rhea_promise_1 = require("./rhea-promise");
const Constants = require("./util/constants");
const connectionContext_1 = require("./connectionContext");
const errors_1 = require("./errors");
const retry_1 = require("./retry");
const debug = debugModule("azure:event-hubs:rpc");
function createRequestResponseLink(connection, senderOptions, receiverOptions) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!connection) {
            throw new Error(`Please provide a connection to create the sender/receiver link on the same session.`);
        }
        if (!senderOptions) {
            throw new Error(`Please provide sender options.`);
        }
        if (!receiverOptions) {
            throw new Error(`Please provide receiver options.`);
        }
        const session = yield rhea_promise_1.createSession(connection);
        const [sender, receiver] = yield Promise.all([
            rhea_promise_1.createSender(session, senderOptions),
            rhea_promise_1.createReceiver(session, receiverOptions)
        ]);
        debug("[%s] Successfully created the sender and receiver links on the same session.", connection.options.id);
        return {
            session: session,
            sender: sender,
            receiver: receiver
        };
    });
}
exports.createRequestResponseLink = createRequestResponseLink;
function createReceiverLink(connection, receiverOptions) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!connection) {
            throw new Error(`Please provide a connection to create the receiver link on a session.`);
        }
        if (!receiverOptions) {
            throw new Error(`Please provide receiver options.`);
        }
        const session = yield rhea_promise_1.createSession(connection);
        const receiver = yield rhea_promise_1.createReceiver(session, receiverOptions);
        debug("[%s] Successfully created the receiver link on a dedicated session for it.", connection.options.id);
        return {
            session: session,
            receiver: receiver
        };
    });
}
exports.createReceiverLink = createReceiverLink;
function createReceiverLinkWithHandlers(options) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!options.connection) {
            throw new Error(`Please provide a connection to create the receiver link on a session.`);
        }
        if (!options.receiverOptions) {
            throw new Error(`Please provide receiver options.`);
        }
        if (!options.onError) {
            throw new Error(`Please provide onError.`);
        }
        if (!options.onMessage) {
            throw new Error(`Please provide onMessage.`);
        }
        const session = yield rhea_promise_1.createSession(options.connection);
        const receiver = yield rhea_promise_1.createReceiverWithHandlers(session, options.onMessage, options.onError, options.receiverOptions);
        debug("[%s] Successfully created the receiver link on a dedicated session for it.", options.connection.options.id);
        return {
            session: session,
            receiver: receiver
        };
    });
}
exports.createReceiverLinkWithHandlers = createReceiverLinkWithHandlers;
function createSenderLink(connection, senderOptions) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!connection) {
            throw new Error(`Please provide a connection to create the sender link on a session.`);
        }
        if (!senderOptions) {
            throw new Error(`Please provide sender options.`);
        }
        const session = yield rhea_promise_1.createSession(connection);
        const sender = yield rhea_promise_1.createSender(session, senderOptions);
        debug("[%s] Successfully created the sender link on a dedicated session for it.", connection.options.id);
        return {
            session: session,
            sender: sender
        };
    });
}
exports.createSenderLink = createSenderLink;
function createSenderLinkWithHandlers(options) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!options.connection) {
            throw new Error(`Please provide a connection to create the sender link on a session.`);
        }
        if (!options.senderOptions) {
            throw new Error(`Please provide sender options.`);
        }
        if (!options.onError) {
            throw new Error(`Please provide onError.`);
        }
        const session = yield rhea_promise_1.createSession(options.connection);
        const sender = yield rhea_promise_1.createSenderWithHandlers(session, options.onError, options.senderOptions);
        debug("[%s] Successfully created the sender link on a dedicated session for it.", options.connection.options.id);
        return {
            session: session,
            sender: sender
        };
    });
}
exports.createSenderLinkWithHandlers = createSenderLinkWithHandlers;
function sendRequest(connection, link, request, timeoutInSeconds) {
    if (!connection) {
        throw new Error("connection is a required parameter and must be of type 'object'.");
    }
    if (!link) {
        throw new Error("link is a required parameter and must be of type 'object'.");
    }
    if (!request) {
        throw new Error("request is a required parameter and must be of type 'object'.");
    }
    if (!request.message_id)
        request.message_id = uuid();
    if (!timeoutInSeconds) {
        timeoutInSeconds = 10;
    }
    const sendRequestPromise = new Promise((resolve, reject) => {
        let waitTimer;
        let timeOver = false;
        const messageCallback = (context) => {
            // remove the event listener as this will be registered next time when someone makes a request.
            link.receiver.removeListener(Constants.message, messageCallback);
            const code = context.message.application_properties[Constants.statusCode];
            const desc = context.message.application_properties[Constants.statusDescription];
            const errorCondition = context.message.application_properties[Constants.errorCondition];
            const responseCorrelationId = context.message.correlation_id;
            debug("[%s] %s response: ", connection.options.id, request.to || "$management", context.message);
            if (code > 199 && code < 300) {
                if (request.message_id === responseCorrelationId || request.correlation_id === responseCorrelationId) {
                    if (!timeOver) {
                        clearTimeout(waitTimer);
                    }
                    debug("[%s] request-messageId | '%s' == '%s' | response-correlationId.", connection.options.id, request.message_id, responseCorrelationId);
                    return resolve(context.message.body);
                }
                else {
                    debug("[%s] request-messageId | '%s' != '%s' | response-correlationId. Hence dropping this response and waiting for the next one.", connection.options.id, request.message_id, responseCorrelationId);
                }
            }
            else {
                const condition = errorCondition || errors_1.ConditionStatusMapper[code] || "amqp:internal-error";
                const e = {
                    condition: condition,
                    description: desc
                };
                return reject(errors_1.translate(e));
            }
        };
        const actionAfterTimeout = () => {
            timeOver = true;
            link.receiver.removeListener(Constants.message, messageCallback);
            const address = link.receiver.options && link.receiver.options.source && link.receiver.options.source.address
                ? link.receiver.options.source.address
                : "address";
            const desc = `The request with message_id "${request.message_id}" to "${address}" ` +
                `endpoint timed out. Please try again later.`;
            const e = {
                condition: errors_1.ConditionStatusMapper[408],
                description: desc
            };
            return reject(errors_1.translate(e));
        };
        link.receiver.on(Constants.message, messageCallback);
        waitTimer = setTimeout(actionAfterTimeout, timeoutInSeconds * 1000);
        debug("[%s] %s request sent: %O", connection.options.id, request.to || "$managment", request);
        link.sender.send(request);
    });
    return retry_1.retry(() => sendRequestPromise);
}
exports.sendRequest = sendRequest;
/**
 * Opens the AMQP connection to the Event Hub for this client, returning a promise
 * that will be resolved when the connection is completed.
 *
 * @param {ConnectionContext} context The connection context.
 * @param {boolean} [useSaslPlain]   True for using sasl plain mode for authentication, false otherwise.
 * @returns {Promise<void>}
 */
function open(context, useSaslPlain) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield utils_1.defaultLock.acquire("connect", () => { return _open(context, useSaslPlain); });
        }
        catch (err) {
            debug(err);
            throw err;
        }
    });
}
exports.open = open;
function _open(context, useSaslPlain) {
    return __awaiter(this, void 0, void 0, function* () {
        if (useSaslPlain && typeof useSaslPlain !== "boolean") {
            throw new Error("'useSaslPlain' must be of type 'boolean'.");
        }
        if (!context.connection) {
            const connectOptions = {
                transport: Constants.TLS,
                host: context.config.host,
                hostname: context.config.host,
                username: context.config.sharedAccessKeyName,
                port: 5671,
                reconnect_limit: Constants.reconnectLimit,
                properties: {
                    product: "MSJSClient",
                    version: Constants.packageJsonInfo.version || "0.1.0",
                    platform: `(${os.arch()}-${os.type()}-${os.release()})`,
                    framework: `Node/${process.version}`,
                    "user-agent": connectionContext_1.ConnectionContext.userAgent
                }
            };
            if (useSaslPlain) {
                connectOptions.password = context.config.sharedAccessKey;
            }
            debug("Dialing the amqp connection with options.", connectOptions);
            context.connection = yield rhea_promise_1.connect(connectOptions);
            context.connectionId = context.connection.options.id;
            debug("Successfully established the amqp connection '%s'.", context.connectionId);
        }
    });
}
//# sourceMappingURL=rpc.js.map
"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
Object.defineProperty(exports, "__esModule", { value: true });
const rhea = require("rhea");
const debugModule = require("debug");
const debug = debugModule("rhea-promise");
/**
 * Establishes an amqp connection.
 * @param {ConnectionOptions} [options] Options to be provided for establishing an amqp connection.
 * @return {Promise<Connection>} Promise<Connection>
 * - **Resolves** the promise with the Connection object when rhea emits the "connection_open" event.
 * - **Rejects** the promise with an AmqpError when rhea emits the "connection_close" event while trying
 * to establish an amqp connection.
 */
function connect(options) {
    return new Promise((resolve, reject) => {
        const connection = rhea.connect(options);
        function removeListeners(connection) {
            connection.removeListener("connection_open", onOpen);
            connection.removeListener("connection_close", onClose);
            connection.removeListener("disconnected", onClose);
        }
        function onOpen(context) {
            removeListeners(connection);
            process.nextTick(() => {
                debug("Resolving the promise with amqp connection.");
                resolve(connection);
            });
        }
        function onClose(context) {
            removeListeners(connection);
            debug(`Error occurred while establishing amqp connection.`, context.connection.error);
            reject(context.connection.error);
        }
        connection.once("connection_open", onOpen);
        connection.once("connection_close", onClose);
        connection.once("disconnected", onClose);
    });
}
exports.connect = connect;
/**
 * Closes the amqp connection.
 * @param {Connection} connection The amqp connection that needs to be closed.
 * @return {Promise<void>} Promise<void>
 * - **Resolves** the promise when rhea emits the "connection_close" event.
 * - **Rejects** the promise with an AmqpError when rhea emits the "connection_error" event while trying
 * to close an amqp connection.
 */
function closeConnection(connection) {
    if (!connection || (connection && typeof connection !== "object")) {
        throw new Error("connection is a required parameter and must be of type 'object'.");
    }
    return new Promise((resolve, reject) => {
        if (connection.is_open()) {
            function onClose(context) {
                connection.removeListener("connection_close", onClose);
                process.nextTick(() => {
                    debug("Resolving the promise as the connection has been successfully closed.");
                    resolve();
                });
            }
            function onError(context) {
                connection.removeListener("connection_error", onError);
                debug(`Error occurred while closing amqp connection.`, context.connection.error);
                reject(context.connection.error);
            }
            connection.once("connection_close", onClose);
            connection.once("connection_error", onError);
            connection.close();
        }
        else {
            resolve();
        }
    });
}
exports.closeConnection = closeConnection;
/**
 * Creates an amqp session on the provided amqp connection.
 * @param {Connection} connection The amqp connection object
 * @return {Promise<Session>} Promise<Session>
 * - **Resolves** the promise with the Session object when rhea emits the "session_open" event.
 * - **Rejects** the promise with an AmqpError when rhea emits the "session_close" event while trying
 * to create an amqp session.
 */
function createSession(connection) {
    if (!connection || (connection && typeof connection !== "object")) {
        throw new Error("connection is a required parameter and must be of type 'object'.");
    }
    return new Promise((resolve, reject) => {
        const session = connection.create_session();
        function removeListeners(session) {
            session.removeListener("session_open", onOpen);
            session.removeListener("session_close", onClose);
        }
        function onOpen(context) {
            removeListeners(session);
            process.nextTick(() => {
                debug("Resolving the promise with amqp session.");
                resolve(session);
            });
        }
        function onClose(context) {
            removeListeners(session);
            debug(`Error occurred while establishing a session over amqp connection.`, context.session.error);
            reject(context.session.error);
        }
        session.once("session_open", onOpen);
        session.once("session_close", onClose);
        debug("Calling amqp session.begin().");
        session.begin();
    });
}
exports.createSession = createSession;
/**
 * Closes the amqp session.
 * @param {Session} session The amqp session that needs to be closed.
 * @return {Promise<void>} Promise<void>
 * - **Resolves** the promise when rhea emits the "session_close" event.
 * - **Rejects** the promise with an AmqpError when rhea emits the "session_error" event while trying
 * to close an amqp session.
 */
function closeSession(session) {
    if (!session || (session && typeof session !== "object")) {
        throw new Error("session is a required parameter and must be of type 'object'.");
    }
    return new Promise((resolve, reject) => {
        if (session.is_open()) {
            function onClose(context) {
                session.removeListener("session_close", onClose);
                process.nextTick(() => {
                    debug("Resolving the promise as the amqp session has been closed.");
                    resolve();
                });
            }
            function onError(context) {
                session.removeListener("session_error", onError);
                debug(`Error occurred while closing amqp session.`, context.session.error);
                reject(context.session.error);
            }
            session.once("session_close", onClose);
            session.once("session_error", onError);
            session.close();
        }
        else {
            resolve();
        }
    });
}
exports.closeSession = closeSession;
/**
 * Creates an amqp sender on the provided amqp session.
 * @param {Session} session The amqp session object on which the sender link needs to be established.
 * @param {SenderOptions} [options] Options that can be provided while creating an amqp sender.
 * @return {Promise<Sender>} Promise<Sender>
 * - **Resolves** the promise with the Sender object when rhea emits the "sender_open" event.
 * - **Rejects** the promise with an AmqpError when rhea emits the "sender_close" event while trying
 * to create an amqp sender.
 */
function createSender(session, options) {
    if (!session || (session && typeof session !== "object")) {
        throw new Error("session is a required parameter and must be of type 'object'.");
    }
    return new Promise((resolve, reject) => {
        const sender = session.attach_sender(options);
        function removeListeners(session) {
            sender.removeListener("sendable", onOpen);
            sender.removeListener("sender_close", onClose);
        }
        function onOpen(context) {
            removeListeners(session);
            process.nextTick(() => {
                debug(`Resolving the promise with amqp sender "${sender.name}".`);
                resolve(sender);
            });
        }
        function onClose(context) {
            removeListeners(session);
            debug(`Error occurred while creating a sender over amqp connection.`, context.sender.error);
            reject(context.sender.error);
        }
        sender.once("sendable", onOpen);
        sender.once("sender_close", onClose);
    });
}
exports.createSender = createSender;
/**
 * Creates an amqp sender on the provided amqp session.
 * @param {Session} session The amqp session object on which the sender link needs to be established.
 * @param {OnAmqpEvent} onError The event handler for the "error" event for the sender.
 * @param {SenderOptions} [options] Options that can be provided while creating an amqp sender.
 * @return {Promise<Sender>} Promise<Sender>
 * - **Resolves** the promise with the Sender object when rhea emits the "sender_open" event.
 * - **Rejects** the promise with an AmqpError when rhea emits the "sender_close" event while trying
 * to create an amqp sender.
 */
function createSenderWithHandlers(session, onError, options) {
    if (!session || (session && typeof session !== "object")) {
        throw new Error("session is a required parameter and must be of type 'object'.");
    }
    return new Promise((resolve, reject) => {
        const sender = session.attach_sender(options);
        sender.on("sender_error", onError);
        function removeListeners(session) {
            sender.removeListener("sendable", onOpen);
            sender.removeListener("sender_close", onClose);
        }
        function onOpen(context) {
            removeListeners(session);
            process.nextTick(() => {
                debug(`Resolving the promise with amqp sender "${sender.name}".`);
                resolve(sender);
            });
        }
        function onClose(context) {
            removeListeners(session);
            debug(`Error occurred while creating a sender over amqp connection.`, context.sender.error);
            reject(context.sender.error);
        }
        sender.once("sendable", onOpen);
        sender.once("sender_close", onClose);
    });
}
exports.createSenderWithHandlers = createSenderWithHandlers;
/**
 * Closes the amqp sender.
 * @param {Sender} sender The amqp sender that needs to be closed.
 * @return {Promise<void>} Promise<void>
 * - **Resolves** the promise when rhea emits the "sender_close" event.
 * - **Rejects** the promise with an AmqpError when rhea emits the
 * "sender_error" event while trying to close an amqp sender.
 */
function closeSender(sender) {
    if (!sender || (sender && typeof sender !== "object")) {
        throw new Error("sender is a required parameter and must be of type 'object'.");
    }
    return new Promise((resolve, reject) => {
        if (sender.is_open()) {
            function onClose(context) {
                sender.removeListener("sender_close", onClose);
                process.nextTick(() => {
                    debug("Resolving the promise as the amqp sender has been closed.");
                    resolve();
                });
            }
            function onError(context) {
                sender.removeListener("sender_error", onError);
                debug(`Error occurred while closing amqp sender.`, context.sender.error);
                reject(context.sender.error);
            }
            sender.once("sender_close", onClose);
            sender.once("sender_error", onError);
            sender.close();
        }
        else {
            resolve();
        }
    });
}
exports.closeSender = closeSender;
/**
 * Creates an amqp receiver on the provided amqp session. This method should be used when you will be
 * sending a request and waiting for a response from the service. For example: This method is useful
 * while creating request/response links for $management or $cbs endpoint.
 * @param {Session} session The amqp session object on which the receiver link needs to be established.
 * @param {ReceiverOptions} [options] Options that can be provided while creating an amqp receiver.
 * @return {Promise<Receiver>} Promise<Receiver>
 * - **Resolves** the promise with the Receiver object when rhea emits the "receiver_open" event.
 * - **Rejects** the promise with an AmqpError when rhea emits the "receiver_close" event while trying
 * to create an amqp receiver.
 */
function createReceiver(session, options) {
    if (!session || (session && typeof session !== "object")) {
        throw new Error("session is a required parameter and must be of type 'object'.");
    }
    return new Promise((resolve, reject) => {
        const receiver = session.attach_receiver(options);
        function removeListeners(receiver) {
            receiver.removeListener("receiver_open", onOpen);
            receiver.removeListener("receiver_close", onClose);
        }
        function onOpen(context) {
            removeListeners(receiver);
            process.nextTick(() => {
                debug(`Resolving the promise with amqp receiver "${receiver.name}".`);
                resolve(receiver);
            });
        }
        function onClose(context) {
            removeListeners(receiver);
            debug(`Error occurred while creating a receiver over amqp connection.`, context.receiver.error);
            reject(context.receiver.error);
        }
        receiver.once("receiver_open", onOpen);
        receiver.once("receiver_close", onClose);
    });
}
exports.createReceiver = createReceiver;
/**
 * Creates an amqp receiver with provided message and error event handlers on the provided amqp session.
 * This method should be used when you want to ensure that no messages are lost. For example: This method
 * is useful for creating EventHub Receivers where you want to start receiving ASAP.
 * @param {Session} session The amqp session object on which the receiver link needs to be established.
 * @param {OnAmqpEvent} onMessage The event handler for the "message" event for the receiver.
 * @param {OnAmqpEvent} onError The event handler for the "error" event for the receiver.
 * @param {ReceiverOptions} [options] Options that can be provided while creating an amqp receiver.
 * @return {Promise<Receiver>} Promise<Receiver>
 * - **Resolves** the promise with the Receiver object when rhea emits the "receiver_open" event.
 * - **Rejects** the promise with an AmqpError when rhea emits the "receiver_close" event while trying
 * to create an amqp receiver.
 */
function createReceiverWithHandlers(session, onMessage, onError, options) {
    if (!session || (session && typeof session !== "object")) {
        throw new Error("session is a required parameter and must be of type 'object'.");
    }
    if (!onMessage || (onMessage && typeof onMessage !== "function")) {
        throw new Error("onMessage is a required parameter and must be of type 'function'.");
    }
    if (!onError || (onError && typeof onError !== "function")) {
        throw new Error("onError is a required parameter and must be of type 'function'.");
    }
    return new Promise((resolve, reject) => {
        const receiver = session.attach_receiver(options);
        receiver.on("message", onMessage);
        receiver.on("receiver_error", onError);
        function removeListeners(receiver) {
            receiver.removeListener("receiver_open", onOpen);
            receiver.removeListener("receiver_close", onClose);
        }
        function onOpen(context) {
            removeListeners(receiver);
            process.nextTick(() => {
                debug(`Resolving the promise with amqp receiver "${receiver.name}".`);
                resolve(receiver);
            });
        }
        function onClose(context) {
            removeListeners(receiver);
            debug(`Error occurred while creating a receiver over amqp connection.`, context.receiver.error);
            reject(context.receiver.error);
        }
        receiver.once("receiver_open", onOpen);
        receiver.once("receiver_close", onClose);
    });
}
exports.createReceiverWithHandlers = createReceiverWithHandlers;
/**
 * Closes the amqp receiver.
 * @param {Receiver} receiver The amqp receiver that needs to be closed.
 * @return {Promise<void>} Promise<void>
 * - **Resolves** the promise when rhea emits the "receiver_close" event.
 * - **Rejects** the promise with an AmqpError when rhea emits the
 * "receiver_error" event while trying to close an amqp receiver.
 */
function closeReceiver(receiver) {
    if (!receiver || (receiver && typeof receiver !== "object")) {
        throw new Error("receiver is a required parameter and must be of type 'object'.");
    }
    return new Promise((resolve, reject) => {
        if (receiver.is_open()) {
            function onClose(context) {
                receiver.removeListener("receiver_close", onClose);
                process.nextTick(() => {
                    debug("Resolving the promise as the amqp receiver has been closed.");
                    resolve();
                });
            }
            function onError(context) {
                receiver.removeListener("receiver_error", onError);
                debug(`Error occurred while closing amqp receiver.`, context.receiver.error);
                reject(context.receiver.error);
            }
            receiver.once("receiver_close", onClose);
            receiver.once("receiver_error", onError);
            receiver.close();
        }
        else {
            resolve();
        }
    });
}
exports.closeReceiver = closeReceiver;
/**
 * Defines a mapping for Http like response status codes for different status-code values provided by an AMQP broker.
 * @enum AmqpResponseStatusCode
 */
var AmqpResponseStatusCode;
(function (AmqpResponseStatusCode) {
    AmqpResponseStatusCode[AmqpResponseStatusCode["Continue"] = 100] = "Continue";
    AmqpResponseStatusCode[AmqpResponseStatusCode["SwitchingProtocols"] = 101] = "SwitchingProtocols";
    AmqpResponseStatusCode[AmqpResponseStatusCode["OK"] = 200] = "OK";
    AmqpResponseStatusCode[AmqpResponseStatusCode["Created"] = 201] = "Created";
    AmqpResponseStatusCode[AmqpResponseStatusCode["Accepted"] = 202] = "Accepted";
    AmqpResponseStatusCode[AmqpResponseStatusCode["NonAuthoritativeInformation"] = 203] = "NonAuthoritativeInformation";
    AmqpResponseStatusCode[AmqpResponseStatusCode["NoContent"] = 204] = "NoContent";
    AmqpResponseStatusCode[AmqpResponseStatusCode["ResetContent"] = 205] = "ResetContent";
    AmqpResponseStatusCode[AmqpResponseStatusCode["PartialContent"] = 206] = "PartialContent";
    AmqpResponseStatusCode[AmqpResponseStatusCode["Ambiguous"] = 300] = "Ambiguous";
    AmqpResponseStatusCode[AmqpResponseStatusCode["MultipleChoices"] = 300] = "MultipleChoices";
    AmqpResponseStatusCode[AmqpResponseStatusCode["Moved"] = 301] = "Moved";
    AmqpResponseStatusCode[AmqpResponseStatusCode["MovedPermanently"] = 301] = "MovedPermanently";
    AmqpResponseStatusCode[AmqpResponseStatusCode["Found"] = 302] = "Found";
    AmqpResponseStatusCode[AmqpResponseStatusCode["Redirect"] = 302] = "Redirect";
    AmqpResponseStatusCode[AmqpResponseStatusCode["RedirectMethod"] = 303] = "RedirectMethod";
    AmqpResponseStatusCode[AmqpResponseStatusCode["SeeOther"] = 303] = "SeeOther";
    AmqpResponseStatusCode[AmqpResponseStatusCode["NotModified"] = 304] = "NotModified";
    AmqpResponseStatusCode[AmqpResponseStatusCode["UseProxy"] = 305] = "UseProxy";
    AmqpResponseStatusCode[AmqpResponseStatusCode["Unused"] = 306] = "Unused";
    AmqpResponseStatusCode[AmqpResponseStatusCode["RedirectKeepVerb"] = 307] = "RedirectKeepVerb";
    AmqpResponseStatusCode[AmqpResponseStatusCode["TemporaryRedirect"] = 307] = "TemporaryRedirect";
    AmqpResponseStatusCode[AmqpResponseStatusCode["BadRequest"] = 400] = "BadRequest";
    AmqpResponseStatusCode[AmqpResponseStatusCode["Unauthorized"] = 401] = "Unauthorized";
    AmqpResponseStatusCode[AmqpResponseStatusCode["PaymentRequired"] = 402] = "PaymentRequired";
    AmqpResponseStatusCode[AmqpResponseStatusCode["Forbidden"] = 403] = "Forbidden";
    AmqpResponseStatusCode[AmqpResponseStatusCode["NotFound"] = 404] = "NotFound";
    AmqpResponseStatusCode[AmqpResponseStatusCode["MethodNotAllowed"] = 405] = "MethodNotAllowed";
    AmqpResponseStatusCode[AmqpResponseStatusCode["NotAcceptable"] = 406] = "NotAcceptable";
    AmqpResponseStatusCode[AmqpResponseStatusCode["ProxyAuthenticationRequired"] = 407] = "ProxyAuthenticationRequired";
    AmqpResponseStatusCode[AmqpResponseStatusCode["RequestTimeout"] = 408] = "RequestTimeout";
    AmqpResponseStatusCode[AmqpResponseStatusCode["Conflict"] = 409] = "Conflict";
    AmqpResponseStatusCode[AmqpResponseStatusCode["Gone"] = 410] = "Gone";
    AmqpResponseStatusCode[AmqpResponseStatusCode["LengthRequired"] = 411] = "LengthRequired";
    AmqpResponseStatusCode[AmqpResponseStatusCode["PreconditionFailed"] = 412] = "PreconditionFailed";
    AmqpResponseStatusCode[AmqpResponseStatusCode["RequestEntityTooLarge"] = 413] = "RequestEntityTooLarge";
    AmqpResponseStatusCode[AmqpResponseStatusCode["RequestUriTooLong"] = 414] = "RequestUriTooLong";
    AmqpResponseStatusCode[AmqpResponseStatusCode["UnsupportedMediaType"] = 415] = "UnsupportedMediaType";
    AmqpResponseStatusCode[AmqpResponseStatusCode["RequestedRangeNotSatisfiable"] = 416] = "RequestedRangeNotSatisfiable";
    AmqpResponseStatusCode[AmqpResponseStatusCode["ExpectationFailed"] = 417] = "ExpectationFailed";
    AmqpResponseStatusCode[AmqpResponseStatusCode["UpgradeRequired"] = 426] = "UpgradeRequired";
    AmqpResponseStatusCode[AmqpResponseStatusCode["InternalServerError"] = 500] = "InternalServerError";
    AmqpResponseStatusCode[AmqpResponseStatusCode["NotImplemented"] = 501] = "NotImplemented";
    AmqpResponseStatusCode[AmqpResponseStatusCode["BadGateway"] = 502] = "BadGateway";
    AmqpResponseStatusCode[AmqpResponseStatusCode["ServiceUnavailable"] = 503] = "ServiceUnavailable";
    AmqpResponseStatusCode[AmqpResponseStatusCode["GatewayTimeout"] = 504] = "GatewayTimeout";
    AmqpResponseStatusCode[AmqpResponseStatusCode["HttpVersionNotSupported"] = 505] = "HttpVersionNotSupported";
})(AmqpResponseStatusCode = exports.AmqpResponseStatusCode || (exports.AmqpResponseStatusCode = {}));
//# sourceMappingURL=index.js.map
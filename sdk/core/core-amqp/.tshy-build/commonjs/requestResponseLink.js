"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCodeDescriptionAndError = exports.RequestResponseLink = void 0;
exports.onMessageReceived = onMessageReceived;
const abort_controller_1 = require("@azure/abort-controller");
const errors_js_1 = require("./errors.js");
const rhea_promise_1 = require("rhea-promise");
const constants_js_1 = require("./util/constants.js");
const log_js_1 = require("./log.js");
const core_util_1 = require("@azure/core-util");
/**
 * Describes an amqp request(sender)-response(receiver) link that is created over an amqp session.
 */
class RequestResponseLink {
    /**
     * @param session - The amqp session.
     * @param sender - The amqp sender link.
     * @param receiver - The amqp receiver link.
     */
    constructor(session, sender, receiver) {
        this.session = session;
        this.sender = sender;
        this.receiver = receiver;
        /**
         * Maintains a map of responses that
         * are being actively returned. It acts as a store for correlating the responses received for
         * the send requests.
         */
        this._responsesMap = new Map();
        this.session = session;
        this.sender = sender;
        this.receiver = receiver;
        this.receiver.on(rhea_promise_1.ReceiverEvents.message, (context) => {
            onMessageReceived(context, this.connection.id, this._responsesMap);
        });
        this.sender.on(rhea_promise_1.SenderEvents.senderError, (context) => {
            onSenderError(context, this.connection.id, this._responsesMap);
        });
    }
    /**
     * Provides the underlying amqp connection object.
     * @returns Connection.
     */
    get connection() {
        return this.session.connection;
    }
    /**
     * Indicates whether the session and the sender and receiver links are all open or closed.
     * @returns boolean - `true` - `open`, `false` - `closed`.
     */
    isOpen() {
        return this.session.isOpen() && this.sender.isOpen() && this.receiver.isOpen();
    }
    /**
     * Sends the given request message and returns the received response. If the operation is not
     * completed in the provided timeout in milliseconds `default: 60000`, then `OperationTimeoutError` is thrown.
     *
     * @param request - The AMQP (request) message.
     * @param options - Options that can be provided while sending a request.
     * @returns Promise<Message> The AMQP (response) message.
     */
    sendRequest(request, options = {}) {
        const timeoutInMs = options.timeoutInMs || constants_js_1.Constants.defaultOperationTimeoutInMs;
        const aborter = options.abortSignal;
        // If message_id is not already set on the request, set it to a unique value
        // This helps in determining the right response for current request among multiple incoming messages
        if (!request.message_id) {
            request.message_id = (0, rhea_promise_1.generate_uuid)();
        }
        return new Promise((resolve, reject) => {
            let timer = undefined;
            const rejectOnAbort = () => {
                this._responsesMap.delete(request.message_id);
                const address = this.receiver.address || "address";
                const requestName = options.requestName;
                const desc = `[${this.connection.id}] The request "${requestName}" ` +
                    `to "${address}" has been cancelled by the user.`;
                // Cancellation is a user-intended action, so log to info instead of warning.
                log_js_1.logger.info(desc);
                const error = new abort_controller_1.AbortError(constants_js_1.StandardAbortMessage);
                reject(error);
            };
            const onAbort = () => {
                // safe to clear the timeout if it hasn't already occurred.
                if ((0, core_util_1.isDefined)(timer)) {
                    clearTimeout(timer);
                }
                aborter.removeEventListener("abort", onAbort);
                rejectOnAbort();
            };
            if (aborter) {
                // the aborter may have been triggered between request attempts
                // so check if it was triggered and reject if needed.
                if (aborter.aborted) {
                    return rejectOnAbort();
                }
                aborter.addEventListener("abort", onAbort);
            }
            timer = setTimeout(() => {
                var _a;
                this._responsesMap.delete(request.message_id);
                if (aborter) {
                    aborter.removeEventListener("abort", onAbort);
                }
                const address = ((_a = this.receiver) === null || _a === void 0 ? void 0 : _a.address) || "address";
                const desc = `The request with message_id "${request.message_id}" to "${address}" ` +
                    `endpoint timed out. Please try again later.`;
                const e = {
                    name: "OperationTimeoutError",
                    message: desc,
                };
                return reject((0, errors_js_1.translate)(e));
            }, timeoutInMs);
            this._responsesMap.set(request.message_id, {
                resolve: resolve,
                reject: reject,
                cleanupBeforeResolveOrReject: () => {
                    if (aborter)
                        aborter.removeEventListener("abort", onAbort);
                    if ((0, core_util_1.isDefined)(timer)) {
                        clearTimeout(timer);
                    }
                },
            });
            log_js_1.logger.verbose("[%s] %s request sent: %O", this.connection.id, request.to || "$management");
            this.sender.send(request);
        });
    }
    /**
     * Closes the sender, receiver link and the underlying session.
     * @returns Promise<void>
     */
    async close() {
        await this.sender.close({ closeSession: false });
        await this.receiver.close({ closeSession: false });
        await this.session.close();
    }
    /**
     * Removes the sender, receiver link and it's underlying session.
     * @returns void
     */
    remove() {
        this.sender.remove();
        this.receiver.remove();
        this.session.remove();
    }
    /**
     * Creates an amqp request/response link.
     *
     * @param connection - The amqp connection.
     * @param senderOptions - Options that must be provided to create the sender link.
     * @param receiverOptions - Options that must be provided to create the receiver link.
     * @param createOptions - Optional parameters that can be used to affect this method's behavior.
     *    For example, `abortSignal` can be passed to allow cancelling an in-progress `create` invocation.
     * @returns Promise<RequestResponseLink>
     */
    static async create(connection, senderOptions, receiverOptions, createOptions = {}) {
        const { abortSignal } = createOptions;
        const session = await connection.createSession({ abortSignal });
        const sender = await session.createSender(Object.assign(Object.assign({}, senderOptions), { abortSignal }));
        const receiver = await session.createReceiver(Object.assign(Object.assign({}, receiverOptions), { abortSignal }));
        log_js_1.logger.verbose("[%s] Successfully created the sender and receiver links on the same session.", connection.id);
        return new RequestResponseLink(session, sender, receiver);
    }
}
exports.RequestResponseLink = RequestResponseLink;
/**
 * @internal
 *
 * Handle different variations of property names in responses emitted by EventHubs and ServiceBus.
 */
const getCodeDescriptionAndError = (props = {}) => {
    return {
        statusCode: (props[constants_js_1.Constants.statusCode] || props.statusCode),
        statusDescription: (props[constants_js_1.Constants.statusDescription] || props.statusDescription),
        errorCondition: (props[constants_js_1.Constants.errorCondition] || props.errorCondition),
    };
};
exports.getCodeDescriptionAndError = getCodeDescriptionAndError;
/**
 * This is used as the onMessage handler for the "message" event on the receiver.
 *
 * (This is inspired from the message settlement sequence in service-bus SDK which
 * relies on a single listener for settled event for all the messages.)
 * The sequence is as follows:
 * 1. User calls `await RequestResponseLink.sendRequest()`
 * 2. This creates a `Promise` that gets stored in the _responsesMap
 * 3. When the service acknowledges the response, this method gets called for that request.
 * 4. We resolve() the promise from the _responsesMap with the message.
 * 5. User's code after the sendRequest continues.
 *
 * @internal
 */
function onMessageReceived(context, connectionId, responsesMap) {
    const message = context.message;
    if (!message) {
        log_js_1.logger.verbose(`[${connectionId}] "message" property on the EventContext is "undefined" which is unexpected, ` +
            `returning from the "onMessageReceived" handler without resolving or rejecting the promise ` +
            `upon encountering the message event.`);
        return;
    }
    const responseCorrelationId = message.correlation_id;
    if (!responsesMap.has(responseCorrelationId)) {
        log_js_1.logger.verbose(`[${connectionId}] correlationId "${responseCorrelationId}" property on the response does not match with ` +
            `any of the "request-id"s in the map, returning from the "onMessageReceived" handler without resolving ` +
            `or rejecting the promise upon encountering the message event.`);
        return;
    }
    const promise = responsesMap.get(responseCorrelationId);
    promise.cleanupBeforeResolveOrReject();
    const deleteResult = responsesMap.delete(responseCorrelationId);
    log_js_1.logger.verbose(`[${connectionId}] Successfully deleted the response with id ${responseCorrelationId} from the map. ` +
        `Delete result - ${deleteResult}`);
    const info = (0, exports.getCodeDescriptionAndError)(message.application_properties);
    let error;
    if (!info.statusCode) {
        error = new Error(`[${connectionId}] No statusCode in the "application_properties" in the returned response with correlation-id: ${responseCorrelationId}`);
    }
    if (info.statusCode > 199 && info.statusCode < 300) {
        log_js_1.logger.verbose(`[${connectionId}] Resolving the response with correlation-id: ${responseCorrelationId}`);
        return promise.resolve(message);
    }
    if (!error) {
        const condition = info.errorCondition || errors_js_1.ConditionStatusMapper[info.statusCode] || "amqp:internal-error";
        error = (0, errors_js_1.translate)({
            condition: condition,
            description: info.statusDescription,
        });
        log_js_1.logger.warning(`${error === null || error === void 0 ? void 0 : error.name}: ${error === null || error === void 0 ? void 0 : error.message}`);
    }
    (0, log_js_1.logErrorStackTrace)(error);
    return promise.reject(error);
}
function onSenderError(context, connectionId, responsesMap) {
    if (context.sender) {
        for (const [key, promise] of responsesMap.entries()) {
            log_js_1.logger.verbose(`[${connectionId}] Sender closed due to error when sending request with message_id "${key}"`);
            promise.cleanupBeforeResolveOrReject();
            promise.reject(context.sender.error);
        }
        responsesMap.clear();
    }
}
//# sourceMappingURL=requestResponseLink.js.map